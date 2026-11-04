import type { Plan } from '@/data/services';

/** Plan con todo pendiente: los servicios y precios se detallarán más adelante. */
export const planPorDefinir = (name: string): Plan => ({
  name,
  price: '[POR DEFINIR]',
  features: ['[POR DEFINIR]', '[POR DEFINIR]', '[POR DEFINIR]'],
});

/** Ticket de referencia: 18 € por persona, reservas de 2 personas (36 € por reserva). */
export const TICKET_POR_PERSONA = 18;
export const COMENSALES_POR_RESERVA = 2;
