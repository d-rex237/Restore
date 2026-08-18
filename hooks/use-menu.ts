"use client";

import {
  createMenuItem,
  deleteMenuItem,
  getMenuByRestaurantId,
  getMenuItemById,
  getMenuItems,
  MenuItemInput,
  toggleMenuItemAvailability,
  updateMenuItem,
} from "@/lib/actions/menu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const MENU_ITEMS_KEY = ["menu-items"];

// ---------------- Read ----------------

export function useGetMenuItems() {
  return useQuery({
    queryKey: MENU_ITEMS_KEY,
    queryFn: getMenuItems,
  });
}

export function useGetMenuByRestaurant(restaurantId: string) {
  return useQuery({
    queryKey: ["menu-items", "restaurant", restaurantId],
    queryFn: () => getMenuByRestaurantId(restaurantId),
    enabled: !!restaurantId,
  });
}

export function useGetMenuItem(id: string) {
  return useQuery({
    queryKey: ["menu-items", id],
    queryFn: () => getMenuItemById(id),
    enabled: !!id,
  });
}

// ---------------- Create ----------------

export function useCreateMenuItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MenuItemInput) => createMenuItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MENU_ITEMS_KEY });
    },
  });
}

// ---------------- Update ----------------

export function useUpdateMenuItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<MenuItemInput> }) =>
      updateMenuItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MENU_ITEMS_KEY });
    },
  });
}

export function useToggleMenuItemAvailability() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleMenuItemAvailability(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MENU_ITEMS_KEY });
    },
  });
}

// ---------------- Delete ----------------

export function useDeleteMenuItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteMenuItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MENU_ITEMS_KEY });
    },
  });
}
