

import React, { useState, useEffect } from 'react';
import { Promo } from '../types.ts';
import { CalendarDaysIcon, ClockIcon } from './icons/index.tsx';
import { promoPageBannerUrl } from './ImageAssets.ts';
import { useCountdown } from '../src/hooks/useCountdown.ts';

interface PromoPageProps {
  promos: Promo[];
  isLoggedIn: boolean;
  onLoginRequest: () => void;
  showToast: (message: string, type: 'success' | 'error') => void;
  claimedPromoIds: number[];
  onClaimPromo: (promo: Promo) => void;
}

const Countdown: React.FC<{ endDate: string }> = ({ endDate }) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(endDate);
  
  if (isExpired) {
      return <span className="text-xs font-bold text-red-500">Telah Berakhir</span>;
  }

  if (days > 0) {
      return (
          <div className="flex items-center space-x-1 text-xs font-bold text-white">
              <CalendarDaysIcon className="w-4 h-4"/>
              <span>
                Berakhir dalam {days} {days > 1 ? 'hari' : 'hari'}
              </span>
          </div>
      );
  }
  
  return (
      <div className="flex items-center space-x-1 text-xs font-bold text-orange-400 bg-orange-900/50 px-2 py-1 rounded-full">
          <ClockIcon className="w-4 h-4"/>
          <span>
            {`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
          </span>
      </div>
  );
};

const PromoCard: React.FC<{ promo: Promo; onClaim: (promo: Promo) => void; isClaimed: boolean; }> = ({ promo, onClaim, isClaimed }) => {
    const handleClaimClick = () => {
        onClaim(promo);
    }

    const getButton = () => {
        switch (promo.type) {
            case 'flash':
                return <button className="w-full mt-3 px-4 py-2 text-sm font-bold bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white rounded-full hover:brightness-110 transition-all">Beli Sekarang</button>;
            case 'voucher':
                if (isClaimed) {
                    return <button disabled className="w-full mt-3 px-4 py-2 text-sm font-bold bg-gray-600 text-gray-400 rounded-full cursor-not-allowed">Sudah Diklaim</button>;
                }
                return <button onClick={handleClaimClick} className="w-full mt-3 px-4 py-2 text-sm font-bold bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white rounded-full hover:brightness-110 transition-all">Klaim</button>;
            case 'cashback':
            case 'coins':
                return <button className="w-full mt-3 px-4 py-2 text-sm font-bold border-2 border-[#7F1DFF] text-white rounded-full hover:bg-purple-500/10 transition-colors">Pelajari S&K</button>;
            case 'event':
                 if (isClaimed) {
                    return <button disabled className="w-full mt-3 px-4 py-2 text-sm font-bold bg-gray-600 text-gray-400 rounded-full cursor-not-allowed">Sudah Diikuti</button>;
                }
                return <button onClick={handleClaimClick} className="w-full mt-3 px-4 py-2 text-sm font-bold bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white rounded-full hover:brightness-110 transition-all">Ikuti Event</button>;
        }
    }

    const typeBadges: Record<string, string> = {
        'flash': 'Flash Sale',
        'voucher': 'Voucher',
        'cashback': 'Cashback',
        'coins': 'Coins',
        'event': 'Event'
    };

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-3 flex flex-col justify-between">
            <div>
                <div className="relative">
                    <img src={promo.image} alt={promo.title} className="w-full aspect-video object-cover rounded-lg" />
                    <span className="absolute top-2 left-2 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full">{typeBadges[promo.type]}</span>
                    {promo.discountPct && <span className="absolute top-2 right-2 bg-[#FF4D4D] text-white text-xs font-bold px-2 py-0.5 rounded-full">-{promo.discountPct}%</span>}
                </div>
                <h3 className="font-bold text-sm text-white mt-3 h-10">{promo.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{promo.description}</p>
            </div>
            <div>
                <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                    <Countdown endDate={promo.endAt} />
                </div>
                {getButton()}
            </div>
        </div>
    );
};


const PromoPage: React.FC<PromoPageProps> = ({ promos, isLoggedIn, onLoginRequest, showToast, claimedPromoIds, onClaimPromo }) => {
    const handleClaim = (promo: Promo) => {
        if (!isLoggedIn) {
            onLoginRequest();
            return;
        }
        
        onClaimPromo(promo);
    };

    return (
        <div className="pt-16 md:pt-20 bg-gray-900 min-h-screen">
             <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 border-b border-gray-700 h-16 md:h-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-full justify-center">
                    <h1 className="text-xl font-bold text-white">Promo Produk</h1>
                </div>
            </header>
            
            <main className="max-w-7xl mx-auto pb-24 md:pb-8">
                 <div className="relative w-full aspect-[2/1] md:aspect-[3/1] lg:rounded-xl overflow-hidden group">
                    <img src={promoPageBannerUrl} alt="Main Promo Banner" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-4">
                        <h2 className="text-xl md:text-3xl font-extrabold">Promo Spesial Setiap Hari</h2>
                        <p className="mt-2 text-sm md:text-lg">Diskon, kupon, cashback, dan event seru menantimu.</p>
                    </div>
                </div>

                <div className="p-4 space-y-8">
                    {/* Filter Bar */}
                    <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
                        {['Semua', 'Flash Sale', 'Voucher', 'Cashback', 'Game', 'Pulsa'].map(filter => (
                            <button key={filter} className={`flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 border whitespace-nowrap ${filter === 'Semua' ? 'bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white border-transparent' : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-500'}`}>
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Promo Grid */}
                    <section>
                        <h2 className="text-xl font-extrabold text-white mb-4">Promo Spesial Hari Ini</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {promos.map(promo => <PromoCard key={promo.id} promo={promo} onClaim={handleClaim} isClaimed={claimedPromoIds.includes(promo.id)} />)}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default PromoPage;