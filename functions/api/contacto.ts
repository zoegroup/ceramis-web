/**
 * POST /api/contacto: recibe los formularios de la web y los envía por email con Resend.
 * Es una Pages Function de Cloudflare: se despliega sola con el proyecto (carpeta functions/)
 * y solo se ejecuta en esta ruta; el resto de la web sigue siendo estática.
 *
 * Variables del proyecto en Cloudflare Pages (Settings → Variables and Secrets):
 * - RESEND_API_KEY (secreto, obligatoria): clave de API de Resend.
 * - FORM_TO   (opcional): destinatario. Por defecto the@ceramisagency.com.
 * - FORM_FROM (opcional): remitente, de un dominio verificado en Resend.
 *   Por defecto "Web CERAMIS <web@ceramisagency.com>".
 */

interface Env {
  RESEND_API_KEY?: string;
  FORM_TO?: string;
  FORM_FROM?: string;
}

interface Context {
  request: Request;
  env: Env;
}

const DEFAULT_TO = 'the@ceramisagency.com';
const DEFAULT_FROM = 'Web CERAMIS <web@ceramisagency.com>';
const MAX_LEN = 4000;

/** Campos que mostramos en el email, en este orden y con su etiqueta. */
const FIELDS: [key: string, label: string][] = [
  ['nombre', 'Nombre'],
  ['restaurante', 'Restaurante'],
  ['telefono', 'Teléfono'],
  ['email', 'Email'],
  ['interes', 'Le interesa'],
  ['servicio', 'Servicio (página)'],
  ['plan', 'Plan elegido'],
  ['contacto_preferido', 'Prefiere que le contactemos por'],
  ['mensaje', 'Mensaje'],
  ['tipo', 'Tipo de solicitud'],
  ['source', 'Formulario'],
  ['page', 'Página'],
  ['sentAt', 'Enviado'],
];

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const clean = (v: unknown) => (typeof v === 'string' ? v.trim().slice(0, MAX_LEN) : '');

export async function onRequestPost({ request, env }: Context): Promise<Response> {
  // Solo aceptamos envíos desde la propia web.
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) return json({ ok: false, error: 'origin' }, 403);

  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: 'json' }, 400);
  }

  // Honeypot: si un bot lo rellena, fingimos éxito y no enviamos nada.
  if (clean(data.web)) return json({ ok: true });

  const v = Object.fromEntries(FIELDS.map(([key]) => [key, clean(data[key])])) as Record<string, string>;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email ?? '');
  if (!v.nombre || !v.telefono || !emailOk || data.privacidad !== true) {
    return json({ ok: false, error: 'fields' }, 422);
  }

  if (!env.RESEND_API_KEY) {
    console.error('contacto: falta RESEND_API_KEY');
    return json({ ok: false, error: 'config' }, 500);
  }

  const waitlist = v.tipo === 'lista-espera';
  const subject = `${waitlist ? 'Lista de espera' : 'Nuevo diagnóstico'}: ${v.restaurante || v.nombre}${v.plan ? ` · ${v.plan}` : ''}`;
  const rows = FIELDS.filter(([key]) => v[key]);
  const text = [
    subject,
    '',
    ...rows.map(([key, label]) => `${label}: ${v[key]}`),
    '',
    'Consentimiento de privacidad: aceptado.',
    'Responde a este email para contestar directamente al cliente.',
  ].join('\n');
  const phoneDigits = (v.telefono ?? '').replace(/[^\d+]/g, '');
  const html = `<!doctype html><html lang="es"><body style="margin:0;background:#F3ECDF;font-family:Arial,Helvetica,sans-serif;color:#1E1C19">
<div style="max-width:560px;margin:0 auto;padding:24px">
<p style="margin:0 0 4px;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#5F574B">ceramisagency.com</p>
<h1 style="margin:0 0 16px;font-size:22px;font-weight:600">${escapeHtml(subject)}</h1>
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;background:#FAF6EF;border:1px solid #B9AE9C;border-collapse:collapse">
${rows
  .map(
    ([key, label]) =>
      `<tr><td style="padding:10px 14px;border-bottom:1px solid #E7DDCB;font-size:13px;color:#5F574B;width:38%;vertical-align:top">${escapeHtml(label)}</td><td style="padding:10px 14px;border-bottom:1px solid #E7DDCB;font-size:15px;white-space:pre-wrap">${escapeHtml(v[key] ?? '')}</td></tr>`
  )
  .join('\n')}
</table>
<p style="margin:16px 0 0;font-size:14px">
<a href="tel:${escapeHtml(phoneDigits)}" style="color:#7A5A40">Llamar</a> ·
<a href="https://wa.me/${escapeHtml(phoneDigits.replace('+', ''))}" style="color:#7A5A40">WhatsApp</a> ·
<a href="mailto:${escapeHtml(v.email ?? '')}" style="color:#7A5A40">Responder por email</a>
</p>
<p style="margin:16px 0 0;font-size:12px;color:#5F574B">Consentimiento de privacidad aceptado en el formulario. Responde a este email para contestar directamente al cliente.</p>
</div></body></html>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.FORM_FROM || DEFAULT_FROM,
      to: [env.FORM_TO || DEFAULT_TO],
      reply_to: v.email,
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    console.error('contacto: Resend respondió', res.status, await res.text());
    return json({ ok: false, error: 'send' }, 502);
  }
  return json({ ok: true });
}

/** Cualquier otro método: no permitido. */
export function onRequest(): Response {
  return json({ ok: false, error: 'method' }, 405);
}
