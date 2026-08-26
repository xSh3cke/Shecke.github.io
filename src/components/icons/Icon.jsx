import React from 'react';

/**
 * Set de íconos inline SVG — sin dependencia externa (no lucide-react,
 * no react-icons). Cada ícono es un fragmento <>...</> de paths dentro
 * de un <svg> compartido, así el peso extra por ícono es solo el path.
 */
const ICON_PATHS = {
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 6 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-6-3.8-9s1.3-6.3 3.8-9z" /></>,
  coin: <><circle cx="12" cy="12" r="9" /><path d="M9.5 15.2c.5.6 1.4 1 2.5 1 1.7 0 3-1 3-2.2 0-3-5.7-1.5-5.7-4.4 0-1.2 1.3-2.2 3-2.2 1.1 0 2 .4 2.5 1M12 7v1.4M12 15.6V17" /></>,
  cart: <><circle cx="9" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" /></>,
  user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
  close: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
  check: <polyline points="20 6 9 17 4 12" />,
  star: <path d="M12 2l3.1 6.3 6.9 1-5 4.9L18.2 21 12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />,
  arrow: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
  trash: <><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>,
  menu: <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>,
  search: <><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.6" y2="16.6" /></>,
  shield: <path d="M12 2l8 3.5v6c0 5-3.4 8.4-8 10.5-4.6-2.1-8-5.5-8-10.5v-6z" />,
  zap: <polygon points="13 2 3 14 11 14 11 22 21 10 13 10 13 2" />,
  layers: <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>,
  card: <><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></>,
  lock: <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
  box: <><path d="M21 8l-9-5-9 5 9 5 9-5z" /><path d="M3 8v8l9 5 9-5V8" /><line x1="12" y1="13" x2="12" y2="21" /></>,
  info: <><circle cx="12" cy="12" r="9" /><line x1="12" y1="11" x2="12" y2="16" /><circle cx="12" cy="7.5" r="0.5" fill="currentColor" stroke="none" /></>,
  terminal2: <><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="6 9 10 12 6 15" /><line x1="12" y1="15" x2="16" y2="15" /></>,
  history: <><path d="M3 12a9 9 0 1 0 3-6.7" /><polyline points="3 4 3 9 8 9" /><path d="M12 8v4l3 2" /></>,
  palette: <><path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.4-.3-.4-.5-.9-.5-1.4 0-1.1.9-2 2-2h2.3A4.2 4.2 0 0 0 21.5 11 9.4 9.4 0 0 0 12 2z" /><circle cx="7.5" cy="10.5" r="1.1" fill="currentColor" stroke="none" /><circle cx="12" cy="7" r="1.1" fill="currentColor" stroke="none" /><circle cx="16.5" cy="10.5" r="1.1" fill="currentColor" stroke="none" /></>,
  activity: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
  chevronDown: <polyline points="6 9 12 15 18 9" />,
  spinner: <path d="M21 12a9 9 0 1 1-6.2-8.5" />,
};

export default function Icon({ name, size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {ICON_PATHS[name]}
    </svg>
  );
}
