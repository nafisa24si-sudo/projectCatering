// Zona 2: Business Logic Layer — User Service (CRUD Profiles)
import { supabase } from './supabase'

/**
 * Ambil semua data profil pelanggan
 * @returns {{ data: Array, error }}
 */
export async function getProfiles() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return { data: null, error: error.message }
  return { data, error: null }
}

/**
 * Ambil satu profil berdasarkan ID
 * @param {string} id
 * @returns {{ data: Object, error }}
 */
export async function getProfileById(id) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return { data: null, error: error.message }
  return { data, error: null }
}

/**
 * Tambah profil pelanggan baru
 * @param {{ full_name, email, phone, loyalty, address, company, notes }} profileData
 * @returns {{ data, error }}
 */
export async function createProfile(profileData) {
  const { data, error } = await supabase
    .from('profiles')
    .insert([profileData])
    .select()
    .single()
  if (error) return { data: null, error: error.message }
  return { data, error: null }
}

/**
 * Update profil pelanggan berdasarkan ID
 * @param {string} id
 * @param {Object} updates
 * @returns {{ data, error }}
 */
export async function updateProfile(id, updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) return { data: null, error: error.message }
  return { data, error: null }
}

/**
 * Hapus profil pelanggan berdasarkan ID
 * @param {string} id
 * @returns {{ error }}
 */
export async function deleteProfile(id) {
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', id)
  if (error) return { error: error.message }
  return { error: null }
}
