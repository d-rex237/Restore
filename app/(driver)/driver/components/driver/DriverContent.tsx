'use client';

import React, { useState } from 'react';
import { Currency, DollarSign } from "lucide-react";
import { 
  Package,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  MapPin,
  Phone,
  User,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { GrCurrency } from 'react-icons/gr';
import { FaStar } from 'react-icons/fa';

const DriverContent: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);

  const stats = [
    { label: 'Total Deliveries', value: '42', icon: Package, color: 'bg-blue-500' },
    { label: 'Active Deliveries', value: '2', icon: Clock, color: 'bg-yellow-500' },
    { label: 'Completed Today', value: '5', icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Earnings', value: '98,677 FCFA', icon: TrendingUp, color: 'bg-purple-500' },
  ];

  const availableDeliveries = [
    { 
      id: '#DEL-001', 
      restaurant: 'Pizza Palace', 
      distance: '2.3 km',
      address: '123 Main St, Downtown',
      customer: 'John Smith',
      total: '15,700 FCFA',
      time: 'Ready now',
      items: '3 items'
    },
    { 
      id: '#DEL-002', 
      restaurant: 'Sushi World', 
      distance: '3.1 km',
      address: '456 Oak Ave, Midtown',
      customer: 'Alice Johnson',
      total: '21,245 FCFA',
      time: 'Ready in 5 min',
      items: '2 items'
    },
    { 
      id: '#DEL-003', 
      restaurant: 'Burger House', 
      distance: '1.8 km',
      address: '789 Pine St, Uptown',
      customer: 'Bob Wilson',
      total: '13,600 FCFA',
      time: 'Ready now',
      items: '4 items'
    },
  ];

  const activeDeliveries = [
    {
      id: '#DEL-004',
      restaurant: 'Taco Bell',
      address: '321 Elm St, Eastside',
      customer: 'Emma Davis',
      status: 'Picked Up',
      time: '15 min ago',
      total: '13,200 FCFA',
    },
    {
      id: '#DEL-005',
      restaurant: 'Starbucks',
      address: '654 Maple Dr, Westside',
      customer: 'Michael Brown',
      status: 'Out for Delivery',
      time: '5 min ago',
      total: '8,200 FCFA',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      <div className={`rounded-2xl p-6 text-white ${isOnline ? 'bg-gradient-to-r from-cyan-400 to-blue-700' : 'bg-gradient-to-r from-gray-600 to-gray-700'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-300 animate-pulse' : 'bg-gray-400'}`}></div>
              <h2 className="text-xl font-bold">{isOnline ? 'You are Online' : 'You are Offline'}</h2>
            </div>
            <p className={`mt-1 ${isOnline ? 'text-green-100' : 'text-gray-300'}`}>
              {isOnline ? 'You\'re available to receive delivery requests' : 'You won\'t receive delivery requests while offline'}
            </p>
          </div>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`
                px-6 py-3 rounded-xl font-semibold transition-all shadow-lg
              ${isOnline 
                ? 'bg-white hover:bg-blue-50 text-blue-700' 
                : 'bg-green-500 hover:bg-green-600 text-white'
              }`
            }
          >
            {isOnline ? 'Go Offline' : 'Go Online'}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
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
            <h2 className="text-lg font-bold text-gray-800">Available Deliveries</h2>
            <Link 
              href="/driver/deliveries" 
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            {availableDeliveries.slice(0, 3).map((delivery) => (
              <div 
                key={delivery.id} 
                className="p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-800">{delivery.restaurant}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        delivery.time === 'Ready now' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {delivery.time}
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
                    <div className="flex items-center space-x-4 mt-2 text-sm">
                      <span className="text-gray-600">Distance: {delivery.distance}</span>
                      <span className="font-semibold text-gray-800">{delivery.total}</span>
                    </div>
                  </div>
                  <button className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm whitespace-nowrap">
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Deliveries */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Active Deliveries</h2>
            <Link 
              href="/driver/active" 
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            {activeDeliveries.map((delivery) => (
              <div 
                key={delivery.id} 
                className="p-4 rounded-xl border border-gray-100"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-800">{delivery.restaurant}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        delivery.status === 'Picked Up'
                        ? 'bg-blue-100 text-blue-700' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {delivery.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
                      <span>{delivery.id}</span>
                      <span>•</span>
                      <span>{delivery.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 text-sm text-gray-600">
                      <MapPin className="w-3 h-3" />
                      <span>{delivery.address}</span>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-sm">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">{delivery.customer}</span>
                      </div>
                      <span className="font-semibold text-gray-800">{delivery.total}</span>
                    </div>
                  </div>
                  <button className="ml-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm whitespace-nowrap">
                    Update Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Today's Deliveries</p>
              <p className="text-2xl font-bold text-gray-800">5</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Today's Earnings</p>
              <p className="text-2xl font-bold text-gray-800">$41,350 FCFA</p>
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
              <p className="text-2xl font-bold text-gray-800">4.8 
                <FaStar color='gold'/>
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