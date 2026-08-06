import Hero from "@/app/(landind)/home/components/layout/hero";
import FeaturedSection from "@/app/(landind)/home/components/layout/FeaturedSection";
import Footer from "@/app/(landind)/home/components/layout/Footer";
import Navbar from "@/app/(landind)/home/components/layout/Navbar";

export default function Home() {
  return (
    <main className="flex-1">
      <Navbar />
      <Hero />
      <FeaturedSection />
      <Footer />
    </main>
  );
}