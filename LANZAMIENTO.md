# Lanzamiento de ceramisagency.com

Guía para publicar la web en Cloudflare Pages y lista de lo que falta antes de abrirla al público.

## 1. Antes de publicar

1. Rellena los placeholders. Para ver la lista completa por archivo:

   ```bash
   npm run placeholders
   ```

   Los más importantes:

   - `src/data/site.ts`: email, teléfono, WhatsApp (solo dígitos con prefijo, p. ej. `34600000000`), redes sociales, datos legales y horario.
   - `src/data/services/*.ts`: planes y precios (`[POR DEFINIR]`) y promesas marcadas `[VALIDAR]`.
   - `src/data/about.ts`: historia del nombre, equipo y cita.
   - `src/data/home.ts`: cifras `[DATO A VALIDAR]` y el caso real (`showCase`).
   - Legales: `[PLAZO]` de conservación y proveedores en `src/pages/privacidad.astro`.

2. Haz que un asesor legal revise las páginas legales (aviso legal, privacidad y cookies).
3. Cuando tengáis la dirección, regenera el mapa con sus coordenadas:

   ```bash
   python3 scripts/make-static-map.py 39.5696 2.6502
   ```

## 2. Crear el proyecto en Cloudflare Pages

1. Sube el repositorio a GitHub (o GitLab).
2. En Cloudflare, ve a **Workers & Pages → Create → Pages → Connect to Git** y elige el repositorio.
3. Configuración de build:

   | Campo | Valor |
   |---|---|
   | Framework preset | Astro |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Node | lo lee de `.nvmrc` (22.23.4) |

4. Variables de entorno (**Settings → Variables and Secrets**, en Production y Preview):

   | Variable | Valor |
   |---|---|
   | `PUBLIC_DASHBOARD_URL` | `https://app.ceramisagency.com` |
   | `PUBLIC_FORM_ENDPOINT` | URL del webhook de n8n |
   | `PUBLIC_CF_ANALYTICS_TOKEN` | Token de Web Analytics (paso 4) |

   La build avisa si falta `PUBLIC_FORM_ENDPOINT`. El dominio del webhook se añade solo a la Content-Security-Policy (`connect-src`).

## 3. Dominio

1. En el proyecto: **Custom domains → Set up a custom domain** y añade `ceramisagency.com` y `www.ceramisagency.com`.
2. Redirige `www` a la versión sin `www` con una regla en **Rules → Redirect Rules**: `www.ceramisagency.com/*` → `https://ceramisagency.com/${1}`, código 301.
3. Las URLs `*.pages.dev` llevan `X-Robots-Tag: noindex` (ver `public/_headers`): solo se indexa el dominio.

## 4. Analítica (sin cookies)

1. **Analytics & Logs → Web Analytics → Add a site** y elige el dominio.
2. Copia el token del snippet y ponlo en `PUBLIC_CF_ANALYTICS_TOKEN`. Vuelve a desplegar.

Si activas la inyección automática de Cloudflare en lugar del token, deja la variable vacía para no medir dos veces.

## 5. Webhook de n8n

El formulario envía un `POST` con JSON desde el navegador. El webhook debe:

- Aceptar CORS desde `https://ceramisagency.com`: responder al `OPTIONS` con `Access-Control-Allow-Origin` y `Access-Control-Allow-Headers: Content-Type`.
- Devolver un código 2xx si todo va bien. Cualquier otro código muestra el error con el enlace a WhatsApp.

Campos que recibe:

| Campo | Contenido |
|---|---|
| `nombre`, `restaurante`, `telefono`, `email`, `mensaje` | Datos del formulario |
| `privacidad` | `true` |
| `tipo` | `diagnostico` o `lista-espera` |
| `servicio` | Slug del servicio, si se envía desde una página de servicio |
| `interes`, `contacto_preferido` | Solo desde `/contacto/` |
| `source`, `page`, `sentAt` | Página de origen y fecha |

## 6. Después de publicar

1. **Google Search Console**: verifica el dominio y envía `https://ceramisagency.com/sitemap-index.xml`.
2. **Ficha de Google Business**: enlaza la web y el motor de reservas.
3. **Prueba en un iPhone real**: el hero (scroll y frames), el menú, el formulario y la calculadora.
4. **PageSpeed Insights** sobre la URL real para confirmar las métricas de Lighthouse con la red de Cloudflare.
5. **Rich Results Test** de Google sobre la home, un servicio y el post para comprobar el schema.

## Comandos útiles

| Comando | Para qué |
|---|---|
| `npm run dev` | Desarrollo en `http://localhost:4321` |
| `npm run build` | Comprobación de tipos, build y post-build (CSP y validación de JSON-LD) |
| `npm run preview:prod` | Sirve `dist/` con las cabeceras de `_headers` en `http://localhost:4322` |
| `npm run placeholders` | Lista lo que falta por rellenar |
