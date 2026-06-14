import { NavLink } from 'react-router-dom';

function Sidebar() {
  const linkBase = 'flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm transition-all duration-200 ease-in-out';

  return (
    <div className="fixed left-0 top-0 w-[280px] min-h-screen flex flex-col justify-between px-6 py-7 bg-[#7c4129] text-[#f8efe5]">
      <div className="mb-8">
        <div className="flex items-center gap-3.5 text-xl font-extrabold uppercase tracking-[1px] text-[#ffe5d7]">
          Catering
          <span className="w-8 h-8 rounded-[6px] bg-[#e4b59d] grid place-items-center text-[#7c4129] font-extrabold text-lg">C</span>
        </div>
        <div className="mt-2 text-xs text-[#f4dfd5] leading-6">Platform Manajemen Catering</div>
      </div>

      <nav className="grid gap-2 mt-7">
        <NavLink to="/dashboard" className={({ isActive }) => `${linkBase} ${isActive ? 'text-[#5e2f1f] bg-[#e4b59d] font-semibold shadow-lg shadow-[#e4b59d]/30' : 'text-[#f2ddcf] hover:text-white hover:bg-[#9f593f]/80'}`}>
          {({ isActive }) => (
            <>
              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-[#f2ddcf]'}`} />
              Dashboard
            </>
          )}
        </NavLink>
        <NavLink to="/pesanan" className={({ isActive }) => `${linkBase} ${isActive ? 'text-[#5e2f1f] bg-[#e4b59d] font-semibold shadow-lg shadow-[#e4b59d]/30' : 'text-[#f2ddcf] hover:text-white hover:bg-[#9f593f]/80'}`}>
          {({ isActive }) => (
            <>
              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-[#f2ddcf]'}`} />
              Pesanan
            </>
          )}
        </NavLink>
        <NavLink to="/customers" className={({ isActive }) => `${linkBase} ${isActive ? 'text-[#5e2f1f] bg-[#e4b59d] font-semibold shadow-lg shadow-[#e4b59d]/30' : 'text-[#f2ddcf] hover:text-white hover:bg-[#9f593f]/80'}`}>
          {({ isActive }) => (
            <>
              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-[#f2ddcf]'}`} />
              Pelanggan
            </>
          )}
        </NavLink>
        <NavLink to="/components" className={({ isActive }) => `${linkBase} ${isActive ? 'text-[#5e2f1f] bg-[#e4b59d] font-semibold shadow-lg shadow-[#e4b59d]/30' : 'text-[#f2ddcf] hover:text-white hover:bg-[#9f593f]/80'}`}>
          {({ isActive }) => (
            <>
              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-[#f2ddcf]'}`} />
              Komponen
            </>
          )}
        </NavLink>
        <NavLink to="/menu" className={({ isActive }) => `${linkBase} ${isActive ? 'text-white bg-amber-500 font-semibold shadow-lg shadow-amber-500/30' : 'text-slate-300 hover:text-slate-50 hover:bg-white/10'}`}>
          {({ isActive }) => (
            <>
              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-slate-300'}`} />
              Menu Catering
            </>
          )}
        </NavLink>
      </nav>

      <div className="mt-auto p-4 rounded-xl bg-[#f2d4c5]/70 text-[#f8ede7] text-xs leading-6 text-center">
        Kelola menu catering, pelanggan, dan pesanan dalam tema terracotta yang hangat.
      </div>
    </div>
  );
}

export default Sidebar;
