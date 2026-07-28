import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Store,
  Settings,
} from "lucide-react";

export const iconMap = {
  LayoutDashboard,
  ClipboardList,
  Users,
  Store,
  Settings,
} as const;

export type IconName = keyof typeof iconMap;
