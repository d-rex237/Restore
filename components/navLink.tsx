import Link from "next/link";
import { iconMap } from "@/lib/icon-map";
import { navConfig, type UserType } from "@/lib/navconfig";

export default function NavLinks({ userType }: { userType: UserType }) {
  const items = navConfig[userType];

  return (
    <nav className="flex flex-col gap-1 ">
      {items.map((item) => {
        const Icon = iconMap[item.icon]; // string → component
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-[--radius-sm] px-3 py-2 text-sm font-medium hover:bg-surface-muted"
          >
            <Icon size={18} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
