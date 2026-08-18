"use client";

import { useCreateRestaurant } from "@/hooks/use-restaurant";
import { Loader2, Store } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RestaurantSetupPage() {
  const router = useRouter();
  const createMutation = useCreateRestaurant();

  const [form, setForm] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    imageUrl: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createMutation.mutateAsync(form);
    router.push("/provider/menu");
  }

  return (
    <div className="mx-auto max-w-xl py-10">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Store size={22} />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold">
            Set Up Your Restaurant
          </h1>
          <p className="text-sm text-gray-500">
            One-time setup before you can start adding menu items.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Restaurant Name
          </label>
          <input
            required
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Mama Grace Kitchen"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Address</label>
          <input
            required
            type="text"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="Old Town, Bamenda"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Tell customers what makes your food special..."
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+237 6XX XXX XXX"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">
              Business Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="hello@restaurant.com"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Logo / Cover Image Link
          </label>
          <input
            type="url"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            placeholder="https://example.com/logo.jpg"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
          />
        </div>

        {createMutation.isError && (
          <p className="text-sm text-red-600">
            Something went wrong — please try again.
          </p>
        )}

        <button
          type="submit"
          disabled={createMutation.isPending}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary-hover disabled:opacity-60"
        >
          {createMutation.isPending && (
            <Loader2 size={18} className="animate-spin" />
          )}
          Create Restaurant
        </button>
      </form>
    </div>
  );
}
