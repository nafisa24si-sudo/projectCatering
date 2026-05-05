import './Header.css';

function Header() {
  const handleNotification = () => {
    alert('Notifikasi');
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="search-box">
          <input type="text" placeholder="Cari menu, pesanan..." />
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
          <div className="avatar">AU</div>
          <div className="user-info">
            <span>Admin User</span>
            <strong>admin@nekoshop.com</strong>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
