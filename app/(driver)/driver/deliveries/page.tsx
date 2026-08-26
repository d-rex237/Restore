"use client";

import React, { useState } from "react";
import DriverLayout from "../components/driver/DriverLayout";
import { MapPin, Clock, User, Mail, Search, Loader2 } from "lucide-react";
import {
  useClaimDelivery,
  useGetAvailableDeliveries,
} from "@/hooks/use-orders";

export default function DeliveriesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetAvailableDeliveries({
    search,
    page,
    limit: 10,
  });
  const claimMutation = useClaimDelivery();

  const deliveries = data?.orders ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <DriverLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Available Deliveries
          </h1>
          <p className="text-gray-500">View and accept delivery requests</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex-1 relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // reset paging whenever the search term changes
              }}
              placeholder="Search deliveries..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : deliveries.length === 0 ? (
            <p className="py-12 text-center text-sm text-gray-400">
              No deliveries available right now.
            </p>
          ) : (
            <div className="space-y-4">
              {deliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-800">
                          {delivery.restaurantName}
                        </h3>
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700">
                          Ready
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
                        <span>#{delivery.id.slice(0, 8)}</span>
                        <span>•</span>
                        <span>
                          {delivery.items.reduce(
                            (sum, i) => sum + i.quantity,
                            0,
                          )}{" "}
                          items
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>{delivery.deliveryAddress}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1 text-sm text-gray-600">
                        <Clock className="w-3 h-3" />
                        <span>
                          Placed:{" "}
                          {new Date(delivery.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <User className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {delivery.customerName}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {delivery.customerEmail}
                        </span>
                      </div>
                      {/* No phone field on MappedOrder/customer select yet —
                          add `phone: true` to the customer select in ORDER_INCLUDE
                          and to MappedOrder if you want it here. */}
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-xl font-bold text-gray-800">
                          {delivery.total.toLocaleString()} FCFA
                        </p>
                      </div>
                      <button
                        onClick={() => claimMutation.mutate(delivery.id)}
                        disabled={claimMutation.isPending}
                        className="w-full mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm disabled:opacity-60"
                      >
                        {claimMutation.isPending
                          ? "Accepting..."
                          : "Accept Delivery"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Showing {deliveries.length} of {data?.total ?? 0} deliveries
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="text-gray-600 px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-sm text-gray-500">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="text-gray-600 px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </DriverLayout>
  );
}
