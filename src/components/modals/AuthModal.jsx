import React, { useState, useRef } from 'react';
import Icon from '../icons/Icon.jsx';
import { useShakeOnInvalid } from '../ui/useShakeOnInvalid.js';
import { useRipple } from '../ui/Ripple.jsx';

export default function AuthModal({ isOpen, onClose, tab, onTabChange, onLogin, t }) {
  const [loading, setLoading] = useState(false);
  const { formRef, onInvalidCapture } = useShakeOnInvalid();
  // Dos botones de submit distintos (login/registro), cada uno con su
  // propia capa de ripple — no comparten ref porque solo uno está
  // montado a la vez (según `tab`), pero cada uno necesita la suya.
  const loginRippleRef = useRef(null);
  const registerRippleRef = useRef(null);
  const { onPointerDown: rippleLogin } = useRipple(loginRippleRef);
  const { onPointerDown: rippleRegister } = useRipple(registerRippleRef);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    // No hay backend real (ver README) — el delay simula la latencia de
    // un login/registro de verdad en vez de resolver instantáneo, que es
    // justo el loading state que se pidió para los botones de la app.
    const form = e.target;
    setTimeout(() => {
      onLogin(form.name?.value || form.fullName?.value || 'Usuario');
      setLoading(false);
    }, 700);
  };

  return (
    <>
      <div className={`overlay ${isOpen ? 'is-open' : ''}`} onClick={onClose} />
      <div className={`modal modal--auth ${isOpen ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!isOpen}>
        <button className="modal__close" onClick={onClose} aria-label="Cerrar"><Icon name="close" size={20} /></button>
        <div className="tabs">
          <button className={`tabs__item ${tab === 'login' ? 'is-active' : ''}`} onClick={() => onTabChange('login')}>{t.auth.login}</button>
          <button className={`tabs__item ${tab === 'register' ? 'is-active' : ''}`} onClick={() => onTabChange('register')}>{t.auth.register}</button>
        </div>
        {tab === 'login' ? (
          <form ref={formRef} onInvalidCapture={onInvalidCapture} className="form" onSubmit={handleSubmit}>
            <label className="field">
              <span>{t.auth.email}</span>
              <input type="email" name="email" required placeholder="tu@correo.com" />
            </label>
            <label className="field">
              <span>{t.auth.password}</span>
              <input type="password" name="password" required placeholder="••••••••" />
            </label>
            <input type="hidden" name="name" value="" />
            <button className="btn btn--primary btn--block btn--loadable ripple-host" type="submit" disabled={loading} aria-busy={loading} onPointerDown={rippleLogin}>
              <span className="btn__ripplelayer" ref={loginRippleRef} aria-hidden="true" />
              <span className="btn__content">
                {loading ? <Icon name="spinner" size={15} className="spin" /> : t.auth.loginBtn}
              </span>
            </button>
          </form>
        ) : (
          <form ref={formRef} onInvalidCapture={onInvalidCapture} className="form" onSubmit={handleSubmit}>
            <label className="field">
              <span>{t.auth.name}</span>
              <input type="text" name="fullName" required placeholder="Tu nombre" />
            </label>
            <label className="field">
              <span>{t.auth.email}</span>
              <input type="email" required placeholder="tu@correo.com" />
            </label>
            <label className="field">
              <span>{t.auth.password}</span>
              <input type="password" required placeholder="••••••••" />
            </label>
            <label className="field">
              <span>{t.auth.confirmPassword}</span>
              <input type="password" required placeholder="••••••••" />
            </label>
            <button className="btn btn--primary btn--block btn--loadable ripple-host" type="submit" disabled={loading} aria-busy={loading} onPointerDown={rippleRegister}>
              <span className="btn__ripplelayer" ref={registerRippleRef} aria-hidden="true" />
              <span className="btn__content">
                {loading ? <Icon name="spinner" size={15} className="spin" /> : t.auth.registerBtn}
              </span>
            </button>
          </form>
        )}
      </div>
    </>
  );
}
