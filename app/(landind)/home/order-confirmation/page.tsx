"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCheckCircle, FaShoppingCart, FaSpinner } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useCreateOrder, useGetOrder } from "@/hooks/use-orders";

export default function OrderConfirmation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const { cart, getCartTotal, clearCart } = useCart();
  const createOrderMutation = useCreateOrder();
  const {
    data: order,
    isLoading: orderLoading,
    isError,
  } = useGetOrder(orderId ?? "");

  const [address, setAddress] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (!address.trim()) {
      setFormError("Please enter a delivery address.");
      return;
    }

    try {
      const newOrder = await createOrderMutation.mutateAsync({
        items: cart.map((item) => ({
          menuItemId: item.id, // assumes cart item.id === menuItemId
          quantity: item.quantity,
        })),
        deliveryAddress: address.trim(),
      });

      clearCart();
      // Update the URL with the new orderId — this same component then
      // switches to the "confirmed" view below since orderId is now present.
      router.replace(`/home/order-confirmation?orderId=${newOrder.id}`);
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Something went wrong placing your order.",
      );
    }
  }

  // ============================================================
  // STATE 1 — an order was just placed / page revisited with an id
  // ============================================================
  if (orderId) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center py-12">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 text-5xl mb-6">
          <FaCheckCircle />
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-2">
          Order Placed! 🎉
        </h1>
        <p className="text-foreground/60 mb-8 max-w-md">
          Your food is being prepared. You will receive a notification when the
          driver picks up your order.
        </p>

        <div className="w-full max-w-md mb-8 rounded-2xl border border-border bg-card p-6 text-left">
          {orderLoading ? (
            <div className="flex justify-center py-6">
              <Loader2 size={20} className="animate-spin text-foreground/40" />
            </div>
          ) : isError || !order ? (
            <p className="text-sm text-foreground/50 text-center">
              Couldn't load order details, but your order was placed.
            </p>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/50">
                <div>
                  <p className="text-xs text-foreground/50">Order ID</p>
                  <p className="text-sm font-mono font-semibold">
                    {order.id.slice(0, 12)}
                  </p>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">
                  {order.status}
                </span>
              </div>

              <p className="text-sm font-medium mb-2">{order.restaurantName}</p>

              <div className="space-y-2 mb-4">
                {order.items.map((item) => (
                  <div
                    key={item.menuItemId}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-foreground/70">
                      {item.quantity}× {item.name}
                    </span>
                    <span className="font-medium">
                      {(item.priceAtOrder * item.quantity).toLocaleString()}{" "}
                      FCFA
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between border-t border-border/50 pt-3">
                <span className="text-sm font-semibold">Total</span>
                <span className="text-sm font-bold text-primary">
                  {order.total.toLocaleString()} FCFA
                </span>
              </div>

              <p className="mt-3 text-xs text-foreground/50">
                Delivering to: {order.deliveryAddress}
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/home/menu"
            className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="border border-foreground/30 text-foreground px-6 py-3 rounded-full font-medium hover:bg-foreground/5 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  // ============================================================
  // STATE 2 — cart is empty and no order in progress
  // ============================================================
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
        <FaShoppingCart className="text-6xl text-foreground/20 mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Nothing to check out
        </h2>
        <p className="text-foreground/60 mb-6">Your cart is empty.</p>
        <Link
          href="/home/menu"
          className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-hover transition"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  // ============================================================
  // STATE 3 — checkout form: review cart, enter address, place order
  // ============================================================
  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-foreground mb-8 text-center">
          Checkout
        </h1>

        <div className="rounded-2xl border border-border bg-card p-6 mb-6">
          <h2 className="font-semibold text-foreground mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-12 w-12 rounded-lg object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-lg bg-muted flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-foreground/50">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-semibold text-foreground">
                  {(item.price * item.quantity).toLocaleString()} FCFA
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between border-t border-border/50 pt-4">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-bold text-primary text-lg">
              {getCartTotal().toLocaleString()} FCFA
            </span>
          </div>
        </div>

        <form
          onSubmit={handlePlaceOrder}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <h2 className="font-semibold text-foreground mb-4">
            Delivery Details
          </h2>

          <label className="block text-sm font-medium text-foreground/70 mb-2">
            Delivery Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="e.g. Hospital Roundabout, Bamenda"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary mb-2"
          />
          {formError && (
            <p className="text-sm text-red-500 mb-2">{formError}</p>
          )}

          <button
            type="submit"
            disabled={createOrderMutation.isPending}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground hover:bg-primary-hover transition disabled:opacity-60"
          >
            {createOrderMutation.isPending && (
              <FaSpinner className="h-4 w-4 animate-spin" />
            )}
            {createOrderMutation.isPending ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
}
