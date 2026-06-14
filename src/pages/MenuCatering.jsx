import { menuItems } from '../data/menuData';

function MenuCatering() {
  const handleAddMenu = () => alert('Tambah menu baru');
  const handleEdit = (id) => alert('Edit menu ' + id);
  const handleDelete = (id) => alert('Hapus menu ' + id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-[#5e2f1f]">Menu Catering</h2>
          <p className="mt-2 text-sm text-[#8c4a36]">Kelola paket menu yang tersedia untuk pesanan catering.</p>
        </div>
        <button
          className="inline-flex items-center justify-center rounded-2xl bg-[#d87d59] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#b45a44]"
          onClick={handleAddMenu}
        >
          Tambah Menu
        </button>
      </div>

      <div className="rounded-[32px] border border-[#e7c3b4] bg-[#fff3ec] p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8c4a36]">{menuItems.length} paket menu</span>
            <p className="mt-2 text-[#7c4129]">Kelola menu yang siap disajikan untuk acara pelanggan.</p>
          </div>
          <div className="w-full max-w-sm">
            <input
              type="text"
              placeholder="Cari menu..."
              className="w-full rounded-2xl border border-[#e7c3b4] bg-[#fff5eb] px-4 py-3 text-sm text-[#4d2c1e] outline-none transition focus:border-[#d87d59] focus:ring-2 focus:ring-[#f4d1c0]"
            />
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-[28px] bg-white shadow-inner shadow-[#d87d59]/5">
          <table className="min-w-full divide-y divide-[#e7c3b4] text-sm text-left">
            <thead className="bg-[#fff1e6]">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#7c4129]">Menu</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#7c4129]">Deskripsi</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#7c4129]">Harga</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#7c4129]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7c3b4] bg-white">
              {menuItems.map((item) => (
                <tr key={item.id} className="hover:bg-[#fff3ec]">
                  <td className="px-4 py-4 text-[#5e2f1f] font-medium">{item.name}</td>
                  <td className="px-4 py-4 text-[#7c4129]">{item.description}</td>
                  <td className="px-4 py-4 text-[#5e2f1f] font-semibold">{item.price}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        className="rounded-2xl bg-[#c56b49] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#a2563c]"
                        onClick={() => handleEdit(item.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="rounded-2xl bg-[#b74a3e] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#953a32]"
                        onClick={() => handleDelete(item.id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MenuCatering;
