import React, { useState, useMemo } from 'react';
import { SearchIcon } from '../icons/index.tsx';
import { AdminUser } from '../../types.ts';

interface UsersPageProps {
  users: AdminUser[];
  onUserSelect: (user: AdminUser) => void;
}

const roleColors: Record<string, string> = {
    admin: 'bg-red-500/30 text-red-300',
    dev: 'bg-indigo-500/30 text-indigo-300',
    ops: 'bg-sky-500/30 text-sky-300',
    cs: 'bg-teal-500/30 text-teal-300',
    finance: 'bg-amber-500/30 text-amber-300',
    content: 'bg-pink-500/30 text-pink-300',
};

const UsersPage: React.FC<UsersPageProps> = ({ users, onUserSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, users]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <p className="text-sm text-[#8A93A5]">Manage user roles and statuses.</p>
        </div>
        <div className="relative w-full md:w-80">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A93A5]" />
          <input
            type="text"
            placeholder="Search by email or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-11 pr-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none transition-all"
          />
        </div>
      </div>

      <div className="bg-[#0B0F12] border border-[#1F2733] rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-[#8A93A5] uppercase bg-[#101826]">
              <tr>
                <th scope="col" className="px-6 py-3">User</th>
                <th scope="col" className="px-6 py-3">Roles</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map(user => (
                <tr key={user.id} onClick={() => onUserSelect(user)} className="border-b border-[#1F2733] hover:bg-[#101826] transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">{user.name || 'N/A'}</div>
                    <div className="text-xs text-[#8A93A5]">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.roles.length > 0 ? user.roles.map(role => (
                        <span key={role} className={`px-2 py-0.5 text-[10px] font-bold rounded-full capitalize ${roleColors[role] || 'bg-gray-500/30 text-gray-300'}`}>
                          {role}
                        </span>
                      )) : <span className="text-xs text-gray-500">-</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${
                      user.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs">{new Date(user.created_at).toLocaleDateString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="text-center py-16 px-4">
              <p className="text-[#8A93A5]">No users found for "{searchQuery}".</p>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center p-4 text-xs text-[#8A93A5]">
          <span>Page {currentPage} of {totalPages}</span>
          <div className="flex gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 border border-[#1F2733] rounded-md hover:bg-[#1F2733] disabled:opacity-50">Previous</button>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border border-[#1F2733] rounded-md hover:bg-[#1F2733] disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
