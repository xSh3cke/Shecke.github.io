import { useState, useEffect, useRef } from 'react';

/**
 * IMPORTANTE — leer antes de asumir que esto es data real:
 *
 * Este proyecto no tiene backend ni base de datos (el checkout es una
 * maqueta, ver README). No existe ninguna fuente de verdad compartida
 * entre visitantes, así que un contador "en tiempo real" en el sentido
 * literal (gente comprando de verdad, en otros navegadores, sumando al
 * mismo número que tú ves) es imposible sin conectar un servidor.
 *
 * Lo que SÍ hace este hook: parte de `installsBase` (número fijo del
 * catálogo) y lo incrementa solo, en intervalos aleatorios, con
 * incrementos pequeños — simula la sensación de actividad en vivo sin
 * pretender ser data real. Cada visitante ve su propia simulación
 * empezando desde el mismo número base; no están sincronizados entre sí.
 *
 * Si en algún momento conectas un backend real, reemplaza el `setInterval`
 * de aquí por un WebSocket o polling a tu API — el resto de la app
 * (ProductCard, ProductInfoModal) ya consume este hook por su valor de
 * retorno, así que no habría que tocar nada fuera de este archivo.
 */
export function useLiveInstalls(baseValue, { minDelay = 4000, maxDelay = 11000, minIncrement = 1, maxIncrement = 4 } = {}) {
  const [count, setCount] = useState(baseValue);
  const [pulsing, setPulsing] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // reset si cambia el producto (baseValue distinto)
    setCount(baseValue);

    const scheduleNext = () => {
      const delay = minDelay + Math.random() * (maxDelay - minDelay);
      timeoutRef.current = setTimeout(() => {
        const increment = Math.floor(minIncrement + Math.random() * (maxIncrement - minIncrement + 1));
        setCount((c) => c + increment);
        setPulsing(true);
        setTimeout(() => setPulsing(false), 600);
        scheduleNext();
      }, delay);
    };

    scheduleNext();
    return () => clearTimeout(timeoutRef.current);
  }, [baseValue, minDelay, maxDelay, minIncrement, maxIncrement]);

  return { count, pulsing };
}

/**
 * Formatea un número como "18.4k" — mismo formato que ya usaba el
 * catálogo antes de este cambio, para que el número animado se vea
 * igual de compacto que el string fijo original.
 */
export function formatInstalls(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  return String(n);
}
