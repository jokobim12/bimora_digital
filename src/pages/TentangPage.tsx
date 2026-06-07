import { useState, useEffect } from 'react'
import { IoLogoInstagram, IoHeartOutline, IoStarOutline, IoRocketOutline } from 'react-icons/io5'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getLocalAboutUs, type AboutUsData } from '../utils/dummyData'

function getIcon(iconType: string) {
  switch (iconType) {
    case 'heart':
      return <IoHeartOutline className="text-emerald-700" />
    case 'star':
      return <IoStarOutline className="text-emerald-700" />
    case 'rocket':
      return <IoRocketOutline className="text-emerald-700" />
    default:
      return <IoHeartOutline className="text-emerald-700" />
  }
}

export default function TentangPage() {
  const [aboutData, setAboutData] = useState<AboutUsData | null>(null)

  useEffect(() => {
    setAboutData(getLocalAboutUs())
  }, [])

  if (!aboutData) {
    return (
      <div className="bg-[#FAF9F6] text-stone-850 font-body min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-700" />
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-[#FAF9F6] text-stone-850 font-body min-h-screen selection:bg-emerald-100 selection:text-[#0F3A26]">
      <Navbar />

      {/* Hero Header Section - Solid Dark Green */}
      <section className="relative bg-[#0F3A26] text-white py-16 sm:py-24 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-emerald-800 border border-emerald-700 text-emerald-300 text-[10px] tracking-[4px] uppercase font-bold rounded-full mb-4">
              {aboutData.subtitle}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
              {aboutData.title}
            </h1>
            <div className="w-20 h-[3px] bg-emerald-400 rounded-full mb-6" />
            <p className="text-emerald-100/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-light">
              {aboutData.descShort}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left: Branding card */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-[380px] aspect-square rounded-2xl bg-[#0F3A26] p-1 shadow-md">
              <div className="w-full h-full bg-[#0a2318] rounded-[14px] flex flex-col justify-between p-8 border border-white/5 relative overflow-hidden">
                <img 
                  src="/logo.png" 
                  alt="Bimora Digital Logo" 
                  className="w-16 h-16 object-contain bg-white rounded-xl p-1"
                />

                <div>
                  <p className="text-emerald-400/60 text-[10px] tracking-[4px] uppercase font-bold mb-1">Platform Utama</p>
                  <h3 className="text-3xl font-bold text-white tracking-wide">
                    BIMORA
                  </h3>
                  <span className="text-xs text-stone-400 tracking-[3px] uppercase block">Digital</span>
                </div>

                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                  <span className="text-[10px] text-stone-500 uppercase font-mono">Est. 2024</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded font-bold">Premium Tier</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Story Details */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <span className="text-[10px] tracking-[3px] uppercase text-emerald-700 font-extrabold block">
              KISAH KAMI
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
              {aboutData.storyTitle}
            </h2>
            <div className="w-12 h-[2px] bg-[#0F3A26] rounded-full" />
            
            <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed font-light">
              {aboutData.story1 && <p>{aboutData.story1}</p>}
              {aboutData.story2 && <p>{aboutData.story2}</p>}
              {aboutData.story3 && <p>{aboutData.story3}</p>}
            </div>
          </div>

        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-20 lg:py-28 border-y border-stone-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] tracking-[3px] uppercase font-bold rounded-full mb-3">
              NILAI UTAMA
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Prinsip yang Kami Pegang Teguh
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-3 font-light">
              Membangun platform terbaik berlandaskan kepercayaan, dedikasi, dan pelayanan yang ramah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {aboutData.values.map((v, i) => (
              <div 
                key={i} 
                className="bg-[#FAF9F6] border border-stone-200 rounded-lg p-8 hover:bg-white hover:border-[#0F3A26] transition-all duration-300 group shadow-sm"
              >
                <div className="w-14 h-14 bg-emerald-50 text-[#0F3A26] rounded-lg flex items-center justify-center text-3xl mb-6">
                  {getIcon(v.iconType)}
                </div>
                <h3 className="text-lg font-bold text-stone-850 mb-3 group-hover:text-emerald-700 transition-colors">
                  {v.title}
                </h3>
                <p className="text-stone-550 text-xs sm:text-sm leading-relaxed font-light">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] tracking-[3px] uppercase font-bold rounded-full mb-3">
            KREATIF & INOVATIF
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Di Balik Layar Bimora Digital
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-3 font-light">
            Tim profesional yang berdedikasi tinggi untuk memberikan pelayanan terbaik bagi hari bahagia Anda.
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-8 max-w-5xl mx-auto">
          {aboutData.team.map((t, i) => (
            <div 
              key={i} 
              className="bg-white border border-stone-200 rounded-lg p-8 hover:border-emerald-750 transition-all duration-300 text-center max-w-[280px] w-full shadow-sm"
            >
              {/* Profile Avatar Ring */}
              <div className="w-24 h-24 rounded-full bg-[#FAF9F6] border border-stone-200 p-1 flex items-center justify-center mx-auto mb-6 overflow-hidden">
                <div className="w-full h-full rounded-full bg-[#0F3A26] text-white flex items-center justify-center text-4xl font-bold">
                  {t.name.charAt(0)}
                </div>
              </div>

              <h3 className="text-base font-bold text-stone-850 mb-1">
                {t.name}
              </h3>
              <p className="text-xs text-emerald-700 font-semibold mb-4">
                {t.role}
              </p>
              
              <div className="w-8 h-[1px] bg-stone-200 mx-auto mb-4" />

              <a
                href={`https://instagram.com/${t.ig.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF9F6] border border-stone-200 rounded-full text-xs text-stone-500 hover:text-emerald-700 hover:border-emerald-750 hover:bg-emerald-50 transition-all font-semibold"
              >
                <IoLogoInstagram className="text-sm" /> {t.ig}
              </a>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
