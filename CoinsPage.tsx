import React, { useState, useMemo } from 'react';
import { SearchIcon } from '../icons/index.tsx';
import { AdminCoinAccount } from '../../types.ts';

interface CoinsPageProps {
  accounts: AdminCoinAccount[];
  onAdjust: (account: AdminCoinAccount) => void;
  onViewLedger: (account: AdminCoinAccount) => void;
}

const CoinsPage: React.FC<CoinsPageProps> = ({ accounts, onAdjust, onViewLedger }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredAccounts = useMemo(() => {
    return accounts.filter(acc =>
      acc.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, accounts]);
  
  const paginatedAccounts = useMemo(() => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      return filteredAccounts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAccounts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
            <h2 className="text-2xl font-bold text-white">Nexus Coins Management</h2>
            <p className="text-sm text-[#8A93A5]">View and adjust user coin balances.</p>
        </div>
        <div className="relative w-full md:w-80">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A93A5]" />
            <input 
                type="text"
                placeholder="Search by email or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-11 pr-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none transition-all"
            />
        </div>
      </div>

      <div className="bg-[#0B0F12] border border-[#1F2733] rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-[#8A93A5] uppercase bg-[#101826]">
              <tr>
                <th scope="col" className="px-6 py-3">User</th>
                <th scope="col" className="px-6 py-3">Available Coins</th>
                <th scope="col" className="px-6 py-3">Pending Coins</th>
                <th scope="col" className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAccounts.map(acc => (
                <tr key={acc.user_id} className="border-b border-[#1F2733] hover:bg-[#101826] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">{acc.name || 'N/A'}</div>
                    <div className="text-xs text-[#8A93A5]">{acc.email}</div>
                  </td>
                  <td className="px-6 py-4 font-mono font-semibold text-green-400">{acc.available_nx.toLocaleString('id-ID')} NX</td>
                  <td className="px-6 py-4 font-mono text-orange-400">{acc.pending_nx.toLocaleString('id-ID')} NX</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                        <button onClick={() => onAdjust(acc)} className="px-3 py-1 text-xs font-semibold bg-[#1F2733] rounded-md hover:bg-gray-700">Adjust</button>
                        <button onClick={() => onViewLedger(acc)} className="px-3 py-1 text-xs font-semibold border border-[#1F2733] rounded-md hover:bg-[#1F2733]">View Ledger</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAccounts.length === 0 && (
            <div className="text-center py-16 px-4">
                <p className="text-[#8A93A5]">No users found.</p>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center p-4 text-xs text-[#8A93A5]">
            <span>Page {currentPage} of {totalPages}</span>
            <div className="flex gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 border border-[#1F2733] rounded-md hover:bg-[#1F2733] disabled:opacity-50">Previous</button>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border border-[#1F2733] rounded-md hover:bg-[#1F2733] disabled:opacity-50">Next</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CoinsPage;
