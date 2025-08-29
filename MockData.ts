

import {
    Product,
    NewsArticle,
    FlashSaleProduct,
    Promo,
    TransactionDetail,
    Mission,
    CoinBalance,
    CoinTransaction,
    CoinPackage,
    PaymentCategory,
    ProductDetail,
    User,
    ReconciliationRun,
    WebhookLog,
    WebhookJob,
    PaymentMethod,
} from '../types';
import {
    BanknotesIcon,
    CreditCardIcon,
    QrCodeIcon,
    WalletIcon
} from './icons';
import {
    mobileLegendsIconUrl, freeFireIconUrl, pubgMobileIconUrl, genshinImpactIconUrl, honkaiStarRailIconUrl,
    honorOfKingsIconUrl, callOfDutyMobileIconUrl, wildRiftIconUrl, arenaOfValorIconUrl, stumbleGuysIconUrl,
    sausageManIconUrl, lifeAfterIconUrl, ragnarokMEternalLoveIconUrl, eggyPartyIconUrl, pointBlankIconUrl,
    zenlessZoneZeroIconUrl, wutheringWavesIconUrl, warzoneMobileIconUrl, soloLevelingAriseIconUrl,
    ragnarokOriginIconUrl, persona5XIconUrl, blackCloverMIconUrl, monsterHunterNowIconUrl, reverse1999IconUrl,
    tarislandIconUrl, dragonNest2IconUrl, googlePlayIconUrl, razerGoldIconUrl, steamIconUrl, garenaIconUrl,
    playstationIconUrl, xboxIconUrl, nintendoIconUrl, riotIconUrl, blizzardIconUrl, iTunesIconUrl,
    netflixGiftIconUrl, spotifyGiftIconUrl, amazonGiftIconUrl, spotifyIconUrl, netflixIconUrl, disneyPlusIconUrl,
    youtubeIconUrl, vidioIconUrl, viuIconUrl, iqiyiIconUrl, wetvIconUrl, tiktokIconUrl, bigoLiveIconUrl,
    visionPlusIconUrl, genflixIconUrl, webtoonIconUrl, iflixIconUrl, jooxIconUrl, valorantIconUrl, clashOfClansIconUrl,
    promoPageBannerUrl, mlProductPageBannerUrl, ffProductPageBannerUrl, pubgProductPageBannerUrl, genshinProductPageBannerUrl,
    hsrProductPageBannerUrl, hokProductPageBannerUrl, codmProductPageBannerUrl, aovProductPageBannerUrl, pbProductPageBannerUrl,
    zzzProductPageBannerUrl, warzoneProductPageBannerUrl, wuwaProductPageBannerUrl, gpGiftProductPageBannerUrl, 
    steamWalletProductPageBannerUrl, netflixProductPageBannerUrl, garenaProductPageBannerUrl, valorantProductPageBannerUrl
} from './ImageAssets';


