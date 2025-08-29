import React, { useState, useMemo } from 'react';
import { SearchIcon } from '../icons/index.tsx';
import { AdminOrder, AdminOrderStatus } from '../../types.ts';
import { formatDateTimeShort } from '../../src/lib/time.ts';

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

interface OrdersPageProps {
  orders: AdminOrder[];
  onOrderSelect: (order: AdminOrder) => void;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ orders, onOrderSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<AdminOrderStatus | 'all'>('all');
  
  const filters: (AdminOrderStatus | 'all')[] = ['all', 'completed', 'awaiting_payment', 'paid', 'processing', 'failed', 'cancelled', 'refunded'];

  const filteredOrders = useMemo(() => {
    return orders
      .filter(o => statusFilter === 'all' || o.order.status === statusFilter)
      .filter(o =>
        o.order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.order.buyer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.items[0]?.product.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [searchQuery, statusFilter, orders]);

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
            <h2 className="text-2xl font-bold text-white">Order Management</h2>
            <p className="text-sm text-[#8A93A5]">View, search, and manage customer orders.</p>
        </div>
        <div className="relative w-full md:w-80">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A93A5]" />
            <input 
                type="text"
                placeholder="Search by Order ID, Email, Product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-11 pr-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none transition-all"
            />
        </div>
      </div>
      
      <div className="flex space-x-2 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setStatusFilter(filter)}
            className={`flex-shrink-0 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200 capitalize ${
                statusFilter === filter
                ? 'bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white'
                : 'bg-[#101826] text-[#8A93A5] hover:bg-[#1F2733] hover:text-white'
            }`}
          >
            {filter.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="bg-[#0B0F12] border border-[#1F2733] rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
             <thead className="text-xs text-[#8A93A5] uppercase bg-[#101826]">
              <tr>
                <th scope="col" className="px-6 py-3">Order ID</th>
                <th scope="col" className="px-6 py-3">Customer</th>
                <th scope="col" className="px-6 py-3">Product</th>
                <th scope="col" className="px-6 py-3">Total</th>
                <th scope="col" className="px-6 py-3">Channel</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(o => (
                <tr key={o.order.id} onClick={() => onOrderSelect(o)} className="border-b border-[#1F2733] hover:bg-[#101826] transition-colors cursor-pointer">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-white">{o.order.id}</td>
                  <td className="px-6 py-4 text-xs">{o.order.buyer_email}</td>
                  <td className="px-6 py-4 font-semibold">{o.items[0]?.product || 'N/A'}</td>
                  <td className="px-6 py-4 font-semibold">Rp{o.order.total_idr.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4 capitalize">{o.order.channel}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${statusStyles[o.order.status]}`}>
                        {o.order.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs">{formatDateTimeShort(o.order.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <div className="text-center py-16 px-4">
                <p className="text-[#8A93A5]">No orders found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;