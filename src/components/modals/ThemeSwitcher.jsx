import React from 'react';
import { useTheme, THEMES } from '../../context/ThemeContext.jsx';
import Icon from '../icons/Icon.jsx';

/**
 * Muestra de color por tema — no lee las custom properties de CSS
 * (para eso habría que instanciar el tema para leerlo, que es justo
 * lo que queremos evitar); son los mismos hex que ../../styles/tokens.css
 * declara para --c-accent-bright de cada [data-theme]. Si cambias un
 * tema en tokens.css, actualiza el swatch aquí también.
 */
const THEME_SWATCH = {
  crimson: '#e8324a',
  midnight: '#5b7ce8',
  emerald: '#2ec777',
};

export default function ThemeSwitcher({ isOpen, onToggle, onClose, labels }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="popover">
      <button
        className="iconbtn iconbtn--text"
        onClick={onToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={labels.label}
      >
        <span className="themeswatch" style={{ background: THEME_SWATCH[theme] }} aria-hidden="true" />
        <Icon name="palette" size={16} />
      </button>
      {isOpen && (
        <div className="popover__panel" role="listbox">
          {THEMES.map((id) => (
            <button
              key={id}
              className={`popover__item themeoption ${id === theme ? 'is-active' : ''}`}
              onClick={() => { const changed = id !== theme; setTheme(id); onClose(changed ? id : null); }}
              role="option"
              aria-selected={id === theme}
            >
              <span className="themeswatch themeswatch--lg" style={{ background: THEME_SWATCH[id] }} aria-hidden="true" />
              <span>{labels[id]}</span>
              {id === theme && <Icon name="check" size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
