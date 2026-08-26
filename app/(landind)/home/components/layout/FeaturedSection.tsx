"use client";

import Link from "next/link";
import Image from "next/image";
import {
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
  FaTruck,
} from "react-icons/fa";
import { GiNoodles } from "react-icons/gi";
import { Minus, Plus } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { useCart } from "@/lib/cart-context";
import { useGetAllAvailableMenuItems } from "@/hooks/use-menu";

// =========================================================
// SAFE FOOD IMAGE
// =========================================================
// Local images use Next.js <Image>.
// External images use normal <img>, so domains such as
// encrypted-tbn0.gstatic.com do not need to be added to
// next.config.js.
// =========================================================

function FoodImage({
  src,
  alt,
  className = "",
}: {
  src?: string | null;
  alt: string;
  className?: string;
}) {
  const imageSrc = src || "/images/food-placeholder.jpg";

  const isExternal =
    imageSrc.startsWith("http://") ||
    imageSrc.startsWith("https://");

  if (isExternal) {
    return (
      <img
        src={imageSrc}
        alt={alt}
        className={className}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      className={className}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
    />
  );
}

export default function FeaturedSection() {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  // Each food item keeps its own quantity
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const { addToCart } = useCart();

  // =========================================================
  // GET REAL MENU ITEMS FROM DATABASE
  // =========================================================

  const {
    data: menuItems = [],
    isLoading: menuLoading,
    isError: menuError,
  } = useGetAllAvailableMenuItems();

  // =========================================================
  // MOUNT
  // =========================================================

  useEffect(() => {
    setMounted(true);
  }, []);

  // =========================================================
  // AOS
  // =========================================================

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  // =========================================================
  // POPULAR DISHES
  // =========================================================

  const dishes = useMemo(() => {
    if (!menuItems || menuItems.length === 0) return [];

    const popular = menuItems.filter((item: any) => item.isPopular);

    const others = menuItems.filter((item: any) => !item.isPopular);

    const combined = [...popular, ...others];

    const unique = combined.filter(
      (item: any, index: number, array: any[]) =>
        index === array.findIndex((x: any) => x.id === item.id),
    );

    return unique.slice(0, 4);
  }, [menuItems]);

  // =========================================================
  // CHEF SPECIALS
  // =========================================================

  const chefSpecials = useMemo(() => {
    if (!menuItems || menuItems.length === 0) return [];

    const popular = menuItems.filter((item: any) => item.isPopular);

    if (popular.length > 0) {
      return popular.slice(0, 2);
    }

    return menuItems.slice(0, 2);
  }, [menuItems]);

  // =========================================================
  // CATEGORIES
  // =========================================================

  const categories = useMemo(() => {
    if (!menuItems || menuItems.length === 0) return [];

    const uniqueCategories = [
      ...new Set(
        menuItems
          .map((item: any) => item.category)
          .filter((category: string | undefined) => category),
      ),
    ];

    return uniqueCategories.slice(0, 4);
  }, [menuItems]);

  // =========================================================
  // THEME
  // =========================================================

  const isDark = theme === "dark";

  // Prevent unused variable warning if theme is not otherwise used
  void isDark;

  // =========================================================
  // FORMAT FCFA
  // =========================================================

  const formatFCFA = (amount: number) => {
    return Number(amount || 0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // =========================================================
  // GET QUANTITY
  // =========================================================

  const getQuantity = (dishId: string) => {
    return quantities[dishId] || 1;
  };

  // =========================================================
  // INCREASE QUANTITY
  // =========================================================

  const increaseQuantity = (dishId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [dishId]: getQuantity(dishId) + 1,
    }));
  };

  // =========================================================
  // DECREASE QUANTITY
  // =========================================================

  const decreaseQuantity = (dishId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [dishId]: Math.max(1, getQuantity(dishId) - 1),
    }));
  };

  // =========================================================
  // ADD TO CART
  // =========================================================

  const handleAddToCart = (dish: any) => {
    const quantity = getQuantity(String(dish.id));

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: String(dish.id),
        name: dish.name,
        price: Number(dish.price),
        image: dish.image || "/images/food-placeholder.jpg",
      });
    }

    // Reset quantity
    setQuantities((prev) => ({
      ...prev,
      [String(dish.id)]: 1,
    }));
  };

  // =========================================================
  // CATEGORY ICON
  // =========================================================

  const getCategoryIcon = (category: string) => {
    const value = category.toLowerCase();

    if (
      value.includes("starter") ||
      value.includes("appetizer") ||
      value.includes("noodle")
    ) {
      return <GiNoodles className="h-6 w-6 text-primary" />;
    }

    if (
      value.includes("dessert") ||
      value.includes("sweet") ||
      value.includes("cake")
    ) {
      return <FaCookieBite className="h-6 w-6 text-primary" />;
    }

    if (
      value.includes("drink") ||
      value.includes("beverage") ||
      value.includes("juice")
    ) {
      return <FaGlassMartiniAlt className="h-6 w-6 text-primary" />;
    }

    return <FaUtensils className="h-6 w-6 text-primary" />;
  };

  // =========================================================
  // WAIT FOR CLIENT MOUNT
  //
  // IMPORTANT:
  // All hooks are above this return.
  // This prevents the React Hooks order error.
  // =========================================================

  if (!mounted) {
    return null;
  }

  const hasFood = menuItems.length > 0;

  // =========================================================
  // LOADING STATE
  // =========================================================

  if (menuLoading) {
    return (
      <section className="relative bg-background py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />

            <p className="text-sm text-foreground/60">
              Loading delicious food...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================
  // ERROR STATE
  // =========================================================

  if (menuError) {
    return (
      <section className="relative bg-background py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
            <p className="text-sm text-red-500">
              Unable to load menu items right now.
            </p>

            <p className="mt-2 text-xs text-foreground/50">
              Please try refreshing the page.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-background py-16">
      {/* =====================================================
          BACKGROUND EFFECTS
      ====================================================== */}

      <div className="pointer-events-none absolute left-0 top-0 h-1/2 w-1/2 rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-1/2 w-1/2 rounded-full bg-gradient-to-tl from-orange-500/5 to-transparent blur-3xl" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(#888 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">

        {/* =====================================================
            1. HOW IT WORKS
        ====================================================== */}

        <div data-aos="fade-up" className="mb-16">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              How It Works
            </h2>

            <p className="text-sm text-foreground/60">
              Get your food delivered in 3 easy steps
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">

            {/* STEP 1 */}

            <div className="rounded-2xl border border-border/30 bg-card/50 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-card hover:shadow-xl">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary/20 to-orange-500/20 text-xl text-primary">
                <FaSearch />
              </div>

              <h3 className="mb-1 text-center text-base font-semibold">
                Browse & Choose
              </h3>

              <p className="text-center text-sm text-foreground/60">
                Explore our menu and pick your favorite Cameroonian dishes.
              </p>
            </div>

            {/* STEP 2 */}

            <div className="rounded-2xl border border-border/30 bg-card/50 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-card hover:shadow-xl">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary/20 to-orange-500/20 text-xl text-primary">
                <FaPhone />
              </div>

              <h3 className="mb-1 text-center text-base font-semibold">
                Place Your Order
              </h3>

              <p className="text-center text-sm text-foreground/60">
                Order online in seconds. We handle the rest.
              </p>
            </div>

            {/* STEP 3 */}

            <div className="rounded-2xl border border-border/30 bg-card/50 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-card hover:shadow-xl">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary/20 to-orange-500/20 text-xl text-primary">
                <FaTruck />
              </div>

              <h3 className="mb-1 text-center text-base font-semibold">
                Fast Delivery
              </h3>

              <p className="text-center text-sm text-foreground/60">
                Receive your hot, delicious meal right at your doorstep.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            2. BROWSE CATEGORIES
        ====================================================== */}

        <div data-aos="fade-up" className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Browse Categories
            </h2>

            <p className="text-sm text-foreground/60">
              Pick your favorite type of meal
            </p>
          </div>

          {!hasFood || categories.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm text-foreground/50">
                Food categories will appear here when menu items are added.
              </p>
            </div>
          ) : (
            <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
              {categories.map((category: any, index: number) => (
                <Link
                  key={index}
                  href={`/home/menu?q=${encodeURIComponent(category)}`}
                  className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-border/30 bg-card/50 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-card hover:shadow-xl"
                >
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary/10 to-orange-500/10 shadow-sm transition-transform group-hover:scale-110">
                    {getCategoryIcon(category)}
                  </div>

                  <span className="text-sm font-medium capitalize text-foreground">
                    {category}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* =====================================================
            3. POPULAR DISHES
        ====================================================== */}

        <div className="mb-16">
          <div className="mb-6 flex flex-wrap items-end justify-between">
            <div data-aos="fade-right">
              <h2 className="mb-1 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Popular Dishes
              </h2>

              <p className="text-sm text-foreground/60">
                What our customers love most
              </p>
            </div>

            <Link
              href="/home/menu"
              className="flex items-center gap-1 text-xs font-medium text-primary transition hover:underline"
            >
              View All
              <FaArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {!hasFood ? (
            <div
              data-aos="fade-up"
              className="rounded-2xl border border-border/30 bg-card/50 p-10 text-center"
            >
              <div className="mb-3 text-4xl">🍽️</div>

              <h3 className="font-semibold text-foreground">
                No menu items yet
              </h3>

              <p className="mt-1 text-sm text-foreground/60">
                Food added to the database will automatically appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {dishes.map((dish: any, index: number) => (
                <div
                  key={dish.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="group overflow-hidden rounded-2xl border border-border/30 bg-card/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-card hover:shadow-xl"
                >

                  {/* IMAGE */}

                  <div className="relative h-40 w-full overflow-hidden bg-muted">

                    {dish.image ? (
                      <FoodImage
                        src={dish.image}
                        alt={dish.name}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-orange-500/10">
                        <FaUtensils className="h-10 w-10 text-primary/40" />
                      </div>
                    )}

                    {/* FAVORITE */}

                    <button
                      type="button"
                      className="absolute right-3 top-3 rounded-full bg-black/40 p-2 text-gray-300 backdrop-blur-sm transition hover:bg-red-500 hover:text-white"
                      aria-label={`Add ${dish.name} to favorites`}
                    >
                      <FaRegHeart className="h-3.5 w-3.5" />
                    </button>

                    {/* POPULAR BADGE */}

                    {dish.isPopular && (
                      <div className="absolute left-3 top-3 rounded-full bg-primary px-2 py-1 text-[9px] font-bold text-white">
                        Popular
                      </div>
                    )}

                    {/* CATEGORY */}

                    {dish.category && (
                      <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium capitalize text-white backdrop-blur-sm">
                        {dish.category}
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}

                  <div className="p-4">

                    <div className="mb-1 flex items-start justify-between gap-2">
                      <h3 className="line-clamp-1 text-sm font-semibold text-foreground">
                        {dish.name}
                      </h3>

                      <span className="whitespace-nowrap text-xs font-bold text-primary">
                        {formatFCFA(dish.price)} FCFA
                      </span>
                    </div>

                    <div className="mt-2">
                      <p className="line-clamp-2 min-h-[30px] text-[10px] text-foreground/60">
                        {dish.description ||
                          "Delicious meal prepared fresh."}
                      </p>
                    </div>

                    {/* CART CONTROLS */}

                    <div className="mt-3 flex items-center justify-between gap-2 border-t border-border/30 pt-3">

                      <div className="flex items-center gap-1 text-[10px] text-foreground/50">
                        <FaFire className="h-3 w-3 text-orange-500" />
                        <span>Fresh</span>
                      </div>

                      <div className="flex items-center gap-2">

                        {/* QUANTITY */}

                        <div className="flex shrink-0 items-center rounded-lg border border-border/50 bg-muted">

                          <button
                            type="button"
                            disabled={
                              getQuantity(String(dish.id)) <= 1
                            }
                            onClick={() =>
                              decreaseQuantity(String(dish.id))
                            }
                            className="rounded-l-lg p-2 text-foreground/70 transition hover:bg-muted-foreground/10 active:scale-95 disabled:opacity-30"
                            aria-label={`Decrease ${dish.name} quantity`}
                          >
                            <Minus className="h-3 w-3" />
                          </button>

                          <span className="min-w-[1.75rem] px-1 text-center text-xs font-semibold tabular-nums">
                            {getQuantity(String(dish.id))}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(String(dish.id))
                            }
                            className="rounded-r-lg p-2 text-foreground/70 transition hover:bg-muted-foreground/10 active:scale-95"
                            aria-label={`Increase ${dish.name} quantity`}
                          >
                            <Plus className="h-3 w-3" />
                          </button>

                        </div>

                        {/* ADD TO CART */}

                        <button
                          type="button"
                          onClick={() => handleAddToCart(dish)}
                          className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-[10px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md active:scale-[0.98]"
                        >
                          <FaShoppingCart className="h-3 w-3" />

                          <span className="hidden sm:inline">
                            Add
                          </span>
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* =====================================================
            4. SPECIAL OFFERS
        ====================================================== */}

        <div data-aos="fade-up" className="mb-16">
          <div className="relative flex min-h-[140px] items-center overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-r from-primary to-orange-500 shadow-md">

            <div className="absolute inset-0 z-10 bg-black/20" />

            <div className="relative z-20 flex w-full flex-col items-center justify-between p-5 text-white md:flex-row md:p-8">

              <div>
                <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-white/80">
                  Special Offers
                </span>

                <h3 className="mb-1 text-2xl font-bold">
                  Enjoy 20% OFF
                </h3>

                <p className="text-xs font-light text-white/90">
                  Your first order! Use code{" "}
                  <span className="font-bold">FLAVOR20</span>
                </p>
              </div>

              <div className="mt-3 flex items-center gap-3 md:mt-0">

                <div className="text-5xl drop-shadow-xl">
                  🍛
                </div>

                <Link
                  href="/home/menu"
                  className="rounded-full bg-white px-5 py-2 text-xs font-bold text-primary shadow-md transition hover:bg-gray-100"
                >
                  Order Now
                </Link>

              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            5. CHEF'S SPECIAL
        ====================================================== */}

        <div className="mb-16">

          <div className="mb-6 flex items-end justify-between">

            <div data-aos="fade-right">

              <h2 className="mb-1 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Chef's Special
              </h2>

              <p className="text-sm text-foreground/60">
                Handpicked by our top chefs
              </p>

            </div>

          </div>

          {!hasFood ? (

            <div className="py-8 text-center">

              <p className="text-sm text-foreground/50">
                Chef's specials will appear here when food is added.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              {chefSpecials.map((dish: any, index: number) => (

                <div
                  key={dish.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 150}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border/30 bg-card/50 shadow-sm transition-all duration-300 hover:bg-card hover:shadow-xl md:flex-row"
                >

                  {/* IMAGE */}

                  <div className="relative h-40 min-h-[160px] w-full overflow-hidden bg-muted md:h-auto md:w-2/5">

                    {dish.image ? (

                      <FoodImage
                        src={dish.image}
                        alt={dish.name}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                    ) : (

                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-orange-500/10">
                        <FaUtensils className="h-10 w-10 text-primary/40" />
                      </div>

                    )}

                    <div className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-primary to-orange-500 px-2 py-1 text-[10px] font-bold uppercase text-white shadow-md">
                      Chef's Pick
                    </div>

                  </div>

                  {/* CONTENT */}

                  <div className="flex w-full flex-col justify-center p-4 md:w-3/5">

                    <div className="mb-1 flex items-start justify-between gap-3">

                      <h3 className="text-sm font-bold text-foreground">
                        {dish.name}
                      </h3>

                      <span className="whitespace-nowrap text-sm font-bold text-primary">
                        {formatFCFA(dish.price)} FCFA
                      </span>

                    </div>

                    {dish.category && (
                      <span className="mb-1 text-[10px] capitalize text-primary">
                        {dish.category}
                      </span>
                    )}

                    <div className="mb-1 flex text-[10px] text-yellow-500">

                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />

                      <span className="ml-1 text-foreground/40">
                        Chef's Pick
                      </span>

                    </div>

                    <p className="mb-3 line-clamp-2 text-xs text-foreground/60">
                      {dish.description ||
                        "A delicious meal carefully prepared by our chefs."}
                    </p>

                    <div className="flex items-center gap-2">

                      <button
                        type="button"
                        onClick={() => handleAddToCart(dish)}
                        className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-orange-500 px-4 py-1.5 text-xs font-semibold text-white shadow-md transition hover:opacity-90"
                      >
                        <FaShoppingCart className="h-3 w-3" />
                        Add to Cart
                      </button>

                      <Link
                        href="/home/menu"
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        View Menu
                      </Link>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* =====================================================
            6. TESTIMONIALS
        ====================================================== */}

        <div data-aos="fade-up" className="mb-16">

          <div className="mb-8 text-center">

            <h2 className="mb-1 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              What Our Customers Say
            </h2>

            <p className="text-sm text-foreground/60">
              Real reviews from real people
            </p>

          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            {/* TESTIMONIAL 1 */}

            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="rounded-2xl border border-border/30 bg-card/50 p-4 shadow-sm transition hover:bg-card hover:shadow-xl"
            >

              <div className="mb-2 flex text-[10px] text-yellow-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className="mb-3 line-clamp-4 text-xs italic text-foreground/80">
                "The Achu was absolutely incredible! The delivery was super
                fast, and the food was still hot."
              </p>

              <div className="flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-primary/20 to-orange-500/20 text-[10px] font-bold text-primary">
                  FM
                </div>

                <div>

                  <h4 className="text-xs font-semibold">
                    Fru Martin
                  </h4>

                  <p className="text-[10px] text-foreground/50">
                    Bamenda, Cameroon
                  </p>

                </div>

              </div>

            </div>

            {/* TESTIMONIAL 2 */}

            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="rounded-2xl border border-border/30 bg-card/50 p-4 shadow-sm transition hover:bg-card hover:shadow-xl"
            >

              <div className="mb-2 flex text-[10px] text-yellow-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className="mb-3 line-clamp-4 text-xs italic text-foreground/80">
                "I love how easy the app is to use. Found my favorite Ndolé
                restaurant in seconds."
              </p>

              <div className="flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-primary/20 to-orange-500/20 text-[10px] font-bold text-primary">
                  AC
                </div>

                <div>

                  <h4 className="text-xs font-semibold">
                    Asoh Christain
                  </h4>

                  <p className="text-[10px] text-foreground/50">
                    Bamenda, Cameroon
                  </p>

                </div>

              </div>

            </div>

            {/* TESTIMONIAL 3 */}

            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="rounded-2xl border border-border/30 bg-card/50 p-4 shadow-sm transition hover:bg-card hover:shadow-xl"
            >

              <div className="mb-2 flex text-[10px] text-yellow-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className="mb-3 line-clamp-4 text-xs italic text-foreground/80">
                "My family loves ordering from Restor! The kids love the
                desserts, and the prices are great."
              </p>

              <div className="flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-primary/20 to-orange-500/20 text-[10px] font-bold text-primary">
                  LJ
                </div>

                <div>

                  <h4 className="text-xs font-semibold">
                    Lum Joyceline
                  </h4>

                  <p className="text-[10px] text-foreground/50">
                    Bamenda, Cameroon
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            7. APP DOWNLOAD
        ====================================================== */}

        <div
          data-aos="fade-up"
          className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-r from-primary/20 to-orange-500/20 p-8 text-center shadow-sm md:p-10"
        >

          <div className="relative z-10 mx-auto max-w-2xl">

            <div className="mb-3 text-5xl">
              📱
            </div>

            <h2 className="mb-1 text-2xl font-bold text-foreground md:text-3xl">
              Download the Restore App
            </h2>

            <p className="mx-auto mb-4 max-w-lg text-sm text-foreground/60">
              Order food on the go, track deliveries in real-time, and get
              exclusive deals.
            </p>

            <div className="flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                href="#"
                className="rounded-xl bg-gray-900 px-5 py-2.5 text-xs font-medium text-white shadow-md transition hover:bg-gray-800"
              >
                App Store
              </Link>

              <Link
                href="#"
                className="rounded-xl bg-gray-900 px-5 py-2.5 text-xs font-medium text-white shadow-md transition hover:bg-gray-800"
              >
                Google Play
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}