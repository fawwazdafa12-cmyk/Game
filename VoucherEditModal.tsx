import React, { useState, useEffect } from 'react';
import { AdminVoucher, AdminVoucherFormData } from '../../types.ts';
import { XMarkIcon } from '../icons/index.tsx';

interface VoucherEditModalProps {
    voucher: AdminVoucher | 'new';
    onClose: () => void;
    onSave: (data: AdminVoucherFormData) => void;
}

const VoucherEditModal: React.FC<VoucherEditModalProps> = ({ voucher, onClose, onSave }) => {
    const isNew = voucher === 'new';
    const [formData, setFormData] = useState<AdminVoucherFormData>({
        code: '',
        vtype: 'amount',
        value: 0,
        min_spend_idr: 0,
        start_at: '',
        end_at: '',
        quota: undefined,
        active: true,
    });

    useEffect(() => {
        if (!isNew) {
            setFormData({
                code: voucher.code,
                vtype: voucher.vtype,
                value: voucher.value,
                min_spend_idr: voucher.min_spend_idr,
                start_at: voucher.start_at ? voucher.start_at.split('T')[0] : '',
                end_at: voucher.end_at ? voucher.end_at.split('T')[0] : '',
                quota: voucher.quota ?? undefined,
                active: voucher.active,
            });
        }
    }, [voucher, isNew]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (type === 'number') {
             setFormData(prev => ({ ...prev, [name]: value === '' ? undefined : Number(value) }));
        }
        else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = () => {
        if (!formData.code || formData.value <= 0) {
            alert('Code and a valid Value are required.');
            return;
        }
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black/60" onClick={onClose}></div>
            <div className="relative bg-[#0B0F12] border border-[#1F2733] w-full max-w-lg rounded-2xl shadow-lg p-6 m-4">
                <div className="flex items-start justify-between">
                    <h2 className="text-lg font-bold text-white">{isNew ? 'Add New Voucher' : 'Edit Voucher'}</h2>
                    <button onClick={onClose} aria-label="Close" className="p-1 rounded-full text-[#8A93A5] hover:bg-[#1F2733] hover:text-white">
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="mt-6 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="code" className="block text-sm font-semibold text-white mb-2">Voucher Code</label>
                            <input id="code" name="code" type="text" value={formData.code} onChange={handleChange} className="w-full h-11 px-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none" />
                        </div>
                        <div>
                            <label htmlFor="vtype" className="block text-sm font-semibold text-white mb-2">Type</label>
                            <select id="vtype" name="vtype" value={formData.vtype} onChange={handleChange} className="w-full h-11 px-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none">
                                <option value="amount">Amount</option>
                                <option value="percent">Percent</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="value" className="block text-sm font-semibold text-white mb-2">{formData.vtype === 'amount' ? 'Value (IDR)' : 'Value (%)'}</label>
                            <input id="value" name="value" type="number" value={formData.value} onChange={handleChange} className="w-full h-11 px-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none" />
                        </div>
                         <div>
                            <label htmlFor="min_spend_idr" className="block text-sm font-semibold text-white mb-2">Min. Spend (IDR)</label>
                            <input id="min_spend_idr" name="min_spend_idr" type="number" value={formData.min_spend_idr} onChange={handleChange} className="w-full h-11 px-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none" />
                        </div>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="start_at" className="block text-sm font-semibold text-white mb-2">Start Date (Optional)</label>
                            <input id="start_at" name="start_at" type="date" value={formData.start_at} onChange={handleChange} className="w-full h-11 px-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none" />
                        </div>
                        <div>
                            <label htmlFor="end_at" className="block text-sm font-semibold text-white mb-2">End Date (Optional)</label>
                            <input id="end_at" name="end_at" type="date" value={formData.end_at} onChange={handleChange} className="w-full h-11 px-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="quota" className="block text-sm font-semibold text-white mb-2">Quota (Optional)</label>
                        <input id="quota" name="quota" type="number" value={formData.quota || ''} onChange={handleChange} placeholder="Leave blank for unlimited" className="w-full h-11 px-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none" />
                    </div>
                    <div>
                        <label className="flex items-center space-x-2 cursor-pointer">
                           <input id="active" name="active" type="checkbox" checked={formData.active} onChange={handleChange} className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-[#7F1DFF] focus:ring-[#38BDF8]" />
                           <span className="text-sm font-semibold text-white">Active</span>
                        </label>
                    </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-3">
                    <button onClick={onClose} className="h-10 px-5 text-sm font-semibold bg-[#1F2733] text-white rounded-xl hover:bg-gray-700 transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="h-10 px-5 text-sm font-semibold bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white rounded-xl hover:brightness-110 transition-all">
                        {isNew ? 'Create Voucher' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VoucherEditModal;
