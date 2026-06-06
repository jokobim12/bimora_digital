import { useState, useEffect } from 'react'
import { IoLogoWhatsapp, IoLogoInstagram, IoHeartOutline, IoStarOutline, IoRocketOutline } from 'react-icons/io5'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getLocalAboutUs, type AboutUsData } from '../utils/dummyData'

function getIcon(iconType: string) {
  switch (iconType) {
    case 'heart':
      return <IoHeartOutline className="animate-pulse text-emerald-600" />
    case 'star':
      return <IoStarOutline className="text-emerald-600" />
    case 'rocket':
      return <IoRocketOutline className="text-emerald-600" />
    default:
      return <IoHeartOutline className="text-emerald-600" />
  }
}

export default function TentangPage() {
  const [aboutData, setAboutData] = useState<AboutUsData | null>(null)

  useEffect(() => {
    setAboutData(getLocalAboutUs())
  }, [])

  if (!aboutData) {
    return (
      <div className="bg-slate-50 text-stone-800 font-body min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-600" />
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-[#FAF9F6] text-stone-800 font-body min-h-screen selection:bg-emerald-100 selection:text-emerald-950">
      <Navbar />

      {/* Hero Header Section - Rich Emerald Gradient with Modern Typography */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-950 text-white py-16 sm:py-24 overflow-hidden border-b border-emerald-800/20">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] tracking-[4px] uppercase font-bold rounded-full mb-4">
              {aboutData.subtitle}
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
              {aboutData.title}
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mb-6" />
            <p className="text-emerald-100/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-light">
              {aboutData.descShort}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section - Modern Split Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left: Interactive/Visual Branding card */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-[380px] aspect-square rounded-3xl bg-gradient-to-tr from-emerald-900 to-emerald-950 p-1 shadow-2xl shadow-emerald-950/20 group hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute inset-0 bg-black/10 rounded-3xl" />
              <div className="w-full h-full bg-[#0a2318] rounded-[22px] flex flex-col justify-between p-8 border border-white/5 relative overflow-hidden">
                {/* Visual background accents */}
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
                
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <span className="font-heading text-emerald-400 text-3xl font-extrabold">B</span>
                </div>

                <div>
                  <p className="text-emerald-400/60 text-[10px] tracking-[4px] uppercase font-bold mb-1">Platform Utama</p>
                  <h3 className="font-heading text-3xl font-black text-white tracking-wide">
                    BIMORA
                  </h3>
                  <span className="text-xs text-stone-400 tracking-[3px] uppercase block">Digital</span>
                </div>

                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                  <span className="text-[10px] text-stone-500 uppercase font-mono">Est. 2024</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">Premium Tier</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Story Details */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <span className="text-[10px] tracking-[3px] uppercase text-emerald-600 font-extrabold block">
              KISAH KAMI
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
              {aboutData.storyTitle}
            </h2>
            <div className="w-12 h-1 bg-emerald-600 rounded-full" />
            
            <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed font-light">
              {aboutData.story1 && <p>{aboutData.story1}</p>}
              {aboutData.story2 && <p>{aboutData.story2}</p>}
              {aboutData.story3 && <p>{aboutData.story3}</p>}
            </div>
          </div>

        </div>
      </section>

      {/* Values Section - Sleek Minimalist Cards with Hover Effects */}
      <section className="bg-white py-20 lg:py-28 border-y border-stone-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] tracking-[3px] uppercase font-bold rounded-full mb-3">
              NILAI UTAMA
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Prinsip yang Kami Pegang Teguh
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-3 font-light">
              Membangun platform terbaik berlandaskan kepercayaan, dedikasi, dan inovasi yang berkelanjutan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {aboutData.values.map((v, i) => (
              <div 
                key={i} 
                className="bg-[#FAF9F6] border border-stone-200/80 rounded-2xl p-8 hover:bg-white hover:border-emerald-600/30 hover:-translate-y-1.5 transition-all duration-300 group shadow-sm hover:shadow-md"
              >
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  {getIcon(v.iconType)}
                </div>
                <h3 className="font-heading text-lg font-bold text-stone-850 mb-3 group-hover:text-emerald-700 transition-colors">
                  {v.title}
                </h3>
                <p className="text-stone-500 text-xs sm:text-sm leading-relaxed font-light">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Clean Profile Blocks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] tracking-[3px] uppercase font-bold rounded-full mb-3">
            KREATIF & INOVATIF
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
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
              className="bg-white border border-stone-200/60 rounded-3xl p-8 hover:border-emerald-600/30 hover:shadow-lg transition-all duration-300 text-center max-w-[280px] w-full group shadow-sm"
            >
              {/* Profile Avatar Ring */}
              <div className="w-24 h-24 rounded-full bg-slate-50 border-2 border-emerald-500/20 p-1 flex items-center justify-center mx-auto mb-6 group-hover:border-emerald-600 transition-colors duration-300 relative overflow-hidden">
                <div className="w-full h-full rounded-full bg-emerald-600 text-white flex items-center justify-center font-heading text-4xl font-black">
                  {t.name.charAt(0)}
                </div>
              </div>

              <h3 className="font-heading text-base font-bold text-stone-850 mb-1">
                {t.name}
              </h3>
              <p className="text-xs text-emerald-600 font-semibold mb-4">
                {t.role}
              </p>
              
              <div className="w-8 h-[1px] bg-stone-200 mx-auto mb-4" />

              <a
                href={`https://instagram.com/${t.ig.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF9F6] border border-stone-200/80 rounded-full text-xs text-stone-500 hover:text-emerald-600 hover:border-emerald-600/30 hover:bg-emerald-50 transition-all font-semibold"
              >
                <IoLogoInstagram className="text-sm" /> {t.ig}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section - Elegant Emerald Gradient */}
      <section className="bg-white pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="relative bg-gradient-to-br from-emerald-900 to-emerald-950 rounded-3xl py-12 sm:py-16 px-6 sm:px-12 text-center overflow-hidden shadow-xl shadow-emerald-950/15">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_40%)] pointer-events-none" />
            
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
              Ada Pertanyaan? Kami Siap Membantu!
            </h2>
            <p className="text-emerald-100/80 text-xs sm:text-sm mb-8 max-w-md mx-auto font-light leading-relaxed">
              Hubungi tim support Bimora Digital kapan saja melalui WhatsApp atau ikuti perjalanan kami di Instagram.
            </p>
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center relative z-10">
              <a
                href="https://wa.me/6281234567890"
                target="_blank" rel="noopener noreferrer"
                className="px-6 py-3 bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm cursor-pointer"
              >
                <IoLogoWhatsapp className="text-base" /> WhatsApp Kami
              </a>
              <a
                href="https://instagram.com/jokobim12"
                target="_blank" rel="noopener noreferrer"
                className="px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
              >
                <IoLogoInstagram className="text-base" /> Follow Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
