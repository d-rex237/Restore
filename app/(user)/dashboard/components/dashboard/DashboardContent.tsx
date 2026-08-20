"use client";

import React from "react";
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import {
  FaPizzaSlice,
  FaCar,
  FaCreditCard,
  FaShoppingCart,
} from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { BsBalloon } from "react-icons/bs";

import { useGetCustomerOrders } from "@/hooks/use-orders";

const DashboardContent: React.FC = () => {
  const { data, isLoading } = useGetCustomerOrders();
  const orders = data?.orders ?? [];
  const totalOrders = orders.length;

  const pendingOrders = orders.filter((order: any) => {
    const status = String(order.status).toUpperCase().trim();

    return [
      "PENDING",
      "ACCEPTED",
      "PREPARING",
      "READY_FOR_PICKUP",
      "OUT_FOR_DELIVERY",
    ].includes(status);
  }).length;

  const completedOrders = orders.filter((order: any) => {
    return String(order.status).toUpperCase().trim() === "DELIVERED";
  }).length;

  const cancelledOrders = orders.filter((order: any) => {
    return String(order.status).toUpperCase().trim() === "CANCELLED";
  }).length;

  const stats = [
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "bg-blue-700",
    },
    {
      label: "Pending",
      value: pendingOrders,
      icon: Clock,
      color: "bg-orange-400",
    },
    {
      label: "Completed",
      value: completedOrders,
      icon: CheckCircle,
      color: "bg-green-600",
    },
    {
      label: "Cancelled",
      value: cancelledOrders,
      icon: XCircle,
      color: "bg-red-600",
    },
  ];
  /*
   * MOST RECENT 3 ORDERS
   */

  const recentOrders = [...orders]
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 3);

  /*
   * STATUS DISPLAY
   */

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Pending";

      case "ACCEPTED":
        return "Accepted";

      case "PREPARING":
        return "Preparing";

      case "READY_FOR_PICKUP":
        return "Ready for Pickup";

      case "OUT_FOR_DELIVERY":
        return "Out for Delivery";

      case "DELIVERED":
        return "Delivered";

      case "REJECTED":
        return "Rejected";

      case "CANCELLED":
        return "Cancelled";

      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-700";

      case "PREPARING":
        return "bg-blue-100 text-blue-700";

      case "ACCEPTED":
        return "bg-indigo-100 text-indigo-700";

      case "READY_FOR_PICKUP":
        return "bg-cyan-100 text-cyan-700";

      case "OUT_FOR_DELIVERY":
        return "bg-purple-100 text-purple-700";

      case "CANCELLED":
      case "REJECTED":
        return "bg-red-100 text-red-700";

      case "PENDING":
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  /*
   * QUICK ACTIONS
   */

  const quickActions = [
    {
      label: "Browse Restaurants",
      href: "/home/restaurants",
      icon: <MdRestaurantMenu color="blue" />,
    },
    {
      label: "View All Orders",
      href: "/dashboard/orders",
      icon: <FaShoppingCart color="orange" />,
    },
    {
      label: "Make a Payment",
      href: "/dashboard/payments",
      icon: <FaCreditCard color="green" />,
    },
    {
      label: "Become a Driver",
      href: "/dashboard/become-driver",
      icon: <FaCar color="red" />,
    },
  ];

  /*
   * LOADING STATE
   */

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}

      <div className="bg-gradient-to-r from-cyan-400 to-blue-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back!</h1>

            <p className="text-green-100 mt-1">
              Ready to order your favorite meal?
            </p>
          </div>

          <Link
            href="/home/restaurants"
            className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors shadow-lg"
          >
            Browse Restaurants
          </Link>
        </div>
      </div>

      {/* =========================================
          ORDER STATISTICS
      ========================================== */}

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

      {/* Recent Orders + Activity */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>

            <Link
              href="/dashboard/orders"
              className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center"
            >
              View all
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentOrders.length === 0 ? (
              <p className="text-gray-500 text-sm py-4">
                You have no orders yet.
              </p>
            ) : (
              recentOrders.map((order: any) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-50"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {order.restaurant?.name || "Restaurant"}
                    </p>

                    <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                      <span>#{order.id.slice(0, 8)}</span>

                      <span>•</span>

                      <span>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-gray-800">
                      {Number(order.total).toLocaleString()} FCFA
                    </p>

                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Activity */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Your Activity
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
              <div>
                <p className="text-sm text-gray-600">Total Spent</p>

                <p className="text-2xl font-bold text-gray-800">
                  {orders
                    .filter((order: any) => order.status === "DELIVERED")
                    .reduce(
                      (sum: number, order: any) =>
                        sum + Number(order.total || 0),
                      0,
                    )
                    .toLocaleString()}{" "}
                  FCFA
                </p>
              </div>

              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>

                <p className="text-lg font-bold text-gray-800">{totalOrders}</p>
              </div>

              <span className="text-3xl">
                <FaPizzaSlice />
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
              <div>
                <p className="text-sm text-gray-600">Completed Orders</p>

                <p className="text-lg font-bold text-gray-800">
                  {completedOrders}
                </p>
              </div>

              <span className="text-3xl">
                <BsBalloon color="red" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};;

export default DashboardContent;
