import React, { useState, useMemo } from 'react';
import { SearchIcon, PlusIcon, PencilIcon, TrashIcon } from '../icons/index.tsx';
import { AdminVoucher } from '../../types.ts';

interface VouchersPageProps {
  vouchers: AdminVoucher[];
  onAddVoucher: () => void;
  onEditVoucher: (voucher: AdminVoucher) => void;
  onDeleteVoucher: (voucher: AdminVoucher) => void;
}

const VouchersPage: React.FC<VouchersPageProps> = ({ vouchers, onAddVoucher, onEditVoucher, onDeleteVoucher }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVouchers = useMemo(() => {
    return vouchers.filter(v =>
      v.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, vouchers]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
            <h2 className="text-2xl font-bold text-white">Voucher Management</h2>
            <p className="text-sm text-[#8A93A5]">Create and manage discount vouchers.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="relative flex-grow md:flex-grow-0">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A93A5]" />
                <input 
                    type="text"
                    placeholder="Search by code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-11 pl-11 pr-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none transition-all"
                />
            </div>
            <button 
                onClick={onAddVoucher}
                className="flex-shrink-0 h-11 px-4 flex items-center justify-center space-x-2 font-semibold bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white rounded-xl hover:brightness-110 transition-all">
                <PlusIcon className="w-5 h-5" />
                <span>Add Voucher</span>
            </button>
        </div>
      </div>

      <div className="bg-[#0B0F12] border border-[#1F2733] rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-[#8A93A5] uppercase bg-[#101826]">
              <tr>
                <th scope="col" className="px-6 py-3">Code</th>
                <th scope="col" className="px-6 py-3">Type</th>
                <th scope="col" className="px-6 py-3">Value</th>
                <th scope="col" className="px-6 py-3">Min. Spend</th>
                <th scope="col" className="px-6 py-3">Quota</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVouchers.map(v => (
                <tr key={v.id} className="border-b border-[#1F2733] hover:bg-[#101826] transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-sky-400">{v.code}</td>
                  <td className="px-6 py-4 capitalize">{v.vtype}</td>
                  <td className="px-6 py-4 font-semibold">{v.vtype === 'amount' ? `Rp${v.value.toLocaleString('id-ID')}` : `${v.value}%`}</td>
                  <td className="px-6 py-4">Rp{v.min_spend_idr.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4">{v.quota ?? '∞'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        v.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-600/50 text-gray-400'
                    }`}>
                      {v.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                   <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                            <button onClick={() => onEditVoucher(v)} className="p-1.5 text-gray-400 hover:text-white hover:bg-[#1F2733] rounded-md" title="Edit Voucher">
                                <PencilIcon className="w-4 h-4" />
                            </button>
                            <button onClick={() => onDeleteVoucher(v)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-[#1F2733] rounded-md" title="Delete Voucher">
                                <TrashIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredVouchers.length === 0 && (
            <div className="text-center py-16 px-4">
                <p className="text-[#8A93A5]">No vouchers found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VouchersPage;
