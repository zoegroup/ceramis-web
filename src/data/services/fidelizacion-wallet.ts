import type { Service } from '@/data/services';
import image from '@/assets/services/fidelizacion.webp';

const service: Service = {
  slug: 'fidelizacion-wallet',
  name: 'Tarjeta de fidelización',
  benefit: 'Tarjeta de sellos en el móvil de tus clientes, en Apple y Google Wallet. Sin apps.',
  available: true,
  image,
  imageAlt: 'Taza de cerámica con su plato flotando sobre fondo crema.',
  cta: 'Quiero mi tarjeta de fidelización',
  h1: 'Tarjeta de fidelización digital para *cafeterías* y restaurantes',
  metaTitle: 'Tarjeta de fidelización digital para cafeterías | CERAMIS',
  metaDescription:
    'Tarjeta de sellos en el móvil de tus clientes, en Apple y Google Wallet y sin apps. Programa de fidelización para bares y cafeterías por 50 €/mes.',
  intro:
    'La tarjeta de sellos de toda la vida, ahora en el móvil. Tu cliente la guarda en Apple Wallet o Google Wallet sin descargar nada, y tú consigues tu base de clientes para volver a atraerlos.',
  fromPrice: 50,
  pains: [
    {
      title: 'Clientes que vienen una vez',
      text: 'Les gusta, pero no tienen un motivo para volver antes que a otro sitio.',
    },
    {
      title: 'Tarjetas de cartón que se pierden',
      text: 'Se olvidan en casa, se mojan o se tiran. Y tú no sabes quién las tiene.',
    },
    {
      title: 'Nadie quiere otra app',
      text: 'Pedir que descarguen una app para un café es perder al cliente antes de empezar.',
    },
  ],
  benefits: [
    {
      title: 'Un motivo para volver',
      text: 'Al llegar a los sellos fijados (por ejemplo, 10), la tarjeta muestra el premio.',
    },
    {
      title: 'Siempre en su móvil',
      text: 'Se actualiza sola en cada visita y avisa: "te falta un sello", "tienes un premio".',
    },
    {
      title: 'Tu propia base de clientes',
      text: 'Exportable, solo con quienes dieron su consentimiento, para tus futuras campañas.',
    },
    {
      title: 'Sabes quién vuelve',
      text: 'Altas, miembros activos, sellos por semana y frecuencia de visita en tu Portal del Cliente.',
    },
  ],
  steps: [
    { title: 'Diseñamos tu tarjeta', text: 'Con tu logo y tus colores, y con los sellos, el premio y las condiciones que elijas.' },
    { title: 'El cliente la guarda', text: 'Escanea el QR del local, escribe su nombre y su correo y la añade a su móvil en segundos.' },
    { title: 'Sellas en cada visita', text: 'Tu personal escanea la tarjeta desde el móvil o la tablet del local.' },
    { title: 'Canjea y vuelve', text: 'Al completar la tarjeta, el personal canjea el premio desde el portal.' },
  ],
  features: [
    { title: 'Miembros sin límite', text: 'En iPhone y Android, sin instalar ninguna app.' },
    { title: 'Escáner para el personal', text: 'Desde el móvil o la tablet, sin que el equipo vea el resto de datos.' },
    { title: 'Notificaciones en la tarjeta', text: 'Avisos automáticos y hasta 1 mensaje promocional a la semana.' },
    { title: 'Protección contra trampas', text: 'Solo el personal puede sellar y hay un tiempo mínimo entre sellos.' },
    { title: 'Cambios sin coste', text: 'Diseño, premio o condiciones, cuando quieras.' },
    { title: 'Conforme al RGPD', text: 'Tratamos los datos en tu nombre con contrato de encargo del tratamiento.' },
  ],
  notIncluded: ['La impresión física de los QR o de los expositores.', 'El envío de campañas por correo electrónico.'],
  roi: {
    kind: 'example',
    intro: 'Un ejemplo con un ticket medio de 18 € por persona.',
    lines: [
      { label: 'Clientes con la tarjeta en el móvil', value: '200' },
      { label: 'De ellos, los que vienen una vez más al mes', value: '1 de cada 5 = 40' },
      { label: 'Ticket medio por persona', value: '18 €' },
    ],
    result: { label: 'Facturación extra al mes', value: '720 €' },
    note: '[EJEMPLO] Descuenta el coste del premio. Es un ejemplo ilustrativo, no una promesa de resultados.',
  },
  pricing: {
    kind: 'single',
    monthly: 50,
    setup: 50,
    summary: 'Miembros sin límite. Sin permanencia.',
    includes: [
      'Diseño de la tarjeta con tu logo y tus colores',
      'QR de alta listo para imprimir y formación breve al equipo',
      'Escáner para el personal y notificaciones en la tarjeta',
      'Base de clientes exportable (con consentimiento)',
      'Panel de fidelización en el Portal del Cliente',
    ],
  },
  terms: 'Mensual, sin permanencia. La cuota de alta no es reembolsable.',
  faq: [
    {
      q: '¿El cliente tiene que descargar algo?',
      a: 'No. La tarjeta se guarda en Apple Wallet o Google Wallet, que ya vienen en el móvil.',
    },
    {
      q: '¿Puedo cambiar el premio?',
      a: 'Sí, y también el diseño y las condiciones, sin coste.',
    },
    {
      q: '¿Quién es el dueño de los datos de mis clientes?',
      a: 'Tú. Nosotros los tratamos en tu nombre con un contrato de encargo del tratamiento, conforme al RGPD. Tu cliente acepta la política de privacidad al darse de alta y puede borrar sus datos cuando quiera.',
    },
    {
      q: '¿Sirve para un restaurante o solo para cafeterías?',
      a: 'Para los dos. En restaurantes funciona bien con postres, bebidas o un descuento en la siguiente visita.',
    },
  ],
};

export default service;
