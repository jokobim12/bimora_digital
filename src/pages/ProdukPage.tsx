import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  IoSearchOutline, IoEyeOutline, IoLogoWhatsapp,
  IoFilterOutline, IoCloseOutline, IoStarOutline, IoStar,
  IoCheckmarkCircle,
} from 'react-icons/io5'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const categories = ['Semua', 'Adat Jawa', 'Modern', 'Islami', 'Sunda', 'Bali']

const products = [
  {
    id: 1,
    name: 'Adat Jawa Premium – Gelap Megah',
    category: 'Adat Jawa',
    price: 149000,
    originalPrice: 199000,
    rating: 5,
    reviews: 48,
    badge: 'Terlaris',
    desc: 'Desain luhur dengan ornamen gunungan wayang kulit, animasi megah, latar gelap berkelas, dan iringan gending Jawa klasik.',
    features: ['Countdown Hari H', 'Love Story Timeline', 'Galeri 15 Foto', 'Kustom Musik MP3', 'Maps Interaktif', 'Form RSVP'],
    previewSlug: 'bimantara-clara',
    available: true,
    color: 'from-stone-900 to-stone-800',
  },
  {
    id: 2,
    name: 'Modern Emerald Gold – Minimalis Elegan',
    category: 'Modern',
    price: 129000,
    originalPrice: 169000,
    rating: 4,
    reviews: 23,
    badge: 'Segera Hadir',
    desc: 'Perpaduan hijau emerald dengan emas yang bersih, modern, dan berkesan mewah tanpa kesan berlebihan.',
    features: ['Countdown Hari H', 'Galeri 10 Foto', 'Maps Interaktif', 'Form RSVP', 'Musik Latar'],
    previewSlug: null,
    available: false,
    color: 'from-emerald-900 to-emerald-800',
  },
  {
    id: 3,
    name: 'Nuansa Islami – Putih Sakral',
    category: 'Islami',
    price: 139000,
    originalPrice: 179000,
    rating: 5,
    reviews: 15,
    badge: 'Segera Hadir',
    desc: 'Desain suci bernuansa Islam dengan kaligrafi Arab, ornamen arabesque, warna putih & emas lembut.',
    features: ['Countdown Hari H', 'Kaligrafi Bismillah', 'Galeri 12 Foto', 'Maps Interaktif', 'Form RSVP'],
    previewSlug: null,
    available: false,
    color: 'from-amber-950 to-amber-900',
  },
  {
    id: 4,
    name: 'Sunda Tradisional – Mekar Parahyangan',
    category: 'Sunda',
    price: 149000,
    originalPrice: 189000,
    rating: 5,
    reviews: 0,
    badge: 'Segera Hadir',
    desc: 'Kecantikan tradisi Sunda dalam digital – motif kain batik Parahyangan dengan warna biru indigo elegan.',
    features: ['Countdown Hari H', 'Love Story', 'Galeri 12 Foto', 'Maps Interaktif', 'Form RSVP'],
    previewSlug: null,
    available: false,
    color: 'from-indigo-900 to-indigo-800',
  },
]

const packages = [
  {
    name: 'Paket Prasaja',
    price: 99000,
    duration: '3 Bulan',
    features: ['Nama Tamu Custom', 'Galeri 5 Foto', 'Musik Standar', 'Maps & Alamat', 'Form RSVP'],
    popular: false,
  },
  {
    name: 'Paket Agung',
    price: 149000,
    duration: '1 Tahun',
    features: ['Nama Tamu Custom', 'Galeri 15 Foto', 'Kustom Musik MP3', 'Maps & Alamat', 'Form RSVP', 'Love Story', 'Kado Digital'],
    popular: true,
  },
  {
    name: 'Paket Ksatria',
    price: 249000,
    duration: 'Selamanya',
    features: ['Nama Tamu Custom', 'Galeri Tak Terbatas', 'Kustom Musik & Video BG', 'RSVP via WA Admin', 'Love Story', 'Kado Digital & QR', 'Subdomain Custom', 'Revisi Selamanya'],
    popular: false,
  },
]

