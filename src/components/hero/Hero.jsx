import React from 'react';
import Icon from '../icons/Icon.jsx';
import GlowButton from '../ui/GlowButton.jsx';
import TerminalPanel from './TerminalPanel.jsx';

export default function Hero({ t, onNavigateToShop }) {
  return (
    <section className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__grid">
        <div className="hero__copy">
          <span className="eyebrow"><span className="eyebrow__dot" />{t.hero.eyebrow}</span>
          <h1 className="hero__title">{t.hero.title.split('\n').map((line, i) => <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>)}</h1>
          <p className="hero__subtitle">{t.hero.subtitle}</p>
          <div className="hero__actions">
            <GlowButton as="a" href="#shop" className="btn btn--primary btn--lg" onClick={onNavigateToShop}>
              {t.hero.cta} <Icon name="arrow" size={17} />
            </GlowButton>
            <a href="#docs" className="btn btn--ghost btn--lg">{t.hero.secondary}</a>
          </div>
          <div className="hero__stats">
            <div className="stat">
              <span className="stat__value">128k+</span>
              <span className="stat__label">{t.hero.stat1}</span>
            </div>
            <div className="stat__divider" />
            <div className="stat">
              <span className="stat__value">4.9<Icon name="star" size={13} className="stat__star" /></span>
              <span className="stat__label">{t.hero.stat2}</span>
            </div>
            <div className="stat__divider" />
            <div className="stat">
              <span className="stat__value">24/7</span>
              <span className="stat__label">{t.hero.stat3}</span>
            </div>
          </div>
        </div>
        <div className="hero__visual">
          <TerminalPanel />
        </div>
      </div>
    </section>
  );
}
