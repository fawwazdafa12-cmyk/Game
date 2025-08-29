import React, { useState } from 'react';
import { AdminOrder, AdminOrderStatus } from '../../types.ts';
import { XMarkIcon } from '../icons/index.tsx';

interface OrderStatusModalProps {
    order: AdminOrder;
    onClose: () => void;
    onSave: (order: AdminOrder, newStatus: AdminOrderStatus) => void;
}

const ALL_STATUSES: AdminOrderStatus[] = ["pending", "awaiting_payment", "processing", "paid", "completed", "failed", "cancelled", "refunded"];

const OrderStatusModal: React.FC<OrderStatusModalProps> = ({ order, onClose, onSave }) => {
    const [selectedStatus, setSelectedStatus] = useState<AdminOrderStatus>(order.order.status);
    
    const handleSave = () => {
        onSave(order, selectedStatus);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black/60" onClick={onClose}></div>
            <div className="relative bg-[#0B0F12] border border-[#1F2733] w-full max-w-md rounded-2xl shadow-lg p-6 m-4">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-white">Change Order Status</h2>
                        <p className="text-xs text-[#8A93A5] font-mono mt-1">{order.order.id}</p>
                    </div>
                    <button onClick={onClose} aria-label="Close" className="p-1 rounded-full text-[#8A93A5] hover:bg-[#1F2733] hover:text-white">
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="order-status" className="block text-sm font-semibold text-white mb-2">
                            New Status
                        </label>
                        <select
                            id="order-status"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value as AdminOrderStatus)}
                            className="w-full h-11 px-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none capitalize"
                        >
                            {ALL_STATUSES.map(status => (
                                <option key={status} value={status} className="capitalize">
                                    {status.replace('_', ' ')}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-3">
                    <button onClick={onClose} className="h-10 px-5 text-sm font-semibold bg-[#1F2733] text-white rounded-xl hover:bg-gray-700 transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="h-10 px-5 text-sm font-semibold bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white rounded-xl hover:brightness-110 transition-all">
                        Save Status
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderStatusModal;
