export interface FaqItem {
  q: string;
  /** Texto plano: se usa tal cual en el HTML y en el JSON-LD FAQPage. */
  a: string;
}

export const homeFaq: FaqItem[] = [
  {
    q: '¿Solo trabajáis con restaurantes?',
    a: 'Sí. Trabajamos con bares, cafeterías y restaurantes, sobre todo en Palma y el resto de Mallorca. Conocer bien un sector nos deja ir más rápido y acertar más.',
  },
  {
    q: '¿Qué es el diagnóstico gratis?',
    a: 'Una revisión de 30 minutos de cómo captas y fidelizas clientes hoy: redes, ficha de Google, reservas y llamadas. Te decimos dónde estás perdiendo dinero y qué haríamos primero. Sin compromiso.',
  },
  {
    q: '¿Tengo que firmar una permanencia?',
    a: 'Las condiciones dependen de cada servicio y las verás claras antes de empezar. [POR DEFINIR]',
  },
  {
    q: '¿Mis clientes tienen que instalar alguna app?',
    a: 'No. La tarjeta de fidelización se guarda en Apple Wallet o Google Wallet, que ya vienen en el móvil. Las reservas se hacen por teléfono o desde tu web y tu ficha de Google.',
  },
  {
    q: '¿Cuánto tarda en notarse?',
    a: 'Las reservas por teléfono con IA y la tarjeta Wallet funcionan desde el primer día. Las redes necesitan algo más de constancia. Medimos cada mes para que veas la evolución con números. [VALIDAR]',
  },
  {
    q: '¿Cómo sigo los resultados?',
    a: 'Desde el CERAMIS Dashboard, tu panel de cliente: reservas, llamadas atendidas, sellos de fidelización y métricas de redes en un solo sitio.',
  },
];
