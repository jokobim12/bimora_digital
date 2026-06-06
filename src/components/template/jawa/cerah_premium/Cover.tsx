import { useMemo } from 'react'
import type { WeddingData } from '../../../../utils/dummyData'
import { formatIndonesianDate } from '../../../../utils/dateFormatter'

interface CoverProps {
  guestName?: string
  onOpen: () => void
  closing: boolean
  data?: WeddingData
}

export default function Cover({ guestName, onOpen, closing, data }: CoverProps) {
  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${5 + Math.random() * 5}s`,
      size: `${1.5 + Math.random() * 2.5}px`,
    })), [])

  return (
    <div className="fixed inset-0 z-[100] bg-[#FAF6EC] flex items-center justify-center overflow-hidden">
      
      {/* Background Soft Glow behind the doors */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(179,133,32,0.08)_0%,transparent_70%)] z-0" />
      
      {/* Floating Gold Dust Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full bg-[#B38520] opacity-0 animate-pulse"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationName: 'floatParticle',
              animationDuration: p.duration,
              animationDelay: p.delay,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear'
            }}
          />
        ))}
      </div>

      {/* LEFT DOOR PANEL */}
      <div 
        className={`absolute left-0 top-0 w-1/2 h-full bg-[#FAF6EC]/95 border-r border-[#B38520]/25 flex items-center justify-end overflow-hidden transition-transform duration-1000 ease-in-out z-20 ${
          closing ? 'transform -translate-x-full' : 'transform translate-x-0'
        }`}
      >
        {/* Javanese Frame Ornament on left corner */}
        <div className="absolute left-4 top-4 bottom-4 right-4 border border-[#B38520]/15 pointer-events-none rounded-l-md" />
        
        {/* Left Half of Gunungan on the split edge */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[320px] h-[480px] overflow-hidden flex justify-end items-center pointer-events-none">
          <img 
            src="/assets/gunungan.png" 
            alt="" 
            className="h-[480px] w-auto max-w-none translate-x-1/2 object-contain opacity-40 filter drop-shadow-[0_0_12px_rgba(179,133,32,0.3)]" 
          />
        </div>
      </div>

      {/* RIGHT DOOR PANEL */}
      <div 
        className={`absolute right-0 top-0 w-1/2 h-full bg-[#FAF6EC]/95 border-l border-[#B38520]/25 flex items-center justify-start overflow-hidden transition-transform duration-1000 ease-in-out z-20 ${
          closing ? 'transform translate-x-full' : 'transform translate-x-0'
        }`}
      >
        {/* Javanese Frame Ornament on right corner */}
        <div className="absolute left-4 top-4 bottom-4 right-4 border border-[#B38520]/15 pointer-events-none rounded-r-md" />
        
        {/* Right Half of Gunungan on the split edge */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[320px] h-[480px] overflow-hidden flex justify-start items-center pointer-events-none">
          <img 
            src="/assets/gunungan.png" 
            alt="" 
            className="h-[480px] w-auto max-w-none -translate-x-1/2 object-contain opacity-40 filter drop-shadow-[0_0_12px_rgba(179,133,32,0.3)]" 
          />
        </div>
      </div>

      {/* Main invitation info inside cover (Fades out when doors are opening) */}
      <div 
        className={`relative z-30 text-center p-6 md:p-8 flex flex-col items-center w-[92%] max-w-[360px] bg-white/95 backdrop-blur-lg border-2 border-[#B38520]/45 rounded-2xl shadow-[0_15px_40px_rgba(179,133,32,0.15)] transition-all duration-500 ease-in-out ${
          closing ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        {/* Inner thin gold border for physical card effect */}
        <div className="absolute inset-1.5 border border-[#B38520]/15 rounded-xl pointer-events-none" />

        {/* Small top Gunungan ornament */}
        <img 
          src="/assets/gunungan.png" 
          alt="" 
          className="w-12 h-auto opacity-90 mb-3 filter brightness-105 drop-shadow-[0_0_6px_rgba(179,133,32,0.4)] animate-pulse z-10" 
        />

        <p className="font-body text-[9px] tracking-[4px] uppercase text-[#B38520] font-medium z-10 animate-[fadeUp_1s_0.2s_both]">
          Bismillahirrahmanirrahim
        </p>
        
        {/* Split separator indicator - just decoration */}
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#B38520]/40 to-transparent my-3.5 z-10" />
        
        {/* Formal Invitation Label */}
        <div className="flex items-center gap-2.5 my-1.5 z-10 animate-[fadeUp_1s_0.4s_both]">
          <span className="w-3 h-[1px] bg-[#B38520]/40" />
          <span className="font-body text-[8.5px] tracking-[5px] uppercase text-[#B38520] font-semibold">
            Serat Ulem Pernikahan
          </span>
          <span className="w-3 h-[1px] bg-[#B38520]/40" />
        </div>
        
        <h1 className="font-script text-4xl lg:text-[42px] text-[#A17A24] leading-relaxed drop-shadow-[0_0_8px_rgba(179,133,32,0.15)] my-2 z-10 animate-[fadeUp_1s_0.6s_both]">
          {data?.groom_nickname || "Bimantara"}
          <span className="block font-heading text-[10px] tracking-[6px] text-[#6B5A43]/60 uppercase my-1.5">- &amp; -</span>
          {data?.bride_nickname || "Claraveliana"}
        </h1>
        
        <p className="font-heading text-[10px] tracking-[3px] uppercase text-[#6B5A43] mt-1.5 z-10 animate-[fadeUp_1s_0.8s_both]">
          {data ? formatIndonesianDate(data.wedding_date) : "Sabtu, 15 Agustus 2026"}
        </p>

        {/* Guest Name Card Section */}
        <div className="mt-6 p-4 bg-[#FAF6EC] border border-[#B38520]/25 rounded-xl w-full relative overflow-hidden z-10 animate-[fadeUp_1s_1.0s_both] shadow-inner text-[#4A3B32]">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B38520]/40 to-transparent" />
          <p className="font-body text-[8px] tracking-[3px] uppercase text-[#B38520] mb-2">
            Katur Dhumateng / Kepada Yth:
          </p>
          <div className="font-heading text-sm font-semibold text-[#3E2A00] tracking-wide py-1 px-3 border-b border-[#B38520]/20 inline-block">
            {guestName || "Tamu Undangan"}
          </div>
          <p className="font-body text-[7.5px] text-[#6B5A43]/60 mt-2.5 italic">
            *Mohon maaf apabila ada kesalahan penulisan nama/gelar
          </p>
        </div>
        
        {/* Open Button styled as a gold royal seal */}
        <button 
          className="mt-6 px-10 py-3.5 bg-[#B38520] hover:bg-[#9E7624] text-white font-heading text-[10px] tracking-[4px] uppercase font-bold rounded-lg transition-all duration-300 hover:scale-[1.03] active:scale-95 z-10 animate-[fadeUp_1s_1.2s_both] cursor-pointer shadow-md"
          onClick={onOpen}
        >
          Buka Undangan
        </button>
      </div>
    </div>
  )
}
