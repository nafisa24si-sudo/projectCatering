// Zona 2: Business Logic Layer — Auth Context (Global Session State)
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../services/supabase'
import { login, register, logout, getSession } from '../services/authService'

const AuthContext = createContext(null)

/**
 * Custom hook untuk mengakses AuthContext
 */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth harus digunakan di dalam AuthProvider')
  return ctx
}

/**
 * Provider yang membungkus seluruh app dan menyediakan state auth global
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cek session yang sudah ada saat pertama kali mount
    getSession().then(({ data }) => {
      setSession(data?.session ?? null)
      setUser(data?.session?.user ?? null)
      setLoading(false)
    })

    // Subscribe ke perubahan auth state (login/logout/refresh token)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  /**
   * Login dengan email & password
   */
  async function signIn(email, password) {
    const result = await login(email, password)
    return result
  }

  /**
   * Registrasi user baru
   */
  async function signUp(email, password, meta) {
    const result = await register(email, password, meta)
    return result
  }

  /**
   * Logout
   */
  async function signOut() {
    const result = await logout()
    return result
  }

  const value = { user, session, loading, signIn, signUp, signOut }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
