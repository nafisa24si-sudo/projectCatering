import { useState, useEffect, useMemo, useRef } from "react";
import PageHeader from "../components/PageHeader";

const getStatusColor = (status) => {
    switch (status) {
        case "Completed": return "bg-[#D4F2DF] text-[#276A3D]";
        case "Pending": return "bg-[#FFF0E6] text-[#E76F51]";
        case "Cancelled": return "bg-[#F2B8A0] text-[#A63F2C]";
        default: return "bg-[#FFEAD8] text-[#2D2D2D]";
    }
};

const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
};

export default function Orders() {
    const [orders] = useState([
        { id: "ORD-001", customerName: "Ahmad Fauzi", status: "Pending", total: 240000, date: "2025-05-10" },
        { id: "ORD-002", customerName: "Budi Santoso", status: "Completed", total: 375000, date: "2025-05-12" },
        { id: "ORD-003", customerName: "Citra Dewi", status: "Cancelled", total: 128000, date: "2025-05-14" },
        { id: "ORD-004", customerName: "Diana Putri", status: "Pending", total: 195000, date: "2025-05-16" },
        { id: "ORD-005", customerName: "Eko Prasetyo", status: "Completed", total: 285000, date: "2025-05-19" },
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ customerName: "", status: "Pending", total: "" });
    const nameInputRef = useRef(null);

    useEffect(() => {
        if (showForm) {
            nameInputRef.current?.focus();
        }
    }, [showForm]);

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const matchesSearch = [order.id, order.customerName, order.date]
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === "All" || order.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [orders, searchTerm, statusFilter]);

    const statusCounts = orders.reduce(
        (acc, order) => ({ ...acc, [order.status]: (acc[order.status] ?? 0) + 1 }),
        {}
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Order for ${formData.customerName} added successfully!`);
        setShowForm(false);
        setFormData({ customerName: "", status: "Pending", total: "" });
    };

    return (
        <div className="animate-fadeIn space-y-6">
            <PageHeader
                title="Pesanan"
                breadcrumb={[{ name: "Dashboard", path: "/" }, { name: "Pesanan" }]}
            >
                <button
                    onClick={() => setShowForm(true)}
                    className="rounded-[2rem] bg-[#E76F51] px-4 py-2 text-white shadow-lg shadow-[#E76F51]/20 transition hover:bg-[#cf5f49]"
                >
                    + Tambah Pesanan
                </button>
            </PageHeader>

            <div className="grid gap-4 xl:grid-cols-3">
                <div className="rounded-[2rem] border border-[#e7c3b4] bg-[#fff3ec] p-6 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#8c4a36]">Total Pesanan</p>
                    <p className="mt-3 text-3xl font-semibold text-[#5e2f1f]">{orders.length}</p>
                </div>
                <div className="rounded-[2rem] border border-[#e7c3b4] bg-[#fff3ec] p-6 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#8c4a36]">Pending</p>
                    <p className="mt-3 text-3xl font-semibold text-[#5e2f1f]">{statusCounts.Pending ?? 0}</p>
                </div>
                <div className="rounded-[2rem] border border-[#e7c3b4] bg-[#fff3ec] p-6 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#8c4a36]">Selesai</p>
                    <p className="mt-3 text-3xl font-semibold text-[#5e2f1f]">{statusCounts.Completed ?? 0}</p>
                </div>
            </div>

            <div className="rounded-[2rem] border border-[#e7c3b4] bg-[#fff3ec] p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold text-[#5e2f1f]">Filter Pesanan</p>
                        <p className="text-sm text-[#8c4a36]">Cari berdasarkan ID, pelanggan, atau tanggal.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {['All', 'Pending', 'Completed', 'Cancelled'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${statusFilter === status ? 'bg-[#d87d59] text-white' : 'bg-[#fff1e6] text-[#7c4129] hover:bg-[#f7e3d7]'}`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mt-4">
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-[1.75rem] border border-[#e7c3b4] bg-white px-4 py-3 text-sm text-[#4d2c1e] outline-none transition focus:border-[#d87d59] focus:ring-2 focus:ring-[#f4d1c0]"
                        placeholder="Cari nomor pesanan atau nama pelanggan..."
                    />
                </div>
            </div>

            <div className="overflow-x-auto rounded-[2rem] border border-[#e7c3b4] bg-white shadow-[0_20px_40px_rgba(231,111,81,0.08)]">
                <table className="min-w-full text-sm text-[#2D2D2D]">
                    <thead className="bg-[#fff1e6] text-[#7c4129]">
                        <tr>
                            <th className="px-4 py-4 text-left">No</th>
                            <th className="px-4 py-4 text-left">ID Pesanan</th>
                            <th className="px-4 py-4 text-left">Pelanggan</th>
                            <th className="px-4 py-4 text-left">Status</th>
                            <th className="px-4 py-4 text-left">Total</th>
                            <th className="px-4 py-4 text-left">Tanggal</th>
                            <th className="px-4 py-4 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order, index) => (
                            <tr key={order.id} className={`border-b border-[#e7c3b4] transition ${index % 2 === 0 ? 'bg-white' : 'bg-[#fff5eb]'} hover:bg-[#fff2e7]`}>
                                <td className="px-4 py-4 font-medium">{index + 1}</td>
                                <td className="px-4 py-4 font-semibold text-[#5e2f1f]">{order.id}</td>
                                <td className="px-4 py-4 text-[#7c4129]">{order.customerName}</td>
                                <td className="px-4 py-4">
                                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-4 py-4 font-semibold text-[#E76F51]">{formatPrice(order.total)}</td>
                                <td className="px-4 py-4 text-[#7c4129]">{order.date}</td>
                                <td className="px-4 py-4">
                                    <div className="flex flex-wrap gap-2">
                                        <button className="rounded-2xl bg-[#d87d59] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#b45a44]">Detail</button>
                                        <button className="rounded-2xl bg-[#fff1e6] px-3 py-2 text-xs font-semibold text-[#7c4129] transition hover:bg-[#fff3ec]">Batalkan</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
                    <div className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-[0_25px_60px_rgba(0,0,0,0.12)]">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold text-[#5e2f1f]">Tambah Pesanan Baru</h2>
                                <p className="text-sm text-[#8c4a36]">Masukkan informasi pesanan untuk pelanggan.</p>
                            </div>
                            <button onClick={() => setShowForm(false)} className="rounded-full bg-[#fff1e6] px-3 py-2 text-[#7c4129] transition hover:bg-[#f7e3d7]">✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-[#5e2f1f] mb-2">Nama Pelanggan</label>
                                <input
                                    ref={nameInputRef}
                                    type="text"
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleInputChange}
                                    className="w-full rounded-[1.75rem] border border-[#e7c3b4] bg-[#fff5eb] px-4 py-3 text-sm text-[#4d2c1e] outline-none transition focus:border-[#d87d59] focus:ring-2 focus:ring-[#f4d1c0]"
                                    placeholder="Masukkan nama pelanggan"
                                    required
                                />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-semibold text-[#5e2f1f] mb-2">Status Pesanan</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="w-full rounded-[1.75rem] border border-[#e7c3b4] bg-[#fff5eb] px-4 py-3 text-sm text-[#4d2c1e] outline-none transition focus:border-[#d87d59] focus:ring-2 focus:ring-[#f4d1c0]"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#5e2f1f] mb-2">Total Harga (IDR)</label>
                                    <input
                                        type="number"
                                        name="total"
                                        value={formData.total}
                                        onChange={handleInputChange}
                                        className="w-full rounded-[1.75rem] border border-[#e7c3b4] bg-[#fff5eb] px-4 py-3 text-sm text-[#4d2c1e] outline-none transition focus:border-[#d87d59] focus:ring-2 focus:ring-[#f4d1c0]"
                                        placeholder="0"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="rounded-[1.75rem] border border-[#e7c3b4] bg-[#fff1e6] px-5 py-3 text-sm font-semibold text-[#7c4129] hover:bg-[#f7e3d7]"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-[1.75rem] bg-[#E76F51] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#E76F51]/20 hover:bg-[#cf5f49]"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
