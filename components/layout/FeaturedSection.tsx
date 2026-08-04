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
  FaArrowRight,
  FaSearch,
  FaPhone,
  FaTruck
} from "react-icons/fa";
import { GiNoodles } from "react-icons/gi";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useCart } from "@/lib/cart-context";

const categories = [
  { name: "Starters", icon: <GiNoodles className="w-8 h-8 text-primary" /> },
  { name: "Main Course", icon: <FaUtensils className="w-8 h-8 text-primary" /> },
  { name: "Desserts", icon: <FaCookieBite className="w-8 h-8 text-primary" /> },
  { name: "Drinks", icon: <FaGlassMartiniAlt className="w-8 h-8 text-primary" /> },
];

const dishes = [
  { id: 1, name: "Ndolé", price: 3500, rating: 5, image: "/images/ndole.webp", description: "Classic Cameroonian dish with bitter leaves, peanuts, and tender beef." },
  { id: 2, name: "Eru Soup", price: 3000, rating: 5, image: "/images/eru.jpg", description: "Rich, hearty soup made with water leaves, okra, and smoked fish." },
  { id: 3, name: "Miondo", price: 1500, rating: 5, image: "/images/miondo.webp", description: "Soft cassava sticks served with a flavorful, spicy peanut sauce." },
  { id: 4, name: "Grilled Tilapia", price: 4000, rating: 5, image: "/images/grilled-tilapia.webp", description: "Fresh tilapia grilled to perfection with local spices and lemon." },
];

const chefSpecials = [
  { id: 7, name: "Poulet DG", price: 4500, rating: 5, image: "/images/poulet.JFIF", desc: "Spicy chicken stew with plantains and vegetables, a local favorite." },
  { id: 8, name: "Pepper Soup", price: 2500, rating: 5, image: "/images/pepper-soup.webp", desc: "Spicy traditional broth featuring goat meat, crayfish, and local spices." },
];

