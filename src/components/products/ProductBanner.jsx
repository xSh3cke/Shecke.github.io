import React, { useId } from 'react';
import Icon from '../icons/Icon.jsx';
import { useParallax } from '../../hooks/useParallax.js';

/**
 * No hay assets de imagen reales para los productos (son scripts de
 * Roblox, no hay "foto del producto" que tenga sentido). En vez de un
 * placeholder gris genérico, generamos un banner con gradiente SVG único
 * por producto: dos ángulos derivados de `bannerSeed` (fijo en products.js,
 * así el gradiente no cambia entre renders) más el ícono de la categoría
 * como sello central. Se ve intencional, no como un placeholder olvidado.
 */

const CATEGORY_ICON = {
  ADMIN: 'shield',
  ECONOMÍA: 'coin',
  SEGURIDAD: 'lock',
  CHAT: 'globe',
  GAMEPLAY: 'zap',
  INVENTARIO: 'box',
  ESTADÍSTICAS: 'activity',
};

export default function ProductBanner({ product, size = 'md' }) {
  const gradId = useId();
  const [seedA, seedB] = product.bannerSeed;
  const angle = (seedA % 360);
  const icon = CATEGORY_ICON[product.tag] || 'box';
  const { ref: parallaxRef, offset } = useParallax(6);

  return (
    <div className={`pbanner pbanner--${size}`} aria-hidden="true" ref={parallaxRef}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 320 160"
        preserveAspectRatio="none"
        className="pbanner__svg"
        style={{ transform: `translateY(${offset}px) scale(1.08)` }}
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform={`rotate(${angle} 0.5 0.5)`}>
            <stop offset="0%" stopColor="var(--c-accent-deep)" />
            <stop offset="55%" stopColor="var(--c-bg-raise)" />
            <stop offset="100%" stopColor="var(--c-bg)" />
          </linearGradient>
        </defs>
        <rect width="320" height="160" fill={`url(#${gradId})`} />
        {/* líneas finas tipo "circuito" para reforzar la estética engineering-grade */}
        <line x1={seedB % 320} y1="0" x2={(seedB % 320) - 60} y2="160" stroke="var(--c-accent-bright)" strokeOpacity="0.14" strokeWidth="1" />
        <line x1={(seedB + 90) % 320} y1="0" x2={(seedB + 90) % 320 + 40} y2="160" stroke="var(--c-accent-bright)" strokeOpacity="0.08" strokeWidth="1" />
      </svg>
      <div className="pbanner__seal">
        <Icon name={icon} size={size === 'lg' ? 26 : 18} />
      </div>
    </div>
  );
}
