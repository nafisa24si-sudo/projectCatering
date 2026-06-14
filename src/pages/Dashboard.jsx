import { useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import { customers } from "../data/customers";
import { carts, histories } from "../data/orderData";
import heroImage from "../assets/hero.png";

function Dashboard() {
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((customer) => customer.loyalty !== "Bronze").length;
  const totalOrders = carts.length + histories.length;

  const totalRevenue = useMemo(() => {
    const parsePrice = (value) => Number(value.replace(/[^0-9]/g, ""));
    const historyRevenue = histories.reduce((sum, item) => sum + parsePrice(item.total), 0);
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(historyRevenue + 0);
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid gap-8 xl:grid-cols-[1.3fr_0.85fr]">
        <div className="rounded-[32px] border border-[#e7c3b4] bg-[#fff3ec] p-8 shadow-sm">
          <span className="inline-flex rounded-full bg-[#dca888]/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#8c4a36]">
            Terracotta Catering
          </span>
          <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight text-[#5e2f1f]">
            Dashboard food service aesthetic untuk catering premium
          </h2>
          <p className="mt-4 max-w-xl text-sm text-[#8c4a36]">
            Kelola pesanan, menu populer, dan status pelanggan dalam tampilan modern yang lembut dan instagram-able.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-2xl bg-[#d87d59] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#b45a44]">
              Pesan Sekarang
            </button>
            <button className="rounded-2xl border border-[#e7c3b4] bg-[#fff1e6] px-6 py-3 text-sm font-semibold text-[#7c4129] transition hover:bg-[#f7e3d7]">
              Lihat Menu
            </button>
          </div>
        </div>

        <div className="rounded-[32px] border border-[#e7c3b4] bg-[#fff3ec] p-0 shadow-sm overflow-hidden">
          <img src={heroImage} alt="Catering hero" className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        <div className="rounded-[24px] border border-[#e7c3b4] bg-[#fff3ec] p-6 shadow-sm">
          <div className="mb-6 h-14 w-14 rounded-3xl bg-[#e4b59d]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#8c4a36]">Total Pelanggan</p>
          <p className="mt-3 text-3xl font-semibold text-[#5e2f1f]">{totalCustomers}</p>
          <span className="mt-3 inline-flex rounded-full bg-[#f2d4c5] px-3 py-1 text-xs font-semibold text-[#7c4129]">+12.5%</span>
        </div>
        <div className="rounded-[24px] border border-[#e7c3b4] bg-[#fff3ec] p-6 shadow-sm">
          <div className="mb-6 h-14 w-14 rounded-3xl bg-[#dca888]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#8c4a36]">Pelanggan Aktif</p>
          <p className="mt-3 text-3xl font-semibold text-[#5e2f1f]">{activeCustomers}</p>
          <span className="mt-3 inline-flex rounded-full bg-[#f2d4c5] px-3 py-1 text-xs font-semibold text-[#7c4129]">+10.2%</span>
        </div>
        <div className="rounded-[24px] border border-[#e7c3b4] bg-[#fff3ec] p-6 shadow-sm">
          <div className="mb-6 h-14 w-14 rounded-3xl bg-[#deaf8f]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#8c4a36]">Total Pesanan</p>
          <p className="mt-3 text-3xl font-semibold text-[#5e2f1f]">{totalOrders}</p>
          <span className="mt-3 inline-flex rounded-full bg-[#f2d4c5] px-3 py-1 text-xs font-semibold text-[#7c4129]">+8.2%</span>
        </div>
        <div className="rounded-[24px] border border-[#e7c3b4] bg-[#fff3ec] p-6 shadow-sm">
          <div className="mb-6 h-14 w-14 rounded-3xl bg-[#e3b39e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#8c4a36]">Revenue</p>
          <p className="mt-3 text-3xl font-semibold text-[#5e2f1f]">{totalRevenue}</p>
          <span className="mt-3 inline-flex rounded-full bg-[#f2d4c5] px-3 py-1 text-xs font-semibold text-[#7c4129]">+4.6%</span>
        </div>
        <div className="rounded-[24px] border border-[#e7c3b4] bg-[#fff3ec] p-6 shadow-sm">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-3xl bg-[#e4b59d] text-2xl text-[#7c4129]">💵</div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#8c4a36]">Total Revenue</p>
          <p className="mt-3 text-3xl font-semibold text-[#5e2f1f]">Rp 45,250,000</p>
          <span className="mt-3 inline-flex rounded-full bg-[#f2d4c5] px-3 py-1 text-xs font-semibold text-[#7c4129]">+12.5%</span>
        </div>
        <div className="rounded-[24px] border border-[#e7c3b4] bg-[#fff3ec] p-6 shadow-sm">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-3xl bg-[#dca888] text-2xl text-[#7c4129]">🛒</div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#8c4a36]">Total Orders</p>
          <p className="mt-3 text-3xl font-semibold text-[#5e2f1f]">1,234</p>
          <span className="mt-3 inline-flex rounded-full bg-[#f2d4c5] px-3 py-1 text-xs font-semibold text-[#7c4129]">+8.2%</span>
        </div>
        <div className="rounded-[24px] border border-[#e7c3b4] bg-[#fff3ec] p-6 shadow-sm">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-3xl bg-[#deaf8f] text-2xl text-[#7c4129]">📦</div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#8c4a36]">Total Products</p>
          <p className="mt-3 text-3xl font-semibold text-[#5e2f1f]">567</p>
          <span className="mt-3 inline-flex rounded-full bg-[#f2d4c5] px-3 py-1 text-xs font-semibold text-[#7c4129]">+3.1%</span>
        </div>
        <div className="rounded-[24px] border border-[#e7c3b4] bg-[#fff3ec] p-6 shadow-sm">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-3xl bg-[#e3b39e] text-2xl text-[#7c4129]">👥</div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#8c4a36]">Total Customers</p>
          <p className="mt-3 text-3xl font-semibold text-[#5e2f1f]">8,492</p>
          <span className="mt-3 inline-flex rounded-full bg-[#f2d4c5] px-3 py-1 text-xs font-semibold text-[#7c4129]">-2.4%</span>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-[32px] border border-[#e7c3b4] bg-[#fff3ec] p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-semibold text-[#5e2f1f]">Sales Overview</h3>
            <span className="text-sm text-[#8c4a36]">Sales (Rp)</span>
          </div>
          <div className="rounded-[24px] bg-[#f7e3d7] p-6">
            <div className="grid h-56 grid-cols-5 items-end gap-4">
              <div className="h-32 rounded-full bg-[#d87d59]/20"></div>
              <div className="h-40 rounded-full bg-[#d87d59]/30"></div>
              <div className="h-52 rounded-full bg-[#d87d59]/40"></div>
              <div className="h-48 rounded-full bg-[#d87d59]/30"></div>
              <div className="h-44 rounded-full bg-[#d87d59]/20"></div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between text-sm text-[#8c4a36]">
            <span>Sales (Rp)</span>
            <strong className="text-[#5e2f1f]">Rp 1,200,000</strong>
          </div>
        </section>

        <section className="rounded-[32px] border border-[#e7c3b4] bg-[#fff3ec] p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-[#5e2f1f]">Orders Overview</h3>
          </div>
          <div className="grid grid-cols-6 gap-3 h-56 items-end">
            <div className="space-y-3 text-center text-xs text-[#8c4a36]">
              <div className="mx-auto h-14 w-full rounded-full bg-[#d87d59]/50"></div>
              <span>Jan</span>
            </div>
            <div className="space-y-3 text-center text-xs text-[#8c4a36]">
              <div className="mx-auto h-9 w-full rounded-full bg-[#d87d59]/50"></div>
              <span>Feb</span>
            </div>
            <div className="space-y-3 text-center text-xs text-[#8c4a36]">
              <div className="mx-auto h-28 w-full rounded-full bg-[#d87d59]/50"></div>
              <span>Mar</span>
            </div>
            <div className="space-y-3 text-center text-xs text-[#8c4a36]">
              <div className="mx-auto h-24 w-full rounded-full bg-[#d87d59]/50"></div>
              <span>Apr</span>
            </div>
            <div className="space-y-3 text-center text-xs text-[#8c4a36]">
              <div className="mx-auto h-36 w-full rounded-full bg-[#d87d59]/50"></div>
              <span>May</span>
            </div>
            <div className="space-y-3 text-center text-xs text-[#8c4a36]">
              <div className="mx-auto h-34 w-full rounded-full bg-[#d87d59]/50"></div>
              <span>Jun</span>
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900">Dashboard Ringkas</h3>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">Ringkas</div>
        </div>

        <Tabs defaultValue="active-orders">
          <TabsList variant="line" className="mb-4 bg-transparent p-0">
            <TabsTrigger value="active-orders">Pesanan Aktif</TabsTrigger>
            <TabsTrigger value="popular-menu">Menu Populer</TabsTrigger>
            <TabsTrigger value="reviews">Ulasan</TabsTrigger>
          </TabsList>
          <div className="space-y-4">
            <TabsContent value="active-orders">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[24px] border border-[#e7c3b4] bg-[#fff3ec] p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-[#5e2f1f]">Pesanan Dikirim</h4>
                    <span className="text-sm text-[#8c4a36]">80%</span>
                  </div>
                  <Progress value={80}>
                    <ProgressTrack>
                      <ProgressIndicator className="bg-[#a45c45]" />
                    </ProgressTrack>
                  </Progress>
                </div>
                <div className="rounded-[24px] border border-[#e7c3b4] bg-[#fff3ec] p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-[#5e2f1f]">Pesanan Selesai</h4>
                    <span className="text-sm text-[#8c4a36]">100%</span>
                  </div>
                  <Progress value={100}>
                    <ProgressTrack>
                      <ProgressIndicator className="bg-[#a45c45]" />
                    </ProgressTrack>
                  </Progress>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="popular-menu">
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { name: 'Nasi Box', subtitle: 'Pilihan favorit pelanggan', initials: 'NB' },
                  { name: 'Prasmanan', subtitle: 'Menu prasmanan lengkap', initials: 'P' },
                  { name: 'Snack Box', subtitle: 'Camilan praktis untuk acara', initials: 'SB' },
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-4 rounded-[24px] border border-[#e7c3b4] bg-[#fff3ec] p-4">
                    <Avatar className="bg-[#f2d4c5] text-[#7c4129]">
                      <AvatarFallback>{item.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-[#5e2f1f]">{item.name}</p>
                      <p className="text-sm text-[#8c4a36]">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <div className="space-y-4">
                {[
                  { text: '“Pelayanan cepat dan makanannya enak. Sangat direkomendasikan untuk acara kantor.”', author: '- Lina, Jakarta' },
                  { text: '“Nasi box dan prasmanannya lengkap sekali. Pesan ulang pasti!”', author: '- Budi, Surabaya' },
                  { text: '“Snack box-nya sangat praktis dan rasanya enak. Pelanggan puas semua.”', author: '- Rina, Bandung' },
                ].map((item, index) => (
                  <article key={index} className="rounded-[24px] border border-[#e7c3b4] bg-[#fff3ec] p-5">
                    <p className="text-sm leading-7 text-[#7a3a25]">{item.text}</p>
                    <span className="mt-4 block text-sm font-semibold text-[#5e2f1f]">{item.author}</span>
                  </article>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </section>
    </div>
  );
}

export default Dashboard;
