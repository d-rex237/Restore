"use client";

import { usePathname } from "next/navigation"; // ✅ Import this
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { Providers } from "./providers";
import CartSidebar from "./components/layout/CartSidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
  const pathname = usePathname(); // ✅ Get current page URL

  // ✅ If the user is on the old_driver dashboard, hide the Navbar & Footer
  const isDriverDashboard =
    pathname === "/old_driver" || pathname.startsWith("/old_driver/");

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <Providers>
          {children}

          <CartSidebar />
        </Providers>
      </body>
    </html>
  );
}
