import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { customers as initialCustomers } from "../data/customers";

export default function Customers() {
    const [customers] = useState(initialCustomers);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", loyalty: "Bronze" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
        <div className="animate-fadeIn">
            <PageHeader
                title="Pelanggan"
                breadcrumb={[{ name: "Dashboard", path: "/" }, { name: "Pelanggan" }]}
            >
                <button onClick={() => setShowForm(true)} className="rounded-[2rem] bg-[#E76F51] px-4 py-2 text-white shadow-lg shadow-[#E76F51]/20 transition hover:bg-[#cf5f49]">
                    + Tambah Pelanggan
                </button>
            </PageHeader>

            <div className="p-5 bg-white rounded-[2rem] shadow-[0_20px_40px_rgba(231,111,81,0.08)] overflow-x-auto">
                <table className="w-full text-sm text-[#2D2D2D]">
                    <thead>
                        <tr className="bg-[#FFF5EB] text-[#7D5A50]">
                            <th className="p-4 text-left">Customer ID</th>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">Phone</th>
                            <th className="p-4 text-left">Loyalty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={customer.id} className={`border-b border-[#F4A261]/20 transition ${index % 2 === 0 ? 'bg-white' : 'bg-[#FFF5EB]'} hover:bg-[#FFF2E7]`}>
                                <td className="p-4 font-mono text-sm">{customer.id}</td>
                                <td className="p-4 font-medium text-[#2D2D2D]">
                                    <Link to={`/customers/${customer.id}`} className="text-[#E76F51] hover:underline">
                                        {customer.name}
                                    </Link>
                                </td>
                                <td className="p-4 text-[#7D5A50]">{customer.email}</td>
                                <td className="p-4 text-[#7D5A50]">{customer.phone}</td>
                                <td className="p-4">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getLoyaltyColor(customer.loyalty)}`}>
                                        {customer.loyalty}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-[2rem] p-6 w-full max-w-md shadow-[0_20px_40px_rgba(231,111,81,0.12)]">
                        <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4">Tambah Pelanggan Baru</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-[#2D2D2D] mb-2">Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full rounded-[1.75rem] border border-[#F4A261]/30 bg-[#FFF5EB] p-3 outline-none transition focus:border-[#E76F51] focus:ring-2 focus:ring-[#E76F51]/20" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-[#2D2D2D] mb-2">Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full rounded-[1.75rem] border border-[#F4A261]/30 bg-[#FFF5EB] p-3 outline-none transition focus:border-[#E76F51] focus:ring-2 focus:ring-[#E76F51]/20" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-[#2D2D2D] mb-2">Phone</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full rounded-[1.75rem] border border-[#F4A261]/30 bg-[#FFF5EB] p-3 outline-none transition focus:border-[#E76F51] focus:ring-2 focus:ring-[#E76F51]/20" required />
                            </div>
                            <div className="mb-6">
                                <label className="block text-[#2D2D2D] mb-2">Loyalty</label>
                                <select name="loyalty" value={formData.loyalty} onChange={handleInputChange} className="w-full rounded-[1.75rem] border border-[#F4A261]/30 bg-[#FFF5EB] p-3 outline-none transition focus:border-[#E76F51] focus:ring-2 focus:ring-[#E76F51]/20">
                                    <option value="Bronze">Bronze</option>
                                    <option value="Silver">Silver</option>
                                    <option value="Gold">Gold</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-[1.75rem] bg-[#F4A261]/20 text-[#7D5A50]">Batal</button>
                                <button type="submit" className="px-4 py-2 rounded-[1.75rem] bg-[#E76F51] text-white shadow-lg shadow-[#E76F51]/20 hover:bg-[#cf5f49]">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
