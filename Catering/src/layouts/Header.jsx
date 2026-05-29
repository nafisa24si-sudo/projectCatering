import { FaSearch } from "react-icons/fa";
import { AiOutlineBell, AiOutlineAreaChart, AiOutlineSetting } from "react-icons/ai";

export default function Header() {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between p-6 bg-[#FFF5EB] shadow-md rounded-[2rem] animate-slideInDown">
            <div className="flex flex-1 items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#F4A261]/20 text-[#E76F51] shadow-sm">
                    <FaSearch className="text-lg" />
                </div>
                <input
                    className="border border-[#F4A261]/40 p-3 bg-white w-full rounded-[2rem] outline-none transition duration-300 focus:border-[#E76F51] focus:ring-2 focus:ring-[#E76F51]/20"
                    type="text"
                    placeholder="Cari menu atau pesanan..."
                />
            </div>

            <div className="flex items-center gap-3 justify-end">
                <div className="relative p-3 bg-white rounded-3xl text-[#E76F51] shadow-sm border border-[#F4A261]/30 cursor-pointer transition duration-300 hover:bg-[#FFF2E7] hover:scale-105">
                    <AiOutlineBell className="text-xl" />
                    <span className="absolute -top-1 -right-1 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-[#E76F51] px-1.5 text-xs font-semibold text-white">8</span>
                </div>
                <div className="p-3 bg-white rounded-3xl text-[#E76F51] shadow-sm border border-[#F4A261]/30 cursor-pointer transition duration-300 hover:bg-[#FFF2E7] hover:scale-105">
                    <AiOutlineAreaChart className="text-xl" />
                </div>
                <div className="p-3 bg-white rounded-3xl text-[#E76F51] shadow-sm border border-[#F4A261]/30 cursor-pointer transition duration-300 hover:bg-[#FFF2E7] hover:scale-105">
                    <AiOutlineSetting className="text-xl" />
                </div>
                <div className="flex items-center gap-3 rounded-[2rem] border border-[#F4A261]/30 bg-white px-4 py-2 shadow-sm">
                    <div className="text-sm text-[#7D5A50]">
                        <p className="text-xs uppercase tracking-[0.2em] text-[#B07B64]">Selamat datang</p>
                        <p className="font-semibold text-[#2D2D2D]">Nafisa</p>
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                        className="h-12 w-12 rounded-full border-2 border-[#E76F51]/40"
                        alt="Profile"
                    />
                </div>
            </div>
        </div>
    );
}
