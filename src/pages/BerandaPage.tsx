import { Link } from 'react-router-dom'
import {
  IoArrowForwardOutline,
  IoLogoWhatsapp,
  IoSparkles,
  IoPhonePortraitOutline,
  IoTimeOutline,
  IoHeartOutline,
  IoStar,
} from 'react-icons/io5'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const features = [
  {
    icon: <IoPhonePortraitOutline />,
    title: 'Tampilan Elegan di Semua Perangkat',
    desc: 'Undangan digital dirancang responsif sempurna di smartphone, tablet, maupun laptop — tanpa distorsi desain.',
  },
  {
    icon: <IoSparkles />,
    title: 'Animasi & Ornamen Premium',
    desc: 'Ornamen budaya Nusantara (Gunungan, Batik, Ukiran) dihadirkan dengan animasi halus yang memukau tamu undangan.',
  },
  {
    icon: <IoTimeOutline />,
    title: 'Proses Cepat & Mudah',
    desc: 'Kirim data, kami kerjakan dalam 1x24 jam. Revisi bebas sesuai paket — tanpa perlu keahlian teknis apapun.',
  },
  {
    icon: <IoHeartOutline />,
    title: 'Fitur Love Story & Galeri',
    desc: 'Kisahkan perjalanan cinta Anda lewat timeline cerita dan galeri foto prewedding yang dapat dikustomisasi penuh.',
  },
]

const testimonials = [
  {
    name: 'Dewi & Arif',
    date: 'Mei 2026',
    rating: 5,
    text: 'Undangannya luar biasa cantik! Banyak tamu yang tanya beli di mana. Prosesnya juga cepat dan responsif banget.',
    template: 'Adat Jawa Premium',
  },
  {
    name: 'Sinta & Bagas',
    date: 'April 2026',
    rating: 5,
    text: 'Sempurna! Desainnya rapi dan mewah. Fitur countdown-nya bikin tamu makin excited. Highly recommended!',
    template: 'Modern Emerald Gold',
  },
  {
    name: 'Rini & Hendra',
    date: 'Maret 2026',
    rating: 5,
    text: 'Harga terjangkau tapi kualitasnya premium. Admin ramah dan revisi cepat. Pokoknya puas banget!',
    template: 'Adat Jawa Premium',
  },
]

const steps = [
  { num: '01', title: 'Pilih Template', desc: 'Jelajahi koleksi template kami dan pilih yang paling cocok dengan konsep pernikahan Anda.' },
  { num: '02', title: 'Kirim Data', desc: 'Isi form data mempelai, waktu, lokasi, foto, dan detail lainnya melalui WhatsApp atau formulir.' },
  { num: '03', title: 'Review & Revisi', desc: 'Tim kami menyiapkan undangan dalam 24 jam. Revisi gratis sesuai paket yang dipilih.' },
  { num: '04', title: 'Undangan Siap Sebar!', desc: 'Dapatkan link unik undangan Anda dan bagikan ke seluruh tamu secara mudah dan elegan.' },
]

