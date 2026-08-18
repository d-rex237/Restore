export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto ">{children}</div>
    </div>
  );
}
