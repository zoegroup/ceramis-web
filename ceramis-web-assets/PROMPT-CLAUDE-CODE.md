# PROMPT PARA CLAUDE CODE — Web de The CERAMIS Agency

> Pega todo este documento en Claude Code dentro de una carpeta vacía donde hayas descomprimido `ceramis-web-assets/`. Lo primero que debe hacer es guardar este brief como `CLAUDE.md` en la raíz del proyecto.

---

## 0. Cómo quiero que trabajes

1. Guarda este documento íntegro como `CLAUDE.md` en la raíz. Es la fuente de verdad del proyecto.
2. Antes de escribir código, preséntame un **plan por fases** (estructura de carpetas, dependencias con versión y orden de construcción) y espera mi OK.
3. Trabaja **por fases** y para al final de cada una para que la revise en `npm run dev`:
   - **Fase 1**: setup, design tokens, layout base (header, footer) y **hero animado completo**.
   - **Fase 2**: resto de la home.
   - **Fase 3**: plantilla de servicio + 4 páginas de servicio + calculadora ROI.
   - **Fase 4**: Sobre nosotros, Contacto, Blog (colección + 1 post de ejemplo), legales y 404.
   - **Fase 5**: SEO técnico, schema, rendimiento, accesibilidad y build final para Cloudflare Pages.
4. Usa siempre la **última versión estable** de cada dependencia y verifica la documentación oficial actual antes de usar una API. No inventes APIs.
5. Si algo de este brief no es técnicamente viable o hay una opción claramente mejor, **dímelo y propón alternativas antes de implementarlo**. No lo cambies por tu cuenta.
6. No des vueltas: si un enfoque ya se ha probado y ha fallado, no lo repitas; propón otro.

---

## 1. Contexto de negocio

- **Marca**: The CERAMIS Agency. Dominio: `ceramisagency.com`.
- **Qué somos**: agencia de marketing digital especializada en **captar y fidelizar clientes**, principalmente para **bares, cafeterías y restaurantes en Mallorca** (Palma). Somos jóvenes, cercanos y honestos, con mucho trabajo y nada de humo.
- **Significado del nombre** (para la sección de valores; cada letra son dos palabras):
  - C: Constancia / Conocimiento
  - E: Esfuerzo / Estrategia
  - R: Resiliencia / Resultados
  - A: Acción / Alcance
  - M: Masiva / Mano a mano
  - I: Imperfecta / Impulsado
  - S: Siempre / Siempre a tu lado
- **Servicios** (todos se gestionan desde el CERAMIS Dashboard, una app aparte):
  1. **Gestión de redes sociales**: estrategia de contenido, grabación, edición y métricas. Tendrá 3 planes, aún por definir: deja los planes como datos editables con valores `[POR DEFINIR]`.
  2. **Reservas telefónicas con IA**: agente de voz que atiende llamadas 24/7, toma reservas y alimenta un CRM de clientes. SaaS con suscripción mensual.
  3. **Reservas web**: motor de reservas para la web y la ficha de Google del restaurante.
     - Los servicios 2 y 3 tienen *upgrades*: confirmaciones, recordatorios y seguimiento por email, SMS o WhatsApp.
  4. **Fidelización con Wallet**: tarjeta de sellos digital en Apple/Google Wallet, sin que el cliente instale ninguna app. Ejemplo: a la décima visita, café gratis.
- **Cliente ideal**: dueño de restaurante de 20 a 55 años con mentalidad de crecimiento. Factura bien pero quiere más, sabe que cada llamada perdida es dinero y ve el marketing como inversión.
- **Objetivo de la web**: generar **solicitudes de diagnóstico gratuito / demo** (formulario y WhatsApp/teléfono) y posicionar en SEO local.
- **Dashboard**: NO forma parte de esta web. Solo un botón "Acceso clientes" en el header que enlaza a `PUBLIC_DASHBOARD_URL` (variable de entorno; por defecto `https://app.ceramisagency.com`).

---

## 2. Stack (decidido)

