import {
    FaHome,
    FaShoppingBag,
    FaUsers,
    FaExclamationCircle,
    FaPlus,
    FaPuzzlePiece,
    FaUtensils,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-[1.75rem] p-4 space-x-3 text-sm font-semibold transition-all duration-300 ${
            isActive
                ? "bg-[#FFE7DC] text-[#E76F51] shadow-lg"
                : "text-[#2D2D2D] hover:text-[#E76F51] hover:bg-[#F4A261]/20"
        }`;

    return (
        <div className="flex min-h-screen w-80 flex-col bg-[#FFF5EB] border-r border-[#F4A261]/20 shadow-sm">
            <div className="flex flex-col gap-2 px-6 py-7 border-b border-[#F4A261]/20 items-center">
                <img src="/catering-logo.svg" alt="CateringHub" className="w-24 h-24" />
                <span className="text-xs font-medium text-[#7D5A50] text-center">Platform Manajemen Catering</span>
            </div>

            <div className="flex-1 px-6 py-8">
                <ul className="space-y-3">
                    <li>
                        <NavLink to="/" className={menuClass}>
                            <FaHome className="text-xl" />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/orders" className={menuClass}>
                            <FaShoppingBag className="text-xl" />
                            <span>Pesanan</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/customers" className={menuClass}>
                            <FaUsers className="text-xl" />
                            <span>Pelanggan</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/components" className={menuClass}>
                            <FaPuzzlePiece className="text-xl" />
                            <span>Komponen</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/catering-menus" className={menuClass}>
                            <FaUtensils className="text-xl" />
                            <span>Menu Catering</span>
                        </NavLink>
                    </li>
                    <li className="pt-4 mt-4 border-t border-[#F4A261]/20">
                        <div className="text-xs uppercase tracking-[0.3em] text-[#7D5A50] px-4">Error Pages</div>
                    </li>
                    <li>
                        <NavLink to="/400" className={menuClass}>
                            <FaExclamationCircle className="text-xl" />
                            <span>Error 400</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/401" className={menuClass}>
                            <FaExclamationCircle className="text-xl" />
                            <span>Error 401</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/403" className={menuClass}>
                            <FaExclamationCircle className="text-xl" />
                            <span>Error 403</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className="px-6 py-6 border-t border-[#F4A261]/20">
                <div className="rounded-[1.75rem] bg-[#F4A261]/15 p-5 shadow-md mb-5">
                    <p className="text-sm text-[#7D5A50]">Kelola daftar menu Anda dengan nuansa terracotta.</p>
                    <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-[1.75rem] bg-[#E76F51] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#E76F51]/20 transition hover:bg-[#cf5f49]">
                        <FaPlus className="text-sm" />
                        Tambah Menu
                    </button>
                </div>
                <div>
                    <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-[#7D5A50]">Sistem Katering</span>
                    <p className="mt-1 text-[11px] text-[#7D5A50]">© 2025 Hak Cipta Dilindungi</p>
                </div>
            </div>
        </div>
    );
}
