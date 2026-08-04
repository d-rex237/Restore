"use client";
import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface DeliveryHistoryProps {
  deliveries: Array<{
    id: string;
    restaurantName: string;
    customerName: string;
    total: number;
    status: string;
    createdAt: string;
  }>;
}

const DeliveryHistory: React.FC<DeliveryHistoryProps> = ({
  deliveries = [],
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedDeliveries = isExpanded ? deliveries : deliveries.slice(0, 5);

  if (deliveries.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Delivery History
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Restaurant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedDeliveries.map((delivery) => (
              <tr key={delivery.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {delivery.restaurantName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {delivery.customerName}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  FCFA {delivery.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(delivery.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                    {delivery.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deliveries.length > 5 && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
          >
            {isExpanded ? (
              <>
                <ChevronUpIcon className="w-4 h-4" />
                Show less
              </>
            ) : (
              <>
                <ChevronDownIcon className="w-4 h-4" />
                Show more ({deliveries.length - 5} more)
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default DeliveryHistory;
