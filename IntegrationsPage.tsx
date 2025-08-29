
import React, { useState } from 'react';
import { PaymentCategory, WebhookLog, WebhookJob, PaymentMethod } from '../../types.ts';
import { formatDateTimeShort } from '../../src/lib/time.ts';

interface IntegrationsPageProps {
  paymentCategories: PaymentCategory[];
  webhooks: WebhookLog[];
  webhookJobs: WebhookJob[];
  onToggleChannel: (methodId: string) => void;
  onWebhookJobAction: (jobId: string, action: 'reprocess' | 'discard') => void;
}

const statusChannelStyles: Record<PaymentMethod['status'], string> = {
    online: 'bg-green-500/20 text-green-400',
    degraded: 'bg-orange-500/20 text-orange-400',
    down: 'bg-red-500/20 text-red-400',
    maintenance: 'bg-gray-600/50 text-gray-400',
    auto_disabled: 'bg-red-800/50 text-red-500',
};

const statusWebhookLogStyles: Record<WebhookLog['status'], string> = {
    processed: 'bg-green-500/20 text-green-400',
    failed: 'bg-red-500/20 text-red-400',
    pending: 'bg-yellow-500/20 text-yellow-400',
};

const statusWebhookJobStyles: Record<WebhookJob['status'], string> = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    processing: 'bg-blue-500/20 text-blue-400',
    done: 'bg-green-500/20 text-green-400',
    failed: 'bg-red-500/20 text-red-400',
    dlq: 'bg-purple-500/20 text-purple-400',
};

const IntegrationsPage: React.FC<IntegrationsPageProps> = ({ paymentCategories, webhooks, webhookJobs, onToggleChannel, onWebhookJobAction }) => {
  const [activeTab, setActiveTab] = useState<'channels' | 'webhooks' | 'dlq'>('channels');
  
  const dlqJobs = webhookJobs.filter(job => job.status === 'dlq');
  const allChannels = paymentCategories.flatMap(c => c.methods);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Integrations</h2>
        <p className="text-sm text-[#8A93A5]">Manage third-party connections like payment gateways and webhooks.</p>
      </div>

      <div className="flex border-b border-[#1F2733]">
        <button onClick={() => setActiveTab('channels')} className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === 'channels' ? 'text-white border-b-2 border-[#7F1DFF]' : 'text-[#8A93A5] hover:text-white'}`}>
          Payment Channels
        </button>
        <button onClick={() => setActiveTab('webhooks')} className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === 'webhooks' ? 'text-white border-b-2 border-[#7F1DFF]' : 'text-[#8A93A5] hover:text-white'}`}>
          Webhook Logs
        </button>
        <button onClick={() => setActiveTab('dlq')} className={`px-4 py-2 text-sm font-semibold transition-colors relative ${activeTab === 'dlq' ? 'text-white border-b-2 border-[#7F1DFF]' : 'text-[#8A93A5] hover:text-white'}`}>
          Dead-Letter Queue
          {dlqJobs.length > 0 && (
            <span className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {dlqJobs.length}
            </span>
          )}
        </button>
      </div>

      <div className="bg-[#0B0F12] border border-[#1F2733] rounded-xl shadow-lg overflow-hidden">
        {activeTab === 'channels' && (
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-[#8A93A5] uppercase bg-[#101826]">
              <tr>
                <th className="px-6 py-3">Channel Name</th>
                <th className="px-6 py-3">Provider</th>
                <th className="px-6 py-3">Success Rate</th>
                <th className="px-6 py-3">Avg Latency (ms)</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Enabled</th>
              </tr>
            </thead>
            <tbody>
              {allChannels.map(ch => (
                <tr key={ch.id} className="border-b border-[#1F2733]">
                  <td className="px-6 py-4 font-semibold text-white">{ch.name}</td>
                  <td className="px-6 py-4">{ch.provider}</td>
                  <td className={`px-6 py-4 font-mono ${ch.successRate < 95 ? 'text-red-400' : 'text-green-400'}`}>{ch.successRate.toFixed(2)}%</td>
                  <td className={`px-6 py-4 font-mono ${ch.avgLatencyMs > 2000 ? 'text-orange-400' : ''}`}>{ch.avgLatencyMs}</td>
                  <td className="px-6 py-4">
                     <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${statusChannelStyles[ch.status]}`}>{ch.status.replace('_', ' ')}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                     <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={ch.status === 'online' || ch.status === 'degraded'} onChange={() => onToggleChannel(ch.id)} className="sr-only peer" disabled={ch.status === 'maintenance'} />
                        <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-[#38BDF8] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7F1DFF] peer-disabled:opacity-50"></div>
                     </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {activeTab === 'webhooks' && (
           <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-[#8A93A5] uppercase bg-[#101826]">
              <tr>
                <th className="px-6 py-3">Provider</th>
                <th className="px-6 py-3">External ID</th>
                <th className="px-6 py-3">Signature</th>
                <th className="px-6 py-3">Received At</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {webhooks.map(wh => (
                <tr key={wh.id} className="border-b border-[#1F2733]">
                  <td className="px-6 py-4 font-semibold text-white">{wh.provider}</td>
                  <td className="px-6 py-4 font-mono text-xs">{wh.external_id}</td>
                  <td className="px-6 py-4">
                     <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${wh.signature_ok ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{wh.signature_ok ? 'OK' : 'Failed'}</span>
                  </td>
                  <td className="px-6 py-4 text-xs">{formatDateTimeShort(wh.received_at)}</td>
                  <td className="px-6 py-4">
                     <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${statusWebhookLogStyles[wh.status]}`}>{wh.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {activeTab === 'dlq' && (
           <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-[#8A93A5] uppercase bg-[#101826]">
              <tr>
                <th className="px-6 py-3">Job ID</th>
                <th className="px-6 py-3">Provider</th>
                <th className="px-6 py-3">Attempts</th>
                <th className="px-6 py-3">Last Error</th>
                <th className="px-6 py-3">Next Run</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dlqJobs.map(job => (
                <tr key={job.id} className="border-b border-[#1F2733]">
                  <td className="px-6 py-4 font-mono text-xs text-white">{job.id}</td>
                  <td className="px-6 py-4 font-semibold">{job.provider}</td>
                  <td className="px-6 py-4"><span className="font-mono text-xs bg-gray-700 px-2 py-1 rounded-md">{job.attempt}</span></td>
                  <td className="px-6 py-4 text-xs text-red-400 max-w-sm truncate" title={job.last_error || ''}>{job.last_error}</td>
                  <td className="px-6 py-4 text-xs">{formatDateTimeShort(job.next_run_at)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => onWebhookJobAction(job.id, 'reprocess')} className="px-3 py-1 text-xs font-semibold bg-sky-800 text-sky-300 rounded-md hover:bg-sky-700">Reprocess</button>
                      <button onClick={() => onWebhookJobAction(job.id, 'discard')} className="px-3 py-1 text-xs font-semibold border border-[#1F2733] text-gray-400 rounded-md hover:bg-[#1F2733]">Discard</button>
                    </div>
                  </td>
                </tr>
              ))}
               {dlqJobs.length === 0 && (
                <tr>
                    <td colSpan={6} className="text-center py-16 px-4">
                        <p className="text-[#8A93A5]">Dead-Letter Queue is empty.</p>
                    </td>
                </tr>
            )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default IntegrationsPage;
