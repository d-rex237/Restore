"use client";

import {
  Bell,
  CreditCard,
  Search,
  TrendingUp,
  TrendingDown,
  User2Icon,
  ShoppingBag,
  UtensilsCrossed,
  Clock3,
  Loader2,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useGetProviderOrders } from "@/hooks/use-orders";
import ProviderChart from "@/app/(landind)/home/provider/providerChart";
import { useGetOwnRestaurant } from "@/hooks/use-restaurant";
import { useGetProviderDashboardStats } from "@/hooks/use-dashboard";

const STATUS_STYLES: Record<string, { badge: string; icon: string }> = {
  pending: {
    badge: "bg-purple-100 text-purple-700",
    icon: "bg-purple-100 text-purple-600",
  },
  accepted: {
    badge: "bg-blue-100 text-blue-700",
    icon: "bg-blue-100 text-blue-600",
  },
  preparing: {
    badge: "bg-purple-100 text-purple-700",
    icon: "bg-purple-100 text-purple-600",
  },
  ready_for_pickup: {
    badge: "bg-purple-100 text-purple-700",
    icon: "bg-purple-100 text-purple-600",
  },
  out_for_delivery: {
    badge: "bg-purple-100 text-purple-700",
    icon: "bg-purple-100 text-purple-600",
  },
  delivered: {
    badge: "bg-green-100 text-green-700",
    icon: "bg-green-100 text-green-600",
  },
  rejected: {
    badge: "bg-red-100 text-red-700",
    icon: "bg-red-100 text-red-600",
  },
  cancelled: {
    badge: "bg-red-100 text-red-700",
    icon: "bg-red-100 text-red-600",
  },
};

function formatChange(pct: number | null) {
  if (pct === null) return null;
  const rounded = Math.round(pct);
  return {
    label: `${rounded >= 0 ? "+" : ""}${rounded}%`,
    positive: rounded >= 0,
  };
}

function timeAgo(dateString: string) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

function ProviderDash() {
  const { user } = useUser();
  const { data: restaurant } = useGetOwnRestaurant();
  const { data: statsData, isLoading: statsLoading } =
    useGetProviderDashboardStats();
  const { data: ordersData, isLoading: ordersLoading } = useGetProviderOrders({
    sortBy: "createdAt",
    sortOrder: "desc",
    limit: 5,
  });

  const orders = ordersData?.orders ?? [];

  const revenueChange = formatChange(statsData?.revenueChangePct ?? null);
  const orderChange = formatChange(statsData?.orderChangePct ?? null);

  const stats = [
    {
      title: "Total Revenue",
      value: statsData
        ? `FCFA ${statsData.totalRevenueThisMonth.toLocaleString()}`
        : "—",
      change: revenueChange,
      subtitle: "vs last month",
      icon: CreditCard,
      bg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Orders",
      value: statsData ? statsData.totalOrders.toLocaleString() : "—",
      change: orderChange,
      subtitle: "new orders vs last week",
      icon: ShoppingBag,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Menu Items",
      value: statsData ? statsData.menuItemCount.toString() : "—",
      change: statsData
        ? { label: `+${statsData.menuItemsAddedThisMonth}`, positive: true }
        : null,
      subtitle: "new this month",
      icon: UtensilsCrossed,
      bg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div>
      {/* Header */}
      <header className="rounded-full border border-gray-200 bg-[#214341] px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="relative w-80">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-100"
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-lg border border-gray-200 bg-transparent py-2 pl-10 pr-4 outline-none transition focus:border-green-500"
            />
          </div>

          <div className="flex items-center gap-5">
            <button className="rounded-full bg-transparent p-2 shadow-sm">
              <Bell size={20} className="text-gray-50" />
            </button>

            <div className="text-right">
              <p className="font-medium text-white">
                {restaurant?.name ?? user?.fullName ?? "—"}
              </p>
              <p className="text-sm capitalize text-green-200">Provider</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-200">
              <User2Icon className="text-green-600" size={20} />
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Cards */}
      <section className="mt-8 grid grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border w-full border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <h2 className="mt-2 text-3xl font-serif font-bold text-gray-900">
                    {statsLoading ? (
                      <Loader2
                        size={22}
                        className="animate-spin text-gray-300"
                      />
                    ) : (
                      stat.value
                    )}
                  </h2>
                </div>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.bg}`}
                >
                  <Icon className={stat.iconColor} size={28} />
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm">
                {stat.change && (
                  <span
                    className={`flex items-center gap-1 font-semibold ${
                      stat.change.positive ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {stat.change.positive ? (
                      <TrendingUp size={14} />
                    ) : (
                      <TrendingDown size={14} />
                    )}
                    {stat.change.label}
                  </span>
                )}
                <span className="text-gray-500">{stat.subtitle}</span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid grid-cols-2 mt-6 gap-6">
        <div>
          <ProviderChart />
        </div>

        <div className="rounded-2xl border border-gray-100 bg-gray-100 p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-black">
                Recent Transactions
              </h2>
              <p className="text-sm text-gray-500">
                Latest payments and orders
              </p>
            </div>
          </div>

          {ordersLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 size={20} className="animate-spin text-gray-400" />
            </div>
          ) : orders.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-500">
              No orders yet.
            </p>
          ) : (
            <div className="space-y-4">
              {orders.map((order: any) => {
                const style =
                  STATUS_STYLES[order.status] ?? STATUS_STYLES.pending;

                return (
                  <div
                    key={order.id}
                    className="flex items-center justify-between rounded-xl border border-gray-300 p-4 transition hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-full ${style.icon}`}
                      >
                        <CreditCard size={20} />
                      </div>

                      <div>
                        <h3 className="font-medium text-black">
                          {order.customerName}
                        </h3>
                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                          <Clock3 size={13} />
                          {timeAgo(order.createdAt)}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-green-600">
                        FCFA {order.total.toLocaleString()}
                      </p>
                      <span
                        className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${style.badge}`}
                      >
                        {order.status.replaceAll("_", " ")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm text-black">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">All Orders</h2>
            <p className="text-sm text-gray-500">
              Manage and track every customer order
            </p>
          </div>
        </div>

        {ordersLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 size={20} className="animate-spin text-gray-400" />
          </div>
        ) : orders.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-500">
            No orders yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 text-left text-sm text-gray-500">
                  <th className="pb-4 font-medium">Order</th>
                  <th className="pb-4 font-medium">Customer</th>
                  <th className="pb-4 font-medium">Items</th>
                  <th className="pb-4 font-medium">Total</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium">Date</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order: any) => {
                  const style =
                    STATUS_STYLES[order.status] ?? STATUS_STYLES.pending;

                  return (
                    <tr
                      key={order.id}
                      className="border-b border-gray-50 transition hover:bg-gray-50"
                    >
                      <td className="py-4">
                        <p className="font-medium text-gray-900">
                          #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                      </td>

                      <td className="py-4">
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-gray-500">
                          {order.restaurantName}
                        </p>
                      </td>

                      <td className="py-4">
                        <p className="text-sm">
                          {order.items.reduce(
                            (sum: number, item: any) => sum + item.quantity,
                            0,
                          )}{" "}
                          items
                        </p>
                      </td>

                      <td className="py-4 font-semibold text-green-600">
                        FCFA {order.total.toLocaleString()}
                      </td>

                      <td className="py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${style.badge}`}
                        >
                          {order.status.replaceAll("_", " ")}
                        </span>
                      </td>

                      <td className="py-4 text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default ProviderDash;