export const initialPaymentCategories: PaymentCategory[] = [
    {
        id: 'qris',
        name: 'QRIS',
        methods: [
            { id: 'qris_all', name: 'QRIS (All e-wallet & m-banking)', icon: QrCodeIcon, fee: { flat: 0, percent: 0.7 }, eta: 'Instan', status: 'online', recommended: true, provider: 'Midtrans', priority: 1, successRate: 99.8, avgLatencyMs: 850 },
            { id: 'qris_testing_degraded', name: 'QRIS (Degraded)', icon: QrCodeIcon, fee: { flat: 0, percent: 0.7 }, eta: 'Instan', status: 'degraded', provider: 'Xendit', priority: 2, successRate: 85.1, avgLatencyMs: 2500 },
        ],
    },
    {
        id: 'ewallet',
        name: 'E-Wallet',
        methods: [
            { id: 'ewallet_gopay', name: 'GoPay', icon: WalletIcon, fee: { flat: 0, percent: 1.5 }, eta: 'Instan', status: 'online', provider: 'Midtrans', priority: 10, successRate: 99.5, avgLatencyMs: 1200 },
            { id: 'ewallet_ovo', name: 'OVO', icon: WalletIcon, fee: { flat: 0, percent: 1.5 }, eta: 'Instan', status: 'online', provider: 'Xendit', priority: 11, successRate: 99.3, avgLatencyMs: 1300 },
            { id: 'ewallet_dana', name: 'DANA', icon: WalletIcon, fee: { flat: 0, percent: 1.5 }, eta: 'Instan', status: 'maintenance', provider: 'Midtrans', priority: 12, successRate: 99.6, avgLatencyMs: 1150 },
            { id: 'ewallet_shopeepay', name: 'ShopeePay', icon: WalletIcon, fee: { flat: 0, percent: 1.5 }, eta: 'Instan', status: 'online', provider: 'Xendit', priority: 13, successRate: 99.7, avgLatencyMs: 1100 },
        ],
    },
    {
        id: 'va',
        name: 'Virtual Account',
        methods: [
            { id: 'va_bca', name: 'BCA Virtual Account', icon: BanknotesIcon, fee: { flat: 4000, percent: 0 }, eta: '1-3 Menit', status: 'online', provider: 'Midtrans', priority: 20, successRate: 99.9, avgLatencyMs: 500 },
            { id: 'va_mandiri', name: 'Mandiri Virtual Account', icon: BanknotesIcon, fee: { flat: 4000, percent: 0 }, eta: '1-3 Menit', status: 'down', provider: 'Xendit', priority: 21, successRate: 99.8, avgLatencyMs: 600 },
            { id: 'va_bni', name: 'BNI Virtual Account', icon: BanknotesIcon, fee: { flat: 4000, percent: 0 }, eta: '1-3 Menit', status: 'online', provider: 'Midtrans', priority: 22, successRate: 99.7, avgLatencyMs: 700 },
        ],
    },
    {
        id: 'card',
        name: 'Kartu Kredit/Debit',
        methods: [
            { id: 'card_all', name: 'Kartu Kredit/Debit (Visa, Mastercard)', icon: CreditCardIcon, fee: { flat: 0, percent: 2.9 }, eta: 'Instan', status: 'online', provider: 'Midtrans', priority: 30, successRate: 98.5, avgLatencyMs: 1500 },
        ],
    },
];

export const mockUser: User = {
    isLoggedIn: true,
    roles: ['admin', 'finance'],
    name: 'Admin Nexus',
    email: 'admin@nexustopup.com',
    id: 'user_admin_01'
};


export const initialWebhookJobs: WebhookJob[] = [
    { id: 'job_dlq_01', provider: 'Midtrans', external_id: 'PAY-FAIL-123', event_id: 'evt-fail-abc', payload: { amount: 50000 }, attempt: 9, next_run_at: new Date().toISOString(), status: 'dlq', last_error: 'Database connection timeout' },
    { id: 'job_dlq_02', provider: 'Xendit', external_id: 'PAY-FAIL-456', event_id: 'evt-fail-def', payload: { amount: 75000 }, attempt: 10, next_run_at: new Date().toISOString(), status: 'dlq', last_error: 'Invalid product variant ID' },
];

export const mockWebhookLogs: WebhookLog[] = [
    { id: 'wh_log_01', provider: 'Midtrans', external_id: 'PAY-OK-111', signature_ok: true, received_at: new Date().toISOString(), processed_at: new Date().toISOString(), status: 'processed' },
    { id: 'wh_log_02', provider: 'Xendit', external_id: 'PAY-OK-222', signature_ok: true, received_at: new Date().toISOString(), processed_at: new Date().toISOString(), status: 'processed' },
    { id: 'wh_log_03', provider: 'Midtrans', external_id: 'PAY-FAIL-123', signature_ok: true, received_at: new Date(Date.now() - 2 * 60 * 1000).toISOString(), processed_at: null, status: 'failed' },
    { id: 'wh_log_04', provider: 'Custom', external_id: 'PAY-BAD-SIG', signature_ok: false, received_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(), processed_at: null, status: 'failed' },
];

export const mockReconciliationRuns: ReconciliationRun[] = [
    {
        id: 'recon_run_01',
        runDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        provider: 'Midtrans',
        okCount: 1230,
        mismatchCount: 2,
        amountDiff: -1500,
        status: 'completed',
        mismatches: [
            { id: 'm1', type: 'amount_diff', orderId: 'NXS-12345', externalId: 'PAY-MT-ABC', localAmount: 50000, remoteAmount: 48500, status: 'unresolved' },
            { id: 'm2', type: 'missing_local', orderId: 'N/A', externalId: 'PAY-MT-DEF', localAmount: null, remoteAmount: 75000, status: 'unresolved' },
        ],
    },
    {
        id: 'recon_run_02',
        runDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        provider: 'Xendit',
        okCount: 890,
        mismatchCount: 0,
        amountDiff: 0,
        status: 'completed',
        mismatches: [],
    },
];

