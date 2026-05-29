import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="text-center">
                <h1 className="text-7xl font-extrabold text-indigo-600">404</h1>
                <h2 className="mt-4 text-2xl font-bold text-gray-800">Halaman tidak ditemukan</h2>
                <p className="mt-2 text-gray-500">Maaf, halaman yang Anda cari tidak ada.</p>
                <div className="mt-6">
                    <Link to="/" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-500 transition">
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    );
}