import React, { useState, useEffect } from 'react';
import { AdminProductVariant, AdminVariantFormData } from '../../types.ts';
import { XMarkIcon } from '../icons/index.tsx';

interface VariantEditModalProps {
    variant: AdminProductVariant | 'new';
    onClose: () => void;
    onSave: (data: AdminVariantFormData) => void;
}

const VariantEditModal: React.FC<VariantEditModalProps> = ({ variant, onClose, onSave }) => {
    const isNew = variant === 'new';
    const [formData, setFormData] = useState<AdminVariantFormData>({
        label: '',
        price_idr: 0,
        strike_idr: undefined,
        active: true,
    });

    useEffect(() => {
        if (!isNew) {
            setFormData({
                label: variant.label,
                price_idr: variant.price_idr,
                strike_idr: variant.strike_idr || undefined,
                active: variant.active,
            });
        }
    }, [variant, isNew]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value),
        }));
    };

    const handleSave = () => {
        if (!formData.label || formData.price_idr <= 0) {
            alert('Label and a valid Price are required.');
            return;
        }
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black/60" onClick={onClose}></div>
            <div className="relative bg-[#0B0F12] border border-[#1F2733] w-full max-w-md rounded-2xl shadow-lg p-6 m-4">
                <div className="flex items-start justify-between">
                    <h2 className="text-lg font-bold text-white">{isNew ? 'Add New Variant' : 'Edit Variant'}</h2>
                    <button onClick={onClose} aria-label="Close" className="p-1 rounded-full text-[#8A93A5] hover:bg-[#1F2733] hover:text-white">
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="label" className="block text-sm font-semibold text-white mb-2">Label</label>
                        <input id="label" name="label" type="text" value={formData.label} onChange={handleChange} className="w-full h-11 px-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="price_idr" className="block text-sm font-semibold text-white mb-2">Price (IDR)</label>
                            <input id="price_idr" name="price_idr" type="number" value={formData.price_idr} onChange={handleChange} className="w-full h-11 px-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none" />
                        </div>
                        <div>
                            <label htmlFor="strike_idr" className="block text-sm font-semibold text-white mb-2">Strike Price (Optional)</label>
                            <input id="strike_idr" name="strike_idr" type="number" value={formData.strike_idr || ''} onChange={handleChange} className="w-full h-11 px-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none" />
                        </div>
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
                        {isNew ? 'Create Variant' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VariantEditModal;