export const mockPromos: Promo[] = [
  { id: 1, title: 'Flash Sale MLBB Diskon 20%', description: 'Top up Diamond Mobile Legends sekarang juga!', image: mlProductPageBannerUrl, type: 'flash', endAt: '2024-12-31T23:59:59', discountPct: 20 },
  { id: 2, title: 'Voucher Cashback 10% Pengguna Baru', description: 'Klaim voucher dan nikmati cashback untuk transaksi pertamamu.', image: promoPageBannerUrl, type: 'voucher', endAt: '2024-12-31T23:59:59', discountPct: 10 },
  { id: 3, title: 'Bonus Nexus Coins 5%', description: 'Dapatkan bonus 5% Nexus Coins untuk setiap top up di atas Rp100.000.', image: ffProductPageBannerUrl, type: 'coins', endAt: '2024-12-25T23:59:59' },
  { id: 4, title: 'Event Spesial Akhir Tahun', description: 'Ikuti event dan menangkan hadiah total jutaan rupiah!', image: pubgProductPageBannerUrl, type: 'event', endAt: '2024-12-30T23:59:59' },
];

export const mockCoinPackages: CoinPackage[] = [
    { id: 1, amount: 10000, price: 10000, label: 'Populer' },
    { id: 2, amount: 25000, price: 25000 },
    { id: 3, amount: 50000, price: 50000, label: 'Populer' },
    { id: 4, amount: 100000, price: 100000, label: 'Best Value' },
    { id: 5, amount: 250000, price: 250000 },
    { id: 6, amount: 500000, price: 500000, label: 'Best Value' },
];

export const mockCoinHistory: CoinTransaction[] = [
    { id: 1, type: 'credit', amount: 1250, reason: 'Cashback dari NXS-123456789', date: '2024-07-20T10:31:00Z', status: 'Tersedia' },
    { id: 2, type: 'debit', amount: 5000, reason: 'Potongan harga untuk NXS-987654321', date: '2024-07-19T15:05:00Z', status: 'Tersedia' },
    { id: 3, type: 'credit', amount: 200, reason: 'Misi harian selesai', date: '2024-07-18T08:00:00Z', status: 'Tersedia' },
    { id: 4, type: 'credit', amount: 10000, reason: 'Top up Koin', date: '2024-07-15T12:00:00Z', status: 'Tersedia' },
];

export const mockCoinBalance: CoinBalance = {
    available: 12850,
    pending: 1500,
};

export const mockHardMissions: Mission[] = [
    { id: 1, title: 'Top Up Total Rp500.000', description: 'Capai total akumulasi top up Rp500.000 bulan ini.', reward: '+2000 Koin', progress: 65, isComplete: false },
    { id: 2, title: '5x Transaksi Berbeda', description: 'Lakukan transaksi untuk 5 game yang berbeda.', reward: '+1000 Koin', progress: 80, isComplete: false },
];

export const mockMissions: Mission[] = [
    { id: 1, title: 'Login Harian', description: 'Masuk ke akunmu setiap hari.', reward: '+50 Koin', progress: 100, isComplete: true },
    { id: 2, title: 'Transaksi Pertama Hari Ini', description: 'Selesaikan satu transaksi hari ini.', reward: '+150 Koin', progress: 0, isComplete: false },
    { id: 3, title: 'Bagikan ke Teman', description: 'Bagikan halaman promo ke media sosial.', reward: '+100 Koin', progress: 0, isComplete: false },
];

