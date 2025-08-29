
import React from 'react';
import { ReconciliationRun, ReconciliationMismatch } from '../../types';
import { XMarkIcon } from '../icons';
import { formatDateOnlyShort } from '../../src/lib/time';

interface ReconciliationDetailModalProps {
    run: ReconciliationRun | null;
    onClose: () => void;
}

const typeStyles: Record<ReconciliationMismatch['type'], string> = {
    amount_diff: 'bg-orange-500/20 text-orange-400',
    missing_local: 'bg-red-500/20 text-red-400',
    missing_remote: 'bg-yellow-500/20 text-yellow-400',
};

const ReconciliationDetailModal: React.FC<ReconciliationDetailModalProps> = ({ run, onClose }) => {
    if (!run) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black/60" onClick={onClose}></div>
            <div className="relative bg-[#0B0F12] border border-[#1F2733] w-full max-w-4xl rounded-2xl shadow-lg m-4 flex flex-col" style={{maxHeight: '90vh'}}>
                <header className="flex-shrink-0 flex items-start justify-between p-6 border-b border-[#1F2733]">
                    <div>
                        <h2 className="text-lg font-bold text-white">Reconciliation Details</h2>
                        <p className="text-xs text-[#8A93A5] mt-1">Run on {formatDateOnlyShort(run.runDate)} for {run.provider}</p>
                    </div>
                    <button onClick={onClose} aria-label="Close" className="p-1 rounded-full text-[#8A93A5] hover:bg-[#1F2733] hover:text-white">
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto p-6">
                     <div className="grid grid-cols-4 gap-4 text-center mb-6">
                        <div className="bg-[#101826] p-3 rounded-lg"><p className="text-xs text-[#8A93A5]">Matches</p><p className="font-bold text-lg text-green-400">{run.okCount}</p></div>
                        <div className="bg-[#101826] p-3 rounded-lg"><p className="text-xs text-[#8A93A5]">Mismatches</p><p className="font-bold text-lg text-red-400">{run.mismatchCount}</p></div>
                        <div className="bg-[#101826] p-3 rounded-lg"><p className="text-xs text-[#8A93A5]">Amount Diff</p><p className="font-bold text-lg text-orange-400">Rp{run.amountDiff.toLocaleString()}</p></div>
                        <div className="bg-[#101826] p-3 rounded-lg"><p className="text-xs text-[#8A93A5]">Status</p><p className="font-bold text-lg text-white capitalize">{run.status}</p></div>
                    </div>

                    <div className="bg-[#0B0F12] border border-[#1F2733] rounded-xl shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-300">
                                <thead className="text-xs text-[#8A93A5] uppercase bg-[#101826]">
                                <tr>
                                    <th className="px-4 py-2">Type</th>
                                    <th className="px-4 py-2">Order ID</th>
                                    <th className="px-4 py-2">External ID</th>
                                    <th className="px-4 py-2">Local Amt (Rp)</th>
                                    <th className="px-4 py-2">Remote Amt (Rp)</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2 text-right">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {run.mismatches.map(m => (
                                    <tr key={m.id} className="border-b border-[#1F2733]">
                                        <td className="px-4 py-2"><span className={`px-2 py-0.5 text-[10px] font-bold rounded-full capitalize ${typeStyles[m.type]}`}>{m.type.replace('_', ' ')}</span></td>
                                        <td className="px-4 py-2 font-mono text-xs">{m.orderId}</td>
                                        <td className="px-4 py-2 font-mono text-xs">{m.externalId}</td>
                                        <td className="px-4 py-2 font-mono text-xs">{m.localAmount?.toLocaleString() ?? 'N/A'}</td>
                                        <td className="px-4 py-2 font-mono text-xs">{m.remoteAmount?.toLocaleString() ?? 'N/A'}</td>
                                        <td className="px-4 py-2"><span className={`font-semibold text-xs capitalize ${m.status === 'resolved' ? 'text-green-400' : 'text-yellow-400'}`}>{m.status}</span></td>
                                        <td className="px-4 py-2 text-right">
                                            {m.status === 'unresolved' && <button className="text-xs font-bold text-sky-400 hover:underline">Resolve</button>}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            {run.mismatches.length === 0 && <p className="text-center py-8 text-sm text-[#8A93A5]">No mismatches found.</p>}
                        </div>
                    </div>
                </main>
                
                <footer className="flex-shrink-0 p-4 border-t border-[#1F2733] flex justify-end">
                    <button onClick={onClose} className="h-10 px-5 text-sm font-semibold bg-[#1F2733] text-white rounded-xl hover:bg-gray-700 transition-colors">
                        Close
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default ReconciliationDetailModal;
