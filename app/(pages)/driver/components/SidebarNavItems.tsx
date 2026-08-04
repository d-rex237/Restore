"use client";
import React from 'react';
import Link  from 'next/link';

interface SidebarNavItemProps {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isCollapsed?: boolean;
  badge?: number;
  onClick?: () => void;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  to,
  icon: Icon,
  label,
  isCollapsed = false,
  badge,
  onClick,
}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`({ isActive }) => 
        flex items-center ${isCollapsed ? 'justify-center' : 'px-3'} py-2.5 rounded-lg
        transition-all duration-200 group relative
        ${isActive 
          ? 'bg-blue-50 text-blue-700' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`
      }
      title={isCollapsed ? label : undefined}
    >
      <Icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'} flex-shrink-0 ${
        location.pathname === to ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
      }`} />
      {!isCollapsed && (
        <span className="text-sm font-medium flex-1">{label}</span>
      )}
      {!isCollapsed && badge && badge > 0 && (
        <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
          {badge}
        </span>
      )}
      {isCollapsed && badge && badge > 0 && (
        <span className="absolute top-0 right-0 -mt-1 -mr-1 px-1.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
          {badge}
        </span>
      )}
      {isCollapsed && (
        <div className="absolute left-16 bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          {label}
        </div>
      )}
    </Link>
  );
};

export default SidebarNavItem;