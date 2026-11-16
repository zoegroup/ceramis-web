import type { Service } from '@/data/services';
import image from '@/assets/services/seo.webp';

const service: Service = {
  slug: 'seo-local',
  name: 'SEO local',
  benefit: 'Que te encuentren en Google Maps cuando buscan dónde comer cerca.',
  available: true,
  image,
  imageAlt: 'Mapa del centro de Palma con un restaurante destacado y su ficha de Google.',
  imagePosition: '79% 50%',
  cta: 'Quiero aparecer en Google Maps',
  h1: 'SEO local para restaurantes en Mallorca: aparece en *Google Maps*',
  metaTitle: 'SEO local para restaurantes en Mallorca | CERAMIS',
  metaDescription:
    'Optimizamos tu ficha de Google para que aparezcas en el mapa cuando buscan restaurante cerca. Reseñas, fotos y seguimiento mensual. 149 €/mes.',
  intro:
    'Cuando alguien busca "restaurante italiano Palma", Google enseña primero un mapa con tres negocios. Trabajamos para que uno de ellos seas tú.',
  fromPrice: 149,
  pains: [
    {
      title: 'No apareces en el mapa',
      text: 'Si tu ficha no está optimizada, Google enseña a tu competencia aunque estés a la vuelta de la esquina.',
    },
    {
      title: 'Datos que no cuadran',
      text: 'Horarios viejos, teléfono distinto en cada sitio o sin enlace de reserva. Google desconfía y el cliente también.',
    },
    {
      title: 'Reseñas sin respuesta',
      text: 'Cada reseña sin contestar es una oportunidad perdida de demostrar cómo tratas a tus clientes.',
    },
  ],
  benefits: [
    {
      title: 'Más visibilidad en Google',
      text: 'Categorías, fotos, carta y palabras clave en los idiomas de tu público: español, inglés y alemán.',
    },
    {
      title: 'Más llamadas, rutas y reservas',
      text: 'Medimos cuántas personas te llaman, piden cómo llegar o reservan desde tu ficha.',
    },
    {
      title: 'Reseñas siempre respondidas',
      text: 'En menos de 48 horas laborables y en el idioma de quien la escribe.',
    },
    {
      title: 'Los mismos datos en todas partes',
      text: 'Google, Apple Maps, Bing, Facebook, TripAdvisor, TheFork y Yelp, coherentes entre sí.',
    },
  ],
  steps: [
    { title: 'Auditoría', text: 'Revisamos tu ficha de Google Business Profile y la de 3 competidores directos.' },
    { title: 'Palabras clave', text: 'Estudiamos qué busca tu público, también en inglés y alemán.' },
    { title: 'Optimización', text: 'Categorías, atributos, horarios, carta, descripción, enlace de reserva y un mínimo de 20 fotos.' },
    { title: 'Trabajo mensual', text: 'Publicaciones, fotos nuevas, reseñas respondidas e informe de posición por zonas.' },
  ],
  features: [
    { title: '4 publicaciones al mes en la ficha', text: 'Novedades, ofertas o eventos para mantenerla activa.' },
    { title: '10 fotos nuevas al mes o más', text: 'Aprovechando las sesiones de grabación de redes si las tienes.' },
    { title: 'Respuesta a todas las reseñas', text: 'En un máximo de 48 h laborables, en el idioma de quien escribe.' },
    { title: 'Control de cambios no autorizados', text: 'Google y otros usuarios pueden sugerir ediciones: las vigilamos.' },
    { title: 'Horarios, temporada y carta al día', text: 'Incluidos festivos y cambios de temporada.' },
    { title: 'Posición en el mapa por zonas', text: 'Seguimiento de 5 palabras clave e informe mensual en tu Portal del Cliente.' },
  ],
  notIncluded: [
    'El SEO de la página web (contenidos, blog y enlaces).',
    'La gestión de reseñas en plataformas de pago.',
    'Garantía de una posición concreta: nadie puede garantizar el primer puesto en Google.',
  ],
  roi: {
    kind: 'example',
    intro: 'Un ejemplo con mesas de 2 personas y un ticket medio de 18 € por persona.',
    lines: [
      { label: 'Llamadas y rutas nuevas al mes desde la ficha', value: '40' },
      { label: 'De ellas, las que acaban en mesa', value: '1 de cada 4 = 10' },
      { label: 'Ticket medio por mesa (2 × 18 €)', value: '36 €' },
    ],
    result: { label: 'Facturación nueva al mes', value: '360 €' },
    note: '[EJEMPLO] Más del doble de la cuota mensual. Medimos llamadas, rutas y clics reales desde el primer mes.',
  },
  pricing: {
    kind: 'single',
    monthly: 149,
    setup: 190,
    summary: 'Incluido en el plan Captación de redes sociales.',
    includes: [
      'Auditoría y optimización completa de la ficha el primer mes',
      'Datos coherentes en Apple Maps, Bing, Facebook, TripAdvisor, TheFork y Yelp',
      '4 publicaciones y 10 fotos nuevas al mes',
      'Respuesta a reseñas en 48 h laborables',
      'Informe mensual en el Portal del Cliente',
    ],
  },
  terms: 'Permanencia mínima de 3 meses. Después, mensual.',
  faq: [
    {
      q: '¿Me garantizáis el primer puesto en Google?',
      a: 'No, y desconfía de quien lo haga: nadie puede garantizarlo. Nos comprometemos con el trabajo y con la medición mensual de tu posición en el mapa por zonas.',
    },
    {
      q: '¿Cómo conseguís más reseñas?',
      a: 'Pidiéndolas a todos los clientes por igual, con QR en mesa o mostrador y, si lo contratas, con el recordatorio automático por SMS. Nunca ofrecemos descuentos a cambio, nunca filtramos a los satisfechos y nunca compramos reseñas: Google lo penaliza.',
    },
    {
      q: '¿Tocáis mi página web?',
      a: 'Revisamos que tus datos de contacto, el mapa y los datos de negocio local sean correctos y te damos recomendaciones. Si la web no es nuestra, la implementación se presupuesta aparte.',
    },
    {
      q: '¿Va incluido en algún plan de redes?',
      a: 'Sí: el plan Captación incluye el servicio completo y el plan Crecimiento incluye la optimización inicial de la ficha.',
    },
  ],
};

export default service;
