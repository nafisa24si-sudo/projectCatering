import Button from "../components/Button";
import UseStateDemo from "../components/hooks/UseStateDemo";
import UseEffectDemo from "../components/hooks/UseEffectDemo";
import UseRefDemo from "../components/hooks/UseRefDemo";
import heroImage from "../assets/hero.png";

export default function Components() {
  return (
    <div className="p-6 space-y-6">
      <div className="relative">
        <div className="bg-gradient-to-r from-[#fff4eb] to-white rounded-xl p-6 flex items-center gap-6 shadow-md">
          <div>
            <h1 className="text-3xl font-bold text-hijau mb-2">Catering Components</h1>
            <p className="text-gray-500 mb-4">Kumpulan komponen untuk aplikasi catering — demo hooks untuk tugas React.</p>
            <div className="flex gap-3">
              <Button type="primary">Lihat Demo</Button>
              <Button type="success">Tambahkan Contoh</Button>
            </div>
          </div>
          <div className="ml-auto hidden md:block">
            <img src={heroImage} alt="hero" className="w-64 rounded-lg shadow-lg" />
          </div>
        </div>
      </div>

      {/* Button Component */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Button Component</h2>
        <div className="flex flex-wrap gap-3">
          <Button type="success">Tambah Menu</Button>
          <Button type="primary">Pesan Sekarang</Button>
          <Button type="warning">Edit Menu</Button>
          <Button type="danger">Hapus Menu</Button>
        </div>
      </div>

      {/* Hooks demos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UseStateDemo />
        <UseEffectDemo />
        <UseRefDemo />
      </div>
    </div>
  );
}