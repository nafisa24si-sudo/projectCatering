const fs = require('fs');
const path = require('path');
const root = path.join('C:', 'Users', 'LENOVO', 'catering', 'src');
const files = {
  'components/Sidebar.css': `.sidebar {
  width: 260px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  padding: 32px 24px;
  background: #eefaf3;
  border-right: 1px solid rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sidebar-header {
  margin-bottom: 32px;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 30px;
  font-weight: 800;
  color: #0f766e;
}

.sidebar-brand .dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #34c38f;
}

.sidebar-subtitle {
  margin-top: 8px;
  font-size: 14px;
  color: #6b7280;
}

.sidebar-nav {
  display: grid;
  gap: 12px;
  margin-top: 24px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  border-radius: 18px;
  color: #0f5132;
  background: transparent;
  border: 1px solid transparent;
  transition: all 0.25s ease;
}

.nav-link:hover,
.nav-link.active {
  background: #d8faeb;
  border-color: #b7f0d4;
}

.nav-link span.icon {
  font-size: 18px;
}

.sidebar-footer {
  margin-top: auto;
  padding: 18px;
  border-radius: 20px;
  background: #d8f5e3;
  color: #0f5132;
  font-size: 14px;
  line-height: 1.5;
}
`,
  'components/Sidebar.jsx': `import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-brand">
          Sedap
          <span className="dot" />
        </div>
        <div className="sidebar-subtitle">Modern Admin Dashboard</div>
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
        Silakan kelola menu dan pesanan dengan mudah di sini.
      </div>
    </div>
  );
}

export default Sidebar;
`,
  'components/Header.jsx': `import './Header.css';

function Header() {
  const handleNotification = () => {
    alert('Notifikasi');
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="search-box">
          <input type="text" placeholder="Search here..." />
          <button type="button">🔍</button>
        </div>
      </div>
      <div className="header-right">
        <button className="icon-btn" onClick={handleNotification}>
          🔔
          <span className="badge">3</span>
        </button>
        <button className="icon-btn">📊</button>
        <button className="icon-btn">⚙️</button>
        <div className="user-profile">
          <div className="avatar">N</div>
          <div className="user-info">
            <span>Hello,</span>
            <strong>Nafisa Tahera</strong>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
`,
  'components/Header.css': `.header {
  height: 80px;
  position: fixed;
  top: 0;
  left: 260px;
  right: 0;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.08);
  z-index: 10;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-box {
  display: flex;
  align-items: center;
  background: #f8f9ff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 999px;
  padding: 8px 12px;
  gap: 10px;
}

.search-box input {
  border: none;
  background: transparent;
  outline: none;
  width: 220px;
  color: #1f2937;
}

.search-box button {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 16px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon-btn {
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
}

.icon-btn .badge {
  position: absolute;
  top: 6px;
  right: 6px;
  min-width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #f43f5e;
  color: #ffffff;
  font-size: 11px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-radius: 18px;
  background: #f8f9ff;
}

.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #34c38f;
  color: #ffffff;
  font-weight: 700;
}

.user-info span {
  display: block;
  font-size: 12px;
  color: #6b7280;
}

.user-info strong {
  display: block;
  font-size: 14px;
  color: #111827;
}
`,
  'pages/Dashboard.jsx': `import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-head">
        <div>
          <h2>Dashboard</h2>
          <p>Dashboard</p>
        </div>
      </div>

      <div className="stats-cards">
        <div className="card card-1">
          <div className="card-icon">🛒</div>
          <div>
            <p>Total Orders</p>
            <strong>75</strong>
          </div>
        </div>
        <div className="card card-2">
          <div className="card-icon">🚚</div>
          <div>
            <p>Total Delivered</p>
            <strong>175</strong>
          </div>
        </div>
        <div className="card card-3">
          <div className="card-icon">⛔</div>
          <div>
            <p>Total Canceled</p>
            <strong>40</strong>
          </div>
        </div>
        <div className="card card-4">
          <div className="card-icon">💰</div>
          <div>
            <p>Total Revenue</p>
            <strong>Rp 128.000</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
`,
  'pages/Dashboard.css': `.dashboard h2 {
  margin: 0;
  color: #111827;
  font-size: 32px;
}

.dashboard-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 28px;
}

.dashboard-head p {
  margin: 8px 0 0;
  color: #6b7280;
  font-size: 14px;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.card {
  padding: 24px;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.08);
  display: flex;
  align-items: center;
  gap: 18px;
}

.card-icon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  font-size: 22px;
}

.card-1 .card-icon {
  background: #d2f5f0;
}

.card-2 .card-icon {
  background: #d8e9ff;
}

.card-3 .card-icon {
  background: #ffe3e3;
}

.card-4 .card-icon {
  background: #fff3cd;
}

.card p {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}

.card strong {
  display: block;
  margin-top: 6px;
  font-size: 24px;
  color: #111827;
}

@media (max-width: 1024px) {
  .stats-cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .stats-cards {
    grid-template-columns: 1fr;
  }
}
`
};

Object.entries(files).forEach(([relativePath, content]) => {
  const targetPath = path.join(root, relativePath);
  fs.writeFileSync(targetPath, content, 'utf8');
  console.log(`Updated ${targetPath}`);
});
