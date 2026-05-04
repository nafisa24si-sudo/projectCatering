import './Dashboard.css';

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
