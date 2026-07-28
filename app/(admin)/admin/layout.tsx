import NavLinks from "@/components/navLink";
import { User2Icon } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen ">
      <aside className="w-64 shrink-0 sticky top-0 h-screen overflow-y-auto border-r border-border bg-white px-4 py-6">
        <div className="mb-8 px-2 bg-red-500 w-max">
          <h2 className="text-2xl font-serif text-primary">Restore Admin</h2>
          <p>Manage Users And Drivers</p>
        </div>
        <NavLinks userType="admin" />
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
