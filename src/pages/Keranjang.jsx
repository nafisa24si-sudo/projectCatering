import './Keranjang.css';
import { carts } from '../data/orderData';

function Keranjang() {
  const handleProcess = (id) => {
    alert('Proses keranjang ' + id);
  };

  const handleCancel = (id) => {
    alert('Batal keranjang ' + id);
  };

  return (
    <div className="keranjang-belanja">
      <div className="page-header">
        <div>
          <h2>Keranjang Belanja</h2>
          <p>Kelola pesanan yang sedang menunggu konfirmasi atau pengiriman.</p>
        </div>
      </div>
      <div className="cart-list">
        {carts.map(cart => (
          <div key={cart.id} className="cart-item">
            <div>
              <div className="cart-title">
                <h3>{cart.customer}</h3>
                <span className="cart-id">#{cart.id}</span>
              </div>
              <ul>
                {cart.items.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
              <span className="total">Total: {cart.total}</span>
            </div>
            <div className="actions">
              <button onClick={() => handleProcess(cart.id)}>Proses</button>
              <button onClick={() => handleCancel(cart.id)}>Batal</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Keranjang;
