import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Providers } from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { CartProvider } from "@/lib/cart-context";
import CartSidebar from "@/components/layout/CartSidebar"; // ✅ Added this import!

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Restore",
  description: "A Next.js app powered by Clerk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
          <Providers>
            <CartProvider>
              <Navbar />
              {children}
              <Footer />
              <CartSidebar /> {/* ✅ MUST BE HERE TO WORK! */}
            </CartProvider>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}