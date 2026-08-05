"use client";

import Link from "next/link";
import Image from "next/image";
import { FaTruck, FaClock, FaHeart, FaUsers, FaStore, FaShieldAlt, FaStar } from "react-icons/fa";
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
        
        {/* ================= HERO HEADER ================= */}
        <div data-aos="fade-down" className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-4">
            🇨🇲 About Restore
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3 tracking-tight">
            Built for <span className="text-primary">Cameroon</span>
          </h1>
          <p className="text-base text-foreground/70 max-w-2xl mx-auto">
            We're on a mission to connect hungry customers with the best local restaurants 
            through technology, speed, and a lot of heart.
          </p>
        </div>

        {/* ================= MISSION & IMAGE ================= */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
          <div data-aos="fade-right" className="order-2 md:order-1">
            <h2 className="text-2xl font-bold text-foreground mb-3">Our Mission</h2>
            <p className="text-foreground/70 text-sm leading-relaxed mb-3">
              Restor was born to bridge the gap between local restaurants and hungry customers. 
              We believe that <strong>great food should be just a tap away</strong>.
            </p>
            <p className="text-foreground/70 text-sm leading-relaxed mb-4">
              From Bamenda to Douala, we partner with the best local vendors to bring authentic 
              Cameroonian flavors directly to your doorstep.
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-full">
                <FaHeart className="text-primary text-xs" /> <span className="text-[10px]">Local First</span>
              </div>
              <div className="flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-full">
                <FaTruck className="text-primary text-xs" /> <span className="text-[10px]">On-Time Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-full">
                <FaShieldAlt className="text-primary text-xs" /> <span className="text-[10px]">Trusted by 20k+</span>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" className="order-1 md:order-2 relative h-56 md:h-72 rounded-2xl overflow-hidden shadow-md border border-border/30 bg-gradient-to-br from-primary/10 to-orange-500/10">
            {/* Placeholder for a Chef/Kitchen image */}
            <div className="absolute inset-0 flex items-center justify-center text-7xl text-foreground/20">
              🍛
            </div>
            <p className="absolute bottom-4 left-0 right-0 text-center text-foreground/40 text-[10px] font-medium px-4">
              Restore HQ — Bamenda, Cameroon
            </p>
          </div>
        </div>

        {/* ================= CORE VALUES ================= */}
        <div data-aos="fade-up" className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-3 text-foreground">Why Restore</h2>
          <p className="text-center text-foreground/60 text-sm mb-8 max-w-2xl mx-auto">
            Three pillars that define everything we do.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-border/30 bg-card/50 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-full flex items-center justify-center text-primary text-xl mb-3">
                <FaTruck />
              </div>
              <h3 className="text-base font-semibold mb-1">Speed</h3>
              <p className="text-sm text-foreground/60">We get your food to you while it's still hot, fresh, and full of flavor.</p>
            </div>

            <div className="p-6 rounded-2xl border border-border/30 bg-card/50 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-full flex items-center justify-center text-primary text-xl mb-3">
                <FaStore />
              </div>
              <h3 className="text-base font-semibold mb-1">Partnership</h3>
              <p className="text-sm text-foreground/60">We work closely with local vendors to ensure every dish is authentic and delicious.</p>
            </div>

            <div className="p-6 rounded-2xl border border-border/30 bg-card/50 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-full flex items-center justify-center text-primary text-xl mb-3">
                <FaHeart />
              </div>
              <h3 className="text-base font-semibold mb-1">Community</h3>
              <p className="text-sm text-foreground/60">We're built in Cameroon, for Cameroon. Every order supports a local business.</p>
            </div>
          </div>
        </div>

        {/* ================= MEET THE TEAM ================= */}
        <div data-aos="fade-up" className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-3 text-foreground">The Team Behind Restore</h2>
          <p className="text-center text-foreground/60 text-sm mb-8 max-w-2xl mx-auto">
            Passionate developers and designers building the future of food delivery in Cameroon.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Team Member 1 - Brandon */}
            <div className="p-4 rounded-2xl border border-border/30 bg-card/50 shadow-sm hover:shadow-md transition-all duration-300 text-center">
              <div className="relative w-16 h-16 rounded-full mx-auto mb-2 overflow-hidden">
                <Image src="/images/brandon.jpeg" alt="Brandon" fill className="object-cover" />
              </div>
              <h4 className="text-sm font-bold text-foreground">Brandon Mane</h4>
              <p className="text-xs text-foreground/60">Frontend & UI</p>
              <p className="text-[10px] text-foreground/50 mt-1">Next.js, Tailwind CSS, AOS</p>
            </div>

            {/* Team Member 2 - D-ReX */}
            <div className="p-4 rounded-2xl border border-border/30 bg-card/50 shadow-sm hover:shadow-md transition-all duration-300 text-center">
              <div className="relative w-16 h-16 rounded-full mx-auto mb-2 overflow-hidden">
                <Image src="/images/drex.jpg" alt="D-ReX" fill className="object-cover" />
              </div>
              <h4 className="text-sm font-bold text-foreground">D-ReX</h4>
              <p className="text-xs text-foreground/60">Backend & Admin</p>
              <p className="text-[10px] text-foreground/50 mt-1">PostgreSQL, Prisma, Clerk</p>
            </div>

            {/* Team Member 3 - Neba */}
            <div className="p-4 rounded-2xl border border-border/30 bg-card/50 shadow-sm hover:shadow-md transition-all duration-300 text-center">
              <div className="relative w-16 h-16 rounded-full mx-auto mb-2 overflow-hidden">
                <Image src="/images/neba.jpg" alt="Neba" fill className="object-cover" />
              </div>
              <h4 className="text-sm font-bold text-foreground">Neba Telrah</h4>
              <p className="text-xs text-foreground/60">Vendor & Driver Backend</p>
              <p className="text-[10px] text-foreground/50 mt-1">APIs, Onboarding, State Machines</p>
            </div>

            {/* Team Member 4 - Nde */}
            <div className="p-4 rounded-2xl border border-border/30 bg-card/50 shadow-sm hover:shadow-md transition-all duration-300 text-center">
              <div className="relative w-16 h-16 rounded-full mx-auto mb-2 overflow-hidden">
                <Image src="/images/ndo.jpg" alt="Nde" fill className="object-cover" />
              </div>
              <h4 className="text-sm font-bold text-foreground">Nde Ndoh</h4>
              <p className="text-xs text-foreground/60">QA & Support</p>
              <p className="text-[10px] text-foreground/50 mt-1">Testing, Bug Tracking, UX Polish</p>
            </div>
          </div>
        </div>

        {/* ================= STATS / TRUST SECTION ================= */}
        <div data-aos="fade-up" className="mb-16">
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
            <div className="p-4 rounded-2xl border border-border/30 bg-card/50">
              <div className="text-2xl font-bold text-primary">500+</div>
              <p className="text-[10px] text-foreground/60">Restaurants</p>
            </div>
            <div className="p-4 rounded-2xl border border-border/30 bg-card/50">
              <div className="text-2xl font-bold text-primary">20k+</div>
              <p className="text-[10px] text-foreground/60">Orders Delivered</p>
            </div>
            <div className="p-4 rounded-2xl border border-border/30 bg-card/50">
              <div className="text-2xl font-bold text-primary">4.9</div>
              <p className="text-[10px] text-foreground/60">Avg. Rating</p>
            </div>
          </div>
        </div>

        {/* ================= CALL TO ACTION ================= */}
        <div data-aos="fade-up" className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-orange-500 p-8 md:p-10 text-center text-white shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to taste Cameroon?</h2>
          <p className="text-white/80 text-sm mb-5 max-w-xl mx-auto">
            Order from your favorite restaurants today and get delicious food delivered straight to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/menu" className="bg-white text-primary text-sm font-bold py-2.5 px-6 rounded-full hover:bg-gray-100 transition shadow-md">
              Browse Menu
            </Link>
            <Link href="/contact" className="border border-white text-white text-sm font-bold py-2.5 px-6 rounded-full hover:bg-white hover:text-primary transition">
              Talk to Us
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}