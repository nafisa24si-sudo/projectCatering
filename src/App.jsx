import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/Loading';

// Public
const Home         = React.lazy(() => import('./pages/guest/Home'));

// Protected
const Dashboard    = React.lazy(() => import('./pages/Dashboard'));
const MenuCatering = React.lazy(() => import('./pages/MenuCatering'));
const Keranjang    = React.lazy(() => import('./pages/Keranjang'));
const Riwayat      = React.lazy(() => import('./pages/Riwayat'));
const Customers    = React.lazy(() => import('./pages/Customers'));
const CustomerDetail = React.lazy(() => import('./pages/CustomerDetail'));
const Orders       = React.lazy(() => import('./pages/Orders'));
const Components   = React.lazy(() => import('./pages/Components'));
const Member       = React.lazy(() => import('./pages/Member'));

// Auth
const Login        = React.lazy(() => import('./pages/auth/Login'));
const Register     = React.lazy(() => import('./pages/auth/Register'));
const Forgot       = React.lazy(() => import('./pages/auth/Forgot'));
const NotFound     = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Public — landing page, bisa diakses tanpa login */}
            <Route path="/" element={<Home />} />

            {/* Protected — hanya bisa diakses jika sudah login */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/menu" element={<MenuCatering />} />
                <Route path="/keranjang" element={<Keranjang />} />
                <Route path="/riwayat" element={<Riwayat />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/customers/:id" element={<CustomerDetail />} />
                <Route path="/pesanan" element={<Orders />} />
                <Route path="/components" element={<Components />} />
                <Route path="/member" element={<Member />} />
              </Route>
            </Route>

            {/* Auth */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot" element={<Forgot />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
