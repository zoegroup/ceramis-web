import type { Service } from '@/data/services';
import { planPorDefinir } from './shared';

const service: Service = {
  slug: 'reservas-web',
  name: 'Reservas web',
  benefit: 'Reservas desde tu web y tu ficha de Google, sin comisiones por cubierto.',
  available: true,
  illustration: 'calendar',
  h1: 'Sistema de reservas online para *restaurantes*',
  metaTitle: 'Sistema de reservas online para restaurantes | CERAMIS',
  metaDescription:
    'Motor de reservas para tu web y tu ficha de Google, sin comisiones por comensal. Más reservas directas para tu restaurante en Mallorca.',
  intro:
    'Un motor de reservas en tu web y en tu ficha de Google. Quien te encuentra, reserva en dos clics y sin llamar.',
  pains: [
    {
      title: 'Comisiones por cada comensal',
      text: 'Las grandes plataformas cobran por cubierto. Pagas por clientes que muchas veces ya eran tuyos.',
    },
    {
      title: 'Si no puedes llamar, no reservas',
      text: 'Mucha gente prefiere no llamar. Si no puede reservar online, busca otro sitio.',
    },
    {
      title: 'Tu ficha de Google no convierte',
      text: 'Te encuentran en Google Maps, pero no hay botón de reservar. Visita perdida.',
    },
  ],
  benefits: [
    {
      title: 'Reservas directas',
      text: 'Tus clientes reservan contigo, sin intermediarios ni comisiones por cubierto. [VALIDAR]',
    },
    {
      title: 'Reservas desde Google',
      text: 'Botón de reservar en tu ficha de Google: de la búsqueda a la mesa en un minuto.',
    },
    {
      title: 'Agenda siempre al día',
      text: 'Todas las reservas en un mismo sitio, también las del asistente telefónico.',
    },
  ],
  steps: [
    { title: 'Configuramos tu agenda', text: 'Mesas, turnos, horarios y capacidad.' },
    { title: 'Lo integramos en tu web', text: 'Un widget a tu estilo, sin rehacer tu página.' },
    { title: 'Lo conectamos con Google', text: 'Activamos el botón de reservar en tu ficha.' },
    { title: 'Lo gestionas desde el Dashboard', text: 'Ves, mueves y confirmas reservas desde un solo panel.' },
  ],
  features: [
    { title: 'Widget para tu web', text: 'Integrado con tu diseño y adaptado al móvil.' },
    { title: 'Reservas desde Google', text: 'Botón de reservar en tu ficha de Google.' },
    { title: 'Gestión de mesas y turnos', text: 'Controla la capacidad para no pasarte ni quedarte corto.' },
    { title: 'Sin comisión por comensal', text: 'Una cuota fija y listo. [POR DEFINIR]' },
    { title: 'Confirmación por email', text: 'El cliente recibe su reserva confirmada al instante.', upgrade: true },
    { title: 'Recordatorios por SMS', text: 'Menos mesas vacías por olvidos.', upgrade: true },
    { title: 'Seguimiento por WhatsApp', text: 'Confirmaciones, recordatorios y mensajes después de la visita.', upgrade: true },
  ],
  roi: {
    kind: 'example',
    intro: 'Un ejemplo con reservas de 2 personas y un ticket medio de 18 € por persona.',
    lines: [
      { label: 'Reservas online nuevas al mes (gente que no habría llamado)', value: '30' },
      { label: 'Ticket medio por reserva (2 × 18 €)', value: '36 €' },
    ],
    result: { label: 'Facturación nueva al mes', value: '1.080 €' },
    note: '[EJEMPLO] Sin contar lo que te ahorras en comisiones de plataformas. Es un ejemplo ilustrativo, no una promesa de resultados.',
  },
  plans: [planPorDefinir('Reservas web')],
  faq: [
    {
      q: '¿Necesito tener página web?',
      a: 'No es imprescindible: con la ficha de Google ya puedes recibir reservas. Si tienes web, lo integramos en ella.',
    },
    {
      q: '¿Funciona junto al asistente telefónico?',
      a: 'Sí. Las reservas de teléfono y web van a la misma agenda.',
    },
    {
      q: '¿Puedo bloquear días o turnos?',
      a: 'Sí. Cierres, eventos privados o turnos completos se bloquean desde el Dashboard.',
    },
  ],
};

export default service;
