import React, { useState, useEffect } from 'react';
import { AdminUser } from '../../types.ts';
import { XMarkIcon, NoSymbolIcon, CheckCircleIcon } from '../icons/index.tsx';
import { formatDateTimeShort } from '../../src/lib/time.ts';

interface UserDetailDrawerProps {
  user: AdminUser | null;
  onClose: () => void;
  onUpdateUser: (user: AdminUser) => void;
}

const ALL_ROLES = ["admin", "dev", "ops", "cs", "finance", "content"];

const roleColors: Record<string, string> = {
    admin: 'border-red-500/50 text-red-300',
    dev: 'border-indigo-500/50 text-indigo-300',
    ops: 'border-sky-500/50 text-sky-300',
    cs: 'border-teal-500/50 text-teal-300',
    finance: 'border-amber-500/50 text-amber-300',
    content: 'border-pink-500/50 text-pink-300',
};

const DetailRow: React.FC<{ label: string; value: string | null | undefined; }> = ({ label, value }) => (
    <div className="flex justify-between text-xs py-2 border-b border-[#1F2733]/50">
        <span className="text-[#8A93A5]">{label}</span>
        <span className="font-semibold text-white">{value || '-'}</span>
    </div>
);

const UserDetailDrawer: React.FC<UserDetailDrawerProps> = ({ user, onClose, onUpdateUser }) => {
  const isOpen = !!user;
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(user);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  if (!currentUser) return null;

  const handleRoleChange = (role: string, checked: boolean) => {
    const newRoles = checked
      ? [...currentUser.roles, role]
      : currentUser.roles.filter(r => r !== role);
    setCurrentUser({ ...currentUser, roles: newRoles });
  };
  
  const handleStatusChange = () => {
    const newStatus = currentUser.status === 'active' ? 'banned' : 'active';
    setCurrentUser({ ...currentUser, status: newStatus });
  };

  const handleSaveChanges = () => {
    onUpdateUser(currentUser);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <aside className={`fixed top-0 right-0 h-full w-full max-w-lg bg-[#0B0F12] z-[70] transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <header className="h-20 flex-shrink-0 flex items-center justify-between px-6 border-b border-[#1F2733]">
          <div>
            <h2 className="text-lg font-bold text-white">User Details</h2>
            <p className="text-xs text-[#8A93A5]">{currentUser.email}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-[#1F2733] text-[#8A93A5] hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <section className="bg-[#101826] border border-[#1F2733] rounded-xl p-4">
            <div className="flex items-center space-x-4 mb-4">
              <img src={`https://i.pravatar.cc/64?u=${currentUser.email}`} alt={currentUser.name || ''} className="w-16 h-16 rounded-full" />
              <div>
                <h3 className="text-xl font-bold text-white">{currentUser.name || 'N/A'}</h3>
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize mt-1 inline-block ${
                    currentUser.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {currentUser.status}
                </span>
              </div>
            </div>
            <div className="space-y-1 divide-y divide-[#1F2733]/50">
              <DetailRow label="User ID" value={currentUser.id} />
              <DetailRow label="Created At" value={formatDateTimeShort(currentUser.created_at)} />
              <DetailRow label="Last Seen" value={currentUser.last_seen ? formatDateTimeShort(currentUser.last_seen) : 'Never'} />
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold text-white mb-2">Manage Roles</h3>
            <div className="bg-[#101826] border border-[#1F2733] rounded-xl p-4 grid grid-cols-2 gap-3">
              {ALL_ROLES.map(role => (
                <label key={role} className={`flex items-center space-x-2 p-2 rounded-md border-2 capitalize transition-colors cursor-pointer ${
                    currentUser.roles.includes(role) ? `bg-purple-900/50 ${roleColors[role] || 'border-gray-500/50'}` : 'border-transparent bg-[#1F2733] hover:bg-gray-700'
                }`}>
                  <input
                    type="checkbox"
                    checked={currentUser.roles.includes(role)}
                    onChange={(e) => handleRoleChange(role, e.target.checked)}
                    className="w-4 h-4 rounded bg-gray-600 border-gray-500 text-[#7F1DFF] focus:ring-[#38BDF8]"
                  />
                  <span className="text-sm font-semibold text-white">{role}</span>
                </label>
              ))}
            </div>
          </section>
        </main>

        <footer className="flex-shrink-0 p-6 border-t border-[#1F2733] bg-[#0B0F12] flex justify-between items-center">
          <button
            onClick={handleStatusChange}
            className={`h-11 px-4 flex items-center justify-center space-x-2 text-sm font-semibold rounded-xl border transition-colors ${
              currentUser.status === 'active'
                ? 'bg-red-900/50 border-red-800 text-red-400 hover:bg-red-900'
                : 'bg-green-900/50 border-green-800 text-green-400 hover:bg-green-900'
            }`}
          >
            {currentUser.status === 'active' ? <NoSymbolIcon className="w-4 h-4" /> : <CheckCircleIcon className="w-4 h-4" />}
            <span>{currentUser.status === 'active' ? 'Ban User' : 'Unban User'}</span>
          </button>
          <button onClick={handleSaveChanges} className="h-11 px-6 font-semibold bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white rounded-xl hover:brightness-110 transition-all">
            Save Changes
          </button>
        </footer>
      </aside>
    </>
  );
};

export default UserDetailDrawer;