"use client";

import MenuCard from "./MenuCard";
import React, { useMemo, useState, useEffect, useRef } from "react";
import { menuData } from "@/lib/mock-data";
import {
  History,
  Search,
  Utensils,
  ChefHat,
  IceCreamBowl,
  Fish,
  Coffee,
  X,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

const recentOrderIds = ["1", "3", "5"];

const categories = [
  {
    id: "all",
    label: "All",
    icon: Utensils,
  },
  {
    id: "starters",
    label: "Starters",
    icon: Coffee,
  },
  {
    id: "main course",
    label: "Main Meals",
    icon: ChefHat,
  },
  {
    id: "seafood",
    label: "Seafood",
    icon: Fish,
  },
  {
    id: "desserts",
    label: "Desserts",
    icon: IceCreamBowl,
  },
];

const MenuPage = () => {
  const searchParams = useSearchParams();

  const restaurantId = searchParams.get("restaurant");
  const urlSearchQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);

  const [category, setCategory] = useState("all");

  const [filters, setFilters] = useState({
    priceRange: "all" as "all" | "low" | "medium" | "high",
    dietary: "all",
  });

  const dishRefs = useRef<{
    [key: string]: HTMLDivElement | null;
  }>({});

  /*
   * =========================================================
   * RESTAURANT FILTER
   * =========================================================
   *
   * If a restaurant ID is provided in the URL:
   *
   * /home/menu?restaurant=1
   *
   * only that restaurant's meals are shown.
   *
   * If no restaurant is provided, all meals are shown.
   */

  const restaurantItems = useMemo(() => {
    if (!restaurantId) {
      return menuData;
    }

    return menuData.filter((item: any) => {
      return (
        String(item.restaurantId) === String(restaurantId) ||
        String(item.restaurant?.id) === String(restaurantId)
      );
    });
  }, [restaurantId]);

  /*
   * =========================================================
   * FILTER MEALS
   * =========================================================
   */

  const filteredItems = useMemo(() => {
    let filtered = restaurantItems;

    // Category
    if (category !== "all") {
      filtered = filtered.filter(
        (item) => item.category?.toLowerCase() === category.toLowerCase(),
      );
    }

    // Price
    if (filters.priceRange !== "all") {
      filtered = filtered.filter((item) => {
        if (filters.priceRange === "low") {
          return item.price < 2000;
        }

        if (filters.priceRange === "medium") {
          return item.price >= 2000 && item.price <= 4000;
        }

        if (filters.priceRange === "high") {
          return item.price > 4000;
        }

        return true;
      });
    }

    // Dietary
    if (filters.dietary !== "all") {
      filtered = filtered.filter((item) => {
        if (filters.dietary === "vegetarian") {
          return item.dietaryInfo?.isVegetarian;
        }

        if (filters.dietary === "vegan") {
          return item.dietaryInfo?.isVegan;
        }

        if (filters.dietary === "gluten free") {
          return item.dietaryInfo?.isGlutenFree;
        }

        return true;
      });
    }

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      filtered = filtered.filter(
        (item) =>
          item.name?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [restaurantItems, category, filters, searchQuery]);

  /*
   * =========================================================
   * RECENT MEALS
   * =========================================================
   */

  const recentItems = useMemo(() => {
    return restaurantItems.filter((item) => recentOrderIds.includes(item.id));
  }, [restaurantItems]);

  /*
   * =========================================================
   * SCROLL TO SEARCH RESULT
   * =========================================================
   */

  useEffect(() => {
    if (urlSearchQuery && filteredItems.length > 0) {
      const matchingKey = Object.keys(dishRefs.current).find((key) =>
        key.toLowerCase().includes(urlSearchQuery.toLowerCase()),
      );

      if (matchingKey && dishRefs.current[matchingKey]) {
        setTimeout(() => {
          dishRefs.current[matchingKey]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 300);
      }
    }
  }, [filteredItems, urlSearchQuery]);

  /*
   * =========================================================
   * GROUP BY CATEGORY
   * =========================================================
   */

  const groupedMeals = useMemo(() => {
    const groups: Record<string, typeof filteredItems> = {};

    filteredItems.forEach((item) => {
      const key = item.category?.toLowerCase() || "other";

      if (!groups[key]) {
        groups[key] = [];
      }

      groups[key].push(item);
    });

    return groups;
  }, [filteredItems]);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-red-500">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-red-900/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
              <Utensils className="h-4 w-4" />
              Authentic Cameroonian Food
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Explore the menu
            </h1>

            <p className="mt-4 max-w-2xl text-white/85">
              Discover delicious meals, starters, seafood and desserts prepared
              by local restaurants.
            </p>

            {/* Search */}
            <div className="relative mt-7 max-w-2xl">
              <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search meals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 w-full rounded-2xl border border-white/20 bg-white pl-14 pr-12 text-gray-900 shadow-xl outline-none placeholder:text-gray-400 focus:ring-4 focus:ring-white/20"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* CATEGORY NAVIGATION */}

        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex min-w-max gap-3">
            {categories.map((item) => {
              const Icon = item.icon;

              const active = category === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setCategory(item.id)}
                  className={`
                    flex items-center gap-2 rounded-xl px-5 py-3
                    text-sm font-bold transition-all
                    ${
                      active
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                        : "border border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:text-orange-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* FILTERS */}

        <div className="mb-10 flex flex-wrap gap-3">
          <select
            value={filters.priceRange}
            onChange={(e) =>
              setFilters({
                ...filters,
                priceRange: e.target.value as "all" | "low" | "medium" | "high",
              })
            }
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <option value="all">All Prices</option>
            <option value="low">Under 2,000 FCFA</option>
            <option value="medium">2,000 – 4,000 FCFA</option>
            <option value="high">Over 4,000 FCFA</option>
          </select>

          <select
            value={filters.dietary}
            onChange={(e) =>
              setFilters({
                ...filters,
                dietary: e.target.value,
              })
            }
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <option value="all">All Dietary</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten free">Gluten Free</option>
          </select>
        </div>

        {/* =====================================================
            RECENT MEALS
        ====================================================== */}

        {recentItems.length > 0 && category === "all" && (
          <section className="mb-12">
            <div className="mb-5 flex items-center gap-3">
              <History className="h-5 w-5 text-orange-500" />

              <div>
                <h2 className="text-xl font-extrabold">Your Recent Meals</h2>

                <p className="text-sm text-gray-500">
                  Quickly order something you've enjoyed before.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentItems.map((item) => (
                <MenuCard
                  key={item.id}
                  ref={(el) => {
                    dishRefs.current[item.name] = el;
                  }}
                  item={item}
                />
              ))}
            </div>
          </section>
        )}

        {/* =====================================================
            MEAL CATEGORIES
        ====================================================== */}

        {filteredItems.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white py-24 text-center dark:border-gray-800 dark:bg-gray-900">
            <Utensils className="mx-auto h-12 w-12 text-orange-400" />

            <h3 className="mt-5 text-xl font-bold">No meals found</h3>

            <p className="mt-2 text-sm text-gray-500">
              Try another search or category.
            </p>
          </div>
        ) : (
          <div className="space-y-14">
            {Object.entries(groupedMeals).map(([categoryName, items]) => (
              <section key={categoryName}>
                {/* CATEGORY HEADER */}

                <div className="mb-6 flex items-end justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                      Our selection
                    </p>

                    <h2 className="mt-1 text-2xl font-extrabold capitalize sm:text-3xl">
                      {categoryName}
                    </h2>
                  </div>

                  <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-500">
                    {items.length} {items.length === 1 ? "meal" : "meals"}
                  </span>
                </div>

                {/* MEAL CARDS */}

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((item) => (
                    <MenuCard
                      key={item.id}
                      ref={(el) => {
                        dishRefs.current[item.name] = el;
                      }}
                      item={item}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MenuPage;
