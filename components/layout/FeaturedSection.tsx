"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  FaHeart, 
  FaShoppingCart, 
  FaStar, 
  FaFire, 
  FaRegHeart,
  FaUtensils,          
  FaGlassMartiniAlt,   
  FaCookieBite
} from "react-icons/fa";
import { GiNoodles } from "react-icons/gi";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// ✅ CATEGORY ICONS
const categories = [
  { name: "Starters", icon: <GiNoodles className="w-10 h-10 text-orange-500" /> },
  { name: "Main Course", icon: <FaUtensils className="w-10 h-10 text-orange-500" /> },
  { name: "Desserts", icon: <FaCookieBite className="w-10 h-10 text-orange-500" /> },
  { name: "Drinks", icon: <FaGlassMartiniAlt className="w-10 h-10 text-orange-500" /> },
];

// ✅ POPULAR DISHES DATA - Using guaranteed dummyimage.com
const dishes = [
  { 
    id: 1, 
    name: "Corn Fufu & Katikati", 
    price: 3500, 
    rating: 5, 
    image: "https://dummyimage.com/600x400/ff9800/fff&text=Corn+Fufu+%26+Katikati",
    description: "Smooth corn fufu served with rich, savory katikati vegetable stew."
  },
  { 
    id: 2, 
    name: "Poulet DG", 
    price: 4500, 
    rating: 5, 
    image: "https://dummyimage.com/600x400/d32f2f/fff&text=Poulet+DG",
    description: "Spicy chicken stew with plantains and vegetables."
  },
  { 
    id: 3, 
    name: "Eru", 
    price: 3000, 
    rating: 5, 
    image: "https://dummyimage.com/600x400/4caf50/fff&text=Eru+Soup",
    description: "Water leaf and eru vegetable soup with smoked fish."
  },
  { 
    id: 4, 
    name: "Kondré", 
    price: 2000, 
    rating: 5, 
    image: "https://dummyimage.com/600x400/795548/fff&text=Kondr%C3%A9",
    description: "Traditional fried plantains with spicy pepper sauce."
  },
];

// ✅ CHEF'S SPECIAL DATA - Using guaranteed dummyimage.com
const chefSpecials = [
  { 
    id: 7, 
    name: "Achu Soup", 
    price: 4000, 
    rating: 5, 
    image: "https://dummyimage.com/600x400/ffeb3b/000&text=Achu+Soup", 
    desc: "Cocoyam fufu served with traditional yellow achu soup and assorted meats."
  },
  { 
    id: 8, 
    name: "Pepper Soup", 
    price: 2500, 
    rating: 5, 
    image: "https://dummyimage.com/600x400/b71c1c/fff&text=Pepper+Soup", 
    desc: "Spicy traditional broth featuring goat meat, crayfish, and local spices."
  },
];

