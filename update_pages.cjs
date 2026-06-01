const fs = require('fs');
const path = require('path');
const root = path.join('C:', 'Users', 'LENOVO', 'catering', 'src');
const files = {
  'pages/MenuCatering.jsx': `import './MenuCatering.css';

function MenuCatering() {
  const menuItems = [
    { id: 1, name: 'Paket Nasi Box', price: 'Rp 25,000', description: 'Nasi, ayam, sayur' },
    { id: 2, name: 'Paket Seafood', price: 'Rp 50,000', description: 'Udang, cumi, ikan' },
    { id: 3, name: 'Paket Vegetarian', price: 'Rp 30,000', description: 'Sayur-sayuran segar' },
  ];

  const handleAddMenu = () => {
    alert('Tambah menu baru');
  };

  const handleEdit = (id) => {
    alert('Edit menu ' + id);
  };

  const handleDelete = (id) => {
    alert('Hapus menu ' + id);
  };

  return (
    <div className="menu-catering">
      <div className="page-header">
        <div>
          <h2>Menu Catering</h2>
          <p>Kelola paket menu yang tersedia untuk pesanan catering.</p>
        </div>
        <button className="add-btn" onClick={handleAddMenu}>Tambah Menu</button>
      </div>

      <div className="menu-list">
        {menuItems.map(item => (
          <div key={item.id} className="menu-item">
            <div className="menu-details">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span className="price">{item.price}</span>
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(item.id)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuCatering;
`,
  'pages/MenuCatering.css': `.menu-catering {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.page-header h2 {
  margin: 0;
  color: #111827;
}

.page-header p {
  margin: 8px 0 0;
  color: #6b7280;
  font-size: 14px;
}

.add-btn {
  background-color: #0f766e;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: 600;
}

.add-btn:hover {
  background-color: #115e59;
}

.menu-list {
  display: grid;
  gap: 20px;
}

.menu-item {
  background: #ffffff;
  padding: 24px;
  border-radius: 24px;
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.menu-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-item h3 {
  margin: 0;
  color: #111827;
  font-size: 20px;
}

.menu-item p {
  margin: 0;
  color: #6b7280;
}

.price {
  font-weight: 700;
  color: #0f766e;
}

.actions {
  display: flex;
  gap: 12px;
}

.actions button {
  padding: 10px 16px;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s;
}

.actions button:hover {
  transform: translateY(-1px);
}

.actions button:first-child {
  background-color: #0d9488;
  color: white;
}

.actions button:last-child {
  background-color: #dc2626;
  color: white;
}
`,
  'pages/KeranjangBelanja.jsx': `import './KeranjangBelanja.css';

function KeranjangBelanja() {
  const carts = [
    { id: 1, customer: 'John Doe', items: ['Paket Nasi Box', 'Paket Seafood'], total: 'Rp 75,000' },
    { id: 2, customer: 'Jane Smith', items: ['Paket Vegetarian'], total: 'Rp 30,000' },
  ];

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

export default KeranjangBelanja;
`,
  'pages/KeranjangBelanja.css': `.keranjang-belanja {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
}

.page-header h2 {
  margin: 0;
  color: #111827;
}

.page-header p {
  margin: 8px 0 0;
  color: #6b7280;
  font-size: 14px;
}

.cart-list {
  display: grid;
  gap: 20px;
}

.cart-item {
  background: #ffffff;
  padding: 24px;
  border-radius: 24px;
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.08);
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.cart-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.cart-item h3 {
  margin: 0;
  color: #111827;
}

.cart-id {
  font-size: 14px;
  color: #6b7280;
}

.cart-item ul {
  margin: 0 0 12px 0;
  padding-left: 20px;
  color: #6b7280;
}

.total {
  font-weight: 700;
  color: #0f766e;
  display: block;
  margin-bottom: 10px;
}

.actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.actions button {
  padding: 12px 18px;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s;
}

.actions button:hover {
  transform: translateY(-1px);
}

.actions button:first-child {
  background-color: #0d9488;
  color: white;
}

.actions button:last-child {
  background-color: #dc2626;
  color: white;
}
`,
  'pages/RiwayatPembeli.jsx': `import './RiwayatPembeli.css';

function RiwayatPembeli() {
  const histories = [
    { id: 1, customer: 'John Doe', orderDate: '2023-10-01', total: 'Rp 75,000', status: 'Completed' },
    { id: 2, customer: 'Jane Smith', orderDate: '2023-10-02', total: 'Rp 30,000', status: 'Completed' },
    { id: 3, customer: 'Bob Johnson', orderDate: '2023-10-03', total: 'Rp 50,000', status: 'Pending' },
  ];

  return (
    <div className="riwayat-pembeli">
      <div className="page-header">
        <div>
          <h2>Riwayat Pembeli</h2>
          <p>Lihat semua pesanan yang sudah selesai dan yang masih pending.</p>
        </div>
      </div>
      <div className="table-card">
        <table className="history-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Order Date</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {histories.map(history => (
              <tr key={history.id}>
                <td>{history.id}</td>
                <td>{history.customer}</td>
                <td>{history.orderDate}</td>
                <td>{history.total}</td>
                <td className={history.status === 'Completed' ? 'completed' : 'pending'}>{history.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RiwayatPembeli;
`,
  'pages/RiwayatPembeli.css': `.riwayat-pembeli {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
}

.page-header h2 {
  margin: 0;
  color: #111827;
}

.page-header p {
  margin: 8px 0 0;
  color: #6b7280;
  font-size: 14px;
}

.table-card {
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.08);
  overflow: hidden;
}

.history-table {
  width: 100%;
  border-collapse: collapse;
}

.history-table th,
.history-table td {
  padding: 18px 16px;
  text-align: left;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
}

.history-table th {
  background-color: #f8f9fa;
  font-weight: 700;
  color: #111827;
}

.history-table tbody tr:nth-child(even) {
  background: #f8fafc;
}

.completed {
  color: #16a34a;
  font-weight: 700;
}

.pending {
  color: #f59e0b;
  font-weight: 700;
}

@media (max-width: 768px) {
  .history-table th,
  .history-table td {
    padding: 14px 12px;
  }
}
`
};

Object.entries(files).forEach(([relativePath, content]) => {
  const targetPath = path.join(root, relativePath);
  fs.writeFileSync(targetPath, content, 'utf8');
  console.log(`Updated ${targetPath}`);
});
