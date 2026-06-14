import { carts } from '../data/orderData';

function Keranjang() {
  const totalCustomers = carts.length;
  const totalItems = carts.reduce((sum, cart) => sum + cart.items.length, 0);

  const handleProcess = (id) => alert('Proses keranjang ' + id);
  const handleCancel = (id) => alert('Batal keranjang ' + id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-[#5e2f1f]">Keranjang Belanja</h2>
          <p className="mt-2 text-sm text-[#8c4a36]">Kelola pesanan yang sedang menunggu konfirmasi atau pengiriman.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[24px] border border-[#e7c3b4] bg-[#fff3ec] p-6 shadow-sm">
          <span className="text-xs uppercase tracking-[0.24em] text-[#7c4129]">Pesanan Aktif</span>
          <p className="mt-3 text-3xl font-semibold text-[#5e2f1f]">{totalCustomers}</p>
        </div>
        <div className="rounded-[24px] border border-[#e7c3b4] bg-[#fff3ec] p-6 shadow-sm">
          <span className="text-xs uppercase tracking-[0.24em] text-[#7c4129]">Item dalam Keranjang</span>
          <p className="mt-3 text-3xl font-semibold text-[#5e2f1f]">{totalItems}</p>
        </div>
      </div>

      <div className="space-y-6">
        {carts.map((cart) => (
          <div key={cart.id} className="rounded-[24px] border border-[#e7c3b4] bg-[#fff3ec] p-6 shadow-sm">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-[#5e2f1f]">{cart.customer}</h3>
                <span className="text-sm text-[#8c4a36]">#{cart.id}</span>
              </div>
              <span className="inline-flex rounded-full bg-[#fff1e6] px-3 py-1 text-sm font-semibold text-[#a65c44]">Menunggu</span>
            </div>

            <ul className="space-y-2 pb-4 text-[#7c4129]">
              {cart.items.map((item, index) => (
                <li key={index} className="list-disc pl-5">{item}</li>
              ))}
            </ul>

            <div className="flex flex-col gap-4 border-t border-[#e7c3b4] pt-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-semibold text-[#5e2f1f]">Total: {cart.total}</span>
              <div className="flex flex-wrap gap-3">
                <button
                  className="rounded-2xl bg-[#d87d59] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#b45a44]"
                  onClick={() => handleProcess(cart.id)}
                >
                  Proses
                </button>
                <button
                  className="rounded-2xl bg-[#b74a3e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#953a32]"
                  onClick={() => handleCancel(cart.id)}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Keranjang;
