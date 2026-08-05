'use client';

import React from 'react';
import DriverLayout from '../components/driver/DriverLayout';
import { MapPin, Clock, User, Phone, CheckCircle, AlertCircle } from 'lucide-react';

export default function ActiveDeliveriesPage() {
  const activeDeliveries = [
    {
      id: '#DEL-004',
      restaurant: 'Taco Bell',
      address: '321 Elm St, Eastside',
      customer: 'Emma Davis',
      phone: '+1 678 901 234',
      status: 'Picked Up',
      time: '15 min ago',
      total: '11,950 FCFA',
      eta: '10 min',
      steps: ['Order Ready', 'Picked Up', 'Out for Delivery', 'Delivered'],
      currentStep: 1
    },
    {
      id: '#DEL-005',
      restaurant: 'Starbucks',
      address: '654 Maple Dr, Westside',
      customer: 'Michael Brown',
      phone: '+1 789 012 345',
      status: 'Out for Delivery',
      time: '5 min ago',
      total: '7,400 FCFA',
      eta: '5 min',
      steps: ['Order Ready', 'Picked Up', 'Out for Delivery', 'Delivered'],
      currentStep: 2
    },
  ];

  return (
    <DriverLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Active Deliveries</h1>
          <p className="text-gray-500">Track and manage your active deliveries</p>
        </div>

        <div className="space-y-4">
          {activeDeliveries.map((delivery) => (
            <div key={delivery.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800">{delivery.restaurant}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      delivery.status === 'Picked Up' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {delivery.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 mt-2 text-sm text-gray-500">
                    <span>{delivery.id}</span>
                    <span>•</span>
                    <span>{delivery.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-2 text-sm text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span>{delivery.address}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-3">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-600">{delivery.customer}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-600">{delivery.phone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-500">Progress</span>
                    <span className="text-sm font-semibold text-blue-600">ETA: {delivery.eta}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {delivery.steps.map((step, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            index <= delivery.currentStep 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-400'
                        }`}>
                          {index < delivery.currentStep ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>
                        <span className={`text-xs mt-1 text-center ${
                          index <= delivery.currentStep ? 'text-blue-600' : 'text-gray-400'
                        }`}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-2xl font-bold text-gray-800">{delivery.total}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm">
                      Update Status
                    </button>
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeDeliveries.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700">No Active Deliveries</h3>
            <p className="text-gray-500">You don't have any active deliveries right now.</p>
          </div>
        )}
      </div>
    </DriverLayout>
  );
}