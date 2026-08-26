import React, { useState } from 'react';
import Icon from '../icons/Icon.jsx';
import ProductCard from './ProductCard.jsx';
import Reveal from '../ui/Reveal.jsx';

/**
 * Con 3 o menos destacados, este componente es solo un grid — no hay
 * desplegable porque no hay nada que ocultar. En cuanto hay un 4º
 * producto (o más), los primeros 3 se muestran siempre y el resto vive
 * detrás de un botón "ver más" para no acumular tarjetas sin fin en la
 * sección más prominente de la página.
 */
export default function FeaturedCarousel({ products, t, rate, priceFn, onAddToCart, onShowInfo }) {
  const [expanded, setExpanded] = useState(false);
  const visible = products.slice(0, 3);
  const hidden = products.slice(3);
  const hasMore = hidden.length > 0;

  return (
    <div className="featured-carousel">
      <div className="grid grid--featured">
        {visible.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            variant="featured"
            t={t}
            rate={rate}
            priceFn={priceFn}
            onAddToCart={onAddToCart}
            onShowInfo={onShowInfo}
          />
        ))}
      </div>

      {hasMore && (
        <>
          <div className={`featured-carousel__panel ${expanded ? 'is-expanded' : ''}`}>
            <div className="grid grid--featured featured-carousel__extra">
              {hidden.map((p, i) => (
                <Reveal key={p.id} delay={i * 80}>
                  <ProductCard
                    product={p}
                    variant="featured"
                    t={t}
                    rate={rate}
                    priceFn={priceFn}
                    onAddToCart={onAddToCart}
                    onShowInfo={onShowInfo}
                  />
                </Reveal>
              ))}
            </div>
          </div>

          <button
            className="featured-carousel__toggle"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            <span>{expanded ? t.shop.showLess : t.shop.showMore}</span>
            <Icon name="chevronDown" size={16} className={expanded ? 'is-flipped' : ''} />
          </button>
        </>
      )}
    </div>
  );
}
