import type { Service } from '@/data/services';
import { planPorDefinir } from './shared';

const service: Service = {
  slug: 'reservas-telefonicas-ia',
  name: 'Reservas telefónicas con IA',
  benefit: 'Un agente de voz que coge cada llamada y apunta cada reserva, 24/7.',
  available: true,
  illustration: 'phone',
  h1: 'Sistema de reservas telefónicas con IA para *restaurantes*',
  metaTitle: 'Reservas telefónicas con IA para restaurantes | CERAMIS',
  metaDescription:
    'Asistente de voz que contesta cada llamada 24/7, toma reservas y guarda a tus clientes. No pierdas más llamadas en tu restaurante en Mallorca.',
  intro:
    'Un asistente de voz que contesta el teléfono de tu restaurante cuando tú no puedes: en pleno servicio, de madrugada o el día de cierre.',
  pains: [
    {
      title: 'El teléfono suena en pleno servicio',
      text: 'O atiendes la mesa o atiendes la llamada. Elijas lo que elijas, alguien sale perdiendo.',
    },
    {
      title: 'Llamadas fuera de horario',
      text: 'Mucha gente reserva por la noche o en tu día de cierre. Si nadie contesta, llama a otro.',
    },
    {
      title: 'Reservas apuntadas a mano',
      text: 'Libretas, post-its y errores. Y ni rastro de quién es cliente habitual.',
    },
  ],
  benefits: [
    {
      title: 'Ninguna llamada sin contestar',
      text: 'El asistente atiende todas las llamadas, también varias a la vez. [VALIDAR]',
    },
    {
      title: 'Más mesas, sin más personal',
      text: 'Cada llamada que antes se perdía puede ser una reserva. Calcula cuánto vale abajo.',
    },
    {
      title: 'Tu equipo, centrado en la sala',
      text: 'Nadie tiene que dejar una mesa a medias para coger el teléfono.',
    },
    {
      title: 'Conoces a tus clientes',
      text: 'Cada reserva alimenta tu CRM: quién viene, cuándo y cuántas veces.',
    },
  ],
  steps: [
    { title: 'Configuración', text: 'Le contamos al asistente tu horario, tus mesas y cómo quieres que hable.' },
    { title: 'Desvío de llamadas', text: 'Conectamos tu número. Tú decides cuándo contesta: siempre o solo si no lo coges.' },
    { title: 'Reservas automáticas', text: 'El asistente atiende, comprueba disponibilidad y confirma la reserva.' },
    { title: 'Todo en tu Dashboard', text: 'Ves las reservas, las llamadas atendidas y tu lista de clientes.' },
  ],
  features: [
    { title: 'Atención 24/7', text: 'Contesta a cualquier hora, también en tu día de cierre.' },
    { title: 'Voz natural en varios idiomas', text: 'Atiende en español y en otros idiomas. [POR DEFINIR]' },
    { title: 'Reservas en tiempo real', text: 'Comprueba disponibilidad y apunta la reserva al momento.' },
    { title: 'CRM de clientes', text: 'Cada llamada guarda el contacto y su historial de visitas.' },
    { title: 'Confirmación por email', text: 'El cliente recibe su reserva confirmada al instante.', upgrade: true },
    { title: 'Recordatorios por SMS', text: 'Menos mesas vacías por olvidos.', upgrade: true },
    { title: 'Seguimiento por WhatsApp', text: 'Confirmaciones, recordatorios y mensajes después de la visita.', upgrade: true },
  ],
  roi: { kind: 'calculator' },
  plans: [planPorDefinir('Suscripción mensual')],
  faq: [
    {
      q: '¿Mis clientes notarán que es una IA?',
      a: 'El asistente habla con naturalidad y, si alguien lo pide, puede pasarte la llamada o tomar nota para que le llames. [POR DEFINIR]',
    },
    {
      q: '¿Tengo que cambiar de número de teléfono?',
      a: 'No. Se configura un desvío desde tu número actual.',
    },
    {
      q: '¿Qué pasa si la llamada no es para reservar?',
      a: 'Responde a lo básico (horarios, dirección, carta) y te deja el aviso para lo demás. [POR DEFINIR]',
    },
    {
      q: '¿Hay permanencia?',
      a: 'Es una suscripción mensual. Las condiciones exactas te las damos antes de empezar. [POR DEFINIR]',
    },
  ],
};

export default service;
