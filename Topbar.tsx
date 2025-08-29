import React from 'react';
import { User } from '../../types.ts';
import { SearchIcon, BellIcon, ChevronUpDownIcon } from '../icons/index.tsx';

interface TopbarProps {
    user: User;
    activePage: string;
    onNavigateHome: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ user, activePage, onNavigateHome }) => {
    return (
        <header className="h-20 flex-shrink-0 bg-[#0B0F12] border-b border-[#1F2733] flex items-center px-6">
            {/* Left Section: Title & Breadcrumb */}
            <div>
                 <h1 className="text-2xl font-bold text-white capitalize">{activePage}</h1>
                 <p className="text-sm text-[#8A93A5]">
                    <button onClick={onNavigateHome} className="hover:text-white transition-colors focus:outline-none">Home</button> / <span className="text-white capitalize">{activePage}</span>
                </p>
            </div>
            
            {/* Center Section: Search Bar */}
            <div className="ml-12 relative hidden md:block">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A93A5]" />
                <input 
                    type="text"
                    placeholder="Search..."
                    className="w-96 h-12 pl-12 pr-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none focus:bg-[#1F2733] transition-all"
                />
            </div>
            
            {/* Spacer */}
            <div className="flex-grow"></div>

            {/* Right Section: Actions & Profile */}
            <div className="flex items-center space-x-4">
                <div className="px-3 py-1 text-xs font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 rounded-full">
                    SANDBOX
                </div>

                <button className="text-[#8A93A5] hover:text-white p-2 rounded-full hover:bg-[#1F2733]">
                    <BellIcon className="w-6 h-6" />
                </button>

                <div className="w-px h-8 bg-[#1F2733]"></div>

                <button className="flex items-center space-x-3 p-1 rounded-lg hover:bg-[#1F2733]">
                    <img src={`https://i.pravatar.cc/40?u=${user.email}`} alt="Admin Avatar" className="w-10 h-10 rounded-full"/>
                    <div className="text-left hidden lg:block">
                        <p className="text-sm font-semibold text-white">{user.name || 'Admin User'}</p>
                        <p className="text-xs text-[#8A93A5] capitalize">{user.roles.join(', ')}</p>
                    </div>
                    <ChevronUpDownIcon className="w-5 h-5 text-[#8A93A5] hidden lg:block" />
                </button>
            </div>
        </header>
    );
};

export default Topbar;
