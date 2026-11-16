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
    a: 'En los planes de redes sociales y en SEO local, 3 meses: el primero construye la base, el segundo valida qué funciona y el tercero escala. El agente de IA, el recordatorio de reseñas y la tarjeta de fidelización son mensuales, sin permanencia.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'Los planes de redes van de 390 a 1.090 €/mes, el SEO local cuesta 149 €/mes, el agente de IA para llamadas 249 €/mes y la tarjeta de fidelización 50 €/mes. Precios sin IVA; cada servicio tiene además una cuota de alta única.',
  },
  {
    q: '¿Cuánto tarda en notarse?',
    a: 'El agente de IA y la tarjeta de fidelización funcionan desde el primer día. En redes y SEO local seguimos un plan de 90 días: base, validación y escala, con objetivos fijados a partir de tus propios datos.',
  },
  {
    q: '¿Cómo sigo los resultados?',
    a: 'Desde el Portal del Cliente, incluido sin coste: métricas de redes, posición en Google, reservas y llamadas, sellos de fidelización e informes, en un solo panel desde el móvil o el ordenador.',
  },
];
