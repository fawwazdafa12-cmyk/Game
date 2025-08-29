import React, { useState, useMemo } from 'react';
import { SearchIcon, PencilIcon } from '../icons/index.tsx';
import { AdminUser } from '../../types.ts';

interface SettingsPageProps {
  users: AdminUser[];
  onEditUserRoles: (user: AdminUser) => void;
}

const roleColors: Record<string, string> = {
    admin: 'bg-red-500/30 text-red-300',
    dev: 'bg-indigo-500/30 text-indigo-300',
    ops: 'bg-sky-500/30 text-sky-300',
    cs: 'bg-teal-500/30 text-teal-300',
    finance: 'bg-amber-500/30 text-amber-300',
    content: 'bg-pink-500/30 text-pink-300',
};

const SettingsPage: React.FC<SettingsPageProps> = ({ users, onEditUserRoles }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const adminUsers = useMemo(() => {
      return users.filter(u => u.roles.length > 0)
                  .filter(u => u.email.toLowerCase().includes(searchQuery.toLowerCase()) || u.name?.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [users, searchQuery]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-sm text-[#8A93A5]">Manage application-wide settings and permissions.</p>
      </div>

      <div className="bg-[#0B0F12] border border-[#1F2733] rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-white mb-1">Roles & Permissions</h3>
        <p className="text-sm text-[#8A93A5] mb-4">Assign and revoke roles for administrative users.</p>

        <div className="relative w-full max-w-sm mb-4">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A93A5]" />
          <input
            type="text"
            placeholder="Search admin users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-11 pr-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none transition-all"
          />
        </div>
        
        <div className="overflow-x-auto">
             <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs text-[#8A93A5] uppercase bg-[#101826]">
                    <tr>
                        <th className="px-6 py-3">User</th>
                        <th className="px-6 py-3">Roles</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {adminUsers.map(user => (
                        <tr key={user.id} className="border-b border-[#1F2733]">
                            <td className="px-6 py-4">
                                <div className="font-semibold text-white">{user.name}</div>
                                <div className="text-xs text-[#8A93A5]">{user.email}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-wrap gap-1">
                                    {user.roles.map(role => (
                                        <span key={role} className={`px-2 py-0.5 text-[10px] font-bold rounded-full capitalize ${roleColors[role] || 'bg-gray-500/30 text-gray-300'}`}>
                                            {role}
                                        </span>
                                    ))}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button onClick={() => onEditUserRoles(user)} className="p-1.5 text-gray-400 hover:text-white hover:bg-[#1F2733] rounded-md" title="Edit Roles">
                                    <PencilIcon className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
             </table>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
