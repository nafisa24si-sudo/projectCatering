import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  getMyProfile, getAvailableVouchers, getMyVouchers,
  redeemVoucher, redeemByCode, getMyTransactions,
  recordTransaction, TIERS, getTierFromPoints,
} from '../services/memberService'
import {
  Crown, Gift, Tag, History, Star, Zap, ChevronRight,
  CheckCircle2, XCircle, Copy, Ticket, TrendingUp, ShoppingBag,
} from 'lucide-react'
import PageHeader from '../components/PageHeader'

// ── Tier config ───────────────────────────────────────────────────────────────
const TIER_CONFIG = {
  Bronze: {
    label: 'Bronze',
    icon: '🥉',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    bar: 'bg-amber-500',
    gradient: 'from-amber-400 to-orange-400',
    discount: 5,
    range: '0 – 1.000',
  },
  Silver: {
    label: 'Silver',
    icon: '🥈',
    color: 'text-slate-600',
    bg: 'bg-slate-50',
    border: 'border-slate-300',
    bar: 'bg-slate-400',
    gradient: 'from-slate-400 to-slate-500',
    discount: 15,
    range: '1.001 – 2.000',
  },
  Gold: {
    label: 'Gold',
    icon: '🥇',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-300',
    bar: 'bg-yellow-400',
    gradient: 'from-yellow-400 to-amber-500',
    discount: 30,
    range: '2.001 – 3.000',
  },
}

// ── Helper ────────────────────────────────────────────────────────────────────
function calcProgress(points) {
  const tier = getTierFromPoints(points)
  if (tier === 'Bronze') return { pct: Math.min((points / 1000) * 100, 100), toNext: Math.max(1001 - points, 0), next: 'Silver' }
  if (tier === 'Silver') return { pct: Math.min(((points - 1001) / 999) * 100, 100), toNext: Math.max(2001 - points, 0), next: 'Gold' }
  return { pct: 100, toNext: 0, next: null }
}

function formatRp(n) { return 'Rp ' + n.toLocaleString('id-ID') }
function formatDate(d) { return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) }

// ── Sub-components ────────────────────────────────────────────────────────────

function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-2xl text-sm font-semibold transition-all
      ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
      {type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
      {msg}
    </div>
  )
}

function TierBadge({ tier }) {
  const cfg = TIER_CONFIG[tier] || TIER_CONFIG.Bronze
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
      {cfg.icon} {cfg.label}
    </span>
  )
}

function VoucherCard({ v, myLoyalty, myPoints, onRedeem, owned }) {
  const cfg = TIER_CONFIG[v.min_loyalty] || TIER_CONFIG.Bronze
  const tierOrder = { Bronze: 1, Silver: 2, Gold: 3 }
  const canRedeem = !owned && myPoints >= v.points_required && tierOrder[myLoyalty] >= tierOrder[v.min_loyalty]

  return (
    <div className={`relative rounded-3xl border-2 bg-white p-5 transition hover:shadow-lg hover:-translate-y-0.5
      ${owned ? 'border-green-300 bg-green-50/30' : canRedeem ? 'border-[#C96E4A]/40' : 'border-gray-100 opacity-70'}`}>
      {owned && (
        <div className="absolute top-3 right-3">
          <span className="rounded-full bg-green-100 border border-green-300 px-2.5 py-0.5 text-[11px] font-bold text-green-700">✓ Dimiliki</span>
        </div>
      )}
      {!owned && (
        <div className={`absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white bg-gradient-to-r ${cfg.gradient}`}>
          Min. {v.min_loyalty}
        </div>
      )}

      <div className="flex items-center gap-3 mb-3">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${cfg.bg} border ${cfg.border}`}>
          🎟️
        </div>
        <div>
          <p className="font-bold text-[#1a1a1a]">{v.name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{v.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div>
          <p className="text-2xl font-black text-[#C96E4A]">{v.discount_percent}%</p>
          <p className="text-[11px] text-gray-400">diskon</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-gray-700">{v.points_required} poin</p>
          <p className="text-[11px] text-gray-400">diperlukan</p>
        </div>
      </div>

      {!owned && (
        <button
          onClick={() => onRedeem(v.id)}
          disabled={!canRedeem}
          className={`mt-4 w-full rounded-2xl py-2.5 text-sm font-bold transition
            ${canRedeem
              ? 'bg-[#C96E4A] text-white hover:bg-[#A85535] hover:-translate-y-0.5 shadow-lg shadow-[#C96E4A]/20'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
          {!canRedeem && myPoints < v.points_required ? `Kurang ${v.points_required - myPoints} poin` : 'Tukar Voucher'}
        </button>
      )}
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'overview',     label: 'Keanggotaan',  icon: Crown },
  { id: 'vouchers',     label: 'Voucher',       icon: Gift },
  { id: 'redeem',       label: 'Kode Redeem',   icon: Tag },
  { id: 'history',      label: 'Riwayat',       icon: History },
]

