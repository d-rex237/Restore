"use client";

import { useQuery } from "@tanstack/react-query";
import { getProviders } from "@/lib/actions/providers";

export function useGetProviders() {
  return useQuery({
    queryKey: ["providers"],
    queryFn: getProviders,
  });
}
