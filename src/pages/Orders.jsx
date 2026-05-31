import { useState } from "react";
import PageHeader from "../components/PageHeader";

const getStatusColor = (status) => {
    switch (status) {
        case "Completed": return "bg-[#FFE7DC] text-[#BD4A2D]";
        case "Pending": return "bg-[#FFF0E6] text-[#E76F51]";
        case "Cancelled": return "bg-[#F2B8A0] text-[#A63F2C]";
        default: return "bg-[#FFEAD8] text-[#2D2D2D]";
    }
};

export default function Orders() {
    const [orders] = useState([
        { id: "ORD-001", customerName: "Ahmad Fauzi", status: "Pending", total: 240000, date: "2025-05-10" },
        { id: "ORD-002", customerName: "Budi Santoso", status: "Completed", total: 375000, date: "2025-05-12" },
        { id: "ORD-003", customerName: "Citra Dewi", status: "Cancelled", total: 128000, date: "2025-05-14" },
        { id: "ORD-004", customerName: "Diana Putri", status: "Pending", total: 195000, date: "2025-05-16" },
        { id: "ORD-005", customerName: "Eko Prasetyo", status: "Completed", total: 285000, date: "2025-05-19" },
    ]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ customerName: "", status: "Pending", total: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Order for ${formData.customerName} added successfully!`);
        setShowForm(false);
        setFormData({ customerName: "", status: "Pending", total: "" });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="animate-fadeIn">
            <PageHeader
                title="Daftar Pesanan"
                breadcrumb={[{ name: "Dashboard", path: "/" }, { name: "Pesanan" }]}
            >
                <button
                    onClick={() => setShowForm(true)}
                    className="rounded-[2rem] bg-[#E76F51] px-4 py-2 text-white shadow-lg shadow-[#E76F51]/20 transition hover:bg-[#cf5f49]"
                >
                    + Tambah Pesanan
                </button>
            </PageHeader>

            <div className="p-5 bg-white rounded-[2rem] shadow-[0_20px_40px_rgba(231,111,81,0.08)] overflow-x-auto">
                <table className="w-full text-sm text-[#2D2D2D]">
                    <thead>
                        <tr className="bg-[#FFF5EB] text-[#7D5A50]">
                            <th className="p-4 text-left">Order ID</th>
                            <th className="p-4 text-left">Customer</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Total</th>
                            <th className="p-4 text-left">Tanggal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order.id} className={`border-b border-[#F4A261]/20 transition ${index % 2 === 0 ? 'bg-white' : 'bg-[#FFF5EB]'} hover:bg-[#FFF2E7]`}>
                                <td className="p-4 font-mono text-sm">{order.id}</td>
                                <td className="p-4 font-medium text-[#2D2D2D]">{order.customerName}</td>
                                <td className="p-4">
                                    <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-4 font-semibold text-[#E76F51]">{formatPrice(order.total)}</td>
                                <td className="p-4 text-[#7D5A50]">{order.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-[2rem] p-6 w-full max-w-md shadow-[0_20px_40px_rgba(231,111,81,0.12)]">
                        <h2 className="text-2xl font-bold mb-4 text-[#2D2D2D]">Tambah Pesanan Baru</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-[#2D2D2D] mb-2">Nama Pelanggan</label>
                                <input
                                    type="text"
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleInputChange}
                                    className="w-full rounded-[1.75rem] border border-[#F4A261]/30 bg-[#FFF5EB] p-3 outline-none transition focus:border-[#E76F51] focus:ring-2 focus:ring-[#E76F51]/20"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-[#2D2D2D] mb-2">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full rounded-[1.75rem] border border-[#F4A261]/30 bg-[#FFF5EB] p-3 outline-none transition focus:border-[#E76F51] focus:ring-2 focus:ring-[#E76F51]/20"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div className="mb-6">
                                <label className="block text-[#2D2D2D] mb-2">Total Harga (IDR)</label>
                                <input
                                    type="number"
                                    name="total"
                                    value={formData.total}
                                    onChange={handleInputChange}
                                    className="w-full rounded-[1.75rem] border border-[#F4A261]/30 bg-[#FFF5EB] p-3 outline-none transition focus:border-[#E76F51] focus:ring-2 focus:ring-[#E76F51]/20"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-[1.75rem] bg-[#F4A261]/20 text-[#7D5A50] hover:bg-[#F4A261]/30">Batal</button>
                                <button type="submit" className="px-4 py-2 rounded-[1.75rem] bg-[#E76F51] text-white shadow-lg shadow-[#E76F51]/20 hover:bg-[#cf5f49]">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
