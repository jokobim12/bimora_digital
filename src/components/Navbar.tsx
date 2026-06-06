import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoMenuOutline, IoCloseOutline, IoLogoWhatsapp } from 'react-icons/io5'

const navLinks = [
  { to: '/', label: 'Beranda' },
  { to: '/produk', label: 'Produk' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-stone-200/50 shadow-[0_2px_15px_rgba(0,0,0,0.02)] py-2 sm:py-3'
            : 'bg-white/60 backdrop-blur-sm border-b border-stone-100 py-3 sm:py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-500 flex items-center justify-center shadow-md shadow-emerald-600/10 group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-sm font-heading tracking-wider">B</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading text-lg font-black tracking-widest text-stone-850">
                BIMORA
              </span>
              <span className="text-[7px] tracking-[4px] text-emerald-600 font-bold uppercase mt-1">
                Digital
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => {
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative py-1.5 text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-200 ${
                    isActive ? 'text-emerald-700' : 'text-stone-600 hover:text-emerald-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1 right-1 h-[2px] bg-emerald-600 rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <a
              href="https://wa.me/6281234567890?text=Halo%20Bimora%20Digital,%20saya%20ingin%20pesan%20undangan%20digital"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold text-xs rounded-full transition-all duration-300 shadow-sm hover:shadow shadow-emerald-600/10 active:scale-98 cursor-pointer"
            >
              Hubungi Kami
            </a>
          </div>

          {/* Mobile hamburger - modern circular button */}
          <button
            className="md:hidden w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:text-emerald-600 hover:border-emerald-600/30 transition-all duration-300 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <IoCloseOutline className="text-xl" /> : <IoMenuOutline className="text-xl" />}
          </button>
        </div>

        {/* Mobile menu - Dropdown Panel with transition */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="bg-white border-t border-stone-100 px-6 py-5 flex flex-col gap-3.5 shadow-inner">
            {navLinks.map(link => {
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive ? 'text-emerald-600 border-l-2 border-emerald-600 pl-3' : 'text-stone-600 pl-3 hover:text-emerald-600'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="border-t border-stone-100 pt-4 mt-2">
              <a
                href="https://wa.me/6281234567890?text=Halo%20Bimora%20Digital,%20saya%20ingin%20pesan%20undangan%20digital"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold text-xs rounded-xl text-center flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <IoLogoWhatsapp className="text-base" /> Pesan via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[60px] sm:h-[70px]" />
    </>
  )
}
