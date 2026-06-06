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
    desc: 'Kirim data, kami kerjakan dalam 1x24 jam. Revisi bebas sampai pas — tanpa perlu keahlian teknis apapun.',
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
  { num: '03', title: 'Review & Revisi', desc: 'Tim kami menyiapkan undangan dalam 24 jam. Revisi gratis sampai sesuai keinginan.' },
  { num: '04', title: 'Undangan Siap Sebar!', desc: 'Dapatkan link unik undangan Anda dan bagikan ke seluruh tamu secara mudah dan elegan.' },
]

export default function BerandaPage() {
  return (
    <div className="bg-white text-stone-800 font-body min-h-screen">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          {/* Text */}
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-semibold tracking-[2px] uppercase px-4 py-1.5 rounded-lg mb-5">
              <IoSparkles /> Platform Undangan Digital Premium
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-800 leading-tight mb-5">
              Undangan Pernikahan{' '}
              <span className="text-emerald-600">
                Digital Elegan
              </span>
              {' '}& Berkesan
            </h1>
            <p className="text-stone-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8">
              Bimora menghadirkan keindahan tradisi Nusantara dalam genggaman tamu Anda. Undangan digital premium dengan animasi megah, fitur lengkap, dan harga terjangkau.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/produk"
                className="px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                Lihat Produk <IoArrowForwardOutline />
              </Link>
              <a
                href="https://wa.me/6281234567890?text=Halo%20Bimora%20Digital,%20saya%20ingin%20konsultasi%20undangan"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 bg-white hover:bg-slate-50 border-2 border-emerald-100 hover:border-emerald-400 text-emerald-700 font-bold text-sm rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <IoLogoWhatsapp className="text-green-500" /> Konsultasi Gratis
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center mt-12">
              {[
                { num: '200+', label: 'Klien Puas' },
                { num: '15+', label: 'Template Tersedia' },
                { num: '1x24 Jam', label: 'Proses Pengerjaan' },
              ].map(stat => (
                <div key={stat.label} className="text-center px-4">
                  <p className="font-heading text-2xl font-bold text-emerald-600">{stat.num}</p>
                  <p className="text-[11px] text-stone-400 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[4px] uppercase text-emerald-600 font-semibold mb-2">Keunggulan Kami</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-800">Mengapa Pilih Bimora?</h2>
            <div className="w-16 h-0.5 bg-emerald-600 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="group bg-white border border-stone-100 hover:border-emerald-200 p-6 rounded-lg transition-all">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all">
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
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[4px] uppercase text-emerald-600 font-semibold mb-2">Alur Pemesanan</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-800">Cara Pesan Mudah</h2>
            <div className="w-16 h-0.5 bg-emerald-600 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                <div className="bg-white border border-stone-100 rounded-lg p-6 hover:border-emerald-200 transition-all h-full">
                  <div className="w-12 h-12 bg-emerald-600 text-white font-heading font-bold text-xl rounded-lg flex items-center justify-center mb-4">
                    {s.num}
                  </div>
                  <h3 className="font-semibold text-stone-800 mb-2 text-sm">{s.title}</h3>
                  <p className="text-stone-400 text-xs leading-relaxed">{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-emerald-250" />
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
            <p className="text-[10px] tracking-[4px] uppercase text-emerald-600 font-semibold mb-2">Ulasan Klien</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-800">Cerita Bahagia Mereka</h2>
            <div className="w-16 h-0.5 bg-emerald-600 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white border border-stone-100 rounded-lg p-6 hover:border-emerald-200 transition-all">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <IoStar key={j} className="text-emerald-600 text-sm" />
                  ))}
                </div>
                <p className="text-stone-600 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="border-t border-stone-100 pt-3 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-stone-800 text-sm">{t.name}</p>
                    <p className="text-[10px] text-emerald-600">{t.template}</p>
                  </div>
                  <p className="text-[10px] text-stone-400">{t.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-16 sm:py-20 bg-emerald-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-5">
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
              className="px-8 py-4 bg-white hover:bg-slate-50 text-emerald-950 font-bold text-sm rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <IoLogoWhatsapp className="text-green-500 text-lg" /> Chat WhatsApp Sekarang
            </a>
            <Link
              to="/produk"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border-2 border-white/40 hover:border-white text-white font-bold text-sm rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
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
