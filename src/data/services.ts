/**
 * Servicios de CERAMIS: única puerta de entrada tipada para la home, el footer y /servicios/.
 * El contenido de cada servicio vive en src/data/services/<slug>.ts y sale de la
 * "Propuesta de servicios" (precios sin IVA).
 * - `available: false` muestra "Próximamente" y lleva el CTA a la lista de espera.
 * - En los textos marcados como titular, *palabra* se pinta en cursiva de acento (ver lib/text.ts).
 */
import type { FaqItem } from '@/data/faq';
import type { Step } from '@/data/home';
import redes from '@/data/services/gestion-redes-sociales';
import seo from '@/data/services/seo-local';
import agente from '@/data/services/reservas-telefonicas-ia';
import fidelizacion from '@/data/services/fidelizacion-wallet';

export interface Point {
  title: string;
  text: string;
}

export interface Feature extends Point {
  /** Se marca como "Upgrade" (extra opcional). */
  upgrade?: boolean;
}

export type Roi =
  | { kind: 'calculator' }
  | {
      kind: 'example';
      intro: string;
      lines: { label: string; value: string }[];
      result: { label: string; value: string };
      note: string;
    };

export interface Plan {
  name: string;
  /** Cuota mensual sin IVA, en euros. */
  monthly: number;
  /** Alta inicial (pago único) sin IVA, en euros. */
  setup: number;
  goal: string;
  featured?: boolean;
}

export type Pricing =
  | {
      kind: 'plans';
      plans: Plan[];
      /** Tabla comparativa: una fila por característica, un valor por plan. */
      comparison: { label: string; values: string[] }[];
      extras: { label: string; price: string }[];
    }
  | {
      kind: 'single';
      monthly: number;
      setup?: number;
      /** Lo que incluye la cuota, en una línea ("Hasta 300 llamadas al mes"). */
      summary: string;
      includes: string[];
    };

/** Complemento que se contrata sobre un servicio (p. ej. recordatorio de reseñas). */
export interface Addon {
  name: string;
  monthly: number;
  summary: string;
  text: string;
  items: string[];
}

export interface Service {
  slug: string;
  /** Nombre completo (tarjetas, footer, breadcrumb). */
  name: string;
  /** Beneficio en una línea (tarjeta de la home y subtítulo del hero). */
  benefit: string;
  available: boolean;
  image: ImageMetadata;
  imageAlt: string;
  /** Encuadre de la foto cuando se recorta en vertical (object-position). Por defecto, centrada. */
  imagePosition?: string;
  /** Texto del botón principal en las páginas del servicio ("Quiero el agente de IA"). */
  cta: string;
  /** H1 con la keyword principal. Admite *énfasis*. */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  /** Precio de entrada para tarjetas ("desde 390 €/mes"). */
  fromPrice: number;
  pains: Point[];
  benefits: Point[];
  steps: Step[];
  features: Feature[];
  notIncluded: string[];
  roi: Roi;
  pricing: Pricing;
  addon?: Addon;
  /** Permanencia y condiciones propias del servicio, en una línea. */
  terms: string;
  faq: FaqItem[];
}

export const services: Service[] = [redes, seo, agente, fidelizacion];

export const serviceHref = (s: Service) => `/servicios/${s.slug}/`;
export const waitlistHref = (s: Service) => `/contacto/?servicio=${s.slug}#lista-espera`;

export const euros = (n: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, useGrouping: 'always' }).format(n);
