import { PUBLIC_DASHBOARD_URL } from 'astro:env/client';

export const site = {
  name: 'The CERAMIS Agency',
  shortName: 'CERAMIS',
  url: 'https://ceramisagency.com',
  locale: 'es_ES',
  lang: 'es',
  defaultTitle: 'Agencia de marketing para restaurantes en Mallorca | CERAMIS',
  defaultDescription:
    'Agencia de marketing para restaurantes, bares y cafeterías en Mallorca. Captamos clientes nuevos, llenamos tus mesas y hacemos que vuelvan.',
  ogImage: '/brand/og-image-1200x630.png',
  dashboardUrl: PUBLIC_DASHBOARD_URL,
  contact: {
    email: '[EMAIL]',
    phone: '[TELÉFONO]',
    /** Solo dígitos con prefijo de país, p. ej. 34600000000 */
    whatsapp: '[TELEFONO]',
    whatsappText: 'Hola, quiero pedir el diagnóstico gratis para mi restaurante.',
    city: 'Palma de Mallorca',
    region: 'Illes Balears',
  },
  social: [
    { label: 'Instagram', href: 'https://instagram.com/[USUARIO]' },
    { label: 'TikTok', href: 'https://tiktok.com/@[USUARIO]' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/[USUARIO]' },
  ],
} as const;

/** Datos legales (la SL está en constitución). Se usan en formularios y páginas legales. */
export const legal = {
  company: '[RAZÓN SOCIAL]',
  nif: '[NIF]',
  address: '[DOMICILIO]',
  email: '[EMAIL]',
  registry: '[REGISTRO MERCANTIL]',
} as const;

export const nav = [
  { label: 'Servicios', href: '/servicios/' },
  { label: 'Sobre nosotros', href: '/sobre-nosotros/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contacto', href: '/contacto/' },
] as const;

export const legalNav = [
  { label: 'Aviso legal', href: '/aviso-legal/' },
  { label: 'Privacidad', href: '/privacidad/' },
  { label: 'Cookies', href: '/cookies/' },
] as const;

/** CTA principal de toda la web: lleva al formulario de diagnóstico. */
export const primaryCta = { label: 'Pide tu diagnóstico gratis', href: '/contacto/#diagnostico' } as const;

export const whatsappHref = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(site.contact.whatsappText)}`;
