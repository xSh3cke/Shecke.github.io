import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * 3 temas de color disponibles. El valor debe coincidir exactamente con
 * los selectores [data-theme='...'] definidos en ../styles/tokens.css.
 */
export const THEMES = ['crimson', 'midnight', 'emerald'];
const STORAGE_KEY = 'yx-store-theme';
const DEFAULT_THEME = 'crimson';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_THEME;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return THEMES.includes(saved) ? saved : DEFAULT_THEME;
  });

  // El cambio de tema es puramente CSS: React solo escribe el atributo
  // en <html>, la cascada de tokens.css hace el resto. Ningún componente
  // necesita re-renderizar para que los colores cambien.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme debe usarse dentro de <ThemeProvider>');
  return ctx;
}
