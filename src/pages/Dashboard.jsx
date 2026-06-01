import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-head">
        <div>
          <h2>Dashboard</h2>
          <p>Welcome back! Here's what's happening with your store.</p>
        </div>
      </div>

      <div className="stats-cards">
        <div className="card card-revenue">
          <div className="card-icon">💵</div>
          <div>
            <p>Total Revenue</p>
            <strong>Rp 45,250,000</strong>
            <span className="card-change positive">+12.5%</span>
          </div>
        </div>
        <div className="card card-orders">
          <div className="card-icon">🛒</div>
          <div>
            <p>Total Orders</p>
            <strong>1,234</strong>
            <span className="card-change positive">+8.2%</span>
          </div>
        </div>
        <div className="card card-products">
          <div className="card-icon">📦</div>
          <div>
            <p>Total Products</p>
            <strong>567</strong>
            <span className="card-change positive">+3.1%</span>
          </div>
        </div>
        <div className="card card-customers">
          <div className="card-icon">👥</div>
          <div>
            <p>Total Customers</p>
            <strong>8,492</strong>
            <span className="card-change negative">-2.4%</span>
          </div>
        </div>
      </div>

      <div className="overview-grid">
        <section className="overview-card">
          <div className="overview-card__header">
            <h3>Sales Overview</h3>
          </div>
          <div className="chart-line">
            <div className="chart-grid" />
            <div className="chart-path">
              <div className="dot dot-1" />
              <div className="dot dot-2" />
              <div className="dot dot-3" />
              <div className="dot dot-4" />
              <div className="dot dot-5" />
              <div className="line line-1" />
              <div className="line line-2" />
              <div className="line line-3" />
              <div className="line line-4" />
            </div>
          </div>
          <div className="overview-meta">
            <span>Sales (Rp)</span>
            <strong>Rp 1,200,000</strong>
          </div>
        </section>

        <section className="overview-card overview-card--right">
          <div className="overview-card__header">
            <h3>Orders Overview</h3>
          </div>
          <div className="bar-chart">
            <div className="bar-group">
              <span>Jan</span>
              <div className="bar bar-1" />
            </div>
            <div className="bar-group">
              <span>Feb</span>
              <div className="bar bar-2" />
            </div>
            <div className="bar-group">
              <span>Mar</span>
              <div className="bar bar-3" />
            </div>
            <div className="bar-group">
              <span>Apr</span>
              <div className="bar bar-4" />
            </div>
            <div className="bar-group">
              <span>May</span>
              <div className="bar bar-5" />
            </div>
            <div className="bar-group">
              <span>Jun</span>
              <div className="bar bar-6" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
