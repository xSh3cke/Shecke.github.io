import React, { useState, useRef } from 'react';
import Icon from '../icons/Icon.jsx';
import AnimatedPrice from '../ui/AnimatedPrice.jsx';
import { useShakeOnInvalid } from '../ui/useShakeOnInvalid.js';
import { useRipple } from '../ui/Ripple.jsx';

/**
 * Solo Stripe y PayPal — bitcoin y apple pay se quitaron a pedido.
 * Las traducciones bitcoin/apple ya no existen en TRANSLATIONS
 * (ver data/translations.js), así que si en el futuro se quiere
 * reintroducir un método, hay que añadirlo ahí también, no solo aquí.
 */
const PAYMENT_METHODS = [
  { id: 'stripe', icon: 'card' },
  { id: 'paypal', icon: 'globe' },
];

export default function CheckoutModal({ isOpen, step, onClose, payMethod, onPayMethodChange, cartTotal, rate, t, onConfirm }) {
  const [loading, setLoading] = useState(false);
  const { formRef, onInvalidCapture } = useShakeOnInvalid();
  const confirmRippleRef = useRef(null);
  const { onPointerDown: rippleConfirm } = useRipple(confirmRippleRef);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    // Maqueta — no hay backend ni Stripe/PayPal reales conectados (ver
    // README, sección "Conectar pagos reales"). El delay simula la
    // confirmación del procesador en vez de resolver instantáneo.
    setTimeout(() => {
      onConfirm();
      setLoading(false);
    }, 900);
  };

  return (
    <>
      <div className={`overlay ${isOpen ? 'is-open' : ''}`} onClick={onClose} />
      <div className={`modal modal--checkout ${isOpen ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!isOpen}>
        <button className="modal__close" onClick={onClose} aria-label="Cerrar"><Icon name="close" size={20} /></button>

        {step === 'form' ? (
          <>
            <h3 className="modal__title">{t.checkout.title}</h3>

            <div className="checkout__section">
              <h4 className="checkout__label">{t.checkout.selectPayment}</h4>
              <div className="paymethods">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    type="button"
                    key={m.id}
                    className={`paymethod ${payMethod === m.id ? 'is-active' : ''}`}
                    onClick={() => onPayMethodChange(m.id)}
                  >
                    <Icon name={m.icon} size={18} />
                    <span>{t.checkout[m.id]}</span>
                  </button>
                ))}
              </div>
            </div>

            <form ref={formRef} onInvalidCapture={onInvalidCapture} className="checkout__section form" onSubmit={handleSubmit}>
              <h4 className="checkout__label">{t.checkout.billing}</h4>
              <label className="field">
                <span>{t.checkout.fullName}</span>
                <input type="text" required placeholder="Nombre y apellidos" />
              </label>
              <label className="field">
                <span>{t.checkout.email}</span>
                <input type="email" required placeholder="tu@correo.com" />
              </label>
              <label className="field">
                <span>{t.checkout.address}</span>
                <input type="text" required placeholder="Calle y número" />
              </label>
              <div className="field-row">
                <label className="field">
                  <span>{t.checkout.city}</span>
                  <input type="text" required />
                </label>
                <label className="field">
                  <span>{t.checkout.zip}</span>
                  <input type="text" required />
                </label>
              </div>

              <div className="checkout__total">
                <span>{t.cart.total}</span>
                <AnimatedPrice value={cartTotal * rate.rate} symbol={rate.symbol} className="checkout__totalvalue" />
              </div>
              <button className="btn btn--primary btn--block btn--lg btn--loadable ripple-host" type="submit" disabled={loading} aria-busy={loading} onPointerDown={rippleConfirm}>
                <span className="btn__ripplelayer" ref={confirmRippleRef} aria-hidden="true" />
                <span className="btn__content">
                  {loading ? <Icon name="spinner" size={16} className="spin" /> : <><Icon name="lock" size={16} /> {t.checkout.confirm}</>}
                </span>
              </button>
            </form>
          </>
        ) : (
          <div className="checkout__success">
            <div className="checkout__successicon"><Icon name="check" size={28} /></div>
            <h3>{t.checkout.success}</h3>
            <p>{t.checkout.successSub}</p>
            <button className="btn btn--primary" onClick={onClose}>{t.cart.continue}</button>
          </div>
        )}
      </div>
    </>
  );
}
