import React, { useRef, useCallback } from 'react';

/**
 * Efecto ripple genérico: un círculo se expande desde el punto exacto
 * del click/tap y se desvanece. Se aplica añadiendo `onPointerDown`
 * (cubre touch y mouse en un solo evento) al elemento que lo use.
 *
 * No usa estado de React para las ondas — las crea y destruye
 * directamente en el DOM vía refs, porque son puramente decorativas
 * (no afectan nada del árbol de React) y evita re-renders del botón
 * padre en cada click.
 *
 * Acepta un ref externo opcional (`externalRef`) para componentes que
 * ya tienen su propia ref sobre el mismo nodo — como GlowButton, que
 * necesita el bounding box tanto para el glow (mousemove) como para el
 * ripple (pointerdown) y no tiene sentido crear dos refs distintas
 * apuntando al mismo elemento del DOM.
 */
export function useRipple(externalRef) {
  const ownRef = useRef(null);
  const containerRef = externalRef || ownRef;

  const onPointerDown = useCallback((e) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const span = document.createElement('span');
    span.className = 'ripple';
    span.style.width = `${size}px`;
    span.style.height = `${size}px`;
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    container.appendChild(span);

    // Se limpia solo tras la animación (ver duración en effects.css)
    span.addEventListener('animationend', () => span.remove());
  }, []);

  return { containerRef, onPointerDown };
}

/**
 * Wrapper listo para usar cuando no hace falta lógica adicional: envuelve
 * children en un contenedor con overflow:hidden (necesario para que el
 * ripple no se salga de los bordes redondeados del botón) y conecta el
 * hook. Para botones que ya tienen su propia ref (como GlowButton), usar
 * useRipple() directamente en vez de este wrapper.
 */
export default function RippleContainer({ as: Tag = 'span', className = '', children, ...props }) {
  const { containerRef, onPointerDown } = useRipple();
  return (
    <Tag ref={containerRef} className={`ripple-container ${className}`} onPointerDown={onPointerDown} {...props}>
      {children}
    </Tag>
  );
}
