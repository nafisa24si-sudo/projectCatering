import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUtensils,
  FaShoppingBag,
  FaUsers,
  FaBoxOpen,
  FaStar,
  FaLeaf,
  FaIceCream,
  FaMugHot,
  FaPuzzlePiece,
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import data from "../data.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusStyles = {
  Cooking: "bg-[#FFE3D6] text-[#D1593B]",
  Preparing: "bg-[#FFF0E6] text-[#E76F51]",
  Delivered: "bg-[#FFE7DC] text-[#BD4A2D]",
  Cancelled: "bg-[#F2B8A0] text-[#A63F2C]",
};

const popularMenus = [
  {
    id: 1,
    name: "Nasi Box Premium",
    price: "Rp 65.000",
    rating: 4.8,
    status: "Ready",
    image: "https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Ayam Bakar Madu",
    price: "Rp 72.000",
    rating: 4.7,
    status: "Cooking",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Bento Healthy",
    price: "Rp 58.000",
    rating: 4.9,
    status: "Preparing",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Seafood Package",
    price: "Rp 125.000",
    rating: 4.6,
    status: "Delivered",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
  },
];

const orderStatuses = [
  { label: "Cooking", color: statusStyles.Cooking },
  { label: "Preparing", color: statusStyles.Preparing },
  { label: "Delivered", color: statusStyles.Delivered },
  { label: "Cancelled", color: statusStyles.Cancelled },
];

const recentOrders = [
  { id: 1, customer: "Alya Putri", menu: "Nasi Box Premium", qty: 2, total: "Rp 130.000", status: "Delivered" },
  { id: 2, customer: "Rian Saputra", menu: "Ayam Bakar Madu", qty: 1, total: "Rp 72.000", status: "Cooking" },
  { id: 3, customer: "Siti Aminah", menu: "Bento Healthy", qty: 3, total: "Rp 174.000", status: "Preparing" },
  { id: 4, customer: "Arief Hidayat", menu: "Seafood Package", qty: 1, total: "Rp 125.000", status: "Cancelled" },
];

const recommendations = ["Korean BBQ Box", "Ayam Geprek Premium", "Bento Sehat"];

const categories = [
  { id: 1, label: "Makanan Utama", icon: <FaUtensils className="text-2xl" /> },
  { id: 2, label: "Hidangan Penutup", icon: <FaIceCream className="text-2xl" /> },
  { id: 3, label: "Minuman", icon: <FaMugHot className="text-2xl" /> },
  { id: 4, label: "Makanan Sehat", icon: <FaLeaf className="text-2xl" /> },
];

