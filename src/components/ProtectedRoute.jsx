// Zona 1: Presentation Layer — Protected Route Guard
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Loading from './Loading'

/**
 * Membungkus route yang memerlukan autentikasi.
 * - Loading  → tampilkan spinner
 * - Tidak ada session → redirect ke /login
 * - Ada session → render halaman
 */
export default function ProtectedRoute() {
  const { session, loading } = useAuth()

  if (loading) return <Loading />
  if (!session) return <Navigate to="/login" replace />
  return <Outlet />
}
