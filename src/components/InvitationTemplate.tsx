import { useState, useEffect, useRef } from 'react'
import { IoVolumeMuteOutline, IoPhonePortraitOutline, IoDesktopOutline, IoLogoInstagram } from 'react-icons/io5'
import Cover from './Cover'
import BottomNav from './BottomNav'
import type { TabId } from './BottomNav'
import HomePage from './HomePage'
import CouplePage from './CouplePage'
import EventPage from './EventPage'
import GalleryPage from './GalleryPage'
import WishesPage from './WishesPage'
import SectionGate from './SectionGate'
import type { WeddingData } from '../utils/dummyData'

interface InvitationTemplateProps {
  data: WeddingData
}

export default function InvitationTemplate({ data }: InvitationTemplateProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [closingCover, setClosingCover] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const [guestName, setGuestName] = useState('')
  const [isDesktopMode, setIsDesktopMode] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [showToast, setShowToast] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const appContainerRef = useRef<HTMLDivElement | null>(null)

  // References for navigation scroll target
  const homeRef = useRef<HTMLDivElement | null>(null)
  const coupleRef = useRef<HTMLDivElement | null>(null)
  const eventRef = useRef<HTMLDivElement | null>(null)
  const galleryRef = useRef<HTMLDivElement | null>(null)
  const wishesRef = useRef<HTMLDivElement | null>(null)

  // Toast notifier
  const triggerToast = (msg: string) => {
    setToastMsg(msg)
    setShowToast(true)
  }

  useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => setShowToast(false), 3000)
      return () => clearTimeout(t)
    }
  }, [showToast])

  // Detect query parameter and set guest name
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const to = params.get('to')
    if (to) {
      setGuestName(to)
    }
  }, [])

  // Responsive mode detection
  useEffect(() => {
    const checkSize = () => {
      setIsDesktopMode(window.innerWidth >= 1024)
    }
    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  // Play audio when cover is opened
  const handleOpenInvitation = () => {
    setClosingCover(true)
    setTimeout(() => {
      setIsOpen(true)
      if (audioRef.current) {
        audioRef.current.play().catch(err => {
          console.log('Audio autoplay prevented by browser. User interaction required.', err)
        })
      }
    }, 1000)
  }

  // Toggle Mute Audio
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(() => {})
        audioRef.current.muted = false
      } else {
        audioRef.current.muted = true
      }
      setIsMuted(!isMuted)
    }
  }

  // Intersection Observer to update active navigation tab based on viewport scroll position
  useEffect(() => {
    if (!isOpen) return

    const observerOptions = {
      root: appContainerRef.current,
      rootMargin: '0px 0px -40% 0px',
      threshold: 0.1,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === homeRef.current) setActiveTab('home')
          else if (entry.target === coupleRef.current) setActiveTab('couple')
          else if (entry.target === eventRef.current) setActiveTab('event')
          else if (entry.target === galleryRef.current) setActiveTab('gallery')
          else if (entry.target === wishesRef.current) setActiveTab('wishes')
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    if (homeRef.current) observer.observe(homeRef.current)
    if (coupleRef.current) observer.observe(coupleRef.current)
    if (eventRef.current) observer.observe(eventRef.current)
    if (galleryRef.current) observer.observe(galleryRef.current)
    if (wishesRef.current) observer.observe(wishesRef.current)

    return () => {
      observer.disconnect()
    }
  }, [isOpen])

  // Intersection Observer for scroll-reveal elements
  useEffect(() => {
    if (!isOpen) return

    // Allow time for DOM to render after opening cover
    const timeoutId = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal')
      
      const observerOptions = {
        root: appContainerRef.current,
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px',
      }

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      }

      const observer = new IntersectionObserver(observerCallback, observerOptions)
      revealElements.forEach(el => observer.observe(el))

      return () => {
        observer.disconnect()
      }
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [isOpen])

  // Scroll to selected element when navigation tab is clicked
  const handleNavClick = (tabId: string) => {
    let targetRef: React.RefObject<HTMLDivElement | null> | null = null
    if (tabId === 'home') targetRef = homeRef
    else if (tabId === 'couple') targetRef = coupleRef
    else if (tabId === 'event') targetRef = eventRef
    else if (tabId === 'gallery') targetRef = galleryRef
    else if (tabId === 'wishes') targetRef = wishesRef

    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveTab(tabId)
    }
  }

  return (
    <div className="min-h-screen bg-black text-jawa-cream relative font-body selection:bg-jawa-gold selection:text-black">
      
      {/* Audio player element */}
      <audio 
        ref={audioRef} 
        src={data.music_url || '/music/jawa.mp3'} 
        loop 
      />

      {/* Cover / Welcome Screen */}
      {!isOpen && (
        <Cover 
          guestName={guestName} 
          onOpen={handleOpenInvitation} 
          closing={closingCover} 
          data={data}
        />
      )}

      {/* BACKGROUND DECORATIVE WATERMARKS (Always Visible) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Large pulsing Gunungan watermark behind everything (Enlarged) */}
        <img 
          src="/assets/gunungan.png" 
          alt="" 
          className="w-[100vh] h-auto object-contain opacity-[0.04] select-none animate-watermark" 
        />
      </div>

      {/* SIDE FLOATING GUNUNGAN DECORATIONS (Desktop Only - snug against the active layout frame) */}
      {isOpen && (
        <div className="hidden lg:block">
          {/* Left Side Floating Gunungan (Tilted Left) */}
          <div 
            className={`fixed top-1/2 -translate-y-1/2 w-[380px] xl:w-[440px] z-10 pointer-events-none select-none transition-all duration-500 ease-in-out animate-float-left ${
              isDesktopMode 
                ? 'left-[calc(50%-810px)] xl:left-[calc(50%-850px)]' 
                : 'left-[calc(50%-435px)] xl:left-[calc(50%-475px)]'
            }`}
          >
            <img 
              src="/assets/gunungan.png" 
              alt="" 
              className={`w-full h-auto object-contain opacity-25 filter drop-shadow-[0_0_15px_rgba(212,168,71,0.25)] transition-transform duration-500 ease-in-out ${
                isDesktopMode ? 'rotate-[-10deg]' : 'rotate-[-20deg]'
              }`}
            />
          </div>
          
          {/* Right Side Floating Gunungan (Tilted Right) */}
          <div 
            className={`fixed top-1/2 -translate-y-1/2 w-[380px] xl:w-[440px] z-10 pointer-events-none select-none transition-all duration-500 ease-in-out animate-float-right ${
              isDesktopMode 
                ? 'right-[calc(50%-810px)] xl:right-[calc(50%-850px)]' 
                : 'right-[calc(50%-435px)] xl:right-[calc(50%-475px)]'
            }`}
          >
            <img 
              src="/assets/gunungan.png" 
              alt="" 
              className={`w-full h-auto object-contain opacity-25 filter drop-shadow-[0_0_15px_rgba(212,168,71,0.25)] transition-transform duration-500 ease-in-out ${
                isDesktopMode ? 'rotate-[10deg]' : 'rotate-[20deg]'
              }`}
            />
          </div>
        </div>
      )}

      {isOpen && (
        <div className="min-h-[100dvh] h-[100dvh] md:h-auto bg-transparent text-jawa-cream flex flex-col items-center justify-center relative overflow-hidden z-10">
          
          {/* Header Controls (Floating buttons) */}
          <div className="fixed top-4 left-4 right-4 z-40 flex justify-between items-center pointer-events-none">
            {/* Desktop Layout Mode Switcher */}
            <button
              onClick={() => setIsDesktopMode(prev => !prev)}
              className="hidden md:flex items-center gap-2 bg-black/85 hover:bg-black border border-jawa-gold/30 hover:border-jawa-gold text-jawa-gold text-xs font-semibold px-4 py-2 rounded-full pointer-events-auto backdrop-blur-md transition-all active:scale-95 shadow-lg"
              title="Ganti Mode Tampilan"
            >
              {isDesktopMode ? (
                <>
                  <IoPhonePortraitOutline className="text-sm" /> Tampilan Mobile
                </>
              ) : (
                <>
                  <IoDesktopOutline className="text-sm" /> Tampilan Penuh
                </>
              )}
            </button>
          </div>

          {/* MAIN CONTAINER LAYOUT */}
          <div
            className={`w-full transition-all duration-500 ease-in-out ${
              isDesktopMode
                ? 'max-w-6xl rounded-lg border border-jawa-gold/30 h-[calc(100vh-32px)] my-4'
                : 'max-w-[440px] h-[100dvh] md:h-[89vh] md:max-h-[810px] md:my-auto md:rounded-lg md:border-2 md:border-jawa-gold/45'
            } bg-[#030303] flex flex-col relative overflow-hidden`}
          >
            {/* Pulsing Gunungan Watermark inside the frame background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
              <img 
                src="/assets/gunungan.png" 
                alt="" 
                className="w-[85%] max-w-[500px] h-auto object-contain opacity-[0.04] select-none animate-watermark" 
              />
            </div>

            {/* Floating Music Equalizer Button */}
            <button 
              onClick={toggleMute}
              className="fixed right-6 bottom-24 lg:bottom-8 bg-jawa-black-light border border-jawa-gold/20 hover:border-jawa-gold text-jawa-gold rounded-full p-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.5)] active:scale-95 transition-all duration-300 z-50 cursor-pointer"
              aria-label="Toggle Music"
            >
              {isMuted ? (
                <IoVolumeMuteOutline className="text-xl" />
              ) : (
                <div className="flex items-end justify-center gap-[3px] w-5 h-5 px-[1px] py-[2px]">
                  <span className="w-[3px] bg-jawa-gold rounded-full music-bar-1" />
                  <span className="w-[3px] bg-jawa-gold rounded-full music-bar-2" />
                  <span className="w-[3px] bg-jawa-gold rounded-full music-bar-3" />
                  <span className="w-[3px] bg-jawa-gold rounded-full music-bar-4" />
                </div>
              )}
            </button>

            {/* Inner Scrollable area */}
            <div
              ref={appContainerRef}
              className="w-full overflow-y-auto overflow-x-hidden no-scrollbar flex-grow pb-[70px] h-full relative z-10"
            >
              {/* PAGE 1: HOME */}
              <div ref={homeRef} className="border-b border-jawa-gold/10">
                <HomePage isDesktopMode={isDesktopMode} data={data} />
              </div>

              {/* PAGE 2: MEMPELAI */}
              <div ref={coupleRef} className="border-b border-jawa-gold/10">
                <SectionGate>
                  <CouplePage isDesktopMode={isDesktopMode} data={data} />
                </SectionGate>
              </div>

              {/* PAGE 3: ACARA */}
              <div ref={eventRef} className="border-b border-jawa-gold/10">
                <SectionGate>
                  <EventPage isDesktopMode={isDesktopMode} data={data} />
                </SectionGate>
              </div>

              {/* PAGE 4: GALERI */}
              <div ref={galleryRef} className="border-b border-jawa-gold/10">
                <SectionGate>
                  <GalleryPage isDesktopMode={isDesktopMode} data={data} />
                </SectionGate>
              </div>

              {/* PAGE 5: UCAPAN & GIFT */}
              <div ref={wishesRef}>
                <SectionGate>
                  <WishesPage showToast={triggerToast} isDesktopMode={isDesktopMode} data={data} />
                </SectionGate>
              </div>

              {/* FOOTER */}
              <div className="w-full text-center pt-6 pb-6 border-t border-jawa-gold/5 bg-black z-10 relative">
                <a 
                  href="https://instagram.com/jokobim12" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-1.5 font-body text-[10px] text-jawa-gold-light/40 hover:text-jawa-gold transition-all duration-300 cursor-pointer"
                >
                  <IoLogoInstagram className="text-xs" /> Made by @jokobim12 - Instagram
                </a>
              </div>
            </div>

            {/* Bottom Symmetrical Navigation Menu */}
            <div className={`absolute bottom-0 left-0 right-0 z-40 bg-black/95 border-t border-jawa-gold/15 backdrop-blur-md px-4 py-2 ${
              isDesktopMode ? 'py-3' : ''
            }`}>
              <BottomNav 
                active={activeTab as TabId} 
                onChange={(tab) => handleNavClick(tab)} 
                musicPlaying={!isMuted}
                toggleMusic={toggleMute} 
              />
            </div>
          </div>
        </div>
      )}

      {/* Global Symmetrical Custom Toast Notification */}
      <div 
        className={`fixed left-1/2 -translate-x-1/2 z-[150] bg-jawa-black-light border-2 border-jawa-gold/50 rounded-2xl py-3.5 px-6 shadow-[0_10px_30px_rgba(212,168,71,0.25)] flex items-center justify-center gap-2.5 backdrop-blur-md w-[88%] max-w-[320px] transition-all duration-500 ease-out text-center ${
          showToast ? 'bottom-24 opacity-100 scale-100' : 'bottom-16 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <span className="font-body text-[10.5px] font-semibold text-jawa-gold tracking-wide">
          {toastMsg}
        </span>
      </div>
    </div>
  )
}
