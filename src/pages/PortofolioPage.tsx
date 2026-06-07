import { Link } from 'react-router-dom'
import { IoEyeOutline, IoCheckmarkCircle } from 'react-icons/io5'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getLocalPortfolios } from '../utils/dummyData'

const stats = [
  { num: '200+', label: 'Undangan Dibuat' },
  { num: '98%', label: 'Klien Puas' },
  { num: '15+', label: 'Pilihan Tema' },
  { num: '1x24 Jam', label: 'Rata-rata Pengerjaan' },
]

export default function PortofolioPage() {
  const portfolios = getLocalPortfolios()

  return (
    <div className="bg-[#FAF9F6] text-stone-850 font-body min-h-screen selection:bg-emerald-100 selection:text-[#0F3A26]">
      <Navbar />

      {/* Hero Header Section - Solid Dark Green (Aligned with Tentang and Cara Order) */}
      <section className="relative bg-[#0F3A26] text-white py-16 sm:py-24 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-emerald-800 border border-emerald-700 text-emerald-300 text-[10px] tracking-[4px] uppercase font-bold rounded-full mb-4">
              KARYA TERBAIK
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
              Portofolio Undangan Digital
            </h1>
            <div className="w-20 h-[3px] bg-emerald-400 rounded-full mb-6" />
            <p className="text-emerald-100/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-light">
              Kumpulan undangan digital premium yang telah dipercayakan kepada Bimora Digital untuk membagikan kabar bahagia pernikahan.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-stone-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {stats.map(s => (
              <div key={s.label} className="text-center p-4 bg-[#FAF9F6] border border-stone-200 rounded-lg">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#0F3A26]">{s.num}</p>
                <p className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-wider font-semibold mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-emerald-50 text-[#0F3A26] text-[10px] tracking-[3px] uppercase font-bold rounded-full mb-3">
            DAFTAR UNDANGAN
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Karya yang Telah Selesai Dikerjakan
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-3 font-light max-w-md mx-auto">
            Setiap karya didesain dengan ketelitian tinggi dan disesuaikan dengan kebutuhan khas masing-masing pasangan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {portfolios.map((item, i) => (
            <div 
              key={i} 
              className="group bg-white border border-stone-200 rounded-lg overflow-hidden shadow-sm hover:border-[#0F3A26] transition-all flex flex-col justify-between"
            >
              {/* Preview area - Solid Green Background with Watermark icon */}
              <div className="h-44 bg-[#0F3A26] relative flex flex-col items-center justify-center p-6 text-center border-b border-stone-100 overflow-hidden">
                {/* Watermark leaf logo behind text */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                  <img src="/logo.png" alt="watermark" className="w-40 h-40 object-contain" />
                </div>

                <div className="relative z-10 space-y-1">
                  <p className="text-emerald-300 text-base sm:text-lg font-bold leading-tight">
                    {item.couple.includes('&') ? item.couple.split('&')[0].trim() : item.couple}
                  </p>
                  {item.couple.includes('&') && (
                    <>
                      <p className="text-emerald-400/40 text-xs font-semibold">&</p>
                      <p className="text-emerald-300 text-base sm:text-lg font-bold leading-tight">
                        {item.couple.split('&')[1].trim()}
                      </p>
                    </>
                  )}
                </div>

                {item.slug ? (
                  <Link
                    to={`/undangan/${item.slug}`}
                    className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-[#0F3A26]/95 transition-all cursor-pointer"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-all bg-white text-[#0F3A26] px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md">
                      <IoEyeOutline /> Lihat Contoh Live
                    </span>
                  </Link>
                ) : (
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-emerald-950/80 text-emerald-300 text-[8px] tracking-wider uppercase font-bold px-2 py-0.5 rounded border border-emerald-800">
                      Privat
                    </span>
                  </div>
                )}
              </div>

              {/* Info Area */}
              <div className="p-5">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-xs text-stone-750 font-bold">{item.couple}</span>
                  <IoCheckmarkCircle className="text-emerald-700 text-sm shrink-0" />
                </div>

                <div className="flex items-center justify-between border-t border-stone-100 pt-3 mt-1">
                  <span className="text-[9px] bg-emerald-50 text-[#0F3A26] border border-emerald-100 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-stone-400 font-semibold">{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
