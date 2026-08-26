import React, { useRef } from 'react';
import { useRipple } from './Ripple.jsx';

/**
 * Spotlight que sigue al cursor sobre botones primarios grandes, más
 * ripple al hacer click/tap (ver Ripple.jsx). Ambos comparten el mismo
 * nodo DOM vía `ref` — se lo pasamos a useRipple como externalRef para
 * no crear una segunda ref apuntando al mismo elemento.
 */
export default function GlowButton({ as: Tag = 'button', className = '', children, onPointerDown, ...props }) {
  const ref = useRef(null);
  const { onPointerDown: triggerRipple } = useRipple(ref);

  const handlePointerDown = (e) => {
    triggerRipple(e);
    onPointerDown?.(e);
  };
  const handleMove = (e) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--glow-x', `${e.clientX - rect.left}px`);
    node.style.setProperty('--glow-y', `${e.clientY - rect.top}px`);
  };
  return (
    <Tag ref={ref} className={`glowbtn ${className}`} onMouseMove={handleMove} onPointerDown={handlePointerDown} {...props}>
      <span className="glowbtn__shine" aria-hidden="true" />
      <span className="glowbtn__content">{children}</span>
    </Tag>
  );
}
