import './Riwayat.css';
import { histories } from '../data/orderData';

function Riwayat() {

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

export default Riwayat;
