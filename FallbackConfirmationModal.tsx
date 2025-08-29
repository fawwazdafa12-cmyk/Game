import React from 'react';
import { PaymentMethod } from '../types.ts';
import { ExclamationTriangleIcon } from './icons/index.tsx';
import { calculateFee } from './paymentUtils.ts';

interface FallbackConfirmationModalProps {
  from: PaymentMethod;
  to: PaymentMethod;
  subtotal: number;
  onConfirm: () => void;
  onChooseAnother: () => void;
}

const FallbackConfirmationModal: React.FC<FallbackConfirmationModalProps> = ({ from, to, subtotal, onConfirm, onChooseAnother }) => {
    const fromFee = calculateFee(from, subtotal);
    const toFee = calculateFee(to, subtotal);
    const feeChange = toFee - fromFee;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black/60"></div>
            <div className="relative bg-[#0B0F12] border border-[#1F2733] w-full max-w-md rounded-2xl shadow-lg p-6 m-4 text-center">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-orange-900/50 border-2 border-orange-700 mb-4">
                    <ExclamationTriangleIcon className="w-8 h-8 text-orange-400" />
                </div>
                
                <h2 className="text-xl font-bold text-white">Channel Pembayaran Gangguan</h2>
                <p className="text-sm text-gray-400 mt-2">
                    Metode pembayaran <span className="font-bold text-white">{from.name}</span> sedang mengalami gangguan. Kami merekomendasikan untuk beralih ke <span className="font-bold text-white">{to.name}</span>.
                </p>

                <div className="mt-4 p-3 bg-[#101826] rounded-lg text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-400">Biaya Admin Sebelumnya:</span>
                        <span className="font-semibold text-white">Rp{fromFee.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">Biaya Admin Baru:</span>
                        <span className="font-semibold text-white">Rp{toFee.toLocaleString('id-ID')}</span>
                    </div>
                    {feeChange !== 0 && (
                        <div className="flex justify-between mt-1 pt-1 border-t border-gray-700">
                            <span className="text-gray-400">Perubahan Biaya:</span>
                            <span className={`font-bold ${feeChange > 0 ? 'text-red-400' : 'text-green-400'}`}>
                                {feeChange > 0 ? '+' : ''}Rp{feeChange.toLocaleString('id-ID')}
                            </span>
                        </div>
                    )}
                </div>

                <div className="mt-6 space-y-3">
                    <button 
                        onClick={onConfirm} 
                        className="w-full h-12 text-base font-bold bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white rounded-full hover:brightness-110 transition-all"
                    >
                        Lanjutkan dengan {to.name}
                    </button>
                    <button 
                        onClick={onChooseAnother} 
                        className="w-full h-12 text-base font-bold border-2 border-gray-600 text-gray-300 rounded-full hover:bg-gray-700 transition-colors"
                    >
                        Pilih Metode Lain
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FallbackConfirmationModal;
