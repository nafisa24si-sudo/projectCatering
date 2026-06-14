import { useRef, useState, useEffect } from 'react';
import useRefImg from '../../assets/useRef.svg';

export default function UseRefDemo() {
  const inputRef = useRef(null);
  const countRef = useRef(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // focus input when component mounts
    inputRef.current?.focus();
  }, []);

  function increment() {
    setCount(c => c + 1);
    countRef.current += 1; // mutable ref does not trigger re-render
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition relative overflow-hidden">
      <img src={useRefImg} alt="useRef" className="absolute -right-6 -top-6 w-40 opacity-80 pointer-events-none" />
      <h3 className="text-lg font-semibold mb-3">useRef — Fokus & Penyimpan Nilai (Demo)</h3>
      <p className="text-sm text-gray-500 mb-4">useRef digunakan untuk fokus input dan menyimpan nilai yang tidak perlu memicu render.</p>

      <div className="mb-3 flex gap-2">
        <input ref={inputRef} placeholder="Fokus otomatis" className="w-full rounded-xl border px-3 py-2" />
      </div>

      <div className="flex items-center gap-3">
        <button onClick={increment} className="rounded-xl bg-[#d87d59] px-4 py-2 text-white font-semibold">Tambah</button>
        <div className="text-sm">State count: <strong>{count}</strong></div>
        <div className="text-sm">Ref count: <strong>{countRef.current}</strong></div>
      </div>
    </div>
  );
}
