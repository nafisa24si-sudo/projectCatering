import Button from "../components/Button";
export default function Components() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-hijau mb-2">
        Catering Components
      </h1>
      <p className="text-gray-500 mb-6">
        Kumpulan komponen untuk aplikasi catering
      </p>

      {/* Button Component */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">
          Button Component
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button type="success">
            Tambah Menu
          </Button>
          <Button type="primary">
            Pesan Sekarang
          </Button>
          <Button type="warning">
            Edit Menu
          </Button>
          <Button type="danger">
            Hapus Menu
          </Button>
        </div>
      </div>
    </div>
  );
}