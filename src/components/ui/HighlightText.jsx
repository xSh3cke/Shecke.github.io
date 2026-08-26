import React from 'react';

/**
 * Envuelve la porción de `text` que coincide con `query` en un <mark>
 * estilizado. Si query está vacío o no hay coincidencia, devuelve el
 * texto sin cambios (sin <mark>, para no añadir markup innecesario).
 * Comparación case-insensitive pero conserva las mayúsculas originales
 * del texto al renderizar.
 */
export default function HighlightText({ text, query }) {
  if (!query || !query.trim()) return <>{text}</>;

  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return <>{text}</>;

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return (
    <>
      {before}
      <mark className="search-highlight">{match}</mark>
      {after}
    </>
  );
}
