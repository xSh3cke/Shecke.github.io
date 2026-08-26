import React, { useRef, useState, useEffect } from 'react';

/**
 * Reveal-on-scroll — sin librería externa (no framer-motion, no aos).
 * IntersectionObserver dispara una sola vez por instancia (obs.disconnect()
 * tras el primer isIntersecting), así que el efecto no se repite si el
 * usuario hace scroll hacia arriba y vuelve a bajar.
 */
export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ '--reveal-delay': `${delay}ms` }}>
      {children}
    </div>
  );
}
