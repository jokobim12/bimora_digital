import { Link } from 'react-router-dom'
import { IoLogoInstagram, IoLogoWhatsapp } from 'react-icons/io5'

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm font-heading">B</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-heading text-xl font-bold tracking-widest text-amber-400">BIMORA</span>
                <span className="text-[8px] tracking-[3px] text-amber-500/60 uppercase -mt-0.5">Digital</span>
              </div>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mb-5">
              Platform undangan digital pernikahan premium dengan desain tradisi Nusantara yang elegan dan modern.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/jokobim12"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-amber-500 text-stone-400 hover:text-white flex items-center justify-center transition-all"
              >
                <IoLogoInstagram className="text-base" />
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-green-500 text-stone-400 hover:text-white flex items-center justify-center transition-all"
              >
                <IoLogoWhatsapp className="text-base" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-amber-400 text-sm mb-4 uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Beranda' },
                { to: '/produk', label: 'Produk' },
                { to: '/portofolio', label: 'Portofolio' },
                { to: '/tentang', label: 'Tentang Kami' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-stone-400 hover:text-amber-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-amber-400 text-sm mb-4 uppercase tracking-wider">Produk</h4>
            <ul className="space-y-2.5">
              {['Template Adat Jawa', 'Template Modern Minimalis', 'Template Islami', 'Template Sunda', 'Paket Bundling'].map(item => (
                <li key={item}>
                  <Link to="/produk" className="text-stone-400 hover:text-amber-400 text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-amber-400 text-sm mb-4 uppercase tracking-wider">Kontak</h4>
            <ul className="space-y-3">
              <li className="text-stone-400 text-sm">
                <span className="block text-[10px] text-stone-500 uppercase tracking-wider mb-1">WhatsApp CS</span>
                <a href="https://wa.me/6281234567890" className="hover:text-amber-400 transition-colors">+62 812-3456-7890</a>
              </li>
              <li className="text-stone-400 text-sm">
                <span className="block text-[10px] text-stone-500 uppercase tracking-wider mb-1">Instagram</span>
                <a href="https://instagram.com/jokobim12" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">@jokobim12</a>
              </li>
              <li className="text-stone-400 text-sm">
                <span className="block text-[10px] text-stone-500 uppercase tracking-wider mb-1">Jam Layanan</span>
                Senin – Sabtu, 08:00 – 21:00 WIB
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-stone-500 text-xs">
          <p>© {new Date().getFullYear()} Bimora Digital. Hak Cipta Dilindungi.</p>
          <p>Dibuat dengan ❤️ oleh <a href="https://instagram.com/jokobim12" className="text-amber-400 hover:underline">@jokobim12</a></p>
        </div>
      </div>
    </footer>
  )
}
