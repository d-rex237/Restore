"use client";

import {
  useCreateMenuItem,
  useDeleteMenuItem,
  useGetMenuItems,
  useUpdateMenuItem,
} from "@/hooks/use-menu";
import { Eye, Loader2, Pencil, Plus, Search, Star, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

type ModalMode = "add" | "edit" | "view" | null;

const emptyForm = {
  name: "",
  price: "",
  description: "",
  category: "Main Course",
  preparationTime: "",
  ingredients: "",
  image: "",
  isPopular: false,
  available: true,
};

export default function MenuPage() {
  const { data: menuData = [], isLoading } = useGetMenuItems();
  const createMutation = useCreateMenuItem();
  const updateMutation = useUpdateMenuItem();
  const deleteMutation = useDeleteMenuItem();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [activeItem, setActiveItem] = useState<any | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const categories = useMemo(
    () => ["All", ...new Set(menuData.map((item: any) => item.category))],
    [menuData],
  );

  const stats = [
    { title: "Menu Items", value: menuData.length },
    {
      title: "Categories",
      value: [...new Set(menuData.map((item: any) => item.category))].length,
    },
    {
      title: "Popular",
      value: menuData.filter((item: any) => item.isPopular).length,
    },
    {
      title: "Average Price",
      value: menuData.length
        ? `FCFA ${Math.round(
            menuData.reduce((a: number, b: any) => a + b.price, 0) /
              menuData.length,
          ).toLocaleString()}`
        : "FCFA 0",
    },
  ];

  const filteredItems = menuData.filter((item: any) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  function openAdd() {
    setForm(emptyForm);
    setActiveItem(null);
    setModalMode("add");
  }

  function openEdit(item: any) {
    setForm({
      name: item.name,
      price: String(item.price),
      description: item.description,
      category: item.category ?? "Main Course",
      preparationTime: item.preparationTime ? String(item.preparationTime) : "",
      ingredients: (item.ingredients ?? []).join(", "),
      image: item.image ?? "",
      isPopular: item.isPopular,
      available: item.available,
    });
    setActiveItem(item);
    setModalMode("edit");
  }

  function openView(item: any) {
    setActiveItem(item);
    setModalMode("view");
  }

  function closeModal() {
    setModalMode(null);
    setActiveItem(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      name: form.name,
      price: Number(form.price),
      description: form.description,
      category: form.category,
      preparationTime: form.preparationTime
        ? Number(form.preparationTime)
        : undefined,
      ingredients: form.ingredients
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
      image: form.image || undefined,
      isPopular: form.isPopular,
      available: form.available,
    };

    if (modalMode === "edit" && activeItem) {
      await updateMutation.mutateAsync({ id: activeItem.id, data: payload });
    } else {
      await createMutation.mutateAsync(payload);
    }

    closeModal();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this menu item? This can't be undone.")) return;
    setDeletingId(id);
    try {
      await deleteMutation.mutateAsync(id);
    } finally {
      setDeletingId(null);
    }
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="flex flex-col gap-6 text-black">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Menu</h1>
          <p className="text-sm text-gray-500">
            Manage the items customers see on your menu
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
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
      {isLoading ? (
        <div className="flex items-center justify-center rounded-2xl border border-gray-100 bg-white p-12">
          <Loader2 size={20} className="animate-spin text-gray-400" />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center">
          <p className="text-sm text-gray-500">
            No menu items match your search.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredItems.map((item: any) => (
            <div
              key={item.id}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                <div className="flex flex-col gap-4 sm:flex-row">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 shrink-0 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xs text-gray-400">
                      No image
                    </div>
                  )}

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
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

                      {item.preparationTime && (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                          {item.preparationTime} mins
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between gap-3 sm:flex-col sm:items-end sm:justify-between">
                  <h2 className="text-xl font-bold text-green-600">
                    FCFA {item.price.toLocaleString()}
                  </h2>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openView(item)}
                      className="rounded-lg bg-blue-50 p-2 hover:bg-blue-100"
                      aria-label={`View ${item.name}`}
                    >
                      <Eye size={18} className="text-blue-600" />
                    </button>

                    <button
                      onClick={() => openEdit(item)}
                      className="rounded-lg bg-yellow-50 p-2 hover:bg-yellow-100"
                      aria-label={`Edit ${item.name}`}
                    >
                      <Pencil size={18} className="text-yellow-600" />
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="rounded-lg bg-red-50 p-2 hover:bg-red-100 disabled:opacity-50"
                      aria-label={`Delete ${item.name}`}
                    >
                      {deletingId === item.id ? (
                        <Loader2
                          size={18}
                          className="animate-spin text-red-600"
                        />
                      ) : (
                        <Trash2 size={18} className="text-red-600" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit / View modal */}
      {modalMode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div>
                <h2 className="text-xl font-semibold">
                  {modalMode === "add"
                    ? "Add Menu Item"
                    : modalMode === "edit"
                      ? "Edit Menu Item"
                      : "Menu Item Details"}
                </h2>
                <p className="text-sm text-gray-500">
                  {modalMode === "view"
                    ? "Read-only details for this item."
                    : "Fill in the details of your menu item."}
                </p>
              </div>

              <button
                onClick={closeModal}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            {modalMode === "view" && activeItem ? (
              <div className="space-y-4 p-6">
                {activeItem.image && (
                  <img
                    src={activeItem.image}
                    alt={activeItem.name}
                    className="h-48 w-full rounded-xl object-cover"
                  />
                )}
                <h3 className="text-lg font-semibold">{activeItem.name}</h3>
                <p className="text-sm text-gray-600">
                  {activeItem.description}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p>
                    <strong>Price:</strong> FCFA{" "}
                    {activeItem.price.toLocaleString()}
                  </p>
                  <p>
                    <strong>Category:</strong> {activeItem.category}
                  </p>
                  <p>
                    <strong>Prep time:</strong>{" "}
                    {activeItem.preparationTime ?? "-"} mins
                  </p>
                  <p>
                    <strong>Available:</strong>{" "}
                    {activeItem.available ? "Yes" : "No"}
                  </p>
                </div>
                {activeItem.ingredients?.length > 0 && (
                  <p className="text-sm">
                    <strong>Ingredients:</strong>{" "}
                    {activeItem.ingredients.join(", ")}
                  </p>
                )}
                <div className="flex justify-end border-t pt-4">
                  <button
                    onClick={closeModal}
                    className="rounded-xl border px-5 py-2.5 hover:bg-gray-100"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 p-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Item Name
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Ndolé"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Price (FCFA)
                    </label>
                    <input
                      required
                      type="number"
                      value={form.price}
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
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
                    required
                    rows={4}
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Describe the meal..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                    >
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
                      value={form.preparationTime}
                      onChange={(e) =>
                        setForm({ ...form, preparationTime: e.target.value })
                      }
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
                    value={form.ingredients}
                    onChange={(e) =>
                      setForm({ ...form, ingredients: e.target.value })
                    }
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
                    value={form.image}
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.value })
                    }
                    placeholder="https://example.com/images/ndole.jpg"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Paste the URL of the image instead of uploading a file.
                  </p>
                </div>

                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.isPopular}
                      onChange={(e) =>
                        setForm({ ...form, isPopular: e.target.checked })
                      }
                    />
                    <span className="text-sm">Popular Item</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.available}
                      onChange={(e) =>
                        setForm({ ...form, available: e.target.checked })
                      }
                    />
                    <span className="text-sm">Available</span>
                  </label>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-xl border px-5 py-2.5 hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 font-medium text-white hover:bg-primary-hover disabled:opacity-60"
                  >
                    {isSaving && <Loader2 size={16} className="animate-spin" />}
                    {modalMode === "edit" ? "Save Changes" : "Save Item"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
