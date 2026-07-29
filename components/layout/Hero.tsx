"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ Used for navigation
import { FaSearch, FaArrowRight } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Hero() {
  const { theme } = useTheme();
  const router = useRouter(); // ✅ Hook to change pages
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ To capture user input

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  // ✅ Function to handle the search
  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // ✅ Handle pressing "Enter" on keyboard
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="relative w-full min-h-[700px] lg:h-screen overflow-hidden bg-gray-950">
      
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
        isDark ? "bg-black/70" : "bg-white/60"
      }`}></div>

      {/* FADE OUT BOTTOM */}
      <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10`}></div>

      {/* ✅ CONTENT */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          
          {/* LEFT SIDE - TEXT */}
          <div className={`${isDark ? "text-white" : "text-gray-900"}`}>
            <span className={`inline-block ${
              isDark ? "bg-orange-500/20 text-orange-400 border-orange-500/30" : "bg-orange-100 text-orange-600 border-orange-200"
            } px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm border`}>
              🍔 Fast Food Delivery
            </span>

            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
              Delicious Food
              <span className="text-primary"> Delivered</span>
              <br />
              To Your Doorstep
            </h1>

            <p className={`mt-8 text-lg ${isDark ? "text-gray-300" : "text-gray-600"} leading-8 max-w-xl`}>
              Discover your favorite restaurants, order meals in seconds,
              and enjoy fast delivery anywhere in your city.
            </p>

            {/* ✅ PROFESSIONAL SEARCH BAR (Now fully functional) */}
            <div className={`mt-10 flex ${
              isDark ? "bg-white/10 border-white/20" : "bg-white border-gray-200"
            } backdrop-blur-md rounded-xl border shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-primary/20`}>
              <input
                type="text"
                placeholder="Search restaurants or meals..."
                className={`flex-1 px-6 py-5 bg-transparent outline-none text-lg ${
                  isDark ? "text-white placeholder-gray-400" : "text-gray-900 placeholder-gray-500"
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown} // ✅ Press Enter to search!
              />
              <button 
                onClick={handleSearch} // ✅ Click the button to search!
                className="bg-primary px-8 text-primary-foreground hover:bg-primary-hover transition flex items-center justify-center"
              >
                <FaSearch className="w-5 h-5" />
              </button>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-5">
              <Link
                href="/restaurants"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary-hover transition flex items-center gap-3 shadow-lg shadow-primary/30"
              >
                Order Now
                <FaArrowRight />
              </Link>

              <Link
                href="/about"
                className={`border ${
                  isDark ? "border-white/30 text-white hover:bg-white hover:text-gray-900" : "border-primary text-primary hover:bg-primary hover:text-white"
                } px-8 py-4 rounded-xl font-semibold transition`}
              >
                Learn More
              </Link>
            </div>

            {/* Statistics */}
            <div className="mt-16 grid grid-cols-3 gap-6">
              <div>
                <h2 className="text-4xl font-bold text-primary">500+</h2>
                <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>Restaurants</p>
              </div>
              <div>
                <h2 className="text-4xl font-bold text-primary">20k+</h2>
                <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>Customers</p>
              </div>
              <div>
                <h2 className="text-4xl font-bold text-primary">4.9★</h2>
                <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>Ratings</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Empty */}
          <div className="hidden lg:block"></div>

        </div>
      </div>
    </section>
  );
}