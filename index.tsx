

import React from 'react';
import { iconUrls } from './IconConfig.ts';

type IconProps = {
    className?: string;
    title?: string;
};

type NavIconProps = {
    isActive: boolean;
    className?: string;
};

// --- HELPER COMPONENTS ---

/**
 * Renders single-color icons that can be styled with CSS `color` (e.g., `text-white`).
 * It uses a CSS mask to apply the color, which is more flexible than an <img> tag.
 */
const MonoIcon: React.FC<IconProps & { src: string; alt: string }> = ({ src, alt, className, title }) => (
    <div
        role="img"
        aria-label={alt}
        className={className}
        title={title}
        style={{
            backgroundColor: 'currentColor',
            WebkitMaskImage: `url(${src})`,
            maskImage: `url(${src})`,
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
        }}
    />
);

/**
 * Renders multi-color icons (like brand logos) that should retain their original colors.
 * It uses a standard <img> tag for this purpose.
 */
const ColorIcon: React.FC<IconProps & { src: string; alt: string }> = ({ src, alt, className, title }) => (
    <img src={src} alt={alt} className={className} title={title} loading="lazy" decoding="async" />
);


// --- ICON COMPONENTS ---

// --- Multi-Color Icons (using ColorIcon) ---
export const NexusCoinLogoIcon = (props: IconProps) => <ColorIcon {...props} src={iconUrls.nexusCoinLogo} alt="Nexus Coins Logo" />;
export const LightningIcon = (props: IconProps) => <ColorIcon {...props} src={iconUrls.lightning} alt="Lightning Icon" />;
export const FacebookIcon = (props: IconProps) => <ColorIcon {...props} src={iconUrls.facebook} alt="Facebook Icon" />;
export const InstagramIcon = (props: IconProps) => <ColorIcon {...props} src={iconUrls.instagram} alt="Instagram Icon" />;
export const TiktokIcon = (props: IconProps) => <ColorIcon {...props} src={iconUrls.tiktok} alt="Tiktok Icon" />;
export const GoogleIcon = (props: IconProps) => <ColorIcon {...props} src={iconUrls.google} alt="Google Icon" />;
export const FacebookAltIcon = (props: IconProps) => <ColorIcon {...props} src={iconUrls.facebookAlt} alt="Facebook Icon" />;
export const WhatsAppIcon = (props: IconProps) => <ColorIcon {...props} src={iconUrls.whatsapp} alt="WhatsApp Icon" />;


