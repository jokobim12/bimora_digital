import { useState, useEffect, useRef, useMemo } from 'react'
import { IoVolumeMuteOutline, IoPhonePortraitOutline, IoDesktopOutline, IoLogoInstagram, IoCloseOutline } from 'react-icons/io5'
import Cover from './Cover'
import BottomNav from './BottomNav'
import type { TabId } from './BottomNav'
import HomePage from './HomePage'
import CouplePage from './CouplePage'
import EventPage from './EventPage'
import GalleryPage from './GalleryPage'
import WishesPage from './WishesPage'
import SectionGate from './SectionGate'
import type { WeddingData } from '../../../../utils/dummyData'

interface InvitationTemplateProps {
  data: WeddingData
}

export default function InvitationTemplate({ data }: InvitationTemplateProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [closingCover, setClosingCover] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const [guestName, setGuestName] = useState('')
  const [isDesktopMode, setIsDesktopMode] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [lightbox, setLightbox] = useState<string | null>(null)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const youtubePlayerRef = useRef<HTMLIFrameElement | null>(null)
  const appContainerRef = useRef<HTMLDivElement | null>(null)

  const youtubeId = useMemo(() => {
    const url = data.music_url
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }, [data.music_url])

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

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
      if (window.innerWidth < 1024) {
        setIsDesktopMode(false)
      }
    }
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  // Dynamic theme-color meta tag
  useEffect(() => {
    let meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'theme-color')
      document.head.appendChild(meta)
    }
    const originalColor = meta.getAttribute('content')
    meta.setAttribute('content', '#FAF6EC')
    return () => {
      if (originalColor) {
        meta.setAttribute('content', originalColor)
      }
    }
  }, [])

  // Helper: send command to YouTube IFrame API with correct origin & format
  const sendYT = (func: string) => {
    youtubePlayerRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args: '' }),
      'https://www.youtube.com'
    )
  }

  // Play audio when cover is opened
  const handleOpenInvitation = () => {
    const docEl = document.documentElement
    try {
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen().catch(err => {
          console.warn('Failed to enter fullscreen mode:', err)
        })
      } else if ((docEl as any).webkitRequestFullscreen) {
        (docEl as any).webkitRequestFullscreen()
      } else if ((docEl as any).msRequestFullscreen) {
        (docEl as any).msRequestFullscreen()
      }
    } catch (e) {
      console.warn('Fullscreen API is not supported on this browser/device.', e)
    }

    setClosingCover(true)
    setTimeout(() => {
      setIsOpen(true)
      if (youtubeId) {
        const tryPlay = (attempt = 0) => {
          sendYT('playVideo')
          if (attempt < 5) setTimeout(() => tryPlay(attempt + 1), 800)
        }
        tryPlay()
      } else if (audioRef.current) {
        audioRef.current.play().catch(err => {
          console.log('Audio autoplay prevented by browser.', err)
        })
      }
    }, 800)
  }

  // Toggle Mute/Pause Audio
  const toggleMute = () => {
    if (youtubeId) {
      if (isMuted) {
        sendYT('unMute')
        sendYT('playVideo')
      } else {
        sendYT('mute')
        sendYT('pauseVideo')
      }
      setIsMuted(prev => !prev)
    } else {
      // For HTML audio: just flip state — useEffect handles play/pause
      setIsMuted(prev => !prev)
    }
  }

  // Imperatively drive HTML audio play/pause whenever isMuted changes.
  // This avoids the React quirk where re-renders can clobber imperative DOM
  // mutations (e.g. audio.muted = false) before play() gets a chance to fire.
  useEffect(() => {
    if (youtubeId || !audioRef.current) return
    const audio = audioRef.current
    if (isMuted) {
      audio.pause()
    } else if (isOpen) {
      audio.play().catch(() => {})
    }
  }, [isMuted, isOpen, youtubeId])

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
          else if (entry.target.id === 'gift-section') setActiveTab('gift')
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    if (homeRef.current) observer.observe(homeRef.current)
    if (coupleRef.current) observer.observe(coupleRef.current)
    if (eventRef.current) observer.observe(eventRef.current)
    if (galleryRef.current) observer.observe(galleryRef.current)
    if (wishesRef.current) observer.observe(wishesRef.current)
    const giftSection = appContainerRef.current?.querySelector('#gift-section')
    if (giftSection) observer.observe(giftSection)

    return () => {
      observer.disconnect()
    }
  }, [isOpen])

  // Intersection Observer for scroll-reveal elements
  useEffect(() => {
    if (!isOpen) return

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

    if (tabId === 'gift') {
      const giftEl = appContainerRef.current?.querySelector('#gift-section')
      if (giftEl) {
        giftEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setActiveTab('gift')
      } else {
        wishesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setActiveTab('gift')
      }
      return
    }

    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveTab(tabId)
    }
  }

  if (isLoading) {
    return (
      <div className="theme-jawa fixed inset-0 z-[150] bg-[#FAF6EC] flex flex-col items-center justify-center text-[#4A3B32] p-6">
        <div className="flex flex-col items-center max-w-sm text-center">
          <img 
            src="/assets/gunungan.png" 
            alt="Gunungan" 
            className="w-16 h-auto mb-6 opacity-85 filter drop-shadow-[0_0_12px_rgba(179,133,32,0.3)] animate-pulse" 
          />
          <p className="font-body text-[9px] tracking-[4px] uppercase text-[#6B5A43]/60 mb-2">
            Serat Ulem
          </p>
          <h2 className="font-script text-xl text-[#A17A24] tracking-wide">
            {data.groom_nickname} &amp; {data.bride_nickname}
          </h2>
          
          <div className="w-32 h-[1.5px] bg-stone-200 mt-6 relative overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-[#B38520] animate-loading-bar" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="theme-jawa min-h-screen bg-[#FAF6EC] text-[#4A3B32] relative font-body selection:bg-[#B38520]/25 selection:text-[#332211]">
      
      {/* Audio player element */}
      {youtubeId ? (
        <iframe
          ref={youtubePlayerRef}
          src={`https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&autoplay=0&loop=1&playlist=${youtubeId}&controls=0&origin=${encodeURIComponent(window.location.origin)}`}
          className="w-0 h-0 absolute pointer-events-none opacity-0"
          allow="autoplay"
        />
      ) : (
        <audio 
          ref={audioRef} 
          src={data.music_url || '/music/jawa.mp3'} 
          loop
        />
      )}

      {/* Cover / Welcome Screen */}
      {!isOpen && (
        <Cover 
          guestName={guestName} 
          onOpen={handleOpenInvitation} 
          closing={closingCover} 
          data={data}
        />
      )}

      {/* BACKGROUND DECORATIVE WATERMARKS */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <img 
          src="/assets/gunungan.png" 
          alt="" 
          className="w-[100vh] h-auto object-contain opacity-[0.06] select-none animate-watermark" 
        />
      </div>

      {/* SIDE FLOATING GUNUNGAN DECORATIONS */}
      {isOpen && (
        <div className="hidden lg:block">
          {/* Left Side Floating Gunungan */}
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
              className={`w-full h-auto object-contain opacity-35 filter drop-shadow-[0_0_15px_rgba(179,133,32,0.2)] transition-transform duration-500 ease-in-out ${
                isDesktopMode ? 'rotate-[-10deg]' : 'rotate-[-20deg]'
              }`}
            />
          </div>
          
          {/* Right Side Floating Gunungan */}
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
              className={`w-full h-auto object-contain opacity-35 filter drop-shadow-[0_0_15px_rgba(179,133,32,0.2)] transition-transform duration-500 ease-in-out ${
                isDesktopMode ? 'rotate-[10deg]' : 'rotate-[20deg]'
              }`}
            />
          </div>
        </div>
      )}

      {isOpen && (
        <div className="min-h-[100dvh] h-[100dvh] md:h-auto bg-transparent text-[#4A3B32] flex flex-col items-center justify-center relative overflow-hidden z-10">
          
          {/* Header Controls */}
          <div className="fixed top-4 left-4 right-4 z-40 flex justify-between items-center pointer-events-none">
            <button
              onClick={() => setIsDesktopMode(prev => !prev)}
              className="hidden md:flex items-center gap-2 bg-[#FAF6EC]/90 hover:bg-[#FAF6EC] border border-[#B38520]/30 hover:border-[#B38520] text-[#B38520] text-xs font-semibold px-4 py-2 rounded-full pointer-events-auto backdrop-blur-md transition-all active:scale-95 shadow-md"
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
                ? 'max-w-6xl rounded-lg border border-[#B38520]/25 h-[calc(100vh-32px)] my-4'
                : 'max-w-[440px] h-[100dvh] md:h-[89vh] md:max-h-[810px] md:my-auto md:rounded-lg md:border-2 md:border-[#B38520]/45'
            } bg-[#FAF6EC] flex flex-col relative overflow-hidden shadow-lg`}
          >
            {/* Pulsing Gunungan Watermark inside the frame background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
              <img 
                src="/assets/gunungan.png" 
                alt="" 
                className="w-[85%] max-w-[500px] h-auto object-contain opacity-[0.06] select-none animate-watermark" 
              />
            </div>

            {/* Floating Music Equalizer Button */}
            <button 
              onClick={toggleMute}
              className="fixed right-6 bottom-24 lg:bottom-8 bg-[#FAF6EC] border border-[#B38520]/25 hover:border-[#B38520] text-[#B38520] rounded-full p-3.5 shadow-md active:scale-95 transition-all duration-300 z-50 cursor-pointer"
              aria-label="Toggle Music"
            >
              {isMuted ? (
                <IoVolumeMuteOutline className="text-xl" />
              ) : (
                <div className="flex items-end justify-center gap-[3px] w-5 h-5 px-[1px] py-[2px]">
                  <span className="w-[3px] bg-[#B38520] rounded-full music-bar-1" />
                  <span className="w-[3px] bg-[#B38520] rounded-full music-bar-2" />
                  <span className="w-[3px] bg-[#B38520] rounded-full music-bar-3" />
                  <span className="w-[3px] bg-[#B38520] rounded-full music-bar-4" />
                </div>
              )}
            </button>

            {/* Inner Scrollable area */}
            <div
              ref={appContainerRef}
              className="w-full overflow-y-auto overflow-x-hidden no-scrollbar flex-grow pb-[70px] h-full relative z-10"
              style={{ overscrollBehaviorY: 'contain' }}
            >
              {/* PAGE 1: HOME */}
              <div ref={homeRef} className="border-b border-[#B38520]/15">
                <HomePage isDesktopMode={isDesktopMode} data={data} />
              </div>

              {/* PAGE 2: MEMPELAI */}
              <div ref={coupleRef} className="border-b border-[#B38520]/15">
                <SectionGate>
                  <CouplePage isDesktopMode={isDesktopMode} data={data} />
                </SectionGate>
              </div>

              {/* PAGE 3: ACARA */}
              <div ref={eventRef} className="border-b border-[#B38520]/15">
                <SectionGate>
                  <EventPage isDesktopMode={isDesktopMode} data={data} />
                </SectionGate>
              </div>

              {/* PAGE 4: GALERI */}
              <div ref={galleryRef} className="border-b border-[#B38520]/15">
                <SectionGate>
                  <GalleryPage isDesktopMode={isDesktopMode} data={data} onImageClick={setLightbox} />
                </SectionGate>
              </div>

              {/* PAGE 5: UCAPAN & GIFT */}
              <div ref={wishesRef}>
                <SectionGate>
                  <WishesPage showToast={triggerToast} isDesktopMode={isDesktopMode} data={data} />
                </SectionGate>
              </div>

              {/* FOOTER */}
              <div className="w-full text-center pt-6 pb-6 border-t border-[#B38520]/15 bg-[#FAF6EC] z-10 relative">
                <a 
                  href="https://instagram.com/jokobim12" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-1.5 font-body text-[10px] text-[#6B5A43]/50 hover:text-[#B38520] transition-all duration-300 cursor-pointer"
                >
                  <IoLogoInstagram className="text-xs" /> Made by @jokobim12 - Instagram
                </a>
              </div>
            </div>

            {/* Bottom Symmetrical Navigation Menu */}
            <div className={`absolute bottom-0 left-0 right-0 z-40 bg-[#FAF6EC]/95 border-t border-[#B38520]/20 backdrop-blur-md px-4 py-2 ${
              isDesktopMode ? 'py-3' : ''
            }`}>
              <BottomNav 
                active={activeTab as TabId} 
                onChange={(tab) => handleNavClick(tab)} 
                musicPlaying={!isMuted}
                toggleMusic={toggleMute} 
              />
            </div>

            {/* Lightbox Popup (Rendered inside main container to stay within simulated screen constraints) */}
            <div 
              className={`absolute inset-0 z-[90] bg-black/95 flex items-center justify-center transition-all duration-300 ${
                lightbox ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
              onClick={() => setLightbox(null)}
            >
              <button 
                className="absolute top-6 right-6 text-3xl text-[#FAF6EC]/70 hover:text-[#FAF6EC] hover:scale-110 transition-all cursor-pointer z-[100]"
                aria-label="Tutup galeri"
              >
                <IoCloseOutline />
              </button>
              {lightbox && (
                <img 
                  className="max-w-[90%] max-h-[80vh] object-contain rounded-xl border border-[#B38520]/30 shadow-2xl animate-[zoomIn_0.3s_ease]" 
                  src={lightbox} 
                  alt="Gallery Fullscreen" 
                  onClick={e => e.stopPropagation()} 
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Symmetrical Custom Toast Notification */}
      <div 
        className={`fixed left-1/2 -translate-x-1/2 z-[150] bg-white border-2 border-[#B38520] rounded-2xl py-3.5 px-6 shadow-[0_10px_30px_rgba(179,133,32,0.15)] flex items-center justify-center gap-2.5 backdrop-blur-md w-[88%] max-w-[320px] transition-all duration-500 ease-out text-center ${
          showToast ? 'bottom-24 opacity-100 scale-100' : 'bottom-16 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <span className="font-body text-[10.5px] font-semibold text-[#A17A24] tracking-wide">
          {toastMsg}
        </span>
      </div>
    </div>
  )
}
