import './Keranjang.css';
import { carts } from '../data/orderData';

function Keranjang() {
  const totalCustomers = carts.length;
  const totalItems = carts.reduce((sum, cart) => sum + cart.items.length, 0);

  const handleProcess = (id) => alert('Proses keranjang ' + id);
  const handleCancel = (id) => alert('Batal keranjang ' + id);

  return (
    <div className="keranjang-belanja">
      <div className="page-header">
        <div>
          <h2>Keranjang Belanja</h2>
          <p>Kelola pesanan yang sedang menunggu konfirmasi atau pengiriman.</p>
        </div>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <span className="summary-title">Pesanan Aktif</span>
          <strong>{totalCustomers}</strong>
        </div>
        <div className="summary-card">
          <span className="summary-title">Item dalam Keranjang</span>
          <strong>{totalItems}</strong>
        </div>
      </div>

      <div className="cart-list">
        {carts.map(cart => (
          <div key={cart.id} className="cart-item">
            <div className="cart-item__header">
              <div>
                <h3>{cart.customer}</h3>
                <span className="cart-id">#{cart.id}</span>
              </div>
              <span className="cart-status">Menunggu</span>
            </div>
            <ul>
              {cart.items.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
            <div className="cart-footer">
              <span className="total">Total: {cart.total}</span>
              <div className="actions">
                <button className="btn-primary" onClick={() => handleProcess(cart.id)}>Proses</button>
                <button className="btn-secondary" onClick={() => handleCancel(cart.id)}>Batal</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Keranjang;
