/**
 * Genera las piezas maquetadas de la web:
 * - src/assets/blog/llamadas-perdidas.webp   portada del post de ejemplo (1600×900)
 * - public/og/*.jpg                 imágenes para compartir en redes (1200×630): general y por servicio
 * Las fotos de servicio (src/assets/services/*.webp) son bodegones generados aparte en el estilo del
 * hero (latón y cerámica sobre crema); este script solo las usa como fondo de las imágenes para compartir.
 * Las piezas con texto se maquetan en HTML con las fuentes de la web y se capturan con Chrome.
 * Uso: node scripts/make-images.mjs
 */
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';

const ROOT = process.cwd();
const url = (p) => pathToFileURL(resolve(ROOT, p)).href;
mkdirSync('src/assets/blog', { recursive: true });
mkdirSync('public/og', { recursive: true });

// 2) Piezas maquetadas en HTML
const fonts = `
  @font-face { font-family: Jost; font-weight: 500; src: url(${url('node_modules/@fontsource/jost/files/jost-latin-500-normal.woff2')}); }
  @font-face { font-family: Jost; font-weight: 400; src: url(${url('node_modules/@fontsource/jost/files/jost-latin-400-normal.woff2')}); }
  @font-face { font-family: Playfair; font-style: italic; font-weight: 600; src: url(${url('node_modules/@fontsource/playfair-display/files/playfair-display-latin-600-italic.woff2')}); }
  * { margin: 0; box-sizing: border-box; }
  body { width: var(--w); height: var(--h); overflow: hidden; background: #F3ECDF; color: #1E1C19; font-family: Jost; }
  em { font-family: Playfair; font-style: italic; font-weight: 600; color: #7A5A40; }
  .eyebrow { font-size: 18px; letter-spacing: .18em; text-transform: uppercase; color: #5F574B; font-weight: 500; }
`;
const logo = readFileSync('public/brand/ceramis-logo-tinta.svg', 'utf8').replace('<svg ', '<svg class="logo" ');

const pieces = {
  // Portada del post de ejemplo
  'src/assets/blog/llamadas-perdidas.png': {
    w: 1600,
    h: 900,
    html: `<style>
      .photo { position: absolute; right: -120px; top: 0; width: 1000px; height: 900px; background: url(${url('public/hero/desktop/f_0080.webp')}) center/cover;
        -webkit-mask-image: linear-gradient(90deg, transparent, #000 35%); }
      .text { position: absolute; left: 110px; top: 150px; width: 820px; }
      h1 { margin: 26px 0 30px; font-weight: 500; font-size: 84px; line-height: 1.02; letter-spacing: -.025em; }
      .big { font-family: Playfair; font-style: italic; font-weight: 600; color: #7A5A40; font-size: 150px; line-height: 1; }
      .sub { margin-top: 16px; font-size: 28px; color: #5F574B; }
      .logo { position: absolute; left: 110px; bottom: 80px; width: 92px; height: 92px; }
    </style>
    <div class="photo"></div>
    <div class="text"><p class="eyebrow">Reservas · Rentabilidad</p>
      <h1>Lo que cuesta no coger el teléfono</h1>
      <p class="big">1.248 €</p><p class="sub">al mes, en un restaurante tipo de Mallorca</p></div>
    ${logo}`,
  },
};

// Imágenes para compartir (Open Graph)
const og = (title, photo, eyebrow) => ({
  w: 1200,
  h: 630,
  html: `<style>
    .photo { position: absolute; right: -60px; top: 0; width: 700px; height: 630px; background: url(${photo}) center/cover;
      -webkit-mask-image: linear-gradient(90deg, transparent, #000 40%); }
    .text { position: absolute; left: 80px; top: 120px; width: 640px; }
    h1 { margin-top: 22px; font-weight: 500; font-size: 64px; line-height: 1.04; letter-spacing: -.025em; }
    .logo { position: absolute; left: 80px; bottom: 64px; width: 84px; height: 84px; }
    .url { position: absolute; left: 186px; bottom: 92px; font-size: 22px; color: #5F574B; letter-spacing: .04em; }
  </style>
  <div class="photo"></div>
  <div class="text"><p class="eyebrow">${eyebrow}</p><h1>${title}</h1></div>
  ${logo}<p class="url">ceramisagency.com</p>`,
});
Object.assign(pieces, {
  'public/og/default.png': og('Llenamos tu restaurante. <em>Siempre.</em>', url('public/hero/desktop/f_0001.webp'), 'Marketing para restaurantes · Mallorca'),
  'public/og/gestion-redes-sociales.png': og('Redes sociales que llenan <em>mesas</em>.', url('src/assets/services/redes.webp'), 'Gestión de redes · Palma'),
  'public/og/seo-local.png': og('Que te encuentren en <em>Google Maps</em>.', url('src/assets/services/seo.webp'), 'SEO local · Mallorca'),
  'public/og/reservas-telefonicas-ia.png': og('Ninguna llamada sin <em>contestar</em>.', url('src/assets/services/agente.webp'), 'Agente de IA para llamadas'),
  'public/og/fidelizacion-wallet.png': og('Clientes que <em>vuelven</em>.', url('src/assets/services/fidelizacion.webp'), 'Tarjeta de fidelización · Wallet'),
});

// Cada pieza se abre como archivo (file://) para que pueda cargar fuentes e imágenes locales.
const tmp = mkdtempSync(join(tmpdir(), 'ceramis-img-'));
const browser = await chromium.launch({ channel: 'chrome' });
for (const [out, { w, h, html }] of Object.entries(pieces)) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  const file = join(tmp, 'piece.html');
  writeFileSync(file, `<!doctype html><html><head><meta charset="utf-8"><style>:root{--w:${w}px;--h:${h}px}${fonts}</style></head><body>${html}</body></html>`);
  await page.goto(pathToFileURL(file).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const png = await page.screenshot({ type: 'png' });
  await page.close();
  const target = out.replace(/\.png$/, out.startsWith('public/og/') ? '.jpg' : '.webp');
  if (target.endsWith('.jpg')) await sharp(png).jpeg({ quality: 84, mozjpeg: true }).toFile(target);
  else await sharp(png).webp({ quality: 88 }).toFile(target);
  console.log('✓', target);
}
await browser.close();
