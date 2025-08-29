
import React from 'react';
import { AdminOrder, AdminOrderStatus } from '../../types.ts';
import { XMarkIcon, PencilIcon, EnvelopeIcon, CurrencyDollarIcon } from '../icons/index.tsx';
import { formatDateTimeShort } from '../../src/lib/time.ts';

interface OrderDetailDrawerProps {
  order: AdminOrder | null;
  onClose: () => void;
  onUpdateStatus: () => void;
  onRefund: () => void;
  onResend: (channel: 'email' | 'wa') => void;
}

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

const DetailRow: React.FC<{ label: string; value: string | number | undefined; isMono?: boolean }> = ({ label, value, isMono = false }) => (
    <div className="flex justify-between text-xs py-2 border-b border-[#1F2733]/50">
        <span className="text-[#8A93A5]">{label}</span>
        <span className={`font-semibold text-white ${isMono ? 'font-mono' : ''}`}>{value}</span>
    </div>
);

const OrderDetailDrawer: React.FC<OrderDetailDrawerProps> = ({ order, onClose, onUpdateStatus, onRefund, onResend }) => {
  const isOpen = !!order;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      {/* Drawer */}
      <aside className={`fixed top-0 right-0 h-full w-full max-w-lg bg-[#0B0F12] z-[70] transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {order && (
          <>
            <header className="h-20 flex-shrink-0 flex items-center justify-between px-6 border-b border-[#1F2733]">
              <div>
                <h2 className="text-lg font-bold text-white">Order Details</h2>
                <p className="text-xs text-[#8A93A5] font-mono">{order.order.id}</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-[#1F2733] text-[#8A93A5] hover:text-white">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </header>

            <main className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Order Summary */}
              <section className="bg-[#101826] border border-[#1F2733] rounded-xl p-4">
                 <div className="flex justify-between items-center mb-4">
                     <span className={`px-3 py-1 text-sm font-bold rounded-full capitalize ${statusStyles[order.order.status]}`}>
                        {order.order.status.replace('_', ' ')}
                    </span>
                    <span className="text-xl font-bold text-[#7F1DFF]">
                        Rp{order.order.total_idr.toLocaleString('id-ID')}
                    </span>
                 </div>
                 <div className="space-y-1">
                    <DetailRow label="Customer" value={order.order.buyer_email} />
                    <DetailRow label="Payment Channel" value={order.order.channel} />
                    <DetailRow label="Order Date" value={formatDateTimeShort(order.order.created_at)} />
                 </div>
              </section>

              {/* Items */}
              <section>
                 <h3 className="text-sm font-bold text-white mb-2">Items</h3>
                 <div className="bg-[#101826] border border-[#1F2733] rounded-xl p-4 space-y-3">
                    {order.items.map(item => (
                        <div key={item.id} className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-white text-sm">{item.product}</p>
                                <p className="text-xs text-[#8A93A5]">{item.variant_id}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-white text-sm">Rp{item.total_price_idr.toLocaleString('id-ID')}</p>
                                <p className="text-xs text-[#8A93A5]">{item.qty} x Rp{item.unit_price_idr.toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    ))}
                 </div>
              </section>

              {/* Payments */}
              <section>
                <h3 className="text-sm font-bold text-white mb-2">Payments</h3>
                 <div className="bg-[#101826] border border-[#1F2733] rounded-xl p-4">
                    {order.payments.map(p => (
                         <div key={p.id} className="space-y-1">
                            <DetailRow label="Payment ID" value={p.id} isMono />
                            <DetailRow label="Status" value={p.status.toUpperCase()} />
                            <DetailRow label="Amount" value={`Rp${p.amount_idr.toLocaleString('id-ID')}`} />
                            <DetailRow label="Fee" value={`Rp${p.fee_idr.toLocaleString('id-ID')}`} />
                            <DetailRow label="Paid At" value={formatDateTimeShort(p.paid_at)} />
                         </div>
                    ))}
                 </div>
              </section>
            </main>
            
            <footer className="flex-shrink-0 p-6 border-t border-[#1F2733] bg-[#0B0F12]">
                <h3 className="text-sm font-bold text-white mb-3">Actions</h3>
                <div className="grid grid-cols-3 gap-3">
                     <button onClick={onUpdateStatus} className="h-10 flex items-center justify-center space-x-2 text-xs font-semibold bg-[#101826] border border-[#1F2733] text-white rounded-lg hover:bg-[#1F2733] transition-colors">
                        <PencilIcon className="w-4 h-4" />
                        <span>Change Status</span>
                    </button>
                    <button onClick={() => onResend('email')} className="h-10 flex items-center justify-center space-x-2 text-xs font-semibold bg-[#101826] border border-[#1F2733] text-white rounded-lg hover:bg-[#1F2733] transition-colors">
                        <EnvelopeIcon className="w-4 h-4" />
                        <span>Resend Email</span>
                    </button>
                    <button onClick={onRefund} className="h-10 flex items-center justify-center space-x-2 text-xs font-semibold bg-red-900/50 border border-red-800 text-red-400 rounded-lg hover:bg-red-900 transition-colors">
                        <CurrencyDollarIcon className="w-4 h-4" />
                        <span>Refund</span>
                    </button>
                </div>
            </footer>
          </>
        )}
      </aside>
    </>
  );
};

export default OrderDetailDrawer;
