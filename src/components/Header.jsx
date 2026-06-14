function Header() {
  const handleNotification = () => {
    alert('Notifikasi');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-20 flex h-20 items-center justify-between gap-4 border-b border-[#e7c5b4] bg-[#fff4eb]/95 px-6 shadow-sm lg:left-[280px] lg:px-8">
      <div className="flex-1">
        <div className="flex w-full max-w-[420px] items-center gap-3 rounded-2xl border border-[#e7c5b4] bg-[#fff1e3] px-4 py-2">
          <input
            type="text"
            placeholder="Cari menu, pesanan..."
            className="w-full bg-transparent text-sm text-[#7a3a25] outline-none placeholder:text-[#b07865]"
          />
          <button type="button" className="rounded-full bg-[#d87d59] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#b45a44]">
            Cari
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="rounded-2xl border border-[#e7c5b4] bg-[#fff3e7] px-4 py-2 text-sm font-semibold text-[#7a3a25] transition hover:border-[#d9a78b] hover:text-[#4f1f12]"
          onClick={handleNotification}
        >
          Notifikasi
        </button>
        <button className="rounded-2xl border border-[#e7c5b4] bg-[#fff3e7] px-4 py-2 text-sm font-semibold text-[#7a3a25] transition hover:border-[#d9a78b] hover:text-[#4f1f12]">
          Statistik
        </button>
        <button className="rounded-2xl border border-[#e7c5b4] bg-[#fff3e7] px-4 py-2 text-sm font-semibold text-[#7a3a25] transition hover:border-[#d9a78b] hover:text-[#4f1f12]">
          Pengaturan
        </button>
        <div className="flex items-center gap-3 rounded-2xl bg-[#f5ddd2] px-3 py-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d87d59] text-white font-bold">AU</div>
          <div className="text-left leading-tight">
            <span className="block text-[11px] text-[#7a3a25]">Admin User</span>
            <strong className="block text-sm text-[#4f1f12]">admin@nekoshop.com</strong>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
