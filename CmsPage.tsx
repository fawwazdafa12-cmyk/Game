
import React, { useState, useMemo } from 'react';
import { SearchIcon, PlusIcon, PencilIcon, TrashIcon, PhotoIcon } from '../icons/index.tsx';
import { AdminBanner } from '../../types.ts';
import { formatDateOnlyShort } from '../../src/lib/time.ts';

interface CmsPageProps {
  banners: AdminBanner[];
  onAddBanner: () => void;
  onEditBanner: (banner: AdminBanner) => void;
  onDeleteBanner: (banner: AdminBanner) => void;
}

const CmsPage: React.FC<CmsPageProps> = ({ banners, onAddBanner, onEditBanner, onDeleteBanner }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBanners = useMemo(() => {
    return banners.filter(banner =>
      banner.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      banner.linkUrl.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, banners]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
            <h2 className="text-2xl font-bold text-white">Content Management (CMS)</h2>
            <p className="text-sm text-[#8A93A5]">Manage promotional banners and sliders.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="relative flex-grow md:flex-grow-0">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A93A5]" />
                <input 
                    type="text"
                    placeholder="Search banners..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-11 pl-11 pr-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none transition-all"
                />
            </div>
            <button 
                onClick={onAddBanner}
                className="flex-shrink-0 h-11 px-4 flex items-center justify-center space-x-2 font-semibold bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white rounded-xl hover:brightness-110 transition-all">
                <PlusIcon className="w-5 h-5" />
                <span>Add Banner</span>
            </button>
        </div>
      </div>

      <div className="bg-[#0B0F12] border border-[#1F2733] rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-[#8A93A5] uppercase bg-[#101826]">
              <tr>
                <th scope="col" className="px-6 py-3">Preview</th>
                <th scope="col" className="px-6 py-3">Position</th>
                <th scope="col" className="px-6 py-3">Link URL</th>
                <th scope="col" className="px-6 py-3">Schedule</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBanners.map(banner => (
                <tr key={banner.id} className="border-b border-[#1F2733] hover:bg-[#101826] transition-colors">
                  <td className="px-6 py-4">
                    <img src={banner.imageUrl} alt="Banner preview" className="w-24 h-12 rounded-md object-cover bg-gray-700" onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/96x48'}/>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{banner.position}</td>
                  <td className="px-6 py-4 text-xs font-mono text-sky-400 truncate max-w-xs">{banner.linkUrl}</td>
                  <td className="px-6 py-4 text-xs">
                    {banner.startDate ? formatDateOnlyShort(banner.startDate) : 'Always'} - {banner.endDate ? formatDateOnlyShort(banner.endDate) : 'Never'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        banner.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-600/50 text-gray-400'
                    }`}>
                      {banner.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                   <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                           <button onClick={() => onEditBanner(banner)} className="p-1.5 text-gray-400 hover:text-white hover:bg-[#1F2733] rounded-md" title="Edit Banner">
                                <PencilIcon className="w-4 h-4" />
                            </button>
                            <button onClick={() => onDeleteBanner(banner)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-[#1F2733] rounded-md" title="Delete Banner">
                                <TrashIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredBanners.length === 0 && (
            <div className="text-center py-16 px-4">
                <PhotoIcon className="w-12 h-12 mx-auto text-gray-600" />
                <p className="text-[#8A93A5] mt-2">No banners found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CmsPage;
