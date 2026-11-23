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
  ogImage: '/og/default.jpg',
  dashboardUrl: PUBLIC_DASHBOARD_URL,
  contact: {
    email: 'the@ceramisagency.com',
    /** Para mostrar. */
    phone: '+34 604 33 91 03',
    /** Para enlaces tel: y schema (E.164). */
    phoneHref: '+34604339103',
    /** Solo dígitos con prefijo de país (wa.me). */
    whatsapp: '34604339103',
    whatsappText: 'Hola, quiero pedir el diagnóstico gratis para mi restaurante.',
    city: 'Palma de Mallorca',
    region: 'Illes Balears',
    hours: [{ days: 'Lunes a viernes', time: '9:00–18:00 [VALIDAR]' }],
    /** El mapa y las indicaciones apuntan al centro de Palma, no al domicilio del titular. */
    mapsHref: 'https://www.google.com/maps/search/?api=1&query=Palma+de+Mallorca',
  },
  /** Ficha de Google Business Profile (ID del Knowledge Graph). Va al schema (sameAs) y al footer. */
  googleProfile: 'https://www.google.com/search?kgmid=/g/11z_j_zf9t',
  /** Variantes del nombre con las que nos buscan: schema (alternateName). */
  alternateNames: ['CERAMIS', 'Ceramis Agency', 'The Ceramis Agency', 'CERAMIS Agency'],
  social: [
    { label: 'Instagram', href: 'https://instagram.com/[USUARIO]' },
    { label: 'TikTok', href: 'https://tiktok.com/@[USUARIO]' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/[USUARIO]' },
  ],
} as const;

const isPlaceholder = (href: string) => href.includes('[');

/** Perfiles públicos ya creados (sin placeholders) más la ficha de Google: footer y schema. */
export const profiles = [
  ...site.social.filter((s) => !isPlaceholder(s.href)),
  { label: 'Reseñas en Google', href: site.googleProfile },
];

/** @id de los nodos globales de schema.org (ver SchemaOrg.astro). */
export const schemaIds = {
  organization: 'https://ceramisagency.com/#organization',
  website: 'https://ceramisagency.com/#website',
} as const;

/**
 * Titular de la web: trabajador autónomo (persona física). Se usan en el formulario (primera capa
 * RGPD), las páginas legales y el schema. La LSSI-CE (art. 10) obliga a publicar nombre, NIF y domicilio.
 */
export const legal = {
  holder: 'Juan David Marulanda Villa',
  nif: '49921440D',
  street: 'Carrer de Sant Ignasi, 58',
  postalCode: '07008',
  locality: 'Palma',
  address: 'Carrer de Sant Ignasi, 58, 07008 Palma (Illes Balears)',
  email: 'the@ceramisagency.com',
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
