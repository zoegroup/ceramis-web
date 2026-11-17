/** Contenido de las secciones de la home que no son servicios, valores ni FAQ. */

export interface Problem {
  title: string;
  figure: string;
  figureLabel: string;
  text: string;
}

/** Las tres fugas de la home, con cifras validadas por CERAMIS. */
export const problems: Problem[] = [
  {
    title: 'Llamadas perdidas',
    figure: '1 de cada 4',
    figureLabel: 'llamadas en hora punta se quedan sin contestar',
    text: 'En pleno servicio nadie puede coger el teléfono. Ese cliente no deja mensaje: llama al restaurante de al lado.',
  },
  {
    title: 'Clientes que no vuelven',
    figure: '5×',
    figureLabel: 'más caro captar un cliente nuevo que mantener uno',
    text: 'Vienen, les encanta y no vuelven. No por nada malo: simplemente nadie les dio un motivo para repetir.',
  },
  {
    title: 'Falta de clientes nuevos',
    figure: '8 de cada 10',
    figureLabel: 'personas buscan en Google o Instagram antes de elegir dónde comer',
    text: 'Si tu ficha está a medias y tus redes paradas, no existes para quien todavía no te conoce.',
  },
];

export interface Step {
  title: string;
  text: string;
}

/** Paso del proceso de la home: además del texto, cuándo ocurre y qué se lleva el cliente. */
export interface ProcessStep extends Step {
  when: string;
  deliverable: string;
  icon: 'diagnostico' | 'plan' | 'implementacion' | 'medicion';
}

export const steps: ProcessStep[] = [
  {
    title: 'Diagnóstico',
    when: '30 minutos · Gratis',
    text: 'Vemos cómo captas y fidelizas hoy: llamadas, reservas, Google y redes. Sin compromiso.',
    deliverable: 'Dónde se te escapan clientes y por dónde empezar.',
    icon: 'diagnostico',
  },
  {
    title: 'Plan',
    when: 'Propuesta a medida',
    text: 'Te proponemos solo lo que va a mover la caja, con prioridades y precios claros.',
    deliverable: 'Un plan por escrito, con objetivos y números.',
    icon: 'plan',
  },
  {
    title: 'Implementación',
    when: 'Lo montamos nosotros',
    text: 'Configuramos, grabamos y publicamos. Tú sigues con tu restaurante; nosotros con lo nuestro.',
    deliverable: 'Todo funcionando, sin que tengas que tocar nada.',
    icon: 'implementacion',
  },
  {
    title: 'Medición y mejora',
    when: 'Cada mes',
    text: 'Revisamos los datos contigo y ajustamos lo que haga falta para que cada mes rinda más.',
    deliverable: 'Tu informe mensual en el Portal del Cliente.',
    icon: 'medicion',
  },
];

/** Caso real. Mientras `showCase` sea false, el bloque no se renderiza. */
export const showCase = false;

export const caseStudy = {
  client: '[NOMBRE DEL RESTAURANTE]',
  place: 'Palma de Mallorca',
  summary: 'Qué hicimos y en cuánto tiempo. [POR COMPLETAR]',
  metrics: [
    { value: '[POR COMPLETAR]', label: 'reservas al mes atendidas por la IA' },
    { value: '[POR COMPLETAR]', label: 'clientes con tarjeta Wallet' },
    { value: '[POR COMPLETAR]', label: 'de visitas repetidas' },
  ],
  quote: '[CITA DEL CLIENTE POR COMPLETAR]',
  author: '[NOMBRE], [CARGO]',
};

export interface Reason {
  /** Clave del icono en WhyUs.astro. */
  icon: 'hosteleria' | 'equipo' | 'precios' | 'libertad' | 'idiomas' | 'cerca';
  title: string;
  text: string;
}

/** Por qué elegirnos: lo que nos diferencia de una agencia de marketing generalista. */
export const reasons: Reason[] = [
  {
    icon: 'hosteleria',
    title: 'Solo hostelería',
    text: 'No hacemos inmobiliarias ni clínicas. Solo bares, cafeterías y restaurantes: sabemos lo que pasa un viernes a las 21:30.',
  },
  {
    icon: 'equipo',
    title: 'Todo en un mismo equipo',
    text: 'Redes, Google Maps, reservas con IA y fidelización, conectados entre sí y medidos en tu Portal del Cliente.',
  },
  {
    icon: 'precios',
    title: 'Precios públicos',
    text: 'Nuestras tarifas están en la web. Sin presupuestos a ciegas ni sorpresas en la factura.',
  },
  {
    icon: 'libertad',
    title: 'Sin atarte',
    text: 'El agente de IA y la tarjeta de fidelización van mes a mes. Redes y SEO local, 3 meses de mínimo y después mensual.',
  },
  {
    icon: 'idiomas',
    title: 'También para el turista',
    text: 'Contenido y ficha de Google en español, inglés y alemán. El agente de IA atiende llamadas en 6 idiomas.',
  },
  {
    icon: 'cerca',
    title: 'Cerca y en persona',
    text: 'Estamos en Palma. Vamos a tu local, grabamos allí y te explicamos los números cara a cara.',
  },
];
