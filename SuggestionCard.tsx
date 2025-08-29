

import React from 'react';

const SuggestionCard: React.FC = () => {
  return (
    <div className="bg-[#101826] border border-[#1F2733] rounded-2xl p-8 flex flex-col items-center text-center space-y-4 shadow-lg">
      <img 
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=200&auto=format&fit=crop" 
        alt="Pemandangan matahari terbenam untuk kotak saran" 
        className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
      />
      <div className="max-w-md">
        <h3 className="text-xl font-bold text-white">Gak nemu yang kamu cari?</h3>
        <p className="text-gray-400 mt-2">
          Bantu kami jadi lebih baik dengan memberi saran produk atau game baru!
        </p>
      </div>
      <button className="mt-2 px-6 py-2.5 border-2 border-[#7F1DFF] text-white font-bold rounded-full hover:bg-[#7F1DFF]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#38BDF8]">
        Kasih saran game atau produk
      </button>
    </div>
  );
};

export default SuggestionCard;