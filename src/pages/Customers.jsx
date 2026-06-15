// Zona 1: Presentation Layer — Customers Page (CRUD via Supabase)
import { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import {
  getProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
} from '../services/userService';

const LOYALTY_OPTIONS = ['Bronze', 'Silver', 'Gold'];

const EMPTY_FORM = { full_name: '', email: '', phone: '', loyalty: 'Bronze' };

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal tambah
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState(EMPTY_FORM);
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState('');
  const nameInputRef = useRef(null);

  // Modal edit
  const [showEditForm, setShowEditForm] = useState(false);
  const [editForm, setEditForm] = useState(EMPTY_FORM);
  const [editTarget, setEditTarget] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');

  // Notifikasi sukses
  const [successMsg, setSuccessMsg] = useState('');

  // ── Fetch data ──────────────────────────────────────────
  const fetchCustomers = async () => {
    setLoading(true);
    setError('');
    const { data, error: fetchError } = await getProfiles();
    if (fetchError) {
      setError(fetchError);
    } else {
      setCustomers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (showAddForm) nameInputRef.current?.focus();
  }, [showAddForm]);

  // ── Helper ───────────────────────────────────────────────
  const getStatus = (loyalty) => (loyalty === 'Bronze' ? 'Nonaktif' : 'Aktif');

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // ── Filter ───────────────────────────────────────────────
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchesSearch = [c.full_name, c.email, c.phone]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const status = getStatus(c.loyalty);
      const matchesStatus = statusFilter === 'All' || status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [customers, searchTerm, statusFilter]);

  const activeCount = customers.filter((c) => getStatus(c.loyalty) === 'Aktif').length;
  const inactiveCount = customers.length - activeCount;

  // ── CRUD handlers ────────────────────────────────────────
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!addForm.full_name.trim() || !addForm.email.trim()) {
      setAddError('Nama dan email wajib diisi.');
      return;
    }
    setAddLoading(true);
    setAddError('');
    const { error: err } = await createProfile(addForm);
    setAddLoading(false);
    if (err) { setAddError(err); return; }
    setShowAddForm(false);
    setAddForm(EMPTY_FORM);
    showSuccess('Pelanggan berhasil ditambahkan.');
    fetchCustomers();
  };

  const openEdit = (customer) => {
    setEditTarget(customer);
    setEditForm({
      full_name: customer.full_name || '',
      email: customer.email || '',
      phone: customer.phone || '',
      loyalty: customer.loyalty || 'Bronze',
    });
    setEditError('');
    setShowEditForm(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editForm.full_name.trim()) { setEditError('Nama wajib diisi.'); return; }
    setEditLoading(true);
    setEditError('');
    const { error: err } = await updateProfile(editTarget.id, editForm);
    setEditLoading(false);
    if (err) { setEditError(err); return; }
    setShowEditForm(false);
    setEditTarget(null);
    showSuccess('Data pelanggan berhasil diperbarui.');
    fetchCustomers();
  };

  const handleDelete = async (customer) => {
    if (!window.confirm(`Hapus pelanggan "${customer.full_name}"?`)) return;
    const { error: err } = await deleteProfile(customer.id);
    if (err) { setError(err); return; }
    showSuccess('Pelanggan berhasil dihapus.');
    fetchCustomers();
  };

  // ── Render helpers ───────────────────────────────────────
  const getLoyaltyColor = (loyalty) => {
    switch (loyalty) {
      case 'Gold':   return 'bg-[#E76F51]/10 text-[#E76F51]';
      case 'Silver': return 'bg-[#F4A261]/10 text-[#E76F51]';
      default:       return 'bg-[#FFF0E6] text-[#D1593B]';
    }
  };

  const FormFields = ({ form, setForm }) => (
    <>
      <div>
        <label className="block text-sm font-semibold text-[#5e2f1f] mb-2">Nama Pelanggan</label>
        <input
          ref={form === addForm ? nameInputRef : undefined}
          type="text"
          value={form.full_name}
          onChange={(e) => setForm((p) => ({ ...p, full_name: e.target.value }))}
          className="w-full rounded-[1.75rem] border border-[#e7c3b4] bg-[#fff5eb] px-4 py-3 text-sm text-[#4d2c1e] outline-none focus:border-[#d87d59] focus:ring-2 focus:ring-[#f4d1c0]"
          placeholder="Masukkan nama pelanggan"
          required
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-[#5e2f1f] mb-2">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className="w-full rounded-[1.75rem] border border-[#e7c3b4] bg-[#fff5eb] px-4 py-3 text-sm text-[#4d2c1e] outline-none focus:border-[#d87d59] focus:ring-2 focus:ring-[#f4d1c0]"
            placeholder="email@contoh.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#5e2f1f] mb-2">No. Telepon</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            className="w-full rounded-[1.75rem] border border-[#e7c3b4] bg-[#fff5eb] px-4 py-3 text-sm text-[#4d2c1e] outline-none focus:border-[#d87d59] focus:ring-2 focus:ring-[#f4d1c0]"
            placeholder="0812-3456-7890"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-[#5e2f1f] mb-2">Status Loyalty</label>
        <select
          value={form.loyalty}
          onChange={(e) => setForm((p) => ({ ...p, loyalty: e.target.value }))}
          className="w-full rounded-[1.75rem] border border-[#e7c3b4] bg-[#fff5eb] px-4 py-3 text-sm text-[#4d2c1e] outline-none focus:border-[#d87d59] focus:ring-2 focus:ring-[#f4d1c0]"
        >
          {LOYALTY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    </>
  );

  // ── JSX ──────────────────────────────────────────────────
  return (
    <div className="animate-fadeIn space-y-6">
      <PageHeader
        title="Pelanggan"
        breadcrumb={[{ name: 'Dashboard', path: '/' }, { name: 'Pelanggan' }]}
      >
        <button
          onClick={() => { setAddForm(EMPTY_FORM); setAddError(''); setShowAddForm(true); }}
          className="rounded-[2rem] bg-[#E76F51] px-4 py-2 text-white shadow-lg shadow-[#E76F51]/20 transition hover:bg-[#cf5f49]"
        >
          + Tambah Pelanggan
        </button>
      </PageHeader>

      {/* Pesan sukses */}
      {successMsg && (
        <div className="rounded-[1.75rem] border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {successMsg}
        </div>
      )}

      {/* Ringkasan & Filter */}
      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-[2rem] border border-[#e7c3b4] bg-[#fff3ec] p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.24em] text-[#8c4a36]">Ringkasan Pelanggan</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[['Total', customers.length], ['Aktif', activeCount], ['Nonaktif', inactiveCount]].map(([label, val]) => (
              <div key={label} className="rounded-[1.75rem] bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.24em] text-[#7c4129]">{label}</p>
                <p className="mt-3 text-3xl font-semibold text-[#5e2f1f]">{val}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#e7c3b4] bg-[#fff3ec] p-6 shadow-sm">
          <div className="flex flex-wrap gap-3 mb-4">
            {['All', 'Aktif', 'Nonaktif'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${statusFilter === s ? 'bg-[#d87d59] text-white' : 'bg-[#fff1e6] text-[#7c4129] hover:bg-[#f7e3d7]'}`}
              >
                {s}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Cari nama, email, telepon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-[1.75rem] border border-[#e7c3b4] bg-white px-4 py-3 text-sm text-[#4d2c1e] outline-none focus:border-[#d87d59] focus:ring-2 focus:ring-[#f4d1c0]"
          />
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="rounded-[1.75rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Gagal memuat data: {error}
        </div>
      )}

      {/* Tabel */}
      <div className="overflow-x-auto rounded-[2rem] border border-[#e7c3b4] bg-white shadow-[0_20px_40px_rgba(231,111,81,0.08)]">
        {/* Loading state */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E76F51] border-t-transparent" />
            <span className="ml-3 text-sm text-[#7c4129]">Memuat data...</span>
          </div>
        ) : filteredCustomers.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-16 text-[#7c4129]">
            <span className="text-5xl mb-4">👥</span>
            <p className="text-base font-semibold">Belum ada pelanggan</p>
            <p className="text-sm mt-1">Tambah pelanggan baru untuk memulai.</p>
          </div>
        ) : (
          <table className="min-w-full text-sm text-[#2D2D2D]">
            <thead className="bg-[#fff1e6] text-[#7c4129]">
              <tr>
                {['No', 'Nama Pelanggan', 'Email', 'No. Telepon', 'Loyalty', 'Status', 'Aksi'].map((h) => (
                  <th key={h} className="px-4 py-4 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => (
                <tr
                  key={customer.id}
                  className={`border-b border-[#e7c3b4] transition ${index % 2 === 0 ? 'bg-white' : 'bg-[#fff5eb]'} hover:bg-[#fff2e7]`}
                >
                  <td className="px-4 py-4 font-medium">{index + 1}</td>
                  <td className="px-4 py-4 font-semibold text-[#5e2f1f]">
                    <Link to={`/customers/${customer.id}`} className="hover:underline">
                      {customer.full_name || '-'}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-[#7c4129]">{customer.email || '-'}</td>
                  <td className="px-4 py-4 text-[#7c4129]">{customer.phone || '-'}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getLoyaltyColor(customer.loyalty)}`}>
                      {customer.loyalty || 'Bronze'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatus(customer.loyalty) === 'Aktif' ? 'bg-[#d4f2df] text-[#276a3d]' : 'bg-[#ffead9] text-[#a65c44]'}`}>
                      {getStatus(customer.loyalty)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => openEdit(customer)}
                        className="rounded-2xl bg-[#d87d59] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#b45a44]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(customer)}
                        className="rounded-2xl bg-[#fff1e6] px-3 py-2 text-xs font-semibold text-[#7c4129] transition hover:bg-red-100 hover:text-red-700"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Tambah */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-[0_25px_60px_rgba(0,0,0,0.12)]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-[#5e2f1f]">Tambah Pelanggan Baru</h2>
                <p className="text-sm text-[#8c4a36]">Masukkan data pelanggan.</p>
              </div>
              <button onClick={() => setShowAddForm(false)} className="rounded-full bg-[#fff1e6] px-3 py-2 text-[#7c4129] hover:bg-[#f7e3d7]">✕</button>
            </div>
            {addError && <p className="mb-4 rounded-2xl bg-red-50 px-4 py-2 text-sm text-red-600">{addError}</p>}
            <form onSubmit={handleAdd} className="space-y-4">
              <FormFields form={addForm} setForm={setAddForm} />
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowAddForm(false)} className="rounded-[1.75rem] border border-[#e7c3b4] bg-[#fff1e6] px-5 py-3 text-sm font-semibold text-[#7c4129] hover:bg-[#f7e3d7]">Batal</button>
                <button type="submit" disabled={addLoading} className="rounded-[1.75rem] bg-[#E76F51] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#E76F51]/20 hover:bg-[#cf5f49] disabled:opacity-70">
                  {addLoading ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {showEditForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-[0_25px_60px_rgba(0,0,0,0.12)]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-[#5e2f1f]">Edit Pelanggan</h2>
                <p className="text-sm text-[#8c4a36]">Perbarui data pelanggan.</p>
              </div>
              <button onClick={() => setShowEditForm(false)} className="rounded-full bg-[#fff1e6] px-3 py-2 text-[#7c4129] hover:bg-[#f7e3d7]">✕</button>
            </div>
            {editError && <p className="mb-4 rounded-2xl bg-red-50 px-4 py-2 text-sm text-red-600">{editError}</p>}
            <form onSubmit={handleEdit} className="space-y-4">
              <FormFields form={editForm} setForm={setEditForm} />
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowEditForm(false)} className="rounded-[1.75rem] border border-[#e7c3b4] bg-[#fff1e6] px-5 py-3 text-sm font-semibold text-[#7c4129] hover:bg-[#f7e3d7]">Batal</button>
                <button type="submit" disabled={editLoading} className="rounded-[1.75rem] bg-[#E76F51] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#E76F51]/20 hover:bg-[#cf5f49] disabled:opacity-70">
                  {editLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
