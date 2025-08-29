import React, { useState, useMemo } from 'react';
import { SearchIcon } from '../icons/index.tsx';
import { AdminCSTicket } from '../../types.ts';

interface CsPageProps {
  tickets: AdminCSTicket[];
  onTicketSelect: (ticket: AdminCSTicket) => void;
}

const statusStyles: Record<AdminCSTicket['status'], string> = {
  open: 'bg-blue-500/20 text-blue-400',
  in_progress: 'bg-yellow-500/20 text-yellow-400',
  resolved: 'bg-green-500/20 text-green-400',
  closed: 'bg-gray-600/50 text-gray-400',
};

const priorityStyles: Record<AdminCSTicket['priority'], string> = {
    low: 'text-gray-400',
    medium: 'text-yellow-400',
    high: 'text-red-400',
};

const CsPage: React.FC<CsPageProps> = ({ tickets, onTicketSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<AdminCSTicket['status'] | 'all'>('all');
  
  const filters: (AdminCSTicket['status'] | 'all')[] = ['all', 'open', 'in_progress', 'resolved', 'closed'];

  const filteredTickets = useMemo(() => {
    return tickets
      .filter(t => statusFilter === 'all' || t.status === statusFilter)
      .filter(t =>
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [searchQuery, statusFilter, tickets]);

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
            <h2 className="text-2xl font-bold text-white">Customer Support Tickets</h2>
            <p className="text-sm text-[#8A93A5]">Manage and respond to user inquiries.</p>
        </div>
        <div className="relative w-full md:w-80">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A93A5]" />
            <input 
                type="text"
                placeholder="Search by Ticket ID, Subject, Email..."
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
                <th scope="col" className="px-6 py-3">Ticket ID</th>
                <th scope="col" className="px-6 py-3">Subject</th>
                <th scope="col" className="px-6 py-3">User</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Priority</th>
                <th scope="col" className="px-6 py-3">Last Update</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map(t => (
                <tr key={t.id} onClick={() => onTicketSelect(t)} className="border-b border-[#1F2733] hover:bg-[#101826] transition-colors cursor-pointer">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-white">{t.id}</td>
                  <td className="px-6 py-4 font-semibold max-w-xs truncate">{t.subject}</td>
                  <td className="px-6 py-4 text-xs">{t.userEmail}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${statusStyles[t.status]}`}>
                        {t.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-bold capitalize text-xs ${priorityStyles[t.priority]}`}>
                        {t.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs">{new Date(t.lastUpdate).toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
            {filteredTickets.length === 0 && (
                <div className="text-center py-16 px-4">
                    <p className="text-[#8A93A5]">No tickets found.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CsPage;
