import "./Dashboard.css";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";

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

      <div className="dashboard-widgets">
        <section className="overview-card">
          <div className="overview-card__header">
            <h3>Dashboard Ringkas</h3>
          </div>
          <Tabs defaultValue="active-orders">
            <TabsList variant="line">
              <TabsTrigger value="active-orders">Pesanan Aktif</TabsTrigger>
              <TabsTrigger value="popular-menu">Menu Populer</TabsTrigger>
              <TabsTrigger value="reviews">Ulasan</TabsTrigger>
            </TabsList>

            <TabsContent value="active-orders" className="dashboard-tab-panel">
              <div className="order-progress-grid">
                <div className="progress-card">
                  <div className="progress-card-header">
                    <h4>Pesanan Dikirim</h4>
                    <span>80%</span>
                  </div>
                  <Progress value={80}>
                    <ProgressTrack>
                      <ProgressIndicator />
                    </ProgressTrack>
                  </Progress>
                </div>
                <div className="progress-card">
                  <div className="progress-card-header">
                    <h4>Pesanan Selesai</h4>
                    <span>100%</span>
                  </div>
                  <Progress value={100}>
                    <ProgressTrack>
                      <ProgressIndicator />
                    </ProgressTrack>
                  </Progress>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="popular-menu" className="dashboard-tab-panel">
              <div className="popular-menu-grid">
                <div className="menu-item">
                  <Avatar className="bg-slate-100 text-slate-700">
                    <AvatarFallback>NB</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="menu-item-name">Nasi Box</p>
                    <p className="menu-item-subtitle">Pilihan favorit pelanggan</p>
                  </div>
                </div>
                <div className="menu-item">
                  <Avatar className="bg-slate-100 text-slate-700">
                    <AvatarFallback>P</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="menu-item-name">Prasmanan</p>
                    <p className="menu-item-subtitle">Menu prasmanan lengkap</p>
                  </div>
                </div>
                <div className="menu-item">
                  <Avatar className="bg-slate-100 text-slate-700">
                    <AvatarFallback>SB</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="menu-item-name">Snack Box</p>
                    <p className="menu-item-subtitle">Camilan praktis untuk acara</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="dashboard-tab-panel">
              <div className="reviews-list">
                <article className="review-card">
                  <p className="review-text">“Pelayanan cepat dan makanannya enak. Sangat direkomendasikan untuk acara kantor.”</p>
                  <span className="review-author">- Lina, Jakarta</span>
                </article>
                <article className="review-card">
                  <p className="review-text">“Nasi box dan prasmanannya lengkap sekali. Pesan ulang pasti!”</p>
                  <span className="review-author">- Budi, Surabaya</span>
                </article>
                <article className="review-card">
                  <p className="review-text">“Snack box-nya sangat praktis dan rasanya enak. Pelanggan puas semua.”</p>
                  <span className="review-author">- Rina, Bandung</span>
                </article>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
