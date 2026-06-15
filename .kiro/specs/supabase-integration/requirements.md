# Requirements: Integrasi Supabase + CRUD User

## Ringkasan
Mengintegrasikan Supabase sebagai Backend as a Service (BaaS) pada project React + Vite + Tailwind CSS Catering App. Menggantikan autentikasi dummy JSON dengan Supabase Auth, membuat CRUD User berbasis Supabase, dan memastikan seluruh fitur yang sudah berjalan tetap berfungsi.

---

## Requirements

### REQ-01: Instalasi & Konfigurasi Supabase
- **User Story:** Sebagai developer, saya ingin mengintegrasikan Supabase ke dalam project agar dapat menggunakan layanan auth dan database secara real.
- **Acceptance Criteria:**
  1. Package `@supabase/supabase-js` terinstall di project.
  2. File `.env` berisi `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`.
  3. File service `src/services/supabase.js` dibuat sebagai single instance client Supabase.
  4. File `.env` tidak di-commit ke git (sudah ada di `.gitignore`).

---

### REQ-02: Autentikasi Login dengan Supabase
- **User Story:** Sebagai user, saya ingin bisa login menggunakan email dan password yang terdaftar di Supabase agar bisa mengakses dashboard.
- **Acceptance Criteria:**
  1. Halaman login (`/login`) menggunakan `supabase.auth.signInWithPassword()`.
  2. Login menggunakan email (bukan username).
  3. Jika login berhasil, user diarahkan ke `/dashboard`.
  4. Jika login gagal, pesan error ditampilkan di form.
  5. Terdapat loading state saat proses autentikasi berlangsung.
  6. Validasi form: email wajib diisi dan format valid, password wajib diisi minimal 6 karakter.
  7. Desain UI halaman login yang sudah ada dipertahankan.

---

### REQ-03: Registrasi User Baru dengan Supabase
- **User Story:** Sebagai calon user, saya ingin mendaftar akun baru agar bisa login ke aplikasi.
- **Acceptance Criteria:**
  1. Halaman register (`/register`) menggunakan `supabase.auth.signUp()`.
  2. Form registrasi memiliki field: nama lengkap, email, nomor telepon, password, konfirmasi password.
  3. Setelah registrasi berhasil, data profil (nama, telepon) tersimpan ke tabel `profiles` di Supabase.
  4. User yang baru mendaftar langsung dapat login tanpa perlu verifikasi email (email confirmation dinonaktifkan di Supabase dashboard).
  5. Setelah registrasi berhasil, user diarahkan ke halaman `/login` dengan pesan sukses.
  6. Jika email sudah terdaftar, pesan error yang sesuai ditampilkan.
  7. Validasi: nama min 3 karakter, email valid, telepon format Indonesia, password harus mengandung huruf besar dan angka, konfirmasi password harus cocok.
  8. Desain UI halaman register yang sudah ada dipertahankan.

---

### REQ-04: Auth Context & Protected Routes
- **User Story:** Sebagai user, saya tidak ingin bisa mengakses halaman dashboard jika belum login.
- **Acceptance Criteria:**
  1. `AuthContext` dibuat untuk menyimpan state user session secara global.
  2. Halaman yang memerlukan autentikasi (`/dashboard`, `/menu`, `/customers`, dll.) hanya bisa diakses oleh user yang sudah login.
  3. User yang belum login dan mencoba mengakses halaman protected diarahkan ke `/login`.
  4. User yang sudah login dan mencoba mengakses `/login` atau `/register` diarahkan ke `/dashboard`.
  5. Session user tetap terjaga setelah refresh halaman (menggunakan Supabase session persistence).
  6. Terdapat komponen `ProtectedRoute` yang reusable.

---

### REQ-05: Logout
- **User Story:** Sebagai user yang sudah login, saya ingin bisa logout agar sesi saya berakhir.
- **Acceptance Criteria:**
  1. Fungsi logout tersedia dan memanggil `supabase.auth.signOut()`.
  2. Setelah logout, user diarahkan ke halaman `/login`.
  3. Session user dihapus dari memori dan Supabase.

---

### REQ-06: CRUD User / Pelanggan dengan Supabase
- **User Story:** Sebagai admin, saya ingin bisa mengelola data pelanggan (Create, Read, Update, Delete) yang tersimpan di Supabase.
- **Acceptance Criteria:**
  1. Tabel `profiles` di Supabase digunakan untuk menyimpan data user/pelanggan: `id`, `full_name`, `email`, `phone`, `loyalty`, `address`, `company`, `notes`, `created_at`.
  2. Halaman `/customers` menampilkan daftar pelanggan yang diambil dari Supabase (bukan dummy data).
  3. Tambah pelanggan baru menyimpan data ke tabel `profiles` di Supabase.
  4. Edit pelanggan memperbarui data di Supabase.
  5. Hapus pelanggan menghapus data dari Supabase (dengan konfirmasi).
  6. Halaman `/customers/:id` menampilkan detail pelanggan yang diambil dari Supabase.
  7. Terdapat loading state saat data sedang diambil.
  8. Terdapat empty state jika tidak ada data pelanggan.
  9. Terdapat error state jika gagal mengambil data.

---

