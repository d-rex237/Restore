"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { FaSearch, FaArrowRight } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
// ✅ 1. Import AOS here
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

  // ✅ 2. Initialize AOS here
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
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="relative w-full min-h-[600px] lg:min-h-[700px] overflow-hidden bg-gray-950">
      
      {/* ✅ BACKGROUND VIDEO */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-burger.mp4" type="video/mp4" />
          <img src="/images/hero-food.png" alt="Food" className="w-full h-full object-cover" />
        </video>
      </div>

      {/* ✅ THEME-BASED OVERLAY */}
      <div className={`absolute inset-0 transition-colors duration-300 ${
        isDark ? "bg-black/60" : "bg-white/70"
      }`}></div>

      {/* FADE OUT BOTTOM */}
      <div className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10`}></div>

      {/* ✅ CONTENT */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 lg:px-10 h-full flex items-center justify-center">
        <div className="text-center w-full max-w-4xl">
          
          {/* Top Badge */}
          <div data-aos="fade-down" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full text-xs font-medium mb-5 tracking-wide text-white">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
            <span>1,200+ Orders Today</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 text-white drop-shadow-md tracking-tight">
            Delicious Food <br />
            <span className="text-primary">Delivered</span> To Your Doorstep
          </h1>

          {/* Subtext */}
          <p className={`text-base md:text-lg max-w-2xl mx-auto mb-8 font-light leading-relaxed ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}>
            Discover your favorite restaurants, order meals in seconds,
            and enjoy fast delivery anywhere in your city.
          </p>

          {/* ✅ MODERN SEARCH BAR - Added autoFocus for better UX */}
          <div className={`max-w-md mx-auto flex items-center rounded-full border shadow-lg overflow-hidden transition-all duration-300 hover:shadow-primary/20 ${
            isDark ? "bg-white/10 border-white/20" : "bg-white border-gray-200"
          }`}>
            <input
              type="text"
              placeholder="Search restaurants or meals..."
              className={`flex-1 px-5 py-3 bg-transparent outline-none text-sm ${
                isDark ? "text-white placeholder-gray-400" : "text-gray-900 placeholder-gray-500"
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus // ✅ Puts cursor in the search bar automatically if page loads
            />
            <button 
              onClick={handleSearch}
              className="bg-primary px-5 py-3 text-white hover:bg-primary-hover transition flex items-center justify-center"
            >
              <FaSearch className="w-4 h-4" />
            </button>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              href="/restaurants"
              className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary-hover transition flex items-center gap-2 shadow-lg shadow-primary/30"
            >
              Order Now
              <FaArrowRight className="w-3 h-3" />
            </Link>

            <Link
              href="/about"
              className={`px-6 py-3 rounded-full font-medium transition border ${
                isDark ? "border-white/30 text-white hover:bg-white hover:text-gray-900" : "border-primary text-primary hover:bg-primary hover:text-white"
              }`}
            >
              Learn More
            </Link>
          </div>

          {/* Statistics */}
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">500+</div>
              <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Restaurants</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">20k+</div>
              <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Customers</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4.9★</div>
              <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Ratings</p>
            </div>
          </div>

        </div>
      </div> 
    </section>
  );
}