/**
 * Animaciones puntuales (solo con movimiento activado; sin JS o con reduced-motion todo se ve tal cual):
 * - [data-split]         titulares que entran línea a línea tras una máscara (SplitText).
 * - [data-count]         cifras que cuentan desde 0 al aparecer (precios, resultados).
 * - [data-media-reveal]  imágenes que se descubren con un barrido y un leve zoom.
 * - [data-parallax]      imagen que se desplaza un poco más lenta que el scroll.
 * Lo que ya está en pantalla al cargar no se anima (evita parpadeos).
 */
import { onMotion } from '@/lib/motion';

const belowFold = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.95;
const eur = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, useGrouping: 'always' });

onMotion(({ gsap, ScrollTrigger, reducedMotion }) => {
  if (reducedMotion) return;
  const cleanups: (() => void)[] = [];
  let disposed = false;

  // Titulares: SplitText se carga aparte (solo si hay titulares que animar).
  const headings = Array.from(document.querySelectorAll<HTMLElement>('[data-split]')).filter(belowFold);
  if (headings.length) {
    void import('gsap/SplitText').then(({ SplitText }) => {
      if (disposed) return;
      gsap.registerPlugin(SplitText);
      headings.forEach((el) => {
        const split = SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          aria: 'auto',
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              ease: 'expo.out',
              stagger: 0.09,
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            }),
        });
        cleanups.push(() => split.revert());
      });
      ScrollTrigger.refresh();
    });
  }

  // Cifras: el texto final es el del HTML; solo se anima el recorrido.
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    if (!belowFold(el)) return;
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target)) return;
    const final = el.textContent ?? '';
    const state = { v: 0 };
    el.textContent = eur.format(0);
    const tween = gsap.to(state, {
      v: target,
      duration: 1.2,
      ease: 'power3.out',
      paused: true,
      onUpdate: () => (el.textContent = eur.format(Math.round(state.v))),
      onComplete: () => (el.textContent = final),
    });
    const st = ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => tween.play() });
    cleanups.push(() => {
      st.kill();
      tween.kill();
      el.textContent = final;
    });
  });

  // Imágenes con barrido
  document.querySelectorAll<HTMLElement>('[data-media-reveal]').forEach((el) => {
    if (!belowFold(el)) return;
    const img = el.querySelector('img');
    const tl = gsap
      .timeline({ scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
      .fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'expo.out' });
    if (img) tl.fromTo(img, { scale: 1.15 }, { scale: 1, duration: 1.4, ease: 'expo.out', clearProps: 'transform' }, 0);
    cleanups.push(() => {
      tl.scrollTrigger?.kill();
      tl.kill();
      gsap.set([el, img].filter(Boolean), { clearProps: 'clipPath,transform' });
    });
  });

  // Parallax suave
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const img = el.querySelector('img');
    if (!img) return;
    const tween = gsap.fromTo(
      img,
      { yPercent: -6 },
      { yPercent: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }
    );
    cleanups.push(() => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(img, { clearProps: 'transform' });
    });
  });

  return () => {
    disposed = true;
    cleanups.forEach((fn) => fn());
  };
});