### REQ-07: Service Layer yang Reusable
- **User Story:** Sebagai developer, saya ingin logika Supabase dipisahkan ke layer service agar mudah digunakan ulang dan di-maintain.
- **Acceptance Criteria:**
  1. File `src/services/supabase.js` — inisialisasi Supabase client.
  2. File `src/services/authService.js` — fungsi login, register, logout, getSession.
  3. File `src/services/userService.js` — fungsi CRUD untuk tabel `profiles`.
  4. Semua service menggunakan `async/await` dan mengembalikan `{ data, error }`.
  5. Komponen halaman tidak memanggil Supabase secara langsung, melainkan melalui service.

---

### REQ-08: Mempertahankan Fitur yang Sudah Ada
- **User Story:** Sebagai pengguna, saya tidak ingin fitur yang sudah berjalan tiba-tiba rusak setelah integrasi Supabase.
- **Acceptance Criteria:**
  1. Halaman Dashboard, Menu, Keranjang, Riwayat, Orders, Components tetap berfungsi normal.
  2. Routing dan layout yang sudah ada tidak berubah strukturnya.
  3. Desain Tailwind CSS yang sudah ada dipertahankan sepenuhnya.
  4. File data dummy (`customers.js`, `menuData.js`, `orderData.js`) tidak dihapus — hanya data customers yang dialihkan ke Supabase.

---

### REQ-09: UX State Management
- **User Story:** Sebagai user, saya ingin mendapat feedback yang jelas saat menggunakan aplikasi.
- **Acceptance Criteria:**
  1. **Loading state:** Spinner atau teks "Memuat..." ditampilkan saat data sedang diproses.
  2. **Success state:** Pesan sukses ditampilkan setelah operasi berhasil (register, tambah/edit/hapus pelanggan).
  3. **Error state:** Pesan error yang informatif ditampilkan jika operasi gagal.
  4. **Empty state:** Tampilan khusus jika daftar pelanggan kosong.

---

## Struktur Folder yang Direkomendasikan

```
src/
├── assets/
├── components/
│   ├── ui/
│   └── ProtectedRoute.jsx          ← BARU
├── contexts/
│   └── AuthContext.jsx             ← BARU
├── data/
│   ├── customers.js                (tetap, tidak dihapus)
│   ├── menuData.js
│   └── orderData.js
├── layouts/
├── lib/
├── pages/
│   ├── auth/
│   │   ├── Login.jsx               ← DIUBAH (koneksi Supabase)
│   │   ├── Register.jsx            ← DIUBAH (koneksi Supabase)
│   │   └── Forgot.jsx
│   ├── Customers.jsx               ← DIUBAH (CRUD Supabase)
│   ├── CustomerDetail.jsx          ← DIUBAH (fetch dari Supabase)
│   └── ...
├── services/
│   ├── supabase.js                 ← BARU (Supabase client)
│   ├── authService.js              ← BARU (auth functions)
│   └── userService.js              ← BARU (CRUD profiles)
├── App.jsx                         ← DIUBAH (AuthProvider + ProtectedRoute)
└── main.jsx
```

---

## File yang Perlu Dibuat (BARU)

| File | Keterangan |
|------|-----------|
| `.env` | Variabel environment Supabase |
| `.env.example` | Template env untuk dokumentasi |
| `src/services/supabase.js` | Supabase client instance |
| `src/services/authService.js` | Fungsi login, register, logout |
| `src/services/userService.js` | Fungsi CRUD tabel profiles |
| `src/contexts/AuthContext.jsx` | Global auth state & session |
| `src/components/ProtectedRoute.jsx` | Guard untuk protected routes |

## File yang Perlu Diubah (EXISTING)

| File | Perubahan |
|------|-----------|
| `src/App.jsx` | Tambah AuthProvider wrapper + ProtectedRoute |
| `src/pages/auth/Login.jsx` | Ganti dummy auth → Supabase signIn |
| `src/pages/auth/Register.jsx` | Hubungkan ke Supabase signUp |
| `src/pages/Customers.jsx` | Ganti dummy data → fetch Supabase + CRUD |
| `src/pages/CustomerDetail.jsx` | Ganti dummy data → fetch single dari Supabase |
| `package.json` | Tambah dependency `@supabase/supabase-js` |

---

## Supabase Database Schema

### Tabel: `profiles`
```sql
create table profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  email text unique,
  phone text,
  loyalty text default 'Bronze' check (loyalty in ('Bronze', 'Silver', 'Gold')),
  address text,
  company text,
  notes text,
  created_at timestamptz default now()
);

-- Row Level Security
alter table profiles enable row level security;

-- Policy: user bisa baca semua profil (admin view)
create policy "Profiles are viewable by authenticated users"
  on profiles for select
  using (auth.role() = 'authenticated');

-- Policy: user hanya bisa update profil sendiri
create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Policy: insert saat registrasi
create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = id);
```

---

## Catatan Tambahan
- Supabase email confirmation **dinonaktifkan** agar user bisa langsung login setelah registrasi.
- `src/pages/Login.jsx` dan `src/pages/Register.jsx` (di folder pages root) tidak dihapus, tetapi yang aktif di routing adalah `src/pages/auth/Login.jsx` dan `src/pages/auth/Register.jsx`.
- Semua perubahan harus backward-compatible dengan fitur yang sudah ada.
