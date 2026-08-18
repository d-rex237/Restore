
'use client';

import React from 'react';
import { Calendar, Search, Filter, ChevronDown } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';

export default function HistoryPage() {
  const orderHistory = [
    {
      id: "#ORD-001",
      restaurant: "Pizza Palace",
      total: "32.50 FCFA",
      status: "Delivered",
      date: "2024-01-15",
      items: "3 items",
    },
    {
      id: "#ORD-005",
      restaurant: "Starbucks",
      total: "15.25 FCFA",
      status: "Delivered",
      date: "2024-01-11",
      items: "2 items",
    },
    {
      id: "#ORD-006",
      restaurant: "Taco Bell",
      total: "22.30 FCFA",
      status: "Delivered",
      date: "2024-01-10",
      items: "4 items",
    },
    {
      id: "#ORD-007",
      restaurant: "Sushi World",
      total: "45.00 FCFA",
      status: "Delivered",
      date: "2024-01-08",
      items: "5 items",
    },
    {
      id: "#ORD-008",
      restaurant: "Burger House",
      total: "28.75 FCFA",
      status: "Delivered",
      date: "2024-01-06",
      items: "3 items",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Order History</h1>
            <p className="text-gray-500">
              View all your past orders and reorder favorites
            </p>
          </div>
          <button className="text-gray-400 flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Calendar className="w-4 h-4" />
            <span>Last 30 days</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search your order history..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
            <button className="text-gray-400 flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>

          <div className="space-y-4">
            {orderHistory.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div>
                  <div className="flex items-center space-x-3">
                    <p className="font-medium text-gray-800">
                      {order.restaurant}
                    </p>
                    <span className="text-xs text-gray-400">•</span>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="flex items-center space-x-3 mt-1">
                    <p className="text-sm text-gray-500">{order.id}</p>
                    <span className="text-xs text-gray-400">•</span>
                    <p className="text-sm text-gray-500">{order.items}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{order.total}</p>
                  <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
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
                3
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