export default function Footer() {
  return (
    <footer className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm text-sm text-gray-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-gray-900">Catering Components</p>
          <p className="mt-2 text-gray-500">Dashboard component playground untuk menu catering.</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-900">Catering Restaurant</p>
          <p className="text-xs text-gray-400">© 2026</p>
        </div>
      </div>
    </footer>
  );
}
