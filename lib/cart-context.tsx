"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type CartContextType = {
  cart: any[];
  getCartCount: () => number;
  addToCart: (item: any) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (item: any) => {
    setCart((prev) => [...prev, item]);
  };

  const getCartCount = () => cart.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
