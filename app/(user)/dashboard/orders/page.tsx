"use client";

import React from "react";
import  DashboardLayout from '../components/dashboard/DashboardLayout';
import { Search, Filter, Eye } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
  const orders = [
    {
      id: "#ORD-001",
      restaurant: "Pizza Palace",
      items: 3,
      total: "32.50 FCFA",
      status: "Delivered",
      date: "2024-01-15",
      time: "7:30 PM",
    },
    {
      id: "#ORD-002",
      restaurant: "Sushi World",
      items: 2,
      total: "45.00 FCFA",
      status: "Out for Delivery",
      date: "2024-01-14",
      time: "6:15 PM",
    },
    {
      id: "#ORD-003",
      restaurant: "Burger House",
      items: 4,
      total: "28.75 FCFA",
      status: "Preparing",
      date: "2024-01-13",
      time: "8:00 PM",
    },
    {
      id: "#ORD-004",
      restaurant: "Taco Bell",
      items: 1,
      total: "12.50 FCFA",
      status: "Pending",
      date: "2024-01-12",
      time: "5:45 PM",
    },
    {
      id: "#ORD-005",
      restaurant: "Starbucks",
      items: 2,
      total: "15.25 FCFA",
      status: "Delivered",
      date: "2024-01-11",
      time: "9:15 AM",
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Pending: "bg-yellow-100 text-yellow-700",
      Preparing: "bg-blue-100 text-blue-700",
      "Out for Delivery": "bg-purple-100 text-purple-700",
      Delivered: "bg-green-100 text-green-700",
      Cancelled: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
            <p className="text-gray-500">Track and manage all your orders</p>
          </div>
          <Link
            href="/home/menu"
            className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-colors shadow-sm"
          >
            Order Now
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="text-gray-400 w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
            <button className="text-gray-400 flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>

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
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {order.id}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {order.restaurant}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{order.items}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {order.total}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      <div>{order.date}</div>
                      <div className="text-xs">{order.time}</div>
                    </td>
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
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">Showing 5 orders</p>
            <div className="flex items-center space-x-2">
              <button className="text-gray-400 px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="text-gray-400 px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">
                1
              </button>
              <button className="text-gray-400 px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="text-gray-400 px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
