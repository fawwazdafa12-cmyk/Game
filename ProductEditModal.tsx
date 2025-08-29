import React, { useState, useEffect } from 'react';
import { AdminProduct, AdminProductFormData } from '../../types.ts';
import { XMarkIcon } from '../icons/index.tsx';

interface ProductEditModalProps {
    product: AdminProduct | 'new';
    onClose: () => void;
    onSave: (data: AdminProductFormData) => void;
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({ product, onClose, onSave }) => {
    const isNew = product === 'new';
    const [formData, setFormData] = useState<AdminProductFormData>({
        name: '',
        slug: '',
        brand: '',
        type: 'topup_uid',
        active: true,
        maintenance: false,
    });

    useEffect(() => {
        if (!isNew) {
            setFormData({
                name: product.name,
                slug: product.slug,
                brand: product.brand || '',
                type: product.type,
                active: product.active,
                maintenance: product.maintenance,
            });
        }
    }, [product, isNew]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = () => {
        if (!formData.name || !formData.slug || !formData.type) {
            alert('Name, Slug, and Type are required.');
            return;
        }
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black/60" onClick={onClose}></div>
            <div className="relative bg-[#0B0F12] border border-[#1F2733] w-full max-w-lg rounded-2xl shadow-lg p-6 m-4">
                <div className="flex items-start justify-between">
                    <h2 className="text-lg font-bold text-white">{isNew ? 'Add New Product' : 'Edit Product'}</h2>
                    <button onClick={onClose} aria-label="Close" className="p-1 rounded-full text-[#8A93A5] hover:bg-[#1F2733] hover:text-white">
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="mt-6 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">Product Name</label>
                            <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} className="w-full h-11 px-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none" />
                        </div>
                        <div>
                            <label htmlFor="slug" className="block text-sm font-semibold text-white mb-2">Slug</label>
                            <input id="slug" name="slug" type="text" value={formData.slug} onChange={handleChange} className="w-full h-11 px-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="brand" className="block text-sm font-semibold text-white mb-2">Brand</label>
                            <input id="brand" name="brand" type="text" value={formData.brand} onChange={handleChange} className="w-full h-11 px-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none" />
                        </div>
                        <div>
                            <label htmlFor="type" className="block text-sm font-semibold text-white mb-2">Type</label>
                            <select id="type" name="type" value={formData.type} onChange={handleChange} className="w-full h-11 px-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none">
                                <option value="topup_uid">Top Up by UID</option>
                                <option value="voucher_code">Voucher Code</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex space-x-6 pt-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                           <input id="active" name="active" type="checkbox" checked={formData.active} onChange={handleChange} className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-[#7F1DFF] focus:ring-[#38BDF8]" />
                           <span className="text-sm font-semibold text-white">Active</span>
                        </label>
                         <label className="flex items-center space-x-2 cursor-pointer">
                           <input id="maintenance" name="maintenance" type="checkbox" checked={formData.maintenance} onChange={handleChange} className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-[#7F1DFF] focus:ring-[#38BDF8]" />
                           <span className="text-sm font-semibold text-white">Maintenance</span>
                        </label>
                    </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-3">
                    <button onClick={onClose} className="h-10 px-5 text-sm font-semibold bg-[#1F2733] text-white rounded-xl hover:bg-gray-700 transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="h-10 px-5 text-sm font-semibold bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white rounded-xl hover:brightness-110 transition-all">
                        {isNew ? 'Create Product' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductEditModal;
