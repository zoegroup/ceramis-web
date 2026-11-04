/**
 * Capturas de QA en los 6 anchos del brief (360, 390, 768, 1024, 1440, 1920) con Chrome,
 * contra `npm run preview:prod`. Guarda el primer pantallazo de cada página y la página
 * completa en modo estático (?motion=off) a 390 y 1440. Salida: qa/screens/
 */
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? 'http://localhost:4322';
const OUT = 'qa/screens';
const WIDTHS = [360, 390, 768, 1024, 1440, 1920];
const PAGES = {
  home: '/',
  servicios: '/servicios/',
  'reservas-ia': '/servicios/reservas-telefonicas-ia/',
  nosotros: '/sobre-nosotros/',
  contacto: '/contacto/',
  blog: '/blog/',
  post: '/blog/cuanto-dinero-pierde-un-restaurante-por-llamada/',
};
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome' });
for (const w of WIDTHS) {
  const height = w < 768 ? 800 : w < 1200 ? (w === 768 ? 1024 : 768) : w === 1920 ? 1080 : 900;
  const ctx = await browser.newContext({ viewport: { width: w, height }, deviceScaleFactor: w < 768 ? 2 : 1 });
  const page = await ctx.newPage();
  for (const [name, path] of Object.entries(PAGES)) {
    await page.goto(BASE + path, { waitUntil: 'load' });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${OUT}/${name}-${w}.png` });
    if (w === 390 || w === 1440) {
      await page.goto(`${BASE}${path}?motion=off`, { waitUntil: 'load' });
      await page.waitForTimeout(600);
      await page.screenshot({ path: `${OUT}/${name}-${w}-completa.png`, fullPage: true });
    }
  }
  await ctx.close();
  console.log(`✓ ${w}px`);
}
await browser.close();
