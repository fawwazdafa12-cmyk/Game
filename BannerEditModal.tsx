import React, { useState, useEffect } from 'react';
import { AdminBanner, AdminBannerFormData } from '../../types.ts';
import { XMarkIcon } from '../icons/index.tsx';

interface BannerEditModalProps {
    banner: AdminBanner | 'new';
    onClose: () => void;
    onSave: (data: AdminBannerFormData) => void;
}

const BannerEditModal: React.FC<BannerEditModalProps> = ({ banner, onClose, onSave }) => {
    const isNew = banner === 'new';
    const [formData, setFormData] = useState<AdminBannerFormData>({
        imageUrl: '',
        linkUrl: '',
        position: 'homepage_slider',
        startDate: '',
        endDate: '',
        active: true,
    });

    useEffect(() => {
        if (!isNew) {
            setFormData({
                imageUrl: banner.imageUrl,
                linkUrl: banner.linkUrl,
                position: banner.position,
                startDate: banner.startDate ? banner.startDate.split('T')[0] : '',
                endDate: banner.endDate ? banner.endDate.split('T')[0] : '',
                active: banner.active,
            });
        }
    }, [banner, isNew]);

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
        // Basic validation
        if (!formData.imageUrl || !formData.position) {
            alert('Image URL and Position are required.');
            return;
        }
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black/60" onClick={onClose}></div>
            <div className="relative bg-[#0B0F12] border border-[#1F2733] w-full max-w-lg rounded-2xl shadow-lg p-6 m-4">
                <div className="flex items-start justify-between">
                    <h2 className="text-lg font-bold text-white">{isNew ? 'Add New Banner' : 'Edit Banner'}</h2>
                    <button onClick={onClose} aria-label="Close" className="p-1 rounded-full text-[#8A93A5] hover:bg-[#1F2733] hover:text-white">
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="mt-6 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                     <div>
                        <label htmlFor="imageUrl" className="block text-sm font-semibold text-white mb-2">Image URL</label>
                        <input id="imageUrl" name="imageUrl" type="text" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/banner.png" className="w-full h-11 px-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none" />
                    </div>
                     <div>
                        <label htmlFor="linkUrl" className="block text-sm font-semibold text-white mb-2">Link URL</label>
                        <input id="linkUrl" name="linkUrl" type="text" value={formData.linkUrl} onChange={handleChange} placeholder="/promo/special-deal" className="w-full h-11 px-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none" />
                    </div>
                     <div>
                        <label htmlFor="position" className="block text-sm font-semibold text-white mb-2">Position</label>
                        <select id="position" name="position" value={formData.position} onChange={handleChange} className="w-full h-11 px-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none">
                            <option value="homepage_slider">Homepage Slider</option>
                            <option value="promo_page_header">Promo Page Header</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-semibold text-white mb-2">Start Date (Optional)</label>
                            <input id="startDate" name="startDate" type="date" value={formData.startDate} onChange={handleChange} className="w-full h-11 px-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none" />
                        </div>
                        <div>
                            <label htmlFor="endDate" className="block text-sm font-semibold text-white mb-2">End Date (Optional)</label>
                            <input id="endDate" name="endDate" type="date" value={formData.endDate} onChange={handleChange} className="w-full h-11 px-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none" />
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
                        {isNew ? 'Create Banner' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BannerEditModal;
