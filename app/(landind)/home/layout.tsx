"use client";

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { Providers } from "./providers";
import CartSidebar from "./components/layout/CartSidebar";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isDriverDashboard =
    pathname === "/driver/dashboard" ||
    pathname.startsWith("/driver/dashboard/") ||
    pathname === "/driver" ||
    pathname.startsWith("/driver/");

  return (
    <>
      {!isDriverDashboard && <Navbar />}

      <main className="flex-1">
        {children}
      </main>

      {!isDriverDashboard && <Footer />}

      <CartSidebar />
    </>
  );
}