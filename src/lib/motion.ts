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
    lenis = new LenisCtor({ autoRaf: false, anchors: true, lerp: 0.1 });
    lenis.on('scroll', ScrollTrigger.update);
    tickerFn = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);
  }

  ctx = { gsap, ScrollTrigger, lenis, reducedMotion };
  if (import.meta.env.DEV) Object.assign(window, { __motion: { ctx, generation } });
  modules.forEach((mod) => runModule(mod));
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

function listen() {
  if (listening) return;
  listening = true;
  document.addEventListener('astro:page-load', () => void init());
  document.addEventListener('astro:before-swap', destroy);
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
    ctx.ScrollTrigger.refresh();
  }
}

export function getLenis() {
  return ctx?.lenis ?? null;
}

listen();
