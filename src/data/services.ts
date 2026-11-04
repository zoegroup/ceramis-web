/**
 * Servicios de CERAMIS. Fuente única para la home, el footer y las páginas de servicio (Fase 3).
 * `available: false` muestra "Próximamente" y lleva el CTA a la lista de espera.
 */
export type ServiceIllustration = 'social' | 'phone' | 'calendar' | 'wallet';

export interface Plan {
  name: string;
  price: string;
  features: string[];
}

export interface Service {
  slug: string;
  /** Nombre completo (tarjetas, footer, H1 base). */
  name: string;
  /** Beneficio en una línea para la tarjeta de la home. */
  benefit: string;
  available: boolean;
  illustration: ServiceIllustration;
  plans: Plan[];
}

const planPorDefinir = (name: string): Plan => ({
  name,
  price: '[POR DEFINIR]',
  features: ['[POR DEFINIR]'],
});

export const services: Service[] = [
  {
    slug: 'gestion-redes-sociales',
    name: 'Gestión de redes sociales',
    benefit: 'Contenido que da hambre y trae clientes nuevos a tu puerta.',
    available: true,
    illustration: 'social',
    plans: [planPorDefinir('Plan 1'), planPorDefinir('Plan 2'), planPorDefinir('Plan 3')],
  },
  {
    slug: 'reservas-telefonicas-ia',
    name: 'Reservas telefónicas con IA',
    benefit: 'Un agente de voz que coge cada llamada y apunta cada reserva, 24/7.',
    available: true,
    illustration: 'phone',
    plans: [planPorDefinir('Suscripción mensual')],
  },
  {
    slug: 'reservas-web',
    name: 'Reservas web',
    benefit: 'Reservas desde tu web y tu ficha de Google, sin comisiones por cubierto.',
    available: true,
    illustration: 'calendar',
    plans: [planPorDefinir('Reservas web')],
  },
  {
    slug: 'fidelizacion-wallet',
    name: 'Fidelización con Wallet',
    benefit: 'Tarjeta de sellos en el móvil de tus clientes. Sin apps.',
    available: true,
    illustration: 'wallet',
    plans: [planPorDefinir('Wallet')],
  },
];

export const serviceHref = (s: Service) => `/servicios/${s.slug}/`;
export const waitlistHref = (s: Service) => `/contacto/?servicio=${s.slug}#lista-espera`;
