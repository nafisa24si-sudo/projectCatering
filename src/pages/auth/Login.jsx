import { useState } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const successMessage = location.state?.message || '';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (error) setError('');
  };

  const validate = () => {
    if (!form.email.trim()) return 'Email wajib diisi.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Format email tidak valid.';
    if (!form.password) return 'Kata sandi wajib diisi.';
    if (form.password.length < 6) return 'Kata sandi minimal 6 karakter.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    setError('');
    const { error: authError } = await signIn(form.email.trim(), form.password);
    if (authError) {
      setError(
        authError.includes('Invalid login credentials') ? 'Email atau kata sandi salah.' :
        authError.includes('Email not confirmed') ? 'Email belum dikonfirmasi.' : authError
      );
      setLoading(false);
      return;
    }
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="relative min-h-screen bg-[#faf9f7] flex flex-col overflow-hidden">

      {/* ═══════════════════════════════════════
          BACKGROUND LAYER — foto dekoratif
      ═══════════════════════════════════════ */}

      {/* Kiri atas — foto besar miring */}
      <div className="pointer-events-none absolute -left-16 -top-10 z-0 h-[340px] w-[300px] rotate-[-8deg] overflow-hidden rounded-[2.5rem] shadow-2xl opacity-90">
        <img src="/food-scatter.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#faf9f7]/40" />
      </div>

      {/* Kiri bawah — foto medium miring berlawanan */}
      <div className="pointer-events-none absolute -left-8 bottom-16 z-0 h-[260px] w-[240px] rotate-[6deg] overflow-hidden rounded-[2rem] shadow-xl opacity-85">
        <img src="/food-bottom-left.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tl from-transparent to-[#faf9f7]/30" />
      </div>

      {/* Kanan atas — foto besar miring */}
      <div className="pointer-events-none absolute -right-10 -top-8 z-0 h-[320px] w-[280px] rotate-[7deg] overflow-hidden rounded-[2.5rem] shadow-2xl opacity-90">
        <img src="/food-right-top.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-[#faf9f7]/40" />
      </div>

      {/* Kanan tengah — foto medium */}
      <div className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/4 z-0 h-[240px] w-[220px] rotate-[-5deg] overflow-hidden rounded-[2rem] shadow-xl opacity-80">
        <img src="/food-right-bottom.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#faf9f7]/30" />
      </div>

      {/* Kanan bawah — foto kecil */}
      <div className="pointer-events-none absolute right-20 bottom-8 z-0 h-[180px] w-[160px] rotate-[4deg] overflow-hidden rounded-[1.5rem] shadow-lg opacity-75">
        <img src="/food-top-center.jpg" alt="" className="h-full w-full object-cover" />
      </div>

      {/* Kiri tengah — foto kecil tambahan */}
      <div className="pointer-events-none absolute left-16 top-1/2 -translate-y-1/2 z-0 h-[180px] w-[160px] rotate-[-3deg] overflow-hidden rounded-[1.5rem] shadow-lg opacity-70">
        <img src="/food-left.jpg" alt="" className="h-full w-full object-cover" />
      </div>

      {/* Overlay blur ringan di tengah agar form tetap terbaca */}
      <div className="pointer-events-none absolute inset-0 z-10"
        style={{ background: 'radial-gradient(ellipse 55% 70% at 50% 50%, rgba(250,249,247,0.92) 40%, rgba(250,249,247,0.55) 75%, transparent 100%)' }} />

      {/* ═══════════════════════════════════════
          FOREGROUND — logo + heading + form
      ═══════════════════════════════════════ */}

      {/* Logo pojok kiri atas */}
      <div className="absolute top-6 left-8 z-30 flex items-center gap-2.5">
        <img src="/sajian-kita-logo.svg" alt="Sajian Kita"
          className="h-14 w-14 object-contain" />
        <div className="leading-tight">
          <p className="text-sm font-bold text-[#3D1F0D]">Sajian Kita</p>
          <p className="text-[10px] text-[#9A6651] tracking-widest uppercase">Catering</p>
        </div>
      </div>

      {/* Konten utama */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-4 py-24">

        {/* Heading */}
        <div className="mb-7 text-center">
          <h1 className="text-6xl font-black tracking-tight text-[#1a1a1a] drop-shadow-sm">Login</h1>
          <p className="mt-2.5 text-sm text-[#7a6560]">
            Masuk ke{' '}
            <span className="font-semibold text-[#C96E4A]">Sajian Kita Catering</span>
            {' '}— Lezat · Higienis · Terpercaya
          </p>
        </div>

        {/* Card form */}
        <div className="w-full max-w-sm rounded-3xl bg-white/80 px-8 py-8 shadow-[0_8px_48px_rgba(201,110,74,0.15)] ring-1 ring-[#C96E4A]/10 backdrop-blur-md">

          {successMessage && (
            <div className="mb-5 flex items-center gap-2 rounded-2xl bg-green-50 border border-green-200 px-4 py-3 text-xs text-green-700">
              <span className="text-green-500 text-base">✓</span> {successMessage}
            </div>
          )}
          {error && (
            <div className="mb-5 flex items-center gap-2 rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-xs text-red-600">
              <span className="text-red-400 text-base">!</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#3D1F0D] pl-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C96E4A]/50 transition group-focus-within:text-[#C96E4A]" />
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="nama@email.com"
                  className="w-full rounded-2xl border border-[#e8d5c8] bg-[#fdf8f5] py-3 pl-10 pr-4 text-sm text-gray-800 placeholder-[#c4a090] outline-none transition focus:border-[#C96E4A] focus:bg-white focus:ring-2 focus:ring-[#C96E4A]/15"
                  autoComplete="email" required />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between pl-1">
                <label className="text-xs font-semibold text-[#3D1F0D]">Kata Sandi</label>
                <NavLink to="/forgot" className="text-[11px] text-[#C96E4A] hover:underline font-medium">Lupa password?</NavLink>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C96E4A]/50 transition group-focus-within:text-[#C96E4A]" />
                <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange}
                  placeholder="Minimal 6 karakter"
                  className="w-full rounded-2xl border border-[#e8d5c8] bg-[#fdf8f5] py-3 pl-10 pr-10 text-sm text-gray-800 placeholder-[#c4a090] outline-none transition focus:border-[#C96E4A] focus:bg-white focus:ring-2 focus:ring-[#C96E4A]/15"
                  autoComplete="current-password" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#C96E4A]/50 hover:text-[#C96E4A] transition" tabIndex={-1}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember */}
            <label className="flex items-center gap-2 cursor-pointer pl-1">
              <input type="checkbox" className="h-3.5 w-3.5 rounded accent-[#C96E4A]" />
              <span className="text-xs text-[#9A6651]">Ingat saya</span>
            </label>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="group relative w-full overflow-hidden rounded-2xl bg-[#C96E4A] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#C96E4A]/35 transition-all duration-300 hover:bg-[#A85535] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#C96E4A]/30 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed">
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Memeriksa...</>
                ) : 'MASUK'}
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </form>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-[#e8d5c8]" />
            <span className="text-xs text-[#c4a090]">atau</span>
            <div className="flex-1 h-px bg-[#e8d5c8]" />
          </div>

          <p className="mt-4 text-center text-xs text-[#9A6651]">
            Belum punya akun?{' '}
            <NavLink to="/register" className="font-bold text-[#C96E4A] hover:underline">Daftar sekarang →</NavLink>
          </p>
        </div>

        {/* Badge kepercayaan */}
        <div className="mt-6 flex items-center gap-4 text-[11px] text-[#9A6651]">
          {['🔒 Aman & Terenkripsi', '✓ 2.400+ Pelanggan', '⭐ Rating 4.9/5'].map((b) => (
            <span key={b} className="rounded-full bg-white/70 px-3 py-1 shadow-sm ring-1 ring-[#C96E4A]/10">{b}</span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-20 border-t border-[#e8d5c8]/60 bg-white/70 backdrop-blur-sm px-8 py-4 flex items-center justify-between text-[11px] text-[#b09080]">
        <div className="flex gap-5">
          {['Beranda', 'Menu', 'Bantuan', 'Kontak'].map((item) => (
            <span key={item} className="cursor-pointer hover:text-[#C96E4A] transition">{item}</span>
          ))}
        </div>
        <span>© 2026 Sajian Kita Catering</span>
      </div>
    </div>
  );
}