export const mockTransactionDetails: TransactionDetail[] = [
    {
        id: 'NXS-123456789',
        productName: 'Mobile Legends',
        gameAccountId: '12345678 (2109)',
        paymentMethod: 'QRIS',
        dateTime: '2024-07-20T03:30:00Z', // 10:30 WIB
        total: 50000,
        status: 'Berhasil',
        rincianBiaya: { hargaProduk: 49500, biayaAdmin: 500, diskon: 0, total: 50000 },
        productDetails: { imageUrl: mobileLegendsIconUrl, name: 'Mobile Legends', item: '250 Diamonds', quantity: 1 },
        paymentDetails: { channel: 'QRIS', code: '00123456789', expireAt: '' },
        deliveryDetails: { type: 'topup_uid', nickname: 'NexusPlayer', uid: '12345678', server: '2109' },
        activityLogs: [{ label: 'Pesanan dibuat', timestamp: '2024-07-20T03:29:00Z' }, { label: 'Pembayaran diterima', timestamp: '2024-07-20T03:30:00Z' }, { label: 'Pesanan selesai', timestamp: '2024-07-20T03:30:15Z' }],
        coinsEarned: 1000
    },
    {
        id: 'NXS-987654321',
        productName: 'Free Fire',
        gameAccountId: '987654321',
        paymentMethod: 'GoPay',
        dateTime: '2024-07-19T08:00:00Z', // 15:00 WIB
        total: 20000,
        status: 'Menunggu Bayar',
        rincianBiaya: { hargaProduk: 19800, biayaAdmin: 200, diskon: 0, total: 20000 },
        productDetails: { imageUrl: freeFireIconUrl, name: 'Free Fire', item: '140 Diamonds', quantity: 1 },
        paymentDetails: { channel: 'GoPay', code: '081234567890', expireAt: new Date(Date.now() + 15 * 60 * 1000).toISOString() },
        deliveryDetails: { type: 'topup_uid', nickname: 'BooyahMaster', uid: '987654321', server: '' },
        activityLogs: [{ label: 'Pesanan dibuat', timestamp: '2024-07-19T08:00:00Z' }],
    },
];

export const newsArticles: NewsArticle[] = [
  { id: 1, title: 'Patch Baru Mobile Legends: Revamp Hero & Item!', imageUrl: 'https://picsum.photos/seed/news1/400/200' },
  { id: 2, title: 'Event Kolaborasi Free Fire x Anime Terkenal, Dapatkan Skin Eksklusif!', imageUrl: 'https://picsum.photos/seed/news2/400/200' },
  { id: 3, title: 'Update Besar Genshin Impact 5.0: Natlan Telah Tiba, Apa Saja yang Baru?', imageUrl: 'https://picsum.photos/seed/news3/400/200' },
];

export const flashSaleProducts: FlashSaleProduct[] = [
  { id: 1, name: 'MLBB 86 Diamonds', category: 'Mobile Legends', imageUrl: mobileLegendsIconUrl, originalPrice: 25000, price: 20000, discount: 20, stock: 80, remaining: 123 },
  { id: 2, name: 'FF 140 Diamonds', category: 'Free Fire', imageUrl: freeFireIconUrl, originalPrice: 20000, price: 15000, discount: 25, stock: 60, remaining: 88 },
  { id: 3, name: 'PUBGM 60 UC', category: 'PUBG Mobile', imageUrl: pubgMobileIconUrl, originalPrice: 15000, price: 12000, discount: 20, stock: 40, remaining: 50 },
  { id: 4, name: 'Genshin Blessing of the Welkin Moon', category: 'Genshin Impact', imageUrl: genshinImpactIconUrl, originalPrice: 79000, price: 69000, discount: 13, stock: 90, remaining: 250 },
  { id: 5, name: 'HSR Express Supply Pass', category: 'Honkai: Star Rail', imageUrl: honkaiStarRailIconUrl, originalPrice: 79000, price: 69000, discount: 13, stock: 85, remaining: 210 },
];

export const popularProducts: Product[] = [
    { id: 1, name: 'Mobile Legends', category: 'Top Up Langsung', imageUrl: mobileLegendsIconUrl, discount: 10 },
    { id: 2, name: 'Free Fire', category: 'Top Up Langsung', imageUrl: freeFireIconUrl },
    { id: 3, name: 'PUBG Mobile', category: 'Top Up Langsung', imageUrl: pubgMobileIconUrl },
    { id: 4, name: 'Genshin Impact', category: 'Top Up Langsung', imageUrl: genshinImpactIconUrl },
    { id: 5, name: 'Honkai: Star Rail', category: 'Top Up Langsung', imageUrl: honkaiStarRailIconUrl },
    { id: 6, name: 'Honor of Kings', category: 'Top Up Langsung', imageUrl: honorOfKingsIconUrl },
    { id: 7, name: 'Call of Duty Mobile', category: 'Top Up Langsung', imageUrl: callOfDutyMobileIconUrl },
    { id: 8, name: 'Wild Rift', category: 'Top Up Langsung', imageUrl: wildRiftIconUrl },
    { id: 9, name: 'Arena of Valor', category: 'Top Up Langsung', imageUrl: arenaOfValorIconUrl },
];

