
import React, { useState, useEffect } from 'react';
import { GoogleIcon, FacebookAltIcon, CheckCircleIcon, TagSolidIcon, HeadsetMicIcon, XMarkIcon, SpinnerIcon } from './icons/index.tsx';

interface LoginModalProps {
    onClose: () => void;
    onLogin: (isSuccess: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [isLoading, setIsLoading] = useState<null | 'google' | 'facebook'>(null);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 250);
    };
    
    // Handle Escape key
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const simulateLogin = (provider: 'google' | 'facebook') => {
        setIsLoading(provider);
        setTimeout(() => {
            // Simulate a successful login
            onLogin(true);
            setIsLoading(null);
        }, 1500);
    };

    const benefits = [
        { icon: CheckCircleIcon, text: "Bisa pantau & simpan transaksi" },
        { icon: TagSolidIcon, text: "Lebih dulu tau info promo seru" },
        { icon: HeadsetMicIcon, text: "Mudah hubungi bantuan jika ada kendala" },
    ];

    const AuthButton = ({ provider, label, icon: Icon, onClick }: { provider: 'google' | 'facebook', label: string, icon: React.FC<{className?: string}>, onClick: () => void }) => (
        <button
            onClick={onClick}
            disabled={isLoading !== null}
            className="w-full h-14 flex items-center justify-center space-x-3 bg-gray-700 border border-gray-600 rounded-full text-gray-200 font-semibold text-base hover:border-[#7F1DFF] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38BDF8] disabled:opacity-70 disabled:cursor-not-allowed"
        >
            {isLoading === provider ? <SpinnerIcon className="w-5 h-5" /> : <Icon className="w-6 h-6" />}
            <span>{label}</span>
        </button>
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center" role="dialog" aria-modal="true" aria-labelledby="login-modal-title">
            {/* Overlay */}
            <div 
                className={`fixed inset-0 bg-black/60 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`} 
                onClick={handleClose}
            ></div>

            {/* Modal Content */}
            <div className={`bg-gray-800 w-full max-w-md shadow-lg transition-transform duration-250 ease-out ${isClosing ? 'translate-y-full' : 'translate-y-0'} md:rounded-t-3xl`}>
                <div className="p-6 space-y-5">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                        <h2 id="login-modal-title" className="text-xl font-bold text-white">Masuk</h2>
                        <button onClick={handleClose} aria-label="Tutup" className="text-white hover:opacity-70">
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>

                    <ul className="space-y-4">
                        {benefits.map((item, index) => (
                            <li key={index} className="flex items-center space-x-4">
                                <item.icon className="w-6 h-6 text-white" />
                                <span className="text-gray-200 font-medium">{item.text}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="border-t border-gray-700 pt-5 space-y-4">
                        <p className="text-xs text-gray-400 text-center">
                            Dengan masuk ke NexusTOPUP, kamu menyetujui <a href="#" className="text-[#38BDF8] font-semibold">Syarat dan Ketentuan</a> serta <a href="#" className="text-[#38BDF8] font-semibold">Kebijakan Privasi</a>.
                        </p>
                        <div className="space-y-3">
                           <AuthButton provider="google" label="Masuk dengan Google" icon={GoogleIcon} onClick={() => simulateLogin('google')} />
                           <AuthButton provider="facebook" label="Masuk dengan Facebook" icon={FacebookAltIcon} onClick={() => simulateLogin('facebook')} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;