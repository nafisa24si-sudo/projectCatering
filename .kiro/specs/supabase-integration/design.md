# Design: Integrasi Supabase + CRUD User

## Arsitektur 4 Zona

```
┌────────────────────────────────────────────────────────────┐
│  ZONA 1: Presentation Layer                                │
│  src/pages/auth/Login.jsx                                  │
│  src/pages/auth/Register.jsx                               │
│  src/pages/Customers.jsx                                   │
│  src/pages/CustomerDetail.jsx                              │
│  src/components/ProtectedRoute.jsx                         │
└─────────────────────────┬──────────────────────────────────┘
                          │ memanggil
┌─────────────────────────▼──────────────────────────────────┐
│  ZONA 2: Business Logic Layer                              │
│  src/contexts/AuthContext.jsx  (state session global)      │
│  src/services/authService.js   (login, register, logout)   │
│  src/services/userService.js   (validasi & orkestrasi CRUD)│
└─────────────────────────┬──────────────────────────────────┘
                          │ memanggil
┌─────────────────────────▼──────────────────────────────────┐
│  ZONA 3: Data Access Layer                                 │
│  src/services/supabase.js  (Supabase client instance)      │
│  — query ke auth.users via supabase.auth.*                 │
│  — query ke tabel profiles via supabase.from('profiles')   │
└─────────────────────────┬──────────────────────────────────┘
                          │ HTTP/WebSocket
┌─────────────────────────▼──────────────────────────────────┐
│  ZONA 4: Backend as a Service (Supabase)                   │
│  - Auth (email+password, session management)               │
│  - Database: tabel public.profiles                         │
│  - Row Level Security (RLS)                                │
│  - Trigger: auto-insert profile saat user baru dibuat      │
└────────────────────────────────────────────────────────────┘
```

---

## 1. Supabase Client (`src/services/supabase.js`)

Single instance yang digunakan di seluruh aplikasi.

```js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

---

## 2. Auth Service (`src/services/authService.js`)

Semua operasi autentikasi terpusat di sini.

```js
// Fungsi yang disediakan:
login(email, password)     → { data, error }
register(email, password, meta: { full_name, phone })  → { data, error }
logout()                   → { error }
getSession()               → { data: { session }, error }
onAuthStateChange(callback) → subscription
```

**Flow Login:**
1. Panggil `supabase.auth.signInWithPassword({ email, password })`
2. Jika berhasil → return `{ data, error: null }`
3. Jika gagal → return `{ data: null, error }`

**Flow Register:**
1. Panggil `supabase.auth.signUp({ email, password, options: { data: { full_name, phone } } })`
2. Jika berhasil → insert ke tabel `profiles` dengan data tambahan
3. Return `{ data, error }`

---

## 3. User Service (`src/services/userService.js`)

CRUD untuk tabel `profiles`.

```js
// Fungsi yang disediakan:
getProfiles()              → { data: Profile[], error }
getProfileById(id)         → { data: Profile, error }
createProfile(profileData) → { data, error }
updateProfile(id, updates) → { data, error }
deleteProfile(id)          → { data, error }
```

**Tipe Profile:**
```ts
{
  id: string          // uuid, FK ke auth.users
  full_name: string
  email: string
  phone: string
  loyalty: 'Bronze' | 'Silver' | 'Gold'
  address: string
  company: string
  notes: string
  created_at: string
}
```

---

## 4. Auth Context (`src/contexts/AuthContext.jsx`)

Global state untuk session user.

```jsx
// State yang disimpan:
{
  user: null | User,      // dari supabase.auth.getUser()
  session: null | Session,
  loading: boolean        // true saat cek session awal
}

// Fungsi yang diexpose via context:
{
  user,
  session,
  loading,
  signIn(email, password),
  signUp(email, password, meta),
  signOut()
}
```

**Lifecycle:**
1. Saat mount → `supabase.auth.getSession()` untuk cek session yang ada
2. Subscribe ke `supabase.auth.onAuthStateChange` untuk reaktif terhadap perubahan session
3. `loading: true` selama cek session awal, set `false` setelah selesai

---

## 5. Protected Route (`src/components/ProtectedRoute.jsx`)

Komponen guard untuk melindungi route.

```jsx
// Behavior:
// - Jika loading → tampilkan <Loading />
// - Jika tidak ada session → redirect ke /login
// - Jika ada session → render <Outlet />

// Digunakan di App.jsx:
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
  ...semua route protected...
</Route>
```

---

## 6. Perubahan `App.jsx`

```jsx
// Sebelum:
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          ...routes...
        </Route>
      </Routes>
    </Router>
  )
}

