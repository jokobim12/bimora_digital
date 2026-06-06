import { Link } from 'react-router-dom'
import { IoEyeOutline, IoArrowForwardOutline, IoLogoWhatsapp } from 'react-icons/io5'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const portfolios = [
  { couple: 'Bimantara & Claraveliana', template: 'Adat Jawa Premium', date: 'Agustus 2026', slug: 'bimantara-clara', category: 'Adat Jawa' },
  { couple: 'Ahmad & Siti Nur', template: 'Adat Jawa Premium', date: 'Juli 2026', slug: null, category: 'Adat Jawa' },
  { couple: 'Bagas & Dewi Ayu', template: 'Adat Jawa Premium', date: 'Juni 2026', slug: null, category: 'Adat Jawa' },
  { couple: 'Rizky & Fitria', template: 'Modern Emerald', date: 'Mei 2026', slug: null, category: 'Modern' },
  { couple: 'Hendra & Rini', template: 'Adat Jawa Premium', date: 'April 2026', slug: null, category: 'Adat Jawa' },
  { couple: 'Dimas & Laras', template: 'Nuansa Islami', date: 'Maret 2026', slug: null, category: 'Islami' },
]

const stats = [
  { num: '200+', label: 'Undangan Dibuat' },
  { num: '98%', label: 'Klien Puas' },
  { num: '15+', label: 'Template Tersedia' },
  { num: '1x24 Jam', label: 'Rata-rata Pengerjaan' },
]

export default function PortofolioPage() {
  return (
    <div className="bg-white text-stone-800 font-body min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-amber-50 via-white to-yellow-50 py-10 sm:py-14 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[10px] tracking-[4px] uppercase text-amber-500 font-semibold mb-2">Karya Terbaik Kami</p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-stone-800 mb-3">Portofolio Undangan</h1>
          <p className="text-stone-500 text-sm max-w-2xl">
            Kumpulan undangan digital yang telah kami buat untuk pasangan bahagia di seluruh Indonesia.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-stone-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <p className="font-heading text-3xl font-bold text-amber-600">{s.num}</p>
                <p className="text-xs text-stone-400 uppercase tracking-wider mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((item, i) => (
            <div key={i} className="group bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-amber-200 transition-all">
              {/* Preview area */}
              <div className="h-48 bg-gradient-to-br from-stone-900 to-stone-800 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                  <img src="/assets/gunungan.png" alt="" className="w-32 h-auto" style={{ mixBlendMode: 'screen' }} />
                </div>
                <div className="relative z-10 text-center">
                  <p className="font-heading text-yellow-300 text-lg">{item.couple.split(' & ')[0]}</p>
                  <p className="font-heading text-yellow-400/50 text-sm">&</p>
                  <p className="font-heading text-yellow-300 text-base">{item.couple.split(' & ')[1]}</p>
                </div>
                {item.slug ? (
                  <Link
                    to={`/undangan/${item.slug}`}
                    className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/50 transition-all"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-all bg-white text-stone-800 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                      <IoEyeOutline /> Lihat Undangan
                    </span>
                  </Link>
                ) : (
                  <div className="absolute inset-0 flex items-end justify-end p-3">
                    <span className="bg-stone-700/80 text-stone-300 text-[10px] px-2.5 py-1 rounded-full">Preview Privat</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="font-semibold text-stone-800 text-sm">{item.couple}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[10px] bg-amber-50 text-amber-600 border border-amber-100 px-2 py-0.5 rounded-full">{item.category}</span>
                  <span className="text-[10px] text-stone-400">{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-amber-500 to-yellow-500 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">Jadikan Undangan Anda Karya Berikutnya!</h2>
          <p className="text-white/80 text-sm mb-6">Bergabung dengan ratusan pasangan yang telah mempercayai Bimora Digital.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/6281234567890?text=Halo%20Bimora!%20Saya%20mau%20pesan%20undangan%20digital"
              target="_blank" rel="noopener noreferrer"
              className="px-7 py-3.5 bg-white hover:bg-amber-50 text-amber-700 font-bold text-sm rounded-full shadow-md transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <IoLogoWhatsapp className="text-green-500" /> Pesan Sekarang
            </a>
            <Link
              to="/produk"
              className="px-7 py-3.5 bg-white/20 hover:bg-white/30 border-2 border-white/40 text-white font-bold text-sm rounded-full transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              Lihat Produk <IoArrowForwardOutline />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
