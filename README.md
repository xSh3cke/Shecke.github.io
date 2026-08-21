# Yx Store

Landing + tienda para vender sistemas de Roblox (admin, economía, seguridad, etc). Construida con React + Vite. Diseño propio: fondo negro, acento carmesí, panel de terminal animado como pieza visual central, tipografía Space Grotesk / Inter / JetBrains Mono.

Incluye: catálogo con búsqueda, 3 productos destacados, carrito, checkout con 4 métodos de pago (Stripe / PayPal / Cripto / Apple Pay), login y registro, selector de idioma (10 idiomas) y selector de moneda (12 monedas) — todo con traducciones y conversión de precios en vivo.

**Importante:** el checkout que trae este proyecto es una **maqueta funcional del flujo**, no procesa cobros reales. Para cobrar de verdad necesitas conectar un backend con las claves secretas de Stripe/PayPal — ver la sección [Conectar pagos reales](#conectar-pagos-reales) más abajo.

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

```
yx-store/
├── .github/workflows/deploy.yml   # publica en GitHub Pages automáticamente
├── public/                        # assets estáticos (favicon, imágenes)
├── src/
│   ├── YxStore.jsx                # componente principal (toda la app)
│   ├── main.jsx                   # punto de entrada de React
│   └── styles/
│       └── index.css              # sistema de diseño completo
├── index.html
├── vite.config.js
├── package.json
├── .env.example                   # plantilla de variables de entorno
└── .gitignore
```

Todo el contenido (productos, traducciones, tasas de cambio) vive arriba del componente en `YxStore.jsx`, en constantes con mayúsculas (`PRODUCTS`, `TRANSLATIONS`, `EXCHANGE_RATES`) — no hace falta tocar el JSX para cambiar textos o precios.

---

## Personalización rápida

### Cambiar productos

En `src/YxStore.jsx`, busca `const PRODUCTS = [`. Cada producto sigue esta forma:

```js
{
  id: 10,
  name: 'Mi Sistema Nuevo',
  tag: 'ADMIN',
  price: 39.99,
  rating: 4.8,
  installs: '1.2k',
  featured: false,           // true = aparece en "Los más instalados"
  description: 'Descripción corta del sistema.',
  specs: ['Característica 1', 'Característica 2', 'Característica 3']
}
```

Solo tres productos deberían tener `featured: true` — es el diseño de la sección hero de destacados.

### Cambiar textos e idiomas

Busca `const TRANSLATIONS = {`. Cada idioma es una clave (`es`, `en`, `fr`...) con la misma forma interna. Para añadir un idioma nuevo, copia el bloque de `en` completo, tradúcelo, y añade su código a `LANGUAGE_LABELS` un poco más abajo.

### Cambiar monedas o tasas de cambio

Busca `const EXCHANGE_RATES = {`. Las tasas están fijas en el código (no llaman a ninguna API en vivo). Si quieres tasas reales actualizadas, tendrías que consumir una API de conversión de divisas y guardar el resultado en estado.

### Cambiar colores

Todo el color vive en `src/styles/index.css`, dentro de `:root` al principio del archivo:

```css
:root {
  --c-crimson: #c41e3a;        /* rojo principal */
  --c-crimson-bright: #e8324a; /* rojo para hover/acentos */
  --c-crimson-deep: #7a0f22;   /* rojo oscuro para gradientes */
  --c-bg: #050506;             /* negro de fondo */
  ...
}
```

Cambia estas variables y se propaga a toda la web automáticamente.

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
3. Desde `YxStore.jsx`, en la función `handleCheckoutSubmit`, sustituyes la simulación (`setCheckoutStep('success')`) por una llamada `fetch` a tu backend, y solo muestras el éxito cuando el backend confirme el cobro.
4. Las claves *públicas* (`pk_...` de Stripe, Client ID de PayPal) sí pueden ir en `.env` del front-end — copia `.env.example` a `.env` y rellénalas ahí.

Documentación oficial para el lado del backend:
- Stripe: https://docs.stripe.com/checkout/quickstart
- PayPal: https://developer.paypal.com/docs/checkout/
- Coinbase Commerce: https://docs.cloud.coinbase.com/commerce/docs

---

## Licencia

MIT — úsalo, modifícalo y véndelo como quieras.
