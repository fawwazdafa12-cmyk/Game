

import React from 'react';
import { HomeIcon, ReceiptIcon, GiftIcon, TagIcon, AdminIcon } from './icons/index.tsx';
import { Page } from '../types.ts';
import { User } from '../types.ts';

type NavItemKey = 'home' | 'promo' | 'transactions' | 'hadiahku' | 'admin';

interface BottomNavBarProps {
    activePage: Page;
    onNavigate: (page: NavItemKey) => void;
    user: User;
}

const baseNavItems: { key: NavItemKey; label: string; icon: (props: { isActive: boolean; className?: string }) => React.ReactNode }[] = [
    { key: 'home', label: 'Home', icon: HomeIcon },
    { key: 'promo', label: 'Promo', icon: TagIcon },
    { key: 'transactions', label: 'Transaksi', icon: ReceiptIcon },
    { key: 'hadiahku', label: 'Hadiahku', icon: GiftIcon },
];

const getActiveKey = (page: Page): NavItemKey => {
    if (page === 'transactions' || page === 'transactionDetail') return 'transactions';
    if (page === 'hadiahku') return 'hadiahku';
    if (page === 'promo') return 'promo';
    if (page === 'admin') return 'admin';
    return 'home';
};

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activePage, onNavigate, user }) => {
    const authorizedRoles = ["admin","dev","ops","cs","finance","content"];
    const hasAdminAccess = user.roles.some(role => authorizedRoles.includes(role));
    
    const navItems = [...baseNavItems];
    if (hasAdminAccess) {
        navItems.push({ key: 'admin', label: 'Admin', icon: AdminIcon });
    }

    const activeKey = getActiveKey(activePage);
    const activeIndex = navItems.findIndex(item => item.key === activeKey);
    const navItemWidth = 100 / navItems.length;


    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-800 h-[72px] border-t border-gray-700 md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
            <div className="max-w-7xl mx-auto h-full flex items-center relative">
                <div
                    className="absolute top-0 h-1 transition-transform duration-300 ease-out"
                    style={{ 
                        width: `${navItemWidth}%`,
                        transform: `translateX(${activeIndex * 100}%)` 
                    }}
                    aria-hidden="true"
                >
                    <div className="w-11 h-full mx-auto rounded-full bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8]" />
                </div>

                {navItems.map(({ key, label, icon }) => {
                    const isActive = key === activeKey;
                    const iconClassName = `w-7 h-7 transition-colors duration-200 ${
                        isActive
                        ? 'text-white'
                        : 'text-white/60 group-hover:text-white'
                    }`;
                    return (
                        <button
                            key={key}
                            onClick={() => onNavigate(key)}
                            className="z-10 flex flex-col items-center justify-center h-full pt-2 space-y-1 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2 rounded-t-lg"
                            style={{ width: `${navItemWidth}%` }}
                            aria-selected={isActive}
                            role="tab"
                        >
                            {icon({ isActive, className: iconClassName })}
                            <span
                                className={`text-sm font-semibold transition-colors duration-200 ${
                                    isActive
                                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8]'
                                    : 'text-white/60 group-hover:text-white'
                                }`}
                            >
                                {label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNavBar;