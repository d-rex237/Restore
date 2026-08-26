// hooks/use-users.ts
"use client";

import { getAllUsers, getUserById } from "@/lib/actions/users";
import { useQuery } from "@tanstack/react-query";

export function useGetAllUsers() {
  return useQuery({
    queryKey: ["users", "all"],
    queryFn: getAllUsers,
  });
}

export function useGetUser(userId: string) {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
}