- **Astro** (última estable), salida **estática**, TypeScript estricto.
- Estilos: **CSS nativo con custom properties** + estilos con scope de Astro. Sin frameworks de UI. Sin React salvo que algún componente lo justifique de verdad (pregúntame antes).
- Animación: **GSAP + ScrollTrigger** (GSAP es gratuito, incluidos sus plugins) y **Lenis** para el smooth scroll, sincronizado con ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)` y `gsap.ticker`).
- Transiciones entre páginas: **View Transitions de Astro** (`<ClientRouter />`).
  - **Crítico**: inicializa Lenis y GSAP en `astro:page-load` y destrúyelos en `astro:before-swap` (`ScrollTrigger.getAll().forEach(t => t.kill())`, `lenis.destroy()`). Si no, las animaciones se duplican o mueren al navegar.
- Contenido: **Content Collections** con MDX para el blog y un archivo de datos tipado (`src/data/services.ts`) para los servicios.
- Fuentes **autoalojadas** con `@fontsource` (nada de Google Fonts remoto, por RGPD): **Jost** (400, 500, 700) y **Playfair Display Italic** (600, 700). `font-display: swap` y preload de la fuente del H1.
- Integraciones: `@astrojs/sitemap`, `@astrojs/mdx`. Imágenes con `astro:assets`.
- Analítica: **Cloudflare Web Analytics** (sin cookies). Si no hay cookies no esenciales, no hace falta banner de consentimiento. No añadas Google Analytics ni píxeles.
- Despliegue: **Cloudflare Pages** (build `npm run build`, salida `dist`).

---

## 3. Identidad visual

### Logo (en `brand/`)
- `ceramis-logo-tinta.svg`: logo principal sobre fondos claros.
- `ceramis-logo-crema.svg`: sobre fondos oscuros.
- Favicons: `favicon.svg`, 32, 180 y 512 (apple-touch). Imagen OG: `og-image-1200x630.png`.
- En el header el logo va a **64 px de alto en escritorio y 52 px en móvil**. No más pequeño, o "agency" deja de leerse.

### Paleta (tokens en `:root`)
El vídeo del hero tiene un fondo crema cálido con una ligera viñeta. La paleta está ajustada a él.

```css
--c-bg:        #F3ECDF;  /* crema, fondo general (casa con el vídeo) */
--c-surface:   #FAF6EF;  /* hueso, tarjetas */
--c-sand:      #E7DDCB;  /* arena, secciones alternas */
--c-stone:     #B9AE9C;  /* piedra, bordes y líneas finas */
--c-ink:       #1E1C19;  /* tinta, texto principal */
--c-ink-soft:  #5F574B;  /* texto secundario (mín. AA sobre crema) */
--c-accent:    #7A5A40;  /* moka, botones/CTAs y palabras en cursiva */
--c-accent-hover: #64492F;
--c-brass:     #B08D57;  /* latón, detalles decorativos, nunca para texto */
```
- **Nada de secciones con fondo oscuro.** Toda la web es clara: fondo crema, arena o hueso. En nuestro sector los fondos oscuros convierten peor. El footer puede ser arena.
- Verifica contraste WCAG AA en todas las combinaciones de texto.

### Tipografía
- UI y cuerpo: **Jost**. Cuerpo 17–18 px, interlineado 1.6, máximo 68 caracteres por línea.
- Titulares: Jost 500 grande (clamp fluido, H1 hasta ~88 px en escritorio), tracking ligeramente negativo.
- **Cursiva de acento**: Playfair Display Italic, solo en **1–2 palabras clave por titular**, en color `--c-accent`. Ejemplo: `Mesas que se <em>llenan</em>.` Nunca en párrafos enteros.
- Etiquetas y "eyebrows": Jost 500, mayúsculas, tracking amplio, 12–13 px.

### Estilo general
- Editorial cálido y minimalista: mucho aire, rejilla clara y líneas finas `--c-stone` de 1 px como separadores.
- La **rejilla 3×3 del logo** es el motivo gráfico recurrente (sección de valores, separadores, detalles).
- Botones: rectangulares con radio de 2 px. Primario moka con texto hueso; secundario con borde de 1 px tinta. Hover suave de 200 ms.
- Movimiento: lento y elegante (easing `power3.out` o `expo.out`, 0.8–1.2 s). Nada de rebotes ni efectos llamativos.

---

## 4. HERO animado con scroll (lo más importante)

### Assets (ya generados en `public/hero/`)
- `desktop/f_0001.webp` … `f_0151.webp` (1600×900, 16:9)
- `tablet/…` (1120×630, 16:9)
- `mobile/…` (720×900, 4:5, recorte central)
- `poster-desktop.webp`, `poster-mobile.webp`: primer frame, para el LCP.
- `hero-fallback.mp4`: sin audio, para `prefers-reduced-motion`.
- `manifest.json`: `{ "frames": 151 }`.
- `scripts/build-hero-frames.sh` regenera todo si cambia el vídeo. Lee el número de frames del manifest; no lo dejes fijo en el código.

### Contenido del vídeo (151 frames)
| Frames | Progreso | Qué ocurre |
|---|---|---|
| 1–30 | 0.00–0.20 | Taza de cerámica flotando y girando |
| 31–67 | 0.20–0.44 | La taza se transforma en tenedor |
| 68–97 | 0.44–0.64 | Tenedor de latón girando |
| 98–120 | 0.64–0.80 | El tenedor se transforma en cámara |
| 121–151 | 0.80–1.00 | Cámara girando y asentándose |

### Comportamiento
- Sección `pin` con ScrollTrigger: altura de scroll **~450vh en escritorio y ~380vh en móvil**. El vídeo se pinta en un `<canvas>` y el frame avanza con el scroll (`scrub: 0.5`, con interpolación suave, no saltos).
- **No uses `<video>` con `currentTime` para el scrub.** Va a tirones, sobre todo en iOS. Usa la secuencia de imágenes en canvas.
- Carga:
  1. El poster se pinta al instante como `<img>` con `fetchpriority="high"` (es el LCP).
  2. Después precarga los frames en orden prioritario (1–40 primero, luego el resto) con `Image.decode()`.
  3. Si el usuario hace scroll antes de que cargue un frame, pinta el más cercano ya cargado.
- Elige el set según el ancho del viewport (móvil < 768 ≤ tablet < 1200 ≤ escritorio) y el `devicePixelRatio`, limitado a 2. Recalcula al redimensionar (con debounce) sin recargar los frames ya cargados.
- **Escritorio/tablet**: canvas a pantalla completa en modo "cover", objeto centrado. Textos a la izquierda en columna de ~40% (el objeto queda centrado-derecha).
- **Móvil**: bloque del canvas 4:5 a ancho completo, centrado. Textos **encima y debajo** del bloque, nunca sobre el objeto. Fundidos con máscara (`mask-image` con gradiente) en los bordes del canvas para que se funda con `--c-bg`.
- Fondo de la sección = `--c-bg`, con un degradado suave en los bordes para disimular la viñeta del vídeo.

### Textos sincronizados (entran y salen con fade + desplazamiento de 24 px, controlados por el mismo timeline)
- **0.00–0.10** (estado inicial, visible sin scroll):
  - Eyebrow: `AGENCIA DE MARKETING PARA RESTAURANTES · MALLORCA`
  - **H1** (debe existir en el HTML para SEO, no solo dibujado en el canvas): `Llenamos tu restaurante. <em>Siempre.</em>`
  - Subtítulo: `Captamos clientes nuevos, llenamos tus mesas y hacemos que vuelvan.`
  - CTA primario `Pide tu diagnóstico gratis` · secundario `Ver servicios`
  - Indicador sutil de "scroll".
- **0.10–0.22** (taza): `Clientes que <em>vuelven</em>.` + `Tarjeta de fidelización en el Wallet de su móvil. Sin apps.`
- **0.22–0.44**: transformación taza → tenedor, sin texto.
- **0.44–0.62** (tenedor): `Mesas que se <em>llenan</em>.` + `Reservas por teléfono con IA y desde tu web, 24/7.`
- **0.64–0.80**: transformación tenedor → cámara, sin texto.
- **0.82–0.96** (cámara): `Marcas que se <em>ven</em>.` + `Contenido, redes y estrategia que atraen clientes nuevos.`
- **0.96–1.00**: CTA final antes de soltar el pin: `¿Hablamos?` + botón `Pide tu diagnóstico gratis`.
- Mientras dura el hero, muestra una barra de progreso fina (1 px, latón) o 3 puntos (taza, tenedor, cámara).

### Accesibilidad y fallback
- Con `prefers-reduced-motion: reduce`: sin pin ni scrub. Se muestra el poster y los 3 bloques de texto apilados de forma estática.
- El canvas lleva `aria-hidden="true"`. Todo el texto es HTML real.
- Sin JavaScript: poster y textos estáticos visibles.

---

## 5. Resto de la HOME (en orden)

1. **Hero** (sección 4).
2. **Problemas**: titular `Tres fugas que cuestan dinero cada semana.`
   - Tres columnas: **Llamadas perdidas**, **Clientes que no vuelven**, **Falta de clientes nuevos**.
   - Cada una con una cifra o dato orientativo marcado como `[DATO A VALIDAR]`. No inventes estadísticas presentándolas como reales.
3. **Servicios**: 4 tarjetas grandes (rejilla 2×2 en escritorio, carrusel con *scroll-snap* en móvil).
   - Cada tarjeta lleva nombre, beneficio en una línea y enlace "Ver detalle →".
   - Hover: imagen o ilustración que escala un 1.03 y una línea de latón que se dibuja.
   - Si un servicio tiene `available: false` en los datos, muestra la etiqueta **"Próximamente"** y su CTA lleva a la lista de espera.
4. **Valores CERAMIS**: la rejilla 3×3 del logo a gran tamaño. Al hacer scroll, cada letra se "ilumina" en secuencia y muestra sus dos palabras con una frase corta. Pin breve (~200vh en escritorio; en móvil, lista vertical con reveal).
5. **Cómo trabajamos**: 4 pasos (Diagnóstico → Plan → Implementación → Medición y mejora), con una línea de tiempo que se dibuja con el scroll.
6. **Resultados / caso real**: bloque para un caso (cliente actual en Palma) con métricas `[POR COMPLETAR]` y una cita. Si no hay datos, el bloque se oculta desde un flag.
7. **Preguntas frecuentes**: 6 preguntas en acordeón accesible (`<details>`), con schema FAQPage.
8. **CTA final**: titular grande, formulario corto (nombre, restaurante, teléfono, email, mensaje opcional y checkbox de privacidad) y botón de WhatsApp.
9. **Footer** (fondo arena): logo, enlaces, contacto `[EMAIL]` `[TELÉFONO]`, Palma de Mallorca, redes, legales y "Acceso clientes".

---

## 6. Páginas de servicio (`/servicios/[slug]/`)

Rutas:
- `/servicios/` (índice)
- `/servicios/gestion-redes-sociales/`
- `/servicios/reservas-telefonicas-ia/`
- `/servicios/reservas-web/`
- `/servicios/fidelizacion-wallet/`

**Plantilla única** alimentada por `src/data/services.ts`, con transición de página desde la tarjeta (`transition:name` compartido entre la tarjeta y el hero de la página). Secciones en orden:
1. **Hero del servicio**: H1 con la keyword principal, beneficio, CTA y breadcrumb.
2. **El problema (pain points)**: 3–4 dolores concretos del dueño del restaurante.
3. **Lo que cambia (beneficios)**: 3–4 beneficios en lenguaje de negocio, no técnico.
4. **Cómo funciona**: 3–5 pasos con animación al aparecer.
5. **Características**: lista o rejilla. Los upgrades (email, SMS, WhatsApp) van marcados como "Upgrade".
6. **ROI**:
   - En *Reservas telefónicas IA* va una **calculadora interactiva** con los inputs llamadas perdidas por semana, % que acabaría reservando, comensales medios por reserva y ticket medio por comensal. El resultado es la facturación recuperable al mes y al año, con una animación de conteo. El texto aclara que es una estimación.
   - En los demás servicios, ROI explicado con un ejemplo numérico marcado como `[EJEMPLO]`.
7. **Planes o precios**: placeholders `[POR DEFINIR]` desde los datos. En redes, 3 planes.
8. **FAQ** del servicio (schema FAQPage).
9. **CTA** y enlaces a los otros servicios (enlazado interno).

Escribe tú el copy de cada página en español, cercano, directo y sin sonar a gurú ni a vendehumos. Frases cortas y tuteo. Todo lo que sea una promesa medible va marcado `[VALIDAR]`.

---

## 7. Otras páginas

- **Sobre nosotros** (`/sobre-nosotros/`): la historia del nombre CERAMIS (gente que nos inspiró), los 7 valores, el equipo (placeholders de foto, nombre y rol) y por qué solo trabajamos con hostelería.
- **Contacto** (`/contacto/`): formulario completo, WhatsApp, email, mapa estático (imagen, no iframe de Google, por rendimiento y privacidad) y horario.
- **Blog** (`/blog/` y `/blog/[slug]/`): colección MDX con frontmatter (title, description, date, author, tags, cover, faq opcional), índice con filtros por etiqueta, tiempo de lectura, artículos relacionados y schema BlogPosting. Crea **1 post de ejemplo**: "Cuánto dinero pierde un restaurante por cada llamada que no contesta".
- **Legales**: `/aviso-legal/` (LSSI-CE), `/privacidad/` (RGPD/LOPDGDD) y `/cookies/`. Usa placeholders `[RAZÓN SOCIAL]`, `[NIF]`, `[DOMICILIO]`, `[EMAIL]` y `[REGISTRO MERCANTIL]`: la SL está en constitución.
- **404** con la rejilla del logo y un enlace a la home.

---

## 8. Formularios

- Envío por `fetch` a `PUBLIC_FORM_ENDPOINT` (variable de entorno, será un webhook de n8n). JSON con los campos y `source` (página de origen).
- Validación en cliente y estados de carga, éxito y error accesibles (`aria-live`).
- Protección anti-spam con un campo *honeypot* y tiempo mínimo de envío. Nada de CAPTCHA de terceros.
- Checkbox de privacidad obligatorio con la **primera capa informativa RGPD** visible: responsable, finalidad, legitimación, derechos y enlace a la política.
- Botón de WhatsApp con `https://wa.me/[TELEFONO]` y un texto predefinido.

