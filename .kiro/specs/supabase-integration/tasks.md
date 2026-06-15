# Tasks: Integrasi Supabase + CRUD User

## Arsitektur 4 Zona

```
Zona 1 — Presentation    : Login.jsx, Register.jsx, Customers.jsx, CustomerDetail.jsx
Zona 2 — Business Logic  : AuthContext.jsx, authService.js, userService.js
Zona 3 — Data Access     : supabase.js (client), query via supabase.auth.* & supabase.from()
Zona 4 — BaaS (Supabase) : Auth, Database (profiles), RLS, Trigger
```

---

## Task List

- [ ] 1. Setup Package & Environment
  - [ ] 1.1 Install `@supabase/supabase-js` via npm
  - [ ] 1.2 Buat file `.env` dengan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`
  - [ ] 1.3 Buat file `.env.example` sebagai template
  - [ ] 1.4 Pastikan `.env` tercantum di `.gitignore`
  - **Zona:** Setup
  - **Requirement:** REQ-01

- [ ] 2. [Zona 3] Data Access Layer — Supabase Client
  - [ ] 2.1 Buat `src/services/supabase.js` — inisialisasi `createClient` dari env
  - **Zona:** Data Access Layer
  - **Requirement:** REQ-01

- [ ] 3. [Zona 2] Business Logic — Auth Service
  - [ ] 3.1 Buat `src/services/authService.js`
  - [ ] 3.2 Fungsi `login(email, password)` → `supabase.auth.signInWithPassword`
  - [ ] 3.3 Fungsi `register(email, password, { full_name, phone })` → `supabase.auth.signUp`
  - [ ] 3.4 Fungsi `logout()` → `supabase.auth.signOut`
  - [ ] 3.5 Fungsi `getSession()` → `supabase.auth.getSession`
  - [ ] 3.6 Semua fungsi return `{ data, error }`
  - **Zona:** Business Logic Layer
  - **Requirement:** REQ-02, REQ-03, REQ-05

- [ ] 4. [Zona 2] Business Logic — User Service (CRUD)
  - [ ] 4.1 Buat `src/services/userService.js`
  - [ ] 4.2 Fungsi `getProfiles()` → `supabase.from('profiles').select('*')`
  - [ ] 4.3 Fungsi `getProfileById(id)` → `supabase.from('profiles').select().eq('id', id).single()`
  - [ ] 4.4 Fungsi `createProfile(data)` → `supabase.from('profiles').insert`
  - [ ] 4.5 Fungsi `updateProfile(id, data)` → `supabase.from('profiles').update.eq('id', id)`
  - [ ] 4.6 Fungsi `deleteProfile(id)` → `supabase.from('profiles').delete.eq('id', id)`
  - [ ] 4.7 Semua fungsi return `{ data, error }`
  - **Zona:** Business Logic Layer
  - **Requirement:** REQ-06

- [ ] 5. [Zona 2] Business Logic — Auth Context
  - [ ] 5.1 Buat `src/contexts/AuthContext.jsx`
  - [ ] 5.2 State: `user`, `session`, `loading`
  - [ ] 5.3 Cek session awal via `getSession()` saat mount
  - [ ] 5.4 Subscribe `supabase.auth.onAuthStateChange` untuk update state reaktif
  - [ ] 5.5 Expose `signIn`, `signUp`, `signOut` via context
  - [ ] 5.6 Buat custom hook `useAuth()`
  - **Zona:** Business Logic Layer
  - **Requirement:** REQ-04

- [ ] 6. [Zona 1] Presentation — Protected Route
  - [ ] 6.1 Buat `src/components/ProtectedRoute.jsx`
  - [ ] 6.2 Jika `loading` → render `<Loading />`
  - [ ] 6.3 Jika tidak ada session → redirect ke `/login`
  - [ ] 6.4 Jika ada session → render `<Outlet />`
  - **Zona:** Presentation Layer
  - **Requirement:** REQ-04

- [ ] 7. [Zona 1] Presentation — Update App.jsx
  - [ ] 7.1 Wrap seluruh app dengan `<AuthProvider>`
  - [ ] 7.2 Wrap routes di MainLayout dengan `<ProtectedRoute>`
  - [ ] 7.3 Route `/login` dan `/register` tetap di luar ProtectedRoute
  - **Zona:** Presentation Layer
  - **Requirement:** REQ-04

- [ ] 8. [Zona 1] Presentation — Update Login Page
  - [ ] 8.1 Hapus logika `axios` dan `dummyjson.com`
  - [ ] 8.2 Import dan gunakan `useAuth` dari `AuthContext`
  - [ ] 8.3 Ubah field `usernameOrEmail` → `email`
  - [ ] 8.4 Panggil `signIn(email, password)` saat submit
  - [ ] 8.5 Tampilkan loading state, error state
  - [ ] 8.6 Sukses → navigate ke `/dashboard`
  - [ ] 8.7 Tampilkan pesan sukses registrasi dari `location.state?.message`
  - [ ] 8.8 Pertahankan seluruh desain Tailwind CSS yang ada
  - **Zona:** Presentation Layer
  - **Requirement:** REQ-02, REQ-09

- [ ] 9. [Zona 1] Presentation — Update Register Page
  - [ ] 9.1 Import dan gunakan `useAuth` dari `AuthContext`
  - [ ] 9.2 Panggil `signUp(email, password, { full_name, phone })` saat submit
  - [ ] 9.3 Tampilkan loading state, error state
  - [ ] 9.4 Sukses → navigate ke `/login` dengan `state: { message: 'Registrasi berhasil! Silakan login.' }`
  - [ ] 9.5 Pertahankan semua validasi form yang sudah ada
  - [ ] 9.6 Pertahankan seluruh desain Tailwind CSS yang ada
  - **Zona:** Presentation Layer
  - **Requirement:** REQ-03, REQ-09

- [ ] 10. [Zona 1] Presentation — Update Customers Page (CRUD)
  - [ ] 10.1 Hapus import dari `../data/customers`
  - [ ] 10.2 Import fungsi dari `userService`
  - [ ] 10.3 Tambah state: `loading`, `error`
  - [ ] 10.4 Fetch data dengan `getProfiles()` di `useEffect`
  - [ ] 10.5 Tambah pelanggan: panggil `createProfile`, refresh data
  - [ ] 10.6 Hapus pelanggan: konfirmasi window.confirm, panggil `deleteProfile`, refresh data
  - [ ] 10.7 Edit pelanggan: modal edit dengan data existing, panggil `updateProfile`, refresh data
  - [ ] 10.8 Tampilkan loading spinner, empty state, error state
  - [ ] 10.9 Pertahankan seluruh desain Tailwind CSS yang ada
  - **Zona:** Presentation Layer
  - **Requirement:** REQ-06, REQ-09

- [ ] 11. [Zona 1] Presentation — Update CustomerDetail Page
  - [ ] 11.1 Hapus import dari `../data/customers`
  - [ ] 11.2 Import `getProfileById` dari `userService`
  - [ ] 11.3 Tambah state: `customer`, `loading`, `error`
  - [ ] 11.4 Fetch data dengan `getProfileById(id)` di `useEffect`
  - [ ] 11.5 Tampilkan loading state dan error state
  - [ ] 11.6 Pertahankan seluruh desain Tailwind CSS yang ada
  - **Zona:** Presentation Layer
  - **Requirement:** REQ-06, REQ-09
