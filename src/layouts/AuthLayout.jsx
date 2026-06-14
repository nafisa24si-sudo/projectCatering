import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-emerald-50 via-sky-50 to-slate-100 px-4 py-10 text-slate-900">
            <div className="pointer-events-none absolute left-5 top-16 opacity-20 text-4xl animate-slideInDown">🍽️</div>
            <div className="pointer-events-none absolute right-10 top-24 opacity-20 text-3xl animate-slideInDown">🥘</div>
            <div className="pointer-events-none absolute left-10 bottom-24 opacity-20 text-3xl animate-slideInUp">🍛</div>
            <div className="pointer-events-none absolute right-8 bottom-16 opacity-20 text-3xl animate-slideInUp">🥗</div>

            <div className="relative z-10 mx-auto w-full max-w-xl rounded-[2rem] border border-slate-200/70 bg-white/95 p-10 shadow-[0_32px_90px_rgba(15,23,42,0.12)]">
                <div className="mb-10 flex items-center justify-center gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-emerald-600 to-emerald-400 text-2xl text-white shadow-lg shadow-emerald-200/50">🍽️</div>
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Catering</h1>
                </div>

                <Outlet />

                <div className="mt-10 border-t border-slate-200/70 pt-6 text-center text-sm text-slate-500">
                    © 2025 Catering App. All rights reserved.
                </div>
            </div>
        </div>
    )
}