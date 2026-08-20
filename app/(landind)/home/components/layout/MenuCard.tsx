"use client";

import React, { forwardRef, useState } from "react";
import { MenuItem } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import {
  Clock,
  Flame,
  Leaf,
  Sprout,
  WheatOff,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  ChefHat,
  Utensils,
  Coffee,
  GlassWater,
  Pizza,
} from "lucide-react";

interface MenuCardProps {
  item: MenuItem;
  // Optional additional props (if your data includes them)
  rating?: number;        // e.g., 4.5
  isSpecial?: boolean;    // "Chef's Special"
}

/* =========================================================
   STOCK FOOD IMAGES
========================================================= */

const MEAL_IMAGES: Record<string, string> = {
  ndole:
    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85",
  "poulet dg":
    "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1000&q=85",
  eru:
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=85",
  achu:
    "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=1000&q=85",
  "jollof rice":
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=85",
  "fried rice":
    "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1000&q=85",
  "grilled fish":
    "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=85",
  fish:
    "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=85",
  chicken:
    "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1000&q=85",
  "fried chicken":
    "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1000&q=85",
  pizza:
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=85",
  burger:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85",
  salad:
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85",
  pasta:
    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=85",
  plantain:
    "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=1000&q=85",
  "fried plantain":
    "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=1000&q=85",
};

/* =========================================================
   FALLBACK IMAGES
========================================================= */

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85",
];

/* =========================================================
   GET IMAGE FOR MEAL (checks both name and description)
========================================================= */

function getFoodImage(item: MenuItem): string {
  const name = String(item.name || "").trim().toLowerCase();
  const description = String(item.description || "").trim().toLowerCase();
  const searchText = name + " " + description;

  // Sort keys by length descending to match most specific first
  const mealKeys = Object.keys(MEAL_IMAGES).sort((a, b) => b.length - a.length);
  for (const meal of mealKeys) {
    if (searchText.includes(meal)) {
      return MEAL_IMAGES[meal];
    }
  }

  // Special keyword fallbacks
  const keywords: [string, string][] = [
    ["poulet dg", "poulet dg"],
    ["dg", "poulet dg"],
    ["ndole", "ndole"],
    ["eru", "eru"],
    ["achu", "achu"],
    ["jollof", "jollof rice"],
    ["fried rice", "fried rice"],
    ["grilled fish", "grilled fish"],
    ["fish", "fish"],
    ["fried chicken", "fried chicken"],
    ["chicken", "chicken"],
    ["pizza", "pizza"],
    ["burger", "burger"],
    ["salad", "salad"],
    ["pasta", "pasta"],
    ["plantain", "plantain"],
  ];
  for (const [key, mealKey] of keywords) {
    if (searchText.includes(key)) {
      return MEAL_IMAGES[mealKey];
    }
  }

  // Stable fallback
  const key = String(item.id || item.name || "food");
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % FALLBACK_IMAGES.length;
  return FALLBACK_IMAGES[index];
}

/* =========================================================
   CATEGORY ICON MAP
========================================================= */

const categoryIconMap: Record<string, React.ReactNode> = {
  starters: <Utensils className="h-4 w-4" />,
  "main course": <Utensils className="h-4 w-4" />,
  desserts: <Coffee className="h-4 w-4" />,
  drinks: <GlassWater className="h-4 w-4" />,
  pizza: <Pizza className="h-4 w-4" />,
  burger: <Utensils className="h-4 w-4" />,
};

/* =========================================================
   MENU CARD
========================================================= */

