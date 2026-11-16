/**
 * Prueba en WebKit (el motor de Safari) con perfil de iPhone, contra `npm run preview:prod`.
 * Comprueba hero (póster, frames en canvas, pin), menú móvil, formulario, calculadora,
 * navegación con ClientRouter, errores de consola y violaciones de CSP. Guarda capturas en qa/webkit/.
 * Uso: npm run preview:prod (en otra terminal) && npm run qa:webkit
 */
import { mkdirSync } from 'node:fs';
import { devices, webkit } from 'playwright';

const BASE = process.env.BASE_URL ?? 'http://localhost:4322';
const OUT = 'qa/webkit';
mkdirSync(OUT, { recursive: true });

const browser = await webkit.launch();
const ctx = await browser.newContext({ ...devices['iPhone 15'] });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
page.on('console', (m) => m.type() === 'error' && errors.push(`console: ${m.text()}`));

const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ` — ${detail}` : ''}`);
};
const shot = (name) => page.screenshot({ path: `${OUT}/${name}.png` });
const scrollTo = async (y) => {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(900);
};

// --- Home / hero
await page.goto(BASE + '/', { waitUntil: 'load' });
await page.waitForTimeout(1500);
check('Póster del hero visible al cargar', await page.locator('.hero__poster').isVisible());
check('Clase motion-ok (animación activa)', await page.evaluate(() => document.documentElement.classList.contains('motion-ok')));
await shot('01-hero-inicio');

// Recorrido del pin = alto del pin-spacer − alto de la pantalla fija (Safari descuenta sus barras).
const [spacerH, pinH] = await page.evaluate(() => [
  document.querySelector('.pin-spacer')?.getBoundingClientRect().height ?? 0,
  document.querySelector('[data-hero-pin]').getBoundingClientRect().height,
]);
const pinEnd = spacerH - pinH;
check('Pin del hero creado', pinEnd > 0, `${Math.round(pinEnd)} px de recorrido`);
// Paso visible = sus bloques (arriba/abajo) visibles; los pasos usan display: contents en móvil.
const visibleSteps = () =>
  page.evaluate(() =>
    [...document.querySelectorAll('.hero__step')]
      .filter((s) => [...s.children].every((c) => getComputedStyle(c).visibility === 'visible' && Number(getComputedStyle(c).opacity) > 0.9))
      .map((s) => Number(s.dataset.step))
  );
const painted = async () =>
  page.evaluate(() => {
    const c = document.querySelector('[data-hero-canvas]');
    const d = c.getContext('2d').getImageData(Math.floor(c.width / 2), Math.floor(c.height / 2), 1, 1).data;
    return d[3] > 0;
  });
for (const [i, [f, step]] of [[0.15, 1], [0.5, 2], [0.88, 3], [0.995, 4]].entries()) {
  await scrollTo(Math.round(pinEnd * f));
  await page.waitForTimeout(800); // scrub: 0.5
  check(`Canvas pintado al ${Math.round(f * 100)} % del hero`, await painted());
  const steps = await visibleSteps();
  check(`Texto sincronizado al ${Math.round(f * 100)} % (solo el paso ${step})`, steps.length === 1 && steps[0] === step, JSON.stringify(steps));
  await shot(`0${i + 2}-hero-${Math.round(f * 100)}`);
}

// --- Servicios (carrusel) y valores
await page.evaluate(() => document.querySelector('#servicios').scrollIntoView());
await page.waitForTimeout(1200);
await shot('06-servicios');
const track = page.locator('[data-services-track]');
await track.evaluate((t) => t.scrollBy({ left: t.clientWidth, behavior: 'instant' }));
await page.waitForTimeout(600);
check('Carrusel de servicios con scroll-snap', (await page.locator('[data-services-current]').textContent()) !== '1');
await page.evaluate(() => document.querySelector('[data-values]').scrollIntoView());
await page.waitForTimeout(1200);
await shot('07-valores');

// --- Menú móvil
await scrollTo(0);
await page.click('[data-menu-open]');
await page.waitForTimeout(500);
check('Menú móvil abre', await page.locator('[data-menu]').isVisible());
await shot('08-menu');
await page.click('[data-menu-close]');
await page.waitForTimeout(300);
check('Menú móvil cierra', !(await page.locator('[data-menu]').isVisible()));

// --- Formulario (sin endpoint en esta build: validación y error amable)
await page.evaluate(() => document.querySelector('#diagnostico').scrollIntoView());
await page.waitForTimeout(800);
await page.click('[data-submit]');
await page.waitForTimeout(300);
check('Validación del formulario', (await page.locator('[aria-invalid="true"]').count()) >= 4);
await shot('09-formulario-errores');

// --- Calculadora + ClientRouter
await page.click('a[href="/servicios/"] >> nth=0').catch(async () => page.goto(BASE + '/servicios/'));
await page.waitForTimeout(1500);
await page.evaluate(() => {
  const a = document.querySelector('a[href="/servicios/reservas-telefonicas-ia/"]');
  a?.click();
});
await page.waitForTimeout(2000);
check('Navegación ClientRouter a Reservas IA', page.url().endsWith('/servicios/reservas-telefonicas-ia/'), page.url());
await page.evaluate(() => document.querySelector('[data-roi]').scrollIntoView());
await page.waitForTimeout(800);
await page.fill('[data-roi-number][name=llamadas]', '10');
await page.waitForTimeout(1200);
const monthly = await page.locator('[data-roi-out=monthly]').textContent();
check('Calculadora (10 llamadas → 624 €/mes)', monthly?.replace(/\s/g, '') === '624€', monthly ?? '');
await shot('10-calculadora');

// --- Barra fija móvil y plan preseleccionado (redes)
await page.goto(BASE + '/servicios/gestion-redes-sociales/', { waitUntil: 'load' });
await page.waitForTimeout(1000);
await page.evaluate(() => document.querySelector('.svc-not').scrollIntoView());
await page.waitForTimeout(900);
check('Barra fija de CTA visible al hacer scroll', await page.locator('[data-sticky-cta].is-visible').count() === 1);
await shot('11-barra-cta');
await page.evaluate(() => document.querySelector('[data-plan*="Crecimiento"]').click());
await page.waitForTimeout(1500);
const planValue = await page.locator('[data-form-plan]').inputValue();
check('Plan preseleccionado en el formulario', planValue.includes('Crecimiento'), planValue);
check('Barra fija oculta junto al formulario', (await page.locator('[data-sticky-cta].is-visible').count()) === 0);

// --- Post del blog
await page.goto(BASE + '/blog/cuanto-dinero-pierde-un-restaurante-por-llamada/', { waitUntil: 'load' });
await page.waitForTimeout(1000);
await shot('12-post');

const cspErrors = errors.filter((e) => /Content Security Policy|Refused to/.test(e));
check('Sin violaciones de CSP', cspErrors.length === 0, cspErrors.slice(0, 2).join(' | '));
const otherErrors = errors.filter((e) => !cspErrors.includes(e) && !/PUBLIC_FORM_ENDPOINT/.test(e));
check('Sin errores de JavaScript', otherErrors.length === 0, otherErrors.slice(0, 3).join(' | '));

await browser.close();
const failed = results.filter((r) => !r.ok).length;
console.log(`\nWebKit (iPhone 15): ${results.length - failed}/${results.length} comprobaciones correctas. Capturas en ${OUT}/`);
process.exit(failed ? 1 : 0);
