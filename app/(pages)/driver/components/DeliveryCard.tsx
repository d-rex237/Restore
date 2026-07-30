import React, { useState } from 'react';
import { 
  MapPinIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  TruckIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface DeliveryCardProps {
  delivery: {
    id: string;
    restaurantName: string;
    restaurantAddress: string;
    customerName: string;
    customerAddress: string;
    items: string[];
    total: number;
    status: 'ready' | 'picked_up' | 'out_for_delivery' | 'delivered';
    distance: string;
    estimatedTime: string;
    createdAt: string;
  };
  onAccept: (id: string) => void;
  onStatusUpdate: (id: string, status: any) => void;
  isActive: boolean;
  isAvailable: boolean;
}

const DeliveryCard: React.FC<DeliveryCardProps> = ({ 
  delivery, 
  onAccept, 
  onStatusUpdate,
  isActive,
  isAvailable
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const getStatusBadge = (status: string) => {
    const badges = {
      ready: 'bg-green-100 text-green-800',
      picked_up: 'bg-blue-100 text-blue-800',
      out_for_delivery: 'bg-purple-100 text-purple-800',
      delivered: 'bg-gray-100 text-gray-800'
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts = {
      ready: 'Ready for Pickup',
      picked_up: 'Picked Up',
      out_for_delivery: 'Out for Delivery',
      delivered: 'Delivered'
    };
    return texts[status as keyof typeof texts] || status;
  };

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdating(true);
    await onStatusUpdate(delivery.id, newStatus);
    setIsUpdating(false);
  };

  const getNextStatus = () => {
    const statusFlow: Record<string, string | null> = {
      ready: 'picked_up',
      picked_up: 'out_for_delivery',
      out_for_delivery: 'delivered',
      delivered: null
    };
    return statusFlow[delivery.status] || null;
  };

  const nextStatus = getNextStatus();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow mb-5 mt-3">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          {/* Left Section */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {delivery.restaurantName}
              </h3>
              <span className={'px-2 py-0.5 text-xs font-medium rounded-full ${getStatusBadge(delivery.status)}'
                 
              }>
                {getStatusText(delivery.status)}
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-gray-400" />
                <span>Pickup: {delivery.restaurantAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-gray-400" />
                <span>Delivery: {delivery.customerAddress}</span>
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {isExpanded ? 'Hide items' : 'View items'}
            </button>

            {isExpanded && (
              <div className="mt-3 pl-2 border-l-2 border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-1">Order Items:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {delivery.items ?? [] .map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Right Section */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
              
                <span className="font-medium">FCFA {Number(delivery.total ?? 0).toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon className="w-4 h-4 text-gray-400" />
                <span>{delivery.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <TruckIcon className="w-4 h-4 text-gray-400" />
                <span>{delivery.distance}</span>
              </div>
            </div>

            {/* Action Buttons */}
            {delivery.status === 'ready' && isAvailable && !isActive && (
              <button
                onClick={() => onAccept(delivery.id)}
                className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <TruckIcon className="w-4 h-4" />
                Accept Delivery
              </button>
            )}

            {isActive && nextStatus && (
              <button
                onClick={() => handleStatusUpdate(nextStatus)}
                disabled={isUpdating}
                className="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isUpdating ? (
                  <ArrowPathIcon className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircleIcon className="w-4 h-4" />
                )}
                {nextStatus === 'picked_up' && 'Mark as Picked Up'}
                {nextStatus === 'out_for_delivery' && 'Mark as Out for Delivery'}
                {nextStatus === 'delivered' && 'Mark as Delivered'}
              </button>
            )}

            {delivery.status === 'delivered' && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircleIcon className="w-5 h-5" />
                <span className="font-medium">Completed</span>
              </div>
            )}

            {!isAvailable && delivery.status === 'ready' && (
              <p className="text-sm text-gray-500 italic">
                Go online to accept deliveries
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCard