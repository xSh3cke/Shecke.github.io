# Yx Store

Landing + tienda para vender sistemas de Roblox (admin, economía, seguridad, etc). Construida con React + Vite. Diseño propio: fondo negro, acento carmesí, panel de terminal animado como pieza visual central, tipografía Space Grotesk / Inter / JetBrains Mono.

Incluye: catálogo con búsqueda y banner visual único por producto (gradiente SVG generado, sin imágenes externas), 3+ productos destacados con carrusel desplegable si hay más de 3, etiquetas dinámicas (Nuevo/VIP/Gratis/Exclusivo/De pago/Corrección/Actualizado/Oferta), modal de información detallada por producto (qué incluye, requisitos, historial de versiones), carrito con loading states, checkout con 2 métodos de pago (Stripe / PayPal), login y registro, selector de idioma (10 idiomas), selector de moneda (12 monedas) y selector de tema (Carmesí / Medianoche / Esmeralda) — todo con traducciones y conversión de precios en vivo. Contador de instalaciones animado (ver nota importante más abajo sobre qué significa "en vivo" aquí).

15 animaciones y efectos, todos sin librerías externas (solo IntersectionObserver, requestAnimationFrame y CSS): skeleton loading en el buscador, precio que cuenta al cambiar de moneda, ripple al hacer click/tap en botones, shake en formularios con validación fallida, reveal-on-scroll, spotlight que sigue al cursor, progress bar de scroll en el navbar, bounce del ícono del carrito al añadir, toast de confirmación al cambiar de tema, morph hamburguesa↔X, highlight de texto en resultados de búsqueda, flash de sección al navegar desde el hero, efecto de tecleo en el panel de terminal, y parallax sutil en los banners de producto (desactivado en touch y `prefers-reduced-motion`).

