"use client";
import { useGetProviders } from "@/hooks/use-providers";
import {
  mockOrders,
  mockRestaurants,
  mockRoleRequests,
  mockUsers,
} from "@/lib/mock-data";

import {
  Bell,
  Check,
  Handshake,
  Search,
  Tag,
  Trash,
  TrendingUp,
  User2Icon,
  Users,
} from "lucide-react";
import { useState } from "react";

const { data: provider = [] } = useGetProviders();

function AdminRequest() {
  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(mockRoleRequests.length / ITEMS_PER_PAGE);

  const paginatedRequest = mockRoleRequests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  return (
    <div>
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
              <th className="px-6 py-4">Vehicle Type</th>
              <th className="px-6 py-4">requested Role</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 ">
            {paginatedRequest.map((user) => (
              <tr key={user.id} className="bg-white hover:bg-green-100 ">
                {/* User */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                      {user.userName.charAt(0)}
                    </div>

                    <div>
                      <p className="font-medium text-gray-900">
                        {user.userName}
                      </p>
                      <p className="text-xs text-gray-500">ID: {user.id}</p>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="px-6 py-4 text-gray-600 font-bold">
                  {Object.values(user.extraData)[0] || "N/A"}
                </td>

                {/* Role */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium capitalize
                        ${
                          user.requestedRole === "driver"
                            ? "border-green-500 bg-green-50 text-green-700"
                            : user.requestedRole === "provider"
                              ? "border-orange-500 bg-orange-50 text-orange-700"
                              : "border-purple-500 bg-purple-50 text-purple-700"
                        }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full
                          ${
                            user.requestedRole === "driver"
                              ? "bg-green-500"
                              : user.requestedRole === "provider"
                                ? "bg-orange-500"
                                : "bg-purple-500"
                          }`}
                    />
                    {user.requestedRole}
                  </span>
                </td>
                {/* Date */}
                <td className="px-6 py-4 text-gray-600">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium capitalize
                          ${
                            user.status === "approved"
                              ? "border-green-500 bg-green-50 text-green-700"
                              : user.status === "pending"
                                ? "border-purple-500 bg-purple-50 text-purple-700"
                                : "border-red-500 bg-purple-50 text-red-700"
                          }`}
                  >
                    {" "}
                    {user.status}{" "}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 flex gap-3 items-center mt-1">
                  <button className="text-green-400 border border-green-500 rounded-md p-1 text-sm bg-green-100">
                    <Check size={20} />
                  </button>
                  <button className="text-red-400 border border-red-500 rounded-md p-1 text-sm bg-red-100">
                    <Trash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t bg-white px-6 py-4">
          <p className="text-sm text-gray-500">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(currentPage * ITEMS_PER_PAGE, mockRestaurants.length)} of{" "}
            {mockRoleRequests.length} users
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

export default AdminRequest;
