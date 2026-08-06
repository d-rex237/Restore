import NavLinks from "@/app/(landind)/home/components/layout/navLink";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen ">
      <aside className="w-64 shrink-0 sticky top-0 h-screen overflow-y-auto border-r border-border bg-[#f5f5f5] px-4 py-6">
        <div className="mb-8 px-2 ">
          <h2 className="text-2xl font-serif text-primary">Restore Admin</h2>
          <p>Manage Users And Drivers</p>
        </div>
        <NavLinks userType="admin" />
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
