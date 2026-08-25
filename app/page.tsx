import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Hero from "@/app/(landind)/home/components/layout/hero";
import FeaturedSection from "@/app/(landind)/home/components/layout/FeaturedSection";
import Footer from "@/app/(landind)/home/components/layout/Footer";
import Navbar from "@/app/(landind)/home/components/layout/Navbar";
import CartSidebar from "@/app/(landind)/home/components/layout/CartSidebar";

export default async function Home() {
  const { sessionClaims } = await auth();
  const role = sessionClaims?.metadata?.role;

  if (role === "ADMIN") {
    redirect("/admin");
  }

  if (role === "PROVIDER") {
    redirect("/provider");
  }

  if (role === "DRIVER") {
    redirect("/driver");
  }

  // CUSTOMER role (or signed-out visitors) see the landing page as normal
  return (
    <main className="flex-1">
      <Navbar />
      <Hero />
      <FeaturedSection />
      <Footer />
       {/* CART SIDEBAR */}
      <CartSidebar />
    </main>
  );
}
