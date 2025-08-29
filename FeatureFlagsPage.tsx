import React from 'react';
import { AdminFeatureFlag } from '../../types.ts';

interface FeatureFlagsPageProps {
  flags: AdminFeatureFlag[];
  onToggle: (flagId: string) => void;
}

const FeatureFlagsPage: React.FC<FeatureFlagsPageProps> = ({ flags, onToggle }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Feature Flags</h2>
        <p className="text-sm text-[#8A93A5]">Enable or disable application features in real-time.</p>
      </div>

      <div className="bg-[#0B0F12] border border-[#1F2733] rounded-xl shadow-lg p-6 space-y-4">
        {flags.map(flag => (
          <div key={flag.id} className="flex justify-between items-center p-4 bg-[#101826] rounded-lg">
            <div>
              <p className="font-semibold text-white">{flag.name}</p>
              <p className="text-xs text-[#8A93A5]">{flag.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={flag.enabled}
                onChange={() => onToggle(flag.id)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-[#38BDF8] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7F1DFF]"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureFlagsPage;
