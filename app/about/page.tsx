"use client";

import Link from "next/link";
import Image from "next/image";
import { FaTruck, FaClock, FaHeart, FaUsers, FaStore } from "react-icons/fa";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background pt-10 pb-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        
        {/* ================= PAGE HEADER ================= */}
        <div data-aos="fade-down" className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🇨🇲 About Restor
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Bringing <span className="text-primary">Cameroon's Flavors</span> to Your Doorstep
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            We are on a mission to connect hungry customers with the best local restaurants 
            and deliver delicious food with a smile.
          </p>
        </div>

        {/* ================= OUR STORY & MISSION ================= */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
          <div data-aos="fade-right" className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
            <p className="text-foreground/70 mb-4 leading-relaxed">
              Restor was born from a simple idea: <strong>food should be easy to get, delicious to eat, and affordable for everyone.</strong> 
              We noticed that while there were incredible restaurants in Bamenda, Douala, and Yaoundé, there was no seamless way to get their food delivered fast.
            </p>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              Today, Restor connects thousands of customers to local vendors and drivers, 
              creating a thriving food community across Cameroon.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
                <FaHeart className="text-primary" /> <span className="text-sm">Built with ❤️ in Cameroon</span>
              </div>
              <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
                <FaUsers className="text-primary" /> <span className="text-sm">20k+ Happy Customers</span>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" className="order-1 md:order-2 relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg border border-border">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-orange-500/20 flex items-center justify-center text-8xl">
              🍛
            </div>
            <p className="absolute bottom-4 left-0 right-0 text-center text-foreground/50 text-sm font-medium px-4">
              Restor HQ - Bamenda, Cameroon
            </p>
          </div>
        </div>

        {/* ================= KEY FEATURES ================= */}
        <div data-aos="fade-up" className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground">Why Choose Restor</h2>
          <p className="text-center text-foreground/60 mb-12 max-w-2xl mx-auto">
            We combine local passion with modern technology to make your dining experience unforgettable.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl mb-4">
                <FaTruck />
              </div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast Delivery</h3>
              <p className="text-foreground/60">Our drivers are always nearby, ensuring your food arrives hot, fresh, and on time.</p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl mb-4">
                <FaStore />
              </div>
              <h3 className="text-xl font-bold mb-2">Local Restaurant Partners</h3>
              <p className="text-foreground/60">We partner with the best local restaurants to bring authentic Cameroonian cuisine to you.</p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl mb-4">
                <FaClock />
              </div>
              <h3 className="text-xl font-bold mb-2">Real-Time Tracking</h3>
              <p className="text-foreground/60">Track your order from the moment it's placed until it arrives at your doorstep.</p>
            </div>
          </div>
        </div>

        {/* ================= MEET THE TEAM ================= */}
        <div data-aos="fade-up" className="mb-10">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground">Built by Passionate People</h2>
          <p className="text-center text-foreground/60 mb-12 max-w-2xl mx-auto">
            A dedicated team working hard to make Restor the best food delivery experience in Cameroon.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 - Brandon (REAL IMAGE) */}
            <div className="p-6 rounded-2xl border border-border bg-card text-center shadow-sm">
              <div className="relative w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden">
                <Image 
                  src="/images/brandon.jpeg"  // ✅ Uses your real image!
                  alt="Brandon" 
                  fill 
                  className="object-cover" 
                />
              </div>
              <h4 className="font-bold text-lg">Brandon Mane</h4>
              <p className="text-sm text-foreground/60">Frontend Developer</p>
              <p className="text-xs text-foreground/50 mt-2">Built the Restor UI, animations & pages</p>
            </div>

            {/* Team Member 2 - D-ReX (DUMMY) */}
            <div className="p-6 rounded-2xl border border-border bg-card text-center shadow-sm">
              <div className="relative w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden">
                <Image 
                  src="https://dummyimage.com/150x150/4a90e2/fff&text=DR" 
                  alt="D-ReX" 
                  fill 
                  className="object-cover" 
                />
              </div>
              <h4 className="font-bold text-lg">D-ReX</h4>
              <p className="text-sm text-foreground/60">Backend Developer</p>
              <p className="text-xs text-foreground/50 mt-2">Handling databases, APIs & auth</p>
            </div>

            {/* Team Member 3 - Neba (REAL IMAGE) */}
            <div className="p-6 rounded-2xl border border-border bg-card text-center shadow-sm">
              <div className="relative w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden">
                <Image 
                  src="/images/neba.jpg"  // ✅ Uses your real image!
                  alt="Neba" 
                  fill 
                  className="object-cover" 
                />
              </div>
              <h4 className="font-bold text-lg">Neba Telrah</h4>
              <p className="text-sm text-foreground/60">Product Designer</p>
              <p className="text-xs text-foreground/50 mt-2">Designed the user experience & flows</p>
            </div>

            {/* Team Member 4 - Nde (DUMMY) */}
            <div className="p-6 rounded-2xl border border-border bg-card text-center shadow-sm">
              <div className="relative w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden">
                <Image 
                  src="https://dummyimage.com/150x150/e67e22/fff&text=NN" 
                  alt="Nde" 
                  fill 
                  className="object-cover" 
                />
              </div>
              <h4 className="font-bold text-lg">Nde Ndoh</h4>
              <p className="text-sm text-foreground/60">QA & Support</p>
              <p className="text-xs text-foreground/50 mt-2">Testing bugs, ensuring smooth UX</p>
            </div>
          </div>
        </div>

        {/* ================= CALL TO ACTION ================= */}
        <div data-aos="fade-up" className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-orange-500 p-10 md:p-14 text-center text-white shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to experience the taste?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Order from your favorite restaurants today and get delicious food delivered straight to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/restaurants" className="bg-white text-primary font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition shadow-lg">
              Browse Menu
            </Link>
            <Link href="/become-vendor" className="border border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-primary transition">
              Partner with Us
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}