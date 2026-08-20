"use client";

import {
  createRestaurant,
  getAllRestaurants,
  getOwnRestaurant,
  getRestaurantById,
  RestaurantInput,
} from "@/lib/actions/restaurants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const RESTAURANT_KEY = ["own-restaurant"];

export function useGetOwnRestaurant() {
  return useQuery({
    queryKey: RESTAURANT_KEY,
    queryFn: getOwnRestaurant,
  });
}

export function useCreateRestaurant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RestaurantInput) => createRestaurant(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESTAURANT_KEY });
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
    },
  });
}

// ---------------- Public browsing ----------------

export function useGetAllRestaurants() {
  return useQuery({
    queryKey: ["restaurants", "all"],
    queryFn: getAllRestaurants,
  });
}

export function useGetRestaurant(id: string) {
  return useQuery({
    queryKey: ["restaurants", id],
    queryFn: () => getRestaurantById(id),
    enabled: !!id,
  });
}
