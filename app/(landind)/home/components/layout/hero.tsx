"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { FaSearch, FaArrowRight } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Hero() {
  const { theme } = useTheme();
  const router = useRouter(); 
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/menu?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="relative w-full min-h-[550px] lg:min-h-[650px] overflow-hidden bg-background">
      
      {/* ================= BACKGROUND VIDEO ================= */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105"
        >
          <source src="/videos/hero-burger.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ================= DECORATIVE BLUR SHAPES ================= */}
      <div className="absolute top-16 left-10 w-56 h-56 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-16 right-10 w-72 h-72 bg-orange-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>

      {/* ================= GRADIENT OVERLAY ================= */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        isDark 
          ? "bg-gradient-to-b from-black/80 via-black/60 to-black/70" 
          : "bg-gradient-to-b from-white/80 via-white/50 to-white/70"
      }`}></div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 lg:px-10 h-full flex items-center justify-center">
        <div className="text-center w-full max-w-4xl">
          
          {/* Badge */}
          <div data-aos="fade-down" className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-xl border border-primary/30 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 tracking-wide text-foreground shadow-lg">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
            <span>20k+ Happy Customers</span>
            <span className="w-px h-3 bg-border mx-1"></span>
            <span className="text-yellow-400">★ 4.9 Rating</span>
          </div>

          {/* Headline */}
          <h1 data-aos="fade-up" className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-foreground drop-shadow-xl tracking-tight">
            Fresh Food, <br className="md:hidden" />
            <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
              Fast Delivery
            </span>
          </h1>

          {/* Subtext */}
          <p data-aos="fade-up" data-aos-delay="100" className={`text-base md:text-lg max-w-2xl mx-auto mb-8 font-light leading-relaxed ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}>
            Discover your favorite restaurants, order meals in seconds, and enjoy a premium dining experience at home.
          </p>

          {/* Search Bar */}
          <div data-aos="fade-up" data-aos-delay="200" className={`max-w-md mx-auto flex items-center rounded-full border-2 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-primary/40 ${
            isDark ? "bg-white/10 border-white/20" : "bg-white border-gray-200"
          }`}>
            <input
              id="hero-search-input"
              type="text"
              placeholder="Search restaurants or meals..."
              className={`flex-1 px-5 py-3 bg-transparent outline-none text-sm ${
                isDark ? "text-white placeholder-gray-400" : "text-gray-900 placeholder-gray-500"
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button 
              onClick={handleSearch}
              className="bg-gradient-to-r from-primary to-orange-500 px-5 py-3 text-white hover:opacity-90 transition flex items-center justify-center shadow-inner"
            >
              <FaSearch className="w-4 h-4" />
            </button>
          </div>

          {/* CTA Buttons */}
          <div data-aos="fade-up" data-aos-delay="300" className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              href="/menu"
              className="bg-gradient-to-r from-primary to-orange-500 text-white px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition flex items-center gap-2 shadow-lg shadow-primary/40 hover:shadow-primary/60"
            >
              Order Now
              <FaArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/about"
              className={`px-6 py-3 rounded-full text-sm font-semibold transition border-2 ${
                isDark ? "border-white/40 text-white hover:bg-white hover:text-gray-900" : "border-primary text-primary hover:bg-primary hover:text-white"
              }`}
            >
              Learn More
            </Link>
          </div>

          {/* Animated Stats */}
          <div data-aos="fade-up" data-aos-delay="400" className="mt-14 grid grid-cols-3 gap-6 max-w-xl mx-auto">
            <div className="text-center group">
              <div className="text-2xl font-extrabold text-primary group-hover:scale-110 transition-transform duration-300">500+</div>
              <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Restaurants</p>
            </div>
            <div className="text-center group">
              <div className="text-2xl font-extrabold text-primary group-hover:scale-110 transition-transform duration-300">20k+</div>
              <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Happy Customers</p>
            </div>
            <div className="text-center group">
              <div className="text-2xl font-extrabold text-primary group-hover:scale-110 transition-transform duration-300">4.9★</div>
              <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Average Rating</p>
            </div>
          </div>

        </div>   
      </div> 
    </section>
  );
}