export default function BerandaPage() {
  return (
    <div className="bg-white text-stone-800 font-body min-h-screen">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-16 sm:pb-24 bg-gradient-to-br from-amber-50 via-white to-yellow-50">
        {/* Decorative blobs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-20 w-64 h-64 bg-yellow-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 text-amber-700 text-[10px] font-semibold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-5">
                <IoSparkles /> Platform Undangan Digital Premium
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-800 leading-tight mb-5">
                Undangan Pernikahan{' '}
                <span className="bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent">
                  Digital Elegan
                </span>
                {' '}& Berkesan
              </h1>
              <p className="text-stone-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
                Bimora menghadirkan keindahan tradisi Nusantara dalam genggaman tamu Anda. Undangan digital premium dengan animasi megah, fitur lengkap, dan harga terjangkau.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  to="/produk"
                  className="px-7 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold text-sm rounded-full shadow-lg shadow-amber-200 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  Lihat Produk <IoArrowForwardOutline />
                </Link>
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Bimora%20Digital,%20saya%20ingin%20konsultasi%20undangan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 bg-white hover:bg-amber-50 border-2 border-amber-200 hover:border-amber-400 text-amber-700 font-bold text-sm rounded-full transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <IoLogoWhatsapp className="text-green-500" /> Konsultasi Gratis
                </a>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start mt-10">
                {[
                  { num: '200+', label: 'Klien Puas' },
                  { num: '15+', label: 'Template Tersedia' },
                  { num: '1x24 Jam', label: 'Proses Pengerjaan' },
                ].map(stat => (
                  <div key={stat.label} className="text-center">
                    <p className="font-heading text-2xl font-bold text-amber-600">{stat.num}</p>
                    <p className="text-[11px] text-stone-400 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero card mockup */}
            <div className="flex-shrink-0 relative w-full max-w-xs sm:max-w-sm">
              <div className="relative mx-auto w-[260px] sm:w-[300px]">
                {/* Phone frame */}
                <div className="bg-stone-900 rounded-[36px] p-2 shadow-2xl shadow-stone-400/30">
                  <div className="bg-black rounded-[28px] overflow-hidden aspect-[9/19] relative flex items-center justify-center">
                    {/* Fake template preview */}
                    <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950" />
                    <div className="relative z-10 flex flex-col items-center text-center px-4">
                      <div className="w-16 h-16 mb-3 opacity-60">
                        <img src="/assets/gunungan.png" alt="" className="w-full h-full object-contain" style={{ mixBlendMode: 'screen' }} />
                      </div>
                      <p className="font-body text-[8px] tracking-[3px] text-yellow-400/70 uppercase mb-1">Undangan Pernikahan</p>
                      <p className="font-heading text-yellow-300 text-xl leading-tight">Bimantara</p>
                      <p className="font-heading text-yellow-400/60 text-sm my-1">&</p>
                      <p className="font-heading text-yellow-300 text-xl leading-tight">Claraveliana</p>
                      <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent my-3" />
                      <p className="font-body text-[9px] text-yellow-400/60">15 Agustus 2026</p>
                    </div>
                    {/* Simulated bottom nav */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-yellow-500/10 py-2 px-3 flex justify-around">
                      {['🏠','💑','📍','🖼️','💌'].map((ic, i) => (
                        <span key={i} className={`text-sm opacity-${i === 0 ? '100' : '40'}`}>{ic}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -right-4 top-12 bg-white rounded-2xl px-3 py-2 shadow-lg shadow-amber-100 border border-amber-100 text-xs font-semibold text-amber-700 whitespace-nowrap">
                  ✨ Preview Live
                </div>
                <div className="absolute -left-4 bottom-16 bg-amber-500 rounded-2xl px-3 py-2 shadow-lg shadow-amber-200 text-xs font-bold text-white whitespace-nowrap">
                  🎵 Musik Otomatis
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[4px] uppercase text-amber-500 font-semibold mb-2">Keunggulan Kami</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-800">Mengapa Pilih Bimora?</h2>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-400" />
              <div className="w-2 h-2 bg-amber-500 rotate-45" />
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="group bg-white border border-stone-100 hover:border-amber-200 p-6 rounded-2xl shadow-sm hover:shadow-md hover:shadow-amber-50 transition-all">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-amber-500 group-hover:text-white transition-all">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-stone-800 mb-2 text-sm">{f.title}</h3>
                <p className="text-stone-400 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-amber-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[4px] uppercase text-amber-500 font-semibold mb-2">Alur Pemesanan</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-800">Cara Pesan Mudah</h2>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-400" />
              <div className="w-2 h-2 bg-amber-500 rotate-45" />
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                <div className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-amber-200 transition-all h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 text-white font-heading font-bold text-xl rounded-full flex items-center justify-center mb-4 shadow-md shadow-amber-100">
                    {s.num}
                  </div>
                  <h3 className="font-semibold text-stone-800 mb-2 text-sm">{s.title}</h3>
                  <p className="text-stone-400 text-xs leading-relaxed">{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-amber-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[4px] uppercase text-amber-500 font-semibold mb-2">Ulasan Klien</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-800">Cerita Bahagia Mereka</h2>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-400" />
              <div className="w-2 h-2 bg-amber-500 rotate-45" />
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-amber-200 transition-all">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <IoStar key={j} className="text-amber-400 text-sm" />
                  ))}
                </div>
                <p className="text-stone-600 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="border-t border-stone-100 pt-3 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-stone-800 text-sm">{t.name}</p>
                    <p className="text-[10px] text-amber-500">{t.template}</p>
                  </div>
                  <p className="text-[10px] text-stone-400">{t.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-amber-500 to-yellow-500">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-5">
            <IoHeartOutline className="text-white text-3xl" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Siap Buat Undangan Impian Anda?
          </h2>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8">
            Konsultasikan kebutuhan undangan digital Anda bersama tim kami sekarang. Gratis konsultasi, tanpa biaya tersembunyi.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/6281234567890?text=Halo%20Bimora%20Digital,%20saya%20ingin%20pesan%20undangan%20digital"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white hover:bg-amber-50 text-amber-700 font-bold text-sm rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <IoLogoWhatsapp className="text-green-500 text-lg" /> Chat WhatsApp Sekarang
            </a>
            <Link
              to="/produk"
              className="px-8 py-4 bg-white/20 hover:bg-white/30 border-2 border-white/40 hover:border-white text-white font-bold text-sm rounded-full transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              Lihat Semua Produk <IoArrowForwardOutline />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
