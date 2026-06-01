import './Riwayat.css';
import { histories } from '../data/orderData';

function Riwayat() {
  const completedCount = histories.filter(item => item.status === 'Completed').length;
  const pendingCount = histories.filter(item => item.status !== 'Completed').length;

  return (
    <div className="riwayat-pembeli">
      <div className="page-header">
        <div>
          <h2>Riwayat Pembeli</h2>
          <p>Lihat semua pesanan yang sudah selesai dan yang masih pending.</p>
        </div>
      </div>

      <div className="status-grid">
        <div className="status-card status-card--success">
          <span>Selesai</span>
          <strong>{completedCount}</strong>
        </div>
        <div className="status-card status-card--warning">
          <span>Pending</span>
          <strong>{pendingCount}</strong>
        </div>
      </div>

      <div className="table-card">
        <div className="table-card__header">
          <h3>Ringkasan Pesanan</h3>
          <p>Data transaksi terakhir ditampilkan di bawah.</p>
        </div>
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
                <td>
                  <span className={`chip ${history.status === 'Completed' ? 'completed' : 'pending'}`}>
                    {history.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Riwayat;
