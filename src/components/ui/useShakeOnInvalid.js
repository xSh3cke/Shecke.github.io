import { useRef, useCallback } from 'react';

/**
 * Los campos con `required` disparan el evento nativo `invalid` cuando
 * el navegador bloquea el submit por validación HTML5 — esto ocurre
 * ANTES de que React vea un onSubmit, así que no basta con manejar
 * onSubmit para detectar "faltó llenar algo". Este hook escucha
 * `invalid` a nivel del formulario (captura, porque `invalid` no
 * hace bubble) y aplica una clase de shake por 400ms.
 *
 * Devuelve las props para spread en el <form>: { ref, onInvalidCapture }.
 */
export function useShakeOnInvalid() {
  const formRef = useRef(null);

  const triggerShake = useCallback(() => {
    const node = formRef.current;
    if (!node) return;
    node.classList.remove('is-shaking');
    // Forzar reflow para poder re-disparar la animación si el usuario
    // falla la validación dos veces seguidas (si no se quita y re-pone
    // la clase en el mismo frame, la segunda vez no re-anima).
    void node.offsetWidth;
    node.classList.add('is-shaking');
    setTimeout(() => node.classList.remove('is-shaking'), 400);
  }, []);

  const onInvalidCapture = useCallback(() => {
    triggerShake();
  }, [triggerShake]);

  return { formRef, onInvalidCapture, triggerShake };
}
