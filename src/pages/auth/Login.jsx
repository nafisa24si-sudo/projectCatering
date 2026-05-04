import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const response = await axios.post("https://dummyjson.com/user/login", {
                username: dataForm.email,
                password: dataForm.password,
            });

            if (response.status === 200) {
                navigate("/");
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || "Terjadi kesalahan");
            } else {
                setError(err.message || "Kesalahan tidak diketahui");
            }
        } finally {
            setLoading(false);
        }
    };

    const errorInfo = error ? (
        <div className="bg-red-50 border border-red-200 mb-5 p-4 text-sm font-medium text-red-700 rounded-xl flex items-center">
            <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            </div>
            <div className="ml-3">
                {error}
            </div>
        </div>
    ) : null;

    const loadingInfo = loading ? (
        <div className="bg-blue-50 border border-blue-200 mb-5 p-4 text-sm font-medium text-blue-700 rounded-xl flex items-center">
            <div className="flex-shrink-0">
                <svg className="animate-spin h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
            <div className="ml-3">
                Mohon Tunggu...
            </div>
        </div>
    ) : null;

    return (
        <div className="w-full max-w-sm mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Masuk ke Akun Anda
                </h2>
                <p className="text-sm text-gray-600">
                    Selamat datang kembali di Catering App
                </p>
            </div>

            {/* Error Message */}
            {errorInfo}

            {/* Loading Message */}
            {loadingInfo}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                            </svg>
                        </div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={dataForm.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg
                                focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                transition duration-200 placeholder-gray-400"
                            placeholder="Masukkan email Anda"
                            required
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Kata Sandi
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                        </div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={dataForm.password}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg
                                focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                transition duration-200 placeholder-gray-400"
                            placeholder="Masukkan kata sandi"
                            required
                        />
                    </div>
                </div>

                {/* Remember me and Forgot password */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                            Ingat saya
                        </label>
                    </div>
                    <NavLink to="/forgot" className="text-sm font-medium text-green-600 hover:text-green-500 transition duration-200">
                        Lupa kata sandi?
                    </NavLink>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4
                        rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500
                        focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Masuk...
                        </div>
                    ) : (
                        'Masuk'
                    )}
                </button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    Belum punya akun?{' '}
                    <NavLink to="/register" className="font-medium text-green-600 hover:text-green-500 transition duration-200">
                        Daftar sekarang
                    </NavLink>
                </p>
            </div>
        </div>
    )
}