---

## 9. SEO

- Por página: `<title>` (≤ 60 caracteres), meta description (≤ 155), canonical, Open Graph y Twitter Card (OG por defecto: `og-image-1200x630.png`), `lang="es"`.
- **Un solo H1 por página** y jerarquía de headings correcta.
- **Schema JSON-LD**:
  - Global: `Organization` + `ProfessionalService` (nombre, url, logo, `areaServed`: Mallorca/Palma, contacto con placeholders).
  - Por página: `WebSite` (home), `Service` (páginas de servicio), `FAQPage`, `BreadcrumbList` y `BlogPosting`.
  - Valida que todo sea JSON-LD correcto.
- `sitemap.xml`, `robots.txt` y URLs limpias en español con barra final coherente.
- Estructura preparada para i18n (ES ahora; EN y DE después) sin implementarlo todavía.

**Keywords objetivo** (úsalas de forma natural en H1, H2, intro y meta):

| Página | Keyword principal | Keywords secundarias / long-tail |
|---|---|---|
| Home | agencia de marketing para restaurantes en Mallorca | marketing para bares Palma, captar clientes restaurante |
| Redes | gestión de redes sociales para restaurantes Palma | community manager restaurantes Mallorca, contenido para restaurantes |
| Reservas IA | sistema de reservas telefónicas con IA para restaurantes | asistente de voz reservas restaurante, no perder llamadas restaurante |
| Reservas web | sistema de reservas online para restaurantes | reservas desde Google restaurante, motor de reservas sin comisiones |
| Wallet | tarjeta de fidelización digital para cafeterías | tarjeta de sellos en el móvil, programa de fidelización para bares |

