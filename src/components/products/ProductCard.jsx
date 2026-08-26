import React, { useState, useRef } from 'react';
import Icon from '../icons/Icon.jsx';
import ProductBanner from './ProductBanner.jsx';
import AnimatedPrice from '../ui/AnimatedPrice.jsx';
import HighlightText from '../ui/HighlightText.jsx';
import { useRipple } from '../ui/Ripple.jsx';
import { useLiveInstalls, formatInstalls } from '../../hooks/useLiveInstalls.js';

/**
 * Una sola card cubre ambas variantes (antes eran dos bloques JSX casi
 * idénticos en el monolito). `variant="featured"` añade specs, banner
 * grande y botón primario; `variant="catalog"` es la versión compacta
 * con banner chico y botón outline.
 */
export default function ProductCard({ product, variant = 'catalog', t, rate, priceFn, onAddToCart, onShowInfo, searchQuery = '' }) {
  const { count, pulsing } = useLiveInstalls(product.installsBase);
  const [adding, setAdding] = useState(false);
  const isFeatured = variant === 'featured';
  // El ripple se ancla a un <span> dedicado (rippleLayerRef), NO al
  // <button> completo. El botón cambia su contenido interno en el mismo
  // tick que se dispara el ripple (adding: false -> true), y si el span
  // del ripple viviera como hijo directo del botón, React lo eliminaría
  // al reconciliar ese cambio de contenido antes de que llegue a
  // pintarse — el span.btn__ripplelayer de abajo nunca cambia entre
  // renders, así que React nunca lo toca y el ripple sobrevive.
  const rippleLayerRef = useRef(null);
  const { onPointerDown: rippleOnAdd } = useRipple(rippleLayerRef);

  const handleAdd = (e) => {
    rippleOnAdd(e);
    if (adding) return;
    setAdding(true);
    // Simula latencia de red — no hay backend real que confirmar, pero el
    // loading state es el que pediste y así se comporta como uno de verdad
    // en vez de ser instantáneo y sentirse "sin pulso".
    setTimeout(() => {
      onAddToCart(product);
      setAdding(false);
    }, 550);
  };

  return (
    <article className={`card ${isFeatured ? 'card--featured' : ''}`}>
      <ProductBanner product={product} size={isFeatured ? 'lg' : 'md'} />

      {product.tags && product.tags.length > 0 && (
        <div className="card__badges">
          {product.tags.map((tagKey) => (
            <span key={tagKey} className={`badge-pill badge-pill--${tagKey}`}>
              {t.tags[tagKey]}
            </span>
          ))}
        </div>
      )}

      <div className="card__top">
        <span className={`tag ${isFeatured ? '' : 'tag--outline'}`}>{product.tag}</span>
        <div className="card__topactions">
          <span className="rating"><Icon name="star" size={isFeatured ? 13 : 12} className="rating__icon" />{product.rating}</span>
          <button className="infobtn" onClick={() => onShowInfo(product)} aria-label={`${t.shop.viewDetails}: ${product.name}`}>
            <Icon name="info" size={isFeatured ? 15 : 14} />
          </button>
        </div>
      </div>

      <h3 className={`card__title ${isFeatured ? '' : 'card__title--sm'}`}>
        <HighlightText text={product.name} query={searchQuery} />
      </h3>
      <p className={`card__desc ${isFeatured ? '' : 'card__desc--clamp'}`}>{product.description}</p>

      {isFeatured && (
        <ul className="card__specs">
          {product.specs.map((s) => <li key={s}><Icon name="check" size={13} />{s}</li>)}
        </ul>
      )}

      <div className="card__footer">
        <div className="card__price">
          <AnimatedPrice
            value={parseFloat(priceFn(product.price))}
            symbol={rate.symbol}
            className={`card__amount ${isFeatured ? '' : 'card__amount--sm'}`}
          />
          <span className={`card__installs ${pulsing ? 'is-pulsing' : ''}`}>
            <Icon name="activity" size={11} className="card__installsicon" />
            {formatInstalls(count)} instalaciones
          </span>
        </div>
        <button
          className={`btn ripple-host ${isFeatured ? 'btn--primary btn--sm' : 'btn--outline btn--sm'} btn--loadable`}
          onPointerDown={handleAdd}
          disabled={adding}
          aria-busy={adding}
        >
          <span className="btn__ripplelayer" ref={rippleLayerRef} aria-hidden="true" />
          <span className="btn__content">
            {adding ? <Icon name="spinner" size={14} className="spin" /> : t.shop.addCart}
          </span>
        </button>
      </div>
    </article>
  );
}
