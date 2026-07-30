
import React from 'react';
import { PowerIcon } from '@heroicons/react/24/outline';

interface AvailabilityToggleProps {
  isAvailable: boolean;
  onToggle: () => void;
}

const AvailabilityToggle: React.FC<AvailabilityToggleProps> = ({ isAvailable, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        isAvailable
          ? 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
      }`}
    >
      <PowerIcon className= {`w-5 h-5 ${isAvailable ? 'text-green-600' : 'text-gray-400'}`} />
      <span className="font-medium text-sm">
        {isAvailable ? 'Online' : 'Offline'}
      </span>
      <div className={`w-8 h-5 rounded-full transition-colors relative ${
        isAvailable ? 'bg-green-600' : 'bg-gray-300'
      }`}>
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
          isAvailable ? 'translate-x-3.5' : 'translate-x-0.5'
        }`} />
      </div>
    </button>
  );
};

export default AvailabilityToggle;