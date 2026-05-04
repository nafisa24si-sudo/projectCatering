import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden">
            {/* Floating food icons */}
            <div className="absolute top-20 left-10 text-4xl opacity-10 animate-bounce" style={{animationDelay: '0s'}}>🍽️</div>
            <div className="absolute top-32 right-16 text-3xl opacity-10 animate-bounce" style={{animationDelay: '1s'}}>🥘</div>
            <div className="absolute bottom-32 left-20 text-4xl opacity-10 animate-bounce" style={{animationDelay: '2s'}}>🍛</div>
            <div className="absolute bottom-20 right-10 text-3xl opacity-10 animate-bounce" style={{animationDelay: '0.5s'}}>🥗</div>

            <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md relative z-10 border border-gray-100">
                <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xl">🍽️</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Catering</span>
                        </h1>
                    </div>
                </div>

                <Outlet />

                <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-center text-xs text-gray-500">
                        © 2025 Catering App. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    )
}