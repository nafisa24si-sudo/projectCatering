import { useState } from 'react';
import useStateImg from '../../assets/useState.svg';

export default function UseStateDemo() {
  const [items, setItems] = useState(['Paket Nasi Box', 'Paket Vegetarian']);
  const [value, setValue] = useState('');

  function addItem() {
    if (!value.trim()) return;
    setItems(prev => [...prev, value.trim()]);
    setValue('');
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition relative overflow-hidden">
      <img src={useStateImg} alt="useState" className="absolute -right-6 -top-6 w-40 opacity-80 pointer-events-none" />
      <h3 className="text-lg font-semibold mb-3">useState — Tambah Menu (Demo)</h3>
      <p className="text-sm text-gray-500 mb-4">Contoh sederhana penggunaan <strong>useState</strong> untuk menyimpan daftar menu.</p>

      <div className="flex gap-2 mb-4">
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Nama menu baru"
          className="w-full rounded-xl border px-3 py-2 outline-none"
        />
        <button onClick={addItem} className="rounded-xl bg-[#d87d59] px-4 py-2 text-white font-semibold">Tambah</button>
      </div>

      <div>
        <strong className="block mb-2">Jumlah menu: {items.length}</strong>
        <ul className="list-disc pl-5 space-y-1">
          {items.map((it, idx) => (
            <li key={idx} className="text-sm">{it}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
