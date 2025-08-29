import React, { useState, useEffect } from 'react';
import { AdminUser } from '../../types.ts';
import { XMarkIcon } from '../icons/index.tsx';

interface RoleEditModalProps {
    user: AdminUser;
    onClose: () => void;
    onSave: (user: AdminUser, newRoles: string[]) => void;
}

const ALL_ROLES = ["admin", "dev", "ops", "cs", "finance", "content"];

const RoleEditModal: React.FC<RoleEditModalProps> = ({ user, onClose, onSave }) => {
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    useEffect(() => {
        setSelectedRoles(user.roles);
    }, [user]);

    const handleRoleChange = (role: string, checked: boolean) => {
        if (checked) {
            setSelectedRoles(prev => [...prev, role]);
        } else {
            setSelectedRoles(prev => prev.filter(r => r !== role));
        }
    };

    const handleSave = () => {
        onSave(user, selectedRoles);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black/60" onClick={onClose}></div>
            <div className="relative bg-[#0B0F12] border border-[#1F2733] w-full max-w-md rounded-2xl shadow-lg p-6 m-4">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-white">Edit Roles</h2>
                        <p className="text-xs text-[#8A93A5] mt-1">{user.email}</p>
                    </div>
                    <button onClick={onClose} aria-label="Close" className="p-1 rounded-full text-[#8A93A5] hover:bg-[#1F2733] hover:text-white">
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="mt-6 space-y-3">
                    <p className="text-sm text-gray-300">Select the roles for this user:</p>
                    <div className="grid grid-cols-2 gap-3 p-3 bg-[#101826] rounded-lg">
                        {ALL_ROLES.map(role => (
                            <label key={role} className="flex items-center space-x-2 p-2 rounded-md hover:bg-[#1F2733] cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedRoles.includes(role)}
                                    onChange={(e) => handleRoleChange(role, e.target.checked)}
                                    className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-[#7F1DFF] focus:ring-[#38BDF8]"
                                />
                                <span className="text-sm font-semibold text-white capitalize">{role}</span>
                            </label>
                        ))}
                    </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-3">
                    <button onClick={onClose} className="h-10 px-5 text-sm font-semibold bg-[#1F2733] text-white rounded-xl hover:bg-gray-700 transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="h-10 px-5 text-sm font-semibold bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white rounded-xl hover:brightness-110 transition-all">
                        Save Roles
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoleEditModal;
