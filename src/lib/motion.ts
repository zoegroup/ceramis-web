/**
 * Ciclo de vida de Lenis + GSAP/ScrollTrigger con las View Transitions de Astro.
 *
 * - Se inicializa en `astro:page-load` (carga inicial y cada navegación).
 * - Se destruye en `astro:before-swap`: mata todos los ScrollTrigger, ejecuta las
 *   limpiezas de cada módulo y destruye Lenis. Así nada se duplica ni se queda muerto.
 * - GSAP y Lenis se cargan con import() dinámico: no bloquean el primer render.
 * - Con `prefers-reduced-motion: reduce` no hay smooth scroll; los módulos reciben
 *   `reducedMotion: true` y deciden su versión estática.
 */
import type Lenis from 'lenis';

type Gsap = typeof import('gsap').gsap;
type ScrollTriggerStatic = typeof import('gsap/ScrollTrigger').ScrollTrigger;

export interface MotionContext {
  gsap: Gsap;
  ScrollTrigger: ScrollTriggerStatic;
  lenis: Lenis | null;
  reducedMotion: boolean;
}

type Cleanup = () => void;
type MotionModule = (ctx: MotionContext) => Cleanup | void;

const modules = new Set<MotionModule>();
let cleanups: Cleanup[] = [];
let ctx: MotionContext | null = null;
let tickerFn: ((time: number) => void) | null = null;
let generation = 0;
let listening = false;

/** La clase la pone el script inline del <head> (BaseLayout) antes del primer pintado. */
const prefersReducedMotion = () => !document.documentElement.classList.contains('motion-ok');

async function loadLibs() {
  const [{ gsap }, { ScrollTrigger }, { default: LenisCtor }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('lenis'),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger, LenisCtor };
}

async function init() {
  const myGeneration = ++generation;
  const { gsap, ScrollTrigger, LenisCtor } = await loadLibs();
  // Si mientras cargaba ya se navegó a otra página, no inicializamos esta.
  if (myGeneration !== generation) return;

  const reducedMotion = prefersReducedMotion();
  // Evita recalcular todo cuando la barra de Safari iOS aparece/desaparece.
  ScrollTrigger.config({ ignoreMobileResize: true });

  let lenis: Lenis | null = null;
  if (!reducedMotion) {
    lenis = new LenisCtor({ autoRaf: false, lerp: 0.1 });
    lenis.on('scroll', ScrollTrigger.update);
    tickerFn = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);
  }

  ctx = { gsap, ScrollTrigger, lenis, reducedMotion };
  if (import.meta.env.DEV) Object.assign(window, { __motion: { ctx, generation } });
  modules.forEach((mod) => runModule(mod));
  // Los módulos no se registran en el orden de la página: ordena los triggers por posición
  // para que los que van tras un pin (hero, valores) calculen bien su inicio.
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
}

function runModule(mod: MotionModule) {
  if (!ctx) return;
  const cleanup = mod(ctx);
  if (cleanup) cleanups.push(cleanup);
}

function destroy() {
  generation++;
  cleanups.forEach((fn) => fn());
  cleanups = [];
  if (ctx) {
    ctx.ScrollTrigger.getAll().forEach((t) => t.kill());
    if (tickerFn) ctx.gsap.ticker.remove(tickerFn);
    ctx.lenis?.destroy();
  }
  tickerFn = null;
  ctx = null;
}

/**
 * Enlaces a una sección de la misma página (#diagnostico, #precios…). Los gestionamos aquí y no con
 * el router de Astro ni con Lenis: el router delega el salto en el navegador y, con Lenis activo,
 * ese salto podía no producirse. Desplaza con Lenis (o de forma nativa sin movimiento), deja hueco
 * para el header y mueve el foco al destino para el teclado y los lectores de pantalla.
 */
function onAnchorClick(e: MouseEvent) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]');
  if (!link || link.target || link.hasAttribute('download')) return;
  const url = new URL(link.href, location.href);
  if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
  const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
  if (!target) return;

  e.preventDefault();
  const focusTarget = () => {
    if (!target.hasAttribute('tabindex') && !target.matches('a, button, input, select, textarea')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  };
  // En el siguiente frame: deja que otros manejadores terminen (p. ej. el menú móvil se cierra y
  // reactiva Lenis, que ignora scrollTo mientras está parado). El hueco del header lo da
  // `scroll-padding-top` (base.css), que respetan tanto Lenis como el navegador.
  requestAnimationFrame(() => {
    if (ctx?.lenis) {
      ctx.lenis.scrollTo(target, { onComplete: focusTarget });
    } else {
      target.scrollIntoView({ block: 'start' });
      focusTarget();
    }
  });
  history.pushState(history.state, '', url.hash);
}

function listen() {
  if (listening) return;
  listening = true;
  document.addEventListener('astro:page-load', () => void init());
  document.addEventListener('astro:before-swap', destroy);
  // En captura: antes que el router de Astro (que lo ignora si ya está gestionado).
  document.addEventListener('click', onAnchorClick, true);
}

/**
 * Registra un módulo de animación. Se ejecuta en cada página cargada; debe buscar
 * sus propios elementos en el DOM (y no hacer nada si no existen) y devolver su limpieza.
 */
export function onMotion(mod: MotionModule) {
  listen();
  modules.add(mod);
  // Si la página ya está inicializada (el script se evaluó tarde), ejecútalo ya.
  if (ctx) {
    runModule(mod);
    ctx.ScrollTrigger.sort();
    ctx.ScrollTrigger.refresh();
  }
}

export function getLenis() {
  return ctx?.lenis ?? null;
}

listen();
