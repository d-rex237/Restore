"use client";

import React, { useState } from "react";
import DriverLayout from "../components/driver/DriverLayout";
import { CheckCircle, Loader2 } from "lucide-react";
import { useGetDriverOrders } from "@/hooks/use-orders";

export default function DriverHistoryPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetDriverOrders({
    status: "DELIVERED",
    page,
    limit: 10,
  });

  const history = data?.orders ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <DriverLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Delivery History</h1>
          <p className="text-gray-500">View all your past deliveries</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : history.length === 0 ? (
            <p className="py-12 text-center text-sm text-gray-400">
              No completed deliveries yet.
            </p>
          ) : (
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
                      Earnings
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
                        #{delivery.id.slice(0, 8)}
                      </td>
                      <td className="py-3 px-6">
                        <div>
                          <p className="font-medium text-gray-800">
                            {delivery.restaurantName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {delivery.deliveryAddress}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-6">
                        <div className="text-sm">
                          <p className="text-gray-800">
                            {new Date(delivery.updatedAt).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(delivery.updatedAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-6 font-semibold text-green-600">
                        {delivery.total.toLocaleString()} FCFA
                      </td>
                      <td className="py-3 px-6">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3 inline mr-1" />
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Showing {history.length} of {data?.total ?? 0} deliveries
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
