import {
  Bell,
  CreditCard,
  Search,
  TrendingUp,
  User2Icon,
  ShoppingBag,
  UtensilsCrossed,
  Star,
  Clock3,
} from "lucide-react";
import { mockOrders, mockUsers } from "@/lib/mock-data";
import ProviderChart from "@/app/(landind)/home/provider/providerChart";

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

  const recentTransactions = [
    {
      id: "#2045",
      customer: "John Doe",
      amount: 8500,
      status: "Completed",
      time: "2 min ago",
    },
    {
      id: "#2044",
      customer: "Jane Smith",
      amount: 12000,
      status: "Preparing",
      time: "15 min ago",
    },
    {
      id: "#2043",
      customer: "Mike Johnson",
      amount: -4000,
      status: "Refunded",
      time: "1 hour ago",
    },
    {
      id: "#2042",
      customer: "Sarah Wilson",
      amount: 18200,
      status: "Completed",
      time: "Yesterday",
    },
  ];

  const statusStyles = {
    Completed: {
      badge: "bg-green-100 text-green-700",
      icon: "bg-green-100 text-green-600",
    },
    Preparing: {
      badge: "bg-blue-100 text-blue-700",
      icon: "bg-blue-100 text-blue-600",
    },
    Refunded: {
      badge: "bg-red-100 text-red-700",
      icon: "bg-red-100 text-red-600",
    },
  };

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
      <section className="grid grid-cols-2 mt-6 gap-6 ">
        <div className="">
          <ProviderChart />{" "}
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Recent Transactions</h2>
              <p className="text-sm text-gray-500">
                Latest payments and orders
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {recentTransactions.map((item) => {
              const style =
                statusStyles[item.status as keyof typeof statusStyles];

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full ${style.icon}`}
                    >
                      <CreditCard size={20} />
                    </div>

                    <div>
                      <h3 className="font-medium">{item.customer}</h3>

                      <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                        <Clock3 size={13} />
                        {item.time}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        item.amount > 0 ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {item.amount > 0 ? "+" : ""}
                      FCFA {Math.abs(item.amount).toLocaleString()}
                    </p>

                    <span
                      className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-medium ${style.badge}`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">All Orders</h2>
            <p className="text-sm text-gray-500">
              Manage and track every customer order
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left text-sm text-gray-500">
                <th className="pb-4 font-medium">Order</th>
                <th className="pb-4 font-medium">Customer</th>
                <th className="pb-4 font-medium">Items</th>
                <th className="pb-4 font-medium">Total</th>
                <th className="pb-4 font-medium">Status</th>
                <th className="pb-4 font-medium">Date</th>
              </tr>
            </thead>

            <tbody>
              {[...mockOrders]
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
                )
                .slice(0, 5)
                .map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-50 transition hover:bg-gray-50"
                  >
                    <td className="py-4">
                      <p className="font-medium text-gray-900">
                        #{order.id.toUpperCase()}
                      </p>
                    </td>

                    <td className="py-4">
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm text-gray-500">
                        {order.restaurantName}
                      </p>
                    </td>

                    <td className="py-4">
                      <p className="text-sm">
                        {order.items.reduce(
                          (sum, item) => sum + item.quantity,
                          0,
                        )}{" "}
                        items
                      </p>
                    </td>

                    <td className="py-4 font-semibold text-green-600">
                      FCFA {order.total.toLocaleString()}
                    </td>

                    <td className="py-4">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium capitalize text-green-700">
                        {order.status}
                      </span>
                    </td>

                    <td className="py-4 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default ProviderDash;
