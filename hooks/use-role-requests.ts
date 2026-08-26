// hooks/use-role-requests.ts
"use client";

import {
  approveRoleRequest,
  createRoleRequest,
  getAllRoleRequests,
  getMyRoleRequests,
  rejectRoleRequest,
  RoleRequestInput,
} from "@/lib/actions/role-requests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const KEY = ["role-requests", "mine"];

export function useMyRoleRequests() {
  return useQuery({
    queryKey: KEY,
    queryFn: getMyRoleRequests,
  });
}

export function useCreateRoleRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: RoleRequestInput) => createRoleRequest(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEY });
    },
  });
}

// ---------------- Admin ----------------

const ADMIN_KEY = ["role-requests", "all"];

export function useGetAllRoleRequests() {
  return useQuery({
    queryKey: ADMIN_KEY,
    queryFn: getAllRoleRequests,
  });
}

export function useApproveRoleRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestId: string) => approveRoleRequest(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEY });
    },
  });
}

export function useRejectRoleRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestId: string) => rejectRoleRequest(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEY });
    },
  });
}
