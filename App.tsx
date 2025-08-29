// FIX: Import `useMemo` from React to resolve 'Cannot find name' error.
import React, { useState, useEffect, useCallback, useMemo } from 'react';
// FIX: Import `FlashSaleProduct` type to resolve 'Cannot find name' error.
import { Product, NewsArticle, TransactionDetail, Mission, CoinBalance, CoinTransaction, CoinPackage, PaymentCategory, ProductDetail, CheckoutData, PaymentMethod, ProductVariant, Promo, User, PendingPaymentData, ReconciliationRun, WebhookLog, WebhookJob, Page, FlashSaleProduct } from '../types.ts';
import Header from './Header.tsx';
import CategoryChips from './CategoryChips.tsx';
import ProductSection from './ProductSection.tsx';
import SuggestionCard from './SuggestionCard.tsx';
import NewsSection from './NewsSection.tsx';
import Footer from './Footer.tsx';
import ScrollToTopButton from './ScrollToTopButton.tsx';
import BottomNavBar from './BottomNavBar.tsx';
import LoginModal from './LoginModal.tsx';
import AccountPage from './AccountPage.tsx';
import TransactionsPage from './TransactionsPage.tsx';
import TransactionDetailPage from './TransactionDetailPage.tsx';
import Toast from './Toast.tsx';
import { FireIcon, SparklesIcon, ChatBubbleLeftEllipsisIcon, BanknotesIcon, CreditCardIcon, QrCodeIcon, WalletIcon } from './icons/index.tsx';
import GiftPage from './GiftPage.tsx';
import CoinsWalletPage from './CoinsWalletPage.tsx';
import CheckoutPage from './CheckoutPage.tsx';
import TopUpCoinsPage from './TopUpCoinsPage.tsx';
import UnifiedProductPage from './UnifiedProductPage.tsx';
import ChatWidget from './ChatWidget.tsx';
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
} from './ImageAssets.ts';
import BannerSlider from './BannerSlider.tsx';
import PromoPage from './PromoPage.tsx';
import ProductEmptyStatePage from './ProductEmptyStatePage.tsx';
import AdminPage from './admin/AdminPage.tsx';
import AccessDeniedPage from './AccessDeniedPage.tsx';

import MLProductPage from './MLProductPage.tsx';
import FFProductPage from './FFProductPage.tsx';
import PUBGProductPage from './PUBGProductPage.tsx';
import GenshinProductPage from './GenshinProductPage.tsx';
import HSRProductPage from './HSRProductPage.tsx';
import HOKProductPage from './HOKProductPage.tsx';
import CODMProductPage from './CODMProductPage.tsx';
import AOVProductPage from './AOVProductPage.tsx';
import PBProductPage from './PBProductPage.tsx';
import ZZZProductPage from './ZZZProductPage.tsx';
import WZMProductPage from './WZMProductPage.tsx';
import WuWaProductPage from './WuWaProductPage.tsx';
import GPGiftProductPage from './GPGiftProductPage.tsx';
import SteamWalletProductPage from './SteamWalletProductPage.tsx';
import NetflixGiftProductPage from './NetflixGiftProductPage.tsx';
import GarenaProductPage from './GarenaProductPage.tsx';
import PaymentInstructionPage from './PaymentInstructionPage.tsx';
import FlashSale from './FlashSale.tsx';
import { allProductDetails, flashSaleProducts, popularProducts, newReleaseProducts, voucherProducts, entertainmentProducts, newsArticles, mockTransactionDetails, mockMissions, mockHardMissions, mockCoinBalance, mockCoinHistory, mockCoinPackages, mockPromos, mockReconciliationRuns, mockWebhookLogs, initialWebhookJobs, mockUser, initialPaymentCategories } from './MockData.ts';

import { useObservability } from '../src/lib/obs/ObservabilityContext.tsx';
import { setSentryUser, setSentryTags } from '../src/lib/obs/sentry.client.ts';
import { incrementCounter } from '../src/lib/obs/metrics.ts';


const productPageMap: Record<number, React.FC<any>> = {
  1: MLProductPage,
  2: FFProductPage,
  3: PUBGProductPage,
  4: GenshinProductPage,
  5: HSRProductPage,
  6: HOKProductPage,
  7: CODMProductPage,
  9: AOVProductPage,
  15: PBProductPage,
  16: ZZZProductPage,
  18: WZMProductPage,
  17: WuWaProductPage,
  32: GPGiftProductPage,
  34: SteamWalletProductPage,
  42: NetflixGiftProductPage,
  35: GarenaProductPage,
};


