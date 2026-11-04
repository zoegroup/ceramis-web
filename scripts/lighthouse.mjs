/**
 * Lighthouse móvil sobre todas las páginas de dist/ servidas por `npm run preview:prod`.
 * Uso: npm run preview:prod (en otra terminal) && npm run lighthouse
 * Resultado: tabla en consola y qa/lighthouse.json
 */
import { mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';

const BASE = process.env.BASE_URL ?? 'http://localhost:4322';
const only = process.argv.slice(2);

function pages(dir, prefix = '/') {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return name === '_astro' || name === 'hero' ? [] : pages(path, `${prefix}${name}/`);
    return name === 'index.html' ? [prefix] : [];
  });
}

// La 404 no se mide: Lighthouse no audita respuestas con estado 404.
const urls = (only.length ? only : pages('dist')).map((p) => BASE + p);
const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new'] });
const rows = [];
for (const url of urls) {
  const { lhr } = await lighthouse(url, { port: chrome.port, output: 'json', logLevel: 'error' });
  const s = (k) => Math.round((lhr.categories[k]?.score ?? 0) * 100);
  const a = (k) => lhr.audits[k]?.numericValue;
  const failed = Object.values(lhr.audits)
    .filter((x) => x.score !== null && x.score < 0.9 && x.scoreDisplayMode === 'binary')
    .map((x) => x.id);
  rows.push({
    page: url.replace(BASE, ''),
    perf: s('performance'),
    a11y: s('accessibility'),
    bp: s('best-practices'),
    seo: s('seo'),
    lcp: Math.round(a('largest-contentful-paint')),
    cls: Number(a('cumulative-layout-shift')?.toFixed(3)),
    tbt: Math.round(a('total-blocking-time')),
    failed,
  });
  console.log(rows.at(-1));
}
await chrome.kill();
mkdirSync('qa', { recursive: true });
writeFileSync('qa/lighthouse.json', JSON.stringify(rows, null, 2));
console.table(rows.map(({ failed, ...r }) => r));
