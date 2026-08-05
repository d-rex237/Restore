"use client";

import { menuData } from "@/lib/mock-data";
import { Eye, Pencil, Plus, Search, Star, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = useMemo(
    () => ["All", ...new Set(menuData.map((item) => item.category))],
    [],
  );

  const stats = [
    { title: "Menu Items", value: menuData.length },
    {
      title: "Categories",
      value: [...new Set(menuData.map((item) => item.category))].length,
    },
    {
      title: "Popular",
      value: menuData.filter((item) => item.isPopular).length,
    },
    {
      title: "Average Price",
      value: `FCFA ${Math.round(
        menuData.reduce((a, b) => a + b.price, 0) / menuData.length,
      ).toLocaleString()}`,
    },
  ];

  const filteredItems = menuData.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Menu</h1>
          <p className="text-sm text-gray-500">
            Manage the items customers see on your menu
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
        >
          <Plus size={18} />
          Add New Item
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className="mt-1 text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search + category filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search menu items..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu items */}
      {filteredItems.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center">
          <p className="text-sm text-gray-500">
            No menu items match your search.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex justify-between gap-4">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-xl object-cover"
                  />

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      {!item.available && (
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-medium text-red-500">
                          Unavailable
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-500">{item.description}</p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                        {item.category}
                      </span>

                      {item.isPopular && (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-700">
                          <Star size={12} className="mr-1 inline" />
                          Popular
                        </span>
                      )}

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                        {item.preparationTime} mins
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <h2 className="text-xl font-bold text-green-600">
                    FCFA {item.price.toLocaleString()}
                  </h2>

                  <div className="flex gap-2">
                    <button
                      className="rounded-lg bg-blue-50 p-2 hover:bg-blue-100"
                      aria-label={`View ${item.name}`}
                    >
                      <Eye size={18} className="text-blue-600" />
                    </button>

                    <button
                      className="rounded-lg bg-yellow-50 p-2 hover:bg-yellow-100"
                      aria-label={`Edit ${item.name}`}
                    >
                      <Pencil size={18} className="text-yellow-600" />
                    </button>

                    <button
                      className="rounded-lg bg-red-50 p-2 hover:bg-red-100"
                      aria-label={`Delete ${item.name}`}
                    >
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setShowAddModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl rounded-2xl bg-white shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div>
                <h2 className="text-xl font-semibold">Add Menu Item</h2>
                <p className="text-sm text-gray-500">
                  Fill in the details of your new menu item.
                </p>
              </div>

              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form className="space-y-5 p-6">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Item Name
                  </label>

                  <input
                    type="text"
                    placeholder="Ndolé"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Price (FCFA)
                  </label>

                  <input
                    type="number"
                    placeholder="3500"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>

                <textarea
                  rows={4}
                  placeholder="Describe the meal..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Category
                  </label>

                  <select className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary">
                    <option>Main Course</option>
                    <option>Street Food</option>
                    <option>Seafood</option>
                    <option>Appetizers</option>
                    <option>Desserts</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Preparation Time (mins)
                  </label>

                  <input
                    type="number"
                    placeholder="20"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Ingredients
                </label>

                <input
                  type="text"
                  placeholder="Beef, Pepper, Onion..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                />

                <p className="mt-1 text-xs text-gray-500">
                  Separate ingredients with commas.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Image Link
                </label>

                <input
                  type="url"
                  placeholder="https://example.com/images/ndole.jpg"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                />

                <p className="mt-1 text-xs text-gray-500">
                  Paste the URL of the image instead of uploading a file.
                </p>
              </div>

              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-sm">Popular Item</span>
                </label>

                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Available</span>
                </label>

                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-sm">Vegetarian</span>
                </label>

                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-sm">Vegan</span>
                </label>

                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-sm">Gluten Free</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 border-t pt-5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border px-5 py-2.5 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-primary px-6 py-2.5 font-medium text-white hover:bg-primary-hover"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
