
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Restor",
  description: "Manage your orders, profile, and more on Restor",
};

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
