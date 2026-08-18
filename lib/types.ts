export interface DietaryInfo {
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  preparationTime?: number;
  ingredients: string[];
  isPopular?: boolean;
  dietaryInfo?: DietaryInfo;
}

// lib/types/orders.ts

export type OrderStatusValue =
  | "PENDING"
  | "ACCEPTED"
  | "PREPARING"
  | "READY_FOR_PICKUP"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "REJECTED"
  | "CANCELLED";

// Common filter/pagination shape accepted by every role-based fetcher.
// Every field is optional — callers pass only what they need.
export type OrderFilters = {
  status?: OrderStatusValue;
  search?: string; // matches customer name, restaurant name, or order id
  dateFrom?: string; // ISO date string, inclusive
  dateTo?: string; // ISO date string, inclusive
  page?: number; // 1-indexed, defaults to 1
  limit?: number; // defaults to 10
  sortBy?: "createdAt" | "total";
  sortOrder?: "asc" | "desc"; // defaults to "desc"
};

export type MappedOrderItem = {
  menuItemId: string;
  name: string;
  quantity: number;
  priceAtOrder: number;
};

// Flat shape every fetcher returns, regardless of role —
// matches what the frontend components already expect.
export type MappedOrder = {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  restaurantId: string;
  restaurantName: string;
  driverId?: string;
  driverName?: string;
  status: string; // lowercased, e.g. "pending", "ready_for_pickup"
  items: MappedOrderItem[];
  total: number;
  deliveryAddress: string;
  createdAt: string;
  updatedAt: string;
};

export type PaginatedOrders = {
  orders: MappedOrder[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
