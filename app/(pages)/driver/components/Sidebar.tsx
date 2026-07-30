"use client";
import React, { useState } from 'react';
import { 
  TruckIcon,
  HomeIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname} from 'next/navigation'

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onMobileClose }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/driver/dashboard',
      icon: HomeIcon,
    },
    {
      name: 'Available Deliveries',
      path: '/driver/deliveries/available',
      icon: ClipboardDocumentListIcon,
    },
    {
      name: 'Active Deliveries',
      path: '/driver/deliveries/active',
      icon: TruckIcon,
    },
    {
      name: 'Delivery History',
      path: '/driver/history',
      icon: ClockIcon,
    },
    {
      name: 'Earnings',
      path: '/driver/earnings',
      icon: CurrencyDollarIcon,
    },
  ];

  const bottomItems = [
    {
      name: 'Profile',
      path: '/driver/profile',
      icon: UserIcon,
    },
    {
      name: 'Settings',
      path: '/driver/settings',
      icon: Cog6ToothIcon,
    },
    {
      name: 'Logout',
      path: '#',
      icon: ArrowRightOnRectangleIcon,
      onClick: () => {
        // Handle logout
        console.log('Logging out...');
      },
    },
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Sidebar content
  const sidebarContent = (
    <>
      {/* Header */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-4 border-b border-gray-200`}>
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <TruckIcon className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Restore</span>
          </div>
        )}
        {isCollapsed && (
          <TruckIcon className="w-8 h-8 text-blue-600" />
        )}
        <button
          onClick={toggleCollapse}
          className="hidden lg:flex items-center justify-center w-6 h-6 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-4 h-4" />
          ) : (
            <ChevronLeftIcon className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className={`${isCollapsed ? 'text-center' : ''}`}>
          {!isCollapsed && (
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Main Navigation
            </p>
          )}
          {navigationItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`({ isActive }) => 
                  flex items-center ${isCollapsed ? 'justify-center' : 'px-3'} py-2.5 rounded-lg
                  transition-all duration-200 group
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
                title={isCollapsed ? item.name : undefined}
              >
                <item.icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'} flex-shrink-0 ${
                  isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                  }`} />
                {!isCollapsed && (
                  <span className="text-sm font-medium">{item.name}</span>
                )}
                {isCollapsed && (
                  <div className="absolute left-16 bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <div className={`${isCollapsed ? 'my-4' : 'my-6'} border-t border-gray-200`} />

        {/* Bottom Navigation */}
        <div className={`${isCollapsed ? 'text-center' : ''}`}>
          {!isCollapsed && (
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Account
            </p>
          )}
          {bottomItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={item.onClick || (() => {})}
                className={`
                  w-full flex items-center ${isCollapsed ? 'justify-center' : 'px-3'} py-2.5 rounded-lg
                  transition-all duration-200 group
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
                title={isCollapsed ? item.name : undefined}
              >
                <item.icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'} flex-shrink-0 ${
                  isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                }`} />
                {!isCollapsed && (
                  <span className="text-sm font-medium">{item.name}</span>
                )}
                {isCollapsed && (
                  <div className="absolute left-16 bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {item.name}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* User Profile Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">John Driver</p>
              <p className="text-xs text-gray-500 truncate">Online</p>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
        </div>
      )}
      {isCollapsed && (
        <div className="p-4 border-t border-gray-200 flex justify-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
            JD
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Desktop Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200
          transition-all duration-300 z-50
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {sidebarContent}
      </aside>
      {/* Mobile Header Toggle */}
      <button
        onClick={() => onMobileClose()}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
      >
        {isMobileOpen ? (
          <XMarkIcon className="w-6 h-6 text-gray-600" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-gray-600" />
        )}
      </button>
    </>
  );
};

export default Sidebar;