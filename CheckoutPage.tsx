

import React, { useState, useEffect } from 'react';
import { CheckoutData, CoinBalance, PaymentCategory, PaymentMethod } from '../types.ts';
import { ChevronLeftIcon, ChatBubbleLeftEllipsisIcon, CoinIcon, ChevronDownIcon, CheckIcon } from './icons/index.tsx';
import CheckoutActionBar from './CheckoutActionBar.tsx';
import PaymentMethodSelection from './PaymentMethodSelection.tsx';
import FallbackConfirmationModal from './FallbackConfirmationModal.tsx';
import { calculateChannelScore } from './paymentUtils.ts';

interface CheckoutPageProps {
    checkoutData: CheckoutData;
    coinBalance: CoinBalance;
    paymentCategories: PaymentCategory[];
    onBack: () => void;
    onPurchase: (purchaseDetails: { finalTotal: number; coinsUsed: number; paymentMethod: PaymentMethod | null; promoDiscount: number; adminFee: number; ewalletPhoneNumber?: string; }) => void;
    isLoggedIn: boolean;
    showLoginModal: () => void;
    showToast: (message: string, type: 'success' | 'error') => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="bg-gray-800 border border-gray-700 rounded-xl">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-4">
                <h2 className="text-lg font-bold text-white">{title}</h2>
                <ChevronDownIcon className={`w-5 h-5 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && <div className="p-4 border-t border-gray-700">{children}</div>}
        </div>
    );
};

const CheckoutPage: React.FC<CheckoutPageProps> = ({
    checkoutData,
    coinBalance,
    paymentCategories,
    onBack,
    onPurchase,
    isLoggedIn,
    showLoginModal,
    showToast
}) => {
    const { product, variant, formValues, quantity } = checkoutData;
    const [promoCode, setPromoCode] = useState('');
    const [promoDiscount, setPromoDiscount] = useState(0);
    const [useCoins, setUseCoins] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(checkoutData.selectedPaymentMethod || null);
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    const [fallbackSuggestion, setFallbackSuggestion] = useState<{ from: PaymentMethod, to: PaymentMethod } | null>(null);
    const [ewalletPhoneNumber, setEwalletPhoneNumber] = useState('');

    useEffect(() => {
        if (!isLoggedIn) {
            setUseCoins(false);
        }
    }, [isLoggedIn]);

    const summary = React.useMemo(() => {
        const subtotal = variant.price * quantity;
        const adminFee = selectedPaymentMethod
            ? Math.round(selectedPaymentMethod.fee.flat + subtotal * (selectedPaymentMethod.fee.percent / 100))
            : 0;
        const totalBeforeCoins = subtotal + adminFee - promoDiscount;
        const coinsToUse = useCoins ? Math.min(coinBalance.available, totalBeforeCoins) : 0;
        const finalTotal = totalBeforeCoins - coinsToUse;
        
        return {
            subtotal,
            adminFee,
            promoDiscount,
            coinsUsed: coinsToUse,
            finalTotal
        };
    }, [variant, quantity, selectedPaymentMethod, promoDiscount, useCoins, coinBalance.available]);

    const { subtotal } = summary;

    useEffect(() => {
        if (selectedPaymentMethod && selectedPaymentMethod.status !== 'online') {
            const availableMethods = paymentCategories.flatMap(cat => cat.methods).filter(m => m.status === 'online');
            
            if (availableMethods.length === 0) {
                showToast(`Channel ${selectedPaymentMethod.name} sedang gangguan dan tidak ada alternatif.`, 'error');
                setSelectedPaymentMethod(null);
                return;
            }
    
            const scoredMethods = availableMethods.map(method => ({
                method,
                score: calculateChannelScore(method, subtotal, availableMethods)
            }));
    
            const bestAlternative = scoredMethods.sort((a, b) => b.score - a.score)[0].method;
            
            if (bestAlternative && bestAlternative.id !== selectedPaymentMethod.id) {
                setFallbackSuggestion({ from: selectedPaymentMethod, to: bestAlternative });
            } else {
                 showToast(`Channel ${selectedPaymentMethod.name} sedang gangguan dan tidak ada alternatif lain yang lebih baik.`, 'error');
                 setSelectedPaymentMethod(null);
            }
        }
    }, [selectedPaymentMethod, paymentCategories, showToast, subtotal]);

    const handleAcceptFallback = () => {
        if (fallbackSuggestion) {
            setSelectedPaymentMethod(fallbackSuggestion.to);
            showToast(`Dialihkan ke ${fallbackSuggestion.to.name}.`, 'success');
        }
        setFallbackSuggestion(null);
    };

    const handleDeclineFallback = () => {
        setSelectedPaymentMethod(null);
        setPaymentModalOpen(true);
        setFallbackSuggestion(null);
    };


    const handleApplyPromo = () => {
        if (promoCode.toUpperCase() === 'MLBB10') {
            const discount = (variant.price * quantity) * 0.10;
            setPromoDiscount(discount);
            showToast('Kode promo berhasil digunakan!', 'success');
        } else {
            showToast('Kode promo tidak valid.', 'error');
        }
    };
    
    const handlePurchaseClick = () => {
        if (!isLoggedIn) {
            showLoginModal();
            return;
        }
        if (!selectedPaymentMethod) {
            showToast('Pilih metode pembayaran terlebih dahulu.', 'error');
            return;
        }
        if (selectedPaymentMethod.id.startsWith('ewallet_') && (!ewalletPhoneNumber || !/^(08)\d{8,12}$/.test(ewalletPhoneNumber))) {
            showToast('Masukkan nomor HP e-wallet yang valid (contoh: 081234567890).', 'error');
            return;
        }
        onPurchase({
            finalTotal: summary.finalTotal,
            coinsUsed: summary.coinsUsed,
            paymentMethod: selectedPaymentMethod,
            promoDiscount: summary.promoDiscount,
            adminFee: summary.adminFee,
            ewalletPhoneNumber: selectedPaymentMethod.id.startsWith('ewallet_') ? ewalletPhoneNumber : undefined,
        });
    };
    
    return (
        <>
            <div className="pt-16 md:pt-20 bg-gray-900 min-h-screen">
                <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 h-16 md:h-20 border-b border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full relative">
                        <button onClick={onBack} className="absolute left-4 p-2 rounded-full hover:bg-gray-700">
                            <ChevronLeftIcon className="w-6 h-6 text-white" />
                        </button>
                        <h1 className="text-xl font-bold text-white text-center w-full">Checkout</h1>
                        <div className="absolute right-4">
                            <button className="p-2 rounded-full hover:bg-gray-700">
                                <ChatBubbleLeftEllipsisIcon className="w-6 h-6 text-white" />
                            </button>
                        </div>
                    </div>
                </header>
                <main className="max-w-xl mx-auto p-4 space-y-4 pb-44">
                    {/* Order Details */}
                    <Section title="Detail Pesanan" defaultOpen={true}>
                        <div className="flex items-center space-x-4">
                            <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg" />
                            <div>
                                <p className="font-bold text-white">{product.name}</p>
                                <p className="text-sm text-gray-300">{variant.label} x{quantity}</p>
                            </div>
                        </div>
                    </Section>

                    {/* User Details */}
                    <Section title="Data Pengguna" defaultOpen={true}>
                        <div className="space-y-2 text-sm">
                            {Object.entries(formValues).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                    <span className="text-gray-400 capitalize">{key}</span>
                                    <span className="font-semibold text-white">{value as string}</span>
                                </div>
                            ))}
                        </div>
                    </Section>
                    
                    {/* Payment Method */}
                    <Section title="Metode Pembayaran" defaultOpen={true}>
                        <div className="bg-gray-700 rounded-lg">
                            <button onClick={() => setPaymentModalOpen(true)} className="w-full p-4 flex justify-between items-center hover:bg-gray-600/50 transition-colors">
                                <div>
                                    <p className="font-semibold text-white">{selectedPaymentMethod ? selectedPaymentMethod.name : 'Pilih Pembayaran'}</p>
                                    <p className="text-xs text-gray-400">{selectedPaymentMethod ? `Biaya Admin: Rp${summary.adminFee.toLocaleString('id-ID')}` : 'Ketuk untuk memilih'}</p>
                                </div>
                                <ChevronDownIcon className="w-5 h-5 text-white" />
                            </button>
                            {selectedPaymentMethod && selectedPaymentMethod.id.startsWith('ewallet_') && (
                                <div className="p-4 border-t border-gray-600">
                                    <label htmlFor="ewallet-phone" className="text-sm font-semibold text-white mb-2 block">Nomor HP E-Wallet</label>
                                    <input
                                        id="ewallet-phone"
                                        type="tel"
                                        value={ewalletPhoneNumber}
                                        onChange={(e) => setEwalletPhoneNumber(e.target.value.replace(/\D/g, ''))}
                                        placeholder="Contoh: 081234567890"
                                        className="w-full h-12 px-4 bg-gray-800 border-2 border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#38BDF8] focus:outline-none"
                                    />
                                </div>
                            )}
                        </div>
                    </Section>

                    {/* Promo Code */}
                    <Section title="Gunakan Promo" defaultOpen={false}>
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                placeholder="Masukkan Kode Promo"
                                className="flex-1 h-12 px-4 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#38BDF8] focus:outline-none"
                            />
                            <button onClick={handleApplyPromo} className="h-12 px-5 font-bold bg-gray-600 text-white rounded-lg hover:bg-gray-500">Gunakan</button>
                        </div>
                    </Section>
                    
                     {/* Nexus Coins */}
                    <Section title="Gunakan Nexus Coins" defaultOpen={true}>
                         <label className="w-full p-4 bg-gray-700 rounded-lg flex justify-between items-center cursor-pointer">
                            <div>
                                <p className="font-semibold text-white">Saldo: {coinBalance.available.toLocaleString('id-ID')} NX</p>
                                <p className="text-xs text-gray-400">Gunakan koin untuk dapatkan potongan harga.</p>
                            </div>
                            <div className="relative">
                                <input type="checkbox" checked={useCoins} onChange={(e) => setUseCoins(e.target.checked)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-[#38BDF8] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7F1DFF]"></div>
                            </div>
                        </label>
                    </Section>

                    {/* Rincian Biaya */}
                    <div className="space-y-2 text-sm pt-4">
                        <div className="flex justify-between"><span className="text-gray-400">Harga Produk</span><span className="text-white">Rp{summary.subtotal.toLocaleString('id-ID')}</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">Biaya Admin</span><span className="text-white">Rp{summary.adminFee.toLocaleString('id-ID')}</span></div>
                        {summary.promoDiscount > 0 && <div className="flex justify-between"><span className="text-green-400">Diskon Promo</span><span className="text-green-400">-Rp{summary.promoDiscount.toLocaleString('id-ID')}</span></div>}
                        {summary.coinsUsed > 0 && <div className="flex justify-between"><span className="text-green-400">Potongan Koin</span><span className="text-green-400">-Rp{summary.coinsUsed.toLocaleString('id-ID')}</span></div>}
                    </div>
                </main>
                
                <CheckoutActionBar
                    total={summary.finalTotal}
                    buttonText="Bayar Sekarang"
                    onClick={handlePurchaseClick}
                    disabled={!selectedPaymentMethod}
                    showBottomNavBar={true}
                />
            </div>
            {isPaymentModalOpen && (
                <PaymentMethodSelection
                    paymentCategories={paymentCategories}
                    subtotal={summary.subtotal}
                    onClose={() => setPaymentModalOpen(false)}
                    onSelect={(method) => {
                        setSelectedPaymentMethod(method);
                        setPaymentModalOpen(false);
                    }}
                />
            )}
            {fallbackSuggestion && (
                <FallbackConfirmationModal
                    from={fallbackSuggestion.from}
                    to={fallbackSuggestion.to}
                    subtotal={(variant.price * quantity)}
                    onConfirm={handleAcceptFallback}
                    onChooseAnother={handleDeclineFallback}
                />
            )}
        </>
    );
};

export default CheckoutPage;