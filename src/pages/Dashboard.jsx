import { useMemo } from "react";
import { 
  FaUsers, 
  FaUserCheck, 
  FaShoppingBag, 
  FaMoneyBillWave, 
  FaChartLine, 
  FaClipboardList, 
  FaUtensils, 
  FaUserTie, 
  FaCircle, 
  FaChevronRight,
  FaCalendarAlt
} from 'react-icons/fa';
import { customers } from "../data/customers";
import { carts, histories } from "../data/orderData";
import { menuItems } from "../data/menuData";

function Dashboard() {
  // JANGAN DIUBAH - Business Logic tetap sama
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((customer) => customer.loyalty !== "Bronze").length;
  const totalOrders = carts.length + histories.length;

  const totalRevenue = useMemo(() => {
    const parsePrice = (value) => Number(value.replace(/[^0-9]/g, ""));
    const historyRevenue = histories.reduce((sum, item) => sum + parsePrice(item.total), 0);
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(historyRevenue + 0);
  }, []);

  // Widget Components untuk presentasi UI saja
  const StatCard = ({ icon, label, value, change, color }) => (
    <div className="rounded-2xl border border-[#F1D5C8] bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          {icon}
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
          <span>{change}</span>
        </div>
      </div>
      <p className="text-xs font-semibold uppercase tracking-wider text-[#8B4A2F]/70 mb-1">{label}</p>
      <p className="text-2xl font-bold text-[#4B2E2A]">{value}</p>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#4B2E2A]">Selamat datang, Admin 👋</h1>
          <p className="mt-2 text-sm text-[#8B4A2F]/70">Berikut ringkasan aktivitas catering hari ini.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-[#F1D5C8] bg-white px-4 py-2.5 text-sm font-semibold text-[#8B4A2F] hover:bg-[#FFF8F5] transition">
            <FaCalendarAlt className="w-4 h-4" />
            <span>28 Mei 2025</span>
          </button>
        </div>
      </div>

      {/* Statistic Cards - 4 Kolom */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          icon={<FaUsers className="w-6 h-6 text-white" />}
          label="Total Pelanggan"
          value={totalCustomers}
          change="+12.5%"
          color="bg-[#8B4A2F]"
        />
        <StatCard 
          icon={<FaUserCheck className="w-6 h-6 text-white" />}
          label="Pelanggan Aktif"
          value={activeCustomers}
          change="+10.2%"
          color="bg-[#D9895B]"
        />
        <StatCard 
          icon={<FaShoppingBag className="w-6 h-6 text-white" />}
          label="Total Pesanan"
          value={totalOrders}
          change="+8.2%"
          color="bg-gradient-to-br from-[#8B4A2F] to-[#D9895B]"
        />
        <StatCard 
          icon={<FaMoneyBillWave className="w-6 h-6 text-white" />}
          label="Revenue"
          value={totalRevenue}
          change="+4.6%"
          color="bg-[#8B4A2F]"
        />
      </div>

      {/* Baris Kedua: Grafik + Pesanan Terbaru */}
      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        {/* Grafik Pesanan */}
        <div className="rounded-2xl border border-[#F1D5C8] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-[#4B2E2A]">Grafik Pesanan</h3>
            <select className="rounded-lg border border-[#F1D5C8] bg-[#FFF8F5] px-3 py-2 text-xs font-medium text-[#8B4A2F]">
              <option>7 Hari Terakhir</option>
            </select>
          </div>
          
          {/* Chart Placeholder */}
          <div className="h-64 relative flex items-end gap-3 px-2 pb-4">
            {['22 Mei', '23 Mei', '24 Mei', '25 Mei', '26 Mei', '27 Mei', '28 Mei'].map((day, i) => {
              const heights = [40, 75, 50, 65, 45, 70, 85];
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-2 justify-end">
                  <div className="w-full flex flex-col items-center gap-1 relative" style={{ height: '200px' }}>
                    {/* Background bar */}
                    <div 
                      className="w-full rounded-t-xl transition-all duration-500 absolute bottom-0"
                      style={{ height: `${heights[i]}%`, backgroundColor: 'rgba(139, 74, 47, 0.15)' }}
                    />
                    {/* Main bar */}
                    <div 
                      className="w-full bg-gradient-to-t from-[#8B4A2F] to-[#D9895B] rounded-t-xl absolute bottom-0"
                      style={{ height: `${heights[i]}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-[#8B4A2F]/60">{day}</span>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-[#8B4A2F] rounded-full" />
              <span className="text-xs text-[#4B2E2A]/70">Pesanan</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 border border-dashed border-[#D9895B] rounded-full" />
              <span className="text-xs text-[#4B2E2A]/70">Pelanggan</span>
            </div>
          </div>
        </div>

        {/* Pesanan Terbaru */}
        <div className="rounded-2xl border border-[#F1D5C8] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-[#4B2E2A]">Pesanan Terbaru</h3>
            <button className="text-xs font-semibold text-[#8B4A2F] hover:text-[#D9895B]">Lihat Semua</button>
          </div>
          
          <div className="space-y-4">
            {histories.slice(0, 4).map((order, i) => {
              // Reliable food image IDs
              const foodImageIds = [
                '1546069101992-bc8ea9e9982d',
                '1555939594-58d7cb561ad1',
                '1476199838352-dc9a1b2d6973',
                '1565299624948-b088e3816d7b'
              ];
              
              return (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-[#FFF8F5] hover:bg-[#F1D5C8]/30 transition">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#F1D5C8]">
                    <img 
                      src={`https://images.unsplash.com/photo-${foodImageIds[i]}?w=200&h=200&fit=crop`} 
                      alt="Order" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback if image fails
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-[#8B4A2F]">🍽️</div>';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#4B2E2A] truncate">{order.customer}</p>
                    <p className="text-[11px] text-[#8B4A2F]/60">#ORD-{String(order.id).padStart(6, '0')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#8B4A2F]">{order.total}</p>
                    <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      order.status === 'Selesai' ? 'bg-green-100 text-green-700' : 
                      order.status === 'Dikirim' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-orange-100 text-orange-700'
                    }`}>
                      <FaCircle className="w-1.5 h-1.5" />
                      {order.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Baris Ketiga: 3 Widget */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Menu Populer */}
        <div className="rounded-2xl border border-[#F1D5C8] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-[#4B2E2A]">Menu Populer</h3>
            <button className="text-xs font-semibold text-[#8B4A2F] hover:text-[#D9895B]">Lihat Semua</button>
          </div>
          
          <div className="space-y-4">
            {menuItems.slice(0, 3).map((item, i) => {
              // Reliable menu image IDs
              const menuImageIds = [
                '1567623025066-879588fa2017', // burger
                '1565299624948-b088e3816d7b', // pizza
                '1482045834009-589b72a5ed7a' // noodles
              ];
              
              return (
                <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl bg-[#FFF8F5] hover:bg-[#F1D5C8]/30 transition">
                  <div className="text-2xl font-black text-[#D9895B]">{i + 1}</div>
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#F1D5C8]">
                    <img 
                      src={`https://images.unsplash.com/photo-${menuImageIds[i]}?w=200&h=200&fit=crop`} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-[#8B4A2F]">🍜</div>';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#4B2E2A] truncate">{item.name}</p>
                    <p className="text-[11px] text-[#8B4A2F]/60">{item.orders || 128} terjual</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Pelanggan */}
        <div className="rounded-2xl border border-[#F1D5C8] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-[#4B2E2A]">Top Pelanggan</h3>
            <button className="text-xs font-semibold text-[#8B4A2F] hover:text-[#D9895B]">Lihat Semua</button>
          </div>
          
          <div className="space-y-4">
            {customers.slice(0, 3).map((customer, i) => (
              <div key={customer.id} className="flex items-center gap-4 p-3 rounded-xl bg-[#FFF8F5] hover:bg-[#F1D5C8]/30 transition">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B4A2F] to-[#D9895B] flex items-center justify-center text-white text-sm font-bold shadow-sm">
                  {customer.full_name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#4B2E2A] truncate">{customer.full_name}</p>
                  <p className="text-[11px] text-[#8B4A2F]/60">{customer.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#8B4A2F]">Rp 5.250.000</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Distribusi Pesanan (Donut Chart Placeholder) */}
        <div className="rounded-2xl border border-[#F1D5C8] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-[#4B2E2A]">Distribusi Pesanan</h3>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="relative w-32 h-32">
              {/* Donut Chart Placeholder */}
              <svg width="128" height="128" viewBox="0 0 128 128">
                <circle cx="64" cy="64" r="56" fill="none" stroke="#F1D5C8" strokeWidth="16" />
                <circle cx="64" cy="64" r="56" fill="none" stroke="#D9895B" strokeWidth="16" strokeDasharray="141 211" strokeDashoffset="0" transform="rotate(-90 64 64)" />
                <circle cx="64" cy="64" r="56" fill="none" stroke="#8B4A2F" strokeWidth="16" strokeDasharray="105 247" strokeDashoffset="-141" transform="rotate(-90 64 64)" />
                <circle cx="64" cy="64" r="56" fill="none" stroke="#4B2E2A" strokeWidth="16" strokeDasharray="70 282" strokeDashoffset="-246" transform="rotate(-90 64 64)" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-[#4B2E2A]">{totalOrders}</span>
                <span className="text-[10px] text-[#8B4A2F]/70">Total</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              {[
                { label: 'Diproses', percent: '35%', color: '#D9895B' },
                { label: 'Selesai', percent: '30%', color: '#8B4A2F' },
                { label: 'Dikirim', percent: '20%', color: '#4B2E2A' },
                { label: 'Menunggu', percent: '15%', color: '#F1D5C8' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#4B2E2A]">{item.label}</span>
                    <span className="text-xs font-bold text-[#8B4A2F]">{item.percent}</span>
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

export default Dashboard;