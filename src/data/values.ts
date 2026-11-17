/**
 * Significado de CERAMIS: cada letra son dos palabras, sin repetir ninguna (CLAUDE.md §1).
 * La primera es la palabra de marca; juntas forman el lema (`motto`).
 */
export interface Value {
  letter: string;
  words: [string, string];
  text: string;
}

export const motto = 'Constancia, Estrategia, Resultados con Acción Masiva Imperfecta. Siempre a tu lado.';

export const values: Value[] = [
  {
    letter: 'C',
    words: ['Constancia', 'Conocimiento'],
    text: 'Publicar un mes lo hace cualquiera; lo difícil es no parar. Estamos todas las semanas, en temporada alta y en baja, y conocemos la hostelería por dentro: horarios, turnos y lo que de verdad llena un local.',
  },
  {
    letter: 'E',
    words: ['Estrategia', 'Esfuerzo'],
    text: 'Antes de hacer, pensamos. Cada acción tiene un objetivo y un número detrás, y luego le echamos todas las horas que haga falta para que salga.',
  },
  {
    letter: 'R',
    words: ['Resultados', 'Resiliencia'],
    text: 'Lo que cuenta son las mesas llenas, no los likes. Si algo no funciona, no lo maquillamos: lo cambiamos y volvemos a intentarlo.',
  },
  {
    letter: 'A',
    words: ['Acción', 'Alcance'],
    text: 'Menos reuniones y más hacer. Que te vea más gente de tu zona, y sobre todo la gente adecuada: la que puede sentarse a tu mesa esta semana.',
  },
  {
    letter: 'M',
    words: ['Masiva', 'Mano a mano'],
    text: 'Volumen para que te encuentren en Google, en redes y en el móvil de tus clientes. Y trato de tú a tú para que te elijan: hablamos contigo en persona, no con un ticket.',
  },
  {
    letter: 'I',
    words: ['Imperfecta', 'Impulso'],
    text: 'Mejor hecho que perfecto. Lanzamos rápido, medimos qué pasa y mejoramos cada mes, con las ganas del primer día.',
  },
  {
    letter: 'S',
    words: ['Siempre a tu lado', 'Seguimiento'],
    text: 'Nos escribes y te contestamos. Cada mes revisamos contigo los números en tu Portal del Cliente y decidimos juntos el siguiente paso.',
  },
];

/** Disposición del logo: 3×3 con "THE" y "agency" en la columna central. */
export const valuesGridLayout = ['C', 'E', 'R', 'A', 'THE', 'M', 'I', 'agency', 'S'] as const;
