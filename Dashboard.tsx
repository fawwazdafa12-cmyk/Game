
import React from 'react';

const KPICard = ({ title, value, change, icon: Icon }: { title: string, value: string, change: string, icon: React.FC<{className?: string}> }) => (
    <div className="bg-[#0B0F12] border border-[#1F2733] rounded-xl p-5 shadow-lg">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm text-[#8A93A5]">{title}</p>
                <p className="text-2xl font-bold text-white mt-1">{value}</p>
                 <p className="text-xs text-green-400 mt-2">{change}</p>
            </div>
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#7F1DFF]/20 to-[#38BDF8]/20">
                <Icon className="w-5 h-5 text-[#38BDF8]" />
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    // Mock data for demonstration
    const kpiData = [
        { title: 'GMV (Today)', value: 'Rp 12.345.678', change: '+5.2% vs yesterday', icon: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.75A.75.75 0 0 1 3 4.5h.75m0 0h.75A.75.75 0 0 1 4.5 6v.75m0 0v.75A.75.75 0 0 1 3.75 8.25h-.75m0 0h-.75A.75.75 0 0 1 2.25 7.5V6.75m0 0V6A.75.75 0 0 1 3 5.25h.75M12 15V-7.5" /></svg> },
        { title: 'Total Orders (Today)', value: '1,234', change: '+10.1% vs yesterday', icon: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.658-.463 1.243-1.117 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.117 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg> },
        { title: 'Success Rate (24h)', value: '99.87%', change: '-0.02% vs last 24h', icon: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg> },
        { title: 'Coins Liability', value: '54.2M NX', change: '+1.5M NX today', icon: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg> },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map(item => <KPICard key={item.title} {...item} />)}
            </div>
            
            <div className="bg-[#0B0F12] border border-[#1F2733] rounded-xl p-5 shadow-lg">
                 <h3 className="font-bold text-white text-lg">Sales Chart</h3>
                 <div className="h-64 mt-4 bg-[#1F2733]/50 flex items-center justify-center text-[#8A93A5]">
                    Chart placeholder
                 </div>
            </div>
        </div>
    );
};

export default Dashboard;
