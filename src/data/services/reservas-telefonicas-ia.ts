import type { Service } from '@/data/services';
import image from '@/assets/services/agente.webp';

const service: Service = {
  slug: 'reservas-telefonicas-ia',
  name: 'Agente de IA para llamadas',
  benefit: 'Contesta cada llamada y gestiona tus reservas 24/7, en 6 idiomas.',
  available: true,
  image,
  imageAlt: 'Auricular de teléfono de latón flotando, con ondas de sonido saliendo de él.',
  cta: 'Quiero el agente de IA',
  h1: 'Sistema de reservas telefónicas con IA para *restaurantes*',
  metaTitle: 'Reservas telefónicas con IA para restaurantes | CERAMIS',
  metaDescription:
    'Agente de voz que contesta cada llamada 24/7 en 6 idiomas, gestiona reservas y envía recordatorios por SMS. Desde 249 €/mes, sin permanencia.',
  intro:
    'Un agente de voz con inteligencia artificial atiende las llamadas de tu restaurante 24 horas al día y gestiona las reservas sin que tu equipo tenga que coger el teléfono.',
  fromPrice: 249,
  pains: [
    {
      title: 'El teléfono suena en pleno servicio',
      text: 'O atiendes la mesa o atiendes la llamada. Elijas lo que elijas, alguien sale perdiendo.',
    },
    {
      title: 'Llamadas fuera de horario',
      text: 'Mucha gente reserva por la noche o en tu día de cierre. Si nadie contesta, llama a otro.',
    },
    {
      title: 'Mesas vacías por olvidos',
      text: 'Reservas que no se presentan porque nadie les recordó la cita. La mesa se queda sin vender.',
    },
  ],
  benefits: [
    {
      title: 'Ninguna llamada sin contestar',
      text: 'También en hora punta, con el local cerrado y con varias llamadas a la vez.',
    },
    {
      title: 'Turistas atendidos en su idioma',
      text: 'Habla en 6 idiomas con voz natural. En Mallorca, eso son mesas que hoy se pierden.',
    },
    {
      title: 'Menos mesas vacías',
      text: 'Cada reserva recibe confirmación y recordatorio por SMS.',
    },
    {
      title: 'Sabes de dónde vienen tus clientes',
      text: 'El agente pregunta "¿cómo nos has conocido?" y lo registra en tu Portal del Cliente.',
    },
  ],
  steps: [
    { title: 'Configuración', text: 'Cargamos tus horarios, capacidad, carta y políticas de reserva y de grupos.' },
    { title: 'Pruebas', text: 'Probamos el agente antes de activarlo, hasta que responde como tú quieres.' },
    { title: 'Desvío de llamadas', text: 'Te ayudamos a desviar las llamadas desde tu número actual. No cambias de teléfono.' },
    { title: 'Formación y portal', text: '30 minutos con tu equipo para usar el portal: reservas y llamadas en tiempo real.' },
  ],
  features: [
    { title: 'Atención 24/7', text: 'Contesta todas las llamadas, también en hora punta y con el local cerrado.' },
    { title: '6 idiomas con voz natural', text: 'Atiende a locales y turistas en su idioma.' },
    { title: 'Reservas en tiempo real', text: 'Crea, modifica y cancela según la disponibilidad real del local.' },
    { title: 'Confirmación y recordatorio por SMS', text: 'Incluidos en la cuota, para reducir las mesas vacías.' },
    { title: 'Origen de cada cliente', text: 'Pregunta cómo te ha conocido y lo registra en el portal.' },
    { title: 'Transparente y legal', text: 'Se identifica como asistente de IA al inicio de cada llamada, como exige la normativa europea.' },
  ],
  notIncluded: [
    'El coste de las llamadas de tu operador por el desvío.',
    'La integración con otros programas de reservas o TPV (se presupuesta aparte).',
    'La atención telefónica humana.',
  ],
  roi: { kind: 'calculator' },
  pricing: {
    kind: 'single',
    monthly: 249,
    setup: 390,
    summary: 'Hasta 300 llamadas al mes. Cada llamada adicional, 0,40 €.',
    includes: [
      'El agente activo 24/7 y hasta 300 llamadas al mes',
      'SMS de confirmación y recordatorio',
      'Cambios de horario, carta o temporada sin coste',
      'Soporte por correo en horario laboral',
      'Módulo de reservas y llamadas en el Portal del Cliente',
    ],
  },
  addon: {
    name: 'Recordatorio de reseñas',
    monthly: 29,
    summary: 'Hasta 150 envíos al mes. Requiere el agente de IA.',
    text: 'Después de la visita, cada cliente recibe un SMS con el enlace directo para dejar su reseña en tu ficha de Google.',
    items: [
      'Se envía a todos los clientes por igual, como exigen las normas de Google',
      'El cliente puede darse de baja de los mensajes en cualquier momento',
      'En el portal: mensajes enviados, clics, reseñas nuevas y valoración media',
    ],
  },
  terms: 'Mensual, sin permanencia. La cuota de alta no es reembolsable.',
  faq: [
    {
      q: '¿Mis clientes sabrán que hablan con una IA?',
      a: 'Sí. El agente se identifica como asistente de inteligencia artificial al inicio de cada llamada, como exige la normativa europea. Habla con voz natural y en 6 idiomas.',
    },
    {
      q: '¿Tengo que cambiar de número de teléfono?',
      a: 'No. Te ayudamos a desviar las llamadas desde tu número actual. El coste del desvío de tu operador no está incluido.',
    },
    {
      q: '¿Qué pasa si recibo más de 300 llamadas?',
      a: 'Cada llamada adicional se factura a 0,40 €. En el portal ves en todo momento cuántas llevas en el mes.',
    },
    {
      q: '¿Funciona con mi programa de reservas?',
      a: 'El agente trae su propio sistema de reservas en el Portal del Cliente. La integración con otros programas de reservas o con tu TPV se presupuesta aparte.',
    },
    {
      q: '¿Hay permanencia?',
      a: 'No. Es una suscripción mensual. La cuota de alta, que cubre la configuración, las pruebas y la formación, no es reembolsable.',
    },
  ],
};

export default service;
