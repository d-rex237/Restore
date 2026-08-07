"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { FaTrash, FaArrowLeft, FaShoppingCart } from "react-icons/fa";

export default function CartPage() {
  const { items, removeFromCart, clearCart, getCartTotal } = useCart();
  
  // ✅ ADD THIS SAFETY CHECK
  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
        <FaShoppingCart className="text-6xl text-foreground/20 mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
        <p className="text-foreground/60 mb-6">Looks like you haven't added any items yet.</p>
        <Link href="/home/menu" className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-hover transition">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/home/menu" className="text-foreground/60 hover:text-primary transition">
            <FaArrowLeft />
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Your Cart</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border border-border rounded-2xl bg-card shadow-sm">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-foreground/60">Qty: {item.quantity}</p>
                    <p className="text-primary font-medium text-sm">
                      {item.price.toLocaleString()} FCFA
                    </p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition p-2"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-1">
            <div className="p-6 border border-border rounded-2xl bg-card shadow-sm sticky top-20">
              <h3 className="font-bold text-lg text-foreground mb-4">Order Summary</h3>
              <div className="flex justify-between border-b border-border/30 pb-4 mb-4">
                <span className="text-foreground/60">Subtotal</span>
                <span className="font-medium text-foreground">
                  {getCartTotal().toLocaleString()} FCFA
                </span>
              </div>
              <button 
                onClick={clearCart}
                className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-hover transition mb-3"
              >
                Checkout
              </button>
              <button 
                onClick={clearCart}
                className="w-full bg-destructive/10 text-destructive py-3 rounded-xl font-semibold hover:bg-destructive hover:text-white transition text-sm"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}