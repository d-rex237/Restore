import NavLinks from "@/components/navLink";

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 shrink-0 border-r border-border bg-surface px-4 py-6">
        <div className="mb-8 px-2">
          <h2 className="font-display text-lg font-bold">Restor Provider</h2>
        </div>
        <NavLinks userType="provider" />
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
