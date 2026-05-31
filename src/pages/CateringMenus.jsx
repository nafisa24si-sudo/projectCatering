import PageHeader from "../components/PageHeader";
import { FaStar } from "react-icons/fa";
import data from "../data.json";

export default function CateringMenus() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Menu Catering" breadcrumb={[{ name: "Menu Catering", path: "/catering-menus" }]} />

      <div className="grid gap-6 lg:grid-cols-3">
        {data.packages.map((pack) => (
          <div key={pack.id} className="rounded-[2rem] border border-[#F4A261]/30 bg-white overflow-hidden shadow-[0_18px_40px_rgba(231,111,81,0.08)] transition hover:-translate-y-1 hover:shadow-md">
            <div className="relative overflow-hidden rounded-t-[2rem] h-48">
              <img src={pack.image} alt={pack.name} className="w-full h-full object-cover transition hover:scale-110" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#2D2D2D]">{pack.name}</h2>
                  <p className="mt-2 text-sm text-[#7D5A50]">Cocok untuk pesanan catering premium.</p>
                </div>
                <div className="inline-flex items-center gap-1 rounded-full bg-[#FFF0E6] px-3 py-2 text-sm font-semibold text-[#E76F51]">
                  <FaStar /> {pack.rating}
                </div>
              </div>
            <div className="mt-6 flex items-center justify-between rounded-[1.75rem] bg-[#FFF5EB] p-4 border border-[#F4A261]/20">
              <div>
                <p className="text-sm text-[#7D5A50]">Jumlah</p>
                <p className="text-lg font-semibold text-[#2D2D2D]">{pack.quantity}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#7D5A50]">Harga</p>
                <p className="text-lg font-semibold text-[#2D2D2D]">Rp {pack.price.toLocaleString()}</p>
              </div>
            </div>
              <div className="mt-6 flex items-center justify-between text-sm text-[#7D5A50]">
                <span>{pack.reviews} ulasan</span>
                <span>{pack.total} pesanan</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
