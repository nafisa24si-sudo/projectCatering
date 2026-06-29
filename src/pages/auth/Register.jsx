import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, CheckCircle2, Circle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

function PasswordStrength({ password }) {
  const checks = [
    { label: 'Min. 6 karakter', ok: password.length >= 6 },
    { label: 'Huruf besar', ok: /[A-Z]/.test(password) },
    { label: 'Angka', ok: /[0-9]/.test(password) },
  ];
  if (!password) return null;
  return (
    <div className="mt-1.5 flex gap-3 flex-wrap">
      {checks.map(({ label, ok }) => (
        <div key={label} className="flex items-center gap-1">
          {ok ? <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
               : <Circle className="h-3 w-3 text-gray-300 flex-shrink-0" />}
          <span className={`text-[11px] transition ${ok ? 'text-green-600' : 'text-gray-400'}`}>{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (error) setError('');
  };

  const validate = () => {
    if (!form.name.trim() || form.name.length < 3) return 'Nama minimal 3 karakter.';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Format email tidak valid.';
    if (!form.password || form.password.length < 6) return 'Password minimal 6 karakter.';
    if (!/(?=.*[A-Z])(?=.*[0-9])/.test(form.password)) return 'Password harus mengandung huruf besar dan angka.';
    if (form.password !== form.confirmPassword) return 'Konfirmasi password tidak cocok.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    setError('');
    const { error: authError } = await signUp(form.email.trim(), form.password, { full_name: form.name.trim(), phone: '' });
    if (authError) {
      setError(authError.includes('User already registered') ? 'Email sudah terdaftar.' : authError);
      setLoading(false);
      return;
    }
    navigate('/login', { replace: true, state: { message: 'Registrasi berhasil! Silakan login.' } });
  };

  const inputClass = 'w-full rounded-2xl border border-[#e8d5c8] bg-[#fdf8f5] py-3 pl-10 pr-4 text-sm text-gray-800 placeholder-[#c4a090] outline-none transition focus:border-[#C96E4A] focus:bg-white focus:ring-2 focus:ring-[#C96E4A]/15';

  return (
    <div className="relative min-h-screen bg-[#faf9f7] flex flex-col overflow-hidden">

      {/* ═══════════════ FOTO DEKORATIF ═══════════════ */}

      {/* Kiri atas */}
      <div className="pointer-events-none absolute -left-14 -top-8 z-0 h-[300px] w-[260px] rotate-[-7deg] overflow-hidden rounded-[2.5rem] shadow-2xl opacity-90">
        <img src="/food-top-center.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#faf9f7]/40" />
      </div>

      {/* Kiri bawah */}
      <div className="pointer-events-none absolute -left-6 bottom-12 z-0 h-[250px] w-[220px] rotate-[5deg] overflow-hidden rounded-[2rem] shadow-xl opacity-85">
        <img src="/food-left.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-[#faf9f7]/30" />
      </div>

      {/* Kiri tengah */}
      <div className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/3 z-0 h-[170px] w-[150px] rotate-[-4deg] overflow-hidden rounded-[1.5rem] shadow-lg opacity-70">
        <img src="/food-scatter.jpg" alt="" className="h-full w-full object-cover" />
      </div>

      {/* Kanan atas */}
      <div className="pointer-events-none absolute -right-12 -top-6 z-0 h-[310px] w-[270px] rotate-[8deg] overflow-hidden rounded-[2.5rem] shadow-2xl opacity-90">
        <img src="/food-right-top.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-[#faf9f7]/40" />
      </div>

      {/* Kanan tengah */}
      <div className="pointer-events-none absolute -right-8 top-[45%] z-0 h-[230px] w-[200px] rotate-[-6deg] overflow-hidden rounded-[2rem] shadow-xl opacity-80">
        <img src="/food-right-bottom.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#faf9f7]/30" />
      </div>

      {/* Kanan bawah */}
      <div className="pointer-events-none absolute right-16 bottom-6 z-0 h-[170px] w-[150px] rotate-[3deg] overflow-hidden rounded-[1.5rem] shadow-lg opacity-75">
        <img src="/food-bottom-left.jpg" alt="" className="h-full w-full object-cover" />
      </div>

      {/* Radial overlay tengah */}
      <div className="pointer-events-none absolute inset-0 z-10"
        style={{ background: 'radial-gradient(ellipse 58% 75% at 50% 50%, rgba(250,249,247,0.93) 38%, rgba(250,249,247,0.55) 72%, transparent 100%)' }} />

      {/* ═══════════════ FOREGROUND ═══════════════ */}

      {/* Logo */}
      <div className="absolute top-6 left-8 z-30 flex items-center gap-2.5">
        <img src="/sajian-kita-logo.svg" alt="Sajian Kita"
          className="h-14 w-14 object-contain" />
        <div className="leading-tight">
          <p className="text-sm font-bold text-[#3D1F0D]">Sajian Kita</p>
          <p className="text-[10px] text-[#9A6651] tracking-widest uppercase">Catering</p>
        </div>
      </div>

      {/* Konten */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-4 py-20">

        <div className="mb-6 text-center">
          <h1 className="text-6xl font-black tracking-tight text-[#1a1a1a] drop-shadow-sm">Daftar</h1>
          <p className="mt-2.5 text-sm text-[#7a6560]">
            Bergabunglah dengan{' '}
            <span className="font-semibold text-[#C96E4A]">Sajian Kita Catering</span>
          </p>
        </div>

        {/* Card */}
        <div className="w-full max-w-sm rounded-3xl bg-white/80 px-8 py-7 shadow-[0_8px_48px_rgba(201,110,74,0.15)] ring-1 ring-[#C96E4A]/10 backdrop-blur-md">

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-xs text-red-600">
              <span className="text-red-400 text-base">!</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">

            {/* Nama */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#3D1F0D] pl-1">Nama Lengkap</label>
              <div className="relative group">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C96E4A]/50 transition group-focus-within:text-[#C96E4A]" />
                <input name="name" type="text" value={form.name} onChange={handleChange}
                  placeholder="Nama lengkap Anda" className={inputClass} autoComplete="name" required />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#3D1F0D] pl-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C96E4A]/50 transition group-focus-within:text-[#C96E4A]" />
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="nama@email.com" className={inputClass} autoComplete="email" required />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#3D1F0D] pl-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C96E4A]/50 transition group-focus-within:text-[#C96E4A]" />
                <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange}
                  placeholder="Minimal 6 karakter"
                  className={`${inputClass} pr-10`} autoComplete="new-password" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#C96E4A]/50 hover:text-[#C96E4A] transition" tabIndex={-1}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <PasswordStrength password={form.password} />
            </div>

            {/* Konfirmasi */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#3D1F0D] pl-1">Konfirmasi Password</label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C96E4A]/50 transition group-focus-within:text-[#C96E4A]" />
                <input name="confirmPassword" type={showConfirm ? 'text' : 'password'} value={form.confirmPassword} onChange={handleChange}
                  placeholder="Ulangi password"
                  className={`${inputClass} pr-10 ${
                    form.confirmPassword && form.password !== form.confirmPassword ? 'border-red-300 focus:border-red-400' :
                    form.confirmPassword && form.password === form.confirmPassword ? 'border-green-300 focus:border-green-400' : ''
                  }`} autoComplete="new-password" required />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#C96E4A]/50 hover:text-[#C96E4A] transition" tabIndex={-1}>
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {form.confirmPassword && form.password === form.confirmPassword && (
                <p className="flex items-center gap-1 text-[11px] text-green-600 pl-1">
                  <CheckCircle2 className="h-3 w-3" /> Password cocok
                </p>
              )}
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="group relative w-full overflow-hidden rounded-2xl bg-[#C96E4A] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#C96E4A]/35 transition-all duration-300 hover:bg-[#A85535] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#C96E4A]/30 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed mt-1">
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Mendaftarkan...</>
                ) : 'DAFTAR SEKARANG'}
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </form>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-px bg-[#e8d5c8]" />
            <span className="text-xs text-[#c4a090]">atau</span>
            <div className="flex-1 h-px bg-[#e8d5c8]" />
          </div>

          <p className="mt-3.5 text-center text-xs text-[#9A6651]">
            Sudah punya akun?{' '}
            <NavLink to="/login" className="font-bold text-[#C96E4A] hover:underline">Login di sini →</NavLink>
          </p>
        </div>

        <div className="mt-6 flex items-center gap-4 text-[11px] text-[#9A6651]">
          {['🔒 Aman & Terenkripsi', '✓ Gratis Daftar', '⭐ Rating 4.9/5'].map((b) => (
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
