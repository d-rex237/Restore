import Hero from "@/components/layout/Hero";
import FeaturedSection from "@/components/layout/FeaturedSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
