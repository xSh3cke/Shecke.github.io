import React, { useState, useEffect, useRef } from 'react';
import './styles/index.css';

/* ============================================================
   YX STORE — Premium Roblox Systems
   Design signature: live terminal panel in hero, engineering-grade
   crimson/black system, Space Grotesk + Inter + JetBrains Mono.
   ============================================================ */

const TRANSLATIONS = {
  es: {
    nav: { home: 'Inicio', shop: 'Sistemas', docs: 'Documentación', support: 'Soporte' },
    auth: { login: 'Iniciar sesión', register: 'Crear cuenta', email: 'Correo electrónico', password: 'Contraseña', name: 'Nombre completo', confirmPassword: 'Confirmar contraseña', loginBtn: 'Entrar', registerBtn: 'Crear cuenta', logout: 'Cerrar sesión', or: 'o continuar con' },
    hero: {
      eyebrow: 'SISTEMAS PARA ROBLOX · PRODUCTION-READY',
      title: 'Scripts que tu juego\nya debería tener.',
      subtitle: 'Sistemas de administración, economía y seguridad probados en juegos con más de un millón de visitas. Instalación en un módulo, código legible, soporte real.',
      cta: 'Ver sistemas',
      secondary: 'Ver documentación',
      stat1: 'juegos activos',
      stat2: 'valoración media',
      stat3: 'soporte'
    },
    shop: { title: 'Catálogo completo', subtitle: 'Cada sistema incluye código fuente, documentación y actualizaciones.', search: 'Buscar un sistema…', addCart: 'Añadir al carrito', featured: 'Los más instalados', viewDetails: 'Ver detalles', empty: 'Sin resultados para tu búsqueda.' },
    cart: { title: 'Tu carrito', empty: 'Aún no has añadido ningún sistema.', emptySub: 'Explora el catálogo para empezar.', total: 'Total', checkout: 'Ir a pagar', continue: 'Seguir explorando', remove: 'Quitar' },
    checkout: { title: 'Pago seguro', selectPayment: 'Método de pago', stripe: 'Tarjeta', paypal: 'PayPal', bitcoin: 'Cripto', apple: 'Apple Pay', billing: 'Datos de facturación', fullName: 'Nombre completo', email: 'Correo electrónico', address: 'Dirección', city: 'Ciudad', zip: 'Código postal', confirm: 'Confirmar pago', success: 'Pago confirmado', successSub: 'Revisa tu correo para acceder a los archivos.' },
    footer: { tagline: 'Sistemas para Roblox, construidos por desarrolladores para desarrolladores.', product: 'Producto', company: 'Compañía', legal: 'Legal', rights: 'Todos los derechos reservados.' }
  },
  en: {
    nav: { home: 'Home', shop: 'Systems', docs: 'Docs', support: 'Support' },
    auth: { login: 'Sign in', register: 'Create account', email: 'Email address', password: 'Password', name: 'Full name', confirmPassword: 'Confirm password', loginBtn: 'Sign in', registerBtn: 'Create account', logout: 'Sign out', or: 'or continue with' },
    hero: {
      eyebrow: 'ROBLOX SYSTEMS · PRODUCTION-READY',
      title: 'Scripts your game\nshould already have.',
      subtitle: 'Admin, economy and security systems battle-tested in games with over a million visits. One-module install, readable code, real support.',
      cta: 'Browse systems',
      secondary: 'Read the docs',
      stat1: 'active games',
      stat2: 'average rating',
      stat3: 'support'
    },
    shop: { title: 'Full catalog', subtitle: 'Every system ships with source code, docs and updates.', search: 'Search a system…', addCart: 'Add to cart', featured: 'Most installed', viewDetails: 'View details', empty: 'No results for your search.' },
    cart: { title: 'Your cart', empty: "You haven't added any systems yet.", emptySub: 'Browse the catalog to get started.', total: 'Total', checkout: 'Go to checkout', continue: 'Keep browsing', remove: 'Remove' },
    checkout: { title: 'Secure checkout', selectPayment: 'Payment method', stripe: 'Card', paypal: 'PayPal', bitcoin: 'Crypto', apple: 'Apple Pay', billing: 'Billing details', fullName: 'Full name', email: 'Email address', address: 'Address', city: 'City', zip: 'ZIP code', confirm: 'Confirm payment', success: 'Payment confirmed', successSub: 'Check your email for file access.' },
    footer: { tagline: 'Roblox systems, built by developers for developers.', product: 'Product', company: 'Company', legal: 'Legal', rights: 'All rights reserved.' }
  },
  fr: {
    nav: { home: 'Accueil', shop: 'Systèmes', docs: 'Docs', support: 'Support' },
    auth: { login: 'Connexion', register: 'Créer un compte', email: 'Adresse e-mail', password: 'Mot de passe', name: 'Nom complet', confirmPassword: 'Confirmer le mot de passe', loginBtn: 'Connexion', registerBtn: 'Créer un compte', logout: 'Déconnexion', or: 'ou continuer avec' },
    hero: { eyebrow: 'SYSTÈMES ROBLOX · PRÊTS POUR LA PRODUCTION', title: 'Les scripts que votre jeu\nmérite déjà.', subtitle: "Systèmes d'administration, d'économie et de sécurité éprouvés sur des jeux à plus d'un million de visites.", cta: 'Voir les systèmes', secondary: 'Voir la documentation', stat1: 'jeux actifs', stat2: 'note moyenne', stat3: 'support' },
    shop: { title: 'Catalogue complet', subtitle: 'Chaque système inclut le code source, la doc et les mises à jour.', search: 'Rechercher un système…', addCart: 'Ajouter au panier', featured: 'Les plus installés', viewDetails: 'Voir détails', empty: 'Aucun résultat.' },
    cart: { title: 'Votre panier', empty: "Vous n'avez pas encore ajouté de système.", emptySub: 'Explorez le catalogue pour commencer.', total: 'Total', checkout: 'Passer au paiement', continue: 'Continuer', remove: 'Retirer' },
    checkout: { title: 'Paiement sécurisé', selectPayment: 'Méthode de paiement', stripe: 'Carte', paypal: 'PayPal', bitcoin: 'Crypto', apple: 'Apple Pay', billing: 'Détails de facturation', fullName: 'Nom complet', email: 'E-mail', address: 'Adresse', city: 'Ville', zip: 'Code postal', confirm: 'Confirmer le paiement', success: 'Paiement confirmé', successSub: 'Vérifiez votre e-mail pour accéder aux fichiers.' },
    footer: { tagline: 'Systèmes Roblox, conçus par des développeurs.', product: 'Produit', company: 'Entreprise', legal: 'Légal', rights: 'Tous droits réservés.' }
  },
  de: {
    nav: { home: 'Start', shop: 'Systeme', docs: 'Docs', support: 'Support' },
    auth: { login: 'Anmelden', register: 'Konto erstellen', email: 'E-Mail-Adresse', password: 'Passwort', name: 'Vollständiger Name', confirmPassword: 'Passwort bestätigen', loginBtn: 'Anmelden', registerBtn: 'Konto erstellen', logout: 'Abmelden', or: 'oder weiter mit' },
    hero: { eyebrow: 'ROBLOX-SYSTEME · PRODUKTIONSREIF', title: 'Scripts, die dein Spiel\nverdient hat.', subtitle: 'Admin-, Wirtschafts- und Sicherheitssysteme, erprobt in Spielen mit über einer Million Besuchen.', cta: 'Systeme ansehen', secondary: 'Dokumentation', stat1: 'aktive Spiele', stat2: 'Ø Bewertung', stat3: 'Support' },
    shop: { title: 'Vollständiger Katalog', subtitle: 'Jedes System enthält Quellcode, Doku und Updates.', search: 'System suchen…', addCart: 'In den Warenkorb', featured: 'Meistinstalliert', viewDetails: 'Details ansehen', empty: 'Keine Ergebnisse.' },
    cart: { title: 'Warenkorb', empty: 'Noch keine Systeme hinzugefügt.', emptySub: 'Stöbere im Katalog.', total: 'Gesamt', checkout: 'Zur Kasse', continue: 'Weiter stöbern', remove: 'Entfernen' },
    checkout: { title: 'Sichere Kasse', selectPayment: 'Zahlungsmethode', stripe: 'Karte', paypal: 'PayPal', bitcoin: 'Krypto', apple: 'Apple Pay', billing: 'Rechnungsdaten', fullName: 'Vollständiger Name', email: 'E-Mail', address: 'Adresse', city: 'Stadt', zip: 'PLZ', confirm: 'Zahlung bestätigen', success: 'Zahlung bestätigt', successSub: 'Prüfe deine E-Mail für den Dateizugriff.' },
    footer: { tagline: 'Roblox-Systeme, von Entwicklern für Entwickler.', product: 'Produkt', company: 'Unternehmen', legal: 'Rechtliches', rights: 'Alle Rechte vorbehalten.' }
  },
  pt: {
    nav: { home: 'Início', shop: 'Sistemas', docs: 'Docs', support: 'Suporte' },
    auth: { login: 'Entrar', register: 'Criar conta', email: 'E-mail', password: 'Senha', name: 'Nome completo', confirmPassword: 'Confirmar senha', loginBtn: 'Entrar', registerBtn: 'Criar conta', logout: 'Sair', or: 'ou continue com' },
    hero: { eyebrow: 'SISTEMAS PARA ROBLOX · PRONTOS PARA PRODUÇÃO', title: 'Scripts que o seu jogo\njá merecia ter.', subtitle: 'Sistemas de admin, economia e segurança testados em jogos com mais de um milhão de visitas.', cta: 'Ver sistemas', secondary: 'Ver documentação', stat1: 'jogos ativos', stat2: 'avaliação média', stat3: 'suporte' },
    shop: { title: 'Catálogo completo', subtitle: 'Cada sistema inclui código-fonte, docs e atualizações.', search: 'Buscar um sistema…', addCart: 'Adicionar ao carrinho', featured: 'Mais instalados', viewDetails: 'Ver detalhes', empty: 'Nenhum resultado.' },
    cart: { title: 'Seu carrinho', empty: 'Você ainda não adicionou nenhum sistema.', emptySub: 'Explore o catálogo para começar.', total: 'Total', checkout: 'Ir para pagamento', continue: 'Continuar explorando', remove: 'Remover' },
    checkout: { title: 'Pagamento seguro', selectPayment: 'Método de pagamento', stripe: 'Cartão', paypal: 'PayPal', bitcoin: 'Cripto', apple: 'Apple Pay', billing: 'Dados de cobrança', fullName: 'Nome completo', email: 'E-mail', address: 'Endereço', city: 'Cidade', zip: 'CEP', confirm: 'Confirmar pagamento', success: 'Pagamento confirmado', successSub: 'Verifique seu e-mail para acessar os arquivos.' },
    footer: { tagline: 'Sistemas para Roblox, feitos por desenvolvedores.', product: 'Produto', company: 'Empresa', legal: 'Legal', rights: 'Todos os direitos reservados.' }
  },
  it: {
    nav: { home: 'Home', shop: 'Sistemi', docs: 'Docs', support: 'Supporto' },
    auth: { login: 'Accedi', register: 'Crea account', email: 'Indirizzo email', password: 'Password', name: 'Nome completo', confirmPassword: 'Conferma password', loginBtn: 'Accedi', registerBtn: 'Crea account', logout: 'Esci', or: 'oppure continua con' },
    hero: { eyebrow: 'SISTEMI ROBLOX · PRONTI ALLA PRODUZIONE', title: 'Gli script che il tuo gioco\nmerita già.', subtitle: 'Sistemi di admin, economia e sicurezza testati su giochi con oltre un milione di visite.', cta: 'Vedi i sistemi', secondary: 'Vedi la documentazione', stat1: 'giochi attivi', stat2: 'voto medio', stat3: 'supporto' },
    shop: { title: 'Catalogo completo', subtitle: 'Ogni sistema include codice sorgente, doc e aggiornamenti.', search: 'Cerca un sistema…', addCart: 'Aggiungi al carrello', featured: 'Più installati', viewDetails: 'Vedi dettagli', empty: 'Nessun risultato.' },
    cart: { title: 'Il tuo carrello', empty: 'Non hai ancora aggiunto sistemi.', emptySub: 'Esplora il catalogo per iniziare.', total: 'Totale', checkout: 'Vai al pagamento', continue: 'Continua a esplorare', remove: 'Rimuovi' },
    checkout: { title: 'Pagamento sicuro', selectPayment: 'Metodo di pagamento', stripe: 'Carta', paypal: 'PayPal', bitcoin: 'Crypto', apple: 'Apple Pay', billing: 'Dati di fatturazione', fullName: 'Nome completo', email: 'Email', address: 'Indirizzo', city: 'Città', zip: 'CAP', confirm: 'Conferma pagamento', success: 'Pagamento confermato', successSub: "Controlla l'email per accedere ai file." },
    footer: { tagline: 'Sistemi Roblox, creati da sviluppatori.', product: 'Prodotto', company: 'Azienda', legal: 'Legale', rights: 'Tutti i diritti riservati.' }
  },
  ja: {
    nav: { home: 'ホーム', shop: 'システム', docs: 'ドキュメント', support: 'サポート' },
    auth: { login: 'ログイン', register: 'アカウント作成', email: 'メールアドレス', password: 'パスワード', name: '氏名', confirmPassword: 'パスワード確認', loginBtn: 'ログイン', registerBtn: 'アカウント作成', logout: 'ログアウト', or: 'または次で続行' },
    hero: { eyebrow: 'ROBLOXシステム · 本番対応', title: 'あなたのゲームに\n必要なスクリプト。', subtitle: '100万訪問超のゲームで実証済みの管理・経済・セキュリティシステム。', cta: 'システムを見る', secondary: 'ドキュメントを見る', stat1: '稼働中のゲーム', stat2: '平均評価', stat3: 'サポート' },
    shop: { title: '全カタログ', subtitle: '全システムにソースコード・ドキュメント・アップデートが含まれます。', search: 'システムを検索…', addCart: 'カートに追加', featured: '人気システム', viewDetails: '詳細を見る', empty: '結果がありません。' },
    cart: { title: 'カート', empty: 'まだシステムが追加されていません。', emptySub: 'カタログを見てみましょう。', total: '合計', checkout: '購入手続きへ', continue: '見続ける', remove: '削除' },
    checkout: { title: '安全な決済', selectPayment: '支払い方法', stripe: 'カード', paypal: 'PayPal', bitcoin: '暗号資産', apple: 'Apple Pay', billing: '請求先情報', fullName: '氏名', email: 'メール', address: '住所', city: '市区町村', zip: '郵便番号', confirm: '支払いを確認', success: '支払いが完了しました', successSub: 'メールでファイルにアクセスしてください。' },
    footer: { tagline: '開発者による、開発者のためのRobloxシステム。', product: '製品', company: '会社', legal: '法的情報', rights: '全著作権所有。' }
  },
  zh: {
    nav: { home: '首页', shop: '系统', docs: '文档', support: '支持' },
    auth: { login: '登录', register: '创建账户', email: '电子邮箱', password: '密码', name: '姓名', confirmPassword: '确认密码', loginBtn: '登录', registerBtn: '创建账户', logout: '退出', or: '或继续使用' },
    hero: { eyebrow: 'ROBLOX 系统 · 生产就绪', title: '你的游戏早该拥有的\n脚本。', subtitle: '在超过百万访问量的游戏中经过实战检验的管理、经济与安全系统。', cta: '浏览系统', secondary: '查看文档', stat1: '活跃游戏', stat2: '平均评分', stat3: '支持' },
    shop: { title: '完整目录', subtitle: '每个系统均含源代码、文档与更新。', search: '搜索系统…', addCart: '加入购物车', featured: '最受欢迎', viewDetails: '查看详情', empty: '没有找到结果。' },
    cart: { title: '购物车', empty: '你还没有添加任何系统。', emptySub: '浏览目录开始吧。', total: '总计', checkout: '去结账', continue: '继续浏览', remove: '移除' },
    checkout: { title: '安全结账', selectPayment: '支付方式', stripe: '银行卡', paypal: 'PayPal', bitcoin: '加密货币', apple: 'Apple Pay', billing: '账单信息', fullName: '姓名', email: '邮箱', address: '地址', city: '城市', zip: '邮编', confirm: '确认支付', success: '支付已确认', successSub: '请查收邮件以获取文件访问权限。' },
    footer: { tagline: '由开发者打造的 Roblox 系统。', product: '产品', company: '公司', legal: '法律', rights: '版权所有。' }
  },
  ko: {
    nav: { home: '홈', shop: '시스템', docs: '문서', support: '지원' },
    auth: { login: '로그인', register: '계정 만들기', email: '이메일 주소', password: '비밀번호', name: '이름', confirmPassword: '비밀번호 확인', loginBtn: '로그인', registerBtn: '계정 만들기', logout: '로그아웃', or: '또는 다음으로 계속' },
    hero: { eyebrow: 'ROBLOX 시스템 · 프로덕션 준비 완료', title: '당신의 게임에 필요한\n스크립트.', subtitle: '백만 방문 이상의 게임에서 검증된 관리·경제·보안 시스템.', cta: '시스템 보기', secondary: '문서 보기', stat1: '활성 게임', stat2: '평균 평점', stat3: '지원' },
    shop: { title: '전체 카탈로그', subtitle: '모든 시스템에는 소스 코드, 문서, 업데이트가 포함됩니다.', search: '시스템 검색…', addCart: '장바구니에 추가', featured: '최다 설치', viewDetails: '상세 보기', empty: '결과가 없습니다.' },
    cart: { title: '장바구니', empty: '아직 추가된 시스템이 없습니다.', emptySub: '카탈로그를 둘러보세요.', total: '합계', checkout: '결제하기', continue: '계속 둘러보기', remove: '제거' },
    checkout: { title: '안전한 결제', selectPayment: '결제 수단', stripe: '카드', paypal: 'PayPal', bitcoin: '암호화폐', apple: 'Apple Pay', billing: '청구 정보', fullName: '이름', email: '이메일', address: '주소', city: '도시', zip: '우편번호', confirm: '결제 확인', success: '결제가 확인되었습니다', successSub: '이메일에서 파일 접근 권한을 확인하세요.' },
    footer: { tagline: '개발자가 개발자를 위해 만든 Roblox 시스템.', product: '제품', company: '회사', legal: '법적 고지', rights: '모든 권리 보유.' }
  },
  ru: {
    nav: { home: 'Главная', shop: 'Системы', docs: 'Документы', support: 'Поддержка' },
    auth: { login: 'Войти', register: 'Создать аккаунт', email: 'Электронная почта', password: 'Пароль', name: 'Полное имя', confirmPassword: 'Подтвердите пароль', loginBtn: 'Войти', registerBtn: 'Создать аккаунт', logout: 'Выйти', or: 'или продолжить с' },
    hero: { eyebrow: 'СИСТЕМЫ ДЛЯ ROBLOX · ГОТОВЫ К РАБОТЕ', title: 'Скрипты, которые давно\nнужны вашей игре.', subtitle: 'Системы администрирования, экономики и безопасности, проверенные в играх с более чем миллионом посещений.', cta: 'Смотреть системы', secondary: 'Документация', stat1: 'активных игр', stat2: 'средний рейтинг', stat3: 'поддержка' },
    shop: { title: 'Полный каталог', subtitle: 'Каждая система включает исходный код, документацию и обновления.', search: 'Поиск системы…', addCart: 'В корзину', featured: 'Самые популярные', viewDetails: 'Подробнее', empty: 'Ничего не найдено.' },
    cart: { title: 'Корзина', empty: 'Вы ещё не добавили ни одной системы.', emptySub: 'Посмотрите каталог, чтобы начать.', total: 'Итого', checkout: 'Оформить заказ', continue: 'Продолжить покупки', remove: 'Удалить' },
    checkout: { title: 'Безопасная оплата', selectPayment: 'Способ оплаты', stripe: 'Карта', paypal: 'PayPal', bitcoin: 'Крипто', apple: 'Apple Pay', billing: 'Платёжные данные', fullName: 'Полное имя', email: 'Email', address: 'Адрес', city: 'Город', zip: 'Индекс', confirm: 'Подтвердить оплату', success: 'Оплата подтверждена', successSub: 'Проверьте почту для доступа к файлам.' },
    footer: { tagline: 'Системы для Roblox, созданные разработчиками.', product: 'Продукт', company: 'Компания', legal: 'Правовая информация', rights: 'Все права защищены.' }
  }
};

