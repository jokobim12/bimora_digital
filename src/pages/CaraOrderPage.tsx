import { IoDocumentTextOutline, IoImagesOutline, IoCardOutline, IoSparkles, IoChatbubbleEllipsesOutline, IoChevronForwardOutline } from 'react-icons/io5'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { getLocalAppSettings, getLocalOrderSteps } from '../utils/dummyData'

export default function CaraOrderPage() {
  const settings = getLocalAppSettings()
  const rawSteps = getLocalOrderSteps()

  const renderStepIcon = (iconType: string) => {
    switch (iconType) {
      case 'sparkles':
        return <IoSparkles className="text-[#0F3A26]" />
      case 'chatbubble':
        return <IoChatbubbleEllipsesOutline className="text-[#0F3A26]" />
      case 'document':
        return <IoDocumentTextOutline className="text-[#0F3A26]" />
      case 'images':
        return <IoImagesOutline className="text-[#0F3A26]" />
      case 'card':
        return <IoCardOutline className="text-[#0F3A26]" />
      default:
        return <IoSparkles className="text-[#0F3A26]" />
    }
  }

  const steps = rawSteps.map(step => {
    let actionLink = step.actionLink
    if (actionLink && actionLink.includes('wa.me')) {
      actionLink = `https://wa.me/${settings.waNumber}?text=${encodeURIComponent(settings.waMessageDefault)}`
    }
    return {
      ...step,
      actionLink,
      icon: renderStepIcon(step.iconType)
    }
  })

  const materials = [
    { title: 'Data Mempelai', desc: 'Nama lengkap & panggilan kedua mempelai, nama orang tua, dan foto profil mempelai (jika ada).' },
    { title: 'Detail Acara', desc: 'Hari, tanggal, jam, alamat lengkap lokasi Akad dan Resepsi, beserta titik koordinat Google Maps.' },
    { title: 'Galeri & Cerita', desc: 'Kumpulan foto prewedding (maksimal 15 foto) dan teks singkat perjalanan cinta Anda untuk timeline Love Story.' },
    { title: 'Fitur Pendukung', desc: 'Daftar nomor rekening bank / dompet digital untuk fitur kado, serta file lagu MP3 latar belakang pilihan Anda.' }
  ]

  return (
    <div className="bg-[#FAF9F6] text-stone-850 font-body min-h-screen selection:bg-emerald-100 selection:text-[#0F3A26]">
      <Navbar />

      {/* Hero Header Section - Solid Dark Green */}
      <section className="relative bg-[#0F3A26] text-white py-16 sm:py-24 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-emerald-800 border border-emerald-700 text-emerald-300 text-[10px] tracking-[4px] uppercase font-bold rounded-full mb-4">
              PANDUAN LENGKAP
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
              Cara Pemesanan Undangan Digital
            </h1>
            <div className="w-20 h-[3px] bg-emerald-400 rounded-full mb-6" />
            <p className="text-emerald-100/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-light">
              Miliki undangan pernikahan impian Anda hanya dengan beberapa langkah mudah. Proses cepat, pengerjaan rapi, dan pelayanan terpercaya.
            </p>
          </div>
        </div>
      </section>

      {/* Step by Step Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-emerald-50 text-[#0F3A26] text-[10px] tracking-[3px] uppercase font-bold rounded-full mb-3">
            LANGKAH PEMESANAN
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Alur Pemesanan di Bimora Digital
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-3 font-light max-w-xl mx-auto">
            Ikuti 5 langkah sederhana berikut untuk mendapatkan undangan digital yang elegan dan siap dibagikan.
          </p>
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:left-8 md:before:left-1/2 before:w-0.5 before:bg-emerald-100 before:pointer-events-none">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0
            return (
              <div key={index} className={`flex flex-col md:flex-row items-start md:items-center justify-between relative ${isEven ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-[17px] w-9 h-9 rounded-full bg-[#0F3A26] text-white border-4 border-white shadow-md flex items-center justify-center font-bold text-xs z-10">
                  {step.num}
                </div>

                {/* Card Container */}
                <div className="w-full md:w-[45%] pl-16 md:pl-0">
                  <div className="bg-white border border-stone-200 rounded-lg p-6 sm:p-8 hover:border-[#0F3A26] transition-all duration-300 shadow-sm group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center text-2xl group-hover:bg-[#0F3A26] group-hover:text-white transition-colors duration-300">
                        {step.icon}
                      </div>
                      <h3 className="text-lg font-bold text-stone-850">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-stone-500 text-xs sm:text-sm leading-relaxed font-light mb-4">
                      {step.desc}
                    </p>
                    {step.actionText && step.actionLink && (
                      <div>
                        {step.actionLink.startsWith('http') ? (
                          <a
                            href={step.actionLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-[#0F3A26] hover:text-emerald-700 font-bold tracking-wider uppercase"
                          >
                            {step.actionText} <IoChevronForwardOutline />
                          </a>
                        ) : (
                          <Link
                            to={step.actionLink}
                            className="inline-flex items-center gap-1 text-xs text-[#0F3A26] hover:text-emerald-700 font-bold tracking-wider uppercase"
                          >
                            {step.actionText} <IoChevronForwardOutline />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Spacer for MD screens to keep grid balanced */}
                <div className="hidden md:block w-[45%]" />
              </div>
            )
          })}
        </div>
      </section>

      {/* Materials Checklist Section */}
      <section className="bg-white py-20 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 bg-emerald-50 text-[#0F3A26] text-[10px] tracking-[3px] uppercase font-bold rounded-full mb-3">
              CHECKLIST DATA
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Data yang Perlu Dipersiapkan
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-3 font-light">
              Agar proses pengerjaan berjalan lancar, silakan persiapkan beberapa berkas berikut sebelum mengisi formulir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {materials.map((m, i) => (
              <div 
                key={i} 
                className="bg-[#FAF9F6] border border-stone-200 rounded-lg p-6 hover:bg-white hover:border-[#0F3A26] transition-all duration-300 shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#0F3A26] font-bold text-xs flex items-center justify-center mb-4">
                  {i + 1}
                </div>
                <h3 className="text-base font-bold text-stone-850 mb-2">
                  {m.title}
                </h3>
                <p className="text-stone-550 text-xs leading-relaxed font-light">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
