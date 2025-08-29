import React from 'react';
import { 
    Squares2x2Icon, ShoppingBagIcon, BanknotesIcon, CubeIcon, UsersIcon, AdminTagIcon,
    BuildingStorefrontIcon, FlagIcon, DocumentChartBarIcon, Cog6ToothIcon, LightningIcon,
    ChevronDoubleLeftIcon, CircleStackIcon, CpuChipIcon, HeadsetMicIcon
} from '../icons/index.tsx';

const sidebarItems = [
    { name: 'Dashboard', icon: Squares2x2Icon, path: 'dashboard' },
    { name: 'Orders', icon: ShoppingBagIcon, path: 'orders' },
    { name: 'Payments', icon: BanknotesIcon, path: 'payments' },
    { name: 'Products', icon: CubeIcon, path: 'products' },
    { name: 'Vouchers', icon: AdminTagIcon, path: 'vouchers' },
    { name: 'Coins', icon: CircleStackIcon, path: 'coins' },
    { name: 'Users', icon: UsersIcon, path: 'users' },
    { name: 'CS/Support', icon: HeadsetMicIcon, path: 'cs' },
    { name: 'CMS', icon: BuildingStorefrontIcon, path: 'cms' },
    { name: 'Integrations', icon: CpuChipIcon, path: 'integrations' },
    { name: 'Feature Flags', icon: FlagIcon, path: 'flags' },
    { name: 'Reports', icon: DocumentChartBarIcon, path: 'reports' },
    { name: 'Settings', icon: Cog6ToothIcon, path: 'settings' },
];

interface SidebarProps {
    activePage: string;
    onNavigate: (page: string) => void;
    isCollapsed: boolean;
    onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate, isCollapsed, onToggle }) => {
    return (
        <aside className={`flex-shrink-0 bg-[#0B0F12] text-gray-300 flex flex-col border-r border-[#1F2733] transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <div className={`h-20 flex items-center border-b border-[#1F2733] transition-all duration-300 ${isCollapsed ? 'justify-center' : 'px-6'}`}>
                <div className="flex items-center space-x-2">
                  <LightningIcon className="w-8 h-8 flex-shrink-0" />
                  {!isCollapsed && (
                      <div className="text-xl font-bold">
                        <span className="text-white">Admin</span>
                        <span className="text-[#8A93A5]">Panel</span>
                      </div>
                  )}
                </div>
            </div>
            <nav className="flex-1 px-2 py-6 space-y-2 overflow-y-auto">
                {sidebarItems.map((item) => {
                    const isActive = activePage === item.path;
                    return (
                        <button
                            key={item.name}
                            onClick={() => onNavigate(item.path)}
                            title={isCollapsed ? item.name : ''}
                            className={`w-full flex items-center space-x-3 h-11 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                                isCollapsed ? 'justify-center' : 'px-4'
                            } ${
                                isActive 
                                ? 'bg-gradient-to-r from-[#7F1DFF]/10 to-[#38BDF8]/10 text-white'
                                : 'hover:bg-gray-800/50 text-[#8A93A5] hover:text-white'
                            }`}
                        >
                            <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#38BDF8]' : ''}`} />
                            {!isCollapsed && <span>{item.name}</span>}
                        </button>
                    );
                })}
            </nav>
            <div className="mt-auto p-2">
                 <button
                    onClick={onToggle}
                    title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    className="w-full flex items-center justify-center h-10 rounded-lg text-[#8A93A5] hover:bg-gray-800/50 hover:text-white transition-colors"
                >
                    <ChevronDoubleLeftIcon className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
