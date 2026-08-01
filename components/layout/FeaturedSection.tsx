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
  FaCookieBite,
  FaArrowRight
} from "react-icons/fa";
import { GiNoodles } from "react-icons/gi";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// ✅ CATEGORY ICONS
const categories = [
  { name: "Starters", icon: <GiNoodles className="w-8 h-8 text-orange-500" /> },
  { name: "Main Course", icon: <FaUtensils className="w-8 h-8 text-orange-500" /> },
  { name: "Desserts", icon: <FaCookieBite className="w-8 h-8 text-orange-500" /> },
  { name: "Drinks", icon: <FaGlassMartiniAlt className="w-8 h-8 text-orange-500" /> },
];

// ✅ POPULAR DISHES DATA - Using dummyimage for clean look
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

// ✅ CHEF'S SPECIAL DATA
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
        <div className="relative w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden mb-20 flex-shrink-0 shadow-xl border border-border">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
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
            
            {/* Small Tag Badge */}
            <div data-aos="fade-down" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full text-xs font-medium mb-4 tracking-wide">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              <span>1,200+ Orders Today</span>
            </div>

            {/* Main Headline - Reduced size */}
            <h1 data-aos="fade-up" className="text-3xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl drop-shadow-md tracking-tight">
              Experience Taste <br /> Like Never Before
            </h1>

            {/* Subtext */}
            <p data-aos="fade-up" data-aos-delay="100" className="text-base md:text-lg text-white/90 max-w-2xl mb-8 font-light leading-relaxed">
              Discover the authentic flavors of Cameroon with fresh ingredients, 
              fast delivery, and a dining experience you'll never forget.
            </p>

            {/* Buttons with icons */}
            <div data-aos="fade-up" data-aos-delay="200" className="flex flex-col sm:flex-row gap-4">
              <Link href="/restaurants" className="flex items-center gap-2 bg-white text-gray-900 font-semibold py-2.5 px-6 rounded-full hover:bg-gray-100 transition shadow-lg text-sm">
                View Menu <FaArrowRight className="w-3 h-3" />
              </Link>
              <Link href="/restaurants" className="flex items-center gap-2 bg-primary text-white font-semibold py-2.5 px-6 rounded-full hover:bg-primary-hover transition shadow-lg text-sm">
                Order Online <FaArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* ================= BROWSE CATEGORIES ================= */}
        <div data-aos="fade-up" className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Browse Categories</h2>
            <p className="text-sm text-foreground/60">Pick your favorite type of meal</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {categories.map((cat, index) => (
              <div 
                key={index} 
                className="group flex flex-col items-center justify-center p-4 rounded-2xl border border-border bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-sm transition-transform group-hover:scale-110 bg-muted/30">
                  {cat.icon}
                </div>
                <span className="font-medium text-sm text-foreground">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= POPULAR DISHES ================= */}
        <div className="mb-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Popular Dishes</h2>
              <p className="text-sm text-foreground/60">What our customers love most</p>
            </div>
            <Link href="/restaurants" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
              View All <FaArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dishes.map((dish, index) => (
              <div 
                key={dish.id} 
                data-aos="fade-up" 
                data-aos-delay={index * 100}
                className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-40 w-full bg-muted">
                  <Image src={dish.image} alt={dish.name} fill className="object-cover" />
                  <button className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm p-2 rounded-full hover:bg-red-500 hover:text-white transition text-gray-300">
                    <FaRegHeart className="w-3.5 h-3.5" />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full text-white text-[10px] font-medium">
                    ★ {dish.rating}.0
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-base text-foreground">{dish.name}</h3>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2 pt-3 border-t border-border/30">
                    <p className="text-xs text-foreground/60 line-clamp-1 pr-2">{dish.description}</p>
                    <span className="text-base font-bold text-primary whitespace-nowrap">
                      {formatFCFA(dish.price)} FCFA
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3 text-foreground/50 text-[10px]">
                      <div className="flex items-center gap-1 hover:text-orange-500 transition cursor-pointer">
                        <FaFire className="w-3 h-3" /><span>Heat</span>
                      </div>
                      <div className="flex items-center gap-1 hover:text-red-400 transition cursor-pointer">
                        <FaRegHeart className="w-3 h-3" /><span>Fav</span>
                      </div>
                    </div>
                    <Link href="/restaurants" className="bg-primary/10 text-primary hover:bg-primary hover:text-white transition px-3 py-1.5 rounded-full text-xs font-medium">
                      Order
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SPECIAL OFFERS BANNER ================= */}
        <div data-aos="fade-up" className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-16">
          <div className="lg:col-span-4 relative rounded-3xl overflow-hidden min-h-[160px] flex items-center shadow-lg border border-border/50">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500"></div>
            <div className="relative z-10 p-6 md:p-8 text-white w-full flex flex-col md:flex-row justify-between items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-white/80 mb-1 block">Special Offers</span>
                <h3 className="text-2xl font-bold mb-1">Enjoy 20% OFF</h3>
                <p className="text-white/90 text-sm font-light">Your first order! Use code <span className="font-bold">FLAVOR20</span></p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-4">
                 <div className="text-5xl drop-shadow-xl">🍛</div>
                 <Link href="/restaurants" className="bg-white text-primary font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition text-sm shadow-md">
                  Order Now
                 </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CHEF'S SPECIAL ================= */}
        <div className="mb-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Chef's Special</h2>
              <p className="text-sm text-foreground/60">Handpicked by our top chefs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {chefSpecials.map((dish, index) => (
              <div 
                key={dish.id} 
                data-aos="fade-up" 
                data-aos-delay={index * 150}
                className="group flex flex-col md:flex-row rounded-2xl overflow-hidden border border-border bg-card hover:shadow-lg transition-all duration-300"
              >
                <div className="relative w-full md:w-2/5 h-44 md:h-auto bg-muted">
                  <Image src={dish.image} alt={dish.name} fill className="object-cover" />
                  <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Chef's Pick
                  </div>
                </div>
                <div className="p-5 w-full md:w-3/5 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-lg text-foreground">{dish.name}</h3>
                    <span className="text-lg font-bold text-primary">
                      {formatFCFA(dish.price)} FCFA
                    </span>
                  </div>
                  <div className="flex text-yellow-500 text-[10px] mb-2">
                    {[...Array(5)].map((_, i) => (<FaStar key={i} className="w-3 h-3" />))}
                  </div>
                  <p className="text-sm text-foreground/60 mb-3 line-clamp-2">{dish.desc}</p>
                  <Link href="/restaurants" className="bg-primary text-white text-sm font-semibold py-1.5 px-4 rounded-full hover:bg-primary-hover transition w-fit shadow-sm">
                    Order Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= TESTIMONIALS SECTION ================= */}
        <div data-aos="fade-up" className="mb-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">What Our Customers Say</h2>
            <p className="text-sm text-foreground/60">Real reviews from real people who love eating with Restor</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div data-aos="fade-up" data-aos-delay="100" className="p-5 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition">
              <div className="flex text-yellow-500 text-xs mb-3">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p className="text-foreground/80 text-sm italic mb-4 line-clamp-4">
                "The Achu was absolutely incredible! The delivery was super fast, and the food was still hot when it arrived. I will definitely order again!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">FM</div>
                <div>
                  <h4 className="font-semibold text-sm">Fru Martin</h4>
                  <p className="text-[10px] text-foreground/50">Bamenda, Cameroon</p>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="200" className="p-5 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition">
              <div className="flex text-yellow-500 text-xs mb-3">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p className="text-foreground/80 text-sm italic mb-4 line-clamp-4">
                "I love how easy the app is to use. I found my favorite Ndolé restaurant in seconds. Restor has made my lunch breaks so much better!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">AC</div>
                <div>
                  <h4 className="font-semibold text-sm">Asoh Christain</h4>
                  <p className="text-[10px] text-foreground/50">Bamenda, Cameroon</p>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="300" className="p-5 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition">
              <div className="flex text-yellow-500 text-xs mb-3">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p className="text-foreground/80 text-sm italic mb-4 line-clamp-4">
                "My family loves ordering from Restor! The kids love the desserts, and I love how affordable the prices are. Highly recommend!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">LJ</div>
                <div>
                  <h4 className="font-semibold text-sm">Lum Joyceline</h4>
                  <p className="text-[10px] text-foreground/50">Bamenda, Cameroon</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}