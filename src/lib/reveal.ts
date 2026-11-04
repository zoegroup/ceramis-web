/**
 * Reveal genérico: los elementos con [data-reveal] entran con fade + 24 px al aparecer.
 * - Una sola vez por elemento; los que llegan juntos se escalonan.
 * - Lo que ya está en pantalla al cargar no se anima (evita parpadeos).
 * - Sin JS o con reduced-motion no se oculta nada.
 * - Solo opacidad (no visibility): lo oculto sigue siendo enfocable con el teclado,
 *   y al recibir foco se muestra al instante.
 * - Lo que llega a la vista con el foco dentro no se anima.
 */
import { onMotion, type MotionContext } from '@/lib/motion';

/** Aplica el reveal a unos elementos concretos. Devuelve su limpieza. */
export function revealOnScroll({ gsap, ScrollTrigger }: MotionContext, elements: HTMLElement[]) {
  const targets = elements.filter((el) => el.getBoundingClientRect().top > window.innerHeight);
  if (!targets.length) return () => {};

  gsap.set(targets, { opacity: 0, y: 24 });
  const shown = new Set<Element>();
  const triggers = ScrollTrigger.batch(targets, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) => {
      const pending = batch.filter((el) => !shown.has(el) && !el.contains(document.activeElement));
      pending.forEach((el) => shown.add(el));
      if (!pending.length) return;
      gsap.to(pending, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        overwrite: true,
        clearProps: 'transform',
      });
    },
  });
  // Con teclado, el bloque enfocado aparece al instante y ya no se anima (base.css lo garantiza
  // además con [data-reveal]:focus-within mientras tenga el foco).
  const onFocus = (e: FocusEvent) => {
    for (let el = (e.target as HTMLElement).closest<HTMLElement>('[data-reveal]'); el; el = el.parentElement?.closest<HTMLElement>('[data-reveal]') ?? null) {
      if (!targets.includes(el)) continue;
      shown.add(el);
      gsap.killTweensOf(el);
      gsap.set(el, { opacity: 1, clearProps: 'transform' });
    }
  };
  document.addEventListener('focusin', onFocus);

  return () => {
    document.removeEventListener('focusin', onFocus);
    triggers.forEach((t) => t.kill());
    gsap.set(targets, { clearProps: 'opacity,transform' });
  };
}

onMotion((ctx) => {
  if (ctx.reducedMotion) return;
  return revealOnScroll(ctx, Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]')));
});
