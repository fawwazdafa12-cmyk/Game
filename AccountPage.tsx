

import React, { useState } from 'react';
import {
    LogoutIcon,
    EnvelopeIcon,
    BellIcon,
    WhatsAppIcon,
    KeyIcon,
    ShieldCheckIcon,
    DesktopComputerIcon,
    DevicePhoneMobileIcon,
} from './icons/index.tsx';
import { User, UserSession } from '../types.ts';
import TwoFactorAuthModal from './TwoFactorAuthModal.tsx';
import { formatDateTimeShort } from '../src/lib/time.ts';


interface AccountPageProps {
    onLogout: () => void;
    user: User;
    showToast: (message: string, type: 'success' | 'error') => void;
}

const ToggleSwitch: React.FC<{ enabled: boolean; onChange: () => void; ariaLabel: string }> = ({ enabled, onChange, ariaLabel }) => (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={ariaLabel}
      onClick={onChange}
      className={`${
        enabled ? 'bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8]' : 'bg-gray-600'
      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:ring-offset-2 focus:ring-offset-gray-900`}
    >
      <span
        aria-hidden="true"
        className={`${
          enabled ? 'translate-x-5' : 'translate-x-0'
        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
);


const AccountPage: React.FC<AccountPageProps> = ({ onLogout, user, showToast }) => {
    const [notificationSettings, setNotificationSettings] = useState({
        orderStatus: { email: true, wa: true, push: true },
        promos: { email: true, wa: false, push: true },
        coinReminders: { email: false, wa: false, push: true },
    });

    const [is2faEnabled, setIs2faEnabled] = useState(false);
    const [is2faModalOpen, setIs2faModalOpen] = useState(false);

    const [sessions, setSessions] = useState<UserSession[]>([
        { id: '1', device: 'Chrome on Windows', location: 'Jakarta, Indonesia', ip: '103.22.11.5', lastActive: 'Active now', isCurrent: true },
        { id: '2', device: 'Safari on iPhone', location: 'Bandung, Indonesia', ip: '114.12.33.8', lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), isCurrent: false },
        { id: '3', device: 'Firefox on macOS', location: 'Surabaya, Indonesia', ip: '202.88.77.1', lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), isCurrent: false },
    ]);
    
    const [password, setPassword] = useState({ current: '', new: '', confirm: '' });

    const passwordStrength = React.useMemo(() => {
        let score = 0;
        if (password.new.length >= 12) score++;
        if (/[A-Z]/.test(password.new)) score++;
        if (/[0-9]/.test(password.new)) score++;
        if (/[^A-Za-z0-9]/.test(password.new)) score++;
        return score;
    }, [password.new]);
    
    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        if(passwordStrength < 4) {
            showToast('Password baru terlalu lemah.', 'error');
            return;
        }
        if (password.new !== password.confirm) {
            showToast('Konfirmasi password baru tidak cocok.', 'error');
            return;
        }
        // Simulate API call
        showToast('Password berhasil diubah!', 'success');
        setPassword({ current: '', new: '', confirm: '' });
    };

    const handleRevokeSession = (sessionId: string) => {
        if (window.confirm('Anda yakin ingin keluar dari sesi ini?')) {
            setSessions(prev => prev.filter(s => s.id !== sessionId));
            showToast('Sesi berhasil dicabut.', 'success');
        }
    };

    const handleRevokeAllSessions = () => {
        if (window.confirm('Anda yakin ingin keluar dari semua sesi lainnya?')) {
            setSessions(prev => prev.filter(s => s.isCurrent));
            showToast('Semua sesi lain berhasil dicabut.', 'success');
        }
    };

    type NotificationCategory = keyof typeof notificationSettings;
    type NotificationChannel = keyof typeof notificationSettings[NotificationCategory];

    const handleNotificationChange = (category: NotificationCategory, channel: NotificationChannel) => {
        setNotificationSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [channel]: !prev[category][channel],
            },
        }));
    };
    
    const notificationItems = [
      { key: 'orderStatus' as NotificationCategory, title: 'Status Pesanan', description: 'Update penting tentang progres pesananmu.' },
      { key: 'promos' as NotificationCategory, title: 'Info & Promo Terbaru', description: 'Jangan lewatkan diskon dan penawaran spesial.' },
      { key: 'coinReminders' as NotificationCategory, title: 'Pengingat Koin', description: 'Notifikasi saat koin loyalitasmu akan hangus.' },
    ];

    const strengthColors = ['bg-gray-600', 'bg-red-500', 'bg-orange-500', 'bg-yellow-400', 'bg-green-500'];
    const strengthLabels = ['Sangat Lemah', 'Lemah', 'Sedang', 'Kuat', 'Sangat Kuat'];
    const passwordChecks = [
        { label: "Minimal 12 karakter", passed: password.new.length >= 12 },
        { label: "Satu huruf besar", passed: /[A-Z]/.test(password.new) },
        { label: "Satu angka", passed: /[0-9]/.test(password.new) },
        { label: "Satu simbol", passed: /[^A-Za-z0-9]/.test(password.new) },
    ];

    return (
        <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-24 md:pb-8">
            <h1 className="text-3xl font-extrabold text-white">Akun Saya</h1>

            <section className="bg-gray-800 p-4 rounded-xl border border-gray-700 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-base text-gray-400">Nama</span>
                    <span className="font-bold text-white">{user.name || 'User Terhormat'}</span>
                </div>
                 <div className="flex justify-between items-center">
                    <span className="text-base text-gray-400">Email</span>
                    <span className="font-bold text-white">{user.email || 'user@nexustopup.com'}</span>
                </div>
            </section>

            <section className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                <h3 className="font-bold text-white text-base mb-4">Keamanan Akun</h3>
                <div className="space-y-6 divide-y divide-gray-700">
                    <div className="pt-4 first:pt-0">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <ShieldCheckIcon className="w-6 h-6 text-green-400" />
                                <div>
                                    <p className="font-semibold text-white">Autentikasi Dua Faktor (2FA)</p>
                                    <p className={`text-sm ${is2faEnabled ? 'text-green-400' : 'text-gray-400'}`}>{is2faEnabled ? 'Aktif' : 'Tidak Aktif'}</p>
                                </div>
                            </div>
                            <button onClick={() => setIs2faModalOpen(true)} className="px-4 py-1.5 text-sm font-bold border-2 border-gray-600 text-gray-200 rounded-full hover:border-[#7F1DFF] transition-colors">
                                {is2faEnabled ? 'Kelola' : 'Aktifkan'}
                            </button>
                        </div>
                    </div>
                    <div className="pt-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <KeyIcon className="w-6 h-6 text-yellow-400" />
                            <p className="font-semibold text-white">Ubah Kata Sandi</p>
                        </div>
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                             <input type="password" placeholder="Kata Sandi Saat Ini" value={password.current} onChange={e => setPassword(p => ({...p, current: e.target.value}))} className="w-full h-12 px-4 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#38BDF8] focus:outline-none"/>
                             <input type="password" placeholder="Kata Sandi Baru" value={password.new} onChange={e => setPassword(p => ({...p, new: e.target.value}))} className="w-full h-12 px-4 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#38BDF8] focus:outline-none"/>
                             {password.new && (
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-full bg-gray-600 rounded-full h-2">
                                            <div className={`h-2 rounded-full transition-all ${strengthColors[passwordStrength]}`} style={{width: `${passwordStrength * 25}%`}}></div>
                                        </div>
                                        <span className="text-xs font-bold text-white w-24 text-right">{strengthLabels[passwordStrength]}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                                        {passwordChecks.map(check => (
                                            <span key={check.label} className={`transition-colors ${check.passed ? 'text-green-400' : 'text-gray-500'}`}>{check.passed ? '✓' : '✗'} {check.label}</span>
                                        ))}
                                    </div>
                                </div>
                             )}
                             <input type="password" placeholder="Konfirmasi Kata Sandi Baru" value={password.confirm} onChange={e => setPassword(p => ({...p, confirm: e.target.value}))} className="w-full h-12 px-4 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#38BDF8] focus:outline-none"/>
                             <button type="submit" className="w-full h-12 font-bold bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white rounded-full hover:brightness-110 transition-all">Simpan Perubahan</button>
                        </form>
                    </div>
                    <div className="pt-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center space-x-3">
                                <DesktopComputerIcon className="w-6 h-6 text-sky-400" />
                                <p className="font-semibold text-white">Sesi & Perangkat Aktif</p>
                            </div>
                            <button onClick={handleRevokeAllSessions} className="text-xs font-semibold text-red-400 hover:underline">Keluar dari semua</button>
                        </div>
                        <ul className="space-y-3">
                            {sessions.map(session => (
                                <li key={session.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        {session.device.toLowerCase().includes('windows') || session.device.toLowerCase().includes('macos') ? <DesktopComputerIcon className="w-8 h-8 text-gray-400"/> : <DevicePhoneMobileIcon className="w-8 h-8 text-gray-400" />}
                                        <div>
                                            <p className="font-semibold text-sm text-white">{session.device} {session.isCurrent && <span className="text-xs text-green-400">(Sesi ini)</span>}</p>
                                            <p className="text-xs text-gray-400">{session.location} &bull; IP: {session.ip}</p>
                                            <p className="text-xs text-gray-400">{session.isCurrent ? 'Aktif sekarang' : formatDateTimeShort(session.lastActive)}</p>
                                        </div>
                                    </div>
                                    {!session.isCurrent && <button onClick={() => handleRevokeSession(session.id)} className="text-xs font-bold text-red-400 hover:underline">Cabut</button>}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                <h3 className="font-bold text-white mb-2 text-base">Pengaturan Notifikasi</h3>
                <div className="flex justify-end mb-2 pr-1">
                    <div className="flex space-x-4 w-[124px] justify-around">
                        <EnvelopeIcon className="w-5 h-5 text-gray-400" title="Email"/>
                        <WhatsAppIcon className="w-5 h-5" title="WhatsApp"/>
                        <BellIcon className="w-5 h-5 text-gray-400" title="Push Notification"/>
                    </div>
                </div>
                <div className="divide-y divide-gray-700">
                    {notificationItems.map((item) => (
                        <div key={item.key} className="flex justify-between items-center py-3">
                            <div className="pr-4">
                                <p className="font-semibold text-white text-sm">{item.title}</p>
                                <p className="text-xs text-gray-400">{item.description}</p>
                            </div>
                            <div className="flex space-x-4 flex-shrink-0">
                                <ToggleSwitch enabled={notificationSettings[item.key].email} onChange={() => handleNotificationChange(item.key, 'email')} ariaLabel={`Email notifications for ${item.title}`} />
                                <ToggleSwitch enabled={notificationSettings[item.key].wa} onChange={() => handleNotificationChange(item.key, 'wa')} ariaLabel={`WhatsApp notifications for ${item.title}`} />
                                <ToggleSwitch enabled={notificationSettings[item.key].push} onChange={() => handleNotificationChange(item.key, 'push')} ariaLabel={`Push notifications for ${item.title}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            
            <button 
                onClick={onLogout}
                className="w-full h-14 flex items-center justify-center space-x-3 border-2 border-[#7F1DFF] text-white font-bold rounded-full hover:bg-purple-500/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38BDF8]">
               <LogoutIcon className="w-6 h-6" />
               <span>Logout</span>
            </button>
        </div>
        {is2faModalOpen && <TwoFactorAuthModal showToast={showToast} onClose={() => setIs2faModalOpen(false)} onEnable={() => { setIs2faEnabled(true); setIs2faModalOpen(false); showToast('2FA berhasil diaktifkan!', 'success') }} />}
        </>
    );
};

export default AccountPage;