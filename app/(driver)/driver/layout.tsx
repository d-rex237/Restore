import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Driver Dashboard - Restor",
  description: "Manage your deliveries and earnings on Restor",
};

export default function DriverRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
