import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Forgot() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate sending reset email
        if (email) {
            setMessage('Tautan reset kata sandi telah dikirim ke email Anda!');
            setMessageType('success');
        } else {
            setMessage('Silakan masukkan alamat email yang valid.');
            setMessageType('error');
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                    <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Lupa Kata Sandi?
                </h2>
                <p className="text-gray-600 max-w-sm mx-auto">
                    Jangan khawatir! Masukkan email Anda dan kami akan mengirimkan tautan untuk mereset kata sandi.
                </p>
            </div>

            {message && (
                <div className={`p-4 rounded-xl flex items-center ${
                    messageType === 'success'
                        ? 'bg-green-50 border border-green-200 text-green-700'
                        : 'bg-red-50 border border-red-200 text-red-700'
                }`}>
                    <div className="flex-shrink-0">
                        {messageType === 'success' ? (
                            <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        ) : (
                            <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                            </svg>
                        )}
                    </div>
                    <div className="ml-3">
                        {message}
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Alamat Email
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                            </svg>
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl shadow-sm
                                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                transition duration-200"
                            placeholder="anda@example.com"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700
                        text-white font-semibold py-3 px-4 rounded-xl transition duration-300 transform hover:scale-[1.02]
                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-lg"
                >
                    Kirim Tautan Reset
                </button>
            </form>

            <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                    <NavLink to="/login" className="font-medium text-green-600 hover:text-green-500 transition duration-200">
                        ← Kembali ke halaman login
                    </NavLink>
                </p>
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