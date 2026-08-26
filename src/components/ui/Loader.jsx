import React from 'react';
import Icon from '../icons/Icon.jsx';

/**
 * Spinner inline — para usar DENTRO de un botón mientras una acción está
 * en curso (añadir al carrito, confirmar pago). El ícono `spinner` gira
 * vía la clase `.spin` definida en ui.css.
 */
export function InlineSpinner({ size = 16, className = '' }) {
  return <Icon name="spinner" size={size} className={`spin ${className}`} />;
}

/**
 * Botón que muestra su propio estado de carga. Encapsula el patrón
 * "deshabilitar + mostrar spinner + texto alternativo" para no repetirlo
 * a mano en cada sitio que dispara una acción async simulada.
 */
export function LoadingButton({ loading, loadingText, children, className = '', disabled, ...props }) {
  return (
    <button className={className} disabled={loading || disabled} aria-busy={loading} {...props}>
      {loading ? (
        <>
          <InlineSpinner size={15} />
          {loadingText && <span>{loadingText}</span>}
        </>
      ) : (
        children
      )}
    </button>
  );
}

/**
 * Overlay de pantalla completa con spinner grande — para transiciones
 * más largas (no se usa para "añadir al carrito", que es casi instantáneo
 * y solo necesita el spinner inline del botón; esto es para casos como
 * cambiar de sección con contenido pesado).
 */
export function FullScreenLoader({ label }) {
  return (
    <div className="fsloader" role="status" aria-live="polite">
      <InlineSpinner size={28} />
      {label && <span className="fsloader__label">{label}</span>}
    </div>
  );
}

/**
 * Silueta de una card mientras el catálogo "carga" — misma forma y
 * proporciones que ProductCard (banner + título + specs + footer) para
 * que el reemplazo por la card real no dé un salto de layout. Solo se
 * usa en el filtrado del buscador (ver App.jsx), donde simulamos una
 * breve latencia — no hay backend real que consultar.
 */
export function SkeletonCard({ featured = false }) {
  return (
    <div className={`card skeleton-card ${featured ? 'card--featured' : ''}`} aria-hidden="true">
      <div className="skeleton-block skeleton-card__banner" />
      <div className="skeleton-card__top">
        <div className="skeleton-block skeleton-card__tag" />
        <div className="skeleton-block skeleton-card__rating" />
      </div>
      <div className="skeleton-block skeleton-card__title" />
      <div className="skeleton-block skeleton-card__desc" />
      <div className="skeleton-block skeleton-card__desc skeleton-card__desc--short" />
      <div className="skeleton-card__footer">
        <div className="skeleton-block skeleton-card__price" />
        <div className="skeleton-block skeleton-card__btn" />
      </div>
    </div>
  );
}
