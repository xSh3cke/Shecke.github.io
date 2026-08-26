import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import Icon from '../icons/Icon.jsx';

const ToastContext = createContext(null);

/**
 * Cola de toasts simple. Cada uno se auto-elimina tras `duration` ms.
 * Se usa vía el hook useToast() desde cualquier componente hijo de
 * ToastProvider — no hace falta pasar props de toast por cada nivel.
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const showToast = useCallback((message, { icon = 'check', duration = 2200 } = {}) => {
    const id = idRef.current++;
    setToasts((prev) => [...prev, { id, message, icon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="toast-host" aria-live="polite">
        {toasts.map((t) => (
          <div className="toast" key={t.id}>
            <Icon name={t.icon} size={15} />
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast debe usarse dentro de <ToastProvider>');
  return ctx;
}
