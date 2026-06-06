import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoMenuOutline, IoCloseOutline, IoLockClosedOutline } from 'react-icons/io5'

const navLinks = [
  { to: '/', label: 'Beranda' },
  { to: '/produk', label: 'Produk' },
  { to: '/portofolio', label: 'Portofolio' },
  { to: '/tentang', label: 'Tentang Kami' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
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
            ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(180,140,40,0.12)] border-b border-gold-200/60'
            : 'bg-white/80 backdrop-blur-sm border-b border-gold-100/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm font-heading">B</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-heading text-xl font-bold tracking-widest text-amber-700">BIMORA</span>
              <span className="text-[8px] tracking-[3px] text-amber-500/80 uppercase -mt-0.5">Digital</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  location.pathname === link.to
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-200'
                    : 'text-stone-600 hover:text-amber-700 hover:bg-amber-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Admin */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/admin"
              className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-amber-700 transition-colors px-3 py-1.5 rounded-full hover:bg-amber-50 border border-transparent hover:border-amber-200"
            >
              <IoLockClosedOutline />
              <span>Admin</span>
            </Link>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Bimora%20Digital,%20saya%20ingin%20pesan%20undangan%20digital"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-semibold text-xs rounded-full shadow-md shadow-amber-200 transition-all hover:scale-105 active:scale-95"
            >
              Pesan Sekarang
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-xl text-stone-600 hover:bg-amber-50 hover:text-amber-700 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IoCloseOutline className="text-2xl" /> : <IoMenuOutline className="text-2xl" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white border-t border-amber-100 px-4 pb-4 pt-2 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  location.pathname === link.to
                    ? 'bg-amber-600 text-white'
                    : 'text-stone-600 hover:text-amber-700 hover:bg-amber-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-amber-100 mt-2 pt-3 flex flex-col gap-2">
              <Link
                to="/admin"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-stone-500 hover:bg-amber-50 hover:text-amber-700 transition-colors"
              >
                <IoLockClosedOutline />
                Portal Admin
              </Link>
              <a
                href="https://wa.me/6281234567890?text=Halo%20Bimora%20Digital,%20saya%20ingin%20pesan%20undangan%20digital"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold text-sm rounded-xl text-center shadow-md shadow-amber-100 transition-all active:scale-95"
              >
                Pesan Sekarang via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[65px] sm:h-[73px]" />
    </>
  )
}
