
import React from 'react';
import { ExclamationTriangleIcon } from './icons';

interface AccessDeniedPageProps {
  onGoHome: () => void;
}

const AccessDeniedPage: React.FC<AccessDeniedPageProps> = ({ onGoHome }) => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-center p-4">
      <div className="w-24 h-24 flex items-center justify-center rounded-full bg-red-900/50 border-4 border-red-800/80 mb-6">
          <span className="text-6xl" role="img" aria-label="Stop">🚫</span>
      </div>
      <h1 className="text-3xl font-extrabold text-white mb-2">Akses Terbatas</h1>
      <p className="text-gray-400 max-w-sm mb-8">
        Anda tidak memiliki izin untuk mengakses halaman ini. Silakan hubungi administrator jika Anda merasa ini adalah sebuah kesalahan.
      </p>
      <button
        onClick={onGoHome}
        className="px-8 py-3 font-bold bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white rounded-full hover:brightness-110 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#38BDF8]"
      >
        Kembali ke Beranda
      </button>
    </div>
  );
};

export default AccessDeniedPage;
