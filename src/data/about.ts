/** Contenido de /sobre-nosotros/. Los placeholders se sustituyen cuando haya datos reales. */

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  /** Ruta a una foto en src/assets/team/ (import). Sin foto, se muestra la rejilla del logo. */
  photo?: ImageMetadata;
}

export const team: TeamMember[] = [
  { name: '[NOMBRE]', role: '[ROL]', bio: '[BREVE BIO POR COMPLETAR]' },
  { name: '[NOMBRE]', role: '[ROL]', bio: '[BREVE BIO POR COMPLETAR]' },
  { name: '[NOMBRE]', role: '[ROL]', bio: '[BREVE BIO POR COMPLETAR]' },
];

export const nameStory = {
  paragraphs: [
    'CERAMIS no salió de un generador de nombres. Cada letra es una idea que nos repetimos cuando las cosas se ponen difíciles: constancia, esfuerzo, resiliencia, acción, mano a mano, impulso y estar siempre al lado de quien confía en nosotros.',
    '[HISTORIA POR COMPLETAR] Cómo surgió el nombre y qué personas nos inspiraron: [PERSONA QUE NOS INSPIRÓ], [PERSONA QUE NOS INSPIRÓ].',
  ],
  quote: '[FRASE O CITA QUE NOS INSPIRA]',
  quoteAuthor: '[AUTOR]',
};

export const whyHospitality = [
  {
    title: 'Hablamos tu idioma',
    text: 'Turnos, mise en place, temporada alta y baja. No tenemos que aprender tu negocio desde cero.',
  },
  {
    title: 'Herramientas hechas para ti',
    text: 'Reservas, fidelización y redes pensadas para un restaurante, no adaptadas de otra cosa.',
  },
  {
    title: 'Lo que funciona, lo sabemos',
    text: 'Trabajar con un solo sector nos permite repetir lo que da resultados y descartar rápido lo que no.',
  },
];
