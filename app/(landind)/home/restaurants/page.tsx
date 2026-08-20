"use client";

import { useGetAllRestaurants } from "@/hooks/use-restaurant";
import {
  Loader2,
  MapPin,
  Star,
  Utensils,
  Info,
  Clock,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RestaurantsPage() {
  const { data: restaurants = [], isLoading } = useGetAllRestaurants();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = restaurants.filter((r: any) =>
    r.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-red-500">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-red-900/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
              <Utensils className="h-4 w-4" />
              Authentic Cameroonian Cuisine
            </div>

            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Discover Local <br />
              <span className="text-orange-100">Restaurants</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
              Browse restaurants near you and order your favorite Cameroonian
              dishes, prepared fresh with local ingredients.
            </p>
          </div>
        </div>
      </section>

      {/* ========== SEARCH ========== */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative mb-8 max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search restaurants..."
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-11 pr-4 text-sm outline-none focus:border-orange-500"
          />
        </div>

        {/* ========== LOADING ========== */}
        {isLoading ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center">
            <Loader2
              className="h-9 w-9 animate-spin text-orange-500"
              strokeWidth={2}
            />
            <p className="mt-4 text-sm font-medium text-gray-500">
              Loading restaurants...
            </p>
          </div>
        ) : filtered.length === 0 ? (
          /* ========== EMPTY STATE ========== */
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
            <Utensils className="h-12 w-12 text-gray-300" />
            <p className="mt-4 text-sm font-medium text-gray-500">
              {restaurants.length === 0
                ? "No restaurants have joined yet — check back soon."
                : "No restaurants match your search."}
            </p>
          </div>
        ) : (
          /* ========== RESTAURANT GRID ========== */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((restaurant: any) => (
              <div
                key={restaurant.id}
                onClick={() =>
                  router.push(`/home/restaurants/${restaurant.id}`)
                }
                className="group block overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
              >
                {/* Cover */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-orange-100 to-red-100">
                  {restaurant.imageUrl ? (
                    <img
                      src={restaurant.imageUrl}
                      alt={restaurant.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Utensils className="h-16 w-16 text-orange-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Status badge */}
                  <div className="absolute left-3 top-3">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold shadow-lg backdrop-blur-md ${
                        restaurant.isOpen
                          ? "bg-green-500/90 text-white"
                          : "bg-gray-800/80 text-white"
                      }`}
                    >
                      <span className="h-2 w-2 rounded-full bg-white" />
                      {restaurant.isOpen ? "Open now" : "Closed"}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute right-3 top-3">
                    <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-extrabold text-gray-900 shadow-xl">
                      <Star
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      {Number(restaurant.rating || 0).toFixed(1)}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-white">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span className="truncate">{restaurant.address}</span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <h2 className="text-xl font-black tracking-tight">
                    {restaurant.name}
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm font-medium text-gray-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-orange-500" />
                      20–40 min
                    </span>
                    <span className="h-1 w-1 rounded-full bg-gray-300" />
                    <span>Local cuisine</span>
                  </div>
                  {restaurant.description && (
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">
                      {restaurant.description}
                    </p>
                  )}

                  <div className="mt-5 border-t border-[var(--border)]" />

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <span className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-300 group-hover:bg-orange-600 group-hover:shadow-lg">
                      <Utensils className="h-4 w-4" />
                      View Menu
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/home/restaurants/${restaurant.id}`);
                      }}
                      className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm font-bold text-[var(--foreground)] transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/10 hover:text-orange-500 active:scale-[0.98]"
                    >
                      <Info className="h-4 w-4" />
                      About
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
