// hooks/use-driver.ts
"use client";

import {
  getDriverStats,
  getDriverStatus,
  toggleDriverOnline,
} from "@/lib/actions/driver";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useDriverStatus() {
  return useQuery({
    queryKey: ["driver", "status"],
    queryFn: getDriverStatus,
  });
}

export function useToggleDriverOnline() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleDriverOnline,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["driver", "status"] });
    },
  });
}

export function useDriverStats() {
  return useQuery({
    queryKey: ["driver", "stats"],
    queryFn: getDriverStats,
  });
}
