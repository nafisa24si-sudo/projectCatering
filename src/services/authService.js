// Zona 2: Business Logic Layer — Auth Service
import { supabase } from './supabase'

/**
 * Login dengan email dan password
 * @param {string} email
 * @param {string} password
 * @returns {{ data, error }}
 */
export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { data: null, error: error.message }
  return { data, error: null }
}

/**
 * Registrasi user baru
 * @param {string} email
 * @param {string} password
 * @param {{ full_name: string, phone: string }} meta
 * @returns {{ data, error }}
 */
export async function register(email, password, { full_name, phone }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name, phone },
    },
  })
  if (error) return { data: null, error: error.message }
  return { data, error: null }
}

/**
 * Logout user yang sedang aktif
 * @returns {{ error }}
 */
export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) return { error: error.message }
  return { error: null }
}

/**
 * Ambil session yang sedang aktif
 * @returns {{ data, error }}
 */
export async function getSession() {
  const { data, error } = await supabase.auth.getSession()
  if (error) return { data: null, error: error.message }
  return { data, error: null }
}
