import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({ usernameOrEmail: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const resolveUsername = async (identifier) => {
    if (!identifier.includes('@')) return identifier;

    try {
      const response = await axios.get(`https://dummyjson.com/users/search?q=${encodeURIComponent(identifier)}`);
      const foundUser = response.data?.users?.find(
        (user) => user.email?.toLowerCase() === identifier.toLowerCase()
      );
      return foundUser?.username || identifier;
    } catch (_) {
      return identifier;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const identifier = credentials.usernameOrEmail.trim();
      if (!identifier || !credentials.password.trim()) {
        setError('Username/email dan kata sandi wajib diisi.');
        return;
      }

      const loginUsername = await resolveUsername(identifier);

      const response = await axios.post('https://dummyjson.com/user/login', {
        username: loginUsername,
        password: credentials.password,
      });

      if (response.status === 200) {
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Terjadi kesalahan saat login.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.12),transparent_25%),#eef5f9] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200/80 bg-white/95 shadow-[0_35px_80px_rgba(15,23,42,0.12)] overflow-hidden">
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 px-8 py-10 text-center text-white">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-3xl shadow-lg shadow-black/10">🍽️</div>
          <h2 className="text-3xl font-semibold">Selamat Datang</h2>
          <p className="mt-3 text-sm text-white/90">Masuk untuk melanjutkan ke dashboard Catering App.</p>
        </div>

        <div className="space-y-6 px-8 py-8">
          {error && (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 text-sm">
              <label className="block font-semibold text-slate-700">Username atau Email</label>
              <input
                name="usernameOrEmail"
                type="text"
                value={credentials.usernameOrEmail}
                onChange={handleChange}
                placeholder="Masukkan username atau email"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                required
              />
            </div>

            <div className="space-y-2 text-sm">
              <label className="block font-semibold text-slate-700">Kata Sandi</label>
              <input
                name="password"
                type="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Masukkan kata sandi"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                required
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-600">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500" />
                Ingat saya
              </label>

              <NavLink to="/forgot" className="text-amber-500 font-semibold hover:text-amber-600">
                Lupa kata sandi?
              </NavLink>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-amber-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Memeriksa...' : 'Masuk'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500">
            Belum punya akun?{' '}
            <NavLink to="/register" className="font-semibold text-amber-500 hover:text-amber-600">
              Daftar sekarang
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
