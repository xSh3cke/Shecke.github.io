import React, { useState, useRef, useEffect } from 'react';

/**
 * Simula la salida de consola de un servidor Roblox inicializando los
 * sistemas Yx Store. Solo empieza a animar cuando el panel entra al
 * viewport (IntersectionObserver), así no se gasta la animación mientras
 * el usuario todavía no ha hecho scroll hasta el hero.
 *
 * Las líneas 'cmd' (comandos, como si el usuario los escribiera) se
 * animan carácter por carácter — más fiel a una terminal real que
 * aparecer de golpe. Las líneas 'ok'/'warn' (salida del sistema) sí
 * aparecen completas de una vez, porque una terminal no "teclea" su
 * propia respuesta, solo lo que el usuario escribe.
 */
export default function TerminalPanel() {
  const lines = [
    { t: 'cmd', text: 'require(YxAdmin):Init()' },
    { t: 'ok', text: 'Loaded 84 commands · 3.2ms' },
    { t: 'ok', text: 'DataStore connected · region us-east' },
    { t: 'cmd', text: 'YxEconomy.SetCurrency("Coins")' },
    { t: 'ok', text: 'Economy core ready · 0 conflicts' },
    { t: 'warn', text: 'AntiExploit: 2 flags auto-handled' },
    { t: 'ok', text: 'Server stable · 47 players' },
  ];
  const [visible, setVisible] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (visible >= lines.length) return;

    const currentLine = lines[visible];

    if (currentLine.t === 'cmd' && typedChars < currentLine.text.length) {
      // Tecleo carácter por carácter — 22ms por carácter se lee rápido
      // pero perceptible, sin sentirse lento en comandos largos.
      const t = setTimeout(() => setTypedChars((c) => c + 1), visible === 0 && typedChars === 0 ? 300 : 22);
      return () => clearTimeout(t);
    }

    // Línea completa (typing terminado, o no es tipo 'cmd'): pausa breve
    // antes de pasar a la siguiente, y reinicia el contador de tecleo.
    const t = setTimeout(() => {
      setVisible((v) => v + 1);
      setTypedChars(0);
    }, currentLine.t === 'cmd' ? 200 : 420);
    return () => clearTimeout(t);
  }, [visible, typedChars, started]);

  return (
    <div className="terminal" ref={ref} role="img" aria-label="Panel de terminal mostrando la inicialización de sistemas Yx Store">
      <div className="terminal__bar">
        <span className="terminal__dot terminal__dot--r" />
        <span className="terminal__dot terminal__dot--y" />
        <span className="terminal__dot terminal__dot--g" />
        <span className="terminal__title">server_output — yx-store</span>
      </div>
      <div className="terminal__body">
        {lines.slice(0, visible).map((l, i) => (
          <div className={`terminal__line terminal__line--${l.t}`} key={i}>
            <span className="terminal__prefix">{l.t === 'cmd' ? '❯' : l.t === 'ok' ? '✓' : '!'}</span>
            <span>{l.text}</span>
          </div>
        ))}
        {/* Línea actualmente en proceso de tecleo (si es tipo 'cmd' y no ha terminado) */}
        {started && visible < lines.length && lines[visible].t === 'cmd' && typedChars <= lines[visible].text.length && (
          <div className={`terminal__line terminal__line--cmd`}>
            <span className="terminal__prefix">❯</span>
            <span>{lines[visible].text.slice(0, typedChars)}</span>
            <span className="terminal__typecursor" />
          </div>
        )}
        {visible < lines.length && started && lines[visible].t !== 'cmd' && <span className="terminal__cursor" />}
      </div>
    </div>
  );
}
