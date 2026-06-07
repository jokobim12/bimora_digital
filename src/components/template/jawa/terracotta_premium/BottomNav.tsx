import { IoHomeOutline, IoHeartOutline, IoCalendarOutline, IoImagesOutline, IoMailOutline, IoGiftOutline, IoMusicalNotes, IoMusicalNotesOutline } from 'react-icons/io5'
export type TabId = 'home' | 'couple' | 'event' | 'gallery' | 'wishes' | 'gift'

interface BottomNavProps {
  active: TabId
  onChange: (tab: TabId) => void
  musicPlaying: boolean
  toggleMusic: () => void
}

export default function BottomNav({ active, onChange, musicPlaying, toggleMusic }: BottomNavProps) {
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
      <div className="flex-grow h-[56px] bg-[#FAF6EC] border-t border-[#8B3D30]/20 flex justify-around items-center px-2">
        {leftTabs.map(tab => {
          const IconComponent = tab.icon
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`p-3 transition-all duration-300 relative cursor-pointer ${
                isActive ? 'text-[#8B3D30] scale-110' : 'text-[#7A3227]/70 hover:text-[#5A1E17]'
              }`}
            >
              <IconComponent 
                className={`text-xl transition-all duration-300 ${
                  isActive ? 'drop-shadow-[0_0_8px_rgba(139,61,48,0.4)]' : ''
                }`} 
              />
              {isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#8B3D30] rounded-full" />
              )}
            </button>
          )
        })}
      </div>

      {/* Center Notch Section */}
      <div className="w-[100px] h-[56px] relative bg-transparent flex items-end shrink-0">
        {/* Notch SVG Background */}
        <svg 
          width="100" 
          height="56" 
          viewBox="0 0 100 56" 
          fill="none" 
          className="absolute inset-0 text-[#FAF6EC]"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main filled body using warm cream */}
          <path 
            d="M 0 0 
               C 18 0, 16 36, 50 36 
               C 84 36, 82 0, 100 0 
               L 100 56 
               L 0 56 
               Z" 
            fill="#FAF6EC" 
          />
          {/* Top border line using terracotta */}
          <path 
            d="M 0 0 
               C 18 0, 16 36, 50 36 
               C 84 36, 82 0, 100 0" 
            stroke="rgba(139,61,48,0.2)" 
            strokeWidth="1.2" 
            fill="none" 
          />
        </svg>

        {/* Music Button absolute in center of notch */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[-14px] z-20">
          <button
            onClick={toggleMusic}
            className={`w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border border-[#8B3D30]/35 active:scale-90 ${
              musicPlaying 
                ? 'bg-[#8B3D30] text-[#FAF6EC] shadow-[0_0_12px_rgba(139,61,48,0.4)]' 
                : 'bg-[#FAF6EC] text-[#8B3D30] hover:bg-[#F2EAD6]'
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
      <div className="flex-grow h-[56px] bg-[#FAF6EC] border-t border-[#8B3D30]/20 flex justify-around items-center px-2">
        {rightTabs.map(tab => {
          const IconComponent = tab.icon
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`p-3 transition-all duration-300 relative cursor-pointer ${
                isActive ? 'text-[#8B3D30] scale-110' : 'text-[#7A3227]/70 hover:text-[#5A1E17]'
              }`}
            >
              <IconComponent 
                className={`text-xl transition-all duration-300 ${
                  isActive ? 'drop-shadow-[0_0_8px_rgba(139,61,48,0.4)]' : ''
                }`} 
              />
              {isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#8B3D30] rounded-full" />
              )}
            </button>
          )
        })}
      </div>
      
    </div>
  )
}
