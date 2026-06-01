import { Link } from 'react-router-dom'
import { IoArrowForwardOutline, IoCheckmarkCircleOutline, IoLogoWhatsapp, IoSparklesOutline, IoColorPaletteOutline, IoLockOpenOutline } from 'react-icons/io5'

export default function LandingPage() {
  const templates = [
    {
      id: 'jawa-premium',
      name: 'Adat Jawa Premium',
      desc: 'Desain luhur dengan ornamen gunungan, wayang kulit, latar belakang gelap nan megah, serta iringan gending Jawa klasik.',
      img: '/assets/wayang-frame.png',
      slug: 'bimantara-clara',
      price: 'Rp 149.000',
    },
    {
      id: 'modern-emerald',
      name: 'Modern Emerald Gold (Coming Soon)',
      desc: 'Aura minimalis modern dipadukan dengan aksen warna hijau emerald mewah dan font sans-serif serif kontemporer.',
      img: '',
      slug: 'demo-emerald',
      price: 'Rp 129.000',
      disabled: true,
    }
  ]

  const packages = [
    {
      name: 'Paket Prasaja (Basic)',
      price: 'Rp 99.000',
      features: [
        'Masa Aktif 3 Bulan',
        'Bebas Kustomisasi Nama Tamu',
        'Galeri Maksimal 5 Foto',
        'Musik Latar Standar',
        'Navigasi Peta Lokasi',
        'Form RSVP & Ucapan',
      ],
      recommended: false,
    },
    {
      name: 'Paket Agung (Premium)',
      price: 'Rp 149.000',
      features: [
        'Masa Aktif 1 Tahun',
        'Bebas Kustomisasi Nama Tamu',
        'Galeri Maksimal 15 Foto',
        'Kustom Musik Latar (MP3)',
        'Navigasi Peta Lokasi',
        'Form RSVP & Ucapan',
        'Fitur Love Story & Kado Digital',
        'Prioritas CS Fast Response',
      ],
      recommended: true,
    },
    {
      name: 'Paket Ksatria (Exclusive)',
      price: 'Rp 249.000',
      features: [
        'Masa Aktif Selamanya',
        'Subdomain Custom (nama.bimora.com)',
        'Galeri Foto Tanpa Batas',
        'Kustom Musik & Background Video',
        'Fitur RSVP Terintegrasi WA Admin',
        'Fitur Kisah Cinta / Love Story',
        'Kado Digital & Angpao QR Code',
        'Revisi Data Klien Selamanya',
      ],
      recommended: false,
    }
  ]

  return (
    <div className="bg-black text-jawa-cream min-h-screen flex flex-col font-body">
      
      {/* HEADER / NAVIGATION */}
      <header className="border-b border-jawa-gold/15 bg-black/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/assets/gunungan.png" alt="Bimora Logo" className="w-8 h-auto blend-screen filter brightness-110" />
            <span className="font-heading text-2xl font-bold tracking-widest text-jawa-gold">BIMORA</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider">
            <a href="#fitur" className="text-jawa-cream/70 hover:text-jawa-gold transition-colors">Fitur</a>
            <a href="#katalog" className="text-jawa-cream/70 hover:text-jawa-gold transition-colors">Katalog</a>
            <a href="#harga" className="text-jawa-cream/70 hover:text-jawa-gold transition-colors">Harga</a>
            <Link to="/admin" className="text-jawa-gold/70 hover:text-jawa-gold border border-jawa-gold/25 px-4 py-1.5 rounded-full hover:bg-jawa-gold/10 transition-all flex items-center gap-1.5">
              <IoLockOpenOutline /> Portal Admin
            </Link>
          </nav>

          <Link to="/admin" className="md:hidden text-jawa-gold border border-jawa-gold/30 p-2 rounded-full">
            <IoLockOpenOutline className="text-sm" />
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative py-20 lg:py-28 overflow-hidden border-b border-jawa-gold/10 flex items-center justify-center">
        {/* Soft background light */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,168,71,0.06)_0%,transparent_75%)] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-jawa-gold/10 border border-jawa-gold/20 text-jawa-gold-light text-[10px] tracking-wider uppercase mb-6 animate-pulse">
            <IoSparklesOutline className="text-xs" /> Platform Undangan Digital Premium &amp; Agung
          </div>
          
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-jawa-cream leading-tight max-w-4xl tracking-wide">
            Abadikan Momen Sakral dengan <span className="font-script text-jawa-gold text-5xl sm:text-6xl md:text-7xl block sm:inline mt-2 sm:mt-0">Undangan Elegan</span>
          </h1>
          
          <p className="font-body text-xs sm:text-sm text-jawa-cream/60 leading-relaxed max-w-2xl mt-6">
            Bimora menghadirkan kemewahan tradisi Nusantara dipadukan dengan kepraktisan teknologi modern. Buat undangan pernikahan agung Anda sendiri hanya dalam hitungan menit.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <a href="#katalog" className="px-8 py-4 bg-jawa-gold hover:bg-jawa-gold-dark text-black font-body text-xs font-bold tracking-widest uppercase rounded-full shadow-lg hover:scale-105 active:scale-98 transition-all flex items-center gap-2 cursor-pointer">
              Lihat Katalog Demo <IoArrowForwardOutline className="text-sm" />
            </a>
            <Link to="/admin" className="px-8 py-4 bg-stone-950 hover:bg-stone-900 border border-jawa-gold/30 hover:border-jawa-gold text-jawa-gold font-body text-xs font-bold tracking-widest uppercase rounded-full hover:scale-105 active:scale-98 transition-all flex items-center gap-2">
              Uji Coba Dashboard Admin <IoLockOpenOutline className="text-sm" />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="fitur" className="py-20 bg-jawa-black-card/30 border-b border-jawa-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="font-body text-[10px] tracking-[4px] uppercase text-jawa-gold-light/80">Kelebihan Kami</p>
            <h2 className="font-heading text-3xl text-jawa-gold tracking-wide mt-2">Mengapa Memilih Bimora?</h2>
            <div className="gold-divider my-4">
              <span className="line" /><span className="diamond" /><span className="line" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/40 border border-jawa-gold/10 p-8 rounded-2xl shadow-md hover:border-jawa-gold/30 transition-all group">
              <div className="w-12 h-12 bg-jawa-gold/10 text-jawa-gold rounded-full flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
                <IoColorPaletteOutline />
              </div>
              <h3 className="font-heading text-lg text-jawa-gold-light mb-3">Desain Tradisi Premium</h3>
              <p className="font-body text-xs text-jawa-cream/60 leading-relaxed">
                Kami merancang detail ornamen budaya Nusantara (seperti Gunungan wayang kulit jawa) dengan estetika premium yang memukau mata tamu undangan Anda.
              </p>
            </div>

            <div className="bg-black/40 border border-jawa-gold/10 p-8 rounded-2xl shadow-md hover:border-jawa-gold/30 transition-all group">
              <div className="w-12 h-12 bg-jawa-gold/10 text-jawa-gold rounded-full flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
                <IoSparklesOutline />
              </div>
              <h3 className="font-heading text-lg text-jawa-gold-light mb-3">Animasi Halus &amp; Interaktif</h3>
              <p className="font-body text-xs text-jawa-cream/60 leading-relaxed">
                Menggunakan efek gerbang gunungan yang membuka secara megah saat halaman di-scroll, menciptakan impresi elegan dan berkelas.
              </p>
            </div>

            <div className="bg-black/40 border border-jawa-gold/10 p-8 rounded-2xl shadow-md hover:border-jawa-gold/30 transition-all group">
              <div className="w-12 h-12 bg-jawa-gold/10 text-jawa-gold rounded-full flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
                <IoCheckmarkCircleOutline />
              </div>
              <h3 className="font-heading text-lg text-jawa-gold-light mb-3">Kelola Instan Lewat Admin</h3>
              <p className="font-body text-xs text-jawa-cream/60 leading-relaxed">
                Revisi nama pengantin, tanggal akad, nomor rekening kado, atau lagu pengiring secara instan via dashboard admin visual tanpa perlu me-rebuild kode.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG SECTION */}
      <section id="katalog" className="py-20 border-b border-jawa-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="font-body text-[10px] tracking-[4px] uppercase text-jawa-gold-light/80">Pilihan Karya</p>
            <h2 className="font-heading text-3xl text-jawa-gold tracking-wide mt-2">Katalog Desain Template</h2>
            <div className="gold-divider my-4">
              <span className="line" /><span className="diamond" /><span className="line" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {templates.map(tpl => (
              <div key={tpl.id} className="bg-jawa-black-card/30 border border-jawa-gold/15 rounded-2xl overflow-hidden shadow-xl hover:border-jawa-gold/40 hover:scale-[1.01] transition-all flex flex-col justify-between">
                <div>
                  <div className="h-56 bg-stone-900 flex items-center justify-center relative overflow-hidden border-b border-jawa-gold/10">
                    {tpl.img ? (
                      <img src={tpl.img} alt={tpl.name} className="w-40 h-auto opacity-70 blend-screen" />
                    ) : (
                      <div className="text-jawa-gold/20 flex flex-col items-center gap-2">
                        <IoColorPaletteOutline className="text-4xl" />
                        <span className="text-[10px] tracking-widest uppercase">Coming Soon</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-heading text-xl text-jawa-gold">{tpl.name}</h3>
                    <p className="font-body text-xs text-jawa-cream/60 leading-relaxed mt-2.5">
                      {tpl.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 border-t border-jawa-gold/10 flex justify-between items-center">
                  <span className="font-heading text-lg font-semibold text-jawa-cream">{tpl.price}</span>
                  {tpl.disabled ? (
                    <span className="px-4 py-2 bg-stone-900 border border-stone-800 text-stone-600 font-body text-[9px] tracking-wider uppercase rounded-full cursor-not-allowed">
                      Segera Hadir
                    </span>
                  ) : (
                    <Link 
                      to={`/undangan/${tpl.slug}`}
                      className="px-4 py-2 bg-jawa-gold hover:bg-jawa-gold-dark text-black font-body text-[9px] tracking-wider uppercase font-bold rounded-full transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      Lihat Demo
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="harga" className="py-20 bg-jawa-black-card/20 border-b border-jawa-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="font-body text-[10px] tracking-[4px] uppercase text-jawa-gold-light/80">Rencana Investasi</p>
            <h2 className="font-heading text-3xl text-jawa-gold tracking-wide mt-2">Daftar Paket Harga</h2>
            <div className="gold-divider my-4">
              <span className="line" /><span className="diamond" /><span className="line" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <div 
                key={i} 
                className={`bg-black/50 border rounded-3xl p-8 flex flex-col justify-between shadow-lg relative ${
                  pkg.recommended ? 'border-jawa-gold border-2 scale-[1.03] shadow-gold-glow' : 'border-jawa-gold/15'
                }`}
              >
                {pkg.recommended && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-jawa-gold text-black font-body text-[9px] tracking-widest uppercase font-bold px-4 py-1 rounded-full">
                    Paling Populer
                  </span>
                )}

                <div>
                  <h3 className="font-heading text-xl text-jawa-gold">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1.5 my-5">
                    <span className="font-heading text-3xl font-semibold text-jawa-cream">{pkg.price}</span>
                    <span className="font-body text-[10px] text-jawa-cream/45 uppercase tracking-wider">/ Paket</span>
                  </div>
                  
                  <div className="w-full h-[1px] bg-jawa-gold/10 my-6" />

                  <ul className="flex flex-col gap-3">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-jawa-cream/70 font-body">
                        <IoCheckmarkCircleOutline className="text-jawa-gold text-base flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10">
                  <a 
                    href="https://wa.me/6281234567890?text=Halo%20Bimora%20Digital,%20saya%20tertarik%20pesan%20Undangan%20Pernikahan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3.5 rounded-xl font-body text-[10px] tracking-widest uppercase font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      pkg.recommended 
                        ? 'bg-jawa-gold hover:bg-jawa-gold-dark text-black' 
                        : 'bg-stone-950 hover:bg-stone-900 border border-jawa-gold/30 hover:border-jawa-gold text-jawa-gold'
                    }`}
                  >
                    <IoLogoWhatsapp className="text-sm" /> Pesan Sekarang
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-black border-t border-jawa-gold/15 py-12 px-6 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <img src="/assets/gunungan.png" alt="Bimora Logo" className="w-7 h-auto blend-screen" />
            <span className="font-heading text-xl font-bold tracking-widest text-jawa-gold">BIMORA</span>
          </div>

          <p className="font-body text-[10px] text-jawa-cream/40">
            © {new Date().getFullYear()} Bimora Digital. All Rights Reserved. Made by <a href="https://instagram.com/jokobim12" target="_blank" rel="noopener noreferrer" className="text-jawa-gold hover:underline">@jokobim12</a>
          </p>
        </div>
      </footer>

    </div>
  )
}
