
'use client';

import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { CreditCard, Plus, Calendar, Lock, CheckCircle, Clock, DollarSign } from 'lucide-react';

export default function PaymentsPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    { id: 'card', type: 'Credit Card', last4: '**** 4242', expiry: '12/25', brand: 'Visa' },
    { id: 'paypal', type: 'PayPal', email: 'user@email.com' },
  ];

  const recentTransactions = [
    { id: '#TRX-001', restaurant: 'Pizza Palace', amount: '32.50 FCFA', status: 'Completed', date: '2024-01-15' },
    { id: '#TRX-002', restaurant: 'Sushi World', amount: '45.00 FCFA', status: 'Completed', date: '2024-01-14' },
    { id: '#TRX-003', restaurant: 'Burger House', amount: '28.75 FCFA', status: 'Pending', date: '2024-01-13' },
  ];

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('Payment processed successfully!');
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Payments</h1>
          <p className="text-gray-500">
            Manage your payment methods and view transaction history
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-cyan-400 to-blue-700 rounded-2xl p-6 text-white">
            <p className="text-sm text-green-100">Total Spent</p>
            <p className="text-3xl font-bold">847.50 FCFA</p>
            <p className="text-sm text-green-100 mt-1">Last 30 days</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Active Orders</p>
            <p className="text-3xl font-bold text-gray-800">3</p>
            <p className="text-sm text-gray-500 mt-1">Pending payments</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Saved Cards</p>
            <p className="text-3xl font-bold text-gray-800">2</p>
            <p className="text-sm text-gray-500 mt-1">Payment methods</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


          {/* Add Payment Method */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Add Payment Method
            </h2>
            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`
                  w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-semibold text-white
                  transition-all duration-200
                  ${
                    isProcessing
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-cyan-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
                  }`}
              >
                <span>
                  {isProcessing ? "Processing..." : "Add Payment Method"}
                </span>
                <Plus
                  className={`w-4 h-4 ${isProcessing ? "opacity-0" : ""}`}
                />
              </button>
            </form>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Recent Transactions
            </h2>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-50"
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      {transaction.status === "Completed" ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Clock className="w-5 h-5 text-yellow-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {transaction.restaurant}
                      </p>
                      <p className="text-xs text-gray-500">
                        {transaction.id} • {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">
                      {transaction.amount}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        transaction.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}