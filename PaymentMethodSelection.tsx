

import React, { useState } from 'react';
import { PaymentCategory, PaymentMethod } from '../types.ts';
import { XMarkIcon, SearchIcon, CheckBadgeIcon, CheckIcon } from './icons/index.tsx';
import { calculateChannelScore } from './paymentUtils.ts';

interface PaymentMethodSelectionProps {
    paymentCategories: PaymentCategory[];
    subtotal: number;
    onClose: () => void;
    onSelect: (method: PaymentMethod) => void;
}

const statusIndicator: Record<PaymentMethod['status'], { text: string; color: string; dot: string }> = {
    online: { text: 'Online', color: 'text-green-400', dot: 'bg-green-400' },
    degraded: { text: 'Gangguan', color: 'text-orange-400', dot: 'bg-orange-400' },
    down: { text: 'Perbaikan', color: 'text-red-400', dot: 'bg-red-400' },
    maintenance: { text: 'Perbaikan', color: 'text-gray-400', dot: 'bg-gray-400' },
    auto_disabled: { text: 'Nonaktif', color: 'text-red-400', dot: 'bg-red-400' },
};

const PaymentMethodSelection: React.FC<PaymentMethodSelectionProps> = ({ paymentCategories, subtotal, onClose, onSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

    const allMethods = React.useMemo(() => paymentCategories.flatMap(c => c.methods), [paymentCategories]);

    const recommendedMethod = React.useMemo(() => {
        const onlineMethods = allMethods.filter(m => m.status === 'online');
        if (onlineMethods.length === 0) return null;

        const scoredMethods = onlineMethods.map(method => ({
            method,
            score: calculateChannelScore(method, subtotal, onlineMethods)
        }));

        return scoredMethods.sort((a, b) => b.score - a.score)[0].method;
    }, [allMethods, subtotal]);


    const filteredCategories = React.useMemo(() => {
        return paymentCategories
            .map(category => ({
                ...category,
                methods: category.methods.filter(method =>
                    method.name.toLowerCase().includes(searchQuery.toLowerCase())
                ),
            }))
            .filter(category => category.methods.length > 0);
    }, [searchQuery, paymentCategories]);
    
    return (
        <div className="fixed inset-0 z-[100] bg-gray-900 flex flex-col" role="dialog" aria-modal="true">
            <header className="sticky top-0 z-20 bg-gray-800 h-16 border-b border-gray-700 flex-shrink-0">
                <div className="max-w-xl mx-auto px-4 flex items-center justify-between h-full relative">
                    <h1 className="text-xl font-bold text-white text-center w-full">Pilih Metode Pembayaran</h1>
                    <button onClick={onClose} className="absolute right-4 p-2 rounded-full hover:bg-gray-700">
                        <XMarkIcon className="w-6 h-6 text-white" />
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto">
                <div className="max-w-xl mx-auto p-4 space-y-4">
                    {/* Search */}
                    <div className="sticky top-0 bg-gray-900 py-2 z-10">
                        <div className="relative">
                            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
                            <input
                                type="text"
                                placeholder="Cari bank/e-wallet..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-12 pl-11 pr-4 bg-gray-800 border border-gray-700 text-white rounded-full focus:ring-2 focus:ring-[#38BDF8] focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Recommended */}
                     {recommendedMethod && !searchQuery && (
                        <section>
                            <h2 className="text-base font-bold text-gray-400 mb-2">Disarankan</h2>
                            <div className="bg-gray-800 border-2 border-[#7F1DFF] rounded-xl p-2">
                                 <button
                                    onClick={() => setSelectedMethod(recommendedMethod)}
                                    className={`w-full flex items-center justify-between p-3 text-left rounded-lg transition-all bg-purple-900/30`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <recommendedMethod.icon className="w-8 h-8 text-white" />
                                        <div>
                                            <p className="font-semibold text-sm text-white">{recommendedMethod.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckBadgeIcon className="w-5 h-5 text-green-500" />
                                         <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod?.id === recommendedMethod.id ? 'border-[#7F1DFF] bg-[#7F1DFF]' : 'border-gray-500'}`}>
                                            {selectedMethod?.id === recommendedMethod.id && <CheckIcon className="w-4 h-4 text-white" />}
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </section>
                     )}

                    {/* Method List */}
                    <div className="space-y-4">
                        {filteredCategories.map(category => (
                             <section key={category.id}>
                                <h2 className="text-base font-bold text-gray-400 mb-2">{category.name}</h2>
                                <div className="bg-gray-800 border border-gray-700 rounded-xl p-2 space-y-1">
                                    {category.methods.map(method => {
                                        const isSelected = selectedMethod?.id === method.id;
                                        const isDisabled = method.status !== 'online';
                                        const status = statusIndicator[method.status];
                                        return (
                                            <button
                                                key={method.id}
                                                onClick={() => !isDisabled && setSelectedMethod(method)}
                                                disabled={isDisabled}
                                                className={`w-full flex items-center justify-between p-3 text-left rounded-lg transition-all ${
                                                    isSelected ? 'bg-purple-900/50 ring-2 ring-[#7F1DFF]' : 'hover:bg-gray-700'
                                                } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <method.icon className="w-8 h-8 text-white" />
                                                    <div>
                                                        <p className="font-semibold text-sm text-white">{method.name}</p>
                                                        <div className="flex items-center space-x-1.5 mt-1">
                                                            <div className={`w-2 h-2 rounded-full ${status.dot}`}></div>
                                                            <p className={`text-xs font-semibold ${status.color}`}>{status.text}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                     <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#7F1DFF] bg-[#7F1DFF]' : 'border-gray-500'}`}>
                                                        {isSelected && <CheckIcon className="w-4 h-4 text-white" />}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>
                        ))}
                         {filteredCategories.length === 0 && (
                            <div className="text-center py-16 text-gray-400">
                                <p>Metode tidak ditemukan.</p>
                                <p className="text-sm">Coba kata kunci atau filter lain.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            
            {/* Sticky Footer */}
            <footer className="sticky bottom-0 bg-gray-800/80 backdrop-blur-sm border-t border-gray-700 flex-shrink-0">
                 <div style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
                     <div className="max-w-xl mx-auto h-[72px] px-4 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-400">Metode Terpilih</p>
                            <p className="font-bold text-base text-white">
                               {selectedMethod ? selectedMethod.name : 'Belum Dipilih'}
                            </p>
                        </div>
                         <button
                            onClick={() => selectedMethod && onSelect(selectedMethod)}
                            disabled={!selectedMethod}
                            className="px-6 h-12 text-base font-bold bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white rounded-full hover:brightness-110 transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            Gunakan Metode Ini
                        </button>
                     </div>
                </div>
            </footer>
        </div>
    );
};

export default PaymentMethodSelection;