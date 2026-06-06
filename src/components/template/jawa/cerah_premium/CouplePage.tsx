import type { WeddingData } from '../../../../utils/dummyData'
import { defaultWeddingData } from '../../../../utils/dummyData'

interface CouplePageProps {
  isDesktopMode?: boolean
  data?: WeddingData
}

export default function CouplePage({ isDesktopMode = false, data = defaultWeddingData }: CouplePageProps) {
  const timeline = data.stories && data.stories.length > 0 ? data.stories : [
    { year: '2022', title: 'Pertama Bertemu', desc: 'Kami pertama kali bertemu di sebuah acara seminar teknologi di Kota Surakarta. Pertemuan singkat yang berkesan.' },
    { year: '2024', title: 'Menjalin Komitmen', desc: 'Setelah dua tahun berteman baik, kami memutuskan untuk menjalin komitmen serius untuk melangkah ke jenjang pernikahan.' },
    { year: '2026', title: 'Pernikahan Agung', desc: 'Hari di mana kami mengikat janji suci pernikahan di hadapan Allah SWT dan dipersatukan dalam ikatan keluarga.' }
  ]

  return (
    <div className={`w-full mx-auto px-6 py-12 lg:py-16 flex flex-col items-center transition-all duration-500 ${
      isDesktopMode ? 'max-w-[920px]' : 'max-w-[480px]'
    }`}>
      
      {/* Mempelai Title */}
      <p className="font-body text-[10px] tracking-[4px] uppercase text-[#B38520] font-medium reveal delay-100">
        Pasangan Mempelai
      </p>
      <h2 className="font-heading text-3xl font-light text-[#A17A24] tracking-wide mt-1 reveal reveal-down delay-200">
        Mempelai
      </h2>
      <div className="gold-divider my-6 reveal reveal-scale delay-300">
        <span className="line !bg-[#B38520]" />
        <span className="diamond !bg-[#B38520]" />
        <span className="line !bg-[#B38520]" />
      </div>

      {/* Mempelai Photo Frame */}
      <div className="mb-10 reveal reveal-scale delay-400 w-full flex justify-center">
        <div className="relative group p-1 bg-gradient-to-b from-[#F0D78C] via-[#B38520] to-[#8F6510] rounded-2xl overflow-hidden shadow-md max-w-[280px] md:max-w-[340px]">
          <div className="absolute inset-0 bg-[#FAF6EC]/10 group-hover:bg-transparent transition-all duration-300 z-10" />
          <img 
            className="w-full h-[360px] md:h-[420px] object-cover rounded-xl shadow-inner transition-transform duration-700 group-hover:scale-105" 
            src={data.couple_photo || "/assets/mempelai/mempelai.png"} 
            alt={`${data.groom_nickname} & ${data.bride_nickname}`} 
          />
        </div>
      </div>

      {/* Mempelai Details Container */}
      <div className={`w-full ${
        isDesktopMode ? 'grid grid-cols-2 gap-8 items-stretch relative' : 'flex flex-col gap-8'
      }`}>
        
        {/* Groom Card */}
        <div className="bg-white/80 border border-[#B38520]/20 rounded-2xl p-6 text-center relative overflow-hidden reveal reveal-left delay-100 shadow-sm backdrop-blur-sm flex flex-col justify-between h-full">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#B38520] to-transparent" />
          
          <div>
            <div className="w-[110px] h-[110px] lg:w-[120px] lg:h-[120px] rounded-full border-2 border-[#B38520] mx-auto mb-4 overflow-hidden bg-[#FAF6EC] shadow-inner">
              <img 
                src={data.groom_photo || "/assets/mempelai/mempelai.png"} 
                alt={data.groom_nickname} 
                className="w-full h-full object-cover object-top" 
              />
            </div>
            
            <h3 className="font-script text-3xl text-[#A17A24]">{data.groom_nickname}</h3>
            <p className="font-heading text-[13px] font-semibold text-[#332211] mt-1 tracking-wide">
              {data.groom_name}
            </p>
            <p className="font-body text-[11px] text-[#6B5A43] mt-3 leading-relaxed whitespace-pre-line">
              {data.groom_parents}
            </p>
          </div>
        </div>

        {/* Separator / Ampersand */}
        {isDesktopMode ? (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-25 bg-[#FAF6EC] border border-[#B38520]/30 rounded-full w-12 h-12 flex items-center justify-center shadow-md reveal reveal-scale delay-200">
            <span className="font-script text-3xl text-[#A17A24] drop-shadow-[0_0_8px_rgba(179,133,32,0.25)]">
              &amp;
            </span>
          </div>
        ) : (
          <p className="font-script text-4xl text-[#A17A24] text-center my-1 drop-shadow-[0_0_15px_rgba(179,133,32,0.15)] reveal reveal-scale delay-200">
            &amp;
          </p>
        )}

        {/* Bride Card */}
        <div className="bg-white/80 border border-[#B38520]/20 rounded-2xl p-6 text-center relative overflow-hidden reveal reveal-right delay-300 shadow-sm backdrop-blur-sm flex flex-col justify-between h-full">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#B38520] to-transparent" />
          
          <div>
            <div className="w-[110px] h-[110px] lg:w-[120px] lg:h-[120px] rounded-full border-2 border-[#B38520] mx-auto mb-4 overflow-hidden bg-[#FAF6EC] shadow-inner">
              <img 
                src={data.bride_photo || "/assets/mempelai/mempelai.png"} 
                alt={data.bride_nickname} 
                className="w-full h-full object-cover object-top" 
              />
            </div>
            
            <h3 className="font-script text-3xl text-[#A17A24]">{data.bride_nickname}</h3>
            <p className="font-heading text-[13px] font-semibold text-[#332211] mt-1 tracking-wide">
              {data.bride_name}
            </p>
            <p className="font-body text-[11px] text-[#6B5A43] mt-3 leading-relaxed whitespace-pre-line">
              {data.bride_parents}
            </p>
          </div>
        </div>

      </div>

      {/* Love Story Section */}
      <div className="w-full mt-20">
        <p className="font-body text-[10px] tracking-[4px] uppercase text-[#B38520] font-medium text-center reveal delay-100">
          Perjalanan Cinta
        </p>
        <h2 className="font-heading text-3xl font-light text-[#A17A24] tracking-wide text-center mt-1 reveal reveal-down delay-200">
          Love Story
        </h2>
        <div className="gold-divider my-6 reveal reveal-scale delay-300">
          <span className="line !bg-[#B38520]" />
          <span className="diamond !bg-[#B38520]" />
          <span className="line !bg-[#B38520]" />
        </div>

        {/* Timeline */}
        <div className={`relative ${
          isDesktopMode ? 'grid grid-cols-5 gap-4 pt-8' : 'pl-6 py-2'
        }`}>
          {/* Timeline background lines */}
          {isDesktopMode ? (
            <div className="absolute left-4 right-4 top-[52px] h-[1px] bg-gradient-to-r from-transparent via-[#B38520]/60 to-transparent z-0" />
          ) : (
            <div className="absolute left-1.5 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#B38520]/60 to-transparent z-0" />
          )}
          
          {timeline.map((item, i) => (
            <div 
              className={`relative group reveal ${
                isDesktopMode ? 'reveal-scale' : 'reveal-left'
              }`} 
              style={{ transitionDelay: `${(i + 1) * 150}ms` }}
              key={i}
            >
              {/* Bullet point */}
              <div className={`absolute bg-[#B38520] rounded-full border-2 border-[#FAF6EC] shadow-[0_0_8px_rgba(179,133,32,0.4)] transition-all duration-300 group-hover:scale-125 z-10 ${
                isDesktopMode 
                  ? 'left-1/2 -translate-x-1/2 top-4 w-3.5 h-3.5' 
                  : '-left-[23px] top-1.5 w-3 h-3'
              }`} />
              
              <div className={`font-heading text-[11px] font-semibold tracking-wider text-[#B38520] ${isDesktopMode ? 'mb-8' : ''}`}>
                {item.year}
              </div>
              
              <h4 className="font-heading text-[14px] font-semibold text-[#332211] mt-0.5">
                {item.title}
              </h4>
              
              <p className="font-body text-[10.5px] text-[#6B5A43] mt-1.5 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Ornament gunungan */}
      <img className="w-16 lg:w-20 h-auto opacity-30 my-10 lg:my-12 reveal reveal-scale delay-200" src="/assets/gunungan.png" alt="" />
    </div>
  )
}
