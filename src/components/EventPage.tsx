import { IoTimeOutline, IoLocationOutline, IoNavigateOutline } from 'react-icons/io5'
import type { WeddingData } from '../utils/dummyData'
import { defaultWeddingData } from '../utils/dummyData'
import { formatIndonesianDate } from '../utils/dateFormatter'

interface EventPageProps {
  isDesktopMode?: boolean
  data?: WeddingData
}

export default function EventPage({ isDesktopMode = false, data = defaultWeddingData }: EventPageProps) {
  return (
    <div className={`w-full mx-auto px-6 py-12 lg:py-16 flex flex-col items-center transition-all duration-500 ${
      isDesktopMode ? 'max-w-[920px]' : 'max-w-[480px]'
    }`}>
      
      {/* Title */}
      <p className="font-body text-[10px] tracking-[4px] uppercase text-jawa-gold-light/70 reveal delay-100">
        Waktu &amp; Tempat
      </p>
      <h2 className="font-heading text-3xl font-light text-jawa-gold tracking-wide mt-1 reveal reveal-down delay-200">
        Detail Acara
      </h2>
      <div className="gold-divider my-6 reveal reveal-scale delay-300">
        <span className="line" /><span className="diamond" /><span className="line" />
      </div>

      {/* Cards container - side-by-side on desktop */}
      <div className={`w-full ${
        isDesktopMode ? 'grid grid-cols-2 gap-8 items-stretch' : 'flex flex-col gap-6'
      }`}>
        
        {/* Akad Nikah */}
        <div className="bg-jawa-black-card/30 border border-jawa-gold/15 rounded-2xl p-6 relative overflow-hidden reveal reveal-left delay-100 shadow-md backdrop-blur-sm flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-jawa-gold to-transparent" />
          
          <div>
            <h3 className="font-heading text-xl text-jawa-gold text-center mb-5 tracking-wider">
              Akad Nikah
            </h3>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <IoTimeOutline className="text-jawa-gold text-lg mt-0.5 flex-shrink-0" />
                <div className="font-body text-[11px] lg:text-[11.5px] leading-relaxed text-jawa-cream/80">
                  <span className="font-semibold block text-jawa-cream text-xs mb-0.5">Waktu</span>
                  {formatIndonesianDate(data.wedding_date)}<br />
                  {data.akad_time}
                </div>
              </div>

              <div className="flex items-start gap-3 mt-1">
                <IoLocationOutline className="text-jawa-gold text-lg mt-0.5 flex-shrink-0" />
                <div className="font-body text-[11px] lg:text-[11.5px] leading-relaxed text-jawa-cream/80">
                  <span className="font-semibold block text-jawa-cream text-xs mb-0.5">Tempat</span>
                  {data.location_name}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resepsi */}
        <div className="bg-jawa-black-card/30 border border-jawa-gold/15 rounded-2xl p-6 relative overflow-hidden reveal reveal-right delay-300 shadow-md backdrop-blur-sm flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-jawa-gold to-transparent" />
          
          <div>
            <h3 className="font-heading text-xl text-jawa-gold text-center mb-5 tracking-wider">
              Resepsi Pernikahan
            </h3>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <IoTimeOutline className="text-jawa-gold text-lg mt-0.5 flex-shrink-0" />
                <div className="font-body text-[11px] lg:text-[11.5px] leading-relaxed text-jawa-cream/80">
                  <span className="font-semibold block text-jawa-cream text-xs mb-0.5">Waktu</span>
                  {formatIndonesianDate(data.wedding_date)}<br />
                  {data.resepsi_time}
                </div>
              </div>

              <div className="flex items-start gap-3 mt-1">
                <IoLocationOutline className="text-jawa-gold text-lg mt-0.5 flex-shrink-0" />
                <div className="font-body text-[11px] lg:text-[11.5px] leading-relaxed text-jawa-cream/80">
                  <span className="font-semibold block text-jawa-cream text-xs mb-0.5">Tempat</span>
                  {data.location_name}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Map Embed - Split layout on desktop */}
      <div className={`w-full mt-12 reveal reveal-scale delay-200 ${
        isDesktopMode ? 'bg-jawa-black-card/15 border border-jawa-gold/10 p-6 rounded-2xl shadow-lg backdrop-blur-sm' : ''
      }`}>
        <p className="font-body text-[10px] tracking-[3px] uppercase text-jawa-gold-light/80 mb-4 text-center">
          Petunjuk Lokasi
        </p>
        
        <div className={`w-full ${
          isDesktopMode ? 'grid grid-cols-2 gap-8 items-center' : 'flex flex-col items-center'
        }`}>
          
          {/* Map box */}
          <div className="w-full h-[220px] lg:h-[260px] rounded-2xl border border-jawa-gold/20 overflow-hidden shadow-lg">
            <iframe
              src={data.maps_embed}
              className="w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 transition-all duration-500"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Lokasi Pernikahan di ${data.location_name}`}
            />
          </div>
          
          {/* Info & Button */}
          <div className={`flex flex-col ${isDesktopMode ? 'text-left items-start px-2' : 'text-center items-center mt-6'}`}>
            <h4 className="font-heading text-lg text-jawa-gold tracking-wide mb-3">{data.location_name}</h4>
            <p className="font-body text-[11px] lg:text-xs text-jawa-cream/60 leading-relaxed mb-6">
              {data.location_address}
            </p>
            
            <a 
              className="inline-flex items-center gap-2 bg-jawa-gold hover:bg-jawa-gold-dark text-black font-body text-[10px] tracking-wider uppercase font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
              href={data.maps_link} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <IoNavigateOutline className="text-sm" /> Petunjuk Arah
            </a>
          </div>
        </div>
      </div>

      {/* Ornament */}
      <img className="w-16 lg:w-20 h-auto opacity-20 blend-screen my-10 lg:my-12 reveal reveal-scale delay-200" src="/assets/gunungan.png" alt="" />
    </div>
  )
}
