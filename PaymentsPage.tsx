import React, { useState, useMemo } from 'react';
import { SearchIcon } from '../icons/index.tsx';
import { AdminOrder, AdminOrderStatus, ReconciliationRun } from '../../types.ts';

const statusStyles: Record<AdminOrderStatus, string> = {
  'completed': 'bg-green-500/20 text-green-400',
  'awaiting_payment': 'bg-orange-500/20 text-orange-400',
  'paid': 'bg-sky-500/20 text-sky-400',
  'processing': 'bg-blue-500/20 text-blue-400',
  'failed': 'bg-red-500/20 text-red-400',
  'cancelled': 'bg-gray-600/50 text-gray-400',
  'refunded': 'bg-purple-500/20 text-purple-400',
  'pending': 'bg-yellow-500/20 text-yellow-400',
};

interface PaymentsPageProps {
  orders: AdminOrder[];
  reconciliationRuns: ReconciliationRun[];
  onViewReconciliation: (run: ReconciliationRun) => void;
  showToast: (message: string, type: 'success' | 'error') => void;
}

const TransactionsView: React.FC<{ orders: AdminOrder[] }> = ({ orders }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const allPayments = useMemo(() => {
        return orders.flatMap(o => 
          o.payments.map(p => ({ ...p, orderId: o.order.id, buyerEmail: o.order.buyer_email }))
        );
    }, [orders]);

    const filteredPayments = useMemo(() => {
        return allPayments.filter(p =>
          p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.buyerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.channel.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, allPayments]);

    return (
      <div className="space-y-4">
        <div className="relative w-full md:w-80">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A93A5]" />
          <input
            type="text"
            placeholder="Search by Payment ID, Order ID, Email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-11 pr-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none transition-all"
          />
        </div>
        <div className="bg-[#0B0F12] border border-[#1F2733] rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-300">
                    <thead className="text-xs text-[#8A93A5] uppercase bg-[#101826]">
                        <tr>
                            <th scope="col" className="px-6 py-3">Payment ID</th>
                            <th scope="col" className="px-6 py-3">Order ID</th>
                            <th scope="col" className="px-6 py-3">Channel</th>
                            <th scope="col" className="px-6 py-3">Amount</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Paid At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments.map(p => (
                            <tr key={p.id} className="border-b border-[#1F2733] hover:bg-[#101826] transition-colors">
                                <td className="px-6 py-4 font-mono text-xs font-bold text-white">{p.id}</td>
                                <td className="px-6 py-4 font-mono text-xs">{p.orderId}</td>
                                <td className="px-6 py-4">{p.channel}</td>
                                <td className="px-6 py-4 font-semibold">Rp{p.amount_idr.toLocaleString('id-ID')}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${p.status === 'paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                        {p.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-xs">{p.paid_at ? new Date(p.paid_at).toLocaleString('id-ID') : 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredPayments.length === 0 && <div className="text-center py-16 px-4"><p className="text-[#8A93A5]">No payments found.</p></div>}
            </div>
        </div>
      </div>
    );
};

const ReconciliationView: React.FC<{ runs: ReconciliationRun[], onViewDetails: (run: ReconciliationRun) => void, showToast: PaymentsPageProps['showToast'] }> = ({ runs, onViewDetails, showToast }) => {
    const handleRunReconciliation = () => {
        showToast('Reconciliation job has been queued.', 'success');
        // In a real app, this would trigger a backend job
    };

    return (
        <div className="space-y-4">
            <div className="bg-[#0B0F12] border border-[#1F2733] rounded-xl p-4 flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-white">Daily Reconciliation</h3>
                    <p className="text-xs text-[#8A93A5]">Run and review reconciliation reports against payment provider data.</p>
                </div>
                <button onClick={handleRunReconciliation} className="h-10 px-4 text-sm font-semibold bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white rounded-lg hover:brightness-110 transition-all">
                    Run New Reconciliation
                </button>
            </div>
             <div className="bg-[#0B0F12] border border-[#1F2733] rounded-xl shadow-lg overflow-hidden">
                <h3 className="font-bold text-white text-base p-4">Run History</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-300">
                        <thead className="text-xs text-[#8A93A5] uppercase bg-[#101826]">
                            <tr>
                                <th className="px-6 py-3">Run Date</th>
                                <th className="px-6 py-3">Provider</th>
                                <th className="px-6 py-3">Matches</th>
                                <th className="px-6 py-3">Mismatches</th>
                                <th className="px-6 py-3">Amount Diff (IDR)</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                           {runs.map(run => (
                                <tr key={run.id} className="border-b border-[#1F2733] hover:bg-[#101826] transition-colors">
                                    <td className="px-6 py-4 font-semibold text-white">{new Date(run.runDate).toLocaleDateString('id-ID')}</td>
                                    <td className="px-6 py-4">{run.provider}</td>
                                    <td className="px-6 py-4 text-green-400">{run.okCount}</td>
                                    <td className={`px-6 py-4 ${run.mismatchCount > 0 ? 'text-red-400 font-bold' : ''}`}>{run.mismatchCount}</td>
                                    <td className={`px-6 py-4 font-mono ${run.amountDiff !== 0 ? 'text-orange-400' : ''}`}>{run.amountDiff.toLocaleString('id-ID')}</td>
                                    <td className="px-6 py-4"><span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${run.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{run.status}</span></td>
                                    <td className="px-6 py-4"><button onClick={() => onViewDetails(run)} className="text-xs font-bold text-sky-400 hover:underline">View Details</button></td>
                                </tr>
                           ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


const PaymentsPage: React.FC<PaymentsPageProps> = ({ orders, reconciliationRuns, onViewReconciliation, showToast }) => {
  const [activeTab, setActiveTab] = useState<'transactions' | 'reconciliation'>('transactions');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Payments & Reconciliation</h2>
        <p className="text-sm text-[#8A93A5]">Manage transactions and reconcile financial data.</p>
      </div>
      
      <div className="flex border-b border-[#1F2733]">
        <button onClick={() => setActiveTab('transactions')} className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === 'transactions' ? 'text-white border-b-2 border-[#7F1DFF]' : 'text-[#8A93A5] hover:text-white'}`}>
          Transactions
        </button>
        <button onClick={() => setActiveTab('reconciliation')} className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === 'reconciliation' ? 'text-white border-b-2 border-[#7F1DFF]' : 'text-[#8A93A5] hover:text-white'}`}>
          Reconciliation
        </button>
      </div>

      {activeTab === 'transactions' && <TransactionsView orders={orders} />}
      {activeTab === 'reconciliation' && <ReconciliationView runs={reconciliationRuns} onViewDetails={onViewReconciliation} showToast={showToast} />}
    </div>
  );
};

export default PaymentsPage;
