"use client";
import { MockOrder, mockOrders } from "@/lib/mock-data";
import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";
import React, { useState } from "react";

function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<MockOrder | null>(null);
  return (
    <div>
      <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">All Orders</h2>
            <p className="text-sm text-gray-500">
              Manage and track every customer order
            </p>
          </div>
        </div>

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
                <th className="pb-4 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {[...mockOrders]
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
                )
                .map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-50 transition hover:bg-gray-50"
                  >
                    <td className="py-4">
                      <p className="font-medium text-gray-900">
                        #{order.id.toUpperCase()}
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
                          (sum, item) => sum + item.quantity,
                          0,
                        )}{" "}
                        items
                      </p>
                    </td>

                    <td className="py-4 font-semibold text-green-600">
                      FCFA {order.total.toLocaleString()}
                    </td>

                    <td className="py-4">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium capitalize text-green-700">
                        {order.status}
                      </span>
                    </td>

                    <td className="py-4 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4 text-sm text-gray-500 flex items-center">
                      <button
                        onClick={() => {
                          console.log(order);
                          setSelectedOrder(order);
                        }}
                        className="cursor-pointer text-gray-600 transition hover:text-gray-900"
                      >
                        <EyeIcon size={18} />
                      </button>
                      <PencilIcon
                        size={18}
                        className="ml-4 cursor-pointer text-gray-600 transition hover:text-gray-900"
                      />
                      <Trash2Icon
                        size={18}
                        className="ml-4 cursor-pointer text-red-500 transition hover:text-red-700"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
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
                  className="rounded-full p-2 hover:bg-gray-100 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="mb-3 font-semibold text-gray-700">Customer</h3>

                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Name:</strong> {selectedOrder.customerName}
                    </p>
                    <p>
                      <strong>Customer ID:</strong> {selectedOrder.customerId}
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
                  <h3 className="mb-3 font-semibold text-gray-700">Delivery</h3>

                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Driver:</strong>{" "}
                      {selectedOrder.driverName ?? "Not Assigned"}
                    </p>

                    <p>
                      <strong>Address:</strong> {selectedOrder.deliveryAddress}
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
                      {new Date(selectedOrder.createdAt).toLocaleString()}
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
      </section>
    </div>
  );
}

export default OrdersPage;
