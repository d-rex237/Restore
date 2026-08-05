"use client";

import { useEffect } from "react"; // ✅ Fixed: Imported useEffect!
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation"; 
import { useCart } from "@/lib/cart-context";
import { FaTrash, FaArrowRight, FaTimes } from "react-icons/fa";

export default function CartSidebar() {
  const router = useRouter(); 
  const pathname = usePathname(); 
  const { 
    cart, 
    removeFromCart, 
    getCartTotal, 
    isCartOpen, 
    toggleCart,
    clearCart 
  } = useCart();

  // ✅ Reset sidebar if cart empties on a new page
  useEffect(() => {
    if (cart.length === 0 && isCartOpen) {
      toggleCart();
    }
  }, [cart.length, pathname]);

  if (!isCartOpen) return null;

  // ✅ Clean handleCheckout - No delay, instant navigation
  const handleCheckout = () => {
    clearCart();      
    toggleCart();     
    router.push("/order-confirmation");
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleCart}></div>
      <div className="relative w-full max-w-md bg-background border-l border-border h-full shadow-2xl flex flex-col">
        
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Your Cart</h2>
          <button onClick={toggleCart} className="text-foreground/60 hover:text-foreground transition">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/60">Your cart is empty.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 border border-border/50 rounded-xl bg-card">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-sm text-foreground">{item.name}</h4>
                    <p className="text-xs text-foreground/60">Qty: {item.quantity}</p>
                    <p className="text-primary font-medium text-sm">{item.price.toLocaleString()} FCFA</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 transition">
                    <FaTrash className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-border bg-muted/20">
            <div className="flex justify-between mb-4">
              <span className="text-foreground/60">Total</span>
              <span className="font-bold text-foreground text-lg">{getCartTotal().toLocaleString()} FCFA</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="flex items-center justify-center gap-2 w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-hover transition"
            >
              Checkout <FaArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}