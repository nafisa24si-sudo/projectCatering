import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Nama harus diisi";
    } else if (formData.name.length < 3) {
      newErrors.name = "Nama minimal 3 karakter";
    }
    
    if (!formData.email) {
      newErrors.email = "Email harus diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }
    
    if (!formData.phone) {
      newErrors.phone = "Nomor telepon harus diisi";
    } else if (!/^(\+62|62|0)[0-9]{9,12}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Format nomor telepon tidak valid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password harus diisi";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    } else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = "Password harus mengandung huruf besar dan angka";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password harus diisi";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok";
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    // Simulasi register
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ 
        name: formData.name,
        email: formData.email,
        phone: formData.phone 
      }));
      navigate("/");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5EB] to-[#FFE7DC] flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <img src="/sajian-kita-logo.svg" alt="Sajian Kita" className="w-32 h-32 mx-auto mb-3" />
          <p className="text-[#7D5A50] text-sm">Buat akun baru Anda</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[2rem] shadow-[0_18px_40px_rgba(231,111,81,0.08)] p-8 border border-[#F4A261]/30">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-[#2D2D2D] mb-2">
                Nama Lengkap
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-4 text-[#F4A261]" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="masukkan nama lengkap"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition focus:outline-none ${
                    errors.name
                      ? "border-red-500 focus:border-red-600 bg-red-50"
                      : "border-[#F4A261]/30 focus:border-[#E76F51] bg-white"
                  }`}
                />
              </div>
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#2D2D2D] mb-2">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-4 text-[#F4A261]" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="masukkan email Anda"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition focus:outline-none ${
                    errors.email
                      ? "border-red-500 focus:border-red-600 bg-red-50"
                      : "border-[#F4A261]/30 focus:border-[#E76F51] bg-white"
                  }`}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            {/* Phone Input */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-[#2D2D2D] mb-2">
                Nomor Telepon
              </label>
              <div className="relative">
                <FaPhone className="absolute left-4 top-4 text-[#F4A261]" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="contoh: 0812xxxxxxxxx"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition focus:outline-none ${
                    errors.phone
                      ? "border-red-500 focus:border-red-600 bg-red-50"
                      : "border-[#F4A261]/30 focus:border-[#E76F51] bg-white"
                  }`}
                />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#2D2D2D] mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-4 text-[#F4A261]" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="minimal 6 karakter"
                  className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 transition focus:outline-none ${
                    errors.password
                      ? "border-red-500 focus:border-red-600 bg-red-50"
                      : "border-[#F4A261]/30 focus:border-[#E76F51] bg-white"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-[#F4A261] hover:text-[#E76F51]"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              <p className="mt-1 text-xs text-[#7D5A50]">Harus mengandung huruf besar dan angka</p>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#2D2D2D] mb-2">
                Konfirmasi Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-4 text-[#F4A261]" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="ulangi password"
                  className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 transition focus:outline-none ${
                    errors.confirmPassword
                      ? "border-red-500 focus:border-red-600 bg-red-50"
                      : "border-[#F4A261]/30 focus:border-[#E76F51] bg-white"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-4 text-[#F4A261] hover:text-[#E76F51]"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
            </div>

            {/* Terms & Conditions */}
            <label className="flex items-start gap-3 mt-6">
              <input
                type="checkbox"
                className="w-4 h-4 rounded mt-1 accent-[#E76F51]"
                required
              />
              <span className="text-sm text-[#7D5A50]">
                Saya setuju dengan{" "}
                <a href="#" className="text-[#E76F51] hover:text-[#D1593B] font-semibold">
                  syarat dan ketentuan
                </a>
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#E76F51] to-[#F4A261] text-white font-bold py-3 rounded-xl hover:shadow-lg transition disabled:opacity-70 mt-6"
            >
              {isLoading ? "Sedang mendaftar..." : "Daftar"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#F4A261]/30"></div>
            <span className="text-sm text-[#7D5A50]">atau</span>
            <div className="flex-1 h-px bg-[#F4A261]/30"></div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-[#7D5A50]">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="text-[#E76F51] hover:text-[#D1593B] font-bold"
              >
                Masuk sekarang
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-[#7D5A50] mt-6">
          © 2026 CateringHub. Semua hak dilindungi.
        </p>
      </div>
    </div>
  );
}