function formatPrice(price: number) {
  return 'Rp ' + price.toLocaleString('id-ID')
}

export default function ProdukPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [showFilter, setShowFilter] = useState(false)

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'Semua' || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const waMessage = (name: string) =>
    encodeURIComponent(`Halo Bimora Digital! Saya tertarik memesan template *${name}*. Boleh info lebih lanjut?`)

  return (
    <div className="bg-white text-stone-800 font-body min-h-screen">
      <Navbar />

      {/* Page Header */}
      <section className="bg-amber-50 py-10 sm:py-14 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[10px] tracking-[4px] uppercase text-amber-500 font-semibold mb-2">Koleksi Kami</p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-stone-800 mb-3">Produk Undangan Digital</h1>
          <p className="text-stone-500 text-sm max-w-2xl">
            Temukan template undangan digital premium yang cocok dengan konsep pernikahan impian Anda. Setiap template dapat dipersonalisasi sepenuhnya.
          </p>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="sticky top-[65px] sm:top-[73px] z-40 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search input */}
          <div className="relative flex-grow">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-lg" />
            <input
              type="text"
              placeholder="Cari template undangan..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-stone-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none text-sm text-stone-700 bg-white transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                <IoCloseOutline />
              </button>
            )}
          </div>

          {/* Category pills - desktop */}
          <div className="hidden sm:flex items-center gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-white'
                    : 'bg-stone-100 text-stone-500 hover:bg-amber-50 hover:text-amber-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Filter button mobile */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="sm:hidden flex items-center gap-2 px-4 py-2.5 rounded-lg border border-stone-200 text-stone-600 text-sm font-medium"
          >
            <IoFilterOutline /> Filter Kategori
          </button>
        </div>

        {/* Mobile category pills */}
        {showFilter && (
          <div className="sm:hidden bg-white border-t border-stone-100 px-4 py-3 flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setShowFilter(false) }}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-white'
                    : 'bg-stone-100 text-stone-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-stone-400 font-medium">Tidak ada produk yang cocok.</p>
            <button onClick={() => { setSearch(''); setActiveCategory('Semua') }} className="mt-4 text-amber-600 text-sm hover:underline">
              Reset pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filtered.map(product => (
              <div key={product.id} className="bg-white border border-stone-200 rounded-lg overflow-hidden hover:border-amber-300 transition-all duration-200 flex flex-col">
                {/* Product preview area */}
                <div className={`relative h-52 sm:h-60 bg-gradient-to-br ${product.color} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                    <img src="/assets/gunungan.png" alt="" className="w-48 h-auto" style={{ mixBlendMode: 'screen' }} />
                  </div>

                  {/* Simulated phone preview */}
                  <div className="relative z-10 bg-stone-900/90 rounded-lg w-24 sm:w-28 border border-white/10 p-2 text-center">
                    <p className="text-[6px] tracking-widest text-yellow-400/60 uppercase mb-1">Undangan</p>
                    <p className="font-heading text-yellow-300 text-[11px] leading-tight">Bimantara</p>
                    <p className="font-heading text-yellow-400/50 text-[8px] my-0.5">&</p>
                    <p className="font-heading text-yellow-300 text-[9px]">Claraveliana</p>
                    <div className="w-8 h-px bg-yellow-500/40 mx-auto my-1" />
                    <p className="text-[6px] text-yellow-400/50">15 Agustus 2026</p>
                  </div>

                  {/* Badge */}
                  {product.badge && (
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-lg text-[10px] font-bold tracking-wide ${
                      product.badge === 'Terlaris' ? 'bg-amber-500 text-white' : 'bg-white/20 text-white border border-white/30'
                    }`}>
                      {product.badge}
                    </div>
                  )}

                  {/* Preview overlay */}
                  {product.previewSlug && (
                    <Link
                      to={`/undangan/${product.previewSlug}`}
                      className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/40 transition-all group"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-all bg-white text-stone-800 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5">
                        <IoEyeOutline /> Lihat Preview
                      </span>
                    </Link>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-lg font-medium">
                        {product.category}
                      </span>
                      <h3 className="font-heading text-lg font-bold text-stone-800 mt-1.5 leading-tight">{product.name}</h3>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-amber-600 text-base">{formatPrice(product.price)}</p>
                      <p className="text-[10px] text-stone-400 line-through">{formatPrice(product.originalPrice)}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, j) => (
                        j < product.rating
                          ? <IoStar key={j} className="text-amber-400 text-sm" />
                          : <IoStarOutline key={j} className="text-stone-200 text-sm" />
                      ))}
                    </div>
                    {product.reviews > 0 && (
                      <span className="text-[11px] text-stone-400">({product.reviews} ulasan)</span>
                    )}
                  </div>

                  <p className="text-stone-500 text-xs leading-relaxed mb-4">{product.desc}</p>

                  {/* Feature chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {product.features.map(f => (
                      <span key={f} className="flex items-center gap-1 text-[10px] bg-stone-50 text-stone-500 border border-stone-200 px-2 py-0.5 rounded-lg">
                        <IoCheckmarkCircle className="text-amber-400" /> {f}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="mt-auto flex flex-col gap-2">
                    {product.available ? (
                      <>
                        <a
                          href={`https://wa.me/6281234567890?text=${waMessage(product.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <IoLogoWhatsapp className="text-base" /> Pesan via WhatsApp
                        </a>
                        {product.previewSlug && (
                          <Link
                            to={`/undangan/${product.previewSlug}`}
                            className="w-full py-2.5 border border-amber-300 hover:border-amber-500 text-amber-700 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 hover:bg-amber-50"
                          >
                            <IoEyeOutline /> Preview Web
                          </Link>
                        )}
                      </>
                    ) : (
                      <div className="w-full py-3 bg-stone-100 text-stone-400 font-semibold text-sm rounded-lg text-center cursor-not-allowed">
                        Segera Tersedia
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Packages Section */}
      <section className="bg-amber-50 py-16 sm:py-20 border-t border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[4px] uppercase text-amber-500 font-semibold mb-2">Pilihan Paket</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-800">Pilih Paket yang Sesuai</h2>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-400" />
              <div className="w-2 h-2 bg-amber-500 rotate-45" />
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`relative rounded-lg p-6 flex flex-col border-2 transition-all ${
                  pkg.popular
                    ? 'border-amber-400 bg-white'
                    : 'border-stone-200 bg-white hover:border-amber-300'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-bold tracking-wider uppercase px-4 py-1 rounded-lg">
                    Paling Populer
                  </div>
                )}
                <h3 className="font-heading text-lg font-bold text-stone-800 mb-1">{pkg.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-heading text-3xl font-bold text-amber-600">{formatPrice(pkg.price)}</span>
                </div>
                <p className="text-xs text-stone-400 mb-5">Masa aktif: <span className="font-semibold text-stone-600">{pkg.duration}</span></p>
                <div className="w-full h-px bg-stone-100 mb-5" />
                <ul className="flex flex-col gap-2.5 mb-6 flex-grow">
                  {pkg.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-stone-600">
                      <IoCheckmarkCircle className="text-amber-400 text-base flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo Bimora! Saya mau pesan ${pkg.name} (${formatPrice(pkg.price)}). Mohon infonya!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors ${
                    pkg.popular
                      ? 'bg-amber-500 hover:bg-amber-600 text-white'
                      : 'border border-amber-300 hover:border-amber-500 text-amber-700 hover:bg-amber-50'
                  }`}
                >
                  <IoLogoWhatsapp /> Pesan Sekarang
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="bg-stone-800 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">Belum Yakin? Konsultasi Dulu Gratis!</h2>
          <p className="text-stone-400 text-sm mb-6">Tim kami siap membantu Anda memilih template dan paket terbaik sesuai kebutuhan.</p>
          <a
            href="https://wa.me/6281234567890?text=Halo%20Bimora%20Digital,%20saya%20mau%20konsultasi%20dulu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-lg transition-colors"
          >
            <IoLogoWhatsapp className="text-lg" /> Chat WhatsApp Gratis
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
