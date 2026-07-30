"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { CartProvider } from "@/lib/cart-context"; // This import must be here!

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <ThemeProvider 
        attribute="class" 
        defaultTheme="system" 
        enableSystem={true} 
        disableTransitionOnChange
      >
        {/* The CartProvider MUST wrap {children} like this: */}
        <CartProvider>
          {children}
        </CartProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}