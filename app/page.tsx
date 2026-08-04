import Hero from "@/components/layout/Hero";
import FeaturedSection from "@/components/layout/FeaturedSection";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <FeaturedSection />
    </main>
  );
}