const EXCHANGE_RATES = {
  USD: { rate: 1, symbol: '$' }, EUR: { rate: 0.92, symbol: '€' }, GBP: { rate: 0.79, symbol: '£' },
  JPY: { rate: 149.5, symbol: '¥' }, CNY: { rate: 7.24, symbol: '¥' }, INR: { rate: 83.2, symbol: '₹' },
  AUD: { rate: 1.53, symbol: '$' }, CAD: { rate: 1.36, symbol: '$' }, CHF: { rate: 0.87, symbol: 'CHF' },
  MXN: { rate: 17.05, symbol: '$' }, BRL: { rate: 4.97, symbol: 'R$' }, SGD: { rate: 1.35, symbol: '$' }
};

const LANGUAGE_LABELS = { es: 'Español', en: 'English', fr: 'Français', de: 'Deutsch', pt: 'Português', it: 'Italiano', ja: '日本語', zh: '中文', ko: '한국어', ru: 'Русский' };

const PRODUCTS = [
  { id: 1, name: 'Admin System Pro', tag: 'ADMIN', price: 49.99, rating: 4.9, installs: '18.4k', featured: true, description: 'Panel de administración completo con más de 80 comandos, jerarquía de rangos y registro de acciones.', specs: ['80+ comandos', 'Logs en tiempo real', 'Rangos personalizables'] },
  { id: 2, name: 'Economy Core', tag: 'ECONOMÍA', price: 59.99, rating: 4.9, installs: '22.1k', featured: true, description: 'Motor de economía con tienda, trabajos, monedas múltiples e integración con DataStore.', specs: ['Multi-moneda', 'Tienda integrada', 'Anti-duplicación'] },
  { id: 3, name: 'Anti-Exploit Shield', tag: 'SEGURIDAD', price: 64.99, rating: 4.9, installs: '31.6k', featured: true, description: 'Detección de exploits del lado del servidor con baneo automático y reportes en Discord.', specs: ['Detección server-side', 'Webhook a Discord', 'Cero falsos positivos'] },
  { id: 4, name: 'Chat Filter Ultra', tag: 'CHAT', price: 34.99, rating: 4.7, installs: '14.2k', featured: false, description: 'Sistema de chat con filtrado avanzado, comandos de texto y burbujas personalizadas.', specs: ['Filtro configurable', 'Comandos por chat', 'Bubble chat propio'] },
  { id: 5, name: 'Permission Manager', tag: 'SEGURIDAD', price: 39.99, rating: 4.8, installs: '9.8k', featured: false, description: 'Gestión granular de permisos y roles con herencia jerárquica entre grupos.', specs: ['Roles anidados', 'Permisos por comando', 'Panel visual'] },
  { id: 6, name: 'Quest Engine', tag: 'GAMEPLAY', price: 54.99, rating: 4.6, installs: '7.5k', featured: false, description: 'Motor de misiones con objetivos encadenados, recompensas dinámicas y seguimiento visual.', specs: ['Misiones encadenadas', 'Recompensas dinámicas', 'UI de seguimiento'] },
  { id: 7, name: 'Inventory Framework', tag: 'INVENTARIO', price: 49.99, rating: 4.8, installs: '12.9k', featured: false, description: 'Sistema de inventario modular con drag & drop, stacking y guardado persistente.', specs: ['Drag & drop', 'Stacking automático', 'Guardado persistente'] },
  { id: 8, name: 'Leaderboard Live', tag: 'ESTADÍSTICAS', price: 29.99, rating: 4.5, installs: '6.3k', featured: false, description: 'Tablas de clasificación en tiempo real con múltiples categorías y actualización automática.', specs: ['Tiempo real', 'Multi-categoría', 'Ligero en rendimiento'] },
  { id: 9, name: 'Moderation Suite', tag: 'SEGURIDAD', price: 44.99, rating: 4.8, installs: '11.1k', featured: false, description: 'Kit de moderación con kick, ban temporal, mute y historial completo de sanciones.', specs: ['Ban temporal', 'Historial completo', 'Panel de moderadores'] }
];

