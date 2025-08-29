
import React, { useState, useEffect } from 'react';
import { AdminCSTicket, TicketMessage } from '../../types.ts';
import { XMarkIcon, PaperAirplaneIcon } from '../icons/index.tsx';
import { formatDateTimeShort } from '../../src/lib/time.ts';

interface CsTicketDetailDrawerProps {
  ticket: AdminCSTicket | null;
  onClose: () => void;
  onUpdateTicket: (ticket: AdminCSTicket) => void;
  agentName: string;
}

const statusOptions: AdminCSTicket['status'][] = ['open', 'in_progress', 'resolved', 'closed'];

const CsTicketDetailDrawer: React.FC<CsTicketDetailDrawerProps> = ({ ticket, onClose, onUpdateTicket, agentName }) => {
  const isOpen = !!ticket;
  const [replyText, setReplyText] = useState('');
  
  const handleStatusChange = (newStatus: AdminCSTicket['status']) => {
      if (!ticket) return;
      const updatedTicket = { ...ticket, status: newStatus, lastUpdate: new Date().toISOString() };
      onUpdateTicket(updatedTicket);
  };

  const handleSendReply = () => {
      if (!ticket || !replyText.trim()) return;

      const newReply: TicketMessage = {
          id: `m_${Date.now()}`,
          sender: 'agent',
          agentName: agentName,
          text: replyText.trim(),
          timestamp: new Date().toISOString()
      };
      
      const updatedTicket: AdminCSTicket = {
          ...ticket,
          messages: [...ticket.messages, newReply],
          lastUpdate: new Date().toISOString()
      };

      onUpdateTicket(updatedTicket);
      setReplyText('');
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <aside className={`fixed top-0 right-0 h-full w-full max-w-lg bg-[#0B0F12] z-[70] transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {ticket && (
          <>
            <header className="h-20 flex-shrink-0 flex items-center justify-between px-6 border-b border-[#1F2733]">
              <div>
                <h2 className="text-lg font-bold text-white truncate max-w-sm">{ticket.subject}</h2>
                <p className="text-xs text-[#8A93A5] font-mono">{ticket.id}</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-[#1F2733] text-[#8A93A5] hover:text-white">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </header>

            <main className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="bg-[#101826] border border-[#1F2733] rounded-xl p-4 text-xs">
                <div className="grid grid-cols-2 gap-2">
                    <div><span className="text-[#8A93A5]">User:</span> <span className="text-white font-semibold">{ticket.userName}</span></div>
                    <div><span className="text-[#8A93A5]">Email:</span> <span className="text-white font-semibold">{ticket.userEmail}</span></div>
                    <div><span className="text-[#8A93A5]">Priority:</span> <span className="text-white font-semibold capitalize">{ticket.priority}</span></div>
                    <div><span className="text-[#8A93A5]">Order ID:</span> <span className="text-white font-semibold">{ticket.orderId || 'N/A'}</span></div>
                </div>
              </div>
              
              <div className="space-y-4">
                {ticket.messages.map(msg => (
                    <div key={msg.id} className={`flex flex-col ${msg.sender === 'agent' ? 'items-start' : 'items-end'}`}>
                        <div className={`p-3 rounded-xl max-w-sm ${msg.sender === 'agent' ? 'bg-[#1F2733] text-gray-300' : 'bg-[#7F1DFF] text-white'}`}>
                            <p className="text-sm">{msg.text}</p>
                        </div>
                        <p className="text-[10px] text-[#8A93A5] mt-1">
                            {msg.sender === 'agent' ? `By ${msg.agentName}` : ticket.userName} • {formatDateTimeShort(msg.timestamp)}
                        </p>
                    </div>
                ))}
              </div>
            </main>
            
            <footer className="flex-shrink-0 p-4 border-t border-[#1F2733] bg-[#0B0F12]">
                <div className="bg-[#101826] rounded-xl p-2 space-y-2">
                    <textarea 
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply here..."
                        rows={3}
                        className="w-full bg-transparent p-2 text-sm text-white placeholder-gray-500 focus:outline-none"
                    />
                    <div className="flex justify-between items-center">
                         <select 
                            value={ticket.status} 
                            onChange={(e) => handleStatusChange(e.target.value as AdminCSTicket['status'])}
                            className="bg-[#1F2733] h-8 text-xs font-semibold text-white rounded-md border border-gray-600 focus:ring-1 focus:ring-[#38BDF8] outline-none capitalize">
                            {statusOptions.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                        </select>
                        <button onClick={handleSendReply} disabled={!replyText.trim()} className="h-9 px-4 flex items-center space-x-2 text-sm font-semibold bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white rounded-lg hover:brightness-110 transition-all disabled:opacity-50">
                             <PaperAirplaneIcon className="w-4 h-4" />
                             <span>Send Reply</span>
                        </button>
                    </div>
                </div>
            </footer>
          </>
        )}
      </aside>
    </>
  );
};

export default CsTicketDetailDrawer;
