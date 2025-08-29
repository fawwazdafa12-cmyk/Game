import React from 'react';
import { Mission } from '../types.ts';
import { TrophyIcon, GiftIcon as GiftIconOutline } from './icons/index.tsx';

interface GiftPageProps {
    missions: Mission[];
    hardMissions: Mission[];
    isLoggedIn: boolean;
}

const MissionCard: React.FC<{ mission: Mission }> = ({ mission }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg flex items-center p-3 space-x-3">
        <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-md flex items-center justify-center">
            <TrophyIcon className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1 space-y-1">
            <div className="flex justify-between items-start">
                 <h4 className="font-bold text-sm text-white">{mission.title}</h4>
                 <span className="text-xs font-bold text-green-400">{mission.reward}</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${mission.progress}%` }}></div>
            </div>
             <p className="text-xs text-gray-400">{mission.isComplete ? 'Selesai' : `${mission.progress}% tercapai`}</p>
        </div>
    </div>
);

const GiftPage: React.FC<GiftPageProps> = ({ missions, hardMissions, isLoggedIn }) => {
    if (!isLoggedIn) {
        return (
             <div className="pt-20 text-center min-h-screen p-4 flex flex-col justify-center items-center">
                <div className="mx-auto w-24 h-24 flex items-center justify-center bg-gray-800 rounded-full mb-4 shadow-md text-white">
                    <GiftIconOutline isActive={false} className="w-12 h-12" />
                </div>
                <h1 className="text-2xl font-bold text-white">Masuk untuk Lihat Hadiah</h1>
                <p className="text-gray-400 mt-2 mb-6 max-w-sm">Selesaikan misi dan dapatkan hadiah spesial dengan masuk ke akun NexusTOPUP kamu.</p>
            </div>
        )
    }

    return (
        <div className="pt-16 md:pt-20 bg-gray-900 min-h-screen">
             <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 h-16 md:h-20 border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-full justify-center">
                    <h1 className="text-xl font-bold text-white">Misi & Hadiah</h1>
                </div>
            </header>
            <main className="max-w-7xl mx-auto p-4 space-y-6 pb-24 md:pb-8">
                <section>
                    <h2 className="text-lg font-bold text-white mb-3">Misi Harian</h2>
                    <div className="space-y-3">
                        {missions.map(mission => <MissionCard key={mission.id} mission={mission} />)}
                    </div>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-white mb-3">Misi Spesial</h2>
                    <div className="space-y-3">
                        {hardMissions.map(mission => <MissionCard key={mission.id} mission={mission} />)}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default GiftPage;
