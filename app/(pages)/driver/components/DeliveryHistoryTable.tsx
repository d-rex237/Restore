"use client";
import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  EyeIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

interface Delivery {
  id: string;
  restaurantName: string;
  restaurantAddress: string;
  customerName: string;
  customerAddress: string;
  items: string[];
  total: number;
  status: 'ready' | 'picked_up' | 'out_for_delivery' | 'delivered' | 'cancelled';
  distance: string;
  estimatedTime: string;
  createdAt: string;
  completedAt?: string;
  earnings?: number;
}

interface DeliveryHistoryTableProps {
  deliveries: Delivery[];
  onViewDetails?: (delivery: Delivery) => void;
  onExport?: () => void;
}

const DeliveryHistoryTable: React.FC<DeliveryHistoryTableProps> = ({ 
  deliveries, 
  onViewDetails,
  onExport 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { color: string; label: string }> = {
      ready: { color: 'bg-blue-100 text-blue-800', label: 'Available' },
      picked_up: { color: 'bg-yellow-100 text-yellow-800', label: 'Picked Up' },
      out_for_delivery: { color: 'bg-purple-100 text-purple-800', label: 'Out for Delivery' },
      delivered: { color: 'bg-green-100 text-green-800', label: 'Delivered' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
    };
    return badges[status] || badges.ready;
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, React.ReactNode> = {
      ready: <ClockIcon className="w-3 h-3" />,
      picked_up: <TruckIcon className="w-3 h-3" />,
      out_for_delivery: <TruckIcon className="w-3 h-3" />,
      delivered: <CheckCircleIcon className="w-3 h-3" />,
      cancelled: <XCircleIcon className="w-3 h-3" />,
    };
    return icons[status] || <ClockIcon className="w-3 h-3" />;
  };

  const filteredDeliveries = deliveries.filter(delivery => {
    const term = searchTerm.toLowerCase();

    const searchMatch =
      (delivery.restaurantName ?? "").toLowerCase().includes(term) ||
      (delivery.customerName ?? "").toLowerCase().includes(term) ||
      String(delivery.id ?? "")
        .toLowerCase()
        .includes(term);
    const statusMatch = filterStatus === 'all' || delivery.status === filterStatus;
    
    return searchMatch && statusMatch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header with filters */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900">
              Delivery History
            </h3>
            <span className="px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded-full">
              {filteredDeliveries.length} deliveries
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            
            
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search deliveries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white">

              <option value="all">All Status</option>
              <option value="ready">Available</option>
              <option value="picked_up">Picked Up</option>
              <option value="out_for_delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {/* Export Button */}
            {onExport && (
              <button
                onClick={onExport}
                className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Export
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Restaurant
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Total
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                Distance
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDeliveries.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <ClockIcon className="w-8 h-8 text-gray-300" />
                    <p className="font-medium">No deliveries found</p>
                    <p className="text-sm text-gray-400">
                      Try adjusting your filters or search terms
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredDeliveries.map((delivery) => {
                const statusBadge = getStatusBadge(delivery.status);
                const isExpanded = expandedRow === delivery.id;

                return (
                  <React.Fragment key={delivery.id}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                        {formatDate(delivery.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {delivery.restaurantName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">
                        {delivery.customerName}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 hidden sm:table-cell">
                        FCFA {Number(delivery.total ?? 0).toFixed(2)}{" "}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}
                        >
                          {getStatusIcon(delivery.status)}
                          {statusBadge.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell">
                        {delivery.distance}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              setExpandedRow(isExpanded ? null : delivery.id)
                            }
                            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                            title="View details"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          {onViewDetails && (
                            <button
                              onClick={() => onViewDetails(delivery)}
                              className="p-1 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="View full details"
                            >
                              <ChevronDownIcon className="w-4 h-4" />
                            </button>
                          )}
                          {delivery.status === "delivered" &&
                            delivery.earnings && (
                              <span className="text-xs font-medium text-green-600">
                                +FCFA {delivery.earnings.toFixed(2)}
                              </span>
                            )}
                        </div>
                      </td>
                    </tr>

                    {/* Expanded Row Details */}
                    {isExpanded && (
                      <tr>
                        <td colSpan={7} className="px-4 py-4 bg-gray-50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-2">
                                Delivery Details
                              </h4>
                              <div className="space-y-1 text-sm text-gray-600">
                                <p>
                                  <span className="font-medium">Order ID:</span>{" "}
                                  #{delivery.id.slice(0, 8)}
                                </p>
                                <p>
                                  <span className="font-medium">Pickup:</span>{" "}
                                  {delivery.restaurantAddress}
                                </p>
                                <p>
                                  <span className="font-medium">Dropoff:</span>{" "}
                                  {delivery.customerAddress}
                                </p>
                                <p>
                                  <span className="font-medium">Distance:</span>{" "}
                                  {delivery.distance}
                                </p>
                                <p>
                                  <span className="font-medium">
                                    Est. Time:
                                  </span>{" "}
                                  {delivery.estimatedTime}
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-2">
                                Order Items
                              </h4>
                              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                {delivery.items.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                              {delivery.completedAt && (
                                <p className="mt-2 text-xs text-gray-500">
                                  Completed: {formatDate(delivery.completedAt)}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          Showing {filteredDeliveries.length} of {deliveries.length} deliveries
        </p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors disabled:opacity-50">
            Previous
          </button>
          <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            1
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryHistoryTable