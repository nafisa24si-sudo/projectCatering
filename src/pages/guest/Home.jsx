import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChefHat, Star, Users, Award, Clock, Phone, Mail, MapPin,
  ChevronLeft, ChevronRight, Check, ArrowRight, Menu, X,
  Share2, MessageCircle, Send
} from 'lucide-react';

// ── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = ['Beranda', 'Menu', 'Paket', 'Tentang', 'Testimoni'];

const CAROUSEL = [
  { src: '/food-scatter.jpg',      caption: 'Sajian Premium untuk Acara Spesial Anda' },
  { src: '/food-right-top.jpg',    caption: 'Menu Lezat dari Bahan Pilihan Berkualitas' },
  { src: '/food-top-center.jpg',   caption: 'Katering Profesional · Higienis · Terpercaya' },
  { src: '/food-bottom-left.jpg',  caption: 'Lebih dari 2.400 Pelanggan Puas Kami Layani' },
];

const MENUS = [
  { img: '/menu-nasi-box.jpg',   name: 'Nasi Box Premium',    price: 'Rp 25.000',  tag: 'Terlaris',  desc: 'Nasi pulen, ayam goreng rempah, sayur tumis, sambal, & kerupuk.' },
  { img: '/menu-seafood.jpg',    name: 'Paket Seafood',       price: 'Rp 50.000',  tag: 'Favorit',   desc: 'Udang saus padang, cumi goreng tepung, ikan bakar, & lalapan segar.' },
  { img: '/menu-vegetarian.jpg', name: 'Paket Vegetarian',    price: 'Rp 30.000',  tag: 'Sehat',     desc: 'Gado-gado, pecel sayur, tempe mendoan, & jus buah segar.' },
  { img: '/menu-spesial.jpg',    name: 'Paket Spesial VIP',   price: 'Rp 75.000',  tag: 'Premium',   desc: 'Ayam kodok isi, salad buah, dessert, & minuman pilihan.' },
  { img: '/menu-prasmanan.jpg',  name: 'Paket Prasmanan',     price: 'Rp 45.000',  tag: 'Event',     desc: 'Berbagai pilihan lauk pauk, sayur, & karbohidrat untuk acara.' },
  { img: '/menu-dessert.jpg',    name: 'Paket Dessert Table', price: 'Rp 35.000',  tag: 'Manis',     desc: 'Kue-kue tradisional, puding, & aneka minuman segar pilihan.' },
];

const PACKAGES = [
  {
    name: 'Basic',
    price: 'Rp 2.500.000',
    unit: '/ acara',
    color: 'border-gray-200',
    badge: '',
    features: ['Min. 50 porsi', 'Nasi Box standar', '2 pilihan lauk', 'Alat makan sekali pakai', 'Pengiriman area kota'],
  },
  {
    name: 'Professional',
    price: 'Rp 5.500.000',
    unit: '/ acara',
    color: 'border-[#C96E4A]',
    badge: 'Terpopuler',
    features: ['Min. 100 porsi', 'Prasmanan lengkap', '5 pilihan lauk', 'Meja & peralatan prasmanan', 'Staff pelayanan 2 orang', 'Dekorasi meja minimalis'],
  },
  {
    name: 'Premium',
    price: 'Rp 12.000.000',
    unit: '/ acara',
    color: 'border-gray-200',
    badge: '',
    features: ['Min. 200 porsi', 'Full catering service', 'Menu custom', 'Peralatan lengkap', 'Staff pelayanan 5 orang', 'Dekorasi & dokumentasi', 'Konsultasi menu gratis'],
  },
];

const TESTIMONIALS = [
  { name: 'Rina Susanti',    role: 'Ibu Rumah Tangga',    rating: 5, photo: '👩',  text: 'Makanannya enak banget! Tamu undangan di arisan saya sampai nambah berkali-kali. Pelayanannya juga sangat ramah dan tepat waktu.' },
  { name: 'Budi Prasetyo',   role: 'Manager Perusahaan',  rating: 5, photo: '👨',  text: 'Sudah 3 kali pakai Sajian Kita untuk acara kantor. Konsisten enak, bersih, dan selalu on-time. Pasti akan order lagi!' },
  { name: 'Dewi Anggraeni',  role: 'Wedding Organizer',   rating: 5, photo: '👩‍💼', text: 'Rekomendasikan ke semua klien pernikahan saya. Presentasinya mewah, rasa tidak mengecewakan, dan tim sangat profesional.' },
  { name: 'Ahmad Fauzi',     role: 'Ketua RT',             rating: 5, photo: '👨‍💼', text: 'Untuk acara 17-an kemarin luar biasa! Harga terjangkau tapi kualitas tidak kalah sama restoran mahal. Warga semua suka.' },
];

const STATS = [
  { icon: Users,  value: '2.400+', label: 'Pelanggan Puas' },
  { icon: ChefHat, value: '150+',  label: 'Menu Tersedia' },
  { icon: Award,  value: '10+',   label: 'Tahun Pengalaman' },
  { icon: Clock,  value: '24/7',  label: 'Siap Melayani' },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function StarRating({ n = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function TagBadge({ text }) {
  const colors = {
    Terlaris: 'bg-[#C96E4A] text-white',
    Favorit:  'bg-amber-500 text-white',
    Sehat:    'bg-green-500 text-white',
    Premium:  'bg-purple-600 text-white',
    Event:    'bg-blue-500 text-white',
    Manis:    'bg-pink-500 text-white',
  };
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${colors[text] ?? 'bg-gray-200 text-gray-700'}`}>
      {text}
    </span>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Home() {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const intervalRef = useRef(null);

  // Navbar scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-carousel
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCarouselIdx((p) => (p + 1) % CAROUSEL.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const prevSlide = () => {
    clearInterval(intervalRef.current);
    setCarouselIdx((p) => (p - 1 + CAROUSEL.length) % CAROUSEL.length);
  };
  const nextSlide = () => {
    clearInterval(intervalRef.current);
    setCarouselIdx((p) => (p + 1) % CAROUSEL.length);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 scroll-smooth">

      {/* ════════════════════════════════════════════
          NAVBAR
      ════════════════════════════════════════════ */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md shadow-[#C96E4A]/10' : 'bg-transparent'
      }`}>
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <img src="/sajian-kita-logo.svg" alt="Sajian Kita"
              className="h-14 w-14 object-contain drop-shadow" />
            <div className="leading-tight">
              <p className={`text-sm font-black tracking-tight transition ${scrolled ? 'text-[#3D1F0D]' : 'text-white drop-shadow'}`}>Sajian Kita</p>
              <p className={`text-[9px] tracking-widest uppercase transition ${scrolled ? 'text-[#C96E4A]' : 'text-white/80 drop-shadow'}`}>Catering</p>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())}
                className={`text-sm font-semibold transition hover:text-[#C96E4A] ${scrolled ? 'text-gray-700' : 'text-white drop-shadow'}`}>
                {item}
              </button>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login"
              className={`rounded-full px-5 py-2 text-sm font-bold transition border ${
                scrolled ? 'border-[#C96E4A] text-[#C96E4A] hover:bg-[#C96E4A] hover:text-white' : 'border-white text-white hover:bg-white hover:text-[#C96E4A]'
              }`}>
              Login
            </Link>
            <Link to="/register"
              className="rounded-full bg-[#C96E4A] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-[#C96E4A]/30 transition hover:bg-[#A85535] hover:-translate-y-0.5">
              Daftar
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className={`md:hidden transition ${scrolled ? 'text-gray-700' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3 shadow-lg">
            {NAV_LINKS.map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())}
                className="block w-full text-left text-sm font-semibold text-gray-700 py-2 border-b border-gray-50 hover:text-[#C96E4A] transition">
                {item}
              </button>
            ))}
            <div className="flex gap-3 pt-2">
              <Link to="/login" className="flex-1 rounded-full border border-[#C96E4A] py-2 text-center text-sm font-bold text-[#C96E4A]">Login</Link>
              <Link to="/register" className="flex-1 rounded-full bg-[#C96E4A] py-2 text-center text-sm font-bold text-white">Daftar</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ════════════════════════════════════════════
          HERO — CAROUSEL
      ════════════════════════════════════════════ */}
      <section id="beranda" className="relative h-screen min-h-[600px] overflow-hidden">
        {/* Slides */}
        {CAROUSEL.map((slide, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === carouselIdx ? 'opacity-100' : 'opacity-0'}`}>
            <img src={slide.src} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </div>
        ))}

        {/* Hero content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <span className="mb-4 rounded-full bg-[#C96E4A]/80 px-4 py-1.5 text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
            ✦ Katering Premium Jakarta ✦
          </span>
          <h1 className="text-5xl md:text-7xl font-black leading-tight drop-shadow-lg max-w-4xl">
            Sajian <span className="text-[#F4A261]">Terbaik</span><br />untuk Momen Anda
          </h1>
          <p className="mt-5 max-w-xl text-base md:text-lg text-white/80 leading-relaxed">
            {CAROUSEL[carouselIdx].caption}
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <button onClick={() => scrollTo('paket')}
              className="group rounded-full bg-[#C96E4A] px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#C96E4A]/40 transition hover:bg-[#A85535] hover:-translate-y-0.5 hover:shadow-2xl">
              Pesan Sekarang
              <ArrowRight className="inline ml-2 h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <button onClick={() => scrollTo('menu')}
              className="rounded-full border-2 border-white/70 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#C96E4A]">
              Lihat Menu
            </button>
          </div>
        </div>

        {/* Arrows */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-[#C96E4A]">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-[#C96E4A]">
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {CAROUSEL.map((_, i) => (
            <button key={i} onClick={() => setCarouselIdx(i)}
              className={`rounded-full transition-all duration-300 ${i === carouselIdx ? 'w-8 h-2.5 bg-[#C96E4A]' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white'}`} />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-1 text-white/50">
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <div className="h-8 w-px bg-white/30 animate-pulse" />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          STATS BAR
      ════════════════════════════════════════════ */}
      <section className="bg-[#C96E4A] py-10">
        <div className="mx-auto max-w-5xl px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center text-white text-center">
              <Icon className="h-6 w-6 mb-2 text-white/80" />
              <p className="text-3xl font-black">{value}</p>
              <p className="text-xs text-white/70 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          MENU FAVORIT
      ════════════════════════════════════════════ */}
      <section id="menu" className="py-24 bg-[#faf9f7]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-[#C96E4A]">Menu Kami</span>
            <h2 className="mt-2 text-4xl font-black text-[#1a1a1a]">Menu Favorit Pelanggan</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">Dibuat dari bahan-bahan segar pilihan, dimasak oleh chef berpengalaman dengan standar kebersihan tertinggi.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MENUS.map((item) => (
              <div key={item.name}
                className="group rounded-3xl bg-white overflow-hidden shadow-sm ring-1 ring-gray-100 transition hover:shadow-xl hover:shadow-[#C96E4A]/10 hover:-translate-y-1">
                {/* Foto */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <TagBadge text={item.tag} />
                  </div>
                </div>
                {/* Konten */}
                <div className="p-5">
                  <h3 className="font-bold text-[#1a1a1a] text-base">{item.name}</h3>
                  <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-black text-[#C96E4A]">{item.price}</span>
                    <span className="text-xs text-gray-400">/ porsi</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button onClick={() => scrollTo('paket')}
              className="rounded-full border-2 border-[#C96E4A] px-8 py-3 text-sm font-bold text-[#C96E4A] transition hover:bg-[#C96E4A] hover:text-white">
              Lihat Semua Paket →
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PAKET CATERING
      ════════════════════════════════════════════ */}
      <section id="paket" className="py-24 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-[#C96E4A]">Harga & Paket</span>
            <h2 className="mt-2 text-4xl font-black text-[#1a1a1a]">Pilih Paket Catering Anda</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">Berbagai pilihan paket sesuai kebutuhan dan budget acara Anda.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {PACKAGES.map((pkg) => (
              <div key={pkg.name}
                className={`relative rounded-3xl border-2 p-8 transition hover:shadow-xl hover:-translate-y-1 ${
                  pkg.badge ? 'border-[#C96E4A] shadow-lg shadow-[#C96E4A]/15 bg-[#FFF8F5]' : 'border-gray-200 bg-white'
                }`}>
                {pkg.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-[#C96E4A] px-5 py-1.5 text-xs font-bold text-white shadow-lg">
                      ✦ {pkg.badge}
                    </span>
                  </div>
                )}
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{pkg.name}</p>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-3xl font-black text-[#1a1a1a]">{pkg.price}</span>
                  <span className="text-sm text-gray-400 mb-1">{pkg.unit}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <Check className="h-4 w-4 text-[#C96E4A] flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-8 w-full rounded-2xl py-3 text-sm font-bold transition hover:-translate-y-0.5 ${
                    pkg.badge
                      ? 'bg-[#C96E4A] text-white shadow-lg shadow-[#C96E4A]/30 hover:bg-[#A85535]'
                      : 'border-2 border-[#C96E4A] text-[#C96E4A] hover:bg-[#C96E4A] hover:text-white'
                  }`}>
                  Pesan Paket Ini
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TENTANG KAMI
      ════════════════════════════════════════════ */}
      <section id="tentang" className="py-24 bg-[#faf9f7]">
        <div className="mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-2 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img src="/food-right-top.jpg" alt="Tentang Kami" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-3xl bg-[#C96E4A] p-6 text-white shadow-xl w-44 text-center hidden md:block">
              <p className="text-4xl font-black">10+</p>
              <p className="text-sm text-white/80 mt-1">Tahun Melayani</p>
            </div>
            <div className="absolute -top-4 -left-4 rounded-2xl bg-white p-4 shadow-lg hidden md:flex items-center gap-3">
              <span className="text-3xl">⭐</span>
              <div>
                <p className="font-black text-[#1a1a1a]">4.9 / 5</p>
                <p className="text-xs text-gray-500">500+ ulasan</p>
              </div>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#C96E4A]">Tentang Kami</span>
            <h2 className="mt-2 text-4xl font-black text-[#1a1a1a] leading-tight">
              Lebih dari Sekadar<br />Catering Biasa
            </h2>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Sajian Kita Catering hadir sejak 2014 dengan misi menyajikan makanan lezat, higienis, dan terpercaya untuk setiap momen berharga Anda. Dari acara keluarga kecil hingga gala dinner perusahaan.
            </p>
            <p className="mt-3 text-gray-500 leading-relaxed">
              Kami menggunakan bahan-bahan segar yang dipilih setiap hari, dimasak oleh tim chef berpengalaman dengan standar kebersihan HACCP.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: '🥘', title: 'Bahan Segar Harian',   desc: 'Dipilih setiap pagi dari pasar terbaik' },
                { icon: '👨‍🍳', title: 'Chef Berpengalaman',  desc: '10+ tahun pengalaman memasak' },
                { icon: '🚚', title: 'Pengiriman Tepat Waktu', desc: 'Garansi on-time delivery' },
                { icon: '🏆', title: 'Standar HACCP',         desc: 'Sertifikat keamanan pangan' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <p className="text-sm font-bold text-[#1a1a1a]">{title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TESTIMONI
      ════════════════════════════════════════════ */}
      <section id="testimoni" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-[#C96E4A]">Testimoni</span>
            <h2 className="mt-2 text-4xl font-black text-[#1a1a1a]">Kata Mereka tentang Kami</h2>
            <p className="mt-3 text-gray-500">Kepuasan pelanggan adalah prioritas utama kami.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.name}
                className="rounded-3xl bg-[#faf9f7] p-6 ring-1 ring-gray-100 transition hover:shadow-lg hover:-translate-y-0.5">
                <StarRating n={t.rating} />
                <p className="mt-4 text-sm text-gray-600 leading-relaxed italic">"{t.text}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF5EB] text-xl shadow-inner">
                    {t.photo}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1a1a1a]">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CTA
      ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#C96E4A] py-24">
        <div className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-black/10" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            Siap Membuat Acara Anda<br />Tak Terlupakan?
          </h2>
          <p className="mt-4 text-white/80 text-lg">
            Hubungi kami sekarang dan dapatkan konsultasi menu gratis untuk acara Anda.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link to="/register"
              className="rounded-full bg-white px-8 py-3.5 text-sm font-black text-[#C96E4A] shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl">
              Daftar & Pesan Sekarang
            </Link>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer"
              className="rounded-full border-2 border-white/70 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#C96E4A]">
              💬 Chat WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════ */}
      <footer className="bg-[#1a1a1a] text-gray-400">
        <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/sajian-kita-logo.svg" alt="Sajian Kita"
                className="h-12 w-12 object-contain" />
              <div>
                <p className="text-sm font-black text-white">Sajian Kita</p>
                <p className="text-[10px] text-[#C96E4A] tracking-widest uppercase">Catering</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Lezat, Higienis, Terpercaya. Melayani berbagai acara dengan standar kualitas terbaik sejak 2014.
            </p>
            <div className="mt-5 flex gap-3">
            {[Share2, MessageCircle, Send].map((Icon, i) => (
                <div key={i} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-gray-400 transition hover:bg-[#C96E4A] hover:text-white cursor-pointer">
                  <Icon className="h-4 w-4" />
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-sm font-bold text-white mb-4">Menu Cepat</p>
            <ul className="space-y-2.5 text-sm">
              {['Beranda', 'Menu Kami', 'Paket Catering', 'Tentang Kami', 'Testimoni'].map((item) => (
                <li key={item}>
                  <button onClick={() => scrollTo(item.split(' ')[0].toLowerCase())}
                    className="hover:text-[#C96E4A] transition">{item}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <p className="text-sm font-bold text-white mb-4">Layanan</p>
            <ul className="space-y-2.5 text-sm">
              {['Catering Pernikahan', 'Catering Perusahaan', 'Catering Ulang Tahun', 'Catering Seminar', 'Nasi Box Harian'].map((item) => (
                <li key={item} className="hover:text-[#C96E4A] transition cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <p className="text-sm font-bold text-white mb-4">Kontak</p>
            <ul className="space-y-3 text-sm">
              {[
                { icon: Phone,  text: '+62 812-3456-7890' },
                { icon: Mail,   text: 'hello@sajiankita.id' },
                { icon: MapPin, text: 'Jl. Raya Catering No. 1, Jakarta Selatan' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-2.5">
                  <Icon className="h-4 w-4 text-[#C96E4A] flex-shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 px-6 py-5">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <p>© 2026 Sajian Kita Catering. Semua hak dilindungi.</p>
            <div className="flex gap-5">
              {['Kebijakan Privasi', 'Syarat & Ketentuan', 'FAQ'].map((item) => (
                <span key={item} className="hover:text-[#C96E4A] transition cursor-pointer">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
