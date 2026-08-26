import React, { useState, useEffect, useRef } from 'react';

/**
 * Anima el precio contando entre el valor anterior y el nuevo en ~300ms
 * cuando `value` cambia (por ejemplo, al cambiar de moneda). En la carga
 * inicial no anima — solo en transiciones reales, para no hacer que la
 * página "cuente desde cero" en cada montaje de card.
 */
export default function AnimatedPrice({ value, symbol, className = '' }) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValue = useRef(value);
  const rafRef = useRef(null);

  useEffect(() => {
    const from = prevValue.current;
    const to = value;
    if (from === to) return;

    const duration = 300;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic — arranca rápido y desacelera, se siente más natural
      // que una interpolación lineal para un contador de precio.
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(from + (to - from) * eased);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        prevValue.current = to;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value]);

  return (
    <span className={className}>
      {symbol}{displayValue.toFixed(2)}
    </span>
  );
}
