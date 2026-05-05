import './MenuCatering.css';
import { menuItems } from '../data/menuData';

function MenuCatering() {
  const handleAddMenu = () => alert('Tambah menu baru');
  const handleEdit = (id) => alert('Edit menu ' + id);
  const handleDelete = (id) => alert('Hapus menu ' + id);

  return (
    <div className="menu-catering">
      <div className="page-header">
        <div>
          <h2>Menu Catering</h2>
          <p>Kelola paket menu yang tersedia untuk pesanan catering.</p>
        </div>
        <button className="add-btn" onClick={handleAddMenu}>Tambah Menu</button>
      </div>

      <div className="menu-card">
        <div className="menu-card__top">
          <div className="menu-card__info">
            <span>{menuItems.length} paket menu</span>
            <strong>Kelola menu yang siap disajikan untuk acara pelanggan.</strong>
          </div>
          <div className="menu-card__search">
            <input type="text" placeholder="Cari menu..." />
          </div>
        </div>

        <div className="table-responsive">
          <table className="menu-table">
            <thead>
              <tr>
                <th>Menu</th>
                <th>Deskripsi</th>
                <th>Harga</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map(item => (
                <tr key={item.id}>
                  <td>
                    <div className="menu-name">{item.name}</div>
                  </td>
                  <td>{item.description}</td>
                  <td className="price">{item.price}</td>
                  <td className="actions">
                    <button className="btn-secondary" onClick={() => handleEdit(item.id)}>Edit</button>
                    <button className="btn-danger" onClick={() => handleDelete(item.id)}>Hapus</button>
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
