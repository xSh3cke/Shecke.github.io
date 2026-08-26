/**
 * Catálogo de productos.
 *
 * `installsBase` es un número (no un string formateado como "18.4k") porque
 * el hook useLiveInstalls lo usa como punto de partida para animar un
 * contador que sube con el tiempo — ver la nota importante en ese hook
 * sobre qué significa "en vivo" aquí.
 *
 * `tags` es un array de 0 a 2 claves que deben existir en TRANSLATIONS[idioma].tags
 * (ver translations.js). Vacío está bien — no todos los productos necesitan etiqueta,
 * y si todos la tuvieran perderían la señal de "esto es especial".
 *
 * `bannerSeed` alimenta el gradiente único del banner visual de cada card
 * (ver ProductBanner.jsx) — dos números fijos por producto para que el
 * gradiente sea determinista y no cambie en cada render.
 */

export const PRODUCTS = [
  {
    id: 1, name: 'Admin System Pro', tag: 'ADMIN', price: 49.99, rating: 4.9,
    installsBase: 18400, version: '3.4.1', featured: true, tags: ['new', 'vip'],
    bannerSeed: [18, 210],
    description: 'Panel de administración completo con más de 80 comandos, jerarquía de rangos y registro de acciones.',
    specs: ['80+ comandos', 'Logs en tiempo real', 'Rangos personalizables'],
    includes: ['Código fuente completo (.rbxm + .lua)', 'Panel de administración con UI incluida', 'Sistema de rangos con herencia', 'Registro de acciones exportable a Discord', 'Documentación paso a paso'],
    requirements: ['Roblox Studio actualizado', 'DataStore habilitado en el juego', 'API Services activados'],
    changelog: [{ v: '3.4.1', note: 'Corrección de comando /freeze en servidores con +40 jugadores' }, { v: '3.4.0', note: 'Nuevo sistema de logs con filtro por jugador' }, { v: '3.3.0', note: 'Soporte para rangos personalizados por grupo' }]
  },
  {
    id: 2, name: 'Economy Core', tag: 'ECONOMÍA', price: 59.99, rating: 4.9,
    installsBase: 22100, version: '2.8.0', featured: true, tags: ['update'],
    bannerSeed: [142, 45],
    description: 'Motor de economía con tienda, trabajos, monedas múltiples e integración con DataStore.',
    specs: ['Multi-moneda', 'Tienda integrada', 'Anti-duplicación'],
    includes: ['Motor de economía modular', 'Tienda con interfaz lista para usar', 'Sistema de trabajos configurable', 'Protección anti-duplicación server-side', 'Panel de balance para administradores'],
    requirements: ['Roblox Studio actualizado', 'DataStore habilitado en el juego', 'MessagingService para sincronía multi-servidor'],
    changelog: [{ v: '2.8.0', note: 'Añadido soporte para hasta 5 monedas simultáneas' }, { v: '2.7.2', note: 'Mejora de rendimiento en guardado masivo' }, { v: '2.7.0', note: 'Nueva API pública para integrarse con otros sistemas' }]
  },
  {
    id: 3, name: 'Anti-Exploit Shield', tag: 'SEGURIDAD', price: 64.99, rating: 4.9,
    installsBase: 31600, version: '4.1.2', featured: true, tags: ['exclusive'],
    bannerSeed: [355, 120],
    description: 'Detección de exploits del lado del servidor con baneo automático y reportes en Discord.',
    specs: ['Detección server-side', 'Webhook a Discord', 'Cero falsos positivos'],
    includes: ['Motor de detección 100% server-side', 'Sistema de baneo automático configurable', 'Webhook a Discord con capturas de contexto', 'Panel de revisión de casos dudosos', 'Actualizaciones de firmas incluidas 12 meses'],
    requirements: ['Roblox Studio actualizado', 'HttpService activado para el webhook', 'Rango de administrador para el panel'],
    changelog: [{ v: '4.1.2', note: 'Nueva firma para exploits de teleport masivo' }, { v: '4.1.0', note: 'Reducción de falsos positivos en un 60%' }, { v: '4.0.0', note: 'Reescritura completa del motor de detección' }]
  },
  {
    id: 4, name: 'Chat Filter Ultra', tag: 'CHAT', price: 34.99, rating: 4.7,
    installsBase: 14200, version: '1.9.3', featured: false, tags: ['fix'],
    bannerSeed: [265, 300],
    description: 'Sistema de chat con filtrado avanzado, comandos de texto y burbujas personalizadas.',
    specs: ['Filtro configurable', 'Comandos por chat', 'Bubble chat propio'],
    includes: ['Sistema de chat con filtro configurable', 'Comandos activables por texto', 'Bubble chat con estilos personalizados', 'Lista de palabras editable', 'Documentación de integración'],
    requirements: ['Roblox Studio actualizado', 'TextService para el filtrado adicional'],
    changelog: [{ v: '1.9.3', note: 'Corrección de burbujas superpuestas en móvil' }, { v: '1.9.0', note: 'Nuevos estilos de burbuja incluidos' }]
  },
  {
    id: 5, name: 'Permission Manager', tag: 'SEGURIDAD', price: 39.99, rating: 4.8,
    installsBase: 9800, version: '2.2.0', featured: false, tags: [],
    bannerSeed: [88, 15],
    description: 'Gestión granular de permisos y roles con herencia jerárquica entre grupos.',
    specs: ['Roles anidados', 'Permisos por comando', 'Panel visual'],
    includes: ['Sistema de roles con herencia jerárquica', 'Permisos configurables por comando', 'Panel visual de asignación', 'Integración con grupos de Roblox', 'Documentación de la API interna'],
    requirements: ['Roblox Studio actualizado', 'Grupo de Roblox vinculado (opcional)'],
    changelog: [{ v: '2.2.0', note: 'Panel visual rediseñado' }, { v: '2.1.0', note: 'Soporte para permisos temporales' }]
  },
  {
    id: 6, name: 'Quest Engine', tag: 'GAMEPLAY', price: 54.99, rating: 4.6,
    installsBase: 7500, version: '1.6.1', featured: false, tags: ['offer'],
    bannerSeed: [200, 260],
    description: 'Motor de misiones con objetivos encadenados, recompensas dinámicas y seguimiento visual.',
    specs: ['Misiones encadenadas', 'Recompensas dinámicas', 'UI de seguimiento'],
    includes: ['Motor de misiones con objetivos encadenados', 'Sistema de recompensas dinámicas', 'UI de seguimiento en pantalla', 'Editor de misiones en Studio', 'Ejemplos de misiones preconfiguradas'],
    requirements: ['Roblox Studio actualizado', 'DataStore habilitado para progreso'],
    changelog: [{ v: '1.6.1', note: 'Corrección de progreso duplicado al reconectar' }, { v: '1.6.0', note: 'Editor visual de misiones añadido' }]
  },
  {
    id: 7, name: 'Inventory Framework', tag: 'INVENTARIO', price: 49.99, rating: 4.8,
    installsBase: 12900, version: '3.0.2', featured: false, tags: ['paid'],
    bannerSeed: [30, 320],
    description: 'Sistema de inventario modular con drag & drop, stacking y guardado persistente.',
    specs: ['Drag & drop', 'Stacking automático', 'Guardado persistente'],
    includes: ['Inventario modular con drag & drop', 'Stacking automático configurable', 'Guardado persistente vía DataStore', 'Interfaz lista para personalizar', 'Sistema de categorías de ítems'],
    requirements: ['Roblox Studio actualizado', 'DataStore habilitado en el juego'],
    changelog: [{ v: '3.0.2', note: 'Mejora de rendimiento con +200 ítems' }, { v: '3.0.0', note: 'Nueva UI con soporte para categorías' }]
  },
  {
    id: 8, name: 'Leaderboard Live', tag: 'ESTADÍSTICAS', price: 29.99, rating: 4.5,
    installsBase: 6300, version: '1.4.0', featured: false, tags: ['free'],
    bannerSeed: [175, 95],
    description: 'Tablas de clasificación en tiempo real con múltiples categorías y actualización automática.',
    specs: ['Tiempo real', 'Multi-categoría', 'Ligero en rendimiento'],
    includes: ['Tablas de clasificación en tiempo real', 'Soporte para múltiples categorías', 'Actualización automática sin recarga', 'Diseño ligero pensado para bajo consumo', 'Panel de configuración simple'],
    requirements: ['Roblox Studio actualizado', 'DataStore habilitado en el juego'],
    changelog: [{ v: '1.4.0', note: 'Añadido soporte multi-categoría' }, { v: '1.3.0', note: 'Reducción de uso de memoria en un 30%' }]
  },
  {
    id: 9, name: 'Moderation Suite', tag: 'SEGURIDAD', price: 44.99, rating: 4.8,
    installsBase: 11100, version: '2.5.0', featured: false, tags: ['update'],
    bannerSeed: [310, 200],
    description: 'Kit de moderación con kick, ban temporal, mute y historial completo de sanciones.',
    specs: ['Ban temporal', 'Historial completo', 'Panel de moderadores'],
    includes: ['Kit de moderación completo (kick/ban/mute)', 'Sistema de ban temporal con expiración', 'Historial de sanciones por jugador', 'Panel dedicado para moderadores', 'Registro exportable a Discord'],
    requirements: ['Roblox Studio actualizado', 'DataStore habilitado para el historial'],
    changelog: [{ v: '2.5.0', note: 'Nuevo panel de moderadores' }, { v: '2.4.0', note: 'Ban temporal con expiración automática' }]
  },
  {
    id: 10, name: 'Server Analytics', tag: 'ESTADÍSTICAS', price: 39.99, rating: 4.7,
    installsBase: 8200, version: '1.2.0', featured: true, tags: ['new'],
    bannerSeed: [95, 280],
    description: 'Panel de analíticas del servidor en tiempo real: jugadores, retención y rendimiento.',
    specs: ['Métricas en vivo', 'Exportación a CSV', 'Alertas configurables'],
    includes: ['Panel de analíticas con gráficas en vivo', 'Métricas de retención y sesión', 'Exportación de datos a CSV', 'Alertas configurables por umbral', 'Documentación de la API de eventos'],
    requirements: ['Roblox Studio actualizado', 'DataStore habilitado en el juego', 'MessagingService para agregación entre servidores'],
    changelog: [{ v: '1.2.0', note: 'Nuevas métricas de retención a 7 y 30 días' }, { v: '1.1.0', note: 'Exportación a CSV añadida' }, { v: '1.0.0', note: 'Lanzamiento inicial' }]
  }
];
