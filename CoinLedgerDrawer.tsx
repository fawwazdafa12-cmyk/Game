import React from 'react';
import { AdminCoinAccount, AdminCoinLedgerEntry } from '../../types.ts';
import { XMarkIcon } from '../icons/index.tsx';

interface CoinLedgerDrawerProps {
  user: AdminCoinAccount | null;
  ledger: AdminCoinLedgerEntry[];
  onClose: () => void;
}

const etypeStyles = {
    credit: 'text-green-400',
    debit: 'text-red-400',
    expire: 'text-gray-500',
    revoke: 'text-yellow-400'
};

const statusStyles = {
    available: 'text-green-400',
    pending: 'text-orange-400',
    expired: 'text-gray-500',
    reversed: 'text-yellow-400'
};

const CoinLedgerDrawer: React.FC<CoinLedgerDrawerProps> = ({ user, ledger, onClose }) => {
  const isOpen = !!user;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <aside className={`fixed top-0 right-0 h-full w-full max-w-lg bg-[#0B0F12] z-[70] transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {user && (
          <>
            <header className="h-20 flex-shrink-0 flex items-center justify-between px-6 border-b border-[#1F2733]">
              <div>
                <h2 className="text-lg font-bold text-white">Coin Ledger</h2>
                <p className="text-xs text-[#8A93A5]">{user.email}</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-[#1F2733] text-[#8A93A5] hover:text-white">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </header>

            <main className="flex-1 overflow-y-auto p-6">
                <div className="bg-[#101826] border border-[#1F2733] rounded-xl p-4 mb-6">
                    <div className="flex justify-around text-center">
                        <div>
                            <p className="text-xs text-[#8A93A5]">Available</p>
                            <p className="text-lg font-bold text-green-400">{user.available_nx.toLocaleString('id-ID')} NX</p>
                        </div>
                        <div>
                            <p className="text-xs text-[#8A93A5]">Pending</p>
                            <p className="text-lg font-bold text-orange-400">{user.pending_nx.toLocaleString('id-ID')} NX</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    {ledger.length > 0 ? ledger.map(entry => (
                        <div key={entry.id} className="bg-[#101826] p-3 rounded-lg border border-[#1F2733]/50">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className={`text-sm font-bold capitalize ${etypeStyles[entry.etype]}`}>
                                        {entry.etype === 'credit' ? '+' : '-'}{entry.amount_nx.toLocaleString('id-ID')} NX
                                    </p>
                                    <p className="text-xs text-white mt-1">{entry.description || 'No description'}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className={`text-xs font-semibold capitalize ${statusStyles[entry.status]}`}>{entry.status}</p>
                                    <p className="text-[10px] text-[#8A93A5] mt-1">{new Date(entry.created_at).toLocaleString('id-ID')}</p>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center text-sm text-[#8A93A5] py-10">
                            No ledger entries for this user.
                        </div>
                    )}
                </div>
            </main>
          </>
        )}
      </aside>
    </>
  );
};

export default CoinLedgerDrawer;
