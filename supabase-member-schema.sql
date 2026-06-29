-- ================================================================
-- MEMBER SYSTEM SCHEMA
-- Jalankan di Supabase SQL Editor
-- ================================================================

-- 1. Tambah kolom points ke tabel profiles (jika belum ada)
alter table public.profiles
  add column if not exists points integer not null default 0,
  add column if not exists total_transactions integer not null default 0,
  add column if not exists last_transaction_at timestamptz,
  add column if not exists streak_days integer not null default 0;

-- 2. Update loyalty otomatis berdasarkan poin (computed via function)
create or replace function public.get_loyalty_from_points(p integer)
returns text as $$
begin
  if p >= 2001 then return 'Gold';
  elsif p >= 1001 then return 'Silver';
  else return 'Bronze';
  end if;
end;
$$ language plpgsql immutable;

-- 3. Tabel vouchers — daftar voucher yang tersedia
create table if not exists public.vouchers (
  id uuid default gen_random_uuid() primary key,
  code text unique not null,
  name text not null,
  description text,
  discount_percent integer not null,
  points_required integer not null,
  min_loyalty text not null default 'Bronze' check (min_loyalty in ('Bronze','Silver','Gold')),
  valid_until timestamptz,
  max_uses integer default 100,
  used_count integer default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- 4. Tabel member_vouchers — voucher yang sudah dimiliki user
create table if not exists public.member_vouchers (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  voucher_id uuid references public.vouchers(id) on delete cascade,
  redeemed_at timestamptz default now(),
  is_used boolean default false,
  used_at timestamptz,
  unique(user_id, voucher_id)
);

-- 5. Tabel transactions — riwayat transaksi untuk hitung poin
create table if not exists public.transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  amount integer not null,
  points_earned integer not null default 0,
  description text,
  created_at timestamptz default now()
);

-- 6. RLS policies
alter table public.vouchers enable row level security;
alter table public.member_vouchers enable row level security;
alter table public.transactions enable row level security;

drop policy if exists "Anyone can read vouchers" on public.vouchers;
create policy "Anyone can read vouchers" on public.vouchers
  for select to authenticated using (true);

drop policy if exists "Users manage own member_vouchers" on public.member_vouchers;
create policy "Users manage own member_vouchers" on public.member_vouchers
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users read own transactions" on public.transactions;
create policy "Users read own transactions" on public.transactions
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "Users insert own transactions" on public.transactions;
create policy "Users insert own transactions" on public.transactions
  for insert to authenticated with check (auth.uid() = user_id);

-- 7. Seed vouchers contoh
insert into public.vouchers (code, name, description, discount_percent, points_required, min_loyalty, valid_until)
values
  ('BRONZE5',   'Diskon Bronze 5%',   'Diskon 5% untuk semua menu',           5,  100, 'Bronze', now() + interval '1 year'),
  ('SILVER15',  'Diskon Silver 15%',  'Diskon 15% untuk paket catering',      15, 300, 'Silver', now() + interval '1 year'),
  ('GOLD30',    'Diskon Gold 30%',    'Diskon 30% untuk semua paket premium', 30, 500, 'Gold',   now() + interval '1 year'),
  ('WELCOME10', 'Welcome Bonus 10%',  'Bonus selamat datang member baru',     10, 50,  'Bronze', now() + interval '6 months'),
  ('LOYAL20',   'Loyalty Reward 20%', 'Hadiah loyalitas pelanggan setia',     20, 400, 'Silver', now() + interval '1 year')
on conflict (code) do nothing;
