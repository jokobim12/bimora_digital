import { useEffect, useRef, useState } from 'react'

interface SectionGateProps {
  children: React.ReactNode
  id?: string
  className?: string
}

export default function SectionGate({ children, id, className = '' }: SectionGateProps) {
  const [isOpen, setIsOpen] = useState(false)
  const gateRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = gateRef.current?.closest('.overflow-y-auto') || null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsOpen(true)
        } else {
          setIsOpen(false)
        }
      },
      {
        root: scrollContainer,
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px',
      }
    )

    if (gateRef.current) {
      observer.observe(gateRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div 
      ref={gateRef} 
      id={id}
      className={`relative w-full overflow-hidden min-h-[300px] ${className}`}
    >
      {/* Background soft glow during closed gate */}
      <div 
        className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(179,133,32,0.04)_0%,transparent_70%)] transition-opacity duration-1000 pointer-events-none z-10 ${
          isOpen ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Main Content (Fades and scales up gently as gate opens) */}
      <div className={`w-full transition-all duration-[1400ms] ease-out ${
        isOpen ? 'opacity-100 scale-100 filter blur-0 pointer-events-auto' : 'opacity-0 scale-[0.97] filter blur-[2px] pointer-events-none'
      }`}>
        {children}
      </div>

      {/* Gunungan Gate Panels Overlay */}
      <div className={`absolute inset-0 z-20 pointer-events-none flex overflow-hidden transition-opacity duration-[1000ms] ${
        isOpen ? 'opacity-0' : 'opacity-100'
      }`}>
        {/* Left Gunungan Panel */}
        <div className={`absolute top-0 bottom-0 left-0 w-1/2 bg-[#FAF6EC]/95 border-r border-[#B38520]/25 flex items-center justify-end overflow-hidden transition-all duration-[1400ms] ease-out ${
          isOpen 
            ? 'transform -translate-x-[110%] rotate-[-12deg] opacity-0' 
            : 'transform translate-x-0 rotate-0 opacity-100'
        }`}>
          {/* Half Gunungan Ornament (Tilted Left) */}
          <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-[160px] h-[320px] md:w-[200px] md:h-[400px] overflow-hidden flex justify-end items-center">
            <img 
              src="/assets/gunungan.png" 
              alt="" 
              className="h-full w-auto max-w-none translate-x-[45%] object-contain opacity-40 filter drop-shadow-[0_0_12px_rgba(179,133,32,0.25)] rotate-[-12deg]" 
            />
          </div>
          {/* Subtle gold frame line on panel edge */}
          <div className="absolute top-0 bottom-0 right-1 w-[1px] bg-gradient-to-b from-transparent via-[#B38520]/20 to-transparent" />
        </div>

        {/* Right Gunungan Panel */}
        <div className={`absolute top-0 bottom-0 right-0 w-1/2 bg-[#FAF6EC]/95 border-l border-[#B38520]/25 flex items-center justify-start overflow-hidden transition-all duration-[1400ms] ease-out ${
          isOpen 
            ? 'transform translate-x-[110%] rotate-[12deg] opacity-0' 
            : 'transform translate-x-0 rotate-0 opacity-100'
        }`}>
          {/* Half Gunungan Ornament (Tilted Right) */}
          <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-[160px] h-[320px] md:w-[200px] md:h-[400px] overflow-hidden flex justify-start items-center">
            <img 
              src="/assets/gunungan.png" 
              alt="" 
              className="h-full w-auto max-w-none -translate-x-[45%] object-contain opacity-40 filter drop-shadow-[0_0_12px_rgba(179,133,32,0.25)] rotate-[12deg]" 
            />
          </div>
          {/* Subtle gold frame line on panel edge */}
          <div className="absolute top-0 bottom-0 left-1 w-[1px] bg-gradient-to-b from-transparent via-[#B38520]/20 to-transparent" />
        </div>
      </div>
    </div>
  )
}
