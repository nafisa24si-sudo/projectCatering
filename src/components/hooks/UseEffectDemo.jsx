import { useEffect, useState } from 'react';
import { histories } from '../../data/orderData';
import useEffectImg from '../../assets/useEffect.svg';

export default function UseEffectDemo() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

  // Simulate fetching order history on mount
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setData(histories);
      setLoading(false);
    }, 600);

    return () => clearTimeout(t);
  }, []);

  const filtered = data.filter(d => d.customer.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition relative overflow-hidden">
      <img src={useEffectImg} alt="useEffect" className="absolute -right-6 -top-6 w-40 opacity-80 pointer-events-none" />
      <h3 className="text-lg font-semibold mb-3">useEffect — Load Riwayat Pesanan (Demo)</h3>
      <p className="text-sm text-gray-500 mb-4">useEffect menjalankan proses pemuatan data saat komponen dipasang.</p>

      <div className="mb-3 flex gap-2">
        <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Cari pelanggan" className="w-full rounded-xl border px-3 py-2" />
      </div>

      {loading ? (
        <div className="text-sm text-gray-500">Memuat data...</div>
      ) : (
        <ul className="space-y-2 text-sm">
          {filtered.map(h => (
            <li key={h.id} className="flex justify-between bg-[#fff7f3] rounded-md px-3 py-2">
              <div>
                <div className="font-medium">{h.customer}</div>
                <div className="text-xs text-gray-500">{h.orderDate} • {h.status}</div>
              </div>
              <div className="font-semibold">{h.total}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
