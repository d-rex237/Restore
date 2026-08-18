'use client';

import React, { useState } from 'react';
import DriverLayout from '../components/driver/DriverLayout';
import { MapPin, Clock, User, Phone, Filter, Search, Package, DollarSign } from 'lucide-react';

export default function DeliveriesPage() {
  const [filter, setFilter] = useState('all');

  const deliveries = [
    { 
      id: '#DEL-001', 
      restaurant: 'Pizza Palace', 
      distance: '2.3 km',
      address: '123 Main St, Downtown',
      customer: 'John Smith',
      phone: '+1 234 567 890',
      total: '16,200 FCFA',
      items: '3 items',
      status: 'Ready',
      time: 'Ready now',
      pickup: '10:30 AM'
    },
    { 
      id: '#DEL-002', 
      restaurant: 'Sushi World', 
      distance: '3.1 km',
      address: '456 Oak Ave, Midtown',
      customer: 'Alice Johnson',
      phone: '+1 345 678 901',
      total: '23,800 FCFA',
      items: '2 items',
      status: 'Ready',
      time: 'Ready in 5 min',
      pickup: '11:00 AM'
    },
    { 
      id: '#DEL-003', 
      restaurant: 'Burger House', 
      distance: '1.8 km',
      address: '789 Pine St, Uptown',
      customer: 'Bob Wilson',
      phone: '+1 456 789 012',
      total: '14,400 FCFA',
      items: '4 items',
      status: 'Pending',
      time: 'Not ready',
      pickup: '11:30 AM'
    },
    { 
      id: '#DEL-006', 
      restaurant: 'Subway', 
      distance: '0.5 km',
      address: '111 Subway St, Downtown',
      customer: 'Sarah Lee',
      phone: '+1 567 890 123',
      total: '9,100 FCFA',
      items: '2 items',
      status: 'Ready',
      time: 'Ready now',
      pickup: '10:15 AM'
    },
  ];

  const filteredDeliveries = filter === 'all' 
    ? deliveries 
    : deliveries.filter(d => d.status.toLowerCase() === filter);

  return (
    <DriverLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Available Deliveries
            </h1>
            <p className="text-gray-500">View and accept delivery requests</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search deliveries..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex items-center space-x-2">
              {["all", "ready", "pending"].map((option) => (
                <button
                  key={option}
                  onClick={() => setFilter(option)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    filter === option
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredDeliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-800">
                        {delivery.restaurant}
                      </h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          delivery.status === "Ready"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {delivery.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
                      <span>{delivery.id}</span>
                      <span>•</span>
                      <span>{delivery.items}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 text-sm text-gray-600">
                      <MapPin className="w-3 h-3" />
                      <span>{delivery.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1 text-sm text-gray-600">
                      <Clock className="w-3 h-3" />
                      <span>Pickup: {delivery.pickup}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <User className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {delivery.customer}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Phone className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {delivery.phone}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Package className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Distance: {delivery.distance}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-xl font-bold text-gray-800">
                        {delivery.total}
                      </p>
                    </div>
                    <button className="w-full mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm">
                      Accept Delivery
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Showing {filteredDeliveries.length} deliveries
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