export default function FeaturedSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

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

  const formatFCFA = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <section className="py-10 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* ================= HERO BANNER ================= */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-20 flex-shrink-0">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/your-background-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-4">
            <div data-aos="fade-down" className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>1,200+ Orders Today</span>
            </div>
            <h1 data-aos="fade-up" className="text-4xl md:text-6xl font-bold leading-tight mb-6 max-w-3xl drop-shadow-md">
              Experience Taste <br /> Like Never Before
            </h1>
            <p data-aos="fade-up" data-aos-delay="100" className="text-lg md:text-xl text-white/80 max-w-2xl mb-8 font-light">
              Discover the authentic flavors of Cameroon with fresh ingredients, 
              fast delivery, and a dining experience you'll never forget.
            </p>
            <div data-aos="fade-up" data-aos-delay="200" className="flex flex-col sm:flex-row gap-4">
              <Link href="/menu" className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition shadow-lg">
                View Menu
              </Link>
              <Link href="/menu" className="bg-[#D32F2F] text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition shadow-lg">
                Order Online
              </Link>
            </div>
          </div>
        </div>

        {/* ================= BROWSE CATEGORIES ================= */}
        <div data-aos="fade-up" className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground">
            Browse Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {categories.map((cat, index) => (
              <div key={index} className="group flex flex-col items-center justify-center cursor-pointer transition-transform hover:-translate-y-2">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-lg transition-all duration-300 ${
                  isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
                }`}>
                  {cat.icon}
                </div>
                <span className="font-semibold text-foreground text-sm">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= POPULAR DISHES ================= */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground">
            Popular Dishes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {dishes.map((dish, index) => (
              <div 
                key={dish.id} 
                data-aos="fade-up" 
                data-aos-delay={index * 100}
                className={`rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border ${
                  isDark ? "bg-surface border-border" : "bg-white border-gray-100"
                }`}
              >
                <div className="relative h-44 w-full bg-gray-200">
                  <Image src={dish.image} alt={dish.name} fill className="object-cover" />
                  <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-red-500 hover:text-white transition text-gray-600 shadow-sm">
                    <FaRegHeart className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-lg text-foreground">{dish.name}</h3>
                  </div>
                  <div className="flex text-yellow-500 text-sm mb-3">
                    {[...Array(5)].map((_, i) => (<FaStar key={i} className="w-3.5 h-3.5" />))}
                  </div>
                  <p className="text-xs text-foreground/60 mb-3 line-clamp-1">{dish.description}</p>
                  <div className="flex justify-between items-center mt-2 pt-3 border-t border-border/30">
                    <div className="flex items-center gap-3 text-foreground/50 text-xs">
                      <div className="flex items-center gap-1 hover:text-orange-500 transition cursor-pointer">
                        <FaFire className="w-3.5 h-3.5" /><span>Heat</span>
                      </div>
                      <div className="flex items-center gap-1 hover:text-red-400 transition cursor-pointer">
                        <FaRegHeart className="w-3.5 h-3.5" /><span>Fav</span>
                      </div>
                      <div className="flex items-center gap-1 hover:text-primary transition cursor-pointer">
                        <FaShoppingCart className="w-3.5 h-3.5" /><span>Cart</span>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-primary">
                      {formatFCFA(dish.price)} FCFA
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SPECIAL OFFERS BANNER ================= */}
        <div data-aos="fade-up" className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
          <div className="lg:col-span-4 relative rounded-3xl overflow-hidden min-h-[180px] flex items-center shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500"></div>
            <div className="relative z-10 p-8 md:px-12 text-white w-full flex items-center justify-between">
              <div className="flex-1">
                <span className="text-sm font-bold uppercase tracking-wider text-white/80 mb-1 block">Special Offers</span>
                <h3 className="text-3xl font-bold mb-1">Enjoy 20% OFF</h3>
                <p className="text-white/90 font-medium">Your first order!</p>
              </div>
              <div className="hidden md:flex items-center justify-center">
                 <div className="text-6xl drop-shadow-xl">🍛 🥘</div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CHEF'S SPECIAL ================= */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground">
            Chef's Special
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {chefSpecials.map((dish, index) => (
              <div 
                key={dish.id} 
                data-aos="fade-up" 
                data-aos-delay={index * 150}
                className={`flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-lg border ${
                  isDark ? "bg-surface border-border" : "bg-white border-gray-100"
                }`}
              >
                <div className="relative w-full md:w-2/5 h-48 md:h-auto bg-gray-200">
                  <Image src={dish.image} alt={dish.name} fill className="object-cover" />
                </div>
                <div className="p-6 w-full md:w-3/5 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-xl text-foreground">{dish.name}</h3>
                  </div>
                  <div className="flex text-yellow-500 text-sm mb-2">
                    {[...Array(5)].map((_, i) => (<FaStar key={i} className="w-3.5 h-3.5" />))}
                  </div>
                  <p className="text-sm text-foreground/60 mb-4 line-clamp-2">{dish.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary">
                      {formatFCFA(dish.price)} FCFA
                    </span>
                    <Link href="/menu" className="bg-[#D32F2F] text-white text-sm font-semibold py-2 px-5 rounded-full hover:bg-red-700 transition shadow-sm">
                      Order Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= TESTIMONIALS SECTION ================= */}
        <div data-aos="fade-up" className="mt-20 mb-10">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground">
            What Our Customers Say
          </h2>
          <p className="text-center text-foreground/60 mb-12 max-w-2xl mx-auto">
            Real reviews from real people who love eating with Restor.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div data-aos="fade-up" data-aos-delay="100" className={`p-6 rounded-2xl border border-border shadow-sm ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}>
              <div className="flex text-yellow-500 text-sm mb-4">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p className="text-foreground/80 italic mb-6">
                "The Achu was absolutely incredible! The delivery was super fast, and the food was still hot when it arrived. I will definitely order again!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  FM
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Fru Martin</h4>
                  <p className="text-xs text-foreground/50">Bamenda, Cameroon</p>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="200" className={`p-6 rounded-2xl border border-border shadow-sm ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}>
              <div className="flex text-yellow-500 text-sm mb-4">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p className="text-foreground/80 italic mb-6">
                "I love how easy the app is to use. I found my favorite Ndolé restaurant in seconds. Restor has made my lunch breaks so much better!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  AC
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Asoh Christain</h4>
                  <p className="text-xs text-foreground/50">Bamenda, Cameroon</p>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="300" className={`p-6 rounded-2xl border border-border shadow-sm ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}>
              <div className="flex text-yellow-500 text-sm mb-4">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p className="text-foreground/80 italic mb-6">
                "My family loves ordering from Restor! The kids love the desserts, and I love how affordable the prices are. Highly recommend!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  LJ
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Lum Joyceline</h4>
                  <p className="text-xs text-foreground/50">Bamenda, Cameroon</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}