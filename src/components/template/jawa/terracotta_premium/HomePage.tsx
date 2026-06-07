import { useState, useEffect, useMemo } from 'react'
import { IoCalendarOutline } from 'react-icons/io5'
import type { WeddingData } from '../../../../utils/dummyData'
import { defaultWeddingData } from '../../../../utils/dummyData'
import { formatIndonesianDate, getCalendarDates } from '../../../../utils/dateFormatter'

interface HomePageProps {
  isDesktopMode?: boolean
  data?: WeddingData
}

export default function HomePage({ isDesktopMode = false, data = defaultWeddingData }: HomePageProps) {
  const weddingDateObj = useMemo(() => new Date(`${data.wedding_date}T08:00:00`), [data.wedding_date])
  
  const [time, setTime] = useState(() => {
    const now = new Date().getTime()
    const diff = weddingDateObj.getTime() - now
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  })

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date().getTime()
      const diff = weddingDateObj.getTime() - now
      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      } else {
        setTime({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        })
      }
    }, 1000)
    return () => clearInterval(id)
  }, [weddingDateObj])

  const calDates = getCalendarDates(data.wedding_date, data.akad_time)
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Pernikahan ${data.groom_nickname} & ${data.bride_nickname}`)}&dates=${calDates.start}/${calDates.end}&details=${encodeURIComponent('Akad Nikah & Resepsi Pernikahan')}&location=${encodeURIComponent(`${data.location_name}, ${data.location_address}`)}`

  // Dynamic calendar grid generator
  const { monthYearLabel, daysGrid, weddingDayNum } = useMemo(() => {
    const year = weddingDateObj.getFullYear()
    const month = weddingDateObj.getMonth()
    const label = weddingDateObj.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
    const dayNum = weddingDateObj.getDate()

    const firstDay = new Date(year, month, 1)
    let startOffset = firstDay.getDay() - 1 // Monday start alignment
    if (startOffset < 0) startOffset = 6

    const totalDays = new Date(year, month + 1, 0).getDate()
    const grid: (number | null)[][] = []
    let currentWeek: (number | null)[] = Array(7).fill(null)
    
    for (let i = 0; i < startOffset; i++) {
      currentWeek[i] = null
    }

    let day = 1
    let col = startOffset
    while (day <= totalDays) {
      currentWeek[col] = day
      day++
      col++
      if (col === 7) {
        grid.push(currentWeek)
        currentWeek = Array(7).fill(null)
        col = 0
      }
    }
    if (currentWeek.some(x => x !== null)) {
      grid.push(currentWeek)
    }

    return { monthYearLabel: label, daysGrid: grid, weddingDayNum: dayNum }
  }, [weddingDateObj])

  return (
    <div className="w-full relative overflow-hidden bg-[#FAF6EC] pt-24 pb-28 lg:pt-28 lg:pb-36">
      
      {/* Custom Keyframe Animations for Smooth Foliage Sway & Flower Parallax */}
      <style>{`
        @keyframes canopySwayLeft {
          0%, 100% { transform: translate(0, 0) rotate(-8deg) scale(1.15) scaleY(-1); }
          50% { transform: translate(6px, 5px) rotate(-9.5deg) scale(1.16) scaleY(-1); }
        }
        @keyframes canopySwayRight {
          0%, 100% { transform: translate(0, 0) rotate(8deg) scaleX(-1) scale(1.15) scaleY(-1); }
          50% { transform: translate(-6px, 5px) rotate(9.5deg) scaleX(-1) scale(1.16) scaleY(-1); }
        }
        @keyframes flowerSwayBack {
          0%, 100% { transform: translateY(36%) rotate(3deg); }
          50% { transform: translateY(34.5%) rotate(4.2deg) scale(1.02); }
        }
        @keyframes flowerSwayFront {
          0%, 100% { transform: translateY(42%) rotate(-3deg); }
          50% { transform: translateY(40.5%) rotate(-4.2deg) scale(1.02); }
        }
        .animate-canopy-left {
          animation: canopySwayLeft 10s ease-in-out infinite;
        }
        .animate-canopy-right {
          animation: canopySwayRight 10s ease-in-out infinite;
        }
        .animate-flower-back {
          animation: flowerSwayBack 12s ease-in-out infinite;
        }
        .animate-flower-front {
          animation: flowerSwayFront 9s ease-in-out infinite;
        }
      `}</style>

      {/* Layer 0.5: Background Archway Backdrop (Faint watermark template stage) */}
      <div className="absolute inset-0 z-0 flex items-end justify-center pointer-events-none opacity-[0.12]">
        <img 
          src="/assets/terracotta/arch.png" 
          alt="" 
          className="w-full h-[95%] object-contain object-bottom scale-[1.3] origin-bottom translate-y-[6%]" 
        />
      </div>

      {/* Layer 1: Forest Canopy at the Top (Identical layout to Cover page, overlaps in center, no gaps) */}
      <img 
        src="/assets/terracotta/canopy.png" 
        alt="" 
        className="absolute top-[-13%] left-[-10%] w-[65%] opacity-95 pointer-events-none z-10 animate-canopy-left" 
      />
      <img 
        src="/assets/terracotta/canopy.png" 
        alt="" 
        className="absolute top-[-13%] right-[-10%] w-[65%] opacity-95 pointer-events-none z-10 animate-canopy-right" 
      />

      {/* Layer 1.5: Foreground Bottom Flowers (Dual-Layered Tilted Floral Undergrowth - Lush & Dense, Animated Parallax) */}
      <div className="absolute bottom-[-5px] left-[-5%] right-[-5%] z-20 pointer-events-none flex justify-center items-end">
        <img 
          src="/assets/terracotta/bottom_flowers.png" 
          alt="Flowers Background Layer" 
          className="absolute w-[110%] h-auto object-contain opacity-70 origin-bottom animate-flower-back" 
        />
        <img 
          src="/assets/terracotta/bottom_flowers.png" 
          alt="Flowers Foreground Layer" 
          className="absolute w-[110%] h-auto object-contain opacity-95 origin-bottom animate-flower-front" 
        />
      </div>

      {/* Main Content Area */}
      <div className={`w-full mx-auto px-6 relative z-10 flex flex-col items-center transition-all duration-500 ${
        isDesktopMode ? 'max-w-[920px]' : 'max-w-[480px]'
      }`}>
        
        {/* Outer grid/flex wrapper */}
        <div className={`w-full transition-all duration-500 ${
          isDesktopMode ? 'grid grid-cols-1 md:grid-cols-2 gap-10 items-center' : 'flex flex-col items-center'
        }`}>
          
          {/* Left Column: Text Info & Doa (Now wrapped in relative parent to lock Gunungan locally) */}
          <div className="w-full relative flex flex-col px-4 items-center">

            {/* Centered Safe Text Container to prevent layout issues */}
            <div className="w-full max-w-[76%] mx-auto flex flex-col items-center relative z-10">
              
              {/* Center Gunungan Backdrop Watermark (Enlarged 5 times, massive faint watermark) */}
              <div className="absolute top-[140%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220%] max-w-[800px] opacity-[0.07] pointer-events-none z-0">
                <img 
                  src="/assets/terracotta/gunungan.png" 
                  alt="Gunungan Backdrop" 
                  className="w-full h-auto object-contain" 
                />
              </div>

              <p className="font-body text-[9px] tracking-[4px] uppercase text-[#8B3D30] font-semibold reveal delay-100 relative z-10">
                Bismillahirrahmanirrahim
              </p>

              <div className="gold-divider my-4 reveal reveal-scale delay-200 justify-center w-full relative z-10">
                <span className="line !bg-[#8B3D30]" />
                <span className="diamond !bg-[#8B3D30]" />
                <span className="line !bg-[#8B3D30]" />
              </div>

              <p className="font-body text-[9px] tracking-[5px] uppercase text-[#7A3227] mb-2 reveal reveal-down delay-300 font-bold relative z-10">
                Pernikahan Agung
              </p>
              
              <h2 className="font-heading text-3xl md:text-4xl text-[#5A1E17] leading-tight font-light tracking-wide my-1 relative z-10">
                <span className="reveal reveal-left delay-500 block">{data.groom_nickname}</span>
                <span className="reveal reveal-scale delay-600 block font-heading text-base text-[#8B3D30]/75 my-1 font-bold">&amp;</span>
                <span className="reveal reveal-right delay-700 block">{data.bride_nickname}</span>
              </h2>
              
              <p className="font-heading text-[13px] lg:text-[14px] tracking-[3px] text-[#5A1E17] font-bold mt-3 reveal reveal-up delay-900 relative z-10">
                {formatIndonesianDate(data.wedding_date)}
              </p>
            </div>

            {/* Al-Quran Quote Card (Clean, floating in front of Gunungan watermark) */}
            <div className="bg-white/90 border border-[#8B3D30]/15 p-5 rounded-2xl reveal reveal-up delay-1100 shadow-sm backdrop-blur-sm mt-12 mb-8 w-full text-[#5A1E17] relative z-10 text-center">
              <p className="font-heading italic text-[12.5px] lg:text-[13.5px] leading-relaxed text-[#5A1E17]/90 text-center">
                "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan
                untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya,
                dan Dia menjadikan di antaramu rasa kasih dan sayang."
              </p>
              <p className="font-heading text-[10px] font-semibold text-[#8B3D30] mt-3 tracking-wider font-bold text-center">
                — QS. Ar-Rum: 21
              </p>
            </div>
          </div>

          {/* Right Column: Calendar, Countdown */}
          <div className="w-full flex flex-col items-center mt-20 md:mt-0 relative px-4">
            
            {/* Calendar Display - Terracotta Style (Scaled Down & Spaced Out) */}
            <div className="bg-white border border-[#8B3D30]/20 p-4 rounded-xl shadow-sm w-full max-w-[260px] reveal reveal-up delay-600 mb-8 flex flex-col items-center text-[#5A1E17] transition-all">
              <p className="font-heading text-[10px] tracking-wider uppercase font-bold text-[#8B3D30] mb-2.5">
                {monthYearLabel}
              </p>
              <div className="w-full grid grid-cols-7 gap-y-2 text-center text-[9px] font-semibold">
                {['S', 'S', 'R', 'K', 'J', 'S', 'M'].map((day, idx) => (
                  <span key={idx} className="text-[#8B3D30] font-bold">{day}</span>
                ))}
                {daysGrid.flat().map((day, idx) => {
                  if (day === null) return <span key={idx} />
                  const isWeddingDay = day === weddingDayNum
                  return (
                    <div key={idx} className="flex items-center justify-center relative h-5.5 w-5.5 mx-auto">
                      {isWeddingDay && (
                        <div className="absolute inset-0 rounded-full border border-[#8B3D30] animate-ping" />
                      )}
                      <span className={`z-10 flex items-center justify-center h-5.5 w-5.5 rounded-full font-bold ${
                        isWeddingDay ? 'bg-[#8B3D30] text-[#FAF6EC] shadow-sm' : 'text-[#5A1E17]/80'
                      }`}>
                        {day}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Countdown Section */}
            <div className="w-full text-center reveal reveal-up mt-2">
              <p className="font-body text-[9px] tracking-[3px] uppercase text-[#8B3D30] mb-3.5 font-semibold">
                Menuju Hari Bahagia
              </p>
              <div className="grid grid-cols-4 gap-2.5 max-w-[320px] mx-auto">
                {[
                  { val: time.days, label: 'Hari' },
                  { val: time.hours, label: 'Jam' },
                  { val: time.minutes, label: 'Menit' },
                  { val: time.seconds, label: 'Detik' },
                ].map(item => (
                  <div className="bg-white border border-[#8B3D30]/20 rounded-xl py-2 px-1 flex flex-col items-center shadow-sm reveal reveal-scale delay-100" key={item.label}>
                    <span className="font-heading text-xl md:text-2xl font-bold text-[#8B3D30] leading-none">
                      {String(item.val).padStart(2, '0')}
                    </span>
                    <span className="font-body text-[8px] tracking-[1px] uppercase text-[#7A3227] mt-1 font-semibold">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Calendar Save Button */}
              <div className="mt-8 reveal reveal-scale delay-500">
                <a 
                  className="inline-flex items-center gap-2 bg-transparent hover:bg-[#8B3D30] border border-[#8B3D30]/30 hover:border-[#8B3D30] text-[#8B3D30] hover:text-[#FAF6EC] font-body text-[9px] tracking-wider uppercase px-6 py-2.5 rounded-full transition-all duration-300 shadow-sm active:scale-95 cursor-pointer font-semibold"
                  href={gcalUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <IoCalendarOutline className="text-sm" /> Simpan ke Kalender
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Elegant Gunungan Divider */}
        <img className="w-14 lg:w-16 h-auto opacity-35 my-8 lg:my-10 reveal reveal-scale delay-200" src="/assets/terracotta/gunungan.png" alt="" />
      </div>
    </div>
  )
}
