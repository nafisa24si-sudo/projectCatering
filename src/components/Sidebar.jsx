import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaClipboardList, 
  FaUsers, 
  FaCrown, 
  FaBook, 
  FaUtensils, 
  FaBell, 
  FaChartBar, 
  FaCog 
} from 'react-icons/fa';

function Sidebar() {
  const linkBase = 'flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm transition-all duration-300 ease-in-out';
  const activeClass = 'text-white bg-[#8B4A2F] font-semibold shadow-lg shadow-[#8B4A2F]/30';
  const inactiveClass = 'text-[#4B2E2A] hover:bg-[#F1D5C8]/50 hover:text-[#8B4A2F]';

  const navItem = (to, icon, label) => (
    <NavLink to={to} className={({ isActive }) => `${linkBase} ${isActive ? activeClass : inactiveClass}`}>
      {({ isActive }) => (
        <>
          {icon}
          <span>{label}</span>
        </>
      )}
    </NavLink>
  );

  return (
    <div className="fixed left-0 top-0 w-[280px] min-h-screen flex flex-col justify-between px-5 py-7 bg-[#FFF8F5] text-[#4B2E2A] border-r border-[#F1D5C8] z-30">
      <div>
        {/* Brand Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <img 
              src="/sajian-kita-logo.svg" 
              alt="Sajian Kita"
              className="w-14 h-14 object-contain"
            />
            <div>
              <div className="text-xl font-bold tracking-tight text-[#4B2E2A]">SAJIAN KITA</div>
              <div className="text-xs text-[#8B4A2F]/70">Platform Manajemen Catering</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="grid gap-2">
          {navItem('/dashboard', <FaHome className="w-5 h-5" />, 'Dashboard')}
          {navItem('/pesanan', <FaClipboardList className="w-5 h-5" />, 'Pesanan')}
          {navItem('/customers', <FaUsers className="w-5 h-5" />, 'Pelanggan')}
          {navItem('/menu', <FaUtensils className="w-5 h-5" />, 'Menu Catering')}
          
          {/* Menu Member & Loyalti */}
          <NavLink to="/member" className={({ isActive }) =>
            `${linkBase} ${isActive ? activeClass : inactiveClass}`}>
            {({ isActive }) => (
              <>
                <FaCrown className={`w-5 h-5 ${isActive ? 'text-yellow-300' : ''}`} />
                <span>Member & Loyalti</span>
              </>
            )}
          </NavLink>

          {navItem('/components', <FaBook className="w-5 h-5" />, 'Komponen')}
        </nav>

        {/* Secondary Nav */}
        <div className="mt-10 pt-6 border-t border-[#F1D5C8]">
          <div className="grid gap-2">
            <div className={`${linkBase} ${inactiveClass}`}>
              <FaBell className="w-5 h-5" />
              <span>Notifikasi</span>
            </div>
            <div className={`${linkBase} ${inactiveClass}`}>
              <FaChartBar className="w-5 h-5" />
              <span>Statistik</span>
            </div>
            <div className={`${linkBase} ${inactiveClass}`}>
              <FaCog className="w-5 h-5" />
              <span>Pengaturan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Card */}
      <div className="mt-8 p-5 rounded-2xl bg-[#F1D5C8]/30 border border-[#F1D5C8]">
        <p className="text-xs text-[#4B2E2A]/80 leading-relaxed">
          Kelola menu catering, pelanggan, dan pesanan dalam tema terracotta yang hangat.
        </p>
        <div className="mt-4 -mx-5 -mb-5 overflow-hidden rounded-b-2xl">
          <img 
            src="https://images.unsplash.com/photo-1546069101992-bc8ea9e9982d?w=400&h=200&fit=crop" 
            alt="Food" 
            className="w-full h-36 object-cover opacity-80"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
