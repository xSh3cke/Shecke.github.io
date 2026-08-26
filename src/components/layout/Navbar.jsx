import React, { useEffect, useRef, useState } from 'react';
import Icon from '../icons/Icon.jsx';
import ThemeSwitcher from '../modals/ThemeSwitcher.jsx';
import { useToast } from '../ui/Toast.jsx';
import { TRANSLATIONS } from '../../data/translations.js';
import { EXCHANGE_RATES, LANGUAGE_LABELS } from '../../data/currencies.js';

/**
 * Los 4 popovers (idioma, moneda, tema, usuario) deben cerrarse entre sí:
 * abrir uno cierra los otros tres. Esto es justo lo que faltaba para el
 * popover de usuario en la versión anterior — no tenía su propio estado
 * de apertura, así que "cerrar sesión" nunca se mostraba de forma
 * controlada (ver nota en App.jsx sobre el bug original).
 */
export default function Navbar({
  t, lang, setLang, currency, setCurrency, cartCount, user, onLogout, onOpenAuth,
  scrolled, scrollProgress, mobileNavOpen, setMobileNavOpen, onOpenCart,
  langOpen, setLangOpen, currOpen, setCurrOpen, userMenuOpen, setUserMenuOpen,
  themeOpen, setThemeOpen,
}) {
  const closeAllExcept = (keep) => {
    if (keep !== 'lang') setLangOpen(false);
    if (keep !== 'curr') setCurrOpen(false);
    if (keep !== 'user') setUserMenuOpen(false);
    if (keep !== 'theme') setThemeOpen(false);
  };

  const showToast = useToast();

  // #9 — el ícono del carrito "rebota" cada vez que cartCount SUBE (no en
  // cualquier cambio: si baja por quitar un ítem, no tiene sentido el bounce).
  const prevCartCount = useRef(cartCount);
  const [cartBouncing, setCartBouncing] = useState(false);
  useEffect(() => {
    if (cartCount > prevCartCount.current) {
      setCartBouncing(true);
      const timeout = setTimeout(() => setCartBouncing(false), 500);
      prevCartCount.current = cartCount;
      return () => clearTimeout(timeout);
    }
    prevCartCount.current = cartCount;
  }, [cartCount]);

  // #12 — toast de confirmación al cambiar de tema. ThemeSwitcher ya
  // conoce el tema elegido en el momento del click (ver su propio
  // onClose), así que envolvemos ese callback para además notificar.
  const handleThemeClose = (themeChangedTo) => {
    setThemeOpen(false);
    if (themeChangedTo) {
      showToast(`${t.theme.label}: ${t.theme[themeChangedTo]}`, { icon: 'palette' });
    }
  };

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      {/* #8 — barra de progreso de scroll, línea de 2px bajo el navbar */}
      <div className="scrollbar-progress" style={{ transform: `scaleX(${scrollProgress})` }} aria-hidden="true" />

      <div className="nav__inner">
        <a className="brand" href="#top" onClick={() => setMobileNavOpen(false)}>
          <span className="brand__mark">Yx</span>
          <span className="brand__name">Store</span>
        </a>

        <nav className="nav__links" aria-label="Navegación principal">
          <a href="#top" className="nav__link">{t.nav.home}</a>
          <a href="#shop" className="nav__link">{t.nav.shop}</a>
          <a href="#docs" className="nav__link">{t.nav.docs}</a>
          <a href="#support" className="nav__link">{t.nav.support}</a>
        </nav>

        <div className="nav__actions">
          {/* Idioma */}
          <div className="popover">
            <button className="iconbtn iconbtn--text" onClick={() => { setLangOpen(v => !v); closeAllExcept('lang'); }} aria-haspopup="listbox" aria-expanded={langOpen}>
              <Icon name="globe" size={17} />
              <span className="iconbtn__label">{lang.toUpperCase()}</span>
            </button>
            {langOpen && (
              <div className="popover__panel popover__panel--scroll" role="listbox">
                {Object.keys(TRANSLATIONS).map((code) => (
                  <button key={code} className={`popover__item ${code === lang ? 'is-active' : ''}`} onClick={() => { setLang(code); setLangOpen(false); }}>
                    <span className="popover__code">{code.toUpperCase()}</span>
                    <span>{LANGUAGE_LABELS[code]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Moneda */}
          <div className="popover">
            <button className="iconbtn iconbtn--text" onClick={() => { setCurrOpen(v => !v); closeAllExcept('curr'); }} aria-haspopup="listbox" aria-expanded={currOpen}>
              <Icon name="coin" size={17} />
              <span className="iconbtn__label">{currency}</span>
            </button>
            {currOpen && (
              <div className="popover__panel popover__panel--scroll" role="listbox">
                {Object.keys(EXCHANGE_RATES).map((code) => (
                  <button key={code} className={`popover__item ${code === currency ? 'is-active' : ''}`} onClick={() => { setCurrency(code); setCurrOpen(false); }}>
                    <span className="popover__code">{code}</span>
                    <span className="popover__mono">{EXCHANGE_RATES[code].symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tema — pestaña nueva, ahora con toast al confirmar */}
          <ThemeSwitcher
            isOpen={themeOpen}
            onToggle={() => { setThemeOpen((v) => !v); closeAllExcept('theme'); }}
            onClose={handleThemeClose}
            labels={t.theme}
          />

          {/* Carrito — #9 bounce al añadir */}
          <button className={`iconbtn ${cartBouncing ? 'is-bouncing' : ''}`} onClick={onOpenCart} aria-label="Abrir carrito">
            <Icon name="cart" size={19} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>

          {/* Sesión — el fix: el botón ahora sí controla su propio popover
              en vez de depender de nada implícito. Antes onClick solo
              cerraba los otros dos popovers y nunca abría el suyo, así
              que "cerrar sesión" nunca aparecía de forma predecible. */}
          {user ? (
            <div className="popover">
              <button
                className="iconbtn iconbtn--text iconbtn--user"
                onClick={() => { setUserMenuOpen((v) => !v); closeAllExcept('user'); }}
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
              >
                <span className="avatar">{user.name.charAt(0).toUpperCase()}</span>
                <span className="iconbtn__label">{user.name.split(' ')[0]}</span>
              </button>
              {userMenuOpen && (
                <div className="popover__panel popover__panel--right" role="menu">
                  <button className="popover__item popover__item--danger" onClick={() => { onLogout(); setUserMenuOpen(false); }}>{t.auth.logout}</button>
                </div>
              )}
            </div>
          ) : (
            <button className="btn btn--primary btn--sm nav__cta" onClick={onOpenAuth}>
              {t.auth.login}
            </button>
          )}

          {/* #13 — morph hamburguesa↔X vía 3 barras animadas en CSS, no
              un cambio instantáneo de ícono como antes. */}
          <button className={`menutoggle ${mobileNavOpen ? 'is-open' : ''}`} onClick={() => setMobileNavOpen((v) => !v)} aria-label="Abrir menú">
            <span className="menutoggle__bar" />
            <span className="menutoggle__bar" />
            <span className="menutoggle__bar" />
          </button>
        </div>
      </div>

      {mobileNavOpen && (
        <div className="mobilenav">
          <a href="#top" className="mobilenav__link" onClick={() => setMobileNavOpen(false)}>{t.nav.home}</a>
          <a href="#shop" className="mobilenav__link" onClick={() => setMobileNavOpen(false)}>{t.nav.shop}</a>
          <a href="#docs" className="mobilenav__link" onClick={() => setMobileNavOpen(false)}>{t.nav.docs}</a>
          <a href="#support" className="mobilenav__link" onClick={() => setMobileNavOpen(false)}>{t.nav.support}</a>
        </div>
      )}
    </header>
  );
}
