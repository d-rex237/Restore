import { getOrders } from "@/lib/actions/orders";
import { useQuery } from "@tanstack/react-query";

export function useGetOrders() {
  const result = useQuery({
    queryKey: ["getOrders"],
    queryFn: getOrders,
  });

  return result;
}