/* ---------- Icons (inline SVG, no external deps) ---------- */
const Icon = ({ name, size = 20, className = '' }) => {
  const paths = {
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
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {paths[name]}
    </svg>
  );
};

/* ---------- Terminal hero signature ---------- */
const TerminalPanel = () => {
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
    const t = setTimeout(() => setVisible(v => v + 1), visible === 0 ? 300 : 420);
    return () => clearTimeout(t);
  }, [visible, started]);

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
        {visible < lines.length && started && <span className="terminal__cursor" />}
      </div>
    </div>
  );
};

/* ---------- Main App ---------- */
export default function YxStore() {
  const [lang, setLang] = useState('es');
  const [currency, setCurrency] = useState('USD');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('form'); // form | success
  const [payMethod, setPayMethod] = useState('stripe');
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currOpen, setCurrOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = TRANSLATIONS[lang];
  const rate = EXCHANGE_RATES[currency];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock body scroll for overlays
  useEffect(() => {
    const anyOpen = showCart || authOpen || checkoutOpen || mobileNavOpen;
    document.body.style.overflow = anyOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showCart, authOpen, checkoutOpen, mobileNavOpen]);

  const price = (p) => (p * rate.rate).toFixed(2);

  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(i => i.id === product.id);
      if (found) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const featured = PRODUCTS.filter(p => p.featured);
  const filtered = PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.tag.toLowerCase().includes(query.toLowerCase()));

  const handleLogin = (e) => {
    e.preventDefault();
    setUser({ name: e.target.name?.value || e.target.fullName?.value || 'Usuario' });
    setAuthOpen(false);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setCheckoutStep('success');
  };

  const closeCheckout = () => {
    setCheckoutOpen(false);
    setTimeout(() => { setCheckoutStep('form'); if (checkoutStep === 'success') { setCart([]); } }, 300);
  };

  return (
    <div className="app">
      {/* ================= NAVBAR ================= */}
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <a className="brand" href="#top" onClick={() => setMobileNavOpen(false)}>
            <span className="brand__mark">Yx</span>
            <span className="brand__name">Store</span>
          </a>

          <nav className="nav__links" aria-label="Navegación principal">
            <a href="#top" className="nav__link">{t.nav.home}</a>
            <a href="#shop" className="nav__link">{t.nav.shop}</a>
            <a href="#docs" className="nav__link">{t.nav.docs}</a>
            <a href="#support" className="nav__link">{t.nav.support}</a>
          </nav>

          <div className="nav__actions">
            {/* Language */}
            <div className="popover">
              <button className="iconbtn iconbtn--text" onClick={() => { setLangOpen(v => !v); setCurrOpen(false); }} aria-haspopup="listbox" aria-expanded={langOpen}>
                <Icon name="globe" size={17} />
                <span className="iconbtn__label">{lang.toUpperCase()}</span>
              </button>
              {langOpen && (
                <div className="popover__panel popover__panel--scroll" role="listbox">
                  {Object.keys(TRANSLATIONS).map(code => (
                    <button key={code} className={`popover__item ${code === lang ? 'is-active' : ''}`} onClick={() => { setLang(code); setLangOpen(false); }}>
                      <span className="popover__code">{code.toUpperCase()}</span>
                      <span>{LANGUAGE_LABELS[code]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency */}
            <div className="popover">
              <button className="iconbtn iconbtn--text" onClick={() => { setCurrOpen(v => !v); setLangOpen(false); }} aria-haspopup="listbox" aria-expanded={currOpen}>
                <Icon name="coin" size={17} />
                <span className="iconbtn__label">{currency}</span>
              </button>
              {currOpen && (
                <div className="popover__panel popover__panel--scroll" role="listbox">
                  {Object.keys(EXCHANGE_RATES).map(code => (
                    <button key={code} className={`popover__item ${code === currency ? 'is-active' : ''}`} onClick={() => { setCurrency(code); setCurrOpen(false); }}>
                      <span className="popover__code">{code}</span>
                      <span className="popover__mono">{EXCHANGE_RATES[code].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart */}
            <button className="iconbtn" onClick={() => setShowCart(true)} aria-label="Abrir carrito">
              <Icon name="cart" size={19} />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>

            {/* Auth */}
            {user ? (
              <div className="popover">
                <button className="iconbtn iconbtn--text iconbtn--user" onClick={() => setLangOpen(false) || setCurrOpen(false)}>
                  <span className="avatar">{user.name.charAt(0).toUpperCase()}</span>
                  <span className="iconbtn__label">{user.name.split(' ')[0]}</span>
                </button>
                <div className="popover__panel popover__panel--right">
                  <button className="popover__item popover__item--danger" onClick={() => { setUser(null); setCart([]); }}>{t.auth.logout}</button>
                </div>
              </div>
            ) : (
              <button className="btn btn--primary btn--sm nav__cta" onClick={() => { setAuthTab('login'); setAuthOpen(true); }}>
                {t.auth.login}
              </button>
            )}

            <button className="menutoggle" onClick={() => setMobileNavOpen(v => !v)} aria-label="Abrir menú">
              <Icon name={mobileNavOpen ? 'close' : 'menu'} size={22} />
            </button>
          </div>
        </div>

        {mobileNavOpen && (
          <div className="mobilenav">
            <a href="#top" className="mobilenav__link" onClick={() => setMobileNavOpen(false)}>{t.nav.home}</a>
            <a href="#shop" className="mobilenav__link" onClick={() => setMobileNavOpen(false)}>{t.nav.shop}</a>
            <a href="#docs" className="mobilenav__link" onClick={() => setMobileNavOpen(false)}>{t.nav.docs}</a>
            <a href="#support" className="mobilenav__link" onClick={() => setMobileNavOpen(false)}>{t.nav.support}</a>
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}
      <main id="top">
        <section className="hero">
          <div className="hero__glow" aria-hidden="true" />
          <div className="hero__grid">
            <div className="hero__copy">
              <span className="eyebrow"><span className="eyebrow__dot" />{t.hero.eyebrow}</span>
              <h1 className="hero__title">{t.hero.title.split('\n').map((line, i) => <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>)}</h1>
              <p className="hero__subtitle">{t.hero.subtitle}</p>
              <div className="hero__actions">
                <a href="#shop" className="btn btn--primary btn--lg">
                  {t.hero.cta} <Icon name="arrow" size={17} />
                </a>
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

        {/* ================= FEATURED ================= */}
        <section className="section" id="featured">
          <div className="section__head">
            <div>
              <span className="section__eyebrow">{t.shop.featured}</span>
              <h2 className="section__title">{t.shop.featured}</h2>
            </div>
          </div>
          <div className="grid grid--featured">
            {featured.map((p, i) => (
              <article className="card card--featured" key={p.id} style={{ '--delay': `${i * 90}ms` }}>
                <div className="card__top">
                  <span className="tag">{p.tag}</span>
                  <span className="rating"><Icon name="star" size={13} className="rating__icon" />{p.rating}</span>
                </div>
                <h3 className="card__title">{p.name}</h3>
                <p className="card__desc">{p.description}</p>
                <ul className="card__specs">
                  {p.specs.map(s => <li key={s}><Icon name="check" size={13} />{s}</li>)}
                </ul>
                <div className="card__footer">
                  <div className="card__price">
                    <span className="card__amount">{rate.symbol}{price(p.price)}</span>
                    <span className="card__installs">{p.installs} instalaciones</span>
                  </div>
                  <button className="btn btn--primary btn--sm" onClick={() => addToCart(p)}>{t.shop.addCart}</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ================= FULL CATALOG ================= */}
        <section className="section section--alt" id="shop">
          <div className="section__head">
            <div>
              <span className="section__eyebrow">CATÁLOGO</span>
              <h2 className="section__title">{t.shop.title}</h2>
              <p className="section__subtitle">{t.shop.subtitle}</p>
            </div>
            <div className="searchbox">
              <Icon name="search" size={17} />
              <input type="text" placeholder={t.shop.search} value={query} onChange={e => setQuery(e.target.value)} />
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="empty-note">{t.shop.empty}</p>
          ) : (
            <div className="grid grid--catalog">
              {filtered.map(p => (
                <article className="card" key={p.id}>
                  <div className="card__top">
                    <span className="tag tag--outline">{p.tag}</span>
                    <span className="rating"><Icon name="star" size={12} className="rating__icon" />{p.rating}</span>
                  </div>
                  <h3 className="card__title card__title--sm">{p.name}</h3>
                  <p className="card__desc card__desc--clamp">{p.description}</p>
                  <div className="card__footer">
                    <span className="card__amount card__amount--sm">{rate.symbol}{price(p.price)}</span>
                    <button className="btn btn--outline btn--sm" onClick={() => addToCart(p)}>{t.shop.addCart}</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ================= TRUST STRIP ================= */}
        <section className="trust">
          <div className="trust__item"><Icon name="shield" size={18} /><span>Código auditado</span></div>
          <div className="trust__item"><Icon name="zap" size={18} /><span>Instalación en minutos</span></div>
          <div className="trust__item"><Icon name="layers" size={18} /><span>Actualizaciones incluidas</span></div>
          <div className="trust__item"><Icon name="lock" size={18} /><span>Pago 100% seguro</span></div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="footer" id="docs">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="brand">
              <span className="brand__mark">Yx</span>
              <span className="brand__name">Store</span>
            </div>
            <p className="footer__tagline">{t.footer.tagline}</p>
          </div>
          <div className="footer__cols">
            <div className="footer__col">
              <h4>{t.footer.product}</h4>
              <a href="#shop">{t.nav.shop}</a>
              <a href="#featured">{t.shop.featured}</a>
              <a href="#docs">{t.nav.docs}</a>
            </div>
            <div className="footer__col" id="support">
              <h4>{t.footer.company}</h4>
              <a href="#top">{t.nav.support}</a>
              <a href="#top">Discord</a>
              <a href="#top">Contacto</a>
            </div>
            <div className="footer__col">
              <h4>{t.footer.legal}</h4>
              <a href="#top">Términos</a>
              <a href="#top">Privacidad</a>
              <a href="#top">Licencias</a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2025 Yx Store. {t.footer.rights}</span>
        </div>
      </footer>

      {/* ================= CART DRAWER ================= */}
      <div className={`overlay ${showCart ? 'is-open' : ''}`} onClick={() => setShowCart(false)} />
      <aside className={`drawer ${showCart ? 'is-open' : ''}`} aria-hidden={!showCart}>
        <div className="drawer__head">
          <h3>{t.cart.title}</h3>
          <button className="iconbtn" onClick={() => setShowCart(false)} aria-label="Cerrar carrito"><Icon name="close" size={20} /></button>
        </div>
        <div className="drawer__body">
          {cart.length === 0 ? (
            <div className="drawer__empty">
              <Icon name="box" size={40} />
              <p>{t.cart.empty}</p>
              <span>{t.cart.emptySub}</span>
            </div>
          ) : (
            <ul className="cartlist">
              {cart.map(item => (
                <li className="cartitem" key={item.id}>
                  <div className="cartitem__icon"><Icon name="box" size={18} /></div>
                  <div className="cartitem__info">
                    <span className="cartitem__name">{item.name}</span>
                    <span className="cartitem__meta">{rate.symbol}{price(item.price)} × {item.qty}</span>
                  </div>
                  <button className="cartitem__remove" onClick={() => removeFromCart(item.id)} aria-label={`${t.cart.remove} ${item.name}`}>
                    <Icon name="trash" size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {cart.length > 0 && (
          <div className="drawer__foot">
            <div className="drawer__total">
              <span>{t.cart.total}</span>
              <span className="drawer__totalvalue">{rate.symbol}{(cartTotal * rate.rate).toFixed(2)}</span>
            </div>
            <button className="btn btn--primary btn--block" onClick={() => { setShowCart(false); setCheckoutOpen(true); }}>{t.cart.checkout}</button>
            <button className="btn btn--text btn--block" onClick={() => setShowCart(false)}>{t.cart.continue}</button>
          </div>
        )}
      </aside>

      {/* ================= AUTH MODAL ================= */}
      <div className={`overlay ${authOpen ? 'is-open' : ''}`} onClick={() => setAuthOpen(false)} />
      <div className={`modal modal--auth ${authOpen ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!authOpen}>
        <button className="modal__close" onClick={() => setAuthOpen(false)} aria-label="Cerrar"><Icon name="close" size={20} /></button>
        <div className="tabs">
          <button className={`tabs__item ${authTab === 'login' ? 'is-active' : ''}`} onClick={() => setAuthTab('login')}>{t.auth.login}</button>
          <button className={`tabs__item ${authTab === 'register' ? 'is-active' : ''}`} onClick={() => setAuthTab('register')}>{t.auth.register}</button>
        </div>
        {authTab === 'login' ? (
          <form className="form" onSubmit={handleLogin}>
            <label className="field">
              <span>{t.auth.email}</span>
              <input type="email" name="email" required placeholder="tu@correo.com" />
            </label>
            <label className="field">
              <span>{t.auth.password}</span>
              <input type="password" name="password" required placeholder="••••••••" />
            </label>
            <input type="hidden" name="name" value="" />
            <button className="btn btn--primary btn--block" type="submit">{t.auth.loginBtn}</button>
          </form>
        ) : (
          <form className="form" onSubmit={handleLogin}>
            <label className="field">
              <span>{t.auth.name}</span>
              <input type="text" name="fullName" required placeholder="Tu nombre" />
            </label>
            <label className="field">
              <span>{t.auth.email}</span>
              <input type="email" required placeholder="tu@correo.com" />
            </label>
            <label className="field">
              <span>{t.auth.password}</span>
              <input type="password" required placeholder="••••••••" />
            </label>
            <label className="field">
              <span>{t.auth.confirmPassword}</span>
              <input type="password" required placeholder="••••••••" />
            </label>
            <button className="btn btn--primary btn--block" type="submit">{t.auth.registerBtn}</button>
          </form>
        )}
      </div>

      {/* ================= CHECKOUT MODAL ================= */}
      <div className={`overlay ${checkoutOpen ? 'is-open' : ''}`} onClick={closeCheckout} />
      <div className={`modal modal--checkout ${checkoutOpen ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!checkoutOpen}>
        <button className="modal__close" onClick={closeCheckout} aria-label="Cerrar"><Icon name="close" size={20} /></button>

        {checkoutStep === 'form' ? (
          <>
            <h3 className="modal__title">{t.checkout.title}</h3>

            <div className="checkout__section">
              <h4 className="checkout__label">{t.checkout.selectPayment}</h4>
              <div className="paymethods">
                {[
                  { id: 'stripe', label: t.checkout.stripe, icon: 'card' },
                  { id: 'paypal', label: t.checkout.paypal, icon: 'globe' },
                  { id: 'bitcoin', label: t.checkout.bitcoin, icon: 'coin' },
                  { id: 'apple', label: t.checkout.apple, icon: 'lock' },
                ].map(m => (
                  <button type="button" key={m.id} className={`paymethod ${payMethod === m.id ? 'is-active' : ''}`} onClick={() => setPayMethod(m.id)}>
                    <Icon name={m.icon} size={18} />
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <form className="checkout__section form" onSubmit={handleCheckoutSubmit}>
              <h4 className="checkout__label">{t.checkout.billing}</h4>
              <label className="field">
                <span>{t.checkout.fullName}</span>
                <input type="text" required placeholder="Nombre y apellidos" />
              </label>
              <label className="field">
                <span>{t.checkout.email}</span>
                <input type="email" required placeholder="tu@correo.com" />
              </label>
              <label className="field">
                <span>{t.checkout.address}</span>
                <input type="text" required placeholder="Calle y número" />
              </label>
              <div className="field-row">
                <label className="field">
                  <span>{t.checkout.city}</span>
                  <input type="text" required />
                </label>
                <label className="field">
                  <span>{t.checkout.zip}</span>
                  <input type="text" required />
                </label>
              </div>

              <div className="checkout__total">
                <span>{t.cart.total}</span>
                <span className="checkout__totalvalue">{rate.symbol}{(cartTotal * rate.rate).toFixed(2)}</span>
              </div>
              <button className="btn btn--primary btn--block btn--lg" type="submit">
                <Icon name="lock" size={16} /> {t.checkout.confirm}
              </button>
            </form>
          </>
        ) : (
          <div className="checkout__success">
            <div className="checkout__successicon"><Icon name="check" size={28} /></div>
            <h3>{t.checkout.success}</h3>
            <p>{t.checkout.successSub}</p>
            <button className="btn btn--primary" onClick={closeCheckout}>{t.cart.continue}</button>
          </div>
        )}
      </div>
    </div>
  );
}
