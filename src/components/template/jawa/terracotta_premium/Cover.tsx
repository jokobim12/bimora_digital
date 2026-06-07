import type { WeddingData } from '../../../../utils/dummyData'

interface CoverProps {
  guestName?: string
  onOpen: () => void
  closing: boolean
  data?: WeddingData
}

export default function Cover({ guestName, onOpen, closing, data }: CoverProps) {
  return (
    <div className={`fixed inset-0 z-[100] bg-[#FAF6EC] flex items-center justify-center overflow-hidden transition-all duration-[2000ms] ${
      closing ? 'bg-[#FAF6EC]/0 pointer-events-none' : 'bg-[#FAF6EC]'
    }`}>
      
      {/* Phone Viewport Wrapper */}
      <div className={`relative w-full h-full max-w-[440px] bg-[#FAF6EC] overflow-hidden transition-all duration-[2000ms] ${
        closing ? 'opacity-0 scale-[1.05] pointer-events-none' : 'shadow-2xl'
      }`}>
        
        {/* Layer 1: Background Archway (Anchored to bottom, scaled up) */}
        <div className={`absolute inset-0 z-0 flex items-end justify-center transition-all duration-[2000ms] ease-out ${
          closing ? 'transform scale-[1.75] opacity-0 blur-[2px] origin-bottom' : 'transform scale-100 origin-bottom'
        }`}>
          <img 
            src="/assets/terracotta/arch.png" 
            alt="Backdrop" 
            className="w-full h-[90%] object-contain object-bottom scale-[1.38] origin-bottom translate-y-[6%] opacity-[0.95]" 
          />
        </div>

        {/* Layer 1.5: White Semi-Transparent Softener Shape (50% opacity + blur to soften Javanese gate details) */}
        <div className={`absolute inset-0 z-[1] bg-white/50 backdrop-blur-[4px] pointer-events-none transition-all duration-[2000ms] ease-out ${
          closing ? 'opacity-0' : 'opacity-100'
        }`} />

        {/* Layer 2: Forest Canopy overlay (Top Left - Moved higher and scaled up to eliminate top whitespace) */}
        <img 
          src="/assets/terracotta/canopy.png" 
          alt="Canopy Left" 
          className={`absolute top-[-8%] left-[-10%] w-[65%] opacity-95 rotate-[-8deg] pointer-events-none z-10 transition-all duration-[2000ms] ease-out scale-[1.15] ${
            closing ? 'transform -translate-x-[45%] -translate-y-[45%] opacity-0' : ''
          }`} 
        />

        {/* Layer 2: Forest Canopy overlay (Top Right - Moved higher and scaled up to eliminate top whitespace) */}
        <img 
          src="/assets/terracotta/canopy.png" 
          alt="Canopy Right" 
          className={`absolute top-[-8%] right-[-10%] w-[65%] opacity-95 rotate-[8deg] scale-x-[-1] pointer-events-none z-10 transition-all duration-[2000ms] ease-out scale-[1.15] ${
            closing ? 'transform translate-x-[45%] -translate-y-[45%] opacity-0' : ''
          }`} 
        />

        {/* Layer 3: Left & Right Stone Pillars */}
        <img 
          src="/assets/terracotta/pillar.png" 
          alt="Pillar Left" 
          className={`absolute left-[3%] bottom-[12%] w-[22%] max-w-[90px] z-10 pointer-events-none transition-all duration-[2000ms] ease-out ${
            closing ? 'transform -translate-x-[150%] opacity-0 scale-90' : 'transform translate-x-0'
          }`} 
        />
        <img 
          src="/assets/terracotta/pillar.png" 
          alt="Pillar Right" 
          className={`absolute right-[3%] bottom-[12%] w-[22%] max-w-[90px] z-10 scale-x-[-1] pointer-events-none transition-all duration-[2000ms] ease-out ${
            closing ? 'transform translate-x-[150%] opacity-0 scale-90' : 'transform translate-x-0'
          }`} 
        />

        {/* Layer 4: Central Arch Card backdrop (Rounded full at the top, bg-white/95, z-20 to sit on top of softener) */}
        <div className={`absolute bottom-0 left-[8%] right-[8%] top-[12%] z-20 bg-white/95 border-t border-x border-[#8B3D30]/15 rounded-t-[180px] shadow-[0_-8px_32px_rgba(139,61,48,0.06)] transition-all duration-[1600ms] ease-out ${
          closing ? 'transform scale-[0.95] translate-y-[100%] opacity-0' : 'transform scale-100 translate-y-0 opacity-100'
        }`}>
          {/* Content container */}
          <div className="w-full h-full flex flex-col items-center justify-start text-center px-4 pt-[18%]">
            {/* Gunungan Logo */}
            <img 
              src="/assets/terracotta/gunungan.png" 
              alt="Gunungan" 
              className="w-12 h-auto opacity-95 mb-4 filter drop-shadow-[0_2px_6px_rgba(139,61,48,0.2)]" 
            />

            <p className="font-body text-[8.5px] tracking-[4px] uppercase text-[#8B3D30] font-bold mb-2">
              THE WEDDING OF
            </p>
            
            <h1 className="font-heading text-3xl font-light text-[#5A1E17] tracking-wide my-1">
              {data?.groom_nickname || "Ami"} &amp; {data?.bride_nickname || "Malik"}
            </h1>
            
            {/* Guest Info */}
            <div className="mt-14 mb-4 flex flex-col items-center">
              <p className="font-body text-[9px] tracking-[2px] text-[#8B3D30]/70 mb-1 font-semibold">
                Kepada Yth:
              </p>
              <div className="font-heading text-base font-bold text-[#5A1E17] tracking-wide">
                {guestName || "Tamu Undangan"}
              </div>
            </div>

            {/* Buka Undangan Button (Capsule-shaped with mail icon) */}
            <button 
              onClick={onOpen}
              className="mt-3 px-6 py-2.5 bg-[#8B3D30] hover:bg-[#5A1E17] text-white font-heading text-[9px] tracking-[3px] uppercase font-bold rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5"></path>
              </svg>
              Buka Undangan
            </button>

            <p className="font-body text-[7px] text-[#8B3D30]/50 mt-12 italic max-w-[200px]">
              *Mohon maaf apabila ada kesalahan penulisan nama/gelar
            </p>
          </div>
        </div>

        {/* Layer 5: Javanese Wayang Characters (Enlarged and shifted to the sides) */}
        <img 
          src="/assets/terracotta/wayang_left.png" 
          alt="Wayang Left" 
          className={`absolute left-[-16%] bottom-[12%] w-[58%] max-w-[230px] z-[25] pointer-events-none transition-all duration-[2000ms] ease-out ${
            closing ? 'transform -translate-x-[180%] rotate-[-25deg] opacity-0 scale-90' : 'transform translate-x-0'
          }`} 
        />
        <img 
          src="/assets/terracotta/wayang_right.png" 
          alt="Wayang Right" 
          className={`absolute right-[-16%] bottom-[12%] w-[58%] max-w-[230px] z-[25] pointer-events-none transition-all duration-[2000ms] ease-out ${
            closing ? 'transform translate-x-[180%] rotate-[25deg] opacity-0 scale-90' : 'transform translate-x-0'
          }`} 
        />

        {/* Layer 6: Foreground Bottom Flowers (Left Overlapping Layer, tilted and pushed down) */}
        <div className={`absolute bottom-0 left-[-15%] w-[72%] z-30 pointer-events-none transition-all duration-[2000ms] ease-out ${
          closing ? 'transform -translate-x-[60%] translate-y-[100%] opacity-0' : 'transform translate-x-0'
        }`}>
          <img 
            src="/assets/terracotta/bottom_flowers.png" 
            alt="Foreground Flowers Left" 
            className="w-full h-auto object-contain scale-[1.15] translate-y-[52%] rotate-[-6deg] origin-bottom" 
          />
        </div>

        {/* Layer 6: Foreground Bottom Flowers (Right Overlapping Layer, tilted and pushed down) */}
        <div className={`absolute bottom-0 right-[-15%] w-[72%] z-30 pointer-events-none transition-all duration-[2000ms] ease-out ${
          closing ? 'transform translate-x-[60%] translate-y-[100%] opacity-0' : 'transform translate-x-0'
        }`}>
          <img 
            src="/assets/terracotta/bottom_flowers.png" 
            alt="Foreground Flowers Right" 
            className="w-full h-auto object-contain scale-[1.15] translate-y-[52%] rotate-[6deg] scale-x-[-1] origin-bottom" 
          />
        </div>

      </div>
    </div>
  )
}
