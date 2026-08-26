import { useState, useEffect, useRef } from 'react';

/**
 * Parallax sutil: el elemento se desplaza unos pocos px verticalmente
 * según su posición relativa al centro del viewport. El cálculo está
 * envuelto en requestAnimationFrame para no bloquear el hilo principal
 * aunque haya varios banners en pantalla a la vez.
 *
 * Desactivado automáticamente en touch (hover: none) y en
 * prefers-reduced-motion — en ambos casos devuelve offset 0 siempre.
 */
export function useParallax(strength = 8) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  const enabledRef = useRef(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchOnly = window.matchMedia('(hover: none)').matches;
    if (reduceMotion || isTouchOnly) {
      enabledRef.current = false;
      return;
    }

    let ticking = false;
    const update = () => {
      const node = ref.current;
      if (!node) { ticking = false; return; }
      const rect = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = Math.max(-1, Math.min(1, (elementCenter - viewportCenter) / window.innerHeight));
      setOffset(distance * strength);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [strength]);

  return { ref, offset: enabledRef.current ? offset : 0 };
}