---

## 10. Rendimiento y calidad (criterios de aceptación)

- Lighthouse móvil: **Performance ≥ 90, Accessibility ≥ 95, SEO 100, Best Practices ≥ 95**.
- **LCP < 2.5 s** (el poster del hero es el LCP), **CLS < 0.1**, **INP < 200 ms**.
- JavaScript solo donde hace falta (hero, animaciones, calculadora, formulario). Carga GSAP y Lenis de forma diferida.
- Imágenes con `astro:assets` (AVIF/WebP, `width`/`height` explícitos, lazy fuera del primer pantallazo).
- **WCAG 2.1 AA**:
  - Foco visible, navegación completa por teclado y skip link.
  - Menú móvil accesible (focus trap y Esc para cerrar).
  - `prefers-reduced-motion` respetado en **todas** las animaciones.
- Prueba y muéstrame capturas en **360, 390, 768, 1024, 1440 y 1920 px**, y en Safari iOS (o su emulación). El hero no puede tener saltos ni pantallazos en blanco.
- Header: transparente sobre el hero y fondo crema con blur al hacer scroll. Se oculta al bajar y aparece al subir.

---

## 11. Estructura sugerida (ajústala si propones algo mejor)

```
src/
  components/ (Header, Footer, Button, ServiceCard, ValuesGrid, Steps, FAQ, CTAForm, RoiCalculator, Breadcrumbs, SEO, SchemaOrg)
  components/hero/ (HeroScroll.astro, hero-sequence.ts)
  layouts/ (BaseLayout.astro, ServiceLayout.astro, PostLayout.astro)
  lib/ (motion.ts: init/destroy de Lenis+GSAP con los eventos de Astro)
  data/ (services.ts, values.ts, faq.ts, site.ts)
  content/blog/
  pages/
  styles/ (tokens.css, base.css, typography.css)
public/hero/  brand/
```

Empieza por el **paso 0**: guarda este brief como `CLAUDE.md` y preséntame el plan de la Fase 1.