// --- Single-Color Icons (using MonoIcon) ---
export const SearchIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.search} alt="Search Icon" />;
export const CoinIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.coin} alt="Coin Icon" />;
export const UserIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.user} alt="User Icon" />;
export const ClockIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.clock} alt="Clock Icon" />;
export const FireIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.fire} alt="Fire Icon" />;
export const SparklesIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.sparkles} alt="Sparkles Icon" />;
export const ChevronRightIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.chevronRight} alt="Chevron Right Icon" />;
export const EnvelopeIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.envelope} alt="Envelope Icon" />;
export const QrCodeIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.qrCode} alt="QR Code Icon" />;
export const BanknotesIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.banknotes} alt="Banknotes Icon" />;
export const CreditCardIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.creditCard} alt="Credit Card Icon" />;
export const WalletIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.wallet} alt="Wallet Icon" />;
export const ChatBubbleLeftEllipsisIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.chatBubbleLeftEllipsis} alt="Chat Icon" />;
export const TicketIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.ticket} alt="Ticket Icon" />;
export const ChevronDownIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.chevronDown} alt="Chevron Down Icon" />;
export const ChevronDoubleLeftIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.chevronDoubleLeft} alt="Chevron Double Left Icon" />;
export const XIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.x} alt="X Icon" />;
export const ArrowUpIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.arrowUp} alt="Arrow Up Icon" />;
export const CheckCircleIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.checkCircle} alt="Check Circle Icon" />;
export const TagSolidIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.tagSolid} alt="Tag Icon" />;
export const HeadsetMicIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.headsetMic} alt="Headset Icon" />;
export const XMarkIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.xMark} alt="Close Icon" />;
export const LogoutIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.logout} alt="Logout Icon" />;
export const ExclamationTriangleIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.exclamationTriangle} alt="Warning Icon" />;
export const ReceiptSolidIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.receiptSolid} alt="Receipt Icon" />;
export const ChevronLeftIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.chevronLeft} alt="Chevron Left Icon" />;
export const ShareIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.share} alt="Share Icon" />;
export const ExclamationCircleIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.exclamationCircle} alt="Exclamation Circle Icon" />;
export const InformationCircleIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.informationCircle} alt="Info Circle Icon" />;
export const ClipboardDocumentIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.clipboardDocument} alt="Clipboard Icon" />;
export const ArrowDownTrayIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.arrowDownTray} alt="Download Icon" />;
export const CalendarDaysIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.calendarDays} alt="Calendar Icon" />;
export const TrophyIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.trophy} alt="Trophy Icon" />;
export const CheckIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.check} alt="Checkmark Icon" />;
export const ShieldCheckIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.shieldCheck} alt="Shield Check Icon" />;
export const CheckBadgeIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.checkBadge} alt="Check Badge Icon" />;
export const PaperAirplaneIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.paperAirplane} alt="Send Icon" />;
export const StarIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.star} alt="Star Icon" />;
export const WrenchScrewdriverIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.wrenchScrewdriver} alt="Maintenance Icon" />;
export const BellIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.bell} alt="Bell Icon" />;
export const ChevronUpDownIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.chevronUpDown} alt="Chevron Up Down Icon" />;
export const PlusIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.plus} alt="Plus Icon" />;
export const PencilIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.pencil} alt="Pencil Icon" />;
export const TrashIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.trash} alt="Trash Icon" />;
export const CurrencyDollarIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.currencyDollar} alt="Currency Dollar Icon" />;
export const NoSymbolIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.noSymbol} alt="No Symbol Icon" />;
export const PhotoIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.photo} alt="Photo Icon" />;
export const KeyIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.key} alt="Key Icon" />;
export const DevicePhoneMobileIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.devicePhoneMobile} alt="Mobile Device Icon" />;
export const DesktopComputerIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.desktopComputer} alt="Desktop Icon" />;


// --- ADMIN ICONS ---
export const Squares2x2Icon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.squares2x2} alt="Dashboard Icon" />;
export const ShoppingBagIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.shoppingBag} alt="Orders Icon" />;
export const CubeIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.cube} alt="Products Icon" />;
export const UsersIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.users} alt="Users Icon" />;
export const Cog6ToothIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.cog6tooth} alt="Settings Icon" />;
export const AdminTagIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.tagAdmin} alt="Vouchers Icon" />;
export const BuildingStorefrontIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.buildingStorefront} alt="CMS Icon" />;
export const FlagIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.flag} alt="Feature Flags Icon" />;
export const DocumentChartBarIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.documentChartBar} alt="Reports Icon" />;
export const CircleStackIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.circleStack} alt="Coins Icon" />;
export const CpuChipIcon = (props: IconProps) => <MonoIcon {...props} src={iconUrls.cpuChip} alt="Integrations Icon" />;


export const SpinnerIcon = ({ className, ...props }: IconProps) => (
    <MonoIcon {...props} src={iconUrls.spinner} alt="Spinner" className={`${className} animate-spin`} />
);


// --- NAVIGATION ICONS ---

export const HomeIcon = ({ isActive, className }: NavIconProps) => (
    <MonoIcon src={isActive ? iconUrls.home.active : iconUrls.home.inactive} alt="Home Icon" className={className} />
);
export const ReceiptIcon = ({ isActive, className }: NavIconProps) => (
    <MonoIcon src={isActive ? iconUrls.receipt.active : iconUrls.receipt.inactive} alt="Receipt Icon" className={className} />
);
export const GiftIcon = ({ isActive, className }: NavIconProps) => (
    <MonoIcon src={isActive ? iconUrls.gift.active : iconUrls.gift.inactive} alt="Gift Icon" className={className} />
);
export const TagIcon = ({ isActive, className }: NavIconProps) => (
    <MonoIcon src={isActive ? iconUrls.tag.active : iconUrls.tag.inactive} alt="Tag Icon" className={className} />
);
export const AdminIcon = ({ isActive, className }: NavIconProps) => (
    <MonoIcon src={isActive ? iconUrls.admin.active : iconUrls.admin.inactive} alt="Admin Icon" className={className} />
);