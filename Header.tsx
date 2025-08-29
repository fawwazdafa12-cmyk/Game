

import React from 'react';
import { LightningIcon, SearchIcon, UserIcon, NexusCoinLogoIcon } from './icons/index.tsx';
import { CoinBalance, User } from '../types.ts';
import { useI18n } from '../src/lib/i18n/I18nContext.tsx';

interface HeaderProps {
  user: User;
  coinBalance?: CoinBalance;
  onLoginClick: () => void;
  onAvatarClick: () => void;
  onCoinsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, coinBalance, onLoginClick, onAvatarClick, onCoinsClick }) => {
  const { t } = useI18n();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 h-16 md:h-20 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
        <div className="flex items-center space-x-2">
          <LightningIcon className="w-10 h-10" />
          <div className="text-2xl font-bold">
            <span className="text-[#38BDF8]">{t('header.title_part1')}</span>
            <span className="text-[#7F1DFF]">{t('header.title_part2')}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3 md:space-x-4">
          <button aria-label={t('header.search_button')} className="text-white hover:text-[#7F1DFF] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38BDF8] rounded-full p-1">
            <SearchIcon className="w-6 h-6" />
          </button>
          <button 
            aria-label={t('header.coins_button')} 
            onClick={onCoinsClick}
            className="flex items-center space-x-2 text-gray-300 hover:text-[#7F1DFF] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38BDF8] rounded-full p-1 pr-2"
          >
            <NexusCoinLogoIcon className="h-[60px] w-auto" />
            {user.isLoggedIn && coinBalance && (
                <span className="font-bold text-sm text-white">{coinBalance.available.toLocaleString('id-ID')}</span>
            )}
          </button>
          {user.isLoggedIn ? (
            <button
              aria-label={t('header.profile_button')}
              onClick={onAvatarClick}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#38BDF8]"
            >
              <UserIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
          ) : (
             <button 
                onClick={onLoginClick} 
                className="px-4 py-1.5 border-2 border-[#7F1DFF] text-white text-sm font-bold rounded-full hover:bg-purple-500/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38BDF8]"
            >
                {t('header.login_button')}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;