export default function FeaturedSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { addToCart } = useCart();

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
    <section className="py-20 relative bg-background">
      
      {/* ================= BACKGROUND EFFECTS ================= */}
      {/* These use the primary color (red/orange) but with very low opacity */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-orange-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      {/* Subtle dotted overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#888 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* ================= 1. HOW IT WORKS ================= */}
        <div data-aos="fade-up" className="mb-24">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">How It Works</h2>
            <p className="text-sm text-foreground/60">Get your food delivered in 3 easy steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className={`p-8 rounded-3xl shadow-sm border border-border/30 bg-card/50 hover:bg-card hover:shadow-xl transition-all duration-300 backdrop-blur-sm`}>
              <div className="w-14 h-14 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-full flex items-center justify-center text-primary text-2xl mx-auto mb-4">
                <FaSearch />
              </div>
              <h3 className="text-lg font-bold mb-2">Browse & Choose</h3>
              <p className="text-sm text-foreground/60">Explore our menu and pick your favorite Cameroonian dishes.</p>
            </div>
            <div className={`p-8 rounded-3xl shadow-sm border border-border/30 bg-card/50 hover:bg-card hover:shadow-xl transition-all duration-300 backdrop-blur-sm`}>
              <div className="w-14 h-14 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-full flex items-center justify-center text-primary text-2xl mx-auto mb-4">
                <FaPhone />
              </div>
              <h3 className="text-lg font-bold mb-2">Place Your Order</h3>
              <p className="text-sm text-foreground/60">Order online in seconds. We handle the rest.</p>
            </div>
            <div className={`p-8 rounded-3xl shadow-sm border border-border/30 bg-card/50 hover:bg-card hover:shadow-xl transition-all duration-300 backdrop-blur-sm`}>
              <div className="w-14 h-14 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-full flex items-center justify-center text-primary text-2xl mx-auto mb-4">
                <FaTruck />
              </div>
              <h3 className="text-lg font-bold mb-2">Fast Delivery</h3>
              <p className="text-sm text-foreground/60">Receive your hot, delicious meal right at your doorstep.</p>
            </div>
          </div>
        </div>

        {/* ================= 2. BROWSE CATEGORIES ================= */}
        <div data-aos="fade-up" className="mb-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">Browse Categories</h2>
            <p className="text-sm text-foreground/60">Pick your favorite type of meal</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {categories.map((cat, index) => (
              <div 
                key={index} 
                className={`group flex flex-col items-center justify-center p-6 rounded-3xl border border-border/30 shadow-sm bg-card/50 hover:bg-card hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer`}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-sm transition-transform group-hover:scale-110 bg-gradient-to-r from-primary/10 to-orange-500/10">
                  {cat.icon}
                </div>
                <span className="font-medium text-sm text-foreground">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 3. POPULAR DISHES ================= */}
        <div className="mb-24">
          <div className="flex flex-wrap justify-between items-end mb-10">
            <div data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">Popular Dishes</h2>
              <p className="text-sm text-foreground/60">What our customers love most</p>
            </div>
            <Link href="/menu" className="text-sm font-medium text-primary hover:underline flex items-center gap-1 transition">
              View All <FaArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dishes.map((dish, index) => (
              <div 
                key={dish.id} 
                data-aos="fade-up" 
                data-aos-delay={index * 100}
                className={`group rounded-3xl overflow-hidden border border-border/30 shadow-sm bg-card/50 hover:bg-card hover:shadow-xl hover:-translate-y-2 transition-all duration-300`}
              >
                <div className="relative h-44 w-full bg-muted overflow-hidden">
                  <Image src={dish.image} alt={dish.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <button className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm p-2 rounded-full hover:bg-red-500 hover:text-white transition text-gray-300">
                    <FaRegHeart className="w-3.5 h-3.5" />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full text-white text-[10px] font-medium">
                    ★ {dish.rating}.0
                  </div>
                </div>
                
                <div className="p-5">
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
                    
                    <button
                      onClick={() => addToCart({ id: dish.id, name: dish.name, price: dish.price, image: dish.image })}
                      className="bg-primary/10 text-primary hover:bg-primary hover:text-white transition px-3 py-1.5 rounded-full text-xs font-medium"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 4. SPECIAL OFFERS BANNER ================= */}
        <div data-aos="fade-up" className="mb-24">
          <div className="relative rounded-3xl overflow-hidden min-h-[180px] flex items-center shadow-xl border border-border/30 bg-gradient-to-r from-primary to-orange-500">
            <div className="absolute inset-0 bg-black/20 z-10"></div>
            <div className="relative z-20 p-6 md:p-10 text-white w-full flex flex-col md:flex-row justify-between items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-white/80 mb-1 block">Special Offers</span>
                <h3 className="text-3xl font-bold mb-1">Enjoy 20% OFF</h3>
                <p className="text-white/90 text-sm font-light">Your first order! Use code <span className="font-bold">FLAVOR20</span></p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-4">
                <div className="text-6xl drop-shadow-xl">🍛</div>
                <Link href="/menu" className="bg-white text-primary font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition text-sm shadow-md">
                  Order Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 5. CHEF'S SPECIAL ================= */}
        <div className="mb-24">
          <div className="flex justify-between items-end mb-10">
            <div data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">Chef's Special</h2>
              <p className="text-sm text-foreground/60">Handpicked by our top chefs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {chefSpecials.map((dish, index) => (
              <div
                key={dish.id}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                className={`group flex flex-col md:flex-row rounded-3xl overflow-hidden border border-border/30 shadow-sm bg-card/50 hover:bg-card hover:shadow-xl transition-all duration-300`}
              >
                <div className="relative w-full md:w-2/5 h-44 md:h-auto bg-muted overflow-hidden">
                  <Image src={dish.image} alt={dish.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-primary to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase shadow-md">
                    Chef's Pick
                  </div>
                </div>

                <div className="p-5 w-full md:w-3/5 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-foreground">{dish.name}</h3>
                    <span className="text-lg font-bold text-primary">
                      {formatFCFA(dish.price)} FCFA
                    </span>
                  </div>

                  <div className="flex text-yellow-500 text-xs mb-2">
                    {[...Array(dish.rating)].map((_, i) => (
                      <FaStar key={i} className="w-3 h-3" />
                    ))}
                  </div>

                  <p className="text-sm text-foreground/60 mb-4 line-clamp-2">{dish.desc}</p>

                  <Link
                    href="/menu"
                    className="bg-gradient-to-r from-primary to-orange-500 text-white text-sm font-semibold py-2 px-5 rounded-full hover:opacity-90 transition w-fit shadow-md"
                  >
                    View Menu
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 6. TESTIMONIALS SECTION ================= */}
        <div data-aos="fade-up" className="mb-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">What Our Customers Say</h2>
            <p className="text-sm text-foreground/60">Real reviews from real people</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div data-aos="fade-up" data-aos-delay="100" className={`p-6 rounded-3xl border border-border/30 shadow-sm bg-card/50 hover:bg-card hover:shadow-xl transition`}>
              <div className="flex text-yellow-500 text-xs mb-3">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p className="text-foreground/80 text-sm italic mb-4 line-clamp-4">
                "The Achu was absolutely incredible! The delivery was super fast, and the food was still hot."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/20 to-orange-500/20 flex items-center justify-center text-primary text-xs font-bold">FM</div>
                <div>
                  <h4 className="font-semibold text-sm">Fru Martin</h4>
                  <p className="text-[10px] text-foreground/50">Bamenda, Cameroon</p>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="200" className={`p-6 rounded-3xl border border-border/30 shadow-sm bg-card/50 hover:bg-card hover:shadow-xl transition`}>
              <div className="flex text-yellow-500 text-xs mb-3">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p className="text-foreground/80 text-sm italic mb-4 line-clamp-4">
                "I love how easy the app is to use. Found my favorite Ndolé restaurant in seconds."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/20 to-orange-500/20 flex items-center justify-center text-primary text-xs font-bold">AC</div>
                <div>
                  <h4 className="font-semibold text-sm">Asoh Christain</h4>
                  <p className="text-[10px] text-foreground/50">Bamenda, Cameroon</p>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="300" className={`p-6 rounded-3xl border border-border/30 shadow-sm bg-card/50 hover:bg-card hover:shadow-xl transition`}>
              <div className="flex text-yellow-500 text-xs mb-3">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p className="text-foreground/80 text-sm italic mb-4 line-clamp-4">
                "My family loves ordering from Restor! The kids love the desserts, and the prices are great."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/20 to-orange-500/20 flex items-center justify-center text-primary text-xs font-bold">LJ</div>
                <div>
                  <h4 className="font-semibold text-sm">Lum Joyceline</h4>
                  <p className="text-[10px] text-foreground/50">Bamenda, Cameroon</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 7. APP DOWNLOAD SECTION ================= */}
        <div data-aos="fade-up" className="relative overflow-hidden rounded-3xl p-10 md:p-14 bg-gradient-to-r from-primary/20 to-orange-500/20 border border-border/30 shadow-sm text-center">
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="text-6xl mb-4">📱</div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Download the Restor App</h2>
            <p className="text-sm text-foreground/60 max-w-lg mx-auto mb-6">
              Order food on the go, track deliveries in real-time, and get exclusive deals right from your phone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#" className="bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition shadow-md">App Store</Link>
              <Link href="#" className="bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition shadow-md">Google Play</Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}