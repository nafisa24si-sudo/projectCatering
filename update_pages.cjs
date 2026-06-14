const fs = require('fs');
const path = require('path');
const root = path.join(process.cwd(), 'src');

const files = {
  'pages/MenuCatering.jsx': `import { menuItems } from '../data/menuData';

function MenuCatering() {
  const handleAddMenu = () => alert('Tambah menu baru');
  const handleEdit = (id) => alert('Edit menu ' + id);
  const handleDelete = (id) => alert('Hapus menu ' + id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900">Menu Catering</h2>
          <p className="mt-2 text-sm text-slate-500">Kelola paket menu yang tersedia untuk pesanan catering.</p>
        </div>
        <button className="inline-flex items-center justify-center rounded-2xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600" onClick={handleAddMenu}>
          Tambah Menu
        </button>
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">{menuItems.length} paket menu</span>
            <p className="mt-2 text-slate-700">Kelola menu yang siap disajikan untuk acara pelanggan.</p>
          </div>
          <div className="w-full max-w-sm">
            <input type="text" placeholder="Cari menu..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200" />
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Menu</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Deskripsi</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Harga</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {menuItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-4 text-slate-900 font-medium">{item.name}</td>
                  <td className="px-4 py-4 text-slate-600">{item.description}</td>
                  <td className="px-4 py-4 text-slate-900 font-semibold">{item.price}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button className="rounded-2xl bg-sky-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-sky-700" onClick={() => handleEdit(item.id)}>Edit</button>
                      <button className="rounded-2xl bg-rose-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-rose-700" onClick={() => handleDelete(item.id)}>Hapus</button>
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
`,

  'pages/KeranjangBelanja.jsx': `import { carts } from '../data/orderData';

function KeranjangBelanja() {
  const handleProcess = (id) => alert('Proses keranjang ' + id);
  const handleCancel = (id) => alert('Batal keranjang ' + id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900">Keranjang Belanja</h2>
          <p className="mt-2 text-sm text-slate-500">Kelola pesanan yang sedang menunggu konfirmasi atau pengiriman.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
          <span className="text-xs uppercase tracking-[0.24em] text-slate-500">Pesanan Aktif</span>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{carts.length}</p>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
          <span className="text-xs uppercase tracking-[0.24em] text-slate-500">Item dalam Keranjang</span>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{carts.reduce((sum, c) => sum + c.items.length, 0)}</p>
        </div>
      </div>

      <div className="space-y-6">
        {carts.map((cart) => (
          <div key={cart.id} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{cart.customer}</h3>
                <span className="text-sm text-slate-500">#{cart.id}</span>
              </div>
              <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">Menunggu</span>
            </div>

            <ul className="space-y-2 pb-4 text-slate-600">
              {cart.items.map((item, index) => (
                <li key={index} className="list-disc pl-5">{item}</li>
              ))}
            </ul>

            <div className="flex flex-col gap-4 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-semibold text-slate-900">Total: {cart.total}</span>
              <div className="flex flex-wrap gap-3">
                <button className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700" onClick={() => handleProcess(cart.id)}>Proses</button>
                <button className="rounded-2xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700" onClick={() => handleCancel(cart.id)}>Batal</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KeranjangBelanja;
`,

  'pages/RiwayatPembeli.jsx': `import { histories } from '../data/orderData';

function RiwayatPembeli() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900">Riwayat Pembeli</h2>
          <p className="mt-2 text-sm text-slate-500">Lihat semua pesanan yang sudah selesai dan yang masih pending.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
          <span className="text-xs uppercase tracking-[0.24em] text-slate-500">Selesai</span>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{histories.filter(h => h.status === 'Completed').length}</p>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
          <span className="text-xs uppercase tracking-[0.24em] text-slate-500">Pending</span>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{histories.filter(h => h.status !== 'Completed').length}</p>
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-5">
          <h3 className="text-lg font-semibold text-slate-900">Ringkasan Pesanan</h3>
          <p className="mt-2 text-sm text-slate-500">Data transaksi terakhir ditampilkan di bawah.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.2em] text-slate-500">
              <tr>
                <th className="px-4 py-4">ID</th>
                <th className="px-4 py-4">Customer</th>
                <th className="px-4 py-4">Order Date</th>
                <th className="px-4 py-4">Total</th>
                <th className="px-4 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {histories.map((history) => (
                <tr key={history.id} className="hover:bg-slate-50">
                  <td className="px-4 py-4 font-medium text-slate-900">{history.id}</td>
                  <td className="px-4 py-4 text-slate-600">{history.customer}</td>
                  <td className="px-4 py-4 text-slate-600">{history.orderDate}</td>
                  <td className="px-4 py-4 text-slate-900 font-semibold">{history.total}</td>
                  <td className="px-4 py-4">
                    <span className={"inline-flex rounded-full px-3 py-1 text-xs font-semibold " + (history.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700')}>
                      {history.status}
                    </span>
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

export default RiwayatPembeli;
`,
};

Object.entries(files).forEach(([relativePath, content]) => {
  const targetPath = path.join(root, relativePath);
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(targetPath, content, 'utf8');
  console.log(`Updated ${targetPath}`);
});
