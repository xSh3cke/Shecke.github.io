import React from 'react';
import Icon from '../icons/Icon.jsx';

export default function CartDrawer({ isOpen, onClose, cart, onRemove, onCheckout, cartTotal, rate, priceFn, t }) {
  return (
    <>
      <div className={`overlay ${isOpen ? 'is-open' : ''}`} onClick={onClose} />
      <aside className={`drawer ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
        <div className="drawer__head">
          <h3>{t.cart.title}</h3>
          <button className="iconbtn" onClick={onClose} aria-label="Cerrar carrito"><Icon name="close" size={20} /></button>
        </div>
        <div className="drawer__body">
          {cart.length === 0 ? (
            <div className="drawer__empty">
              <Icon name="box" size={40} />
              <p>{t.cart.empty}</p>
              <span>{t.cart.emptySub}</span>
            </div>
          ) : (
            <ul className="cartlist">
              {cart.map((item) => (
                <li className="cartitem" key={item.id}>
                  <div className="cartitem__icon"><Icon name="box" size={18} /></div>
                  <div className="cartitem__info">
                    <span className="cartitem__name">{item.name}</span>
                    <span className="cartitem__meta">{rate.symbol}{priceFn(item.price)} × {item.qty}</span>
                  </div>
                  <button className="cartitem__remove" onClick={() => onRemove(item.id)} aria-label={`${t.cart.remove} ${item.name}`}>
                    <Icon name="trash" size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {cart.length > 0 && (
          <div className="drawer__foot">
            <div className="drawer__total">
              <span>{t.cart.total}</span>
              <span className="drawer__totalvalue">{rate.symbol}{(cartTotal * rate.rate).toFixed(2)}</span>
            </div>
            <button className="btn btn--primary btn--block" onClick={onCheckout}>{t.cart.checkout}</button>
            <button className="btn btn--text btn--block" onClick={onClose}>{t.cart.continue}</button>
          </div>
        )}
      </aside>
    </>
  );
}