**Importante:** el checkout que trae este proyecto es una **maqueta funcional del flujo**, no procesa cobros reales. Para cobrar de verdad necesitas conectar un backend con las claves secretas de Stripe/PayPal — ver la sección [Conectar pagos reales](#conectar-pagos-reales) más abajo.

**Sobre el contador de instalaciones "en tiempo real":** tampoco es data real. No hay backend ni base de datos compartida entre visitantes, así que es imposible que el número que ves esté sincronizado con lo que compran otras personas en otros navegadores. Lo que hay es una simulación local (`src/hooks/useLiveInstalls.js`) que incrementa el número solo, con timers aleatorios, para dar sensación de actividad. Está documentado igual de explícito dentro del propio archivo — no es un truco oculto.

---

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior
- npm (viene con Node)

Para comprobar que los tienes:

```bash
node --version
npm --version
```

---

## Instalación

```bash
# 1. Clona el repo (o descarga el ZIP y entra en la carpeta)
git clone https://github.com/TU-USUARIO/yx-store.git
cd yx-store

# 2. Instala dependencias
npm install

# 3. Arranca el servidor de desarrollo
npm run dev
```

Abre `http://localhost:5173` — ahí verás la web con recarga automática al guardar cambios.

---

## Estructura del proyecto

El proyecto está dividido en módulos por responsabilidad — no hay un archivo gigante con todo, cada pieza vive en su propio lugar:

```
yx-store/
├── .github/workflows/deploy.yml   # publica en GitHub Pages automáticamente
├── public/                        # favicon
├── src/
│   ├── App.jsx                    # orquestador: todo el estado global y layout
│   ├── main.jsx                   # punto de entrada de React
│   │
│   ├── data/                      # contenido, separado de la lógica
│   │   ├── translations.js        #   10 idiomas (textos de interfaz)
│   │   ├── products.js            #   catálogo completo
│   │   └── currencies.js          #   tasas de cambio + nombres de idiomas
│   │
│   ├── context/
│   │   └── ThemeContext.jsx       # selector de tema (data-theme + localStorage)
│   │
│   ├── hooks/
│   │   ├── useLiveInstalls.js     # contador de instalaciones animado (ver nota arriba)
│   │   └── useParallax.js         # parallax sutil de los banners, desactivado en touch
│   │
│   ├── components/
│   │   ├── icons/Icon.jsx         # set de íconos SVG inline
│   │   ├── layout/
│   │   │   ├── Navbar.jsx         #   nav + los 4 popovers + progress bar de scroll
│   │   │   └── Footer.jsx
│   │   ├── hero/
│   │   │   ├── Hero.jsx
│   │   │   └── TerminalPanel.jsx  #   panel de terminal con efecto de tecleo
│   │   ├── products/
│   │   │   ├── ProductCard.jsx    #   una sola card para destacados y catálogo
│   │   │   ├── ProductBanner.jsx  #   gradiente SVG único por producto + parallax
│   │   │   └── FeaturedCarousel.jsx # grid de 3 + desplegable si hay más
│   │   ├── modals/
│   │   │   ├── AuthModal.jsx
│   │   │   ├── CheckoutModal.jsx  #   Stripe + PayPal
│   │   │   ├── ProductInfoModal.jsx
│   │   │   └── ThemeSwitcher.jsx  #   la pestaña de temas en el navbar
│   │   ├── cart/CartDrawer.jsx
│   │   └── ui/
│   │       ├── Reveal.jsx         #   reveal-on-scroll
│   │       ├── GlowButton.jsx     #   spotlight que sigue al cursor + ripple
│   │       ├── Ripple.jsx         #   hook useRipple, reutilizado por varios botones
│   │       ├── Loader.jsx         #   spinners, loading states y skeleton de card
│   │       ├── Toast.jsx          #   sistema de notificaciones (context + host)
│   │       ├── AnimatedPrice.jsx  #   precio que cuenta al cambiar de moneda
│   │       ├── HighlightText.jsx  #   resalta coincidencias de búsqueda
│   │       └── useShakeOnInvalid.js # shake en formularios con validación fallida
│   │
│   └── styles/
│       ├── index.css              # solo @import de los demás, en orden
│       ├── tokens.css             # los 3 temas de color + tipografía
│       ├── base.css                # reset + accesibilidad
│       ├── layout.css, buttons.css, hero.css, sections.css,
│       ├── products.css, modals.css, effects.css, responsive.css,
│       └── animations.css          # las 15 animaciones y efectos, en un solo lugar
│
├── index.html
├── vite.config.js
├── package.json
├── .env.example                   # plantilla de variables de entorno
└── .gitignore
```

`data/` no importa nada de `components/` — es contenido puro (idiomas, productos, monedas). Para cambiar textos o precios nunca hace falta tocar JSX, solo estos tres archivos.

---

## Personalización rápida

### Cambiar productos

En `src/data/products.js`, cada producto sigue esta forma:

```js
{
  id: 11,
  name: 'Mi Sistema Nuevo',
  tag: 'ADMIN',
  price: 39.99,
  rating: 4.8,
  installsBase: 1200,        // número, no string — ver nota sobre useLiveInstalls arriba
  version: '1.0.0',
  featured: false,           // true = aparece en "Los más instalados"
  tags: ['new'],             // 0 a 2 claves; deben existir en TRANSLATIONS[idioma].tags — ver lista abajo
  bannerSeed: [42, 180],      // dos números cualquiera — alimentan el gradiente del banner, fijos para que no cambie en cada render
  description: 'Descripción corta del sistema (aparece en la card).',
  specs: ['Característica 1', 'Característica 2', 'Característica 3'],   // 3 puntos cortos, solo para la card

  // Estos tres campos solo se usan dentro del modal "Ver detalles" (botón info de la card):
  includes: ['Qué trae el paquete, un punto por línea', 'Puede ser más largo que specs'],
  requirements: ['Requisito técnico 1', 'Requisito técnico 2'],
  changelog: [
    { v: '1.0.0', note: 'Descripción del cambio en esta versión' }
  ]
}
```

Claves válidas para `tags`: `new`, `vip`, `free`, `exclusive`, `paid`, `fix`, `update`, `offer` — cada una tiene su propio color en `src/styles/products.css` (buscar `.badge-pill--`) y su traducción en las 10 entradas de `TRANSLATIONS[idioma].tags`. Un producto puede no tener ninguna etiqueta (`tags: []`) — no es obligatorio.

No hay límite fijo de productos con `featured: true`. Con 3 o menos, `FeaturedCarousel` es solo un grid. Con 4 o más, los primeros 3 se muestran siempre y el resto queda tras el botón "Ver más destacados".

Los campos `includes`, `requirements` y `changelog` son obligatorios: el modal de información (que se abre con el botón ⓘ de cada card) los recorre con `.map()` sin comprobar si existen, así que un producto nuevo sin esos tres campos rompe al abrir su modal — no al cargar la página, solo al hacer click en su botón info.

### Cambiar textos e idiomas

En `src/data/translations.js`. Cada idioma es una clave (`es`, `en`, `fr`...) con la misma forma interna. Para añadir un idioma nuevo, copia el bloque de `en` completo, tradúcelo, y añade su código a `LANGUAGE_LABELS` en `src/data/currencies.js`.

### Cambiar monedas o tasas de cambio

En `src/data/currencies.js`, busca `EXCHANGE_RATES`. Las tasas están fijas en el código (no llaman a ninguna API en vivo). Si quieres tasas reales actualizadas, tendrías que consumir una API de conversión de divisas y guardar el resultado en estado.

### Cambiar colores / añadir un tema

Los 3 temas viven en `src/styles/tokens.css`, cada uno en su propio bloque `[data-theme='...']`:

```css
[data-theme='crimson'] {
  --c-accent: #c41e3a;         /* color principal del tema */
  --c-accent-bright: #e8324a;  /* para hover/acentos */
  --c-accent-deep: #7a0f22;    /* para gradientes */
  --c-accent-rgb: 196, 30, 58; /* mismo color en R, G, B — lo usan los rgba() del resto del CSS */
  --c-bg: #050506;             /* negro de fondo */
  ...
}
```

Para añadir un 4º tema: duplica uno de los tres bloques, cámbiale el nombre (`[data-theme='tuTema']`) y los valores de color, añade `'tuTema'` al array `THEMES` en `src/context/ThemeContext.jsx`, y añade su nombre traducido a `TRANSLATIONS[idioma].theme` en los 10 idiomas. También añade el swatch de color en `THEME_SWATCH` dentro de `src/components/modals/ThemeSwitcher.jsx` — ese mapa es independiente de `tokens.css` a propósito, para no tener que instanciar el tema con solo mostrar su muestra de color en el selector.

**Importante:** ningún componente debe usar `--c-crimson`, `--c-crimson-bright`, etc. — esos nombres ya no existen. Todo el CSS usa `--c-accent*`, que cambia de valor según el tema activo. Si copias código de otro lugar y pegas una variable `--c-crimson`, el selector de tema dejará de tener efecto sobre ese elemento.

---

## Scripts disponibles

| Comando | Qué hace |
|---|---|
| `npm run dev` | Arranca el servidor local con recarga en caliente |
| `npm run build` | Genera la build de producción en `dist/` |
| `npm run preview` | Sirve localmente la build de `dist/` para probarla antes de publicar |

---

## Publicar la web

### Opción A — GitHub Pages (gratis, automático, ya configurado)

1. Sube este proyecto a un repositorio en GitHub.
2. En el repo, ve a **Settings → Pages** y en "Build and deployment" elige **GitHub Actions** como fuente.
3. Haz push a la rama `main`. El workflow en `.github/workflows/deploy.yml` compila y publica solo.
4. Tu web quedará en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

No necesitas editar el base path a mano — el workflow lo calcula solo a partir del nombre del repo.

### Opción B — Vercel

1. Entra a [vercel.com](https://vercel.com), conecta tu cuenta de GitHub.
2. "Add New Project" → selecciona este repo.
3. Vercel detecta Vite automáticamente. Dale a Deploy.

### Opción C — Netlify

1. Entra a [netlify.com](https://netlify.com) → "Add new site" → "Import an existing project".
2. Selecciona el repo. Build command: `npm run build`. Publish directory: `dist`.

---

## Conectar pagos reales

El checkout actual simula el flujo completo (elegir método, rellenar datos, "confirmar pago", pantalla de éxito) pero no se comunica con ningún procesador de pagos real. Para cobrar de verdad:

1. **Necesitas un backend** (Node/Express, por ejemplo) — las claves secretas de Stripe/PayPal nunca deben vivir en el código del navegador, porque cualquiera puede verlas.
2. En el backend, creas un endpoint que reciba el carrito y cree una sesión de pago con el SDK de Stripe o la API de PayPal.
3. En `src/components/modals/CheckoutModal.jsx`, la función `handleSubmit` tiene un `setTimeout` que simula la confirmación del pago — sustitúyelo por un `fetch` real a tu backend, y solo llama a `onConfirm()` (la prop que viene de `App.jsx`) cuando el backend confirme el cobro.
4. Las claves *públicas* (`pk_...` de Stripe, Client ID de PayPal) sí pueden ir en `.env` del front-end — copia `.env.example` a `.env` y rellénalas ahí.

Documentación oficial para el lado del backend:
- Stripe: https://docs.stripe.com/checkout/quickstart
- PayPal: https://developer.paypal.com/docs/checkout/

---

## Licencia

MIT — úsalo, modifícalo y véndelo como quieras.