const App: React.FC = () => {
    const { logger, startNewInteraction } = useObservability();

    const [page, setPage] = useState<Page>('home');
    const [user, setUser] = useState<User>({ isLoggedIn: false, roles: [] });
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [activeProductDetail, setActiveProductDetail] = useState<ProductDetail | null>(null);
    const [activeTransactionId, setActiveTransactionId] = useState<string | null>(null);
    const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
    const [pendingPayment, setPendingPayment] = useState<PendingPaymentData | null>(null);
    const [isChatOpen, setChatOpen] = useState(false);
    const [claimedPromos, setClaimedPromos] = useState<number[]>([]);

    const showToast = useCallback((message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        if (type === 'error') {
            logger.warn('toast_shown', { message, type });
        }
    }, [logger]);

    const handleLogin = (isSuccess: boolean) => {
        if (isSuccess) {
            setUser(mockUser);
            setLoginModalOpen(false);
            showToast('Login berhasil!', 'success');
            logger.info('user_login_success', { userId: mockUser.id });
            setSentryUser({ id: mockUser.id, email: mockUser.email });
        } else {
            showToast('Login gagal, coba lagi.', 'error');
            logger.error('user_login_failed');
        }
    };
    
    const handleLogout = () => {
        logger.info('user_logout', { userId: user.id });
        setUser({ isLoggedIn: false, roles: [] });
        setSentryUser(null); // Clear Sentry user
        setPage('home');
        showToast('Logout berhasil.', 'success');
    };

    const handleNavigate = useCallback((newPage: Page) => {
        startNewInteraction(); // Generate new requestId for new navigation
        logger.info('page_view', { page: newPage });
        if (newPage === 'admin' && !user.roles.some(role => ["admin", "dev", "ops", "cs", "finance", "content"].includes(role))) {
            logger.warn('access_denied', { page: 'admin', userRoles: user.roles });
            setPage('accessDenied');
            return;
        }
        setPage(newPage);
        window.scrollTo(0, 0);
    }, [user.roles, logger, startNewInteraction]);

    const handleProductClick = useCallback((product: Product) => {
        const productDetail = allProductDetails.find(p => p.id === product.id);
        logger.info('product_click', { productId: product.id, productName: product.name });
        if (productDetail) {
            setActiveProductDetail(productDetail);
            setPage('productDetail');
        } else {
            logger.error('product_detail_not_found', { productId: product.id });
            showToast('Detail produk tidak ditemukan.', 'error');
        }
        window.scrollTo(0, 0);
    }, [showToast, logger]);

    const handleViewTransactionDetail = useCallback((id: string) => {
        setActiveTransactionId(id);
        setPage('transactionDetail');
        window.scrollTo(0, 0);
    }, []);
    
    const handleProceedToCheckout = useCallback((data: CheckoutData) => {
        setCheckoutData(data);
        setPage('checkout');
        window.scrollTo(0, 0);
        logger.info('checkout_started', {
            productId: data.product.id,
            productName: data.product.name,
            variantId: data.variant.id,
            variantLabel: data.variant.label,
            price: data.variant.price,
        });
    }, [logger]);

    const handlePurchase = (details: { finalTotal: number; coinsUsed: number; paymentMethod: PaymentMethod | null; promoDiscount: number; adminFee: number; ewalletPhoneNumber?: string; }) => {
        if (!checkoutData || !details.paymentMethod) return;

        const orderId = `NXS-${Date.now()}`;
        
        logger.info('order_created', { 
            orderId,
            productId: checkoutData.product.id,
            variantId: checkoutData.variant.id,
            price: checkoutData.variant.price,
            paymentChannel: details.paymentMethod.name,
            provider: details.paymentMethod.provider,
            total: details.finalTotal,
            coinsUsed: details.coinsUsed,
            promoDiscount: details.promoDiscount,
        });

        incrementCounter('payment_channel_status_total', {
            channel: details.paymentMethod.id,
            provider: details.paymentMethod.provider,
            status: 'pending'
        });

        setSentryTags({ orderId, paymentChannel: details.paymentMethod.id });

        const isEwalletPull = details.paymentMethod.id.startsWith('ewallet_');

        const newPaymentData: PendingPaymentData = {
            orderId: orderId,
            total: details.finalTotal,
            paymentMethod: details.paymentMethod,
            expireAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
            productName: checkoutData.product.name,
            productImage: checkoutData.product.image,
            ewalletPhoneNumber: isEwalletPull ? details.ewalletPhoneNumber : undefined,
            vaNumber: details.paymentMethod.id.startsWith('va_') ? String(Math.floor(Math.random() * 1000000000000)) : undefined,
            qrCodeUrl: details.paymentMethod.id.startsWith('qris') ? 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=example' : undefined,
        };
        
        setPendingPayment(newPaymentData);
        setPage('paymentInstruction');
        window.scrollTo(0, 0);
    };

    const handleTopUpCoinsPurchase = (pkg: CoinPackage, total: number) => {
        const paymentMethod = initialPaymentCategories.flat().flatMap(c => c.methods).find(m => m.id === 'qris_all');
        if (!paymentMethod) return;

        const orderId = `NXS-COINS-${Date.now()}`;
        logger.info('order_created', {
            orderId,
            productId: `coins_${pkg.id}`,
            productName: 'Nexus Coins',
            variantLabel: `${pkg.amount} Coins`,
            price: pkg.price,
            total: total,
            paymentChannel: paymentMethod.name,
            provider: paymentMethod.provider,
        });

        incrementCounter('payment_channel_status_total', {
            channel: paymentMethod.id,
            provider: paymentMethod.provider,
            status: 'pending'
        });
        
        setSentryTags({ orderId });

        const newPaymentData: PendingPaymentData = {
            orderId: orderId,
            total: total,
            paymentMethod: paymentMethod,
            expireAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
            productName: `${pkg.amount.toLocaleString('id-ID')} Nexus Coins`,
            productImage: 'https://i.imgur.com/34IciiU.png',
            qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=example'
        };
        setPendingPayment(newPaymentData);
        setPage('paymentInstruction');
    };

    const handleClaimPromo = (promo: Promo) => {
        setClaimedPromos(prev => [...prev, promo.id]);
        showToast(`Promo "${promo.title}" berhasil diklaim!`, 'success');
        logger.info('promo_claimed', { promoId: promo.id, promoTitle: promo.title });
    };

    const handleCategorySelect = (category: string) => {
        const elementId = {
            'Lagi Populer': 'lagi-populer',
            'Top Up Langsung': 'top-up-langsung', 
            'Baru Rilis': 'baru-rilis',
            'Voucher': 'voucher',
            'Entertainment': 'entertainment'
        }[category];
        
        if (elementId) {
            const element = document.getElementById(elementId);
            element?.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    const renderPage = () => {
        switch (page) {
            case 'home':
                return (
                    <div className="space-y-6">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <BannerSlider />
                        </div>
                        <FlashSale products={flashSaleProducts} />
                        <CategoryChips onCategorySelect={handleCategorySelect} />
                        <div className="px-4 sm:px-6 lg:px-8 space-y-12">
                            <ProductSection id="lagi-populer" title="Lagi Populer" products={popularProducts} icon={<FireIcon className="w-6 h-6 text-red-500" />} onProductClick={handleProductClick} />
                            <ProductSection id="baru-rilis" title="Baru Rilis" products={newReleaseProducts} icon={<SparklesIcon className="w-6 h-6 text-yellow-400" />} onProductClick={handleProductClick} />
                            <SuggestionCard />
                            <ProductSection id="voucher" title="Voucher" products={voucherProducts} onProductClick={handleProductClick} />
                            <ProductSection id="entertainment" title="Entertainment" products={entertainmentProducts} onProductClick={handleProductClick} />
                            <NewsSection articles={newsArticles} />
                        </div>
                        <Footer />
                    </div>
                );
            case 'account':
                return <AccountPage onLogout={handleLogout} user={user} showToast={showToast} />;
            case 'transactions':
                return <TransactionsPage transactions={mockTransactionDetails} onViewDetail={handleViewTransactionDetail} />;
            case 'transactionDetail':
                const transaction = mockTransactionDetails.find(tx => tx.id === activeTransactionId);
                return transaction ? <TransactionDetailPage transaction={transaction} onBack={() => handleNavigate('transactions')} showToast={showToast} /> : <div>Transaction Not Found</div>;
            case 'promo':
                return <PromoPage promos={mockPromos} isLoggedIn={user.isLoggedIn} onLoginRequest={() => setLoginModalOpen(true)} showToast={showToast} claimedPromoIds={claimedPromos} onClaimPromo={handleClaimPromo} />;
            case 'hadiahku':
                return <GiftPage missions={mockMissions} hardMissions={mockHardMissions} isLoggedIn={user.isLoggedIn} />;
            case 'coins':
                return <CoinsWalletPage balance={mockCoinBalance} history={mockCoinHistory} onBack={() => handleNavigate('home')} onGoToTopUp={() => handleNavigate('topupCoins')} />;
            case 'topupCoins':
                return <TopUpCoinsPage balance={mockCoinBalance} packages={mockCoinPackages} paymentCategories={initialPaymentCategories} onBack={() => handleNavigate('coins')} onPurchase={handleTopUpCoinsPurchase} />;
            case 'checkout':
                return checkoutData ? <CheckoutPage checkoutData={checkoutData} coinBalance={mockCoinBalance} paymentCategories={initialPaymentCategories} onBack={() => handleNavigate('productDetail')} onPurchase={handlePurchase} isLoggedIn={user.isLoggedIn} showLoginModal={() => setLoginModalOpen(true)} showToast={showToast}/> : <div>Checkout Data Missing</div>;
            case 'productDetail':
                if (activeProductDetail) {
                    const SpecificProductPage = productPageMap[activeProductDetail.id];
                     if (activeProductDetail.status && activeProductDetail.status !== 'available') {
                        return <ProductEmptyStatePage type={activeProductDetail.status} productName={activeProductDetail.name} onBack={() => handleNavigate('home')} onNavigateHome={() => handleNavigate('home')} onHelp={() => setChatOpen(true)} />;
                    }
                    if (SpecificProductPage) {
                        return <SpecificProductPage product={activeProductDetail} paymentCategories={initialPaymentCategories} onProceedToCheckout={handleProceedToCheckout} showToast={showToast} onBack={() => handleNavigate('home')} />;
                    }
                    // Fallback to UnifiedProductPage if no specific page is mapped but it's available
                    return <UnifiedProductPage product={activeProductDetail} paymentCategories={initialPaymentCategories} onProceedToCheckout={handleProceedToCheckout} showToast={showToast} onBack={() => handleNavigate('home')} />;
                }
                return <div>Product Not Found</div>;
            case 'paymentInstruction':
                return pendingPayment ? <PaymentInstructionPage paymentData={pendingPayment} onBackToHome={() => handleNavigate('home')} showToast={showToast} /> : <div>Payment Data Missing</div>;
            case 'admin':
                return <AdminPage user={user} onNavigateHome={() => handleNavigate('home')} showToast={showToast} reconciliationRuns={mockReconciliationRuns} webhookLogs={mockWebhookLogs} webhookJobs={initialWebhookJobs} onWebhookJobAction={()=>{}} paymentCategories={initialPaymentCategories} onToggleChannelStatus={()=>{}} />;
            case 'accessDenied':
                return <AccessDeniedPage onGoHome={() => handleNavigate('home')} />;
            default:
                return <div>Page not found</div>;
        }
    };
    
    return (
        <div className="bg-gray-900 min-h-screen text-white font-sans">
            {page !== 'admin' && <Header user={user} coinBalance={mockCoinBalance} onLoginClick={() => setLoginModalOpen(true)} onAvatarClick={() => handleNavigate('account')} onCoinsClick={() => handleNavigate('coins')} />}
            <main className={page !== 'admin' ? "pt-16 md:pt-20" : ""}>
                {renderPage()}
            </main>

            {isLoginModalOpen && <LoginModal onClose={() => setLoginModalOpen(false)} onLogin={handleLogin} />}
            
            <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />

            <ScrollToTopButton />
            
            {page !== 'admin' && <BottomNavBar activePage={page} onNavigate={(p) => handleNavigate(p as Page)} user={user} />}

             <ChatWidget isOpen={isChatOpen} onClose={() => setChatOpen(false)} />
            
            {page !== 'admin' && !isChatOpen && (
                <button
                  onClick={() => setChatOpen(true)}
                  className="fixed bottom-24 right-4 md:bottom-6 md:right-6 w-16 h-16 rounded-full bg-gradient-to-br from-[#7F1DFF] to-[#38BDF8] text-white flex items-center justify-center shadow-lg transition-all duration-300 z-50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#38BDF8]"
                  aria-label="Open Chat"
                >
                  <ChatBubbleLeftEllipsisIcon className="w-8 h-8" />
                </button>
            )}
        </div>
    );
};
// FIX: Add default export to the App component.
export default App;