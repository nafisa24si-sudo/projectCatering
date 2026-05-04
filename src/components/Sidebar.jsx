import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-brand">
          Catering
          <span className="dot" />
        </div>
        <div className="sidebar-subtitle">Sistem Manajemen Catering</div>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <span className="icon">🏠</span>
          Dashboard
        </NavLink>
        <NavLink to="/menu" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <span className="icon">🛒</span>
          Menu Catering
        </NavLink>
        <NavLink to="/keranjang" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <span className="icon">🧾</span>
          Keranjang Belanja
        </NavLink>
        <NavLink to="/riwayat" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <span className="icon">📜</span>
          Riwayat Pembeli
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        Kelola menu catering dan pesanan pelanggan dengan efisien.
      </div>
    </div>
  );
}

export default Sidebar;
