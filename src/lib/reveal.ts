/**
 * Reveal genérico: los elementos con [data-reveal] entran con fade + 24 px al aparecer.
 * - Una sola vez por elemento; los que llegan juntos se escalonan.
 * - Lo que ya está en pantalla al cargar no se anima (evita parpadeos).
 * - Sin JS o con reduced-motion no se oculta nada.
 * - Solo opacidad (no visibility): lo oculto sigue siendo enfocable con el teclado,
 *   y al recibir foco se muestra al instante.
 */
import { onMotion, type MotionContext } from '@/lib/motion';

/** Aplica el reveal a unos elementos concretos. Devuelve su limpieza. */
export function revealOnScroll({ gsap, ScrollTrigger }: MotionContext, elements: HTMLElement[]) {
  const targets = elements.filter((el) => el.getBoundingClientRect().top > window.innerHeight);
  if (!targets.length) return () => {};

  gsap.set(targets, { opacity: 0, y: 24 });
  const triggers = ScrollTrigger.batch(targets, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        overwrite: true,
        clearProps: 'transform',
      }),
  });
  const onFocus = (e: FocusEvent) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-reveal]');
    if (el && targets.includes(el)) gsap.to(el, { opacity: 1, y: 0, duration: 0.3, overwrite: true });
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
