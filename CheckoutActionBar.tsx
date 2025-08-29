import React from 'react';

interface CheckoutActionBarProps {
  total: number;
  buttonText: string;
  onClick: () => void;
  disabled?: boolean;
  showBottomNavBar: boolean;
}

const CheckoutActionBar: React.FC<CheckoutActionBarProps> = ({ total, buttonText, onClick, disabled = false, showBottomNavBar }) => {
  const bottomPosition = showBottomNavBar ? 'bottom-[72px]' : 'bottom-0';

  return (
    <div className={`fixed left-0 right-0 z-40 bg-gray-800/80 backdrop-blur-sm border-t border-gray-700 ${bottomPosition}`}>
      <div style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="max-w-xl mx-auto h-[72px] px-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400">Total</p>
            <p className="font-extrabold text-xl text-white">
              Rp{total.toLocaleString('id-ID')}
            </p>
          </div>
          <button
            onClick={onClick}
            disabled={disabled}
            className="px-6 h-12 text-base font-bold bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white rounded-full hover:brightness-110 transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutActionBar;