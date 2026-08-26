import React from 'react';
import Icon from '../icons/Icon.jsx';
import GlowButton from '../ui/GlowButton.jsx';
import { useLiveInstalls, formatInstalls } from '../../hooks/useLiveInstalls.js';

export default function ProductInfoModal({ product, onClose, onAddToCart, rate, priceFn, t }) {
  // El hook se llama incondicionalmente (regla de hooks de React) con un
  // fallback de 0 cuando no hay producto — el resultado no se usa en ese
  // caso porque el bloque de abajo no renderiza nada, pero evita el error
  // "hooks llamados condicionalmente" que saltaría si el hook estuviera
  // dentro del `{product && (...)}`de más abajo.
  const { count } = useLiveInstalls(product ? product.installsBase : 0);

  return (
    <>
      <div className={`overlay ${product ? 'is-open' : ''}`} onClick={onClose} />
      <div className={`modal modal--product ${product ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!product}>
        {product && (
          <>
            <button className="modal__close" onClick={onClose} aria-label={t.product.close}><Icon name="close" size={20} /></button>

            {product.tags && product.tags.length > 0 && (
              <div className="pinfo__badges">
                {product.tags.map((tagKey) => (
                  <span key={tagKey} className={`badge-pill badge-pill--${tagKey}`}>{t.tags[tagKey]}</span>
                ))}
              </div>
            )}

            <div className="pinfo__head">
              <span className="tag">{product.tag}</span>
              <span className="pinfo__version"><Icon name="terminal2" size={13} />{t.product.version} {product.version}</span>
            </div>
            <h3 className="pinfo__title">{product.name}</h3>
            <div className="pinfo__meta">
              <span className="rating"><Icon name="star" size={14} className="rating__icon" />{product.rating}</span>
              <span className="pinfo__dot" />
              <span>{formatInstalls(count)} instalaciones</span>
            </div>
            <p className="pinfo__desc">{product.description}</p>

            <div className="pinfo__section">
              <h4 className="checkout__label">{t.product.includes}</h4>
              <ul className="pinfo__list">
                {product.includes.map((item) => <li key={item}><Icon name="check" size={14} />{item}</li>)}
              </ul>
            </div>

            <div className="pinfo__section">
              <h4 className="checkout__label">{t.product.requirements}</h4>
              <ul className="pinfo__list pinfo__list--req">
                {product.requirements.map((item) => <li key={item}><Icon name="info" size={14} />{item}</li>)}
              </ul>
            </div>

            <div className="pinfo__section pinfo__section--last">
              <h4 className="checkout__label">{t.product.changelog}</h4>
              <ul className="pinfo__changelog">
                {product.changelog.map((entry) => (
                  <li key={entry.v}>
                    <span className="pinfo__changelogv">v{entry.v}</span>
                    <span className="pinfo__changelognote">{entry.note}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pinfo__footer">
              <div className="card__price">
                <span className="card__amount">{rate.symbol}{priceFn(product.price)}</span>
                <span className="card__installs">{formatInstalls(count)} instalaciones</span>
              </div>
              <GlowButton
                className="btn btn--primary btn--lg"
                onClick={() => { onAddToCart(product); onClose(); }}
              >
                {t.shop.addCart}
              </GlowButton>
            </div>
          </>
        )}
      </div>
    </>
  );
}
