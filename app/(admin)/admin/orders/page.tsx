"use client";
import {
  MockOrder,
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
  View,
  X,
} from "lucide-react";
import { useState } from "react";

function AdminOrders() {
  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<MockOrder | null>(null);
  const totalPages = Math.ceil(mockOrders.length / ITEMS_PER_PAGE);

  const paginatedOrders = mockOrders.slice(
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
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 ">
            {paginatedOrders.map((order) => (
              <tr key={order.id} className="bg-white hover:bg-green-100 ">
                {/* User */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                      {order.customerName.charAt(0)}
                    </div>

                    <div>
                      <p className="font-medium text-gray-900">
                        {order.customerName}
                      </p>
                      <p className="text-xs text-gray-500">ID: {order.id}</p>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="px-6 py-4 text-gray-600 font-bold">
                  {order.items.map((item) => item.name).join(", ")}
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium capitalize
                          ${
                            order.status === "delivered"
                              ? "border-green-500 bg-green-50 text-green-700"
                              : order.status === "pending" ||
                                  order.status === "preparing" ||
                                  order.status === "accepted" ||
                                  order.status === "ready_for_pickup" ||
                                  order.status === "out_for_delivery"
                                ? "border-purple-500 bg-purple-50 text-purple-700"
                                : "border-red-500 bg-purple-50 text-red-700"
                          }`}
                  >
                    {" "}
                    {order.status}{" "}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 flex gap-3 items-center mt-1">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-purple-400 border border-purple-500 rounded-md p-1 text-sm bg-purple-100"
                  >
                    <View size={20} />
                  </button>
                  <button className="text-green-400 border border-green-500 rounded-md p-1 text-sm bg-green-100">
                    <Check size={20} />
                  </button>
                  <button className="text-red-400 border border-red-500 rounded-md p-1 text-sm bg-red-100">
                    <Trash size={20} />
                  </button>
                </td>
                {selectedOrder && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
                    onClick={() => setSelectedOrder(null)}
                  >
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl"
                    >
                      <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Order Details</h2>

                        <button
                          onClick={() => setSelectedOrder(null)}
                          className="rounded-full p-2 hover:bg-gray-100"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h3 className="mb-3 font-semibold text-gray-700">
                            Customer
                          </h3>

                          <div className="space-y-2 text-sm">
                            <p>
                              <strong>Name:</strong>{" "}
                              {selectedOrder.customerName}
                            </p>
                            <p>
                              <strong>Customer ID:</strong>{" "}
                              {selectedOrder.customerId}
                            </p>
                            <p>
                              <strong>Restaurant:</strong>{" "}
                              {selectedOrder.restaurantName}
                            </p>
                            <p>
                              <strong>Restaurant ID:</strong>{" "}
                              {selectedOrder.restaurantId}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h3 className="mb-3 font-semibold text-gray-700">
                            Delivery
                          </h3>

                          <div className="space-y-2 text-sm">
                            <p>
                              <strong>Driver:</strong>{" "}
                              {selectedOrder.driverName ?? "Not Assigned"}
                            </p>

                            <p>
                              <strong>Address:</strong>{" "}
                              {selectedOrder.deliveryAddress}
                            </p>

                            <p>
                              <strong>Status:</strong>{" "}
                              <span className="capitalize">
                                {selectedOrder.status.replaceAll("_", " ")}
                              </span>
                            </p>

                            <p>
                              <strong>Total:</strong> FCFA{" "}
                              {selectedOrder.total.toLocaleString()}
                            </p>

                            <p>
                              <strong>Created:</strong>{" "}
                              {new Date(
                                selectedOrder.createdAt,
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <h3 className="mb-4 font-semibold text-gray-700">
                          Ordered Items
                        </h3>

                        <div className="space-y-3">
                          {selectedOrder.items.map((item) => (
                            <div
                              key={item.menuItemId}
                              className="flex items-center justify-between rounded-lg border p-4"
                            >
                              <div>
                                <p className="font-medium">{item.name}</p>

                                <p className="text-sm text-gray-500">
                                  Quantity: {item.quantity}
                                </p>
                              </div>

                              <p className="font-semibold">
                                FCFA {item.priceAtOrder.toLocaleString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 flex justify-end gap-3">
                        <button
                          onClick={() => setSelectedOrder(null)}
                          className="rounded-lg border px-5 py-2 hover:bg-gray-100"
                        >
                          Close
                        </button>

                        <button className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700">
                          Approve Order
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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

export default AdminOrders;
