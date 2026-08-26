"use client";

import React from "react";
import DriverLayout from "../components/driver/DriverLayout";
import {
  MapPin,
  User,
  Mail,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useGetDriverOrders, useUpdateOrderStatus } from "@/hooks/use-orders";

const STEPS = ["Ready for Pickup", "Out for Delivery", "Delivered"];

export default function ActiveDeliveriesPage() {
  const { data, isLoading } = useGetDriverOrders({
    status: "OUT_FOR_DELIVERY",
  });
  const updateStatus = useUpdateOrderStatus();

  const activeDeliveries = data?.orders ?? [];

  return (
    <DriverLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Active Deliveries
          </h1>
          <p className="text-gray-500">
            Track and manage your active deliveries
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="space-y-4">
            {activeDeliveries.map((delivery) => {
              // Every order in this list is OUT_FOR_DELIVERY (that's the only
              // status this page queries for), so the current step is fixed —
              // it only advances once the driver marks it Delivered, at which
              // point it drops out of this list entirely.
              const currentStep = 1;

              return (
                <div
                  key={delivery.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-800">
                          {delivery.restaurantName}
                        </h3>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                          Out for Delivery
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 mt-2 text-sm text-gray-500">
                        <span>#{delivery.id.slice(0, 8)}</span>
                        <span>•</span>
                        <span>
                          Updated{" "}
                          {new Date(delivery.updatedAt).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>{delivery.deliveryAddress}</span>
                      </div>
                      <div className="flex items-center space-x-4 mt-3">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {delivery.customerName}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {delivery.customerEmail}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-gray-500">
                          Progress
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {STEPS.map((step, index) => (
                          <div
                            key={step}
                            className="flex-1 flex flex-col items-center"
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                index <= currentStep
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-200 text-gray-400"
                              }`}
                            >
                              {index < currentStep ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                <span>{index + 1}</span>
                              )}
                            </div>
                            <span
                              className={`text-xs mt-1 text-center ${
                                index <= currentStep
                                  ? "text-blue-600"
                                  : "text-gray-400"
                              }`}
                            >
                              {step}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-2xl font-bold text-gray-800">
                          {delivery.total.toLocaleString()} FCFA
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          updateStatus.mutate({
                            orderId: delivery.id,
                            status: "DELIVERED",
                          })
                        }
                        disabled={updateStatus.isPending}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm disabled:opacity-60"
                      >
                        {updateStatus.isPending
                          ? "Updating..."
                          : "Mark Delivered"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!isLoading && activeDeliveries.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700">
              No Active Deliveries
            </h3>
            <p className="text-gray-500">
              You don't have any active deliveries right now.
            </p>
          </div>
        )}
      </div>
    </DriverLayout>
  );
}
