
import React, { useState } from 'react';
import { ProductDetail, CoinBalance, PaymentCategory, ProductVariant, FormField, CheckoutData } from '../types';
import {
    ChevronLeftIcon,
    ShareIcon,
    ChatBubbleLeftEllipsisIcon,
    StarIcon,
    NexusCoinLogoIcon,
    CheckIcon,
    InformationCircleIcon,
    ShieldCheckIcon,
    UserIcon,
    ClockIcon,
} from './icons';
import CheckoutActionBar from './CheckoutActionBar';
import ProductCard from './ProductCard';
import { formatDateOnlyShort } from '../src/lib/time';

interface ProductDetailPageProps {
    product: ProductDetail;
    onBack: () => void;
    isLoggedIn: boolean;
    coinBalance: CoinBalance;
    paymentCategories: PaymentCategory[];
    showLoginModal: () => void;
    showToast: (message: string, type: 'success' | 'error') => void;
    onProceedToCheckout: (data: CheckoutData) => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
    <section className={`bg-gray-800 border border-gray-700 rounded-xl ${className}`}>
        <h2 className="text-lg font-bold text-white p-4 border-b border-gray-700">{title}</h2>
        <div className="p-4">
            {children}
        </div>
    </section>
);

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
    product,
    onBack,
    isLoggedIn,
    coinBalance,
    paymentCategories,
    showLoginModal,
    showToast,
    onProceedToCheckout
}) => {
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(product.variants.find(v => v.bestValue) || product.variants[0] || null);
    const [formValues, setFormValues] = useState<Record<string, string>>({});
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    
    const total = selectedVariant?.price || 0;
    
    const isFormValid = React.useMemo(() => {
        return product.fields.every(field => {
            if (!field.required) return true;
            return !!formValues[field.id]?.trim();
        });
    }, [formValues, product.fields]);

    const validate = () => {
        const errors: Record<string, string> = {};
        let isValid = true;
        product.fields.forEach(field => {
            if (field.required && !formValues[field.id]?.trim()) {
                errors[field.id] = `${field.label} wajib diisi.`;
                isValid = false;
            }
        });
        setFormErrors(errors);
        return isValid;
    };

    const handleBuyNow = () => {
        if (!isLoggedIn) {
            showLoginModal();
            return;
        }
        if (validate()) {
            if (!selectedVariant) {
                showToast('Harap pilih paket terlebih dahulu.', 'error');
                return;
            }
            onProceedToCheckout({
                product,
                variant: selectedVariant,
                formValues,
                quantity: 1,
            });
        } else {
            showToast('Harap isi semua data yang diperlukan.', 'error');
        }
    };
    
     const handleInputChange = (fieldId: string, value: string) => {
        setFormValues(prev => ({ ...prev, [fieldId]: value }));
        if (formErrors[fieldId]) {
            setFormErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[fieldId];
                return newErrors;
            });
        }
    };

    const renderFormField = (field: FormField) => {
        const commonClasses = `w-full h-12 px-4 bg-gray-700 border-2 text-white rounded-lg focus:ring-2 focus:ring-[#38BDF8] focus:outline-none ${formErrors[field.id] ? 'border-red-500' : 'border-gray-600'}`;
        switch (field.type) {
            case 'select':
                return (
                    <select
                        id={field.id}
                        value={formValues[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className={commonClasses}
                    >
                        <option value="" disabled>{field.placeholder || `Pilih ${field.label}`}</option>
                        {field.options?.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                );
            case 'text':
            case 'number':
            default:
                return (
                    <input
                        type={field.type}
                        id={field.id}
                        value={formValues[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className={commonClasses}
                    />
                );
        }
    };
    
    return (
        <div className="pt-16 md:pt-20 bg-gray-900 min-h-screen">
            {/* Page-specific Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 h-16 md:h-20 border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full relative">
                    <button onClick={onBack} className="absolute left-4 p-2 rounded-full hover:bg-gray-700">
                        <ChevronLeftIcon className="w-6 h-6 text-white" />
                    </button>
                    <h1 className="text-lg font-bold text-white text-center w-full truncate px-12">{product.name}</h1>
                    <div className="absolute right-4 flex space-x-2">
                        <button className="p-2 rounded-full hover:bg-gray-700"><ShareIcon className="w-6 h-6 text-white" /></button>
                        <button className="p-2 rounded-full hover:bg-gray-700"><ChatBubbleLeftEllipsisIcon className="w-6 h-6 text-white" /></button>
                    </div>
                </div>
            </header>

            <main className="max-w-xl mx-auto px-4 pb-4 space-y-4 pb-44">
                {/* 1. Hero Area */}
                <section className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex space-x-4">
                    <img src={product.image} alt={product.name} className="w-24 h-24 rounded-lg object-cover" />
                    <div className="flex-1">
                        <h1 className="text-xl font-extrabold text-white">{product.name}</h1>
                        <p className="text-sm text-gray-400">{product.brand}</p>
                        <div className="flex items-center space-x-2 mt-2">
                            <StarIcon className="w-5 h-5 text-yellow-400" />
                            <span className="font-bold text-white">{product.rating}</span>
                            <span className="text-sm text-gray-400">({product.reviewsCount.toLocaleString('id-ID')} ulasan)</span>
                        </div>
                    </div>
                </section>
                
                {/* 2. Price & Promo */}
                <section className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                    <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-extrabold text-[#7F1DFF]">{selectedVariant ? `Rp${selectedVariant.price.toLocaleString('id-ID')}` : 'Pilih Paket'}</span>
                        {selectedVariant?.strike && <span className="text-base text-gray-500 line-through">Rp{selectedVariant.strike.toLocaleString('id-ID')}</span>}
                        {selectedVariant?.discPct && <span className="px-2 py-0.5 text-xs font-bold bg-[#FF4D4D] text-white rounded-full">-{selectedVariant.discPct}%</span>}
                    </div>
                     <div className="mt-2 text-sm p-2 bg-green-900/50 rounded-md text-green-300 font-semibold flex items-center space-x-2">
                        <NexusCoinLogoIcon className="h-[60px] w-auto" />
                        <span>Dapat +{product.coinsToEarn.toLocaleString('id-ID')} Nexus Coins</span>
                    </div>
                </section>

                {/* 3. Variants */}
                <Section title="Pilih Paket/Denominasi">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {product.variants.map(variant => {
                            const isSelected = selectedVariant?.id === variant.id;
                            return (
                                <button
                                    key={variant.id}
                                    onClick={() => setSelectedVariant(variant)}
                                    className={`relative text-left p-3 border-2 rounded-xl transition-all ${isSelected ? 'border-[#7F1DFF] bg-purple-900/50' : 'border-gray-700 bg-gray-800 hover:border-gray-500'}`}
                                >
                                    {variant.bestValue && <div className="absolute -top-2.5 right-3 text-xs font-bold px-2 py-0.5 rounded-full text-white bg-orange-500">Best Value</div>}
                                    {isSelected && <div className="absolute top-2 left-2 w-5 h-5 bg-[#7F1DFF] rounded-full flex items-center justify-center text-white"><CheckIcon className="w-3.5 h-3.5" /></div>}
                                    <p className="font-bold text-sm text-white">{variant.label}</p>
                                    <p className="text-xs text-gray-400 mt-1">Rp{variant.price.toLocaleString('id-ID')}</p>
                                </button>
                            );
                        })}
                    </div>
                </Section>
                
                {/* 4. Identity Form */}
                <Section title="Lengkapi Data">
                    <div className="space-y-4">
                        {product.fields.map(field => (
                            <div key={field.id}>
                                <label htmlFor={field.id} className="block text-sm font-bold text-white mb-1.5">{field.label}</label>
                                {renderFormField(field)}
                                {field.helper && <p className="text-xs text-gray-400 mt-1 flex items-center space-x-1"><InformationCircleIcon className="w-3.5 h-3.5 text-white"/><span>{field.helper}</span></p>}
                                {formErrors[field.id] && <p className="text-xs text-red-400 mt-1">{formErrors[field.id]}</p>}
                            </div>
                        ))}
                    </div>
                </Section>

                {/* 5. Security & Guarantee */}
                 <div className="flex justify-around text-xs text-gray-400 text-center p-2">
                    <span className="flex items-center space-x-1"><ShieldCheckIcon className="w-4 h-4 text-green-500" /><span>Proses Instan</span></span>
                    <span className="flex items-center space-x-1"><UserIcon className="w-4 h-4 text-green-500" /><span>Layanan Resmi</span></span>
                    <span className="flex items-center space-x-1"><ClockIcon className="w-4 h-4 text-green-500" /><span>Online 24 Jam</span></span>
                 </div>

                {/* 6. Reviews */}
                <Section title={`Ulasan & Penilaian (${product.reviewsCount.toLocaleString('id-ID')})`}>
                    <div className="space-y-4">
                        {product.reviews.map(review => (
                             <div key={review.id} className="flex space-x-3">
                                <img src={review.avatarUrl} alt={review.author} className="w-10 h-10 rounded-full" />
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <span className="font-bold text-sm text-white">{review.author}</span>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`} />)}
                                        </div>
                                    </div>
                                    <p className="text-sm mt-1 text-gray-200">{review.comment}</p>
                                    <p className="text-xs text-gray-500 mt-1">{formatDateOnlyShort(review.date)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                 {/* 7. Related Products */}
                <section>
                    <h2 className="text-lg font-bold text-white mb-3">Produk Terkait</h2>
                    <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
                       {product.relatedProducts.map(p => (
                           <div key={p.id} className="w-40 flex-shrink-0">
                               <ProductCard product={p} />
                           </div>
                       ))}
                    </div>
                </section>
            </main>
            
            <CheckoutActionBar
                total={total}
                buttonText="Beli Sekarang"
                onClick={handleBuyNow}
                disabled={!selectedVariant || !isFormValid}
                showBottomNavBar={true}
            />
        </div>
    );
};

export default ProductDetailPage;