export default function Dashboard() {
  const [stats, setStats] = useState({ orders: 0, revenue: 0, customers: 0, packages: 0 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchMenu, setSearchMenu] = useState("");
  const [newOrder, setNewOrder] = useState({ customer: "", menu: "" });

  useEffect(() => {
    const values = {
      orders: data.dashboard.totalOrders,
      revenue: data.dashboard.revenue,
      customers: data.dashboard.totalCustomers,
      packages: data.packages.length,
    };

    let start = { orders: 0, revenue: 0, customers: 0, packages: 0 };
    const duration = 1200;
    const step = 40;
    const interval = setInterval(() => {
      const next = {
        orders: Math.min(values.orders, start.orders + Math.ceil(values.orders / (duration / step))),
        revenue: Math.min(values.revenue, start.revenue + Math.ceil(values.revenue / (duration / step))),
        customers: Math.min(values.customers, start.customers + Math.ceil(values.customers / (duration / step))),
        packages: Math.min(values.packages, start.packages + 1),
      };
      start = next;
      setStats(next);
      if (next.orders === values.orders && next.revenue === values.revenue && next.customers === values.customers && next.packages === values.packages) {
        clearInterval(interval);
      }
    }, step);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleCreateOrder = () => {
    if (newOrder.customer && newOrder.menu) {
      console.log("Order baru dibuat:", newOrder);
      setNewOrder({ customer: "", menu: "" });
      setIsDialogOpen(false);
    }
  };

  const filteredOrders = recentOrders.filter((order) => {
    const matchesStatus = !selectedStatus || order.status === selectedStatus;
    return matchesStatus;
  });

  const filteredMenus = popularMenus.filter((menu) => {
    return menu.name.toLowerCase().includes(searchMenu.toLowerCase());
  });

  return (
    <div className="space-y-8 p-6">
      <PageHeader title="Dasbor Katering" breadcrumb={[{ name: "Dasbor", path: "/" }]}>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-[2rem] bg-[#E76F51] px-6 py-3 font-semibold text-white shadow-lg shadow-[#E76F51]/20 hover:bg-[#cf5f49]">
              Buat Pesanan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md rounded-[2rem]">
            <DialogHeader>
              <DialogTitle>Buat Pesanan Baru</DialogTitle>
              <DialogDescription>
                Tambahkan pesanan baru untuk pelanggan catering.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Nama Pelanggan"
                value={newOrder.customer}
                onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
                className="rounded-[1rem]"
              />
              <Input
                placeholder="Pilih Menu"
                value={newOrder.menu}
                onChange={(e) => setNewOrder({ ...newOrder, menu: e.target.value })}
                className="rounded-[1rem]"
              />
              <Button 
                onClick={handleCreateOrder}
                className="w-full rounded-[1rem] bg-[#E76F51] text-white hover:bg-[#cf5f49]"
              >
                Buat Pesanan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
        <div className="rounded-[2rem] border border-[#F4A261]/30 bg-white p-8 shadow-[0_20px_40px_rgba(231,111,81,0.08)]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-5 max-w-xl">
              <span className="inline-flex rounded-full bg-[#FFE7DC] px-4 py-1 text-sm font-semibold text-[#E76F51]">Terracotta Catering</span>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-[#2D2D2D] sm:text-5xl">Dashboard food service aesthetic untuk catering premium</h1>
                <p className="text-base text-[#7D5A50]">Kelola pesanan, menu populer, dan status dapur dalam tampilan modern yang lembut dan instagram-able.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex items-center justify-center rounded-[2rem] bg-[#E76F51] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#E76F51]/20 transition hover:bg-[#cf5f49]">Pesan Sekarang</button>
                <button className="inline-flex items-center justify-center rounded-[2rem] border border-[#F4A261]/30 bg-white px-6 py-3 text-sm font-semibold text-[#2D2D2D] transition hover:border-[#E76F51] hover:text-[#E76F51]">Lihat Menu</button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[2rem] bg-[#FFF5EB] shadow-sm lg:min-w-[360px]">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
                alt="Catering food"
                className="h-72 w-full object-cover md:h-96"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent p-6 text-white">
                <p className="text-sm uppercase tracking-[0.2em] text-[#FFD9C0]">Menu Spesial</p>
                <p className="mt-2 text-lg font-semibold">Catering premium untuk acara berkelas</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_40px_rgba(231,111,81,0.08)]">
            <div className="flex items-center gap-3 text-[#E76F51]">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#FFE7DC] text-2xl">
                <FaShoppingBag />
              </div>
              <div>
                <p className="text-sm text-[#7D5A50]">Total Pesanan</p>
                <p className="text-3xl font-semibold text-[#2D2D2D]">{stats.orders.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_40px_rgba(231,111,81,0.08)]">
            <div className="flex items-center gap-3 text-[#F4A261]">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#FFF0E6] text-2xl">
                <FaBoxOpen />
              </div>
              <div>
                <p className="text-sm text-[#7D5A50]">Paket Tersedia</p>
                <p className="text-3xl font-semibold text-[#2D2D2D]">{stats.packages}</p>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_40px_rgba(231,111,81,0.08)]">
            <div className="flex items-center gap-3 text-[#E76F51]">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#FFE7DC] text-2xl">
                <FaUsers />
              </div>
              <div>
                <p className="text-sm text-[#7D5A50]">Pelanggan Aktif</p>
                <p className="text-3xl font-semibold text-[#2D2D2D]">{stats.customers.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_40px_rgba(231,111,81,0.08)]">
            <div className="flex items-center gap-3 text-[#F4A261]">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#FFF0E6] text-2xl">
                <FaUtensils />
              </div>
              <div>
                <p className="text-sm text-[#7D5A50]">Pendapatan</p>
                <p className="text-3xl font-semibold text-[#2D2D2D]">{formatPrice(stats.revenue)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-[#F4A261]/30 bg-white p-6 shadow-[0_18px_40px_rgba(231,111,81,0.08)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-[#E76F51]">Menu Catering Populer</p>
                <h2 className="mt-2 text-2xl font-bold text-[#2D2D2D]">Terlaris minggu ini</h2>
              </div>
              <span className="rounded-full bg-[#FFE7DC] px-4 py-2 text-sm font-semibold text-[#E76F51]">Pilihan Terbaik</span>
            </div>
            <Input
              placeholder="Cari menu..."
              value={searchMenu}
              onChange={(e) => setSearchMenu(e.target.value)}
              className="mt-4 rounded-[1rem] border-[#F4A261]/30"
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {filteredMenus.map((menu) => (
                <div key={menu.id} className="group overflow-hidden rounded-[1.75rem] border border-[#F4A261]/20 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <div className="overflow-hidden">
                    <img src={menu.image} alt={menu.name} className="h-40 w-full object-cover transition duration-300 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-[#2D2D2D]">{menu.name}</h3>
                      <span className="inline-flex rounded-full bg-[#FFE3D6] px-3 py-1 text-xs font-semibold text-[#D1593B]">{menu.status}</span>
                    </div>
                    <p className="text-sm text-[#7D5A50]">{menu.price}</p>
                    <div className="mt-4 flex items-center gap-2 text-[#E76F51]">
                      <FaStar />
                      <span className="text-sm font-semibold text-[#2D2D2D]">{menu.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#F4A261]/30 bg-white p-6 shadow-[0_18px_40px_rgba(231,111,81,0.08)]">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-[#E76F51]">Status Pesanan</p>
                <h2 className="mt-2 text-2xl font-bold text-[#2D2D2D]">Alur Dapur Terkini</h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {orderStatuses.map((status) => (
                <div key={status.label} className="rounded-[1.75rem] border border-[#F4A261]/20 bg-[#FFF4EA] p-4">
                  <p className="text-sm text-[#7D5A50]">{status.label}</p>
                  <span className={`mt-3 inline-flex rounded-full px-3 py-2 text-sm font-semibold ${status.color}`}>{status.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-[#F4A261]/30 bg-white p-6 shadow-[0_18px_40px_rgba(231,111,81,0.08)]">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#E76F51]">Rekomendasi Chef</p>
              <h2 className="mt-2 text-2xl font-bold text-[#2D2D2D]">Ide Menu Aesthetic</h2>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {recommendations.map((item) => (
                <div key={item} className="rounded-[2rem] border border-[#F4A261]/30 bg-[#FFF0E6] px-4 py-3 text-sm font-semibold text-[#2D2D2D] transition hover:border-[#E76F51] hover:text-[#E76F51]">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#F4A261]/30 bg-white p-6 shadow-[0_18px_40px_rgba(231,111,81,0.08)]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-[#E76F51]">Kategori Makanan</p>
                <h2 className="mt-2 text-2xl font-bold text-[#2D2D2D]">Koleksi</h2>
              </div>
            </div>
            <div className="grid gap-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center gap-4 rounded-[1.75rem] border border-[#F4A261]/20 bg-[#FFF5EB] p-4 text-[#2D2D2D] transition hover:bg-[#FFF2E7]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-white text-[#E76F51] shadow-sm">{category.icon}</div>
                  <span className="font-semibold">{category.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-[#F4A261]/30 bg-white p-6 shadow-[0_18px_40px_rgba(231,111,81,0.08)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#E76F51]">Pesanan Terbaru</p>
            <h2 className="mt-2 text-2xl font-bold text-[#2D2D2D]">Pengiriman terbaru</h2>
          </div>
          <div className="flex gap-3">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40 rounded-[1rem] border-[#F4A261]/30">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Semua Status</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cooking">Cooking</SelectItem>
                <SelectItem value="Preparing">Preparing</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <button className="inline-flex items-center justify-center rounded-[2rem] bg-[#E76F51] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#E76F51]/20 transition hover:bg-[#cf5f49]">
              Lihat Semua
            </button>
          </div>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-left text-sm text-[#2D2D2D]">
            <thead>
              <tr>
                <th className="px-5 py-4 text-[#7D5A50]">Pelanggan</th>
                <th className="px-5 py-4 text-[#7D5A50]">Menu</th>
                <th className="px-5 py-4 text-[#7D5A50]">Jumlah</th>
                <th className="px-5 py-4 text-[#7D5A50]">Total</th>
                <th className="px-5 py-4 text-[#7D5A50]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4A261]/30">
              {filteredOrders.map((order, index) => (
                <tr key={order.id} className={`transition ${index % 2 === 0 ? "bg-[#FFF5EB]" : "bg-white"} hover:bg-[#FFF2E7]`}>
                  <td className="px-5 py-4 font-medium text-[#2D2D2D]">{order.customer}</td>
                  <td className="px-5 py-4 text-[#7D5A50]">{order.menu}</td>
                  <td className="px-5 py-4 text-[#7D5A50]">{order.qty}</td>
                  <td className="px-5 py-4 font-semibold text-[#2D2D2D]">{order.total}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${statusStyles[order.status] ?? "bg-[#FFEAD8] text-[#2D2D2D]"}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