export default function Member() {
  const { user } = useAuth()
  const [tab, setTab] = useState('overview')
  const [profile, setProfile] = useState(null)
  const [vouchers, setVouchers] = useState([])
  const [myVouchers, setMyVouchers] = useState([])
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const [redeemCode, setRedeemCode] = useState('')
  const [redeemLoading, setRedeemLoading] = useState(false)
  // Demo transaksi
  const [demoAmount, setDemoAmount] = useState('')
  const [demoLoading, setDemoLoading] = useState(false)

  const showToast = (msg, type = 'success') => setToast({ msg, type })

  const loadAll = useCallback(async () => {
    if (!user?.id) return
    setLoading(true)
    const [p, v, mv, tx] = await Promise.all([
      getMyProfile(user.id),
      getAvailableVouchers(),
      getMyVouchers(user.id),
      getMyTransactions(user.id),
    ])
    if (p.data) setProfile(p.data)
    if (v.data) setVouchers(v.data)
    if (mv.data) setMyVouchers(mv.data)
    if (tx.data) setTransactions(tx.data)
    setLoading(false)
  }, [user?.id])

  useEffect(() => { loadAll() }, [loadAll])

  const handleRedeemVoucher = async (voucherId) => {
    const { data, error } = await redeemVoucher(user.id, voucherId)
    if (error) { showToast(error, 'error'); return }
    showToast(`Voucher "${data.voucher.name}" berhasil diambil!`)
    loadAll()
  }

  const handleRedeemCode = async (e) => {
    e.preventDefault()
    if (!redeemCode.trim()) return
    setRedeemLoading(true)
    const { data, error } = await redeemByCode(user.id, redeemCode)
    setRedeemLoading(false)
    if (error) { showToast(error, 'error'); return }
    showToast(`Kode berhasil! Voucher "${data.voucher.name}" ditambahkan.`)
    setRedeemCode('')
    loadAll()
  }

  const handleDemoTransaction = async (e) => {
    e.preventDefault()
    const amount = parseInt(demoAmount.replace(/\D/g, ''), 10)
    if (!amount || amount < 10000) { showToast('Minimal transaksi Rp 10.000', 'error'); return }
    setDemoLoading(true)
    const { data, error } = await recordTransaction(user.id, amount, 'Pembelian paket catering')
    setDemoLoading(false)
    if (error) { showToast(error, 'error'); return }
    showToast(`+${data.pointsEarned} poin diperoleh! Total: ${data.newPoints} poin`)
    setDemoAmount('')
    loadAll()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#C96E4A] border-t-transparent" />
        <span className="ml-3 text-[#9A6651]">Memuat data member...</span>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-500">
        <span className="text-5xl mb-4">😕</span>
        <p className="font-semibold">Profil tidak ditemukan.</p>
        <p className="text-sm">Pastikan Anda sudah login dan profil sudah dibuat.</p>
      </div>
    )
  }

  const points = profile.points ?? 0
  const loyalty = profile.loyalty ?? 'Bronze'
  const tierCfg = TIER_CONFIG[loyalty] || TIER_CONFIG.Bronze
  const { pct, toNext, next } = calcProgress(points)
  const myVoucherIds = myVouchers.map(mv => mv.voucher_id)

  return (
    <div className="space-y-6 animate-fadeIn">
      <PageHeader
        title="Keanggotaan Saya"
        breadcrumb={[{ name: 'Dashboard', path: '/dashboard' }, { name: 'Member' }]}
      />

      {/* ── Hero Card ── */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${tierCfg.gradient} p-8 text-white shadow-xl`}>
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -left-8 -bottom-12 h-48 w-48 rounded-full bg-black/10" />

        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-5xl shadow-lg">
              {tierCfg.icon}
            </div>
            <div>
              <p className="text-sm text-white/70 font-medium">Selamat datang,</p>
              <h2 className="text-2xl font-black">{profile.full_name || profile.email}</h2>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="rounded-full bg-white/20 px-3 py-0.5 text-sm font-bold">Member {loyalty}</span>
                <span className="text-white/70 text-sm">· Diskon {tierCfg.discount}%</span>
              </div>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <p className="text-5xl font-black">{points.toLocaleString('id-ID')}</p>
            <p className="text-white/70 text-sm mt-1">Total Poin</p>
            <p className="text-white/60 text-xs mt-0.5">{profile.total_transactions ?? 0} transaksi</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative z-10 mt-6">
          <div className="flex items-center justify-between mb-1.5 text-xs text-white/80">
            <span className="font-semibold">{loyalty} · {tierCfg.range} poin</span>
            {next ? <span>{toNext} poin lagi ke {next}</span> : <span>🎉 Level Tertinggi!</span>}
          </div>
          <div className="h-3 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full rounded-full bg-white transition-all duration-1000"
              style={{ width: `${pct}%` }}
            />
          </div>
          {next && (
            <div className="flex justify-between mt-1 text-[11px] text-white/60">
              <span>{points.toLocaleString('id-ID')} poin</span>
              <span>Next: {next} {tierCfg.icon}</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Tier info cards ── */}
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(TIER_CONFIG).map(([tier, cfg]) => {
          const isActive = loyalty === tier
          return (
            <div key={tier} className={`rounded-2xl border-2 p-4 text-center transition
              ${isActive ? `border-[#C96E4A] ${cfg.bg} shadow-md` : 'border-gray-100 bg-white'}`}>
              <div className="text-3xl mb-2">{cfg.icon}</div>
              <p className={`font-bold text-sm ${isActive ? cfg.color : 'text-gray-500'}`}>{cfg.label}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{cfg.range}</p>
              <p className={`text-lg font-black mt-2 ${isActive ? 'text-[#C96E4A]' : 'text-gray-400'}`}>
                {cfg.discount}% diskon
              </p>
              {isActive && <p className="text-[10px] mt-1 font-bold text-[#C96E4A] uppercase tracking-widest">Level Anda</p>}
            </div>
          )
        })}
      </div>

      {/* ── Tab navigation ── */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setTab(id)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-2xl px-5 py-2.5 text-sm font-semibold transition
              ${tab === id ? 'bg-[#C96E4A] text-white shadow-lg shadow-[#C96E4A]/25' : 'bg-white text-gray-600 hover:bg-[#FFF5EB] border border-gray-100'}`}>
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════
          TAB: OVERVIEW
      ══════════════════════════════════ */}
      {tab === 'overview' && (
        <div className="space-y-6">
          {/* Penawaran tier aktif */}
          <div className={`rounded-3xl border-2 ${tierCfg.border} ${tierCfg.bg} p-6`}>
            <div className="flex items-center gap-3 mb-4">
              <Star className={`h-5 w-5 ${tierCfg.color}`} />
              <h3 className={`font-bold ${tierCfg.color}`}>Keuntungan Member {loyalty}</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: '🏷️', title: `Diskon ${tierCfg.discount}%`, desc: 'Untuk semua transaksi' },
                { icon: '🎟️', title: 'Akses Voucher Eksklusif', desc: `Voucher khusus ${loyalty}` },
                { icon: '⚡', title: 'Poin Bonus Streak', desc: 'Transaksi rutin = lebih banyak poin' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3 rounded-2xl bg-white/70 p-4">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <p className="font-semibold text-sm text-[#1a1a1a]">{title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Streak info */}
          <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-5 w-5 text-[#C96E4A]" />
              <h3 className="font-bold text-[#1a1a1a]">Bonus Poin Streak</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { streak: '1–2 hari',  bonus: '+0%',  desc: 'Poin normal' },
                { streak: '3–6 hari',  bonus: '+20%', desc: 'Streak aktif' },
                { streak: '7+ hari',   bonus: '+50%', desc: 'Super streak!' },
              ].map(({ streak, bonus, desc }) => (
                <div key={streak} className={`rounded-2xl p-4 text-center border ${streak === '7+ hari' ? 'border-[#C96E4A] bg-[#FFF5EB]' : 'border-gray-100 bg-gray-50'}`}>
                  <p className="text-sm font-bold text-gray-600">{streak}</p>
                  <p className={`text-xl font-black mt-1 ${streak === '7+ hari' ? 'text-[#C96E4A]' : 'text-gray-700'}`}>{bonus}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-gray-400 text-center">
              Streak Anda saat ini: <span className="font-bold text-[#C96E4A]">{profile.streak_days ?? 0} hari</span>
              {(profile.streak_days ?? 0) >= 3 && ' 🔥'}
            </p>
          </div>

          {/* Demo tambah transaksi */}
          <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <ShoppingBag className="h-5 w-5 text-[#C96E4A]" />
              <div>
                <h3 className="font-bold text-[#1a1a1a]">Simulasi Transaksi</h3>
                <p className="text-xs text-gray-400">Catat transaksi untuk mendapatkan poin (1 poin per Rp 10.000)</p>
              </div>
            </div>
            <form onSubmit={handleDemoTransaction} className="flex gap-3">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">Rp</span>
                <input
                  type="text"
                  value={demoAmount}
                  onChange={(e) => setDemoAmount(e.target.value.replace(/\D/g, ''))}
                  placeholder="50000"
                  className="w-full rounded-2xl border border-[#e8d5c8] bg-[#fdf8f5] py-3 pl-10 pr-4 text-sm outline-none focus:border-[#C96E4A] focus:ring-2 focus:ring-[#C96E4A]/15"
                />
              </div>
              <button type="submit" disabled={demoLoading}
                className="rounded-2xl bg-[#C96E4A] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#C96E4A]/25 transition hover:bg-[#A85535] disabled:opacity-60">
                {demoLoading ? '...' : '+ Poin'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          TAB: VOUCHERS
      ══════════════════════════════════ */}
      {tab === 'vouchers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">{vouchers.length} voucher tersedia</p>
            <p className="text-sm font-semibold text-[#C96E4A]">{points.toLocaleString('id-ID')} poin tersisa</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vouchers.map((v) => (
              <VoucherCard
                key={v.id}
                v={v}
                myLoyalty={loyalty}
                myPoints={points}
                onRedeem={handleRedeemVoucher}
                owned={myVoucherIds.includes(v.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          TAB: KODE REDEEM
      ══════════════════════════════════ */}
      {tab === 'redeem' && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-8 max-w-lg">
            <div className="text-center mb-6">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF5EB] text-4xl">🎟️</div>
              <h3 className="font-bold text-[#1a1a1a] text-lg">Masukkan Kode Voucher</h3>
              <p className="text-sm text-gray-500 mt-1">Masukkan kode voucher yang Anda miliki untuk mendapatkan diskon.</p>
            </div>
            <form onSubmit={handleRedeemCode} className="space-y-3">
              <input
                type="text"
                value={redeemCode}
                onChange={(e) => setRedeemCode(e.target.value.toUpperCase())}
                placeholder="Contoh: SILVER15"
                className="w-full rounded-2xl border border-[#e8d5c8] bg-[#fdf8f5] py-3.5 px-5 text-sm font-mono font-bold tracking-widest text-center uppercase outline-none focus:border-[#C96E4A] focus:ring-2 focus:ring-[#C96E4A]/15"
                maxLength={20}
              />
              <button type="submit" disabled={redeemLoading || !redeemCode.trim()}
                className="w-full rounded-2xl bg-[#C96E4A] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#C96E4A]/25 transition hover:bg-[#A85535] disabled:opacity-60">
                {redeemLoading ? 'Memverifikasi...' : 'Gunakan Kode'}
              </button>
            </form>
          </div>

          {/* Voucher yang sudah dimiliki */}
          {myVouchers.length > 0 && (
            <div>
              <h3 className="font-bold text-[#1a1a1a] mb-3">Voucher Saya ({myVouchers.length})</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {myVouchers.map((mv) => (
                  <div key={mv.id} className="rounded-2xl bg-white border-2 border-green-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-[#1a1a1a]">{mv.vouchers?.name}</span>
                      <span className="text-xs bg-green-100 text-green-700 rounded-full px-2 py-0.5 font-bold">
                        {mv.is_used ? 'Terpakai' : 'Aktif'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black text-[#C96E4A]">{mv.vouchers?.discount_percent}%</span>
                      <div className="flex items-center gap-1.5 rounded-xl bg-gray-50 px-3 py-1.5 text-xs font-mono font-bold text-gray-600 cursor-pointer hover:bg-gray-100 transition"
                        onClick={() => { navigator.clipboard.writeText(mv.vouchers?.code); showToast('Kode disalin!') }}>
                        {mv.vouchers?.code}
                        <Copy className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════
          TAB: RIWAYAT
      ══════════════════════════════════ */}
      {tab === 'history' && (
        <div className="rounded-3xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          {transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <History className="h-12 w-12 mb-3 opacity-30" />
              <p className="font-semibold">Belum ada riwayat transaksi</p>
              <p className="text-sm mt-1">Lakukan transaksi pertama Anda untuk mendapatkan poin!</p>
            </div>
          ) : (
            <div>
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-[#1a1a1a]">Riwayat Transaksi</h3>
                <TrendingUp className="h-5 w-5 text-[#C96E4A]" />
              </div>
              <div className="divide-y divide-gray-50">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFF5EB] text-lg">🛍️</div>
                      <div>
                        <p className="text-sm font-semibold text-[#1a1a1a]">{tx.description || 'Transaksi'}</p>
                        <p className="text-xs text-gray-400">{formatDate(tx.created_at)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#C96E4A]">+{tx.points_earned} poin</p>
                      <p className="text-xs text-gray-400">{formatRp(tx.amount)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
