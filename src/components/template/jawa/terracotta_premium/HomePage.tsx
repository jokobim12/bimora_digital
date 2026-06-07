import { useState, useEffect } from 'react'
import { IoCalendarOutline } from 'react-icons/io5'
import type { WeddingData } from '../../../../utils/dummyData'
import { defaultWeddingData } from '../../../../utils/dummyData'
import { formatIndonesianDate, getCalendarDates } from '../../../../utils/dateFormatter'

interface HomePageProps {
  isDesktopMode?: boolean
  data?: WeddingData
}

export default function HomePage({ isDesktopMode = false, data = defaultWeddingData }: HomePageProps) {
  const weddingDateObj = new Date(`${data.wedding_date}T08:00:00`)
  
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
  }, [data.wedding_date])

  const calDates = getCalendarDates(data.wedding_date, data.akad_time)
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Pernikahan ${data.groom_nickname} & ${data.bride_nickname}`)}&dates=${calDates.start}/${calDates.end}&details=${encodeURIComponent('Akad Nikah & Resepsi Pernikahan')}&location=${encodeURIComponent(`${data.location_name}, ${data.location_address}`)}`

  // Generate Calendar Days for display (similar to the TikTok photo!)
  const weddingDayNum = weddingDateObj.getDate()
  const daysInMonth = [
    [null, null, null, null, null, null, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29],
    [30, 31, null, null, null, null, null]
  ]

  return (
    <div className={`w-full mx-auto px-6 py-12 lg:py-16 flex flex-col items-center transition-all duration-500 ${
      isDesktopMode ? 'max-w-[920px]' : 'max-w-[480px]'
    }`}>
      
      {/* Outer grid/flex wrapper */}
      <div className={`w-full transition-all duration-500 ${
        isDesktopMode ? 'grid grid-cols-1 md:grid-cols-2 gap-10 items-center' : 'flex flex-col items-center'
      }`}>
        
        {/* Left Column */}
        <div className={`w-full flex flex-col ${isDesktopMode ? 'text-left items-start' : 'text-center items-center'}`}>
          <p className="font-body text-[10px] tracking-[4px] uppercase text-[#8B3D30] font-semibold reveal delay-100">
            Bismillahirrahmanirrahim
          </p>

          <div className={`gold-divider my-5 reveal reveal-scale delay-200 ${isDesktopMode ? 'justify-start w-full' : 'justify-center'}`}>
            <span className="line !bg-[#8B3D30]" />
            <span className="diamond !bg-[#8B3D30]" />
            <span className="line !bg-[#8B3D30]" />
          </div>

          <p className="font-body text-[10px] tracking-[5px] uppercase text-[#7A3227] mb-2 reveal reveal-down delay-300 font-bold">
            Pernikahan Agung
          </p>
          
          <h2 className="font-script text-4xl md:text-5xl lg:text-6xl text-[#5A1E17] leading-tight drop-shadow-[0_0_15px_rgba(139,61,48,0.1)]">
            <span className="reveal reveal-left delay-500 block">{data.groom_nickname}</span>
            <span className={`reveal reveal-scale delay-600 block font-heading text-lg md:text-xl text-[#8B3D30]/75 my-1.5 ${isDesktopMode ? 'md:ml-6' : ''}`}>&amp;</span>
            <span className="reveal reveal-right delay-700 block">{data.bride_nickname}</span>
          </h2>
          
          <p className="font-heading text-[15px] lg:text-[17px] tracking-[3px] text-[#5A1E17] font-bold mt-4 reveal reveal-up delay-900">
            {formatIndonesianDate(data.wedding_date)}
          </p>

          {/* Elegant Joglo House Illustration (Mobile) */}
          {!isDesktopMode && (
            <div className="my-8 flex justify-center w-full animate-[fadeUp_1.2s_0.8s_both]">
              <img 
                className="w-[180px] h-auto drop-shadow-[0_4px_12px_rgba(139,61,48,0.15)]" 
                src="/assets/terracotta/joglo.png" 
                alt="Joglo House" 
              />
            </div>
          )}

          {/* Al-Quran Quote Card */}
          <div className="bg-[#FAF6EC] border border-[#8B3D30]/15 p-5 rounded-2xl reveal reveal-up delay-1100 shadow-md backdrop-blur-sm mt-6 w-full text-[#5A1E17]">
            <p className="font-heading italic text-[13px] lg:text-[14px] leading-relaxed text-[#5A1E17]/90">
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan
              untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya,
              dan Dia menjadikan di antaramu rasa kasih dan sayang."
            </p>
            <p className="font-heading text-xs font-semibold text-[#8B3D30] mt-3 tracking-wider font-bold">
              — QS. Ar-Rum: 21
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full flex flex-col items-center">
          
          {/* Elegant Joglo House Illustration (Desktop Only) */}
          {isDesktopMode && (
            <div className="mb-6 flex justify-center w-full animate-[fadeUp_1.2s_0.5s_both]">
              <img 
                className="w-[200px] lg:w-[230px] h-auto drop-shadow-[0_4px_16px_rgba(139,61,48,0.15)]" 
                src="/assets/terracotta/joglo.png" 
                alt="Joglo House" 
              />
            </div>
          )}

          {/* Calendar Display - Terracotta Style (Like in the photo) */}
          <div className="bg-[#FAF6EC] border border-[#8B3D30]/20 p-5 rounded-2xl shadow-md w-full max-w-[320px] reveal reveal-up delay-600 mb-8 flex flex-col items-center text-[#5A1E17]">
            <p className="font-heading text-xs tracking-wider uppercase font-bold text-[#8B3D30] mb-3">
              Maret 2026
            </p>
            <div className="w-full grid grid-cols-7 gap-y-2.5 text-center text-[10px] font-semibold">
              {['S', 'S', 'R', 'K', 'J', 'S', 'M'].map((day, idx) => (
                <span key={idx} className="text-[#8B3D30] font-bold">{day}</span>
              ))}
              {daysInMonth.flat().map((day, idx) => {
                if (day === null) return <span key={idx} />
                const isWeddingDay = day === weddingDayNum
                return (
                  <div key={idx} className="flex items-center justify-center relative h-6 w-6 mx-auto">
                    {isWeddingDay && (
                      <div className="absolute inset-0 rounded-full border-2 border-[#8B3D30] animate-ping" />
                    )}
                    <span className={`z-10 flex items-center justify-center h-6 w-6 rounded-full font-bold ${
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
            <p className="font-body text-[10px] tracking-[3px] uppercase text-[#8B3D30] mb-4 font-semibold">
              Menuju Hari Bahagia
            </p>
            <div className="grid grid-cols-4 gap-3 max-w-[360px] mx-auto">
              {[
                { val: time.days, label: 'Hari' },
                { val: time.hours, label: 'Jam' },
                { val: time.minutes, label: 'Menit' },
                { val: time.seconds, label: 'Detik' },
              ].map(item => (
                <div className="bg-[#FAF6EC] border border-[#8B3D30]/20 rounded-xl py-3 px-1.5 flex flex-col items-center shadow-md reveal reveal-scale delay-100" key={item.label}>
                  <span className="font-heading text-2xl md:text-3xl font-bold text-[#8B3D30] leading-none">
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className="font-body text-[8px] tracking-[1.5px] uppercase text-[#7A3227] mt-1.5 font-semibold">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Calendar Save Button */}
            <div className="mt-8 reveal reveal-scale delay-500">
              <a 
                className="inline-flex items-center gap-2 bg-transparent hover:bg-[#8B3D30] border border-[#8B3D30]/30 hover:border-[#8B3D30] text-[#8B3D30] hover:text-[#FAF6EC] font-body text-[10px] tracking-wider uppercase px-6 py-3 rounded-full transition-all duration-300 shadow-md active:scale-95 cursor-pointer font-semibold"
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
      <img className="w-16 lg:w-20 h-auto opacity-45 my-10 lg:my-12 reveal reveal-scale delay-200" src="/assets/terracotta/gunungan.png" alt="" />
    </div>
  )
}
