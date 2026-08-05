'use client';

import React from 'react';
import DriverLayout from '../components/driver/DriverLayout';
import { DollarSign, TrendingUp, Calendar, Award, ArrowUp, ArrowDown } from 'lucide-react';
import { GrCurrency } from 'react-icons/gr';

export default function EarningsPage() {
  const stats = [
    { label: 'Total Earnings', value: '98,677 FCFA', icon: GrCurrency, color: 'bg-green-500', change: '+12.5%' },
    { label: 'This Week', value: '$39,300 FCFA', icon: Calendar, color: 'bg-blue-500', change: '+5.2%' },
    { label: 'This Month', value: '98,677 FCFA', icon: TrendingUp, color: 'bg-purple-500', change: '+8.7%' },
    { label: 'Deliveries Completed', value: '42', icon: Award, color: 'bg-yellow-500', change: '+15' },
  ];

  const recentEarnings = [
    { id: '#DEL-007', restaurant: 'Pizza Palace', amount: '4,100 FCFA', date: '2024-01-15', time: '2:30 PM', distance: '2.3 km' },
    { id: '#DEL-008', restaurant: 'Sushi World', amount: '5,000 FCFA', date: '2024-01-15', time: '11:45 AM', distance: '3.1 km' },
    { id: '#DEL-009', restaurant: 'Burger House', amount: '3,700 FCFA', date: '2024-01-14', time: '7:15 PM', distance: '1.8 km' },
    { id: '#DEL-010', restaurant: 'Taco Bell', amount: '3,200 FCFA', date: '2024-01-14', time: '5:00 PM', distance: '2.8 km' },
    { id: '#DEL-011', restaurant: 'Subway', amount: '2,450 FCA', date: '2024-01-13', time: '12:30 PM', distance: '0.5 km' },
  ];

  return (
    <DriverLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Earnings</h1>
          <p className="text-gray-500">Track your earnings and performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const isPositive = stat.change.startsWith('+');
            return (
              <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                    <div className={`flex items-center space-x-1 mt-1 text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div className={`${stat.color} p-3 rounded-xl text-white`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">Recent Earnings</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery ID</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentEarnings.map((earning) => (
                  <tr key={earning.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-800">{earning.id}</td>
                    <td className="py-3 px-4 text-gray-600">{earning.restaurant}</td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <p className="text-gray-800">{earning.date}</p>
                        <p className="text-xs text-gray-500">{earning.time}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{earning.distance}</td>
                    <td className="py-3 px-4 text-right font-semibold text-green-600">{earning.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-500">Showing 5 of 42 deliveries</p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">Previous</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">1</button>
              <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">2</button>
              <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">3</button>
              <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>
    </DriverLayout>
  );
}