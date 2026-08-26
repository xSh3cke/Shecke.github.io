import React from 'react';

export default function Footer({ t }) {
  return (
    <footer className="footer" id="docs">
      <div className="footer__top">
        <div className="footer__brand">
          <div className="brand">
            <span className="brand__mark">Yx</span>
            <span className="brand__name">Store</span>
          </div>
          <p className="footer__tagline">{t.footer.tagline}</p>
        </div>
        <div className="footer__cols">
          <div className="footer__col">
            <h4>{t.footer.product}</h4>
            <a href="#shop">{t.nav.shop}</a>
            <a href="#featured">{t.shop.featured}</a>
            <a href="#docs">{t.nav.docs}</a>
          </div>
          <div className="footer__col" id="support">
            <h4>{t.footer.company}</h4>
            <a href="#top">{t.nav.support}</a>
            <a href="#top">Discord</a>
            <a href="#top">Contacto</a>
          </div>
          <div className="footer__col">
            <h4>{t.footer.legal}</h4>
            <a href="#top">Términos</a>
            <a href="#top">Privacidad</a>
            <a href="#top">Licencias</a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© 2025 Yx Store. {t.footer.rights}</span>
      </div>
    </footer>
  );
}
