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
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="relative w-full min-h-[650px] lg:min-h-[750px] overflow-hidden">
      
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-burger.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        isDark 
          ? "bg-gradient-to-b from-black/70 via-black/40 to-black/70" 
          : "bg-gradient-to-b from-white/70 via-white/40 to-white/70"
      }`}></div>

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 lg:px-10 h-full flex items-center justify-center">
        <div className="text-center w-full max-w-4xl">
          
          {/* Badge */}
          <div data-aos="fade-down" className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/30 px-5 py-2 rounded-full text-xs font-semibold mb-6 tracking-wide text-white shadow-lg">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>Trusted by 20k+ Customers</span>
          </div>

          {/* Headline */}
          <h1 data-aos="fade-up" className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-white drop-shadow-lg tracking-tight">
            Fresh Food, <span className="text-primary">Fast Delivery</span>
          </h1>

          {/* Subtext */}
          <p data-aos="fade-up" data-aos-delay="100" className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed ${
            isDark ? "text-gray-300" : "text-gray-800"
          }`}>
            Discover your favorite restaurants, order meals in seconds, and enjoy a premium dining experience at home.
          </p>

          {/* Search Bar */}
          <div data-aos="fade-up" data-aos-delay="200" className={`max-w-lg mx-auto flex items-center rounded-full border shadow-xl overflow-hidden transition-all duration-300 hover:shadow-primary/40 ${
            isDark ? "bg-white/10 border-white/20" : "bg-white border-gray-200"
          }`}>
            <input
              type="text"
              placeholder="Search restaurants or meals..."
              className={`flex-1 px-6 py-4 bg-transparent outline-none text-base ${
                isDark ? "text-white placeholder-gray-400" : "text-gray-900 placeholder-gray-500"
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button 
              onClick={handleSearch}
              className="bg-gradient-to-r from-primary to-orange-500 px-6 py-4 text-white hover:opacity-90 transition flex items-center justify-center"
            >
              <FaSearch className="w-5 h-5" />
            </button>
          </div>

          {/* CTA Buttons */}
          <div data-aos="fade-up" data-aos-delay="300" className="mt-12 flex flex-wrap gap-6 justify-center">
            <Link
              href="/restaurants"
              className="bg-gradient-to-r from-primary to-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition flex items-center gap-2 shadow-lg shadow-primary/40"
            >
              Order Now
              <FaArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/about"
              className={`px-8 py-4 rounded-full font-semibold transition border ${
                isDark ? "border-white/40 text-white hover:bg-white hover:text-gray-900" : "border-primary text-primary hover:bg-primary hover:text-white"
              }`}
            >
              Learn More
            </Link>
          </div>

          {/* Animated Stats */}
          <div data-aos="fade-up" data-aos-delay="400" className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-extrabold text-primary">500+</div>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Restaurants</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-primary">20k+</div>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-primary">4.9★</div>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Average Rating</p>
            </div>
          </div>

        </div>   
      </div> 
    </section>
  );
}
