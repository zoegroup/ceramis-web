/**
 * Auditoría axe-core (WCAG 2.1 A/AA) de todas las páginas de dist/ servidas por `npm run preview:prod`.
 * Se ejecuta en Chrome (instalado en el sistema) a 390 y 1440 px, en modo animado y estático (?motion=off),
 * y también con el menú móvil abierto. Resultado: consola y qa/a11y.json
 */
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? 'http://localhost:4322';
const AXE = readFileSync('node_modules/axe-core/axe.min.js', 'utf8');

function pages(dir, prefix = '/') {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return name === '_astro' || name === 'hero' ? [] : pages(path, `${prefix}${name}/`);
    return name === 'index.html' ? [prefix] : [];
  });
}

const runAxe = (page) =>
  page.evaluate(async () => {
    const r = await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] });
    return r.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.slice(0, 3).map((n) => n.target.join(' ')) }));
  });

const browser = await chromium.launch({ channel: 'chrome' });
const report = [];
for (const width of [390, 1440]) {
  // bypassCSP: la CSP real bloquea (bien) la inyección de axe.
  const ctx = await browser.newContext({ viewport: { width, height: width < 768 ? 844 : 900 }, bypassCSP: true });
  const page = await ctx.newPage();
  for (const path of [...pages('dist'), '/no-existe/']) {
    for (const mode of ['', '?motion=off']) {
      await page.goto(BASE + path + mode, { waitUntil: 'load' });
      // Recorre la página para que los reveals terminen de aparecer.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise((r) => setTimeout(r, 1200));
      });
      await page.addScriptTag({ content: AXE });
      const violations = await runAxe(page);
      report.push({ width, page: path + mode, violations });
      if (violations.length) console.log(width, path + mode, JSON.stringify(violations));
    }
  }
  if (width < 768) {
    await page.goto(BASE + '/', { waitUntil: 'load' });
    await page.click('[data-menu-open]');
    await page.addScriptTag({ content: AXE });
    const violations = await runAxe(page);
    report.push({ width, page: '/ (menú móvil abierto)', violations });
    if (violations.length) console.log(width, 'menú', JSON.stringify(violations));
  }
  await ctx.close();
}
await browser.close();
mkdirSync('qa', { recursive: true });
writeFileSync('qa/a11y.json', JSON.stringify(report, null, 2));
const bad = report.filter((r) => r.violations.length);
console.log(`axe: ${report.length} comprobaciones, ${bad.length} con incidencias.`);
