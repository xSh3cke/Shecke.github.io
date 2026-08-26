import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { ToastProvider } from './components/ui/Toast.jsx';
import { TRANSLATIONS } from './data/translations.js';
import { PRODUCTS } from './data/products.js';
import { EXCHANGE_RATES } from './data/currencies.js';

import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/hero/Hero.jsx';
import ProductCard from './components/products/ProductCard.jsx';
import FeaturedCarousel from './components/products/FeaturedCarousel.jsx';
import CartDrawer from './components/cart/CartDrawer.jsx';
import AuthModal from './components/modals/AuthModal.jsx';
import CheckoutModal from './components/modals/CheckoutModal.jsx';
import ProductInfoModal from './components/modals/ProductInfoModal.jsx';
import Icon from './components/icons/Icon.jsx';
import { SkeletonCard } from './components/ui/Loader.jsx';

function StoreApp() {
  // ---- Preferencias globales ----
  const [lang, setLang] = useState('es');
  const [currency, setCurrency] = useState('USD');

  // ---- Carrito ----
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // ---- Auth ----
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [user, setUser] = useState(null);

  // ---- Checkout ----
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('form'); // 'form' | 'success'
  const [payMethod, setPayMethod] = useState('stripe');

  // ---- Catálogo ----
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [infoProduct, setInfoProduct] = useState(null);

  // ---- Navegación / popovers (mutuamente excluyentes, ver Navbar.jsx) ----
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currOpen, setCurrOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // #15 — flash del eyebrow de "Catálogo" cuando se llega ahí por click
  // en el CTA del hero (no en cualquier scroll normal, solo navegación
  // explícita) — ver handleNavigateToShop.
  const [shopFlash, setShopFlash] = useState(false);

  const t = TRANSLATIONS[lang];
  const rate = EXCHANGE_RATES[currency];
  const priceFn = (p) => (p * rate.rate).toFixed(2);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bloquea el scroll del body mientras cualquier overlay está abierto —
  // incluye infoProduct porque ese modal también cubre la pantalla.
  useEffect(() => {
    const anyOpen = showCart || authOpen || checkoutOpen || mobileNavOpen || !!infoProduct;
    document.body.style.overflow = anyOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showCart, authOpen, checkoutOpen, mobileNavOpen, infoProduct]);

  // #1 — debounce del buscador: mientras el usuario teclea, no filtramos
  // en cada tecla; esperamos 250ms de silencio y mostramos un breve
  // "searching" (skeletons) antes de aplicar el filtro real. No hay
  // backend que consultar — es puramente para que el filtrado no se
  // sienta instantáneo/brusco cuando hay muchos productos.
  useEffect(() => {
    if (query === debouncedQuery) return;
    setSearching(true);
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
      setSearching(false);
    }, 250);
    return () => clearTimeout(timeout);
  }, [query, debouncedQuery]);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...product, qty: 1 }];
    });
  };
  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const featured = PRODUCTS.filter((p) => p.featured);
  const filtered = PRODUCTS.filter(
    (p) => p.name.toLowerCase().includes(debouncedQuery.toLowerCase()) || p.tag.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  const handleLoginSuccess = (name) => {
    setUser({ name });
    setAuthOpen(false);
  };

  const handleCheckoutConfirm = () => {
    setCheckoutStep('success');
  };

  const closeCheckout = () => {
    setCheckoutOpen(false);
    setTimeout(() => {
      setCheckoutStep((prevStep) => {
        if (prevStep === 'success') setCart([]);
        return 'form';
      });
    }, 300);
  };

  // #15 — dispara el flash del eyebrow de catálogo. El scroll suave ya
  // lo hace el navegador vía `scroll-behavior: smooth` (CSS) + el href
  //="#shop" normal del link; aquí solo programamos el flash para que
  // ocurra una vez que el scroll termine, no de inmediato.
  const handleNavigateToShop = (e) => {
    setTimeout(() => {
      setShopFlash(true);
      setTimeout(() => setShopFlash(false), 900);
    }, 500); // aproximado a la duración del scroll suave del navegador
  };

  return (
    <div className="app">
      <Navbar
        t={t}
        lang={lang}
        setLang={setLang}
        currency={currency}
        setCurrency={setCurrency}
        cartCount={cartCount}
        user={user}
        onLogout={() => { setUser(null); setCart([]); }}
        onOpenAuth={() => { setAuthTab('login'); setAuthOpen(true); }}
        scrolled={scrolled}
        scrollProgress={scrollProgress}
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
        onOpenCart={() => setShowCart(true)}
        langOpen={langOpen}
        setLangOpen={setLangOpen}
        currOpen={currOpen}
        setCurrOpen={setCurrOpen}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        themeOpen={themeOpen}
        setThemeOpen={setThemeOpen}
      />

      <main id="top">
        <Hero t={t} onNavigateToShop={handleNavigateToShop} />

        <section className="section" id="featured">
          <div className="section__head">
            <div>
              <span className="section__eyebrow">{t.shop.featured}</span>
              <h2 className="section__title">{t.shop.featured}</h2>
            </div>
          </div>
          <FeaturedCarousel
            products={featured}
            t={t}
            rate={rate}
            priceFn={priceFn}
            onAddToCart={addToCart}
            onShowInfo={setInfoProduct}
          />
        </section>

        <section className="section section--alt" id="shop">
          <div className="section__head">
            <div>
              <span className={`section__eyebrow ${shopFlash ? 'is-flashing' : ''}`}>CATÁLOGO</span>
              <h2 className="section__title">{t.shop.title}</h2>
              <p className="section__subtitle">{t.shop.subtitle}</p>
            </div>
            <div className="searchbox">
              <Icon name="search" size={17} />
              <input type="text" placeholder={t.shop.search} value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
          </div>

          {searching ? (
            <div className="grid grid--catalog">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <p className="empty-note">{t.shop.empty}</p>
          ) : (
            <div className="grid grid--catalog">
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  variant="catalog"
                  t={t}
                  rate={rate}
                  priceFn={priceFn}
                  onAddToCart={addToCart}
                  onShowInfo={setInfoProduct}
                  searchQuery={debouncedQuery}
                />
              ))}
            </div>
          )}
        </section>

        <section className="trust">
          <div className="trust__item"><Icon name="shield" size={18} /><span>Código auditado</span></div>
          <div className="trust__item"><Icon name="zap" size={18} /><span>Instalación en minutos</span></div>
          <div className="trust__item"><Icon name="layers" size={18} /><span>Actualizaciones incluidas</span></div>
          <div className="trust__item"><Icon name="lock" size={18} /><span>Pago 100% seguro</span></div>
        </section>
      </main>

      <Footer t={t} />

      <CartDrawer
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        cart={cart}
        onRemove={removeFromCart}
        onCheckout={() => { setShowCart(false); setCheckoutOpen(true); }}
        cartTotal={cartTotal}
        rate={rate}
        priceFn={priceFn}
        t={t}
      />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        tab={authTab}
        onTabChange={setAuthTab}
        onLogin={handleLoginSuccess}
        t={t}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        step={checkoutStep}
        onClose={closeCheckout}
        payMethod={payMethod}
        onPayMethodChange={setPayMethod}
        cartTotal={cartTotal}
        rate={rate}
        t={t}
        onConfirm={handleCheckoutConfirm}
      />

      <ProductInfoModal
        product={infoProduct}
        onClose={() => setInfoProduct(null)}
        onAddToCart={addToCart}
        rate={rate}
        priceFn={priceFn}
        t={t}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <StoreApp />
      </ToastProvider>
    </ThemeProvider>
  );
}
