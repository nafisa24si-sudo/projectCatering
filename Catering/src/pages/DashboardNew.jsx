import { useState, useEffect } from "react";
import {
  FaShoppingCart,
  FaTruck,
  FaBan,
  FaDollarSign,
  FaWallet,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import data from "../data.json";

export default function DashboardNew() {
  const [counts, setCounts] = useState({
    orders: 0,
    delivered: 0,
    canceled: 0,
    revenue: 0,
  });

  useEffect(() => {
    const targets = {
      orders: data.dashboard.totalOrders,
      delivered: Math.floor(data.dashboard.totalOrders * 0.7),
      canceled: Math.floor(data.dashboard.totalOrders * 0.1),
      revenue: data.dashboard.revenue,
    };

    const animateCount = (target, key) => {
      let start = 0;
      const duration = 1800;
      const step = Math.max(1, Math.floor(target / (duration / 16)));

      const timer = setInterval(() => {
        start += step;
        if (start >= target) {
          setCounts((prev) => ({ ...prev, [key]: target }));
          clearInterval(timer);
        } else {
          setCounts((prev) => ({ ...prev, [key]: Math.floor(start) }));
        }
      }, 16);

      return () => clearInterval(timer);
    };

    animateCount(targets.orders, "orders");
    animateCount(targets.delivered, "delivered");
    animateCount(targets.canceled, "canceled");
    animateCount(targets.revenue, "revenue");
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "On The Way":
        return "text-yellow-600 bg-yellow-50";
      case "Delivered":
        return "text-green-600 bg-green-50";
      case "Canceled":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "On The Way":
        return <FaClock className="text-yellow-500" />;
      case "Delivered":
        return <FaCheckCircle className="text-green-500" />;
      case "Canceled":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="animate-fadeIn">
      <PageHeader title="Dashboard" breadcrumb={[{ name: "Dashboard", path: "/" }]}> 
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <p className="text-sm text-gray-500">{data.user.greeting}</p>
          <p className="text-lg font-semibold text-hijau">{data.user.name}</p>
        </div>
      </PageHeader>

      <div className="grid gap-6">
        <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
          <div className="bg-white rounded-[2rem] shadow-xl p-8 overflow-hidden relative">
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-hijau/10 blur-2xl"></div>
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-hijau/80">20% OFF</p>
                  <h2 className="text-4xl font-bold text-gray-900 mt-3">Daily Deals</h2>
                  <p className="mt-3 max-w-2xl text-gray-500">Fresh menus and fast delivery. Keep your customers happy.</p>
                </div>
                <div className="rounded-3xl border border-hijau/20 bg-hijau/10 p-4 text-hijau shadow-sm">
                  <span className="text-sm">Today</span>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl bg-white/80 border border-gray-100 p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Total Menus</p>
                  <p className="mt-3 text-3xl font-bold text-gray-900">{data.dashboard.totalMenus}</p>
                </div>
                <div className="rounded-3xl bg-white/80 border border-gray-100 p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Orders</p>
                  <p className="mt-3 text-3xl font-bold text-gray-900">{counts.orders}</p>
                </div>
                <div className="rounded-3xl bg-white/80 border border-gray-100 p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Revenue</p>
                  <p className="mt-3 text-3xl font-bold text-gray-900">{formatPrice(counts.revenue)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500">Wallet Balance</p>
                  <h3 className="text-3xl font-bold text-gray-900">${data.wallet.balance.toLocaleString()}</h3>
                </div>
                <div className="rounded-3xl bg-hijau/10 p-4 text-hijau shadow-sm">
                  <FaWallet className="text-2xl" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">Points</p>
                  <p className="mt-2 text-lg font-semibold text-gray-900">{data.wallet.points.toLocaleString()}</p>
                </div>
                <div className="rounded-[1.5rem] bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">Vouchers</p>
                  <p className="mt-2 text-lg font-semibold text-gray-900">{data.wallet.vouchers.toLocaleString()}</p>
                </div>
                <div className="rounded-[1.5rem] bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">Cashback</p>
                  <p className="mt-2 text-lg font-semibold text-gray-900">${data.wallet.cashback.toLocaleString()}</p>
                </div>
                <div className="rounded-[1.5rem] bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">Card Holder</p>
                  <p className="mt-2 text-lg font-semibold text-gray-900">{data.wallet.cardHolder}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-sm text-gray-500">Recommended</p>
                  <h3 className="text-xl font-bold text-gray-900">Top Orders</h3>
                </div>
                <span className="text-sm text-gray-500">Today</span>
              </div>
              <div className="space-y-4">
                {data.menus.map((menu) => (
                  <div key={menu.id} className="flex items-center gap-4 rounded-[1.75rem] border border-gray-100 p-4 hover:bg-gray-50 transition">
                    <img src={menu.image} alt={menu.name} className="h-16 w-16 rounded-3xl object-cover" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{menu.name}</p>
                      <p className="text-sm text-gray-500">{menu.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">Rp {menu.price.toLocaleString()}</p>
                      <span className={`mt-2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(menu.status)}`}>
                        {getStatusIcon(menu.status)}
                        <span>{menu.status}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.85fr]">
          <div className="bg-white rounded-[2rem] shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500">Monthly Performance</p>
                <h3 className="text-xl font-bold text-gray-900">Total Details</h3>
              </div>
              <select className="rounded-2xl border border-gray-200 px-4 py-2 text-sm outline-none focus:border-hijau focus:ring-2 focus:ring-hijau/20">
                <option>March 2024</option>
                <option>February 2024</option>
              </select>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Meals</span>
                  <span>{data.dashboard.monthlyData.meals}%</span>
                </div>
                <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-hijau" style={{ width: `${data.dashboard.monthlyData.meals}%` }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Expense</span>
                  <span>{data.dashboard.monthlyData.expense}%</span>
                </div>
                <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-red-500" style={{ width: `${data.dashboard.monthlyData.expense}%` }}></div>
                </div>
              </div>
              <div className="rounded-[1.5rem] bg-gray-50 p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">This Month</span>
                  <span className="text-sm font-semibold text-gray-900">+18.2%</span>
                </div>
                <div className="h-48 rounded-[1.5rem] bg-gradient-to-br from-hijau/20 to-green-100"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Packages</h3>
            <div className="space-y-4">
              {data.packages.map((pkg) => (
                <div key={pkg.id} className="rounded-[1.5rem] border border-gray-100 p-4 hover:shadow-md transition">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-gray-900">{pkg.name}</p>
                      <p className="text-sm text-gray-500">{pkg.reviews} reviews</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-hijau">${pkg.price}</p>
                      <p className="text-xs text-gray-400">Qty {pkg.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
