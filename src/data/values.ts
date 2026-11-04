/** Significado de CERAMIS: cada letra son dos palabras (CLAUDE.md §1). */
export interface Value {
  letter: string;
  words: [string, string];
  text: string;
}

export const values: Value[] = [
  {
    letter: 'C',
    words: ['Constancia', 'Conocimiento'],
    text: 'Publicar un mes lo hace cualquiera. Nosotros estamos todas las semanas, y sabemos cómo funciona la hostelería.',
  },
  {
    letter: 'E',
    words: ['Esfuerzo', 'Estrategia'],
    text: 'Trabajamos mucho, pero con un plan. Cada acción tiene un porqué y un número detrás.',
  },
  {
    letter: 'R',
    words: ['Resiliencia', 'Resultados'],
    text: 'Si algo no funciona, lo cambiamos. Lo que cuenta son las mesas llenas, no los likes.',
  },
  {
    letter: 'A',
    words: ['Acción', 'Alcance'],
    text: 'Menos reuniones y más hacer. Que te vea más gente de la zona, y la gente adecuada.',
  },
  {
    letter: 'M',
    words: ['Masiva', 'Mano a mano'],
    text: 'Volumen para que te encuentren y trato cercano para que te elijan. Y contigo, siempre en persona.',
  },
  {
    letter: 'I',
    words: ['Imperfecta', 'Impulsado'],
    text: 'Mejor hecho que perfecto. Lanzamos, medimos y mejoramos con ganas.',
  },
  {
    letter: 'S',
    words: ['Siempre', 'Siempre a tu lado'],
    text: 'Temporada alta o baja, estamos ahí. Nos escribes y te contestamos.',
  },
];

/** Disposición del logo: 3×3 con "THE" y "agency" en la columna central. */
export const valuesGridLayout = ['C', 'E', 'R', 'A', 'THE', 'M', 'I', 'agency', 'S'] as const;
