"use client";

import React, { ReactNode } from "react";
import DriverSidebar from "./DriverSidebar";
import DriverTopBar from "./DriverTopBar";

interface DriverLayoutProps {
  children: ReactNode;
}

const DriverLayout: React.FC<DriverLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <DriverSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DriverTopBar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DriverLayout;
