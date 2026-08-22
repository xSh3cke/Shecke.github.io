import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Si despliegas en GitHub Pages en https://<usuario>.github.io/<repo>/,
// pon aquí '/<repo>/'. Si usas un dominio propio o Vercel/Netlify, deja '/'.
const BASE_PATH = process.env.VITE_BASE_PATH || '/';

export default defineConfig({
  plugins: [react()],
  base: BASE_PATH,
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
