/**
 * Formularios [data-form]: validación en cliente, antispam y envío JSON a PUBLIC_FORM_ENDPOINT.
 * - Errores por campo (aria-invalid + texto enlazado con aria-describedby) y foco al primero.
 * - Estado global en una región aria-live (enviando, éxito, error).
 * - Antispam: honeypot `web` y tiempo mínimo desde que se carga la página.
 * - Sin endpoint: en dev se simula el envío (payload en consola); en producción, error amable.
 */
import { PUBLIC_FORM_ENDPOINT } from 'astro:env/client';
import { whatsappHref } from '@/data/site';

const MIN_FILL_MS = 3000;

const messages = {
  required: 'Este campo es obligatorio.',
  email: 'Revisa el email: parece que falta algo (ejemplo: nombre@restaurante.com).',
  phone: 'Revisa el teléfono: escribe al menos 9 cifras.',
  privacy: 'Necesitamos que aceptes la política de privacidad para poder contestarte.',
  invalid: 'Revisa los campos marcados.',
  sending: 'Enviando…',
  success: '¡Recibido! Te escribimos muy pronto para agendar tu diagnóstico.',
  error: 'No hemos podido enviar el formulario. Inténtalo de nuevo o escríbenos por WhatsApp.',
  tooFast: 'Un momento… vuelve a pulsar el botón para enviar.',
};

type Field = HTMLInputElement | HTMLTextAreaElement;

function validate(field: Field): string {
  const value = field.value.trim();
  if (field instanceof HTMLInputElement && field.type === 'checkbox') {
    return field.required && !field.checked ? messages.privacy : '';
  }
  if (field.required && !value) return messages.required;
  if (!value) return '';
  if (field.type === 'email' && field.validity.typeMismatch) return messages.email;
  if (field.type === 'tel' && value.replace(/\D/g, '').length < 9) return messages.phone;
  return '';
}

function showError(field: Field, message: string) {
  const errorEl = field.closest('.field')?.querySelector<HTMLElement>('[data-error]');
  if (errorEl) errorEl.textContent = message;
  if (message) field.setAttribute('aria-invalid', 'true');
  else field.removeAttribute('aria-invalid');
}

function setStatus(el: HTMLElement | null, state: 'idle' | 'sending' | 'success' | 'error', text = '') {
  if (!el) return;
  el.dataset.state = state;
  el.textContent = text;
}

async function send(payload: Record<string, unknown>) {
  if (!PUBLIC_FORM_ENDPOINT) {
    if (import.meta.env.DEV) {
      console.info('[form] PUBLIC_FORM_ENDPOINT vacío: envío simulado', payload);
      await new Promise((r) => setTimeout(r, 700));
      return;
    }
    throw new Error('PUBLIC_FORM_ENDPOINT no configurado');
  }
  const res = await fetch(PUBLIC_FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

function setup(form: HTMLFormElement, signal: AbortSignal) {
  const startedAt = Date.now();
  const status = form.querySelector<HTMLElement>('[data-status]');
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]');
  const submitLabel = form.querySelector<HTMLElement>('[data-submit-label]');
  const fields = Array.from(form.querySelectorAll<Field>('input:not([type=hidden]):not([name=web]), textarea'));
  const touched = new WeakSet<Field>();
  let sending = false;

  // Valida al salir del campo y, una vez marcado, mientras se corrige.
  fields.forEach((field) => {
    field.addEventListener('blur', () => {
      if (field.value.trim() || touched.has(field)) {
        touched.add(field);
        showError(field, validate(field));
      }
    }, { signal });
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') showError(field, validate(field));
    }, { signal });
    field.addEventListener('change', () => {
      if (field.getAttribute('aria-invalid') === 'true') showError(field, validate(field));
    }, { signal });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (sending) return;

    const invalid = fields.filter((field) => {
      const message = validate(field);
      touched.add(field);
      showError(field, message);
      return Boolean(message);
    });
    if (invalid.length) {
      setStatus(status, 'error', messages.invalid);
      invalid[0]!.focus();
      return;
    }

    const data = new FormData(form);
    // Bots: rellenan el honeypot o envían al instante. Fingimos éxito para no darles pistas.
    if (String(data.get('web') ?? '')) {
      setStatus(status, 'success', messages.success);
      form.reset();
      return;
    }
    if (Date.now() - startedAt < MIN_FILL_MS) {
      setStatus(status, 'error', messages.tooFast);
      return;
    }

    const payload: Record<string, unknown> = {};
    data.forEach((value, key) => {
      if (key !== 'web') payload[key] = typeof value === 'string' ? value.trim() : value;
    });
    payload.privacidad = data.get('privacidad') === 'on';
    payload.source = `${location.pathname}#${String(data.get('source') ?? '')}`;
    payload.page = location.href;
    payload.sentAt = new Date().toISOString();

    sending = true;
    submit?.setAttribute('aria-busy', 'true');
    submit?.setAttribute('aria-disabled', 'true');
    const label = submitLabel?.textContent ?? '';
    if (submitLabel) submitLabel.textContent = messages.sending;
    setStatus(status, 'sending', messages.sending);

    try {
      await send(payload);
      form.reset();
      fields.forEach((field) => showError(field, ''));
      setStatus(status, 'success', messages.success);
    } catch (err) {
      console.error('[form]', err);
      setStatus(status, 'error', messages.error);
      const link = document.createElement('a');
      link.href = whatsappHref;
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = ' Abrir WhatsApp';
      status?.append(link);
    } finally {
      sending = false;
      submit?.removeAttribute('aria-busy');
      submit?.removeAttribute('aria-disabled');
      if (submitLabel) submitLabel.textContent = label;
    }
  }, { signal });
}

let abort: AbortController | null = null;

export function initForms() {
  abort?.abort();
  abort = new AbortController();
  document.querySelectorAll<HTMLFormElement>('form[data-form]').forEach((form) => setup(form, abort!.signal));
}
