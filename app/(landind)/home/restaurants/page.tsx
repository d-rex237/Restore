"use client";

import { useGetAllRestaurants } from "@/hooks/use-restaurant";
import { Loader2, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function RestaurantsPage() {
  const { data: restaurants = [], isLoading } = useGetAllRestaurants();
  const [search, setSearch] = useState("");

  const filtered = restaurants.filter((r: any) =>
    r.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-8 text-center text-white">
          <h1 className="text-4xl font-bold">Discover Cameroonian Cuisine</h1>
          <p className="mt-2 text-lg opacity-90">
            Explore authentic flavors from across Cameroon
          </p>
        </div>

        <input
          type="text"
          placeholder="🔍 Search restaurants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--foreground)] focus:border-transparent focus:ring-2 focus:ring-[var(--primary)]"
        />

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 size={24} className="animate-spin text-gray-400" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-16 text-center text-gray-500">
            No restaurants found.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((restaurant: any) => (
              <Link
                key={restaurant.id}
                href={`/home/restaurants/${restaurant.id}`}
                className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm transition hover:shadow-md"
              >
                <div className="h-40 w-full overflow-hidden bg-gray-100">
                  {restaurant.imageUrl ? (
                    <img
                      src={restaurant.imageUrl}
                      alt={restaurant.name}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                      No image
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold">{restaurant.name}</h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                    <MapPin size={14} /> {restaurant.address}
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-sm">
                    <Star
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    {restaurant.rating.toFixed(1)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
