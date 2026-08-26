"use client";
import { useGetAllUsers } from "@/hooks/use-users";
import {
  mockOrders,
  mockRestaurants,
  mockRoleRequests,
  mockUsers,
} from "@/lib/mock-data";

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

function AdminUSer() {
  const { data: users = [], isLoading } = useGetAllUsers();
  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

  const paginatedUsers = users.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  const currentUser = users.find((u) => u.role === "ADMIN");
  return (
    <div>
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

      {/* New Users */}
      <section className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-green-100 shadow-sm">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">New Users</h2>
            <p className="text-sm text-gray-500">Recently registered users</p>
          </div>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            {mockUsers.length} Users
          </span>
        </div>

        <table className="w-full">
          <thead className="bg-green-200">
            <tr className="text-left text-sm font-semibold uppercase tracking-wide text-gray-500">
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Joined</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="bg-white hover:bg-green-100">
                {/* User */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                      {user.name.charAt(0)}
                    </div>

                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">ID: {user.id}</p>
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
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(currentPage * ITEMS_PER_PAGE, mockUsers.length)} of{" "}
            {mockUsers.length} users
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
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="rounded-md border px-2 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminUSer;
