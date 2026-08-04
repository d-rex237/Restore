import {
  Bell,
  CreditCard,
  Search,
  TrendingUp,
  User2Icon,
  ShoppingBag,
  UtensilsCrossed,
  Star,
} from "lucide-react";
import { mockUsers } from "@/lib/mock-data";
import ProviderChart from "@/components/provider/providerChart";

function ProviderDash() {
  const currentUser = mockUsers.find((u) => u.role === "provider");

  const stats = [
    {
      title: "Total Revenue",
      value: "FCFA 125,000",
      change: "+12%",
      subtitle: "vs last month",
      icon: CreditCard,
      bg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Orders",
      value: "248",
      change: "+8%",
      subtitle: "vs last week",
      icon: ShoppingBag,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Menu Items",
      value: "36",
      change: "+4",
      subtitle: "new this month",
      icon: UtensilsCrossed,
      bg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div>
      {/* Header */}
      <header className="rounded-full border border-gray-200 bg-[#f5f5f5] px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Search */}
          <div className="relative w-80">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 outline-none transition focus:border-green-500"
            />
          </div>

          {/* User */}
          <div className="flex items-center gap-5">
            <button className="rounded-full bg-white p-2 shadow-sm">
              <Bell size={20} className="text-gray-600" />
            </button>

            <div className="text-right">
              <p className="font-medium">{currentUser?.name}</p>
              <p className="text-sm capitalize text-gray-500">
                {currentUser?.role}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <User2Icon className="text-green-600" size={20} />
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Cards */}
      <section className="mt-8 grid grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border w-full border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-serif font-bold text-gray-900 ">
                    {stat.value}
                  </h2>
                </div>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.bg}`}
                >
                  <Icon className={stat.iconColor} size={28} />
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm">
                <span className="flex items-center gap-1 font-semibold text-green-600">
                  <TrendingUp size={14} />
                  {stat.change}
                </span>

                <span className="text-gray-500">{stat.subtitle}</span>
              </div>
            </div>
          );
        })}
      </section>
      <section className="grid grid-cols-2">
        <div className="">
          <ProviderChart />{" "}
        </div>
        <div className=" w-2xl bg-black h-4 w-5"> </div>
      </section>
    </div>
  );
}

export default ProviderDash;
