import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic here
        console.log('Registration data:', formData);
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Buat Akun Baru
                </h2>
                <p className="text-gray-600">
                    Bergabunglah dengan Catering App
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nama Lengkap
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            name="name"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl shadow-sm
                                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                transition duration-200"
                            placeholder="Nama lengkap Anda"
                            onChange={handleChange}
                            value={formData.name}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                            name="email"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl shadow-sm
                                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                transition duration-200"
                            placeholder="anda@example.com"
                            onChange={handleChange}
                            value={formData.email}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                            name="password"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl shadow-sm
                                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                transition duration-200"
                            placeholder="Minimal 8 karakter"
                            onChange={handleChange}
                            value={formData.password}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Konfirmasi Kata Sandi
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl shadow-sm
                                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                transition duration-200"
                            placeholder="Ulangi kata sandi"
                            onChange={handleChange}
                            value={formData.confirmPassword}
                            required
                        />
                    </div>
                </div>

                <div className="flex items-center">
                    <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        required
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                        Saya setuju dengan{' '}
                        <a href="#" className="text-green-600 hover:text-green-500 font-medium">
                            Syarat & Ketentuan
                        </a>{' '}
                        dan{' '}
                        <a href="#" className="text-green-600 hover:text-green-500 font-medium">
                            Kebijakan Privasi
                        </a>
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700
                        text-white font-semibold py-3 px-4 rounded-xl transition duration-300 transform hover:scale-[1.02]
                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-lg"
                >
                    Daftar Sekarang
                </button>
            </form>

            <div className="text-center">
                <p className="text-sm text-gray-600">
                    Sudah punya akun?{' '}
                    <NavLink to="/login" className="font-medium text-green-600 hover:text-green-500 transition duration-200">
                        Masuk di sini
                    </NavLink>
                </p>
            </div>
        </div>
    )
}