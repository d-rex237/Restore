"use client";

import { Bell, Lock, Save, Store, User } from "lucide-react";
import { useState } from "react";

function SettingsPage() {
  const [form, setForm] = useState({
    restaurantName: "Mama Grace Kitchen",
    email: "mamagrace@example.com",
    phone: "+237 677 123 456",
    address: "Commercial Avenue, Bamenda",
    description: "Authentic Cameroonian meals prepared fresh every day.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    notifyOrders: true,
    notifyPromotions: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-gray-500">
            Manage your restaurant profile and preferences.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-medium text-white transition hover:bg-primary-hover">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      {/* Restaurant Information */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <Store className="text-primary" />
          <h2 className="text-lg font-semibold">Restaurant Information</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Restaurant Name
            </label>

            <input
              name="restaurantName"
              value={form.restaurantName}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Restaurant Image URL
            </label>

            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows={4}
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Phone</label>

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">Address</label>

            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>
        </div>
      </div>

      {/* Account */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <User className="text-primary" />
          <h2 className="text-lg font-semibold">Account</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Full Name</label>

            <input
              defaultValue="Grace N."
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Username</label>

            <input
              defaultValue="@mamagrace"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <Bell className="text-primary" />
          <h2 className="text-lg font-semibold">Notifications</h2>
        </div>

        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <span>Receive order notifications</span>

            <input
              type="checkbox"
              name="notifyOrders"
              checked={form.notifyOrders}
              onChange={handleCheck}
            />
          </label>

          <label className="flex items-center justify-between">
            <span>Receive promotional emails</span>

            <input
              type="checkbox"
              name="notifyPromotions"
              checked={form.notifyPromotions}
              onChange={handleCheck}
            />
          </label>
        </div>
      </div>

      {/* Password */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <Lock className="text-primary" />
          <h2 className="text-lg font-semibold">Change Password</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <input
            type="password"
            placeholder="Current Password"
            className="rounded-xl border px-4 py-3"
          />

          <input
            type="password"
            placeholder="New Password"
            className="rounded-xl border px-4 py-3"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="rounded-xl border px-4 py-3"
          />
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
