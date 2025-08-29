import React from 'react';
import { XMarkIcon, ExclamationTriangleIcon } from '../icons/index.tsx';

interface ConfirmationModalProps {
    title: string;
    message: string;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ title, message, onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black/60" onClick={onClose}></div>
            <div className="relative bg-[#0B0F12] border border-[#1F2733] w-full max-w-md rounded-2xl shadow-lg p-6 m-4">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-red-900/50 border border-red-800">
                        <ExclamationTriangleIcon className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white">{title}</h2>
                        <p className="text-sm text-[#8A93A5] mt-1">{message}</p>
                    </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-3">
                    <button onClick={onClose} className="h-10 px-5 text-sm font-semibold bg-[#1F2733] text-white rounded-xl hover:bg-gray-700 transition-colors">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="h-10 px-5 text-sm font-semibold bg-red-800 text-white rounded-xl hover:bg-red-700 transition-colors">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
