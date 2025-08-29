

import React, { useState } from 'react';
import { CoinBalance, CoinTransaction } from '../types.ts';
import { ChevronLeftIcon, NexusCoinLogoIcon } from './icons/index.tsx';
import { formatDateOnlyShort } from '../src/lib/time.ts';

interface CoinsWalletPageProps {
    balance: CoinBalance;
    history: CoinTransaction[];
    onBack: () => void;
    onGoToTopUp: () => void;
}

const statusStyles = {
    'Tersedia': 'text-green-400',
    'Pending': 'text-orange-400'
};

const CoinsWalletPage: React.FC<CoinsWalletPageProps> = ({ balance, history, onBack, onGoToTopUp }) => {
    const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all');

    const filteredHistory = history.filter(item => filter === 'all' || item.type === filter);

    return (
        <div className="pt-16 md:pt-20 bg-gray-900 min-h-screen">
            <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 h-16 md:h-20 border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full relative">
                    <button onClick={onBack} className="absolute left-4 p-2 rounded-full hover:bg-gray-700">
                        <ChevronLeftIcon className="w-6 h-6 text-white" />
                    </button>
                    <h1 className="text-xl font-bold text-white text-center w-full">Dompet Nexus Coins</h1>
                </div>
            </header>
            <main className="max-w-7xl mx-auto p-4 space-y-6 pb-24 md:pb-8">
                {/* Balance Card */}
                <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl p-6 text-white shadow-lg text-center space-y-4">
                    <div>
                        <p className="opacity-80 text-sm">Total Saldo Nexus Coins</p>
                        <div className="flex items-center justify-center space-x-2 my-2">
                            <NexusCoinLogoIcon className="h-[60px] w-auto" />
                            <p className="text-4xl font-extrabold">{balance.available.toLocaleString('id-ID')}</p>
                        </div>
                        <p className="opacity-80 text-sm">= Rp{balance.available.toLocaleString('id-ID')}</p>
                        <div className="mt-2 text-xs">
                            <span>Pending: {balance.pending.toLocaleString('id-ID')} NX</span>
                        </div>
                    </div>
                    <button 
                        onClick={onGoToTopUp}
                        className="w-full max-w-xs mx-auto py-3 text-sm font-bold bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white rounded-full hover:brightness-110 transition-all shadow-lg"
                    >
                        Beli Koin
                    </button>
                </div>

                {/* History Section */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-white">Riwayat Koin</h2>
                        <div className="flex bg-gray-700 rounded-full p-1 text-xs font-semibold">
                            <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded-full ${filter === 'all' ? 'bg-gray-800 shadow text-white' : 'text-gray-300'}`}>Semua</button>
                            <button onClick={() => setFilter('credit')} className={`px-3 py-1 rounded-full ${filter === 'credit' ? 'bg-gray-800 shadow text-white' : 'text-gray-300'}`}>Dapat</button>
                            <button onClick={() => setFilter('debit')} className={`px-3 py-1 rounded-full ${filter === 'debit' ? 'bg-gray-800 shadow text-white' : 'text-gray-300'}`}>Terpakai</button>
                        </div>
                    </div>
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 space-y-4">
                        {filteredHistory.length > 0 ? filteredHistory.map(item => (
                            <div key={item.id} className="flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-sm text-white">{item.reason}</p>
                                    <p className="text-xs text-gray-400">{formatDateOnlyShort(item.date)} &bull; <span className={statusStyles[item.status]}>{item.status}</span></p>
                                </div>
                                <p className={`font-bold text-sm ${item.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                                    {item.type === 'credit' ? '+' : '-'}{item.amount.toLocaleString('id-ID')}
                                </p>
                            </div>
                        )) : (
                            <p className="text-center text-sm text-gray-400 py-4">Tidak ada riwayat.</p>
                        )}
                    </div>
                </section>
                
                {/* How to get coins */}
                <section className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                     <h2 className="text-lg font-bold text-white mb-3">Cara Dapat Koin</h2>
                     <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside">
                        <li>Dapatkan 2% cashback dari nilai transaksi.</li>
                        <li>Selesaikan misi harian dan mingguan.</li>
                        <li>Ikuti event dan promo spesial NexusTOPUP.</li>
                     </ul>
                </section>
            </main>
        </div>
    );
};

export default CoinsWalletPage;