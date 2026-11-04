/** Contenido de las secciones de la home que no son servicios, valores ni FAQ. */

export interface Problem {
  title: string;
  figure: string;
  figureLabel: string;
  text: string;
}

/** Datos orientativos: todos marcados [DATO A VALIDAR] hasta tener una fuente. */
export const problems: Problem[] = [
  {
    title: 'Llamadas perdidas',
    figure: '1 de cada 4',
    figureLabel: 'llamadas en hora punta se quedan sin contestar [DATO A VALIDAR]',
    text: 'En pleno servicio nadie puede coger el teléfono. Ese cliente no deja mensaje: llama al restaurante de al lado.',
  },
  {
    title: 'Clientes que no vuelven',
    figure: '5×',
    figureLabel: 'más caro captar un cliente nuevo que mantener uno [DATO A VALIDAR]',
    text: 'Vienen, les encanta y no vuelven. No por nada malo: simplemente nadie les dio un motivo para repetir.',
  },
  {
    title: 'Falta de clientes nuevos',
    figure: '8 de cada 10',
    figureLabel: 'personas buscan en Google o Instagram antes de elegir dónde comer [DATO A VALIDAR]',
    text: 'Si tu ficha está a medias y tus redes paradas, no existes para quien todavía no te conoce.',
  },
];

export interface Step {
  title: string;
  text: string;
}

export const steps: Step[] = [
  {
    title: 'Diagnóstico',
    text: 'Vemos cómo captas y fidelizas hoy: llamadas, reservas, Google y redes. Gratis y sin compromiso.',
  },
  {
    title: 'Plan',
    text: 'Te proponemos solo lo que va a mover la caja, con prioridades y números claros.',
  },
  {
    title: 'Implementación',
    text: 'Lo montamos nosotros. Tú sigues con tu restaurante; nosotros con lo nuestro.',
  },
  {
    title: 'Medición y mejora',
    text: 'Cada mes revisamos los datos en tu Dashboard y ajustamos lo que haga falta.',
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
