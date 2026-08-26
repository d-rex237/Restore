"use client";
import { useGetAdminOrders } from "@/hooks/use-orders";
import { useGetAllRestaurants } from "@/hooks/use-restaurant";
import { useGetAllUsers } from "@/hooks/use-users";
import {
  Bell,
  Handshake,
  Search,
  Tag,
  TrendingUp,
  User2Icon,
  Users,
} from "lucide-react";
import { useState } from "react";

function AdminPage() {
  const { data: ordersData, isLoading } = useGetAdminOrders();
  const orders = ordersData?.orders ?? [];

  const { data: restaurants = [] } = useGetAllRestaurants();
  const { data: users = [] } = useGetAllUsers();
  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(users.length / ITEMS_PER_PAGE));

  const paginatedUsers = users.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  const currentUser = users.find((u: any) => u.role === "ADMIN");

  const activeOrdersCount = orders.filter(
    (o: any) => !["delivered", "cancelled", "rejected"].includes(o.status),
  ).length;

  return (
    <div>
      <div className="">
        <header className=" bg-[#f5f5f5] border-b border-border px-8 py-4 rounded-full">
          <div className="flex items-center justify-between gap-4 ">
            <div className="flex">
              <input
                type="text"
                className="border-2 border-border rounded-lg px-7 py-2"
                placeholder="Search..."
              />{" "}
              <Search
                size={20}
                className="transform translate-y-3 -translate-x-8"
              />{" "}
            </div>

            <div className="flex items-center gap-4">
              <Bell size={20} className="text-foreground/70" />
              <div className="text-right">
                <p className="text-sm font-medium">{currentUser?.name}</p>
                <p className="text-xs capitalize text-foreground/60">
                  {currentUser?.role}
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-muted">
                <User2Icon size={18} className="text-foreground/70" />
              </div>
            </div>
          </div>
        </header>
        {/* cards section */}
        <section className="mt-8 grid grid-cols-4 gap-4">
          {/* Users */}
          <div className="rounded-lg bg-cyan-500 px-4 py-3 text-white shadow">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-white/20 p-2">
                <Users size={18} />
              </div>
              <span className="font-medium">Number of Users</span>
            </div>

            {/* Divider */}
            <div className="my-3 h-px bg-white/20" />

            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold">{users.length}</p>
              <div className="text-right">
                <p className="text-green-200 font-medium">+2.5%</p>
                <p className="text-xs text-white/70">Last Month</p>
              </div>
            </div>
          </div>

          {/* Active Orders */}
          <div className="rounded-lg bg-blue-600 px-4 py-3 text-white shadow">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-white/20 p-2">
                <Tag size={18} />
              </div>
              <span className="font-medium">Active Orders</span>
            </div>

            <div className="my-3 h-px bg-white/20" />

            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold">
                {isLoading ? "—" : activeOrdersCount}
              </p>
              <div className="text-right">
                <p className="text-green-200 font-medium">+1.0%</p>
                <p className="text-xs text-white/70">Last Month</p>
              </div>
            </div>
          </div>

          {/* Providers */}
          <div className="rounded-lg bg-orange-500 px-4 py-3 text-white shadow">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-white/20 p-2">
                <Handshake size={18} />
              </div>
              <span className="font-medium">Active Providers</span>
            </div>

            <div className="my-3 h-px bg-white/20" />

            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold">{restaurants.length}</p>
              <div className="text-right">
                <p className="text-green-200 font-medium">+4.0%</p>
                <p className="text-xs text-white/70">Last Month</p>
              </div>
            </div>
          </div>

          {/* ROI */}
          <div className="rounded-lg bg-red-600 px-4 py-3 text-white shadow">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-white/20 p-2">
                <TrendingUp size={18} />
              </div>
              <span className="font-medium">Average ROI</span>
            </div>

            <div className="my-3 h-px bg-white/20" />

            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold">142%</p>
              <div className="text-right">
                <p className="text-green-200 font-medium">+12%</p>
                <p className="text-xs text-white/70">Last Month</p>
              </div>
            </div>
          </div>
        </section>

        {/* quick cards section */}
        <section className="mt-8 grid grid-cols-3 gap-4">
          <div className=" bg-[#f5f5f5] rounded-md px-8 py-3">
            <div className="">
              <h3 className="text-xl">Recent Transactions</h3>
            </div>
            <div className="my-3 h-px bg-black/20 " />
            {orders.length === 0 ? (
              <p className="py-4 text-sm text-gray-400">No orders yet.</p>
            ) : (
              orders.slice(0, 3).map((order: any) => (
                <div key={order.id}>
                  <div className="flex justify-between">
                    <div className="">{order.customerName}</div>
                    <div
                      className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs
                ${
                  order.status === "delivered"
                    ? "border-green-500 text-green-700 bg-green-100"
                    : order.status === "pending" ||
                        order.status === "preparing" ||
                        order.status === "accepted" ||
                        order.status === "ready_for_pickup" ||
                        order.status === "out_for_delivery"
                      ? "border-orange-500 text-orange-700  bg-orange-100"
                      : "border-red-500 text-red-700 bg-red-100"
                }`}
                    >
                      <div
                        className={`h-2 w-2 rounded-full
                  ${
                    order.status === "delivered"
                      ? "bg-green-500"
                      : order.status === "pending" ||
                          order.status === "preparing" ||
                          order.status === "accepted" ||
                          order.status === "ready_for_pickup" ||
                          order.status === "out_for_delivery"
                        ? "bg-orange-500"
                        : "bg-red-500"
                  }`}
                      />
                      <p className="text-xs">{order.status}</p>
                    </div>
                  </div>
                  <div className="my-3 h-px bg-green-700/20 " />
                </div>
              ))
            )}
          </div>
          {/* Recent Users */}
          <div className="rounded-lg bg-[#f5f5f5] px-6 py-5">
            <h3 className="text-lg font-semibold">Recent Users</h3>

            <div className="my-4 h-px bg-black/10" />

            {users.slice(0, 3).map((user: any) => (
              <div key={user.id}>
                <div className="flex items-center justify-between py-2">
                  <p>{user.name}</p>

                  <div
                    className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs
                 ${user.role == "CUSTOMER" ? "bg-green-100 text-green-700 border-green-500 " : user.role == "DRIVER" ? "bg-blue-100  text-blue-700 border-blue-500" : user.role == "PROVIDER" ? " bg-orange-300  text-orange-700 border-orange-500" : "bg-orange-500"}`}
                  >
                    <div
                      className={`h-2 w-2 rounded-full ${user.role == "CUSTOMER" ? "bg-green-500" : user.role == "DRIVER" ? "bg-blue-500" : user.role == "PROVIDER" ? " bg-orange-300" : "bg-red-500"}`}
                    />
                    {user.role}
                  </div>
                </div>

                <div className="my-2 h-px bg-black/10" />
              </div>
            ))}
          </div>

          {/* Recent Restaurants */}
          <div className="rounded-lg bg-[#f5f5f5] px-6 py-5">
            <h3 className="text-lg font-semibold">Recent Restaurants</h3>

            <div className="my-4 h-px bg-black/10" />

            {restaurants.slice(0, 3).map((restaurant: any) => (
              <div key={restaurant.id}>
                <div className="flex items-center justify-between py-2">
                  <p>{restaurant.name}</p>

                  <div
                    className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${
                      restaurant.isOpen
                        ? "border-green-500 text-green-700 bg-green-100"
                        : "border-red-500 text-red-700 bg-red-100"
                    }`}
                  >
                    <div
                      className={`h-2 w-2 rounded-full ${
                        restaurant.isOpen ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    {restaurant.isOpen ? "Open" : "Closed"}
                  </div>
                </div>

                <div className="my-2 h-px bg-black/10" />
              </div>
            ))}
          </div>
        </section>

        {/* All Users */}
        <section className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
              <p className="text-sm text-gray-500">
                Everyone registered on the platform
              </p>
            </div>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              {users.length} Users
            </span>
          </div>

          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm font-semibold uppercase tracking-wide text-gray-500">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Joined</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {paginatedUsers.map((user: any) => (
                <tr key={user.id} className="bg-white hover:bg-gray-50">
                  {/* User */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                        {user.name.charAt(0)}
                      </div>

                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">
                          ID: {user.id.slice(0, 8)}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium capitalize
                ${
                  user.role === "CUSTOMER"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : user.role === "DRIVER"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : user.role === "PROVIDER"
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : "border-purple-500 bg-purple-50 text-purple-700"
                }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full
                  ${
                    user.role === "CUSTOMER"
                      ? "bg-green-500"
                      : user.role === "DRIVER"
                        ? "bg-blue-500"
                        : user.role === "PROVIDER"
                          ? "bg-orange-500"
                          : "bg-purple-500"
                  }`}
                      />
                      {user.role}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between border-t bg-white px-6 py-4">
            <p className="text-sm text-gray-500">
              Showing{" "}
              {users.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, users.length)} of{" "}
              {users.length} users
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-md border px-2 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`h-7 w-7 rounded-md text-sm ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "border hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="rounded-md border px-2 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminPage;
