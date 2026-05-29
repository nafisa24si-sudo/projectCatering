import { Link } from 'react-router-dom';

export default function ErrorPage({ errorCode, errorDescription, errorImage }) {
    const code = errorCode || '404';
    const description = errorDescription || 'Halaman tidak ditemukan';
    const image = errorImage;

    const getErrorColor = (code) => {
        switch (code) {
            case '400': return 'text-red-500';
            case '401': return 'text-orange-500';
            case '403': return 'text-yellow-500';
            case '404': return 'text-blue-500';
            default: return 'text-gray-500';
        }
    };

    const getErrorDescription = (code) => {
        switch (code) {
            case '400': return 'Permintaan tidak valid. Silakan periksa data yang Anda kirimkan.';
            case '401': return 'Akses ditolak. Silakan login terlebih dahulu.';
            case '403': return 'Akses dilarang. Anda tidak memiliki izin.';
            case '404': return 'Halaman tidak ditemukan. Mungkin telah dipindahkan atau dihapus.';
            default: return 'Terjadi kesalahan. Silakan coba lagi nanti.';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
                {image && (
                    <div className="mb-8 flex justify-center">
                        <img
                            src={image}
                            alt={`Error ${code}`}
                            className="w-64 h-64 object-contain"
                        />
                    </div>
                )}

                <div className="mb-6">
                    <div className={`text-8xl font-bold ${getErrorColor(code)} mb-2`}>
                        {code}
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        {description}
                    </h1>
                    <p className="text-gray-600 leading-relaxed">
                        {getErrorDescription(code)}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                        Kembali ke Beranda
                    </Link>
                    <Link
                        to="/help"
                        className="border border-gray-300 hover:border-indigo-300 text-gray-700 hover:text-indigo-600 font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                    >
                        Hubungi Bantuan
                    </Link>
                </div>
            </div>
        </div>
    );
}