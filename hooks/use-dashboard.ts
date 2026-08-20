"use client";

import { getProviderDashboardStats } from "@/lib/actions/dashboard";
import { useQuery } from "@tanstack/react-query";

export function useGetProviderDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "provider-stats"],
    queryFn: getProviderDashboardStats,
  });
}
