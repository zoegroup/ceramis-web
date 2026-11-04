import type { Service } from '@/data/services';
import { planPorDefinir } from './shared';

const service: Service = {
  slug: 'gestion-redes-sociales',
  name: 'Gestión de redes sociales',
  benefit: 'Contenido que da hambre y trae clientes nuevos a tu puerta.',
  available: true,
  illustration: 'social',
  h1: 'Gestión de redes sociales para restaurantes en *Palma*',
  metaTitle: 'Gestión de redes para restaurantes en Palma | CERAMIS',
  metaDescription:
    'Community manager para restaurantes en Mallorca: estrategia, grabación, edición y métricas. Contenido que atrae clientes nuevos a tu restaurante.',
  intro:
    'Somos tu community manager en Mallorca. Venimos a tu restaurante, grabamos, editamos y publicamos. Tú solo cocinas.',
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
      title: 'Tu comida se ve peor de lo que es',
      text: 'Un plato increíble con una foto oscura no vende. La gente elige con los ojos antes de reservar.',
    },
  ],
  benefits: [
    {
      title: 'Clientes nuevos que te descubren',
      text: 'Contenido pensado para que la gente de la zona te encuentre y quiera venir. [VALIDAR]',
    },
    {
      title: 'Una marca que se reconoce',
      text: 'Un estilo propio en cada publicación: quien te ve, sabe que eres tú.',
    },
    {
      title: 'Tu tiempo, de vuelta',
      text: 'Nosotros planificamos, grabamos y publicamos. Tú apruebas y sigues a lo tuyo.',
    },
    {
      title: 'Decisiones con números',
      text: 'Cada mes ves qué ha funcionado en tu Dashboard. Sin informes eternos.',
    },
  ],
  steps: [
    { title: 'Estrategia', text: 'Definimos a quién quieres atraer, el tono y los temas del mes.' },
    { title: 'Grabación', text: 'Venimos a tu local a grabar platos, equipo y ambiente.' },
    { title: 'Edición y publicación', text: 'Editamos y publicamos en el mejor momento. Tú lo apruebas antes.' },
    { title: 'Métricas', text: 'Medimos alcance, seguidores de la zona y reservas que llegan por redes.' },
  ],
  features: [
    { title: 'Plan de contenido mensual', text: 'Calendario con lo que vamos a publicar y por qué.' },
    { title: 'Grabación en tu local', text: 'Foto y vídeo de platos, equipo y ambiente.' },
    { title: 'Edición de reels y fotos', text: 'Formato vertical, ritmo y textos pensados para cada red.' },
    { title: 'Publicación y copys', text: 'Textos cercanos, con tu tono y llamadas a reservar.' },
    { title: 'Gestión de comentarios', text: 'Respondemos para que nadie se quede sin contestar. [POR DEFINIR]' },
    { title: 'Informe en el Dashboard', text: 'Métricas claras cada mes, en tu panel de cliente.' },
  ],
  roi: {
    kind: 'example',
    intro: 'Un ejemplo sencillo para un restaurante con un ticket medio de 18 € por persona.',
    lines: [
      { label: 'Mesas nuevas al mes que llegan por redes', value: '10' },
      { label: 'Personas por mesa', value: '2' },
      { label: 'Ticket medio por persona', value: '18 €' },
    ],
    result: { label: 'Facturación nueva al mes', value: '360 €' },
    note: '[EJEMPLO] Y eso sin contar los que repiten. Es un ejemplo ilustrativo, no una promesa de resultados.',
  },
  plans: [planPorDefinir('Plan 1'), planPorDefinir('Plan 2'), planPorDefinir('Plan 3')],
  faq: [
    {
      q: '¿En qué redes trabajáis?',
      a: 'Sobre todo Instagram y TikTok, que es donde la gente decide dónde comer. Lo vemos contigo en la estrategia. [POR DEFINIR]',
    },
    {
      q: '¿Cada cuánto venís a grabar?',
      a: 'Depende del plan. Organizamos las sesiones para molestar lo mínimo durante el servicio. [POR DEFINIR]',
    },
    {
      q: '¿Puedo revisar lo que se publica?',
      a: 'Sí. Todo pasa por tu aprobación antes de publicarse.',
    },
    {
      q: '¿Qué pasa si ya tengo a alguien que lleva mis redes?',
      a: 'Podemos trabajar juntos o tomar el relevo. En el diagnóstico vemos qué tiene más sentido.',
    },
  ],
};

export default service;
