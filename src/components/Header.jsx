import { FaSearch, FaBell, FaChartBar, FaCog, FaChevronDown } from 'react-icons/fa';

function Header() {
  const handleNotification = () => {
    alert('Notifikasi');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-20 flex h-20 items-center justify-between gap-4 border-b border-[#F1D5C8] bg-[#FFFFFF] px-6 shadow-sm lg:left-[280px] lg:px-8">
      {/* Search Bar */}
      <div className="flex-1">
        <div className="flex w-full max-w-[520px] items-center gap-3 rounded-xl border border-[#F1D5C8] bg-[#FFF8F5] px-4 py-2.5">
          <FaSearch className="text-[#8B4A2F]/60" />
          <input
            type="text"
            placeholder="Cari menu, pesanan, pelanggan..."
            className="w-full bg-transparent text-sm text-[#4B2E2A] outline-none placeholder:text-[#8B4A2F]/50"
          />
          <button type="button" className="rounded-lg bg-[#8B4A2F] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#D9895B]">
            Cari
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          {/* Notification */}
          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#F1D5C8] bg-[#FFF8F5] text-[#8B4A2F] transition hover:bg-[#F1D5C8]/50"
            onClick={handleNotification}
          >
            <FaBell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#D9895B] text-[10px] text-white font-bold">3</span>
          </button>
          
          {/* Statistics */}
          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#F1D5C8] bg-[#FFF8F5] text-[#8B4A2F] transition hover:bg-[#F1D5C8]/50">
            <FaChartBar className="w-5 h-5" />
          </button>
          
          {/* Settings */}
          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#F1D5C8] bg-[#FFF8F5] text-[#8B4A2F] transition hover:bg-[#F1D5C8]/50">
            <FaCog className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Dropdown */}
        <div className="flex items-center gap-3 rounded-xl border border-[#F1D5C8] bg-[#FFF8F5] px-3 py-2 cursor-pointer hover:bg-[#F1D5C8]/30 transition">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#8B4A2F] to-[#D9895B] text-white font-bold text-sm shadow-sm">
            AU
          </div>
          <div className="text-left leading-tight">
            <span className="block text-xs font-semibold text-[#4B2E2A]">Admin User</span>
            <span className="block text-[11px] text-[#8B4A2F]/70">admin@nekoshop.com</span>
          </div>
          <FaChevronDown className="text-[#8B4A2F]/60 w-3 h-3" />
        </div>
      </div>
    </header>
  );
}

export default Header;
