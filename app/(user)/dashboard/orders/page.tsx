"use client";

import React from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { Search, Filter, Eye } from "lucide-react";
import Link from "next/link";
import { useGetCustomerOrders } from "@/hooks/use-orders";

export default function OrdersPage() {
  const { data, isLoading } = useGetCustomerOrders();

  const orders = data?.orders ?? [];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: "bg-yellow-100 text-yellow-700",
      ACCEPTED: "bg-indigo-100 text-indigo-700",
      PREPARING: "bg-blue-100 text-blue-700",
      READY_FOR_PICKUP: "bg-cyan-100 text-cyan-700",
      OUT_FOR_DELIVERY: "bg-purple-100 text-purple-700",
      DELIVERED: "bg-green-100 text-green-700",
      REJECTED: "bg-red-100 text-red-700",
      CANCELLED: "bg-red-100 text-red-700",
    };

    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const formatStatus = (status: string) => {
    return status
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatDate = (date: string | Date) => {
    const formatted = new Date(date);

    return {
      date: formatted.toLocaleDateString("en-CA"),
      time: formatted.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
    };
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500">Loading your orders...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
            <p className="text-gray-500">Track and manage all your orders</p>
          </div>

          <Link
            href="/home/restaurants"
            className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-colors shadow-sm"
          >
            Order Now
          </Link>
        </div>

        {/* Orders container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {/* Search / Filter */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search orders..."
                className="text-gray-700 w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            <button className="text-gray-400 flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>

          {/* Empty state */}
          {orders.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">
                You don't have any orders yet.
              </p>

              <Link
                href="/home/menu"
                className="inline-block bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium"
              >
                Start Ordering
              </Link>
            </div>
          ) : (
            <>
              {/* Orders table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>

                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Restaurant
                      </th>

                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>

                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>

                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>

                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>

                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order: any) => {
                      const { date, time } = formatDate(order.createdAt);

                      return (
                        <tr
                          key={order.id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          {/* Order ID */}
                          <td className="py-3 px-4 font-medium text-gray-800">
                            #{order.id.slice(0, 8).toUpperCase()}
                          </td>

                          {/* Restaurant */}
                          <td className="py-3 px-4 text-gray-600">
                            {order.restaurant?.name || "Unknown Restaurant"}
                          </td>

                          {/* Items */}
                          <td className="py-3 px-4 text-gray-600">
                            {order.items?.length ?? 0}
                          </td>

                          {/* Total */}
                          <td className="py-3 px-4 font-medium text-gray-800">
                            {Number(order.total).toLocaleString()} FCFA
                          </td>

                          {/* Status */}
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                order.status,
                              )}`}
                            >
                              {formatStatus(order.status)}
                            </span>
                          </td>

                          {/* Date */}
                          <td className="py-3 px-4 text-sm text-gray-500">
                            <div>{date}</div>
                            <div className="text-xs">{time}</div>
                          </td>

                          {/* Action */}
                          <td className="py-3 px-4">
                            <Link
                              href={`/dashboard/orders/${order.id}`}
                              className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Showing {orders.length}{" "}
                  {orders.length === 1 ? "order" : "orders"}
                </p>

                <div className="flex items-center space-x-2">
                  <button
                    disabled
                    className="text-gray-400 px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Previous
                  </button>

                  <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">
                    1
                  </button>

                  <button
                    disabled
                    className="text-gray-400 px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
