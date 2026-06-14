import { histories } from '../data/orderData';

function Riwayat() {
  const completedCount = histories.filter(item => item.status === 'Completed').length;
  const pendingCount = histories.filter(item => item.status !== 'Completed').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-[#5e2f1f]">Riwayat Pembeli</h2>
          <p className="mt-2 text-sm text-[#8c4a36]">Lihat semua pesanan yang sudah selesai dan yang masih pending.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[24px] border border-[#e7c3b4] bg-[#fff3ec] p-6 shadow-sm">
          <span className="text-xs uppercase tracking-[0.24em] text-[#7c4129]">Selesai</span>
          <p className="mt-3 text-3xl font-semibold text-[#5e2f1f]">{completedCount}</p>
        </div>
        <div className="rounded-[24px] border border-[#e7c3b4] bg-[#fff3ec] p-6 shadow-sm">
          <span className="text-xs uppercase tracking-[0.24em] text-[#7c4129]">Pending</span>
          <p className="mt-3 text-3xl font-semibold text-[#5e2f1f]">{pendingCount}</p>
        </div>
      </div>

      <div className="rounded-[24px] border border-[#e7c3b4] bg-[#fff3ec] shadow-sm overflow-hidden">
        <div className="border-b border-[#e7c3b4] bg-[#fff1e6] px-6 py-5">
          <h3 className="text-lg font-semibold text-[#5e2f1f]">Ringkasan Pesanan</h3>
          <p className="mt-2 text-sm text-[#8c4a36]">Data transaksi terakhir ditampilkan di bawah.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#e7c3b4] text-sm">
            <thead className="bg-[#fff5eb] text-left text-xs uppercase tracking-[0.2em] text-[#7c4129]">
              <tr>
                <th className="px-4 py-4">ID</th>
                <th className="px-4 py-4">Customer</th>
                <th className="px-4 py-4">Order Date</th>
                <th className="px-4 py-4">Total</th>
                <th className="px-4 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7c3b4] bg-white">
              {histories.map((history) => (
                <tr key={history.id} className="hover:bg-[#fff3ec]">
                  <td className="px-4 py-4 font-medium text-[#5e2f1f]">{history.id}</td>
                  <td className="px-4 py-4 text-[#7c4129]">{history.customer}</td>
                  <td className="px-4 py-4 text-[#7c4129]">{history.orderDate}</td>
                  <td className="px-4 py-4 text-[#5e2f1f] font-semibold">{history.total}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${history.status === 'Completed' ? 'bg-[#d4f2df] text-[#276a3d]' : 'bg-[#ffead9] text-[#a65c44]'}`}>
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

export default Riwayat;