// Sesudah:
function App() {
  return (
    <Router>
      <AuthProvider>           {/* ← tambahan */}
        <Routes>
          <Route element={<ProtectedRoute />}>   {/* ← guard */}
            <Route element={<MainLayout />}>
              ...protected routes...
            </Route>
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" ... />
            <Route path="/register" ... />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}
```

---

## 7. Perubahan Halaman Login (`src/pages/auth/Login.jsx`)

**Sebelum:** Menggunakan `axios` ke `dummyjson.com`

**Sesudah:**
- Import `useAuth` dari `AuthContext`
- Panggil `signIn(email, password)` dari context
- Field: email + password (bukan username lagi)
- Handle loading, error, success → navigate ke `/dashboard`
- UI/desain dipertahankan sepenuhnya

---

## 8. Perubahan Halaman Register (`src/pages/auth/Register.jsx`)

**Sebelum:** Form tanpa koneksi backend

**Sesudah:**
- Import `useAuth` dari `AuthContext`
- Panggil `signUp(email, password, { full_name, phone })`
- Setelah sukses → navigate ke `/login` dengan state pesan sukses
- Tampilkan pesan sukses di halaman login jika ada `location.state.message`
- UI/desain dipertahankan sepenuhnya

---

## 9. Perubahan Halaman Customers (`src/pages/Customers.jsx`)

**Sebelum:** Data dari `import { customers } from '../data/customers'`

**Sesudah:**
- `useEffect` → panggil `getProfiles()` dari `userService`
- State: `customers`, `loading`, `error`
- Tambah pelanggan → panggil `createProfile(formData)`
- Hapus pelanggan → panggil `deleteProfile(id)` dengan konfirmasi dialog
- Tambah tombol Edit → buka modal edit, panggil `updateProfile(id, data)`
- Tampilkan loading spinner, empty state, error state

---

## 10. Perubahan Halaman CustomerDetail (`src/pages/CustomerDetail.jsx`)

**Sebelum:** `customers.find(item => item.id === id)` dari dummy data

**Sesudah:**
- `useEffect` → panggil `getProfileById(id)` dari `userService`
- State: `customer`, `loading`, `error`
- Tampilkan loading dan error state

---

## 11. Database Schema Supabase

### Tabel `profiles`
```sql
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text not null,
  email text unique not null,
  phone text,
  loyalty text not null default 'Bronze'
    check (loyalty in ('Bronze', 'Silver', 'Gold')),
  address text,
  company text,
  notes text,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policy: semua authenticated user bisa baca semua profil (untuk admin view)
create policy "Authenticated users can view all profiles"
  on public.profiles for select
  to authenticated
  using (true);

-- Policy: insert saat register (user baru insert profil sendiri)
create policy "Users can insert own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

-- Policy: user bisa update profil sendiri
create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id);

-- Policy: admin bisa delete profil (untuk saat ini pakai service_role atau relaxed)
create policy "Authenticated users can delete profiles"
  on public.profiles for delete
  to authenticated
  using (true);
```

### Trigger: Auto-insert profile saat registrasi
```sql
-- Function untuk auto-insert ke profiles saat user baru dibuat
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, phone)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email,
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

---

## 12. Variabel Environment

### `.env` (tidak di-commit)
```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### `.env.example` (di-commit sebagai template)
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 13. Error Handling Pattern

Semua service mengembalikan format konsisten:
```js
// Sukses
return { data: result, error: null }

// Gagal
return { data: null, error: errorMessage }
```

Di komponen, pattern penggunaannya:
```js
const { data, error } = await login(email, password)
if (error) {
  setError(error)
  return
}
// handle success
```

---

## 14. Loading State Pattern

```jsx
// Skeleton / spinner saat fetch data
{loading && <LoadingSpinner />}

// Empty state
{!loading && customers.length === 0 && <EmptyState />}

// Error state
{error && <ErrorMessage message={error} />}

// Data tersedia
{!loading && !error && customers.length > 0 && <DataTable />}
```

---

## Ringkasan File

| File | Status | Keterangan |
|------|--------|-----------|
| `.env` | BARU | Supabase credentials |
| `.env.example` | BARU | Template env |
| `src/services/supabase.js` | BARU | Client instance |
| `src/services/authService.js` | BARU | Auth functions |
| `src/services/userService.js` | BARU | CRUD profiles |
| `src/contexts/AuthContext.jsx` | BARU | Global auth state |
| `src/components/ProtectedRoute.jsx` | BARU | Route guard |
| `src/App.jsx` | UBAH | AuthProvider + ProtectedRoute |
| `src/pages/auth/Login.jsx` | UBAH | Supabase signIn |
| `src/pages/auth/Register.jsx` | UBAH | Supabase signUp |
| `src/pages/Customers.jsx` | UBAH | CRUD dari Supabase |
| `src/pages/CustomerDetail.jsx` | UBAH | Fetch dari Supabase |
| `package.json` | UBAH | Tambah @supabase/supabase-js |
