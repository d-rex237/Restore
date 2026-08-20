"use client";

import { useGetMenuByRestaurant } from "@/hooks/use-menu";
import { useGetRestaurant } from "@/hooks/use-restaurant";
import { ArrowLeft, Loader2, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import MenuCard from "../../components/layout/MenuCard";

interface FilterOptions {
  category: string;
  priceRange: "all" | "low" | "medium" | "high";
}

export default function RestaurantMenu({
  restaurantId,
}: {
  restaurantId: string;
}) {
  const searchParams = useSearchParams();
  const urlSearchQuery = searchParams.get("q") || "";

  const { data: restaurant, isLoading: restaurantLoading } =
    useGetRestaurant(restaurantId);
  const { data: menuItems = [], isLoading: menuLoading } =
    useGetMenuByRestaurant(restaurantId);

  const [filters, setFilters] = useState<FilterOptions>({
    category: "all",
    priceRange: "all",
  });
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);

  const dishRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const categories = useMemo(
    () => ["all", ...new Set(menuItems.map((item: any) => item.category))],
    [menuItems],
  );

  const filteredItems = useMemo(() => {
    let filtered = menuItems;

    if (filters.category !== "all") {
      filtered = filtered.filter(
        (item: any) => item.category === filters.category,
      );
    }

    // Price buckets in FCFA — adjust thresholds to fit your actual menu range
    if (filters.priceRange !== "all") {
      filtered = filtered.filter((item: any) => {
        if (filters.priceRange === "low") return item.price < 2000;
        if (filters.priceRange === "medium")
          return item.price >= 2000 && item.price <= 5000;
        if (filters.priceRange === "high") return item.price > 5000;
        return true;
      });
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (item: any) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return filtered;
  }, [menuItems, filters, searchQuery]);

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

  if (restaurantLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 size={24} className="animate-spin text-gray-400" />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-center">
        <p className="text-lg font-medium">Restaurant not found</p>
        <Link href="/restaurants" className="text-primary hover:underline">
          Back to all restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/restaurants"
          className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary"
        >
          <ArrowLeft size={16} /> All restaurants
        </Link>

        {/* Restaurant header — replaces the generic banner with real restaurant info */}
        <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-8 text-white">
          <h1 className="text-4xl font-bold">{restaurant.name}</h1>
          {restaurant.description && (
            <p className="mt-2 text-lg opacity-90">{restaurant.description}</p>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm opacity-90">
            <span className="flex items-center gap-1">
              <MapPin size={14} /> {restaurant.address}
            </span>
            <span className="flex items-center gap-1">
              <Star size={14} className="fill-white" />{" "}
              {restaurant.rating.toFixed(1)}
            </span>
            {!restaurant.isOpen && (
              <span className="rounded-full bg-black/30 px-3 py-1 text-xs font-medium">
                Currently Closed
              </span>
            )}
          </div>
        </div>

        {/* Search + filters */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <input
              type="text"
              placeholder="🔍 Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--foreground)] transition-colors focus:border-transparent focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>

            <select
              value={filters.priceRange}
              onChange={(e) =>
                setFilters({ ...filters, priceRange: e.target.value as any })
              }
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5"
            >
              <option value="all">All Prices</option>
              <option value="low">Under FCFA 2,000</option>
              <option value="medium">FCFA 2,000 - 5,000</option>
              <option value="high">Above FCFA 5,000</option>
            </select>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Menu</h2>
          <span className="text-sm text-gray-500">
            {filteredItems.length} items found
          </span>
        </div>

        {menuLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 size={24} className="animate-spin text-gray-400" />
          </div>
        ) : filteredItems.length === 0 ? (
          <p className="py-16 text-center text-gray-500">
            No menu items match your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item: any) => (
              <MenuCard
                key={item.id}
                ref={(el: HTMLDivElement | null) => {
                  dishRefs.current[item.name] = el;
                }}
                item={item}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
