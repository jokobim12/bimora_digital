import { useState, useEffect } from 'react'
import { IoCalendarOutline } from 'react-icons/io5'
import type { WeddingData } from '../utils/dummyData'
import { defaultWeddingData } from '../utils/dummyData'
import { formatIndonesianDate, getCalendarDates } from '../utils/dateFormatter'

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

  return (
    <div className={`w-full mx-auto px-6 py-12 lg:py-16 flex flex-col items-center transition-all duration-500 ${
      isDesktopMode ? 'max-w-[920px]' : 'max-w-[480px]'
    }`}>
      
      {/* Outer grid/flex wrapper */}
      <div className={`w-full transition-all duration-500 ${
        isDesktopMode ? 'grid grid-cols-1 md:grid-cols-2 gap-10 items-center' : 'flex flex-col items-center'
      }`}>
        
        {/* Left Column (Or top section on mobile): Title & Groom/Bride details */}
        <div className={`w-full flex flex-col ${isDesktopMode ? 'text-left items-start' : 'text-center items-center'}`}>
          <p className="font-body text-[10px] tracking-[4px] uppercase text-jawa-gold-light/90 reveal delay-100">
            Bismillahirrahmanirrahim
          </p>

          <div className={`gold-divider my-5 reveal reveal-scale delay-200 ${isDesktopMode ? 'justify-start w-full' : 'justify-center'}`}>
            <span className="line" /><span className="diamond" /><span className="line" />
          </div>

          <p className="font-body text-[10px] tracking-[5px] uppercase text-jawa-gold-light/60 mb-2 reveal reveal-down delay-300">
            Pernikahan Agung
          </p>
          
          <h2 className="font-script text-4xl md:text-5xl lg:text-6xl text-jawa-gold leading-tight drop-shadow-[0_0_20px_rgba(212,168,71,0.3)]">
            <span className="reveal reveal-left delay-500 block">{data.groom_nickname}</span>
            <span className={`reveal reveal-scale delay-600 block font-heading text-lg md:text-xl text-jawa-gold-light/60 my-1.5 ${isDesktopMode ? 'md:ml-6' : ''}`}>&amp;</span>
            <span className="reveal reveal-right delay-700 block">{data.bride_nickname}</span>
          </h2>
          
          <p className="font-heading text-[15px] lg:text-[17px] tracking-[3px] text-jawa-gold-light mt-4 reveal reveal-up delay-900">
            {formatIndonesianDate(data.wedding_date)}
          </p>

          {/* Elegant Wayang Couple Silhouette (Placed here in mobile, or in right col in desktop) */}
          {!isDesktopMode && (
            <div className="my-8 flex justify-center reveal reveal-scale delay-1000 w-full">
              <img 
                className="w-[180px] h-auto blend-screen drop-shadow-[0_0_25px_rgba(212,168,71,0.25)] animate-pulse" 
                src="/assets/wayang-couple.png" 
                alt="Wayang Couple" 
              />
            </div>
          )}

          {/* Al-Quran Quote Card */}
          <div className="bg-jawa-black-card/30 border border-jawa-gold/10 p-5 rounded-2xl reveal reveal-up delay-1100 shadow-lg backdrop-blur-sm mt-6 w-full">
            <p className="font-heading italic text-[13px] lg:text-[14px] leading-relaxed text-jawa-cream/80">
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan
              untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya,
              dan Dia menjadikan di antaramu rasa kasih dan sayang."
            </p>
            <p className="font-heading text-xs font-semibold text-jawa-gold mt-3 tracking-wider">
              — QS. Ar-Rum: 21
            </p>
          </div>
        </div>

        {/* Right Column (Or bottom section on mobile): Wayang Couple (Desktop) & Countdown */}
        <div className="w-full flex flex-col items-center">
          
          {/* Elegant Wayang Couple Silhouette (Desktop Only in this column) */}
          {isDesktopMode && (
            <div className="mb-6 flex justify-center reveal reveal-scale delay-500 w-full">
              <img 
                className="w-[200px] lg:w-[230px] h-auto blend-screen drop-shadow-[0_0_30px_rgba(212,168,71,0.25)] animate-pulse" 
                src="/assets/wayang-couple.png" 
                alt="Wayang Couple" 
              />
            </div>
          )}

          {/* Countdown Section */}
          <div className="w-full text-center reveal reveal-up mt-4">
            <p className="font-body text-[10px] tracking-[3px] uppercase text-jawa-gold-light/80 mb-4">
              Menuju Hari Bahagia
            </p>
            <div className="grid grid-cols-4 gap-3 max-w-[360px] mx-auto">
              {[
                { val: time.days, label: 'Hari', delay: 'delay-100' },
                { val: time.hours, label: 'Jam', delay: 'delay-200' },
                { val: time.minutes, label: 'Menit', delay: 'delay-300' },
                { val: time.seconds, label: 'Detik', delay: 'delay-400' },
              ].map(item => (
                <div className={`bg-jawa-black-card border border-jawa-gold/15 rounded-xl py-3 px-1.5 flex flex-col items-center shadow-md reveal reveal-scale ${item.delay}`} key={item.label}>
                  <span className="font-heading text-2xl md:text-3xl font-semibold text-jawa-gold leading-none">
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className="font-body text-[8px] tracking-[1.5px] uppercase text-jawa-gold-light/60 mt-1.5">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Calendar Save Button */}
            <div className="mt-8 reveal reveal-scale delay-500">
              <a 
                className="inline-flex items-center gap-2 bg-transparent hover:bg-jawa-gold border border-jawa-gold/30 hover:border-jawa-gold text-jawa-gold hover:text-black font-body text-[10px] tracking-wider uppercase px-6 py-3 rounded-full transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
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
      <img className="w-16 lg:w-20 h-auto opacity-20 blend-screen my-10 lg:my-12 reveal reveal-scale delay-200" src="/assets/gunungan.png" alt="" />
    </div>
  )
}
