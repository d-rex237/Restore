'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  ShoppingBag, 
  History, 
  CreditCard, 
  User, 
  Settings,
  Truck,
  Store,
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { user } = useUser();

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: ShoppingBag, label: 'My Orders', href: '/dashboard/orders' },
    { icon: CreditCard, label: 'Payments', href: '/dashboard/payments' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  const actionItems = [
    { icon: Truck, label: 'Become a Driver', href: '/dashboard/become-driver' },
    { icon: Store, label: 'Become a Vendor', href: '/dashboard/become-vendor' },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col`
        }
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Restor</h1>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Main Menu */}
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4">
              Main Menu
            </p>
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${
                      isActive
                        ? "bg-green-50 text-green-700 shadow-sm"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${isActive ? "text-green-700" : "text-gray-500"}`}
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="space-y-1 border-t border-gray-200 pt-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4">
              Become a Partner
            </p>
            {actionItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-gray-600 hover:bg-blue-50 hover:text-blue-700 group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <item.icon className="w-4 h-4 text-blue-600" />
                </div>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
          <div className="mt-3 px-4 py-2 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500">Logged in as Customer</p>
            <p className="text-sm font-medium text-gray-700">
              {user?.fullName ?? user?.username ?? "User"}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;