export const newReleaseProducts: Product[] = [
    { id: 16, name: 'Zenless Zone Zero', category: 'Baru Rilis', imageUrl: zenlessZoneZeroIconUrl },
    { id: 17, name: 'Wuthering Waves', category: 'Baru Rilis', imageUrl: wutheringWavesIconUrl },
    { id: 18, name: 'Warzone Mobile', category: 'Baru Rilis', imageUrl: warzoneMobileIconUrl },
    { id: 19, name: 'Solo Leveling:Arise', category: 'Baru Rilis', imageUrl: soloLevelingAriseIconUrl },
    { id: 20, name: 'Ragnarok Origin', category: 'Baru Rilis', imageUrl: ragnarokOriginIconUrl },
    { id: 21, name: 'Persona 5: The Phantom X', category: 'Baru Rilis', imageUrl: persona5XIconUrl },
    { id: 22, name: 'Black Clover M', category: 'Baru Rilis', imageUrl: blackCloverMIconUrl },
    { id: 23, name: 'Monster Hunter Now', category: 'Baru Rilis', imageUrl: monsterHunterNowIconUrl },
    { id: 24, name: 'Reverse: 1999', category: 'Baru Rilis', imageUrl: reverse1999IconUrl },
];

export const voucherProducts: Product[] = [
    { id: 32, name: 'Google Play Gift Code', category: 'Voucher', imageUrl: googlePlayIconUrl },
    { id: 33, name: 'Razer Gold', category: 'Voucher', imageUrl: razerGoldIconUrl },
    { id: 34, name: 'Steam Wallet Code', category: 'Voucher', imageUrl: steamIconUrl },
    { id: 35, name: 'Garena Shells', category: 'Voucher', imageUrl: garenaIconUrl },
    { id: 36, name: 'PlayStation Network Card', category: 'Voucher', imageUrl: playstationIconUrl },
    { id: 37, name: 'Xbox Gift Card', category: 'Voucher', imageUrl: xboxIconUrl },
    { id: 38, name: 'Nintendo eShop Card', category: 'Voucher', imageUrl: nintendoIconUrl },
    { id: 39, name: 'Riot Pin', category: 'Voucher', imageUrl: riotIconUrl },
    { id: 40, name: 'Blizzard Balance', category: 'Voucher', imageUrl: blizzardIconUrl },
];

export const entertainmentProducts: Product[] = [
    { id: 41, name: 'Spotify Premium', category: 'Entertainment', imageUrl: spotifyIconUrl },
    { id: 42, name: 'Netflix', category: 'Entertainment', imageUrl: netflixIconUrl },
    { id: 43, name: 'Disney+ Hotstar', category: 'Entertainment', imageUrl: disneyPlusIconUrl },
    { id: 44, name: 'YouTube Premium', category: 'Entertainment', imageUrl: youtubeIconUrl },
    { id: 45, name: 'Vidio', category: 'Entertainment', imageUrl: vidioIconUrl },
    { id: 46, name: 'VIU', category: 'Entertainment', imageUrl: viuIconUrl },
    { id: 47, name: 'TikTok Coins', category: 'Entertainment', imageUrl: tiktokIconUrl },
    { id: 48, name: 'Bigo Live', category: 'Entertainment', imageUrl: bigoLiveIconUrl },
    { id: 49, name: 'Webtoon Coins', category: 'Entertainment', imageUrl: webtoonIconUrl },
];

