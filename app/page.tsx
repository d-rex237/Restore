import Hero from "@/app/(landind)/home/components/layout/hero";
import FeaturedSection from "@/app/(landind)/home/components/layout/FeaturedSection";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <FeaturedSection />
    </main>
  );
}
