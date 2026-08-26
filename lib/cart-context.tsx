"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  getCartCount: () => number;
  getCartTotal: () => number;
  addToCart: (
    item: Omit<CartItem, "quantity">,
    quantity?: number
  ) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  /* =========================================================
     LOAD CART FROM LOCAL STORAGE
  ========================================================= */

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("restore-cart");

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    }

    setMounted(true);
  }, []);

  /* =========================================================
     SAVE CART
  ========================================================= */

  useEffect(() => {
    if (!mounted) return;

    try {
      localStorage.setItem(
        "restore-cart",
        JSON.stringify(cart)
      );
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cart, mounted]);

  /* =========================================================
     ADD TO CART
  ========================================================= */

  const addToCart = (
    item: Omit<CartItem, "quantity">,
    quantity: number = 1
  ) => {
    if (quantity < 1) return;

    setCart((prev) => {
      const existingItem = prev.find(
        (i) => String(i.id) === String(item.id)
      );

      if (existingItem) {
        return prev.map((i) =>
          String(i.id) === String(item.id)
            ? {
                ...i,
                quantity: i.quantity + quantity,
              }
            : i
        );
      }

      return [
        ...prev,
        {
          ...item,
          id: String(item.id),
          quantity,
        },
      ];
    });

    // Automatically open the cart
    setIsCartOpen(true);
  };

  /* =========================================================
     REMOVE
  ========================================================= */

  const removeFromCart = (id: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => String(item.id) !== String(id)
      )
    );
  };

  /* =========================================================
     UPDATE QUANTITY
  ========================================================= */

  const updateQuantity = (
    id: string,
    newQuantity: number
  ) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              quantity: newQuantity,
            }
          : item
      )
    );
  };

  /* =========================================================
     CLEAR
  ========================================================= */

  const clearCart = () => {
    setCart([]);
    setIsCartOpen(false);
  };

  /* =========================================================
     COUNT
  ========================================================= */

  const getCartCount = () => {
    return cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  };

  /* =========================================================
     TOTAL
  ========================================================= */

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) =>
        total + Number(item.price) * item.quantity,
      0
    );
  };

  /* =========================================================
     TOGGLE
  ========================================================= */

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        getCartCount,
        getCartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used within a CartProvider"
    );
  }

  return context;
}