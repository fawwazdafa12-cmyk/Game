import React from 'react';
import { FlashSaleProduct } from '../types.ts';
import { ClockIcon } from './icons/index.tsx';
import { useCountdown } from '../src/hooks/useCountdown.ts';

interface FlashSaleProps {
  products: FlashSaleProduct[];
}

const CountdownTimer: React.FC = () => {
    // End of year in WIB (UTC+7)
    const targetDate = "2024-12-31T23:59:59+07:00";
    const { hours, minutes, seconds, isExpired } = useCountdown(targetDate);
    
    const formatTime = (time: number) => time.toString().padStart(2, '0');

    if (isExpired) {
        return (
             <div className="flex items-center space-x-1 bg-red-500/20 text-red-400 text-sm font-semibold rounded-full px-3 py-1">
                <span>Sale Ended</span>
            </div>
        )
    }

    return (
        <div className="flex items-center space-x-1 bg-white/20 text-white text-sm font-semibold rounded-full px-3 py-1">
            <ClockIcon className="w-4 h-4" />
            <span>{formatTime(hours)}</span>:<span>{formatTime(minutes)}</span>:<span>{formatTime(seconds)}</span>
        </div>
    );
};

const FlashSaleCard: React.FC<{ product: FlashSaleProduct }> = ({ product }) => (
    <div className="relative flex-shrink-0 w-64 md:w-72 bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl p-3 flex space-x-3 shadow-lg">
        <img src={product.imageUrl} alt={product.name} className="w-20 h-20 rounded-lg object-cover" />
        <div className="flex flex-col justify-between flex-1 text-white overflow-hidden">
            <div>
                <h3 className="font-bold text-sm truncate">{product.name}</h3>
                <p className="text-xs text-gray-400">{product.category}</p>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <p className="text-xs text-gray-500 line-through">Rp{product.originalPrice.toLocaleString('id-ID')}</p>
                    <p className="text-lg font-bold">Rp{product.price.toLocaleString('id-ID')}</p>
                </div>
                <div className="relative w-full h-2 bg-gray-600 rounded-full mt-2 overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 to-orange-500" style={{ width: `${product.stock}%` }}></div>
                </div>
                <p className="text-xs text-gray-400 mt-1">{product.remaining} tersisa</p>
            </div>
        </div>
        <div className="absolute top-2 right-2 bg-[#FF4D4D] text-white text-xs font-bold px-2 py-0.5 rounded-full">
            -{product.discount}%
        </div>
    </div>
);


const FlashSale: React.FC<FlashSaleProps> = ({ products }) => {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-extrabold text-white">FLASH SALE</h2>
        <CountdownTimer />
      </div>
      <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
        {products.map(product => (
          <FlashSaleCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FlashSale;