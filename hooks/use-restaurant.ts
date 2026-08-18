"use client";

import {
  createRestaurant,
  getOwnRestaurant,
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
