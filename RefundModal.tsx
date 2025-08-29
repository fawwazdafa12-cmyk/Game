import React, { useState } from 'react';
import { AdminOrder } from '../../types.ts';
import { XMarkIcon } from '../icons/index.tsx';

interface RefundModalProps {
    order: AdminOrder;
    onClose: () => void;
    onConfirm: (order: AdminOrder, amount: number, reason: string) => void;
}

const RefundModal: React.FC<RefundModalProps> = ({ order, onClose, onConfirm }) => {
    const maxAmount = order.order.total_idr;
    const [amount, setAmount] = useState(maxAmount);
    const [reason, setReason] = useState('');

    const handleConfirm = () => {
        if (amount <= 0 || amount > maxAmount) {
            alert(`Amount must be between 1 and ${maxAmount}`);
            return;
        }
        if (!reason.trim()) {
            alert('Reason is required.');
            return;
        }
        onConfirm(order, amount, reason);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black/60" onClick={onClose}></div>
            <div className="relative bg-[#0B0F12] border border-[#1F2733] w-full max-w-md rounded-2xl shadow-lg p-6 m-4">
                <div className="flex items-start justify-between">
                     <div>
                        <h2 className="text-lg font-bold text-white">Process Refund</h2>
                        <p className="text-xs text-[#8A93A5] font-mono mt-1">{order.order.id}</p>
                    </div>
                    <button onClick={onClose} aria-label="Close" className="p-1 rounded-full text-[#8A93A5] hover:bg-[#1F2733] hover:text-white">
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="refund-amount" className="block text-sm font-semibold text-white mb-2">
                            Refund Amount
                        </label>
                        <div className="relative">
                             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white">Rp</span>
                             <input
                                id="refund-amount"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                max={maxAmount}
                                className="w-full h-11 pl-10 pr-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none"
                            />
                        </div>
                         <p className="text-xs text-[#8A93A5] mt-1">Max: Rp{maxAmount.toLocaleString('id-ID')}</p>
                    </div>
                     <div>
                        <label htmlFor="refund-reason" className="block text-sm font-semibold text-white mb-2">
                            Reason
                        </label>
                        <textarea
                            id="refund-reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            rows={3}
                            placeholder="e.g., Customer request, duplicate order..."
                            className="w-full p-3 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none"
                        />
                    </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-3">
                    <button onClick={onClose} className="h-10 px-5 text-sm font-semibold bg-[#1F2733] text-white rounded-xl hover:bg-gray-700 transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleConfirm} className="h-10 px-5 text-sm font-semibold bg-red-800 text-white rounded-xl hover:bg-red-700 transition-colors">
                        Confirm Refund
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RefundModal;
