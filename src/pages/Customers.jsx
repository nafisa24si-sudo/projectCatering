import { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { customers as initialCustomers } from "../data/customers";

export default function Customers() {
    const [customers] = useState(initialCustomers);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", loyalty: "Bronze" });
    const nameInputRef = useRef(null);

    useEffect(() => {
        if (showForm) {
            nameInputRef.current?.focus();
        }
    }, [showForm]);

    const getStatus = (loyalty) => (loyalty === "Bronze" ? "Nonaktif" : "Aktif");

    const filteredCustomers = useMemo(() => {
        return customers.filter((customer) => {
            const matchesSearch = [customer.name, customer.email, customer.phone]
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const status = getStatus(customer.loyalty);
            const matchesStatus = statusFilter === "All" || status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [customers, searchTerm, statusFilter]);

    const activeCount = customers.filter((customer) => getStatus(customer.loyalty) === "Aktif").length;
    const inactiveCount = customers.length - activeCount;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Customer ${formData.name} added successfully!`);
        setShowForm(false);
        setFormData({ name: "", email: "", phone: "", loyalty: "Bronze" });
    };

    const getLoyaltyColor = (loyalty) => {
        switch (loyalty) {
            case "Gold": return "bg-[#E76F51]/10 text-[#E76F51]";
            case "Silver": return "bg-[#F4A261]/10 text-[#E76F51]";
            case "Bronze": return "bg-[#FFF0E6] text-[#D1593B]";
            default: return "bg-[#FFEAD8] text-[#2D2D2D]";
        }
    };

    return (
        <div className="animate-fadeIn space-y-6">
            <PageHeader
                title="Pelanggan"
                breadcrumb={[{ name: "Dashboard", path: "/" }, { name: "Pelanggan" }]}
            >
                <button
                    onClick={() => setShowForm(true)}
                    className="rounded-[2rem] bg-[#E76F51] px-4 py-2 text-white shadow-lg shadow-[#E76F51]/20 transition hover:bg-[#cf5f49]"
                >
                    + Tambah Pelanggan
                </button>
            </PageHeader>

            <div className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
                <div className="rounded-[2rem] border border-[#e7c3b4] bg-[#fff3ec] p-6 shadow-sm">
                    <p className="text-sm uppercase tracking-[0.24em] text-[#8c4a36]">Ringkasan Pelanggan</p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-[1.75rem] bg-white p-4 shadow-sm">
                            <p className="text-xs uppercase tracking-[0.24em] text-[#7c4129]">Total Pelanggan</p>
                            <p className="mt-3 text-3xl font-semibold text-[#5e2f1f]">{customers.length}</p>
                        </div>
                        <div className="rounded-[1.75rem] bg-white p-4 shadow-sm">
                            <p className="text-xs uppercase tracking-[0.24em] text-[#7c4129]">Aktif</p>
                            <p className="mt-3 text-3xl font-semibold text-[#5e2f1f]">{activeCount}</p>
                        </div>
                        <div className="rounded-[1.75rem] bg-white p-4 shadow-sm">
                            <p className="text-xs uppercase tracking-[0.24em] text-[#7c4129]">Nonaktif</p>
                            <p className="mt-3 text-3xl font-semibold text-[#5e2f1f]">{inactiveCount}</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-[2rem] border border-[#e7c3b4] bg-[#fff3ec] p-6 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold text-[#5e2f1f]">Filter Pelanggan</p>
                            <p className="text-sm text-[#8c4a36]">Cari nama, email, atau status.</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {['All', 'Aktif', 'Nonaktif'].map((status) => (
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
                            type="text"
                            placeholder="Cari nama pelanggan..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-[1.75rem] border border-[#e7c3b4] bg-white px-4 py-3 text-sm text-[#4d2c1e] outline-none transition focus:border-[#d87d59] focus:ring-2 focus:ring-[#f4d1c0]"
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-[2rem] border border-[#e7c3b4] bg-white shadow-[0_20px_40px_rgba(231,111,81,0.08)]">
                <table className="min-w-full text-sm text-[#2D2D2D]">
                    <thead className="bg-[#fff1e6] text-[#7c4129]">
                        <tr>
                            <th className="px-4 py-4 text-left">No</th>
                            <th className="px-4 py-4 text-left">Nama Pelanggan</th>
                            <th className="px-4 py-4 text-left">Email</th>
                            <th className="px-4 py-4 text-left">No. Telepon</th>
                            <th className="px-4 py-4 text-left">Status</th>
                            <th className="px-4 py-4 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map((customer, index) => (
                            <tr key={customer.id} className={`border-b border-[#e7c3b4] transition ${index % 2 === 0 ? 'bg-white' : 'bg-[#fff5eb]'} hover:bg-[#fff2e7]`}>
                                <td className="px-4 py-4 font-medium">{index + 1}</td>
                                <td className="px-4 py-4 font-semibold text-[#5e2f1f]">
                                    <Link to={`/customers/${customer.id}`} className="hover:underline">
                                        {customer.name}
                                    </Link>
                                </td>
                                <td className="px-4 py-4 text-[#7c4129]">{customer.email}</td>
                                <td className="px-4 py-4 text-[#7c4129]">{customer.phone}</td>
                                <td className="px-4 py-4">
                                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatus(customer.loyalty) === 'Aktif' ? 'bg-[#d4f2df] text-[#276a3d]' : 'bg-[#ffead9] text-[#a65c44]'}`}>
                                        {getStatus(customer.loyalty)}
                                    </span>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex flex-wrap gap-2">
                                        <button className="rounded-2xl bg-[#d87d59] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#b45a44]">
                                            Detail
                                        </button>
                                        <button className="rounded-2xl bg-[#fff1e6] px-3 py-2 text-xs font-semibold text-[#7c4129] transition hover:bg-[#fff3ec]">
                                            Hapus
                                        </button>
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
                                <h2 className="text-2xl font-semibold text-[#5e2f1f]">Tambah Pelanggan Baru</h2>
                                <p className="text-sm text-[#8c4a36]">Masukkan data pelanggan untuk memulai pemesanan.</p>
                            </div>
                            <button onClick={() => setShowForm(false)} className="rounded-full bg-[#fff1e6] px-3 py-2 text-[#7c4129] transition hover:bg-[#f7e3d7]">
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-[#5e2f1f] mb-2">Nama Pelanggan</label>
                                <input
                                    ref={nameInputRef}
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full rounded-[1.75rem] border border-[#e7c3b4] bg-[#fff5eb] px-4 py-3 text-sm text-[#4d2c1e] outline-none transition focus:border-[#d87d59] focus:ring-2 focus:ring-[#f4d1c0]"
                                    placeholder="Masukkan nama pelanggan"
                                    required
                                />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-semibold text-[#5e2f1f] mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full rounded-[1.75rem] border border-[#e7c3b4] bg-[#fff5eb] px-4 py-3 text-sm text-[#4d2c1e] outline-none transition focus:border-[#d87d59] focus:ring-2 focus:ring-[#f4d1c0]"
                                        placeholder="email@contoh.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#5e2f1f] mb-2">No. Telepon</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full rounded-[1.75rem] border border-[#e7c3b4] bg-[#fff5eb] px-4 py-3 text-sm text-[#4d2c1e] outline-none transition focus:border-[#d87d59] focus:ring-2 focus:ring-[#f4d1c0]"
                                        placeholder="0812-3456-7890"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-[#5e2f1f] mb-2">Status Loyalty</label>
                                <select
                                    name="loyalty"
                                    value={formData.loyalty}
                                    onChange={handleInputChange}
                                    className="w-full rounded-[1.75rem] border border-[#e7c3b4] bg-[#fff5eb] px-4 py-3 text-sm text-[#4d2c1e] outline-none transition focus:border-[#d87d59] focus:ring-2 focus:ring-[#f4d1c0]"
                                >
                                    <option value="Bronze">Bronze</option>
                                    <option value="Silver">Silver</option>
                                    <option value="Gold">Gold</option>
                                </select>
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
