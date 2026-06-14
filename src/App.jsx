import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const MenuCatering = React.lazy(() => import('./pages/MenuCatering'));
const Keranjang = React.lazy(() => import('./pages/Keranjang'));
const Riwayat = React.lazy(() => import('./pages/Riwayat'));
const Customers = React.lazy(() => import('./pages/Customers'));
const CustomerDetail = React.lazy(() => import('./pages/CustomerDetail'));
const Orders = React.lazy(() => import('./pages/Orders'));
const Components = React.lazy(() => import('./pages/Components'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const Forgot = React.lazy(() => import('./pages/auth/Forgot'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
import Loading from './components/Loading';

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/menu" element={<MenuCatering />} />
            <Route path="/keranjang" element={<Keranjang />} />
            <Route path="/riwayat" element={<Riwayat />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<CustomerDetail />} />
            <Route path="/pesanan" element={<Orders />} />
            <Route path="/components" element={<Components />} />
            <Route path="/" element={<Dashboard />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