const MenuCard = forwardRef<HTMLDivElement, MenuCardProps>(
  ({ item, rating, isSpecial = false }, ref) => {
    const [quantity, setQuantity] = useState<number>(1);
    const [justAdded, setJustAdded] = useState(false);
    const { addToCart } = useCart();

    const foodImage = getFoodImage(item);
    const category = (item.category || "meal").toLowerCase();
    const categoryIcon = categoryIconMap[category] || <Utensils className="h-4 w-4" />;

    const handleAddToCart = () => {
      addToCart(item, quantity);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    };

    // Render rating stars
    const renderRating = () => {
      if (!rating) return null;
      const fullStars = Math.floor(rating);
      const halfStar = rating % 1 >= 0.5;
      const stars = [];
      for (let i = 0; i < fullStars; i++) {
        stars.push(<Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />);
      }
      if (halfStar) {
        stars.push(<Star key="half" className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />);
      }
      return stars;
    };

    return (
      <div
        ref={ref}
        className="
          group overflow-hidden
          rounded-2xl
          border border-border/50
          bg-card
          shadow-sm
          transition-all duration-300
          hover:-translate-y-1
          hover:border-primary/30
          hover:shadow-xl
        "
      >
        {/* ========== IMAGE ========== */}
        <div className="relative h-52 w-full overflow-hidden bg-muted">
          <img
            src={foodImage}
            alt={`${item.name} meal`}
            loading="lazy"
            className="
              h-full w-full object-cover
              transition-transform duration-700
              group-hover:scale-105
            "
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMAGES[0];
            }}
          />

          {/* Gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {isSpecial && (
              <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
                <ChefHat className="h-3.5 w-3.5" />
                Chef’s Special
              </div>
            )}
            {item.isPopular && (
              <div className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                <Flame className="h-3.5 w-3.5 text-orange-400" strokeWidth={2.5} />
                Popular
              </div>
            )}
          </div>

          {/* Dietary tags */}
          <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
            {item.dietaryInfo?.isVegan && (
              <span className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 backdrop-blur-md">
                <Sprout className="h-3.5 w-3.5" />
                Vegan
              </span>
            )}
            {item.dietaryInfo?.isVegetarian && !item.dietaryInfo?.isVegan && (
              <span className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-green-300 backdrop-blur-md">
                <Leaf className="h-3.5 w-3.5" />
                Vegetarian
              </span>
            )}
            {item.dietaryInfo?.isGlutenFree && (
              <span className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-sky-300 backdrop-blur-md">
                <WheatOff className="h-3.5 w-3.5" />
                Gluten Free
              </span>
            )}
          </div>

          {/* Category badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold capitalize text-gray-800 shadow-md">
            {categoryIcon}
            {item.category}
          </div>
        </div>

        {/* ========== CONTENT ========== */}
        <div className="p-4">
          {/* Name + Price */}
          <div className="mb-1 flex items-start justify-between gap-3">
            <h3 className="line-clamp-1 text-lg font-bold leading-tight text-foreground">
              {item.name}
            </h3>
            <span className="whitespace-nowrap text-lg font-extrabold tabular-nums text-primary">
              {item.price.toLocaleString()}
              <span className="ml-1 text-xs font-semibold text-primary/70">FCFA</span>
            </span>
          </div>

          {/* Rating */}
          {rating && (
            <div className="mb-1 flex items-center gap-1 text-xs text-foreground/60">
              <div className="flex">{renderRating()}</div>
              <span className="ml-1">{rating.toFixed(1)}</span>
            </div>
          )}

          {/* Description */}
          <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-foreground/60">
            {item.description || "A delicious meal prepared with fresh ingredients."}
          </p>

          {/* Info: time + category */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground/70">
              <Clock className="h-3.5 w-3.5" />
              {item.preparationTime || 20} min
            </span>
            <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium capitalize text-foreground/70">
              {item.category}
            </span>
          </div>

          {/* Ingredients */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div className="mb-3">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-foreground/40">
                Ingredients
              </p>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients.slice(0, 4).map((ingredient, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-border/60 px-2 py-0.5 text-xs text-foreground/70"
                  >
                    {ingredient}
                  </span>
                ))}
                {item.ingredients.length > 4 && (
                  <span className="px-1 py-0.5 text-xs text-foreground/40">
                    +{item.ingredients.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="mb-3 border-t border-border/40" />

          {/* Cart controls */}
          <div className="flex items-center gap-3">
            {/* Quantity */}
            <div className="flex shrink-0 items-center rounded-lg border border-border/50 bg-muted">
              <button
                type="button"
                disabled={quantity <= 1}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="rounded-l-lg p-2.5 text-foreground/70 transition hover:bg-muted-foreground/10 active:scale-95 disabled:opacity-30"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="min-w-[2.25rem] px-2 text-center text-sm font-semibold tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="rounded-r-lg p-2.5 text-foreground/70 transition hover:bg-muted-foreground/10 active:scale-95"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Add to Cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`
                flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98]
                ${
                  justAdded
                    ? "bg-green-600"
                    : "bg-gradient-to-r from-primary to-orange-500 hover:opacity-90"
                }
              `}
            >
              <ShoppingCart className="h-4 w-4" strokeWidth={2.5} />
              {justAdded ? "Added" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

MenuCard.displayName = "MenuCard";

export default MenuCard;