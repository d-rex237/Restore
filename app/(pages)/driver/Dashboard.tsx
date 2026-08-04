'use client';
import React, { useState, useEffect} from 'react';
import {TruckIcon} from 'lucide-react';
import { UserIcon } from "lucide-react";
import DriverStats from './components/DriverStats';
import DeliveryCard from "./components/DeliveryCard";
import DeliveryHistory from "./components/DeliveryHistory";
import Sidebar from "./components/Sidebar";
import MobileHeader from './components/MobileHeader'
import SidebarNavItems from "./components/SidebarNavItems";
import { title } from 'process';
import AvailabilityToggle from './components/AvailabilityToggle';
import DeliveryHistoryTable from './components/DeliveryHistoryTable';




function DriverDashboard(){
    

type Stat = {
  label: string;
  value: string | number;
  bgColor: string; // background
  textColor: string; // number color
  borderColor: string; // border color
  iconColor: string; // icon color
};

const stats: Stat[] = [
  {
    label: "Trips",
    value: 12,
    bgColor: "bg-cyan-300",
    textColor: "text-white",
    borderColor: "border-black-200",
    iconColor: "text-blue-600",
  },
  {
    label: "Earnings",
    value: 450,
    bgColor: "bg-blue-500",
    textColor: "text-white",
    borderColor: "border-black-200",
    iconColor: "text-green-600",
  },
  {
    label: "Rating",
    value: 4.8,
    bgColor: "bg-orange-400",
    textColor: "text-white",
    borderColor: "border-black-200",
    iconColor: "text-yellow-400",
  },
  {
    label: "Hours",
    value: 32,
    bgColor: "bg-red-500",
    textColor: "text-white",
    borderColor: "border-black-200",
    iconColor: "text-purple-600",
  },
];


     const handleViewDetails = (delivery: any) => {
       console.log(delivery);
     };


     const handleExport = () => {
       console.log("Exporting deliveries...");
     };


    const handleToggleAvailability = () => {
    setIsAvailable(prev => !prev);};

    const handleStatusUpdate = (
      deliveryId: number | string,
      newStatus: string,) => {
      setDeliveries((prev) =>
        prev.map((delivery) =>
          delivery.id === deliveryId
            ? { ...delivery, status: newStatus }
            : delivery,
        ),
      );
    };
  const [isAvailable, setIsAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState("available");
  const [loading, setLoading] = useState(false);
  const getFilteredDeliveries = () => {
    switch (activeTab) {
      case "available":
        return deliveries.filter((d) => d.status === "ready");
      case "assigned":
        return deliveries.filter((d) => d.status === "assigned");
      case "completed":
        return deliveries.filter((d) => d.status === "completed");
      default:
        return deliveries;
    };
}

  const handleAcceptDelivery = (deliveryId: number | string) => {
    setDeliveries((prev) =>
      prev.map((delivery) =>
        delivery.id === deliveryId
          ? { ...delivery, status: "assigned" }
          : delivery,
      ),
    );
  };
  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
      customer: "John Doe",
      status: "ready",
    },
    {
      id: 2,
      customer: "Jane Smith",
      status: "assigned",
    },
  ]);
const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

const handleMobileClose = () => {
  setIsMobileSidebarOpen(false);};

  return (
    <div className="min-h-screen bg-gray-50 flex-1">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/*Mobile Header*/}

        {/*Content*/}
        <main className="p-4 lg:p-8 ">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 mb-4 rounded-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center gap-3">
                  <TruckIcon className="w-8 h-8 text-blue-600" />
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Driver Dashboard
                    </h1>
                    <p className="text-sm text-gray-500">
                      Manage your deliveries
                    </p>
                  </div>
                </div>

                <div className="flex item-center gap-4">
                  <AvailabilityToggle
                    isAvailable={isAvailable}
                    onToggle={handleToggleAvailability}
                  />

                  <div className="flex item-center gap-2 text-sm text-gray-600">
                    <UserIcon className="w-5 h-5" />
                    <span>John Driver</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 font-mono">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`bg-blue-100 ${stat.bgColor} ${stat.borderColor} border rounded-xl p-4 shadow-sm hover:shadow-md transition`}
              >
                <p className="text-sm font-medium text-white font-mono">
                  {stat.label}
                </p>
                <p
                  className={`text-3xl font-bold mt-1 ${stat.textColor} font-mono`}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="mt-8 boarder-b border-gray-200">
            <nav className="flex gap-8">
              <button
                onClick={() => setActiveTab("available")}
                className={`py-3 px-1 text-sm font-medium transition-colors relative ${
                  activeTab === "available"
                    ? "text-blue-600 borber-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Available Deliveries
                {deliveries.filter((d) => d.status === "ready").length > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                    {deliveries.filter((d) => d.status === "ready").length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("available")}
                className={`py-3 px-1 text-sm font-medium transition-colors ${
                  activeTab === "history"
                    ? "text-blue-600 borber-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                History
              </button>
            </nav>
          </div>

          {/* Delivery List */}
          <div className="mt-6">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <ArrowPathIcon className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {getFilteredDeliveries().length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    {activeTab === "available" && (
                      <>
                        <TruckIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">
                          No deliveries available at the moment
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          Check back later or go online to receive deliveries
                        </p>
                      </>
                    )}
                    {activeTab === "active" && (
                      <>
                        <ClockIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No active deliveries</p>
                        <p className="text-sm text-gray-400 mt-1">
                          You're all caught up!
                        </p>
                      </>
                    )}
                    {activeTab === "history" && (
                      <>
                        <CheckCircleIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No delivery history</p>
                        <p className="text-sm text-gray-400 mt-1">
                          Complete your first delivery to see it here
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  getFilteredDeliveries().map((delivery) => (
                    <DeliveryCard
                      key={delivery.id}
                      delivery={delivery}
                      onAccept={handleAcceptDelivery}
                      onStatusUpdate={handleStatusUpdate}
                      isActive={activeTab === "active"}
                      isAvailable={isAvailable}
                    />
                  ))
                )}
              </div>
            )}
          </div>

          {/* Delivery History (only visible in history tab) */}
          {activeTab === "history" && (
            <div className="mt-8">
              <DeliveryHistory deliveries={getFilteredDeliveries()} />
            </div>
          )}

          {/*Delivery History Table*/}
          <DeliveryHistoryTable
            deliveries={deliveries}
            onViewDetails={handleViewDetails}
            onExport={handleExport}
          />
        </main>
      </div>
    </div>
  );
};

export default DriverDashboard;