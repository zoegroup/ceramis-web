/**
 * Servicios de CERAMIS: única puerta de entrada tipada para la home, el footer y /servicios/.
 * El contenido de cada servicio vive en src/data/services/<slug>.ts.
 * - `available: false` muestra "Próximamente" y lleva el CTA a la lista de espera.
 * - En los textos marcados como titular, *palabra* se pinta en cursiva de acento (ver lib/text.ts).
 */
import type { FaqItem } from '@/data/faq';
import type { Step } from '@/data/home';
import redes from '@/data/services/gestion-redes-sociales';
import reservasIa from '@/data/services/reservas-telefonicas-ia';
import reservasWeb from '@/data/services/reservas-web';
import wallet from '@/data/services/fidelizacion-wallet';

export type ServiceIllustration = 'social' | 'phone' | 'calendar' | 'wallet';

export interface Plan {
  name: string;
  price: string;
  features: string[];
}

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

export interface Service {
  slug: string;
  /** Nombre completo (tarjetas, footer, breadcrumb). */
  name: string;
  /** Beneficio en una línea (tarjeta de la home y subtítulo del hero). */
  benefit: string;
  available: boolean;
  illustration: ServiceIllustration;
  /** H1 con la keyword principal. Admite *énfasis*. */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  pains: Point[];
  benefits: Point[];
  steps: Step[];
  features: Feature[];
  roi: Roi;
  plans: Plan[];
  faq: FaqItem[];
}

export const services: Service[] = [redes, reservasIa, reservasWeb, wallet];

export const serviceHref = (s: Service) => `/servicios/${s.slug}/`;
export const waitlistHref = (s: Service) => `/contacto/?servicio=${s.slug}#lista-espera`;