const genericReviews = [
    { id: 1, author: 'UserCepat', avatarUrl: 'https://i.pravatar.cc/40?u=user1', rating: 5, comment: 'Sangat cepat dan terpercaya, top!', date: '2024-07-21T10:00:00Z' },
    { id: 2, author: 'GamerPro', avatarUrl: 'https://i.pravatar.cc/40?u=user2', rating: 4, comment: 'Harganya oke, tapi kadang ada delay dikit.', date: '2024-07-20T15:30:00Z' },
];

export const allProductDetails: ProductDetail[] = [
    {
        id: 1, name: 'Mobile Legends', image: mobileLegendsIconUrl, bannerUrl: mlProductPageBannerUrl, category: 'Top Up Langsung', brand: 'Moonton',
        rating: 4.9, reviewsCount: 15234, type: 'topup_uid',
        coinsToEarn: 500,
        variants: [
            { id: 101, label: '86 Diamonds', price: 21700, bestValue: true },
            { id: 102, label: '172 Diamonds', price: 43400 },
            { id: 103, label: '257 Diamonds', price: 62500, strike: 65000, discPct: 4 },
            { id: 104, label: 'Twilight Pass', price: 150000, instant: true },
        ],
        fields: [
            { id: 'uid', label: 'ID Pengguna', type: 'number', required: true, placeholder: 'Masukkan ID Pengguna', helper: 'Terdiri dari 8-10 digit angka.' },
            { id: 'server', label: 'ID Server', type: 'number', required: true, placeholder: '(1234)', helper: 'Angka dalam kurung di samping ID.' },
        ],
        policy: { processingTime: '1-3 Menit', refund: 'Tidak Tersedia', operationHours: '24 Jam' },
        reviews: [
            { id: 1, author: 'Player1', avatarUrl: 'https://i.pravatar.cc/40?u=player1', rating: 5, comment: 'Prosesnya cepat banget!', date: '2024-07-20T10:00:00Z' },
            { id: 2, author: 'GamerGirl', avatarUrl: 'https://i.pravatar.cc/40?u=gamergirl', rating: 5, comment: 'Harga paling murah di sini.', date: '2024-07-19T08:00:00Z' },
        ],
        relatedProducts: [popularProducts[1], popularProducts[2]],
    },
    {
        id: 2, name: 'Free Fire', image: freeFireIconUrl, bannerUrl: ffProductPageBannerUrl, category: 'Top Up Langsung', brand: 'Garena',
        rating: 4.8, reviewsCount: 12100, type: 'topup_uid',
        coinsToEarn: 200, status: 'available',
        variants: [{ id: 201, label: '70 Diamonds', price: 10000 }, { id: 202, label: '140 Diamonds', price: 20000 }],
        fields: [{ id: 'uid', label: 'Player ID', type: 'number', required: true, placeholder: 'Masukkan Player ID' }],
        policy: { processingTime: '1-3 Menit', refund: 'Tidak Tersedia', operationHours: '24 Jam' },
        reviews: genericReviews,
        relatedProducts: [],
    },
     {
        id: 3, name: 'PUBG Mobile', image: pubgMobileIconUrl, bannerUrl: pubgProductPageBannerUrl, category: 'Top Up Langsung', brand: 'Tencent',
        rating: 4.8, reviewsCount: 11500, type: 'topup_uid',
        coinsToEarn: 150, status: 'maintenance',
        variants: [{ id: 301, label: '60 UC', price: 15000 }, { id: 302, label: '325 UC', price: 75000 }],
        fields: [{ id: 'uid', label: 'Character ID', type: 'number', required: true, placeholder: 'Masukkan Character ID' }],
        policy: { processingTime: '1-3 Menit', refund: 'Tidak Tersedia', operationHours: '24 Jam' },
        reviews: genericReviews,
        relatedProducts: [],
    },
    {
        id: 4, name: 'Genshin Impact', image: genshinImpactIconUrl, bannerUrl: genshinProductPageBannerUrl, category: 'Top Up Langsung', brand: 'HoYoverse',
        rating: 4.9, reviewsCount: 9800, type: 'topup_uid',
        coinsToEarn: 800, active: false,
        variants: [{ id: 401, label: '60 Genesis Crystals', price: 16000 }, { id: 402, label: 'Blessing of the Welkin Moon', price: 79000 }],
        fields: [
            { id: 'uid', label: 'UID', type: 'number', required: true, placeholder: 'Masukkan UID' },
            { id: 'server', label: 'Server', type: 'select', required: true, options: ['Asia', 'America', 'Europe', 'TW/HK/MO'] },
        ],
        policy: { processingTime: '1-5 Menit', refund: 'Tidak Tersedia', operationHours: '24 Jam' },
        reviews: genericReviews,
        relatedProducts: [],
    },
     {
        id: 32, name: 'Google Play Gift Code', image: googlePlayIconUrl, bannerUrl: gpGiftProductPageBannerUrl, category: 'Voucher', brand: 'Google',
        rating: 4.9, reviewsCount: 5200, type: 'voucher_code',
        coinsToEarn: 100, status: 'available',
        variants: [
            { id: 3201, label: 'Rp 20.000', price: 21000 },
            { id: 3202, label: 'Rp 50.000', price: 51000 },
            { id: 3203, label: 'Rp 100.000', price: 101000, bestValue: true },
        ],
        fields: [
            { id: 'email', label: 'Email Penerima', type: 'email', required: true, placeholder: 'Kode akan dikirim ke email ini' },
        ],
        policy: { processingTime: 'Instan', refund: 'Tidak Tersedia', operationHours: '24 Jam' },
        reviews: genericReviews, relatedProducts: [],
    },
    // Add reviews to the rest
    ...([
        { id: 5, name: 'Honkai: Star Rail', image: honkaiStarRailIconUrl, bannerUrl: hsrProductPageBannerUrl, category: 'Top Up Langsung', brand: 'HoYoverse', rating: 4.9, reviewsCount: 8500, type: 'topup_uid', coinsToEarn: 750, status: 'available', variants: [{id: 501, label: '60 Oneiric Shards', price: 16000}, {id: 502, label: 'Express Supply Pass', price: 79000}], fields: [{id: 'uid', label: 'UID', type: 'number', required: true}, {id: 'server', label: 'Server', type: 'select', required: true, options: ['Asia', 'America', 'Europe', 'TW/HK/MO']}], policy: { processingTime: '1-5 Menit', refund: 'Tidak Tersedia', operationHours: '24 Jam' }, relatedProducts: [] },
        { id: 6, name: 'Honor of Kings', image: honorOfKingsIconUrl, bannerUrl: hokProductPageBannerUrl, category: 'Top Up Langsung', brand: 'Tencent', rating: 4.7, reviewsCount: 7200, type: 'topup_uid', coinsToEarn: 300, status: 'available', variants: [{id: 601, label: '80 Tokens', price: 15000}], fields: [{id: 'uid', label: 'Player ID', type: 'number', required: true}], policy: { processingTime: '1-3 Menit', refund: 'Tidak Tersedia', operationHours: '24 Jam' }, relatedProducts: [] },
        { id: 7, name: 'Call of Duty Mobile', image: callOfDutyMobileIconUrl, bannerUrl: codmProductPageBannerUrl, category: 'Top Up Langsung', brand: 'Activision', rating: 4.8, reviewsCount: 6800, type: 'topup_uid', coinsToEarn: 400, status: 'available', variants: [{id: 701, label: '62 CP', price: 10000}], fields: [{id: 'uid', label: 'Open ID', type: 'text', required: true}], policy: { processingTime: '1-3 Menit', refund: 'Tidak Tersedia', operationHours: '24 Jam' }, relatedProducts: [] },
        { id: 9, name: 'Arena of Valor', image: arenaOfValorIconUrl, bannerUrl: aovProductPageBannerUrl, category: 'Top Up Langsung', brand: 'Garena', rating: 4.7, reviewsCount: 6500, type: 'topup_uid', coinsToEarn: 250, status: 'available', variants: [{id: 901, label: '40 Vouchers', price: 10000}], fields: [{id: 'uid', label: 'Player ID', type: 'number', required: true}], policy: { processingTime: '1-3 Menit', refund: 'Tidak Tersedia', operationHours: '24 Jam' }, relatedProducts: [] },
        { id: 15, name: 'Point Blank', image: pointBlankIconUrl, bannerUrl: pbProductPageBannerUrl, category: 'Top Up Langsung', brand: 'Zepetto', rating: 4.6, reviewsCount: 4100, type: 'topup_uid', coinsToEarn: 100, status: 'available', variants: [{id: 1501, label: '1200 PB Cash', price: 10000}], fields: [{id: 'uid', label: 'User ID', type: 'text', required: true}], policy: { processingTime: '1-5 Menit', refund: 'Tidak Tersedia', operationHours: '24 Jam' }, relatedProducts: [] },
        { id: 16, name: 'Zenless Zone Zero', image: zenlessZoneZeroIconUrl, bannerUrl: zzzProductPageBannerUrl, category: 'Baru Rilis', brand: 'HoYoverse', rating: 4.9, reviewsCount: 3500, type: 'topup_uid', coinsToEarn: 700, status: 'available', variants: [{id: 1601, label: '60 Polychromes', price: 16000}], fields: [{id: 'uid', label: 'UID', type: 'number', required: true}, {id: 'server', label: 'Server', type: 'select', required: true, options: ['Asia', 'America', 'Europe', 'TW/HK/MO']}], policy: { processingTime: '1-5 Menit', refund: 'Tidak Tersedia', operationHours: '24 Jam' }, relatedProducts: [] },
        { id: 17, name: 'Wuthering Waves', image: wutheringWavesIconUrl, bannerUrl: wuwaProductPageBannerUrl, category: 'Baru Rilis', brand: 'Kuro Games', rating: 4.8, reviewsCount: 4200, type: 'topup_uid', coinsToEarn: 650, status: 'available', variants: [{id: 1701, label: '60 Astrite', price: 15000}], fields: [{id: 'uid', label: 'UID', type: 'number', required: true}, {id: 'server', label: 'Server', type: 'select', required: true, options: ['SEA', 'Asia', 'America', 'Europe']}], policy: { processingTime: '1-5 Menit', refund: 'Tidak Tersedia', operationHours: '24 Jam' }, relatedProducts: [] },
        { id: 18, name: 'Warzone Mobile', image: warzoneMobileIconUrl, bannerUrl: warzoneProductPageBannerUrl, category: 'Baru Rilis', brand: 'Activision', rating: 4.7, reviewsCount: 2800, type: 'topup_uid', coinsToEarn: 450, status: 'available', variants: [{id: 1801, label: '200 CP', price: 30000}], fields: [{id: 'uid', label: 'Activision ID', type: 'text', required: true}], policy: { processingTime: '1-3 Menit', refund: 'Tidak Tersedia', operationHours: '24 Jam' }, relatedProducts: [] },
        { id: 34, name: 'Steam Wallet Code', image: steamIconUrl, bannerUrl: steamWalletProductPageBannerUrl, category: 'Voucher', brand: 'Valve', rating: 4.9, reviewsCount: 8800, type: 'voucher_code', coinsToEarn: 120, status: 'available', variants: [{id: 3401, label: 'Rp 12.000', price: 13500}], fields: [{id: 'email', label: 'Email Penerima', type: 'email', required: true}], policy: { processingTime: 'Instan', refund: 'Tidak Tersedia', operationHours: '24 Jam' }, relatedProducts: [] },
        { id: 42, name: 'Netflix Gift Card', image: netflixIconUrl, bannerUrl: netflixProductPageBannerUrl, category: 'Entertainment', brand: 'Netflix', rating: 4.9, reviewsCount: 6100, type: 'voucher_code', coinsToEarn: 150, status: 'available', variants: [{id: 4201, label: 'Langganan 1 Bulan', price: 120000}], fields: [{id: 'email', label: 'Email Penerima', type: 'email', required: true}], policy: { processingTime: 'Instan', refund: 'Tidak Tersedia', operationHours: '24 Jam' }, relatedProducts: [] },
        { id: 35, name: 'Garena Shells', image: garenaIconUrl, bannerUrl: garenaProductPageBannerUrl, category: 'Voucher', brand: 'Garena', rating: 4.8, reviewsCount: 9200, type: 'voucher_code', coinsToEarn: 100, status: 'available', variants: [{id: 3501, label: '33 Shells', price: 10000}], fields: [{id: 'email', label: 'Email Penerima', type: 'email', required: true}], policy: { processingTime: 'Instan', refund: 'Tidak Tersedia', operationHours: '24 Jam' }, relatedProducts: [] },
    ] as Omit<ProductDetail, 'reviews'>[]).map(p => ({ ...p, reviews: genericReviews }))
];