import React, { useState } from 'react';
import { AdminReportFormData } from '../../types.ts';
import { ArrowDownTrayIcon } from '../icons/index.tsx';

interface ReportsPageProps {
  onExport: (reportType: string, filters: AdminReportFormData) => void;
}

const ReportCard: React.FC<{ title: string; children: React.ReactNode; onExport: () => void; }> = ({ title, children, onExport }) => (
    <div className="bg-[#0B0F12] border border-[#1F2733] rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
        <div className="space-y-4">
            {children}
        </div>
        <div className="mt-6 text-right">
            <button
                onClick={onExport}
                className="h-11 px-5 flex items-center justify-center space-x-2 font-semibold bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white rounded-xl hover:brightness-110 transition-all ml-auto"
            >
                <ArrowDownTrayIcon className="w-5 h-5" />
                <span>Export CSV</span>
            </button>
        </div>
    </div>
);

const ReportsPage: React.FC<ReportsPageProps> = ({ onExport }) => {
  const [orderFilters, setOrderFilters] = useState<AdminReportFormData>({ startDate: '', endDate: '', status: 'all' });
  const [voucherFilters, setVoucherFilters] = useState<AdminReportFormData>({ startDate: '', endDate: '', status: 'all' });
  const [coinFilters, setCoinFilters] = useState<AdminReportFormData>({ startDate: '', endDate: '', status: '', userId: '' });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Reports & Export</h2>
        <p className="text-sm text-[#8A93A5]">Generate and download data for analysis and accounting.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Report */}
        <ReportCard title="Orders Report" onExport={() => onExport('orders', orderFilters)}>
           <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs text-[#8A93A5] mb-1 block">Start Date</label>
                    <input type="date" value={orderFilters.startDate} onChange={e => setOrderFilters(f => ({...f, startDate: e.target.value}))} className="w-full h-10 px-3 bg-[#101826] border border-[#1F2733] rounded-md" />
                </div>
                 <div>
                    <label className="text-xs text-[#8A93A5] mb-1 block">End Date</label>
                    <input type="date" value={orderFilters.endDate} onChange={e => setOrderFilters(f => ({...f, endDate: e.target.value}))} className="w-full h-10 px-3 bg-[#101826] border border-[#1F2733] rounded-md" />
                </div>
            </div>
            <div>
                <label className="text-xs text-[#8A93A5] mb-1 block">Status</label>
                <select value={orderFilters.status} onChange={e => setOrderFilters(f => ({...f, status: e.target.value}))} className="w-full h-10 px-3 bg-[#101826] border border-[#1F2733] rounded-md capitalize">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="refunded">Refunded</option>
                    <option value="failed">Failed</option>
                </select>
            </div>
        </ReportCard>

        {/* Products Report */}
        <ReportCard title="Products Catalog" onExport={() => onExport('products', { startDate: '', endDate: '', status: '' })}>
            <p className="text-sm text-gray-400">Export the entire product catalog including all variants, prices, and statuses.</p>
        </ReportCard>
        
        {/* Vouchers Report */}
        <ReportCard title="Vouchers Report" onExport={() => onExport('vouchers', voucherFilters)}>
            <div>
                <label className="text-xs text-[#8A93A5] mb-1 block">Status</label>
                <select value={voucherFilters.status} onChange={e => setVoucherFilters(f => ({...f, status: e.target.value}))} className="w-full h-10 px-3 bg-[#101826] border border-[#1F2733] rounded-md">
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
        </ReportCard>

        {/* Coins Ledger Report */}
        <ReportCard title="Coins Ledger Report" onExport={() => onExport('coins', coinFilters)}>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs text-[#8A93A5] mb-1 block">Start Date</label>
                    <input type="date" value={coinFilters.startDate} onChange={e => setCoinFilters(f => ({...f, startDate: e.target.value}))} className="w-full h-10 px-3 bg-[#101826] border border-[#1F2733] rounded-md" />
                </div>
                 <div>
                    <label className="text-xs text-[#8A93A5] mb-1 block">End Date</label>
                    <input type="date" value={coinFilters.endDate} onChange={e => setCoinFilters(f => ({...f, endDate: e.target.value}))} className="w-full h-10 px-3 bg-[#101826] border border-[#1F2733] rounded-md" />
                </div>
            </div>
            <div>
                <label className="text-xs text-[#8A93A5] mb-1 block">User ID (Optional)</label>
                <input type="text" value={coinFilters.userId} onChange={e => setCoinFilters(f => ({...f, userId: e.target.value}))} placeholder="Enter User ID to filter" className="w-full h-10 px-3 bg-[#101826] border border-[#1F2733] rounded-md" />
            </div>
        </ReportCard>
      </div>
    </div>
  );
};

export default ReportsPage;
