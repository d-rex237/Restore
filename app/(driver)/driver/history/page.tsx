'use client';

import React from 'react';
import DriverLayout from '../components/driver/DriverLayout';
import { MapPin, Clock, DollarSign, CheckCircle, Star } from 'lucide-react';

export default function DriverHistoryPage() {
  const history = [
    {
      id: "#DEL-007",
      restaurant: "Pizza Palace",
      address: "123 Main St, Downtown",
      date: "2024-01-15",
      time: "2:30 PM",
      total: "4,050 FCFA",
      status: "Completed",
      rating: 5,
      distance: "2.3 km",
      duration: "15 min",
    },
    {
      id: "#DEL-008",
      restaurant: "Sushi World",
      address: "456 Oak Ave, Midtown",
      date: "2024-01-15",
      time: "11:45 AM",
      total: "5,000 FCFA",
      status: "Completed",
      rating: 4,
      distance: "3.1 km",
      duration: "20 min",
    },
    {
      id: "#DEL-009",
      restaurant: "Burger House",
      address: "789 Pine St, Uptown",
      date: "2024-01-14",
      time: "7:15 PM",
      total: "3,750 FCFA",
      status: "Completed",
      rating: 5,
      distance: "1.8 km",
      duration: "12 min",
    },
    {
      id: "#DEL-010",
      restaurant: "Taco Bell",
      address: "321 Elm St, Eastside",
      date: "2024-01-14",
      time: "5:00 PM",
      total: "3,200 FCFA",
      status: "Completed",
      rating: 3,
      distance: "2.8 km",
      duration: "18 min",
    },
  ];

  return (
    <DriverLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Delivery History</h1>
          <p className="text-gray-500">View all your past deliveries</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Restaurant
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Distance
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Earnings
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {history.map((delivery) => (
                  <tr
                    key={delivery.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-6 font-medium text-gray-800">
                      {delivery.id}
                    </td>
                    <td className="py-3 px-6">
                      <div>
                        <p className="font-medium text-gray-800">
                          {delivery.restaurant}
                        </p>
                        <p className="text-xs text-gray-500">
                          {delivery.address}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-6">
                      <div className="text-sm">
                        <p className="text-gray-800">{delivery.date}</p>
                        <p className="text-xs text-gray-500">{delivery.time}</p>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-600">
                      {delivery.distance}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-600">
                      {delivery.duration}
                    </td>
                    <td className="py-3 px-6 font-semibold text-green-600">
                      {delivery.total}
                    </td>
                    <td className="py-3 px-6">
                      <div className="flex items-center">
                        <span className="text-yellow-500 font-semibold">
                          {delivery.rating}
                        </span>
                        <Star className="w-4 h-4 text-yellow-500 ml-1 fill-yellow-500" />
                      </div>
                    </td>
                    <td className="py-3 px-6">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3 inline mr-1" />
                        {delivery.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Showing {history.length} deliveries
            </p>
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
    </DriverLayout>
  );
}