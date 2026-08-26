/**
 * Tasas de conversión de moneda y etiquetas de idioma para los selectores del navbar.
 *
 * Las tasas están fijas en el código (no consultan ninguna API en vivo).
 * Si quieres tasas reales actualizadas, tendrías que consumir una API de
 * conversión de divisas y guardar el resultado en estado en vez de esta
 * constante — ver la nota equivalente en el README.
 */

export const EXCHANGE_RATES = {
  USD: { rate: 1, symbol: '$' }, EUR: { rate: 0.92, symbol: '€' }, GBP: { rate: 0.79, symbol: '£' },
  JPY: { rate: 149.5, symbol: '¥' }, CNY: { rate: 7.24, symbol: '¥' }, INR: { rate: 83.2, symbol: '₹' },
  AUD: { rate: 1.53, symbol: '$' }, CAD: { rate: 1.36, symbol: '$' }, CHF: { rate: 0.87, symbol: 'CHF' },
  MXN: { rate: 17.05, symbol: '$' }, BRL: { rate: 4.97, symbol: 'R$' }, SGD: { rate: 1.35, symbol: '$' }
};

export const LANGUAGE_LABELS = {
  es: 'Español', en: 'English', fr: 'Français', de: 'Deutsch', pt: 'Português',
  it: 'Italiano', ja: '日本語', zh: '中文', ko: '한국어', ru: 'Русский'
};
