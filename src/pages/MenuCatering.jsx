import './MenuCatering.css';
import { menuItems } from '../data/menuData';

function MenuCatering() {

  const handleAddMenu = () => {
    alert('Tambah menu baru');
  };

  const handleEdit = (id) => {
    alert('Edit menu ' + id);
  };

  const handleDelete = (id) => {
    alert('Hapus menu ' + id);
  };

  return (
    <div className="menu-catering">
      <div className="page-header">
        <div>
          <h2>Menu Catering</h2>
          <p>Kelola paket menu yang tersedia untuk pesanan catering.</p>
        </div>
        <button className="add-btn" onClick={handleAddMenu}>Tambah Menu</button>
      </div>

      <div className="menu-list">
        {menuItems.map(item => (
          <div key={item.id} className="menu-item">
            <div className="menu-details">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span className="price">{item.price}</span>
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(item.id)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuCatering;
