import { IoHomeOutline, IoHeartOutline, IoCalendarOutline, IoImagesOutline, IoMailOutline, IoGiftOutline, IoMusicalNotes, IoMusicalNotesOutline } from 'react-icons/io5'
export type TabId = 'home' | 'couple' | 'event' | 'gallery' | 'wishes' | 'gift'

interface BottomNavProps {
  active: TabId
  onChange: (tab: TabId) => void
  musicPlaying: boolean
  toggleMusic: () => void
}

export default function BottomNav({ active, onChange, musicPlaying, toggleMusic }: BottomNavProps) {
  // Navigation tabs (Left: Home, Couple, Event. Right: Gallery, Wishes, Gift)
  const leftTabs = [
    { id: 'home' as TabId, icon: IoHomeOutline },
    { id: 'couple' as TabId, icon: IoHeartOutline },
    { id: 'event' as TabId, icon: IoCalendarOutline },
  ]
  const rightTabs = [
    { id: 'gallery' as TabId, icon: IoImagesOutline },
    { id: 'wishes' as TabId, icon: IoMailOutline },
    { id: 'gift' as TabId, icon: IoGiftOutline },
  ]

  return (
    <div className="w-full h-[70px] bg-transparent select-none relative flex items-end">
      
      {/* Left straight bar */}
      <div className="flex-grow h-[56px] bg-black border-t border-jawa-gold/35 flex justify-around items-center px-2">
        {leftTabs.map(tab => {
          const IconComponent = tab.icon
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`p-3 transition-all duration-300 relative cursor-pointer ${
                isActive ? 'text-jawa-gold scale-110' : 'text-jawa-cream/60 hover:text-jawa-cream'
              }`}
            >
              <IconComponent 
                className={`text-xl transition-all duration-300 ${
                  isActive ? 'drop-shadow-[0_0_8px_rgba(212,168,71,0.7)]' : ''
                }`} 
              />
              {isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-jawa-gold rounded-full" />
              )}
            </button>
          )
        })}
      </div>

      {/* Center Notch Section (Fixed width to prevent stretching) */}
      <div className="w-[100px] h-[56px] relative bg-transparent flex items-end shrink-0">
        {/* Notch SVG Background */}
        <svg 
          width="100" 
          height="56" 
          viewBox="0 0 100 56" 
          fill="none" 
          className="absolute inset-0 text-black"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main filled body */}
          <path 
            d="M 0 0 
               C 18 0, 16 36, 50 36 
               C 84 36, 82 0, 100 0 
               L 100 56 
               L 0 56 
               Z" 
            fill="#000000" 
          />
          {/* Top border line */}
          <path 
            d="M 0 0 
               C 18 0, 16 36, 50 36 
               C 84 36, 82 0, 100 0" 
            stroke="rgba(212,168,71,0.35)" 
            strokeWidth="1.2" 
            fill="none" 
          />
        </svg>

        {/* Music Button absolute in center of notch (raised to avoid touching the bottom curve) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[-14px] z-20">
          <button
            onClick={toggleMusic}
            className={`w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border border-jawa-gold/45 active:scale-90 ${
              musicPlaying 
                ? 'bg-jawa-gold text-black shadow-[0_0_12px_rgba(212,168,71,0.5)]' 
                : 'bg-black text-jawa-gold hover:bg-stone-900'
            }`}
            title={musicPlaying ? "Matikan Musik" : "Putar Musik"}
          >
            {musicPlaying ? (
              <IoMusicalNotes 
                className="text-lg animate-[spin_4s_linear_infinite]" 
              />
            ) : (
              <IoMusicalNotesOutline 
                className="text-lg" 
              />
            )}
          </button>
        </div>
      </div>

      {/* Right straight bar */}
      <div className="flex-grow h-[56px] bg-black border-t border-jawa-gold/35 flex justify-around items-center px-2">
        {rightTabs.map(tab => {
          const IconComponent = tab.icon
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`p-3 transition-all duration-300 relative cursor-pointer ${
                isActive ? 'text-jawa-gold scale-110' : 'text-jawa-cream/60 hover:text-jawa-cream'
              }`}
            >
              <IconComponent 
                className={`text-xl transition-all duration-300 ${
                  isActive ? 'drop-shadow-[0_0_8px_rgba(212,168,71,0.7)]' : ''
                }`} 
              />
              {isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-jawa-gold rounded-full" />
              )}
            </button>
          )
        })}
      </div>
      
    </div>
  )
}
