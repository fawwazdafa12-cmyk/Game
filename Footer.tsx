
import React from 'react';
import { EnvelopeIcon, FacebookIcon, InstagramIcon, TiktokIcon } from './icons/index.tsx';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 mt-12 pt-24 pb-32 md:pb-24 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Payment Methods */}
                <section>
                    <h3 className="font-bold text-white mb-4 text-center md:text-left">Pembayaran 100% Aman & Terpercaya</h3>
                    <div className="flex items-center justify-center md:justify-start flex-wrap gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-8 w-16 bg-gray-700 rounded-md"></div>
                        ))}
                        <span className="font-semibold text-gray-400">+ 20 lainnya</span>
                    </div>
                </section>

                {/* Contact */}
                <section>
                    <h3 className="font-bold text-white mb-4 text-center md:text-left">Hubungi Kami</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                        <a href="mailto:support@nexustopup.com" className="flex items-center justify-center md:justify-start gap-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors w-full text-white">
                            <EnvelopeIcon className="w-6 h-6" />
                            <span className="font-semibold">support@nexustopup.com</span>
                        </a>
                        <a href="#" className="flex items-center justify-center md:justify-start gap-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors w-full">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-6 h-6" alt="WhatsApp Icon" />
                            <span className="font-semibold">Chat WhatsApp</span>
                        </a>
                    </div>
                </section>

                <hr className="border-gray-700" />

                {/* Consumer Info */}
                <section className="text-xs text-gray-400 text-center md:text-left space-y-2">
                    <p className="font-bold text-white">Pengaduan Konsumen</p>
                    <p>Direktorat Jenderal Perlindungan Konsumen dan Tertib Niaga
Kementerian Perdagangan Republik Indonesia
Nomor WhatsApp Ditjen PKTN: 0853-1111-1010</p>
                    <p>NexusTOPUP (PT. Nexus Digital Perkasa) - Terdaftar di Kemenkominfo</p>
                </section>

                {/* Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
                    <div>
                        <h4 className="font-bold text-white mb-3">RESELLER</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-[#7F1DFF]">Login Reseller</a></li>
                            <li><a href="#" className="hover:text-[#7F1DFF]">Daftar Reseller</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-3">INFORMASI</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-[#7F1DFF]">Syarat & Ketentuan</a></li>
                            <li><a href="#" className="hover:text-[#7F1DFF]">Kebijakan Privasi</a></li>
                            <li><a href="#" className="hover:text-[#7F1DFF]">Blog</a></li>
                            <li><a href="#" className="hover:text-[#7F1DFF]">Affiliate</a></li>
                        </ul>
                    </div>
                    <div className="col-span-2 md:col-span-2">
                         <h4 className="font-bold text-white mb-3 text-center">IKUTI KAMI</h4>
                        <div className="flex justify-center items-center space-x-5">
                            <a href="#" aria-label="Facebook" className="text-white hover:text-[#7F1DFF]"><FacebookIcon className="w-7 h-7" /></a>
                            <a href="#" aria-label="Instagram" className="text-white hover:text-[#7F1DFF]"><InstagramIcon className="w-7 h-7" /></a>
                            <a href="#" aria-label="TikTok" className="text-white hover:text-[#7F1DFF]"><TiktokIcon className="w-6 h-6" /></a>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;