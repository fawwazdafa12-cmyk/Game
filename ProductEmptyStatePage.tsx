import React from 'react';
import { ProductStatus } from '../types.ts';
import { ChevronLeftIcon, ChatBubbleLeftEllipsisIcon } from './icons/index.tsx';

interface ProductEmptyStatePageProps {
  type: ProductStatus;
  productName: string;
  onBack: () => void;
  onNavigateHome: () => void;
  onHelp: () => void;
}

// FIX: Add 'available' case to satisfy the `ProductStatus` type. Although this page is not intended for available products, this makes the component type-safe.
const contentMap: Record<ProductStatus, { title: string; description: string; illustrationUrl: string }> = {
  available: {
    title: 'Produk Tersedia',
    description: 'Produk ini tersedia untuk dibeli. Jika Anda melihat halaman ini, mungkin terjadi kesalahan.',
    illustrationUrl: 'https://imgur.com/o0jaw18.png', // Generic info icon
  },
  maintenance: {
    title: 'Layanan dalam perbaikan',
    description: 'Saat ini layanan sedang dalam proses perbaikan. Kembali lagi nanti atau lihat game lain.',
    illustrationUrl: 'https://imgur.com/o0jaw18.png', // Wrench and cog
  },
  comingSoon: {
    title: 'Produk Akan Segera Hadir',
    description: 'Produk ini akan segera tersedia. Kembali lagi nanti atau lihat game lain.',
    illustrationUrl: 'https://imgur.com/o0jaw18.png', // Rocket
  },
  regionLocked: {
    title: 'Belum tersedia di wilayah kamu',
    description: 'Produk ini belum tersedia untuk wilayahmu. Silakan kembali nanti atau lihat game lain.',
    illustrationUrl: 'https://imgur.com/o0jaw18.png', // Map/globe
  },
  noVariant: {
    title: 'Belum ada item untuk produk ini',
    description: 'Saat ini belum ada item yang tersedia untuk produk ini. Silakan kembali nanti atau lihat game lain.',
    illustrationUrl: 'https://imgur.com/o0jaw18.png', // Empty box
  },
};

const ProductEmptyStatePage: React.FC<ProductEmptyStatePageProps> = ({ type, productName, onBack, onNavigateHome, onHelp }) => {
  const content = contentMap[type] || contentMap.maintenance;

  return (
    <div className="bg-gray-900 min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 h-16 md:h-20 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-full relative">
          <button onClick={onBack} className="absolute left-4 p-2 rounded-full hover:bg-gray-700" aria-label="Kembali">
            <ChevronLeftIcon className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white text-center w-full truncate px-12">{productName}</h1>
        </div>
      </header>

      <main className="pt-20 flex flex-col items-center justify-center text-center p-4 min-h-screen">
        <img src={content.illustrationUrl} alt="" className="w-48 h-48 object-contain mb-8" />
        <h2 className="text-2xl font-extrabold text-white">{content.title}</h2>
        <p className="text-gray-400 mt-2 max-w-sm">{content.description}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button onClick={onNavigateHome} className="px-6 py-3 font-bold bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white rounded-full hover:brightness-110 transition-all">
                Lihat Produk Lain
            </button>
            <button onClick={onHelp} className="px-6 py-3 font-bold border-2 border-gray-600 text-gray-300 rounded-full hover:border-[#7F1DFF] transition-colors flex items-center justify-center space-x-2">
                <ChatBubbleLeftEllipsisIcon className="w-5 h-5"/>
                <span>Butuh Bantuan?</span>
            </button>
        </div>
      </main>
    </div>
  );
};

// FIX: Add default export to resolve module import error.
export default ProductEmptyStatePage;
