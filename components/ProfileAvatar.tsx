"use client";

import Link from "next/link";
import { SignOutButton, useUser } from "@clerk/nextjs";

type Role = "CUSTOMER" | "DRIVER" | "PROVIDER" | "ADMIN";

function getDashboardPath(role?: Role) {
  switch (role) {
    case "ADMIN":
      return "/admin";
    case "PROVIDER":
      return "/provider";
    case "DRIVER":
      return "/driver";
    default:
      // CUSTOMER (or role not yet set) — no dedicated dashboard,
      // send them to the landing/browse page.
      return "/dashboard";
  }
}

export default function ProfileAvatar() {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) {
    return (
      <div className="h-9 w-9 rounded-full bg-surface-muted animate-pulse" />
    );
  }

  const role = user.publicMetadata?.role as Role | undefined;
  const dashboardPath = getDashboardPath(role);
  const initials = (user.fullName ?? user.username ?? "U")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <Link
        href={dashboardPath}
        className="block h-9 w-9 shrink-0 overflow-hidden rounded-full border border-border hover:ring-2 hover:ring-primary transition"
        aria-label="Go to dashboard"
      >
        {user.imageUrl ? (
          <img
            src={user.imageUrl}
            alt={user.fullName ?? "Profile"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary text-xs font-semibold text-primary-foreground">
            {initials}
          </div>
        )}
      </Link>
    </>
  );
}
