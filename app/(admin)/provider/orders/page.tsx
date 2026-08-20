"use client";
import {
  useGetProviderOrders,
  useUpdateOrderStatus,
  useDeleteOrder,
} from "@/hooks/use-orders";
import { CheckIcon, EyeIcon, Loader2, Trash2Icon } from "lucide-react";
import { useState } from "react";

function OrdersPage() {
  const { data, isLoading } = useGetProviderOrders();
  const orders = data?.orders ?? [];

  const updateStatus = useUpdateOrderStatus();
  const deleteOrderMutation = useDeleteOrder();

  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [actioningId, setActioningId] = useState<string | null>(null);

  const statusBadgeClass = (status: string) =>
    status === "delivered"
      ? "bg-green-100 text-green-700"
      : status === "accepted"
        ? "bg-blue-100 text-blue-700"
        : status === "pending" ||
            status === "preparing" ||
            status === "ready_for_pickup" ||
            status === "out_for_delivery"
          ? "bg-purple-100 text-purple-700"
          : "bg-red-100 text-red-700";

  async function handleApprove(orderId: string) {
    setActioningId(orderId);
    try {
      await updateStatus.mutateAsync({ orderId, status: "ACCEPTED" });
      setSelectedOrder((prev: any) =>
        prev?.id === orderId ? { ...prev, status: "accepted" } : prev,
      );
    } finally {
      setActioningId(null);
    }
  }

  async function handleDelete(orderId: string) {
    if (!confirm("Delete this order permanently? This can't be undone."))
      return;
    setActioningId(orderId);
    try {
      await deleteOrderMutation.mutateAsync(orderId);
      setSelectedOrder((prev: any) => (prev?.id === orderId ? null : prev));
    } finally {
      setActioningId(null);
    }
  }

  return (
    <div>
      <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm text-black">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">All Orders</h2>
            <p className="text-sm text-gray-500">
              Manage and track every customer order
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={20} className="animate-spin text-gray-400" />
          </div>
        ) : orders.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-500">
            No orders yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
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
                {orders.map((order: any) => {
                  const isPending = order.status === "pending";
                  const isActioning = actioningId === order.id;

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
                          className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusBadgeClass(order.status)}`}
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
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="cursor-pointer text-gray-600 transition hover:text-gray-900"
                            aria-label="View order"
                          >
                            <EyeIcon size={18} />
                          </button>

                          {/* Approve only shows while pending — once acted on,
                              the status badge alone communicates the outcome. */}
                          {isPending && (
                            <button
                              onClick={() => handleApprove(order.id)}
                              disabled={isActioning}
                              className="cursor-pointer text-green-600 transition hover:text-green-800 disabled:opacity-50"
                              aria-label="Approve order"
                            >
                              {isActioning ? (
                                <Loader2 size={18} className="animate-spin" />
                              ) : (
                                <CheckIcon size={18} />
                              )}
                            </button>
                          )}

                          <button
                            onClick={() => handleDelete(order.id)}
                            disabled={isActioning}
                            className="cursor-pointer text-red-500 transition hover:text-red-700 disabled:opacity-50"
                            aria-label="Delete order"
                          >
                            <Trash2Icon size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {selectedOrder && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
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

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="mb-3 font-semibold text-gray-700">Customer</h3>

                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Name:</strong> {selectedOrder.customerName}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedOrder.customerEmail}
                    </p>
                    <p>
                      <strong>Restaurant:</strong>{" "}
                      {selectedOrder.restaurantName}
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
                  {selectedOrder.items.map((item: any) => (
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

                {/* Matches the row-level gating — only shown while pending */}
                {selectedOrder.status === "pending" && (
                  <button
                    onClick={() => handleApprove(selectedOrder.id)}
                    disabled={actioningId === selectedOrder.id}
                    className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                  >
                    {actioningId === selectedOrder.id
                      ? "Approving..."
                      : "Approve Order"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default OrdersPage;
