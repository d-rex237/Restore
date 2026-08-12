"use client";

import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

export default function OrderConfirmation() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 text-5xl mb-6">
        <FaCheckCircle />
      </div>
      
      <h1 className="text-3xl font-bold text-foreground mb-2">Order Placed! 🎉</h1>
      <p className="text-foreground/60 mb-8 max-w-md">
        Your food is being prepared. You will receive a notification when the driver picks up your order.
      </p>

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