import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

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
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__header">
          <div className="login-card__icon">🍽️</div>
          <h2 className="login-card__title">Selamat Datang</h2>
          <p className="login-card__subtitle">Masuk untuk melanjutkan ke dashboard Catering App.</p>
        </div>

        <div className="login-card__body">
          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <label>Username atau Email</label>
              <input
                name="usernameOrEmail"
                type="text"
                value={credentials.usernameOrEmail}
                onChange={handleChange}
                placeholder="Masukkan username atau email"
                className="login-input"
                required
              />
            </div>

            <div className="login-field">
              <label>Kata Sandi</label>
              <input
                name="password"
                type="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Masukkan kata sandi"
                className="login-input"
                required
              />
            </div>

            <div className="login-footer">
              <label className="login-checkbox">
                <input type="checkbox" />
                Ingat saya
              </label>
              <NavLink to="/forgot" className="login-footer__link">
                Lupa kata sandi?
              </NavLink>
            </div>

            <button type="submit" disabled={loading} className="login-button">
              {loading ? 'Memeriksa...' : 'Masuk'}
            </button>
          </form>

          <p className="login-footer-text">
            Belum punya akun?{' '}
            <NavLink to="/register">Daftar sekarang</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
