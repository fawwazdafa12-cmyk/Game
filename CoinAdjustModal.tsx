import React, { useState } from 'react';
import { AdminCoinAccount, AdminCoinAdjustFormData } from '../../types.ts';
import { XMarkIcon } from '../icons/index.tsx';

interface CoinAdjustModalProps {
    user: AdminCoinAccount;
    onClose: () => void;
    onSave: (user: AdminCoinAccount, data: AdminCoinAdjustFormData) => void;
}

const CoinAdjustModal: React.FC<CoinAdjustModalProps> = ({ user, onClose, onSave }) => {
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState<'credit' | 'debit'>('credit');
    const [description, setDescription] = useState('');
    
    const handleSave = () => {
        if (amount <= 0) {
            alert('Amount must be greater than 0.');
            return;
        }
        if (!description.trim()) {
            alert('Description is required.');
            return;
        }
        onSave(user, { amount_nx: amount, type, description });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black/60" onClick={onClose}></div>
            <div className="relative bg-[#0B0F12] border border-[#1F2733] w-full max-w-md rounded-2xl shadow-lg p-6 m-4">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-white">Adjust Coin Balance</h2>
                        <p className="text-xs text-[#8A93A5] mt-1">{user.email}</p>
                    </div>
                    <button onClick={onClose} aria-label="Close" className="p-1 rounded-full text-[#8A93A5] hover:bg-[#1F2733] hover:text-white">
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label htmlFor="adjust-amount" className="block text-sm font-semibold text-white mb-2">
                                Amount (NX)
                            </label>
                            <input
                                id="adjust-amount"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full h-11 px-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="adjust-type" className="block text-sm font-semibold text-white mb-2">
                                Type
                            </label>
                            <select
                                id="adjust-type"
                                value={type}
                                onChange={(e) => setType(e.target.value as 'credit' | 'debit')}
                                className="w-full h-11 px-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none capitalize"
                            >
                                <option value="credit">Credit (Add)</option>
                                <option value="debit">Debit (Remove)</option>
                            </select>
                        </div>
                    </div>
                     <div>
                        <label htmlFor="adjust-description" className="block text-sm font-semibold text-white mb-2">
                            Description / Reason
                        </label>
                        <input
                            id="adjust-description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="e.g., Goodwill gesture, refund correction..."
                            className="w-full h-11 px-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none"
                        />
                    </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-3">
                    <button onClick={onClose} className="h-10 px-5 text-sm font-semibold bg-[#1F2733] text-white rounded-xl hover:bg-gray-700 transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="h-10 px-5 text-sm font-semibold bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white rounded-xl hover:brightness-110 transition-all">
                        Confirm Adjustment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CoinAdjustModal;
