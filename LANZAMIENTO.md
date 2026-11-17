# Lanzamiento de ceramisagency.com

Guía para publicar la web en Cloudflare Pages y lista de lo que falta antes de abrirla al público.

## 1. Antes de publicar

1. Rellena los placeholders. Para ver la lista completa por archivo:

   ```bash
   npm run placeholders
   ```

   Los más importantes:

   - `src/data/site.ts`: redes sociales y horario. Email, teléfono, WhatsApp y datos legales ya están.
   - `src/data/services/*.ts`: los 4 servicios con los precios de la "Propuesta de servicios". Si cambias un precio, cámbialo aquí y en la propuesta.
   - `src/data/about.ts`: historia del nombre, equipo y cita.
   - `src/data/home.ts`: el caso real (`showCase`).

2. Haz que un asesor legal revise las páginas legales (aviso legal, privacidad y cookies).
3. Si quieres que el mapa de contacto marque otra ubicación, regenéralo con sus coordenadas:

   ```bash
   python3 scripts/make-static-map.py 39.5696 2.6502
   ```

## 2. Subir el código a GitHub

1. Crea una cuenta gratuita en [github.com](https://github.com).
2. Pulsa **New repository**, llámalo `ceramis-web`, márcalo como **Private** y no añadas README ni licencia.
3. En la carpeta del proyecto, conecta el repositorio (cambia `TU-USUARIO`):

   ```bash
   git remote add origin https://github.com/TU-USUARIO/ceramis-web.git
   ```

4. Sube el código. La primera vez GitHub te pedirá iniciar sesión en el navegador:

   ```bash
   git push -u origin main
   ```

A partir de aquí, cada `git push` publica la web automáticamente (paso 3).

## 3. Crear el proyecto en Cloudflare Pages

1. Crea una cuenta gratuita en [cloudflare.com](https://dash.cloudflare.com/sign-up).
2. En Cloudflare, ve a **Workers & Pages → Create → Pages → Connect to Git** y elige el repositorio.
3. Configuración de build:

   | Campo | Valor |
   |---|---|
   | Framework preset | Astro |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Node | lo lee de `.nvmrc` (22.23.4) |

4. Variables de entorno (**Settings → Variables and Secrets**, en Production y Preview):

   | Variable | Tipo | Valor |
   |---|---|---|
   | `NODE_VERSION` | Texto | `22` |
   | `PUBLIC_DASHBOARD_URL` | Texto | `https://app.ceramisagency.com` |
   | `PUBLIC_CF_ANALYTICS_TOKEN` | Texto | Token de Web Analytics (paso 5), o vacío |
   | `RESEND_API_KEY` | **Secreto** | Clave de API de Resend (paso 6) |
   | `PUBLIC_FORM_ENDPOINT` | Texto | **Déjala vacía o bórrala.** Solo sirve para mandar el formulario a otro sitio (p. ej. n8n). |

   Las variables `PUBLIC_…` se meten en la web al construirla: si las cambias, vuelve a desplegar (**Deployments → ⋯ → Retry deployment**). `RESEND_API_KEY` se lee en cada envío, pero también hace falta redesplegar para que la función la vea.

## 4. Dominio

El dominio ya está en Cloudflare y `ceramisagency.com` funciona. Falta `www`, que hoy da **error 522**:

1. En el proyecto de Pages: **Custom domains → Set up a custom domain**, escribe `www.ceramisagency.com` y pulsa **Activate domain**.
2. Para que `www` lleve a la versión sin `www`: en el dominio, **Rules → Redirect Rules → Create rule → plantilla "Redirect from WWW to root"** (código 301).
3. Las URLs `*.pages.dev` llevan `X-Robots-Tag: noindex` (ver `public/_headers`): solo se indexa el dominio.
4. No toques los registros **MX** (correo de Google Workspace) ni el de `app` (Portal del Cliente).

## 5. Analítica (sin cookies)

1. **Analytics & Logs → Web Analytics → Add a site** y elige el dominio.
2. Copia el token del snippet y ponlo en `PUBLIC_CF_ANALYTICS_TOKEN`. Vuelve a desplegar.

Si activas la inyección automática de Cloudflare en lugar del token, deja la variable vacía para no medir dos veces.

## 6. Formulario: que las solicitudes lleguen a the@ceramisagency.com

El formulario lo recibe una función de Cloudflare (`functions/api/contacto.ts`, en la ruta `/api/contacto`) que lo envía por email con **Resend**. Gratis hasta 3.000 emails al mes. Tu correo de Google Workspace no se toca.

1. Crea una cuenta en [resend.com](https://resend.com) con the@ceramisagency.com.
2. **Domains → Add Domain** → `ceramisagency.com`, región **Ireland (eu-west-1)**.
3. Resend te muestra 3 o 4 registros DNS (un MX y un TXT en el subdominio `send`, y un TXT `resend._domainkey`). Añádelos en Cloudflare → tu dominio → **DNS → Records → Add record**, copiando tipo, nombre y valor tal cual. Si Resend ofrece **"Auto configure" con Cloudflare**, úsalo y se crean solos.
   - Son registros de `send.ceramisagency.com`: **no sustituyen** los MX de Google, así que tu correo sigue igual.
4. Espera a que Resend marque el dominio como **Verified** (minutos).
5. **API Keys → Create API Key**, permiso **Sending access**, solo para `ceramisagency.com`. Cópiala.
6. En Cloudflare Pages → **Settings → Variables and Secrets → Add** → tipo **Secret**, nombre `RESEND_API_KEY`, pega la clave. En Production y Preview.
7. Vuelve a desplegar y envía una solicitud de prueba desde la web. Te llegará un email "Nuevo diagnóstico: …". Si respondes a ese email, le contestas directamente al cliente.

Opcional: `FORM_TO` cambia el destinatario y `FORM_FROM` el remitente (por defecto `Web CERAMIS <web@ceramisagency.com>`).

Si algo falla, la web muestra el error con un enlace a WhatsApp, y en Cloudflare verás el motivo en **Deployments → (último) → Functions → Real-time logs**.

Campos que recibe:

| Campo | Contenido |
|---|---|
| `nombre`, `restaurante`, `telefono`, `email`, `mensaje` | Datos del formulario |
| `privacidad` | `true` |
| `tipo` | `diagnostico` o `lista-espera` |
| `servicio` | Slug del servicio, si se envía desde una página de servicio |
| `plan` | Plan o servicio elegido en un botón de precios o en la calculadora (si lo hay) |
| `interes`, `contacto_preferido` | Solo desde `/contacto/` |
| `source`, `page`, `sentAt` | Página de origen y fecha |

## 7. Que Google te encuentre (SEO)

### Comprobar si la web está indexada

- Busca en Google `site:ceramisagency.com`. Si no sale nada, Google aún no la ha indexado (normal las primeras semanas).
- La forma fiable es **Google Search Console**, que además te dice por qué búsquedas apareces.

### Google Search Console (hazlo el primer día)

1. Entra en [search.google.com/search-console](https://search.google.com/search-console) con una cuenta de Google de la empresa.
2. **Añadir propiedad → Dominio** → `ceramisagency.com`.
3. Google te da un registro **TXT**. Cloudflare suele ofrecer verificarlo automáticamente; si no, añádelo en **DNS → Records** (tipo TXT, nombre `@`, valor el que te da Google) y pulsa **Verificar**.
4. **Sitemaps** → escribe `sitemap-index.xml` → **Enviar**.
5. **Inspección de URLs** → pega la home y pulsa **Solicitar indexación**. Repite con las 4 páginas de servicio y los artículos del blog.
6. A las 2–4 semanas mira **Rendimiento**: búsquedas, clics y posición media. Ahí se ve qué funciona.

Haz lo mismo en [Bing Webmaster Tools](https://www.bing.com/webmasters) con **Importar desde Google Search Console** (2 minutos; Bing también alimenta a ChatGPT y otros buscadores).

### Ficha de Google Business Profile de CERAMIS (la palanca nº 1)

Para búsquedas como "agencia marketing restaurantes Palma", Google enseña primero el mapa. Sin ficha no apareces ahí.

1. [business.google.com](https://business.google.com) → **Añadir empresa** → nombre: **The CERAMIS Agency**.
2. Categoría principal: **Agencia de marketing**. Secundarias: **Consultor de marketing**, **Agencia de publicidad en Internet** (o las más parecidas que ofrezca).
3. Elige **negocio que ofrece servicios en la zona de los clientes** y **oculta la dirección** (trabajas en el local del cliente). Zona: Palma y los municipios donde trabajes.
4. Teléfono +34 604 33 91 03, web `https://ceramisagency.com`, horario y descripción con "marketing para restaurantes, bares y cafeterías en Mallorca".
5. Verifica la ficha (Google suele pedir un vídeo del negocio o una llamada).
6. Pide reseña a cada cliente actual, sube fotos del equipo y del trabajo, y publica una novedad cada semana.

### Más señales para Google

- Date de alta, con **el mismo nombre, teléfono y web**, en: mallorca.com (directorio de marketing), Páginas Amarillas, Cylex, Clutch y Sortlist.
- Pide a los restaurantes clientes un enlace "Web por / Marketing por CERAMIS" en su web.
- Cuando tengáis redes, pásalas a `src/data/site.ts` (`social`): se añaden solas al schema (`sameAs`).

### Contenido: un artículo cada dos semanas

Ya hay 4 artículos. Temas con búsquedas reales de dueños de restaurante para seguir:

1. Cómo reducir los no-shows en un restaurante.
2. Ideas de contenido para Instagram de un restaurante (y cada cuánto publicar).
3. Cuánto cuesta un community manager para un restaurante en Mallorca.
4. Cómo hacer que los turistas encuentren tu restaurante (inglés y alemán en Google).
5. Reservas por WhatsApp, teléfono o web: qué le conviene a tu restaurante.
6. Qué poner en la ficha de Google de un restaurante: guía de atributos.
7. Cómo preparar el restaurante para la temporada alta en Mallorca.
8. Fidelizar clientes en temporada baja: qué funciona en un bar.

Cada artículo debe enlazar al servicio relacionado y terminar con el diagnóstico gratis.

## 8. Después de publicar

1. **Prueba en un iPhone real**: el hero (scroll y frames), el menú, el formulario y la calculadora.
2. **PageSpeed Insights** sobre la URL real para confirmar las métricas de Lighthouse con la red de Cloudflare.
3. **Rich Results Test** de Google sobre la home, un servicio y un post para comprobar el schema.

## Comandos útiles

| Comando | Para qué |
|---|---|
| `npm run dev` | Desarrollo en `http://localhost:4321` |
| `npm run build` | Comprobación de tipos, build y post-build (CSP y validación de JSON-LD) |
| `npm run preview:prod` | Sirve `dist/` con las cabeceras de `_headers` en `http://localhost:4322` |
| `npm run placeholders` | Lista lo que falta por rellenar |
| `node scripts/make-images.mjs` | Regenera las fotos de servicio, la portada del blog y las imágenes para compartir |
| `npm run lighthouse`, `npm run a11y`, `npm run qa:webkit` | Rendimiento, accesibilidad y prueba en Safari (con `preview:prod` en marcha) |
