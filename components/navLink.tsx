"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { iconMap } from "@/lib/icon-map";
import { navConfig, type UserType } from "@/lib/navconfig";

export default function NavLinks({ userType }: { userType: UserType }) {
  const pathname = usePathname();
  const items = navConfig[userType];

  return (
    <nav className="flex flex-col gap-2">
      {items.map((item) => {
        const Icon = iconMap[item.icon];

        const isActive =
          pathname === item.href ||
          (item.href !== `/${userType}` && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300
${
  isActive
    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/20"
    : "text-gray-600 hover:bg-white hover:shadow-sm hover:text-green-700"
}`}
          >
            {/* Active Indicator */}
            {isActive && (
              <span className="absolute right-2 h-2 w-2 rounded-full bg-white" />
            )}

            {/* Icon */}
            <Icon
              size={20}
              className={`transition-colors duration-200 ${
                isActive
                  ? "text-white"
                  : "text-gray-500 group-hover:text-green-600"
              }`}
            />

            {/* Label */}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
