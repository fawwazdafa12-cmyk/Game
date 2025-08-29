

// This file centralizes all icon sources for the application.
// You can replace any URL with an external URL (e.g., from a CDN)
// to change an icon across the entire application.

const ICONIFY_API = 'https://api.iconify.design/';

// Helper function to create icon URLs that can be styled with Tailwind CSS text color classes
const getIconUrl = (path: string) => `${ICONIFY_API}${path}.svg?color=currentColor`;

export const iconUrls = {
  // --- LOGO (USER DEFINED - NOT CHANGED) ---
  nexusCoinLogo: 'https://i.imgur.com/34IciiU.png',
  
  // --- HEADER ICONS ---
  lightning: 'https://i.imgur.com/vxMORzK.png',
  search: getIconUrl('heroicons/magnifying-glass'),
  user: getIconUrl('heroicons/user-circle-solid'),

  // --- GENERAL PURPOSE ICONS ---
  coin: getIconUrl('ph/coin-vertical-fill'),
  clock: getIconUrl('heroicons/clock'),
  fire: getIconUrl('heroicons/fire-solid'),
  sparkles: getIconUrl('heroicons/sparkles-solid'),
  ticket: getIconUrl('heroicons/ticket'),
  wrenchScrewdriver: getIconUrl('heroicons/wrench-screwdriver-solid'),
  currencyDollar: getIconUrl('heroicons/currency-dollar-solid'),
  key: getIconUrl('heroicons/key-solid'),
  devicePhoneMobile: getIconUrl('heroicons/device-phone-mobile-solid'),
  desktopComputer: getIconUrl('heroicons/computer-desktop-solid'),
  
  // --- CHEVRONS & ARROWS ---
  chevronRight: getIconUrl('heroicons/chevron-right'),
  chevronDown: getIconUrl('heroicons/chevron-down'),
  chevronLeft: getIconUrl('heroicons/chevron-left'),
  chevronDoubleLeft: getIconUrl('heroicons/chevron-double-left-solid'),
  arrowUp: getIconUrl('heroicons/arrow-up'),
  arrowDownTray: getIconUrl('heroicons/arrow-down-tray'),
  paperAirplane: getIconUrl('heroicons/paper-airplane'),

  // --- UI & ACTION ICONS ---
  xMark: getIconUrl('heroicons/x-mark'),
  spinner: getIconUrl('eos-icons/loading'), // Animated
  logout: getIconUrl('heroicons/arrow-left-on-rectangle'),
  share: getIconUrl('heroicons/share'),
  clipboardDocument: getIconUrl('heroicons/clipboard-document'),
  bell: getIconUrl('heroicons/bell'),
  chevronUpDown: getIconUrl('heroicons/chevron-up-down'),
  plus: getIconUrl('heroicons/plus-solid'),
  pencil: getIconUrl('heroicons/pencil-solid'),
  trash: getIconUrl('heroicons/trash-solid'),
  noSymbol: getIconUrl('heroicons/no-symbol-solid'),
  photo: getIconUrl('heroicons/photo-solid'),
  
  // --- STATUS & INFO ICONS ---
  check: getIconUrl('heroicons/check'),
  checkCircle: getIconUrl('heroicons/check-circle-solid'),
  exclamationTriangle: getIconUrl('heroicons/exclamation-triangle-solid'),
  exclamationCircle: getIconUrl('heroicons/exclamation-circle-solid'),
  informationCircle: getIconUrl('heroicons/information-circle-solid'),
  
  // --- OBJECT ICONS ---
  envelope: getIconUrl('heroicons/envelope'),
  qrCode: getIconUrl('heroicons/qr-code'),
  banknotes: getIconUrl('heroicons/banknotes'),
  creditCard: getIconUrl('heroicons/credit-card'),
  wallet: getIconUrl('heroicons/wallet'),
  chatBubbleLeftEllipsis: getIconUrl('heroicons/chat-bubble-left-ellipsis'),
  receiptSolid: getIconUrl('heroicons/receipt-percent-solid'),
  calendarDays: getIconUrl('heroicons/calendar-days'),
  trophy: getIconUrl('heroicons/trophy'),
  star: getIconUrl('heroicons/star-solid'),
  
  // --- SOCIAL & BRAND ICONS (Brand colors are preserved) ---
  facebook: `${ICONIFY_API}logos/facebook.svg`,
  instagram: `${ICONIFY_API}logos/instagram-icon.svg`,
  x: getIconUrl('ri/twitter-x-fill'),
  tiktok: `${ICONIFY_API}logos/tiktok-icon.svg`,
  google: `${ICONIFY_API}logos/google-icon.svg`,
  facebookAlt: `${ICONIFY_API}logos/facebook.svg`,
  whatsapp: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
  shieldCheck: getIconUrl('heroicons/shield-check-solid'),
  checkBadge: getIconUrl('heroicons/check-badge-solid'),
  tagSolid: getIconUrl('heroicons/tag-solid'),
  headsetMic: getIconUrl('ic/baseline-headset-mic'),

  // --- ADMIN ICONS ---
  squares2x2: getIconUrl('heroicons/squares-2x2-solid'),
  shoppingBag: getIconUrl('heroicons/shopping-bag-solid'),
  cube: getIconUrl('heroicons/cube-solid'),
  users: getIconUrl('heroicons/users-solid'),
  cog6tooth: getIconUrl('heroicons/cog-6-tooth-solid'),
  tagAdmin: getIconUrl('heroicons/tag-solid'),
  buildingStorefront: getIconUrl('heroicons/building-storefront-solid'),
  flag: getIconUrl('heroicons/flag-solid'),
  documentChartBar: getIconUrl('heroicons/document-chart-bar-solid'),
  circleStack: getIconUrl('heroicons/circle-stack-solid'),
  cpuChip: getIconUrl('heroicons/cpu-chip-solid'),
  
  // --- NAVIGATION ICONS ---
  home: {
    inactive: getIconUrl('heroicons/home'),
    active: getIconUrl('heroicons/home-solid')
  },
  receipt: {
    inactive: getIconUrl('heroicons/receipt-percent'),
    active: getIconUrl('heroicons/receipt-percent-solid')
  },
  gift: {
    inactive: getIconUrl('heroicons/gift'),
    active: getIconUrl('heroicons/gift-solid')
  },
  tag: {
    inactive: getIconUrl('heroicons/tag'),
    active: getIconUrl('heroicons/tag-solid')
  },
  admin: {
      inactive: getIconUrl('heroicons/wrench-screwdriver'),
      active: getIconUrl('heroicons/wrench-screwdriver-solid'),
  }
};