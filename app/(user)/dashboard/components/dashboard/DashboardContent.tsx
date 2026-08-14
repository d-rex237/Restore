
'use client';

import React from 'react';
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { FaHand, FaPizzaSlice, FaPlateWheat } from 'react-icons/fa6';
import { BsBalloon, BsHandIndex } from 'react-icons/bs';
import { MdDining, MdRestaurantMenu } from 'react-icons/md';
import { FaBox, FaCar, FaCreditCard, FaShoppingBag, FaShoppingCart } from 'react-icons/fa';
import { IoHandRight } from 'react-icons/io5';

const DashboardContent: React.FC = () => {
  // Mock data - would come from API
  const stats = [
    { label: 'Total Orders', value: '24', icon: ShoppingBag, color: 'bg-blue-700'},
    { label: 'Pending', value: '3', icon: Clock, color: 'bg-orange-400' },
    { label: 'Completed', value: '18', icon: CheckCircle, color: 'bg-green-600' },
    { label: 'Cancelled', value: '3', icon: XCircle, color: 'bg-red-600' },
  ];

  const recentOrders = [
    { id: '#ORD-001', restaurant: 'Pizza Palace', total: '32.50 FCFA', status: 'Delivered', date: '2024-01-15' },
    { id: '#ORD-002', restaurant: 'Sushi World', total: '45.00 FCFA', status: 'Preparing', date: '2024-01-14' },
    { id: '#ORD-003', restaurant: 'Burger House', total: '28.75 FCFA', status: 'Pending', date: '2024-01-13' },
  ];

  const quickActions = [
    { label: "Browse Restaurants", href: "/restaurants", icon: <MdRestaurantMenu color='blue'/> },
    { label: "View All Orders", href: "/dashboard/orders", icon: <FaShoppingCart color='orange'/> },
    { label: "Make a Payment", href: "/dashboard/payments", icon: <FaCreditCard color='green'/> },
    { label: "Become a Driver", href: "/dashboard/become-driver", icon: <FaCar color='red'/> },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-cyan-400 to-blue-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, John!</h1>
            <p className="text-green-100 mt-1">
              Ready to order your favorite meal?
            </p>
          </div>
          <Link
            href="/home/menu"
            className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors shadow-lg"
          >
            Browse Restaurants
          </Link>
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

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
          >
            <div className="text-3xl mb-2">{action.icon}</div>
            <p className="font-medium text-gray-700 group-hover:text-green-600 transition-colors">
              {action.label}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
            <Link
              href="/orders"
              className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center"
            >
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {order.restaurant}
                  </p>
                  <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                    <span>{order.id}</span>
                    <span>•</span>
                    <span>{order.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{order.total}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Preparing"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats & Trends */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Your Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
              <div>
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-800">847.50 FCFA</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
              <div>
                <p className="text-sm text-gray-600">Favorite Restaurant</p>
                <p className="text-lg font-bold text-gray-800">Pizza Palace</p>
              </div>
              <span className="text-3xl">
                <FaPizzaSlice/>
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="text-lg font-bold text-gray-800">January 2024</p>
              </div>
              <span className="text-3xl">
                <BsBalloon color='red'/>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;