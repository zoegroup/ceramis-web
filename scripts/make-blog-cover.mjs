/**
 * Genera la portada de marca del post de ejemplo (1600×900 WebP) con sharp.
 * Uso: node scripts/make-blog-cover.mjs src/assets/blog/llamadas-perdidas.webp
 * Sustitúyela por una foto real cuando la tengáis.
 */
import sharp from 'sharp';
const out = process.argv[2];
const ink = '#1E1C19', brass = '#B08D57', stone = '#B9AE9C', accent = '#7A5A40';
// Rejilla 3×3 de fondo (motivo del logo) + teléfono con ondas y llamada perdida.
let grid = '';
for (let i = 1; i < 3; i++) {
  grid += `<line x1="${200 + i * 400}" y1="80" x2="${200 + i * 400}" y2="820" stroke="${stone}" stroke-width="2"/>`;
  grid += `<line x1="200" y1="${80 + i * 246.7}" x2="1400" y2="${80 + i * 246.7}" stroke="${stone}" stroke-width="2"/>`;
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <rect width="1600" height="900" fill="#F3ECDF"/>
  <rect x="200" y="80" width="1200" height="740" fill="none" stroke="${ink}" stroke-width="4"/>
  ${grid}
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <rect x="690" y="250" width="220" height="420" rx="34" fill="#FAF6EF" stroke="${ink}" stroke-width="6"/>
    <path d="M770 280h60" stroke="${ink}" stroke-width="6"/>
    <circle cx="800" cy="630" r="14" stroke="${ink}" stroke-width="6"/>
    <path d="M740 380l120 120M860 380L740 500" stroke="${accent}" stroke-width="10"/>
    <path d="M960 360c30 30 30 110 0 140M1000 320c50 50 50 170 0 220M1040 280c70 70 70 230 0 300" stroke="${brass}" stroke-width="7"/>
    <path d="M640 360c-30 30-30 110 0 140M600 320c-50 50-50 170 0 220M560 280c-70 70-70 230 0 300" stroke="${stone}" stroke-width="7"/>
  </g>
</svg>`;
await sharp(Buffer.from(svg)).webp({ quality: 88 }).toFile(out);
console.log('ok', out);
