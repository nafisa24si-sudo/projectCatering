import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Email harus diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password harus diisi";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
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
    // Simulasi login
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ email: formData.email }));
      navigate("/");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5EB] to-[#FFE7DC] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <img src="/catering-logo.svg" alt="CateringHub" className="w-32 h-32 mx-auto mb-4" />
          <p className="text-[#7D5A50] text-sm">Masuk ke akun Anda</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[2rem] shadow-[0_18px_40px_rgba(231,111,81,0.08)] p-8 border border-[#F4A261]/30">
          <form onSubmit={handleSubmit} className="space-y-6">
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
              {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
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
                  placeholder="masukkan password Anda"
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
              {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded accent-[#E76F51]"
                />
                <span className="text-[#7D5A50]">Ingat saya</span>
              </label>
              <a href="#" className="text-[#E76F51] hover:text-[#D1593B] font-semibold">
                Lupa password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#E76F51] to-[#F4A261] text-white font-bold py-3 rounded-xl hover:shadow-lg transition disabled:opacity-70"
            >
              {isLoading ? "Sedang masuk..." : "Masuk"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#F4A261]/30"></div>
            <span className="text-sm text-[#7D5A50]">atau</span>
            <div className="flex-1 h-px bg-[#F4A261]/30"></div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-[#7D5A50]">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="text-[#E76F51] hover:text-[#D1593B] font-bold"
              >
                Daftar sekarang
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
