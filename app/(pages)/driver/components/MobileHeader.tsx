
import React from "react";
import { Bars3Icon, TruckIcon } from "@heroicons/react/24/outline";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bars3Icon className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <TruckIcon className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-bold text-gray-900">Restor</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
