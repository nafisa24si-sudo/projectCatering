import { useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { customers } from "../data/customers";

const getLoyaltyColor = (loyalty) => {
  switch (loyalty) {
    case "Gold":
      return "bg-[#E76F51]/10 text-[#E76F51]";
    case "Silver":
      return "bg-[#F4A261]/10 text-[#E76F51]";
    case "Bronze":
      return "bg-[#FFF0E6] text-[#D1593B]";
    default:
      return "bg-[#FFEAD8] text-[#2D2D2D]";
  }
};

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const customer = useMemo(() => customers.find((item) => item.id === id), [id]);

  if (!customer) {
    return (
      <div className="animate-fadeIn">
        <PageHeader
          title="Detail Pelanggan"
          breadcrumb={[{ name: "Dashboard", path: "/" }, { name: "Pelanggan", path: "/customers" }, { name: "Detail" }]}
        >
          <button onClick={() => navigate('/customers')} className="rounded-[2rem] bg-[#E76F51] px-4 py-2 text-white shadow-lg shadow-[#E76F51]/20 transition hover:bg-[#cf5f49]">
            Kembali ke Pelanggan
          </button>
        </PageHeader>
        <div className="p-5 bg-white rounded-[2rem] shadow-[0_20px_40px_rgba(231,111,81,0.08)]">
          <p className="text-[#7D5A50]">Customer not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <PageHeader
        title="Detail Pelanggan"
        breadcrumb={[{ name: "Dashboard", path: "/" }, { name: "Pelanggan", path: "/customers" }, { name: customer.name }]}
      >
        <button onClick={() => navigate('/customers')} className="rounded-[2rem] bg-[#E76F51] px-4 py-2 text-white shadow-lg shadow-[#E76F51]/20 transition hover:bg-[#cf5f49]">
          Kembali
        </button>
      </PageHeader>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="bg-white rounded-[2rem] shadow-[0_20px_40px_rgba(231,111,81,0.08)] p-8">
          <div className="flex flex-col gap-6">
            <div className="rounded-[1.75rem] border border-[#F4A261]/30 p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-[#2D2D2D]">{customer.name}</h2>
                  <p className="text-sm text-[#7D5A50] mt-2">Customer ID: {customer.id}</p>
                </div>
                <span className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium ${getLoyaltyColor(customer.loyalty)}`}>
                  {customer.loyalty}
                </span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.75rem] bg-[#FFF5EB] p-6 border border-[#F4A261]/20">
                <h3 className="text-lg font-semibold text-[#2D2D2D] mb-4">Contact Info</h3>
                <p className="text-sm text-[#7D5A50]">Email</p>
                <p className="mt-2 text-[#2D2D2D]">{customer.email}</p>
                <p className="text-sm text-[#7D5A50] mt-4">Phone</p>
                <p className="mt-2 text-[#2D2D2D]">{customer.phone}</p>
                <p className="text-sm text-[#7D5A50] mt-4">Address</p>
                <p className="mt-2 text-[#2D2D2D]">{customer.address}</p>
              </div>
              <div className="rounded-[1.75rem] bg-[#FFF5EB] p-6 border border-[#F4A261]/20">
                <h3 className="text-lg font-semibold text-[#2D2D2D] mb-4">Company & Notes</h3>
                <p className="text-sm text-[#7D5A50]">Company</p>
                <p className="mt-2 text-[#2D2D2D]">{customer.company}</p>
                <p className="text-sm text-[#7D5A50] mt-4">Joined</p>
                <p className="mt-2 text-[#2D2D2D]">{customer.joined}</p>
                <p className="text-sm text-[#7D5A50] mt-4">Notes</p>
                <p className="mt-2 text-[#2D2D2D]">{customer.notes}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-[0_20px_40px_rgba(231,111,81,0.08)] p-8">
          <div className="space-y-6">
            <div>
              <p className="text-sm text-[#7D5A50] uppercase tracking-[0.2em]">Customer Actions</p>
              <Link to="/customers" className="inline-flex mt-4 items-center rounded-full border border-[#F4A261]/30 bg-[#FFF5EB] px-4 py-2 text-sm font-medium text-[#2D2D2D] hover:bg-[#FFF2E7]">
                Kembali ke daftar pelanggan
              </Link>
            </div>
            <div className="rounded-[1.75rem] border border-[#F4A261]/20 bg-[#FFF5EB] p-6">
              <p className="text-sm text-[#7D5A50]">Recommended next step</p>
              <p className="mt-3 text-[#2D2D2D]">Buat pesanan khusus untuk pelanggan ini, tambahkan catatan privat, atau tingkatkan loyalty.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
