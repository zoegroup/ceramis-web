/**
 * Secuencia de frames del hero pintada en <canvas>.
 * - Carga por prioridad con Image.decode(): primeros 40 frames, luego uno de cada dos y al final
 *   los intermedios. Así todo el recorrido se ve fluido antes, aunque la red sea lenta.
 * - Si un frame aún no está, pinta el más cercano ya cargado (de cualquier set).
 * - Interpola entre frames consecutivos con un fundido, así el scrub no da saltos.
 * - La caché vive a nivel de módulo: navegar y volver no vuelve a descargar nada.
 */
export type SetName = 'mobile' | 'tablet' | 'desktop';

export const FRAME_SETS: Record<SetName, { w: number; h: number }> = {
  mobile: { w: 720, h: 900 },
  tablet: { w: 1120, h: 630 },
  desktop: { w: 1600, h: 900 },
};

const PRIORITY_FRAMES = 40;
const CONCURRENCY = 6;
/** Cuánto dejamos ampliar un set antes de pasar al siguiente más grande. */
const MAX_UPSCALE = 1.15;

const cache = new Map<string, HTMLImageElement>();

/** Implementa el patrón tipo printf del manifest (p. ej. "f_%04d.webp"). */
function formatPattern(pattern: string, n: number) {
  return pattern.replace(/%0?(\d*)d/, (_, width: string) => String(n).padStart(Number(width) || 0, '0'));
}

export class FrameSequence {
  private queueToken = 0;

  constructor(
    private base: string,
    readonly count: number,
    private pattern: string
  ) {}

  url(set: SetName, index: number) {
    return `${this.base}${set}/${formatPattern(this.pattern, index + 1)}`;
  }

  get(set: SetName, index: number) {
    return cache.get(this.url(set, index));
  }

  /** Descarga y decodifica un set en orden de prioridad. Cancela la cola anterior. */
  load(set: SetName, onFrame: (index: number) => void) {
    const token = ++this.queueToken;
    const order = Array.from({ length: this.count }, (_, i) => i);
    const head = order.slice(0, PRIORITY_FRAMES);
    const rest = order.slice(PRIORITY_FRAMES);
    const evens = rest.filter((i) => i % 2 === 0);
    const odds = rest.filter((i) => i % 2 === 1);
    const queue = [...head, ...evens, ...odds].filter((i) => !cache.has(this.url(set, i)));

    const worker = async () => {
      while (queue.length && token === this.queueToken) {
        const index = queue.shift()!;
        const src = this.url(set, index);
        const img = new Image();
        img.decoding = 'async';
        img.src = src;
        try {
          await img.decode();
        } catch {
          continue; // Un frame que falla no rompe la secuencia: se usará el más cercano.
        }
        cache.set(src, img);
        if (token === this.queueToken) onFrame(index);
      }
    };
    for (let i = 0; i < CONCURRENCY; i++) void worker();
  }

  cancel() {
    this.queueToken++;
  }

  /** Frame cargado más cercano a `index`, priorizando el set pedido. */
  nearest(set: SetName, index: number): { img: HTMLImageElement; index: number } | undefined {
    const sets: SetName[] = [set, ...(Object.keys(FRAME_SETS) as SetName[]).filter((s) => s !== set)];
    for (const s of sets) {
      for (let d = 0; d < this.count; d++) {
        const before = this.get(s, index - d);
        if (before) return { img: before, index: index - d };
        const after = this.get(s, index + d);
        if (after) return { img: after, index: index + d };
      }
    }
    return undefined;
  }
}

/** Elige el set: móvil por ancho de viewport; en el resto, el más ligero que no se vea borroso. */
export function chooseSet(viewportWidth: number, boxW: number, boxH: number, dpr: number): SetName {
  if (viewportWidth < 768) return 'mobile';
  const { w, h } = FRAME_SETS.tablet;
  // Tamaño en píxeles reales al que se pintará la imagen en modo "cover".
  const scale = Math.max(boxW / w, boxH / h) * dpr;
  return scale <= MAX_UPSCALE ? 'tablet' : 'desktop';
}

export class HeroRenderer {
  private ctx: CanvasRenderingContext2D;
  private set: SetName = 'desktop';
  private frame = 0;
  private cssW = 0;
  private cssH = 0;
  private dpr = 1;
  private hasPainted = false;
  /** Índice del frame realmente pintado (puede ser un sustituto mientras carga el bueno). */
  private paintedIndex = -1;
  private paintedSet: SetName | null = null;

  constructor(
    private canvas: HTMLCanvasElement,
    private seq: FrameSequence,
    private onFirstPaint?: () => void
  ) {
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) throw new Error('Canvas 2D no disponible');
    this.ctx = ctx;
  }

  /** Ajusta el canvas a su caja y (re)elige el set. No borra los frames ya cargados. */
  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.cssW = Math.max(1, Math.round(rect.width));
    this.cssH = Math.max(1, Math.round(rect.height));
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(this.cssW * this.dpr);
    this.canvas.height = Math.round(this.cssH * this.dpr);

    const next = chooseSet(window.innerWidth, this.cssW, this.cssH, this.dpr);
    if (next !== this.set || !this.hasPainted) {
      this.set = next;
      this.seq.load(next, (i) => {
        // Repinta si el frame recién llegado mejora lo que hay en pantalla.
        const target = Math.floor(this.frame);
        const better =
          !this.hasPainted ||
          i === target + 1 ||
          Math.abs(i - target) < Math.abs(this.paintedIndex - target) ||
          (i === target && this.paintedSet !== this.set);
        if (better) this.render(this.frame, true);
      });
    }
    this.render(this.frame, true);
  }

  /** Pinta el frame `f` (puede ser fraccionario: se funden los dos frames vecinos). */
  render(f: number, force = false) {
    const clamped = Math.min(Math.max(f, 0), this.seq.count - 1);
    if (!force && clamped === this.frame && this.hasPainted) return;
    this.frame = clamped;

    const lo = Math.floor(clamped);
    const hi = Math.min(lo + 1, this.seq.count - 1);
    // Fundido solo en la franja central entre dos frames: en reposo la imagen queda nítida.
    const t = Math.min(Math.max((clamped - lo - 0.35) / 0.3, 0), 1);

    const exact = this.seq.get(this.set, lo);
    const fallback = exact ? undefined : this.seq.nearest(this.set, lo);
    const a = exact ?? fallback?.img;
    if (!a) return;
    this.paintedIndex = exact ? lo : fallback!.index;
    this.paintedSet = exact ? this.set : null;
    const b = t > 0 ? this.seq.get(this.set, hi) : undefined;

    const { ctx, canvas } = this;
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (b && t >= 1) {
      this.drawCover(b);
      this.paintedIndex = hi;
    } else {
      this.drawCover(a);
    }
    if (b && t < 1) {
      ctx.globalAlpha = t;
      this.drawCover(b);
      ctx.globalAlpha = 1;
    }

    if (!this.hasPainted) {
      this.hasPainted = true;
      this.onFirstPaint?.();
    }
  }

  private drawCover(img: HTMLImageElement) {
    const W = this.canvas.width;
    const H = this.canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const s = Math.max(W / iw, H / ih);
    const dw = iw * s;
    const dh = ih * s;
    this.ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
  }

  destroy() {
    this.seq.cancel();
  }
}
