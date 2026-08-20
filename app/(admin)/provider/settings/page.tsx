"use client";

import {
  useGetOwnRestaurant,
  useUpdateRestaurant,
} from "@/hooks/use-restaurant";

import { useUser } from "@clerk/nextjs";
import { Bell, Lock, Save, Store, User, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

type RestaurantFormState = {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  imageUrl: string;
};

const EMPTY_FORM: RestaurantFormState = {
  name: "",
  description: "",
  address: "",
  phone: "",
  email: "",
  imageUrl: "",
};

function SettingsPage() {
  const { data: restaurant, isLoading: isRestaurantLoading } =
    useGetOwnRestaurant();
  const updateRestaurant = useUpdateRestaurant();
  const { user, isLoaded: isUserLoaded } = useUser();

  const [form, setForm] = useState<RestaurantFormState>(EMPTY_FORM);

  // Notifications aren't backed by a DB field yet (Restaurant model has
  // no notifyOrders/notifyPromotions columns) — kept local-only until
  // that's added, with a note in the UI so it doesn't look persisted.
  const [notifyOrders, setNotifyOrders] = useState(true);
  const [notifyPromotions, setNotifyPromotions] = useState(false);

  const [accountForm, setAccountForm] = useState({
    firstName: "",
    lastName: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Populate form once restaurant data loads
  useEffect(() => {
    if (restaurant) {
      setForm({
        name: restaurant.name ?? "",
        description: restaurant.description ?? "",
        address: restaurant.address ?? "",
        phone: restaurant.phone ?? "",
        email: restaurant.email ?? "",
        imageUrl: restaurant.imageUrl ?? "",
      });
    }
  }, [restaurant]);

  useEffect(() => {
    if (user) {
      setAccountForm({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
    setPasswordError(null);
    setPasswordSuccess(false);
  };

  async function handleSave() {
    try {
      // Restaurant fields
      await updateRestaurant.mutateAsync(form);

      // Clerk account fields — separate system, separate call
      if (
        user &&
        (accountForm.firstName !== (user.firstName ?? "") ||
          accountForm.lastName !== (user.lastName ?? ""))
      ) {
        await user.update({
          firstName: accountForm.firstName,
          lastName: accountForm.lastName,
        });
      }
    } catch (err) {
      console.error("Error saving settings:", err);
    }
  }

  async function handlePasswordSubmit() {
    setPasswordError(null);
    setPasswordSuccess(false);

    if (!passwordForm.newPassword || !passwordForm.currentPassword) {
      setPasswordError("Fill in your current and new password.");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New password and confirmation don't match.");
      return;
    }
    if (!user) return;

    setIsChangingPassword(true);
    try {
      await user.updatePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordSuccess(true);
    } catch (err: any) {
      setPasswordError(
        err?.errors?.[0]?.message ?? "Failed to update password.",
      );
    } finally {
      setIsChangingPassword(false);
    }
  }

  const isSaving = updateRestaurant.isPending;

  if (isRestaurantLoading || !isUserLoaded) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 size={24} className="animate-spin text-gray-400" />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
        <Store className="mx-auto mb-3 text-gray-300" size={32} />
        <h2 className="text-lg font-semibold">No restaurant yet</h2>
        <p className="mt-1 text-sm text-gray-500">
          You need to set up your restaurant before you can manage settings.
        </p>
      </div>
    );
  }

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

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-medium text-white transition hover:bg-primary-hover disabled:opacity-50"
        >
          {isSaving ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Save size={18} />
          )}
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {updateRestaurant.isError && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
          Failed to save changes. Please try again.
        </p>
      )}
      {updateRestaurant.isSuccess && (
        <p className="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-600">
          Changes saved.
        </p>
      )}

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
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Restaurant Image URL
            </label>
            <input
              name="imageUrl"
              value={form.imageUrl}
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
            <label className="mb-2 block text-sm font-medium">First Name</label>
            <input
              name="firstName"
              value={accountForm.firstName}
              onChange={handleAccountChange}
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Last Name</label>
            <input
              name="lastName"
              value={accountForm.lastName}
              onChange={handleAccountChange}
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>
        </div>
        <p className="mt-3 text-xs text-gray-400">
          Username changes aren't wired up yet — Clerk needs the username
          feature enabled in the dashboard first.
        </p>
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
              checked={notifyOrders}
              onChange={(e) => setNotifyOrders(e.target.checked)}
            />
          </label>

          <label className="flex items-center justify-between">
            <span>Receive promotional emails</span>
            <input
              type="checkbox"
              checked={notifyPromotions}
              onChange={(e) => setNotifyPromotions(e.target.checked)}
            />
          </label>
        </div>
        <p className="mt-3 text-xs text-gray-400">
          Not saved yet — these preferences need a field on the Restaurant (or
          User) model before they can persist.
        </p>
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
            name="currentPassword"
            placeholder="Current Password"
            value={passwordForm.currentPassword}
            onChange={handlePasswordChange}
            className="rounded-xl border px-4 py-3"
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={passwordForm.newPassword}
            onChange={handlePasswordChange}
            className="rounded-xl border px-4 py-3"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={passwordForm.confirmPassword}
            onChange={handlePasswordChange}
            className="rounded-xl border px-4 py-3"
          />
        </div>

        {passwordError && (
          <p className="mt-3 text-sm text-red-600">{passwordError}</p>
        )}
        {passwordSuccess && (
          <p className="mt-3 text-sm text-green-600">Password updated.</p>
        )}

        <button
          onClick={handlePasswordSubmit}
          disabled={isChangingPassword}
          className="mt-4 cursor-pointer rounded-xl border px-5 py-2.5 font-medium hover:bg-gray-50 disabled:opacity-50"
        >
          {isChangingPassword ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
