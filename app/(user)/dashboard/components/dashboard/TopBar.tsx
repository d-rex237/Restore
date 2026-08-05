
"use client";

import React from "react";
import { Menu, Bell, Search, UserCircle } from "lucide-react";

interface TopBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const TopBar: React.FC<TopBarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        <div className="hidden md:flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <UserCircle className="w-8 h-8 text-gray-600" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
