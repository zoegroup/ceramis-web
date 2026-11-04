import type { Service } from '@/data/services';
import { planPorDefinir } from './shared';

const service: Service = {
  slug: 'fidelizacion-wallet',
  name: 'Fidelización con Wallet',
  benefit: 'Tarjeta de sellos en el móvil de tus clientes. Sin apps.',
  available: true,
  illustration: 'wallet',
  h1: 'Tarjeta de fidelización digital para *cafeterías* y restaurantes',
  metaTitle: 'Tarjeta de fidelización digital para cafeterías | CERAMIS',
  metaDescription:
    'Tarjeta de sellos en el móvil de tus clientes, en Apple y Google Wallet y sin apps. El programa de fidelización para bares y cafeterías.',
  intro:
    'La tarjeta de sellos de toda la vida, pero en el móvil. Se guarda en Apple Wallet o Google Wallet y nadie tiene que instalar nada.',
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
      title: 'Más visitas de los mismos clientes',
      text: 'Un motivo claro para repetir: a la décima visita, el café es tuyo. [VALIDAR]',
    },
    {
      title: 'Siempre en su móvil',
      text: 'La tarjeta vive en el Wallet, junto a sus billetes de avión y entradas.',
    },
    {
      title: 'Avisos sin coste',
      text: 'Puedes enviar notificaciones a la tarjeta: novedades, promos o recordatorios. [VALIDAR]',
    },
    {
      title: 'Sabes quién vuelve',
      text: 'Ves en tu Dashboard cuántos clientes tienen tarjeta y cada cuánto vienen.',
    },
  ],
  steps: [
    { title: 'Diseñamos tu tarjeta', text: 'Con tu marca y tu recompensa: café gratis, postre, descuento…' },
    { title: 'El cliente la guarda', text: 'Escanea un QR en el local y la añade al Wallet en segundos.' },
    { title: 'Sellas en cada visita', text: 'Un toque desde el móvil o la tablet del local.' },
    { title: 'Mides y mejoras', text: 'Ves en el Dashboard cuántos repiten y ajustamos la recompensa.' },
  ],
  features: [
    { title: 'Apple Wallet y Google Wallet', text: 'Funciona en iPhone y Android sin instalar apps.' },
    { title: 'Diseño con tu marca', text: 'Colores, logo y recompensa a tu medida.' },
    { title: 'Sellado rápido', text: 'Desde el móvil o la tablet del local, en un segundo.' },
    { title: 'Notificaciones', text: 'Mensajes en la propia tarjeta del cliente. [POR DEFINIR]' },
    { title: 'Panel de fidelización', text: 'Clientes, visitas y recompensas canjeadas en tu Dashboard.' },
  ],
  roi: {
    kind: 'example',
    intro: 'Un ejemplo con un ticket medio de 18 € por persona.',
    lines: [
      { label: 'Clientes con la tarjeta en el móvil', value: '200' },
      { label: 'De ellos, los que vienen una vez más al mes', value: '1 de cada 5 = 40' },
      { label: 'Ticket medio por persona', value: '18 €' },
    ],
    result: { label: 'Facturación extra al mes', value: '720 €' },
    note: '[EJEMPLO] Descuenta el coste de la recompensa. Es un ejemplo ilustrativo, no una promesa de resultados.',
  },
  plans: [planPorDefinir('Wallet')],
  faq: [
    {
      q: '¿El cliente tiene que descargar algo?',
      a: 'No. La tarjeta se guarda en Apple Wallet o Google Wallet, que ya vienen en el móvil.',
    },
    {
      q: '¿Puedo cambiar la recompensa?',
      a: 'Sí. La ajustamos contigo cuando quieras.',
    },
    {
      q: '¿Sirve para un restaurante o solo para cafeterías?',
      a: 'Para los dos. En restaurantes suele funcionar bien con postres, bebidas o un descuento en la siguiente visita.',
    },
  ],
};

export default service;
