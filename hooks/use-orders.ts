// lib/hooks/use-orders.ts
"use client";

import {
  claimDelivery,
  getAdminOrders,
  getAvailableDeliveries,
  getCustomerOrders,
  getDriverOrders,
  getProviderOrders,
  updateOrderStatus,
} from "@/lib/actions/orders";
import type { OrderFilters, OrderStatusValue } from "@/lib/types";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

// Base keys — each role gets its own cache bucket so, e.g., an admin
// refetch never stomps on a driver's cached data.
const KEYS = {
  admin: (filters: OrderFilters) => ["orders", "admin", filters] as const,
  provider: (filters: OrderFilters) => ["orders", "provider", filters] as const,
  driver: (filters: OrderFilters) => ["orders", "driver", filters] as const,
  availableDeliveries: (filters: OrderFilters) =>
    ["orders", "available-deliveries", filters] as const,
  customer: (filters: OrderFilters) => ["orders", "customer", filters] as const,
};

// Used to invalidate every order-related query at once after a mutation —
// simplest way to make sure admin/provider/driver/customer views all
// refresh together when a status changes, without tracking exact keys.
const ALL_ORDERS_KEY = ["orders"];

// ============================================================
// ADMIN
// ============================================================

export function useGetAdminOrders(filters: OrderFilters = {}) {
  return useQuery({
    queryKey: KEYS.admin(filters),
    queryFn: () => getAdminOrders(filters),
    placeholderData: keepPreviousData, // avoids flicker when paging/filtering
  });
}

// ============================================================
// PROVIDER
// ============================================================

export function useGetProviderOrders(filters: OrderFilters = {}) {
  return useQuery({
    queryKey: KEYS.provider(filters),
    queryFn: () => getProviderOrders(filters),
    placeholderData: keepPreviousData,
  });
}

// ============================================================
// DRIVER
// ============================================================

export function useGetDriverOrders(filters: OrderFilters = {}) {
  return useQuery({
    queryKey: KEYS.driver(filters),
    queryFn: () => getDriverOrders(filters),
    placeholderData: keepPreviousData,
  });
}

export function useGetAvailableDeliveries(
  filters: Omit<OrderFilters, "status"> = {},
) {
  return useQuery({
    queryKey: KEYS.availableDeliveries(filters),
    queryFn: () => getAvailableDeliveries(filters),
    placeholderData: keepPreviousData,
    // Available deliveries change frequently as other drivers claim them —
    // refetch more aggressively than a typical query.
    refetchInterval: 15_000,
  });
}

export function useClaimDelivery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => claimDelivery(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ALL_ORDERS_KEY });
    },
  });
}

// ============================================================
// CUSTOMER
// ============================================================

export function useGetCustomerOrders(filters: OrderFilters = {}) {
  return useQuery({
    queryKey: KEYS.customer(filters),
    queryFn: () => getCustomerOrders(filters),
    placeholderData: keepPreviousData,
  });
}

// ============================================================
// SHARED — status update (admin approve/reject, provider stage
// updates, driver marking delivered, etc.)
// ============================================================

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderId,
      status,
    }: {
      orderId: string;
      status: OrderStatusValue;
    }) => updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ALL_ORDERS_KEY });
    },
  });
}
