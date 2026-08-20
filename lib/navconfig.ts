import type { IconName } from "./icon-map";

export type UserType = "admin" | "provider";

export type NavItem = {
  label: string;
  href: string;
  icon: IconName; // constrained to keys of iconMap, not just any string
};

export const navConfig: Record<UserType, NavItem[]> = {
  admin: [
    { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
    { label: "Role Requests", href: "/admin/requests", icon: "ClipboardList" },
    { label: "Users", href: "/admin/users", icon: "Users" },
    { label: "Orders", href: "/admin/orders", icon: "ClipboardList" },
  ],

  provider: [
    { label: "Dashboard", href: "/provider", icon: "LayoutDashboard" },
    { label: "Menu", href: "/provider/menu", icon: "Store" },
    { label: "Restaurants", href: "/home/restaurants", icon: "Store" },
    { label: "Orders", href: "/provider/orders", icon: "ClipboardList" },
    { label: "Settings", href: "/provider/settings", icon: "Settings" },
  ],
};