"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Truck,
  History,
  DollarSign,
  User,
  Settings,
  LogOut,
  X,
  Package,
  CheckCircle,
  Clock,
} from "lucide-react";
import { GrCurrency } from "react-icons/gr";
import { SignOutButton } from "@clerk/nextjs";

interface DriverSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DriverSidebar: React.FC<DriverSidebarProps> = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("driver");
    router.push("/");
    setIsOpen(false);
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/driver" },
    {
      icon: Package,
      label: "Available Deliveries",
      href: "/driver/deliveries",
    },
    { icon: Truck, label: "Active Deliveries", href: "/driver/active" },
    { icon: History, label: "Delivery History", href: "/driver/history" },
    { icon: GrCurrency, label: "Earnings", href: "/driver/earnings" },
    { icon: User, label: "Profile", href: "/driver/profile" },
    { icon: Settings, label: "Settings", href: "/driver/settings" },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col
        `}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Restore</h1>
              <p className="text-xs text-blue-600 font-medium">Driver Portal</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
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
                      ? "bg-blue-50 text-blue-700 shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
              >
                <item.icon
                  className={`w-5 h-5 ${isActive ? "text-blue-700" : "text-gray-500"}`}
                />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="bg-blue-50 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-600 font-medium">Status</p>
                <div className="flex items-center mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
                  <span className="text-sm font-semibold text-green-700">
                    Online
                  </span>
                </div>
              </div>
              <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded-lg font-medium transition-colors">
                Go Offline
              </button>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">
              <SignOutButton />
            </span>
          </button>
          <SignOutButton />

          <div className="mt-3 px-4 py-2 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500">Logged in as Driver</p>
            <p className="text-sm font-medium text-gray-700">John Driver</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DriverSidebar;
