import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { ChatMessage } from '../types.ts';
import { XMarkIcon, PaperAirplaneIcon, SpinnerIcon, ChatBubbleLeftEllipsisIcon } from './icons/index.tsx';

interface ChatWidgetProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ChatWidget({ isOpen, onClose }: ChatWidgetProps): React.ReactElement | null {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (isOpen && !chat) {
            // In a real app, the API key would be handled more securely.
            // This is a placeholder for demonstration purposes.
            if (!process.env.API_KEY) {
                console.error("Gemini API key is not set. Please set the API_KEY environment variable.");
                setMessages([
                    { id: 'initial-error', text: 'Maaf, layanan chat saat ini tidak tersedia karena masalah konfigurasi.', sender: 'ai' }
                ]);
                return;
            }

            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const chatSession = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: 'You are NexusBot, a friendly and helpful customer support assistant for NexusTOPUP, an online game top-up service. Answer questions about promotions, how to top up, and help with any issues. Keep your answers concise and friendly, in Bahasa Indonesia.',
                },
            });
            setChat(chatSession);
            setMessages([
                { id: 'initial', text: 'Halo! Ada yang bisa saya bantu seputar top up game di NexusTOPUP?', sender: 'ai' }
            ]);
        }
    }, [isOpen, chat]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, 300); // Duration of the animation
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chat) return;

        const userMessage: ChatMessage = { id: Date.now().toString(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await chat.sendMessageStream({ message: input });

            let currentAiMessage: ChatMessage = { id: Date.now().toString() + '-ai', text: '', sender: 'ai', isStreaming: true };
            setMessages(prev => [...prev, currentAiMessage]);

            let fullText = '';
            for await (const chunk of response) {
                fullText += chunk.text;
                setMessages(prev =>
                    prev.map(msg =>
                        msg.id === currentAiMessage.id ? { ...msg, text: fullText } : msg
                    )
                );
            }

            setMessages(prev =>
                prev.map(msg =>
                    msg.id === currentAiMessage.id ? { ...msg, isStreaming: false } : msg
                )
            );

        } catch (error) {
            console.error('Gemini API error:', error);
            const errorMessage: ChatMessage = { id: Date.now().toString() + '-error', text: 'Maaf, terjadi kesalahan. Silakan coba lagi nanti.', sender: 'ai' };
            setMessages(prev => prev.filter(m => m.id !== (Date.now().toString() + '-ai')) ); // remove streaming message
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen && !isClosing) return null;

    return (
        <div 
            className={`fixed bottom-0 right-0 md:right-4 z-[90] w-full max-w-sm h-full md:h-[70vh] md:rounded-xl flex flex-col transition-transform duration-300 ease-in-out bg-gray-900 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
            role="dialog" 
            aria-modal="true"
            aria-labelledby="chat-widget-title"
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] rounded-t-xl p-4 flex justify-between items-center text-white shadow-lg flex-shrink-0">
                <div className="flex items-center space-x-2">
                    <ChatBubbleLeftEllipsisIcon className="w-6 h-6" />
                    <h2 id="chat-widget-title" className="font-bold text-lg">Bantuan NexusTOPUP</h2>
                </div>
                <button onClick={handleClose} aria-label="Tutup chat" className="p-1 rounded-full hover:bg-white/20">
                    <XMarkIcon className="w-6 h-6" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7F1DFF] to-[#38BDF8] flex-shrink-0 self-start"></div>}
                        <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-[#7F1DFF] text-white rounded-br-none' : 'bg-gray-800 text-gray-200 rounded-bl-none'}`}>
                           <p className="text-sm break-words whitespace-pre-wrap">{msg.text}{msg.isStreaming && <span className="inline-block w-1 h-4 bg-gray-400 animate-pulse ml-1 align-bottom"></span>}</p>
                        </div>
                    </div>
                ))}
                {isLoading && messages[messages.length - 1]?.sender === 'user' && (
                    <div className="flex items-end gap-2 justify-start">
                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7F1DFF] to-[#38BDF8] flex-shrink-0"></div>
                         <div className="max-w-[80%] p-3 rounded-2xl bg-gray-800 text-gray-200 rounded-bl-none">
                            <div className="flex space-x-1 items-center h-5">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-gray-800 border-t border-gray-700 p-3 shadow-inner rounded-b-xl flex-shrink-0">
                <form onSubmit={handleSend} className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ketik pesanmu..."
                        disabled={isLoading}
                        className="flex-1 h-10 px-4 bg-gray-700 text-white rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-[#7F1DFF] to-[#38BDF8] text-white flex items-center justify-center disabled:opacity-50"
                        aria-label="Kirim pesan"
                    >
                        {isLoading ? <SpinnerIcon className="w-5 h-5" /> : <PaperAirplaneIcon className="w-5 h-5" />}
                    </button>
                </form>
            </div>
        </div>
    );
}
