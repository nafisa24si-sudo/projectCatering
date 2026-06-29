// Zona 2: Business Logic — Member Service
import { supabase } from './supabase'

// ── Konstanta tier ────────────────────────────────────────────────────────────
export const TIERS = {
  Bronze: { min: 0,    max: 1000, next: 'Silver', color: '#CD7F32', bg: '#FFF5EB', discount: 5 },
  Silver: { min: 1001, max: 2000, next: 'Gold',   color: '#A8A9AD', bg: '#F5F5F5', discount: 15 },
  Gold:   { min: 2001, max: 3000, next: null,      color: '#FFD700', bg: '#FFFDE7', discount: 30 },
}

export function getTierFromPoints(points) {
  if (points >= 2001) return 'Gold'
  if (points >= 1001) return 'Silver'
  return 'Bronze'
}

/**
 * Hitung poin dari transaksi dengan bonus streak:
 * - Base: 1 poin per Rp 10.000
 * - Streak bonus: +20% jika transaksi dalam 3 hari berturut-turut
 * - Streak bonus: +50% jika streak >= 7 hari
 */
export function calcPointsEarned(amount, streakDays = 0) {
  const base = Math.floor(amount / 10000)
  let multiplier = 1
  if (streakDays >= 7) multiplier = 1.5
  else if (streakDays >= 3) multiplier = 1.2
  return Math.floor(base * multiplier)
}

// ── Profile + poin ────────────────────────────────────────────────────────────

/** Ambil profil member yang sedang login */
export async function getMyProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) return { data: null, error: error.message }
  return { data, error: null }
}

/** Catat transaksi baru + update poin & loyalty user */
export async function recordTransaction(userId, amount, description = '') {
  // 1. Ambil profil saat ini
  const { data: profile, error: profileErr } = await getMyProfile(userId)
  if (profileErr) return { error: profileErr }

  const now = new Date()
  const lastTx = profile.last_transaction_at ? new Date(profile.last_transaction_at) : null
  const diffDays = lastTx ? Math.floor((now - lastTx) / 86400000) : 999

  // Hitung streak
  let newStreak = profile.streak_days ?? 0
  if (diffDays === 1) newStreak += 1        // transaksi hari berikutnya
  else if (diffDays === 0) newStreak = newStreak // hari yang sama, streak tidak naik
  else newStreak = 1                         // streak putus, reset ke 1

  // Hitung poin
  const pointsEarned = calcPointsEarned(amount, newStreak)
  const newPoints = (profile.points ?? 0) + pointsEarned
  const newLoyalty = getTierFromPoints(newPoints)
  const newTotalTx = (profile.total_transactions ?? 0) + 1

  // 2. Insert transaksi
  const { error: txErr } = await supabase
    .from('transactions')
    .insert([{ user_id: userId, amount, points_earned: pointsEarned, description }])
  if (txErr) return { error: txErr.message }

  // 3. Update profil
  const { error: updateErr } = await supabase
    .from('profiles')
    .update({
      points: newPoints,
      loyalty: newLoyalty,
      total_transactions: newTotalTx,
      last_transaction_at: now.toISOString(),
      streak_days: newStreak,
    })
    .eq('id', userId)
  if (updateErr) return { error: updateErr.message }

  return { data: { pointsEarned, newPoints, newLoyalty, newStreak }, error: null }
}

// ── Vouchers ──────────────────────────────────────────────────────────────────

/** Ambil semua voucher aktif */
export async function getAvailableVouchers() {
  const { data, error } = await supabase
    .from('vouchers')
    .select('*')
    .eq('is_active', true)
    .order('points_required', { ascending: true })
  if (error) return { data: null, error: error.message }
  return { data, error: null }
}

/** Ambil voucher yang sudah dimiliki user */
export async function getMyVouchers(userId) {
  const { data, error } = await supabase
    .from('member_vouchers')
    .select('*, vouchers(*)')
    .eq('user_id', userId)
    .order('redeemed_at', { ascending: false })
  if (error) return { data: null, error: error.message }
  return { data, error: null }
}

/** Tukar poin dengan voucher */
export async function redeemVoucher(userId, voucherId) {
  const { data: profile } = await getMyProfile(userId)
  if (!profile) return { error: 'Profil tidak ditemukan.' }

  const { data: voucher } = await supabase
    .from('vouchers')
    .select('*')
    .eq('id', voucherId)
    .single()
  if (!voucher) return { error: 'Voucher tidak ditemukan.' }

  // Validasi poin
  if ((profile.points ?? 0) < voucher.points_required)
    return { error: `Poin tidak cukup. Butuh ${voucher.points_required} poin.` }

  // Validasi tier
  const tierOrder = { Bronze: 1, Silver: 2, Gold: 3 }
  if (tierOrder[profile.loyalty] < tierOrder[voucher.min_loyalty])
    return { error: `Voucher ini hanya untuk member ${voucher.min_loyalty} ke atas.` }

  // Cek sudah dimiliki
  const { data: existing } = await supabase
    .from('member_vouchers')
    .select('id')
    .eq('user_id', userId)
    .eq('voucher_id', voucherId)
    .maybeSingle()
  if (existing) return { error: 'Voucher sudah pernah Anda ambil.' }

  // Insert member_voucher
  const { error: insertErr } = await supabase
    .from('member_vouchers')
    .insert([{ user_id: userId, voucher_id: voucherId }])
  if (insertErr) return { error: insertErr.message }

  // Kurangi poin user
  const { error: updateErr } = await supabase
    .from('profiles')
    .update({ points: (profile.points ?? 0) - voucher.points_required })
    .eq('id', userId)
  if (updateErr) return { error: updateErr.message }

  return { data: { voucher }, error: null }
}

/** Redeem kode voucher manual */
export async function redeemByCode(userId, code) {
  const { data: voucher, error } = await supabase
    .from('vouchers')
    .select('*')
    .eq('code', code.trim().toUpperCase())
    .eq('is_active', true)
    .maybeSingle()
  if (error || !voucher) return { error: 'Kode voucher tidak valid atau sudah tidak aktif.' }
  return redeemVoucher(userId, voucher.id)
}

/** Ambil riwayat transaksi user */
export async function getMyTransactions(userId) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(20)
  if (error) return { data: null, error: error.message }
  return { data, error: null }
}
