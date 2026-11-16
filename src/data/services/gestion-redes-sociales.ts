import type { Service } from '@/data/services';
import image from '@/assets/services/redes.webp';

const service: Service = {
  slug: 'gestion-redes-sociales',
  name: 'Gestión de redes sociales',
  benefit: 'Estrategia, grabación y contenido que trae clientes nuevos a tu puerta.',
  available: true,
  image,
  imageAlt: 'Cámara de fotos color latón flotando sobre fondo crema.',
  cta: 'Quiero mi plan de redes',
  h1: 'Gestión de redes sociales para restaurantes en *Palma*',
  metaTitle: 'Gestión de redes para restaurantes en Palma | CERAMIS',
  metaDescription:
    'Community manager para restaurantes en Mallorca: estrategia, grabación, edición y métricas. Planes desde 390 €/mes con resultados medibles.',
  intro:
    'No vendemos publicaciones sueltas: un sistema mensual de estrategia, grabación, contenido y medición para que más gente te encuentre, te elija y vuelva.',
  fromPrice: 390,
  pains: [
    {
      title: 'No tienes tiempo',
      text: 'Entre proveedores, turnos y servicio, publicar queda para "mañana". Y mañana nunca llega.',
    },
    {
      title: 'Publicas, pero no pasa nada',
      text: 'Fotos sueltas, sin plan y sin constancia. Muchos likes de amigos y ninguna mesa nueva.',
    },
    {
      title: 'No sabes qué funciona',
      text: 'Sin métricas claras no hay forma de saber si las redes te traen clientes o solo te quitan tiempo.',
    },
  ],
  benefits: [
    {
      title: 'Clientes nuevos que te descubren',
      text: 'Contenido pensado para llegar a gente de la zona que aún no te sigue y convertirla en reservas.',
    },
    {
      title: 'Contenido que vende',
      text: 'Repartimos las piezas entre atraer, generar confianza, enseñar producto y pedir la reserva.',
    },
    {
      title: 'Tu tiempo, de vuelta',
      text: 'Solo apruebas el calendario y nos dedicas las sesiones de grabación. Del resto nos ocupamos nosotros.',
    },
    {
      title: 'Resultados a la vista',
      text: 'Alcance, interacción y reservas atribuidas a redes, en tiempo real en tu Portal del Cliente.',
    },
  ],
  steps: [
    { title: 'Planificación (días 1-5)', text: 'Revisamos el mes anterior, fijamos el objetivo y preparamos calendario y guiones. Tú lo apruebas en el portal.' },
    { title: 'Grabación (días 5-12)', text: 'Grabamos en tu local con guion y lista de tomas, para no hacer perder tiempo al equipo.' },
    { title: 'Edición y diseño (días 10-20)', text: 'Reels con subtítulos, música y portada; carruseles y posts con tu identidad visual.' },
    { title: 'Publicación (todo el mes)', text: 'Publicamos en las horas de más actividad de tu audiencia y gestionamos las stories.' },
    { title: 'Medición e informe (cierre)', text: 'Qué ha funcionado, qué no y qué cambiamos el mes siguiente.' },
  ],
  features: [
    { title: 'Estrategia y calendario mensual', text: 'Temas, formatos y fechas pensados para tu objetivo del mes.' },
    { title: 'Sesiones de grabación en tu local', text: 'De 1 a 4 al mes según el plan, de hasta 2 horas cada una.' },
    { title: 'Reels, carruseles y stories', text: 'De 8 a 16 piezas al mes, más stories cada semana.' },
    { title: 'Respuesta a comentarios y mensajes', text: 'Comentarios en Crecimiento; comentarios y mensajes en Captación.' },
    { title: 'Publicidad en Meta', text: 'Gestión de campañas incluida en Captación (la inversión se paga aparte).' },
    { title: 'Portal del Cliente', text: 'Métricas, calendario para aprobar, estado de las tareas e informes descargables.' },
  ],
  notIncluded: [
    'La inversión en publicidad, que se paga directamente a Meta o Google desde tu cuenta.',
    'Sesiones de fotos de estudio, influencers, sorteos o colaboraciones pagadas.',
    'Logotipo, identidad de marca, cartelería o impresión.',
    'Atención a clientes fuera del horario laboral, fines de semana o festivos.',
    'Garantía de un número concreto de seguidores o ventas: nos comprometemos con el trabajo, los objetivos y la medición.',
  ],
  roi: {
    kind: 'example',
    intro: 'Un ejemplo sencillo con un ticket medio de 18 € por persona y mesas de 2.',
    lines: [
      { label: 'Mesas nuevas al mes que llegan por redes', value: '15' },
      { label: 'Ticket medio por mesa (2 × 18 €)', value: '36 €' },
    ],
    result: { label: 'Facturación nueva al mes', value: '540 €' },
    note: '[EJEMPLO] Sin contar las visitas repetidas. En el primer mes medimos tu punto de partida y fijamos objetivos con tus datos reales.',
  },
  pricing: {
    kind: 'plans',
    plans: [
      { name: 'Presencia', monthly: 390, setup: 190, goal: 'Perfil activo y profesional' },
      { name: 'Crecimiento', monthly: 690, setup: 290, goal: 'Más alcance y seguidores de calidad', featured: true },
      { name: 'Captación', monthly: 1090, setup: 290, goal: 'Clientes nuevos medibles' },
    ],
    comparison: [
      { label: 'Redes gestionadas', values: ['1 (Instagram)', '2 (Instagram + Facebook o TikTok)', 'Hasta 3'] },
      { label: 'Piezas al mes', values: ['8 (4 reels + 4 posts)', '12 (8 reels + 4 carruseles)', '16 (12 reels + 4 carruseles)'] },
      { label: 'Stories', values: ['2 por semana', '3-4 por semana', 'Diarias (L-V)'] },
      { label: 'Sesiones de grabación', values: ['1 al mes (hasta 2 h)', '2 al mes (hasta 2 h)', '4 al mes (hasta 2 h)'] },
      { label: 'Guiones y estrategia', values: ['Calendario mensual', 'Estrategia + guiones', 'Estrategia + guiones + test A/B'] },
      { label: 'Comentarios y mensajes', values: ['—', 'Comentarios (L-V)', 'Comentarios y mensajes (L-V)'] },
      { label: 'Publicidad en Meta', values: ['—', '—', 'Gestión incluida (inversión aparte, mín. 150 €/mes)'] },
      { label: 'SEO local (Google)', values: ['—', 'Optimización inicial de la ficha', 'Servicio completo'] },
      { label: 'Informes', values: ['Mensual', 'Mensual + reunión de 30 min', 'Quincenal + reunión mensual de 45 min'] },
      { label: 'Portal del Cliente', values: ['Sí', 'Sí', 'Sí'] },
      { label: 'Revisiones por pieza', values: ['2 rondas', '2 rondas', '2 rondas'] },
    ],
    extras: [
      { label: 'Reel adicional', price: '60 €' },
      { label: 'Carrusel o post adicional', price: '35 €' },
      { label: 'Sesión de grabación adicional (hasta 2 h)', price: '90 €' },
      { label: 'Ronda de cambios adicional en una pieza', price: '20 €' },
      { label: 'Red social adicional', price: '+30 % sobre la cuota' },
      { label: 'Cobertura de evento (hasta 3 h + 3 reels)', price: '290 €' },
    ],
  },
  terms: 'Permanencia mínima de 3 meses: el primero construye la base, el segundo valida y el tercero escala. Después, mensual.',
  faq: [
    {
      q: '¿Por qué hay permanencia de 3 meses?',
      a: 'Porque los resultados en redes llegan a medio plazo: el primer mes construye la base, el segundo valida qué funciona y el tercero escala lo que funciona. Después, la renovación es mensual.',
    },
    {
      q: '¿Qué necesitáis de mí?',
      a: 'Acceso de administrador a tus cuentas, disponibilidad en las sesiones de grabación, aprobar el calendario en un máximo de 3 días laborables y avisarnos de novedades y ofertas con una semana de antelación.',
    },
    {
      q: '¿Garantizáis un número de seguidores?',
      a: 'No. Nos comprometemos con el trabajo, los objetivos y la medición, no con cifras que dependen también del producto y del mercado. En el primer mes medimos tu punto de partida y fijamos objetivos trimestrales con tus datos.',
    },
    {
      q: '¿De quién es el contenido?',
      a: 'Las piezas publicadas y pagadas son tuyas, y las cuentas siempre son tuyas. Si te das de baja, retiramos nuestros accesos en un máximo de 5 días laborables.',
    },
    {
      q: '¿Puedo cambiar de plan?',
      a: 'Puedes subir de plan cuando quieras, con efecto el mes siguiente. Bajar de plan, al terminar la permanencia.',
    },
  ],
};

export default service;
