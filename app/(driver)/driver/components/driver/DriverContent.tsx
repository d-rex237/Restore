"use client";

import React from "react";
import {
  Package,
  CheckCircle,
  Clock,
  TrendingUp,
  MapPin,
  User,
  ArrowRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { GrCurrency } from "react-icons/gr";
import { FaStar } from "react-icons/fa";
import {
  useDriverStats,
  useDriverStatus,
  useToggleDriverOnline,
} from "@/hooks/use-driver";
import {
  useClaimDelivery,
  useGetAvailableDeliveries,
  useGetDriverOrders,
  useUpdateOrderStatus,
} from "@/hooks/use-orders";

const DriverContent: React.FC = () => {
  const { data: statusData, isLoading: statusLoading } = useDriverStatus();
  const toggleOnline = useToggleDriverOnline();
  const isOnline = statusData?.isOnline ?? false;

  const { data: statsData } = useDriverStats();

  const { data: availableData, isLoading: availableLoading } =
    useGetAvailableDeliveries();
  const availableDeliveries = availableData?.orders ?? [];

  const { data: activeData, isLoading: activeLoading } = useGetDriverOrders({
    status: "OUT_FOR_DELIVERY",
  });
  const activeDeliveries = activeData?.orders ?? [];

  const claimMutation = useClaimDelivery();
  const updateStatus = useUpdateOrderStatus();

  const stats = [
    {
      label: "Total Deliveries",
      value: statsData ? String(statsData.totalDeliveries) : "—",
      icon: Package,
      color: "bg-blue-500",
    },
    {
      label: "Active Deliveries",
      value: statsData ? String(statsData.activeDeliveries) : "—",
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      label: "Completed Today",
      value: statsData ? String(statsData.completedToday) : "—",
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      label: "Earnings",
      value: statsData ? `${statsData.earnings.toLocaleString()} FCFA` : "—",
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      <div
        className={`rounded-2xl p-6 text-white ${isOnline ? "bg-gradient-to-r from-cyan-400 to-blue-700" : "bg-gradient-to-r from-gray-600 to-gray-700"}`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3">
              <div
                className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-300 animate-pulse" : "bg-gray-400"}`}
              ></div>
              <h2 className="text-xl font-bold">
                {isOnline ? "You are Online" : "You are Offline"}
              </h2>
            </div>
            <p
              className={`mt-1 ${isOnline ? "text-green-100" : "text-gray-300"}`}
            >
              {isOnline
                ? "You're available to receive delivery requests"
                : "You won't receive delivery requests while offline"}
            </p>
          </div>
          <button
            onClick={() => toggleOnline.mutate()}
            disabled={statusLoading || toggleOnline.isPending}
            className={`
                flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg disabled:opacity-60
              ${
                isOnline
                  ? "bg-white hover:bg-blue-50 text-blue-700"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
          >
            {toggleOnline.isPending && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            {isOnline ? "Go Offline" : "Go Online"}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-xl text-white`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Deliveries */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              Available Deliveries
            </h2>
            <Link
              href="/driver/deliveries"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            {availableLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
              </div>
            ) : availableDeliveries.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-400">
                No deliveries available right now.
              </p>
            ) : (
              availableDeliveries.slice(0, 3).map((delivery: any) => (
                <div
                  key={delivery.id}
                  className="p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-800">
                          {delivery.restaurantName}
                        </h3>
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700">
                          Ready now
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
                        <span>#{delivery.id.slice(0, 8)}</span>
                        <span>•</span>
                        <span>
                          {delivery.items.reduce(
                            (sum: number, i: any) => sum + i.quantity,
                            0,
                          )}{" "}
                          items
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>{delivery.deliveryAddress}</span>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-sm">
                        <span className="font-semibold text-gray-800">
                          {delivery.total.toLocaleString()} FCFA
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => claimMutation.mutate(delivery.id)}
                      disabled={claimMutation.isPending}
                      className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm whitespace-nowrap disabled:opacity-60"
                    >
                      {claimMutation.isPending ? "Accepting..." : "Accept"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Active Deliveries */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              Active Deliveries
            </h2>
            <Link
              href="/driver/active"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            {activeLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
              </div>
            ) : activeDeliveries.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-400">
                No active deliveries right now.
              </p>
            ) : (
              activeDeliveries.map((delivery: any) => (
                <div
                  key={delivery.id}
                  className="p-4 rounded-xl border border-gray-100"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-800">
                          {delivery.restaurantName}
                        </h3>
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-purple-100 text-purple-700">
                          Out for Delivery
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
                        <span>#{delivery.id.slice(0, 8)}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>{delivery.deliveryAddress}</span>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-sm">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-600">
                            {delivery.customerName}
                          </span>
                        </div>
                        <span className="font-semibold text-gray-800">
                          {delivery.total.toLocaleString()} FCFA
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        updateStatus.mutate({
                          orderId: delivery.id,
                          status: "DELIVERED",
                        })
                      }
                      disabled={updateStatus.isPending}
                      className="ml-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm whitespace-nowrap disabled:opacity-60"
                    >
                      {updateStatus.isPending
                        ? "Updating..."
                        : "Mark Delivered"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Today's Deliveries</p>
              <p className="text-2xl font-bold text-gray-800">
                {statsData ? statsData.completedToday : "—"}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-800">
                {statsData
                  ? `${statsData.earnings.toLocaleString()} FCFA`
                  : "—"}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <GrCurrency className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Rating</p>
              {/* No driver rating field exists in the schema yet — static
                  placeholder until a Review-style model covers drivers too. */}
              <p className="text-2xl font-bold text-gray-800 flex items-center gap-1">
                4.8 <FaStar color="gold" />
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverContent;
