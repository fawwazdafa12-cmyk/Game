
import React, { useState, useEffect } from 'react';
import { PendingPaymentData } from '../types';
import { ChevronLeftIcon, ClipboardDocumentIcon } from './icons';

const CountdownTimer: React.FC<{ expiryDate: string }> = ({ expiryDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(expiryDate) - +new Date();
        let timeLeft = { hours: 0, minutes: 0, seconds: 0 };

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor(difference / (1000 * 60 * 60)),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearTimeout(timer);
    });

    const formatTime = (time: number) => time.toString().padStart(2, '0');
    
    if (timeLeft.hours <= 0 && timeLeft.minutes <= 0 && timeLeft.seconds <= 0) {
        return <span className="text-lg font-bold text-red-500">Expired</span>;
    }

    return (
        <div className="text-2xl font-bold text-white tracking-widest">
            <span>{formatTime(timeLeft.hours)}</span>:<span>{formatTime(timeLeft.minutes)}</span>:<span>{formatTime(timeLeft.seconds)}</span>
        </div>
    );
};

const PaymentInstructionPage: React.FC<{
  paymentData: PendingPaymentData;
  onBackToHome: () => void;
  showToast: (message: string, type: 'success' | 'error') => void;
}> = ({ paymentData, onBackToHome, showToast }) => {
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'success');
  };

  const isEwalletPullPayment = !!paymentData.ewalletPhoneNumber;
  const ewalletName = paymentData.paymentMethod.name.split(' ')[0];
  const maskedPhone = paymentData.ewalletPhoneNumber 
    ? `${paymentData.ewalletPhoneNumber.slice(0, 4)}****${paymentData.ewalletPhoneNumber.slice(-4)}`
    : '';

  return (
    <div className="pt-16 md:pt-20 bg-gray-900 min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 h-16 md:h-20 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-full relative">
          <button onClick={onBackToHome} className="absolute left-4 p-2 rounded-full hover:bg-gray-700">
            <ChevronLeftIcon className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white text-center w-full">Instruksi Pembayaran</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-4 text-center">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
            <p className="text-gray-400">Total Pembayaran</p>
            <p className="text-3xl font-extrabold text-[#7F1DFF]">Rp{paymentData.total.toLocaleString('id-ID')}</p>
            <div className="text-xs text-gray-500">Order ID: {paymentData.orderId}</div>
            <hr className="border-gray-700" />
            <p className="text-gray-400">Selesaikan pembayaran dalam</p>
            <CountdownTimer expiryDate={paymentData.expireAt} />
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-center space-x-3">
                <paymentData.paymentMethod.icon className="w-8 h-8 text-white"/>
                <h2 className="font-bold text-white text-lg">{paymentData.paymentMethod.name}</h2>
            </div>
            
            {isEwalletPullPayment ? (
                <div className="space-y-4">
                    <p className="text-sm text-gray-300">
                        Kami telah mengirim permintaan pembayaran ke nomor Anda:
                    </p>
                    <p className="font-bold text-xl text-white">{maskedPhone}</p>
                </div>
            ) : (
                <>
                    {paymentData.qrCodeUrl && (
                        <div className="p-4 bg-white rounded-xl inline-block shadow-lg">
                            <img src={paymentData.qrCodeUrl} alt="QR Code Pembayaran" className="w-48 h-48" />
                        </div>
                    )}

                    {paymentData.vaNumber && (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-400">Nomor Virtual Account</p>
                            <div className="flex items-center justify-center space-x-2 p-3 bg-gray-700 rounded-lg">
                                <span className="text-xl font-extrabold tracking-wider text-white">{paymentData.vaNumber}</span>
                                <button onClick={() => handleCopy(paymentData.vaNumber!)} className="text-white hover:text-[#7F1DFF]">
                                    <ClipboardDocumentIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
            
            <div className="text-left text-xs text-gray-400 space-y-3 pt-4">
                <p className="font-bold text-white text-sm">Cara Pembayaran:</p>
                <ol className="list-decimal list-inside space-y-1">
                    {isEwalletPullPayment ? (
                        <>
                            <li>Buka aplikasi <b>{ewalletName}</b> di ponsel Anda.</li>
                            <li>Anda akan melihat notifikasi permintaan pembayaran dari <b>NexusTOPUP</b>.</li>
                            <li>Periksa detail transaksi dan pastikan jumlahnya benar.</li>
                            <li>Masukkan PIN atau kata sandi <b>{ewalletName}</b> Anda untuk menyelesaikan pembayaran.</li>
                        </>
                    ) : (
                        <>
                           <li>Buka aplikasi {ewalletName} Anda.</li>
                            {paymentData.qrCodeUrl && <li>Pilih menu 'Bayar' atau 'Scan QR'.</li>}
                            {paymentData.qrCodeUrl && <li>Arahkan kamera ke QR code di atas.</li>}
                            {paymentData.vaNumber && <li>Pilih menu 'Transfer' lalu 'Virtual Account'.</li>}
                            {paymentData.vaNumber && <li>Masukkan nomor Virtual Account di atas.</li>}
                            <li>Pastikan detail transaksi sudah benar (Total: Rp{paymentData.total.toLocaleString('id-ID')}, Merchant: NexusTOPUP).</li>
                            <li>Selesaikan pembayaran.</li>
                        </>
                    )}
                </ol>
            </div>
        </div>

        <button 
            onClick={onBackToHome}
            className="w-full h-12 font-bold bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white rounded-full hover:brightness-110 transition-all"
        >
            Kembali ke Beranda
        </button>
      </main>
    </div>
  );
};

export default PaymentInstructionPage;