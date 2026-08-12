import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Space_Grotesk,
} from "next/font/google";

import "./globals.css";

import { Providers } from "./(landind)/home/providers";
import { CartProvider } from "@/lib/cart-context";


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


const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Restore",
  description: "Restore — Fresh food, delivered with care.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <CartProvider>
            {children}
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}