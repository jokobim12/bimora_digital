import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  IoArrowForwardOutline,
  IoLogoWhatsapp,
  IoSparkles,
  IoPhonePortraitOutline,
  IoTimeOutline,
  IoHeartOutline,
  IoCheckmarkCircle,
  IoEyeOutline
} from 'react-icons/io5'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { type ProductData, getLocalAppSettings } from '../utils/dummyData'
import { supabase } from '../utils/supabaseClient'

const features = [
  {
    icon: <IoPhonePortraitOutline />,
    title: 'Tampilan Android & iOS Responsif',
    desc: 'Undangan digital dirancang responsif sempurna di layar smartphone Anda, dengan loading super cepat.',
  },
  {
    icon: <IoSparkles />,
    title: 'Animasi & Ornamen Tradisional',
    desc: 'Sentuhan ornamen Nusantara (Jawa, Sunda, Modern) dihadirkan dengan detail ornamen yang anggun dan berkelas.',
  },
  {
    icon: <IoTimeOutline />,
    title: 'Pengerjaan Cepat 1x24 Jam',
    desc: 'Kirim berkas data pernikahan Anda, dan draf undangan Anda siap dalam waktu 24 jam saja.',
  },
  {
    icon: <IoHeartOutline />,
    title: 'Fitur Interaktif & Modern',
    desc: 'Dilengkapi dengan buku tamu, RSVP online, peta lokasi presisi, kisah cinta, musik latar, dan kado digital.',
  },
]

const steps = [
  { num: '1', title: 'Pilih Desain', desc: 'Pilih template favorit Anda dari daftar katalog di bawah ini.' },
  { num: '2', title: 'Isi Data via WA', desc: 'Konsultasi dan kirim data pernikahan ke admin via WhatsApp.' },
  { num: '3', title: 'Tinjau & Revisi', desc: 'Draf dikerjakan 1x24 jam. Anda dapat meminta revisi sepuasnya secara gratis.' },
  { num: '4', title: 'Siap Disebar!', desc: 'Link undangan aktif setelah pembayaran, siap dibagikan ke kerabat.' },
]

export default function BerandaPage() {
  const [products, setProducts] = useState<ProductData[]>([])
  const [loading, setLoading] = useState(true)
  const settings = getLocalAppSettings()

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: true })
          .limit(4)

        if (error) {
          console.error('Error fetching homepage products:', error.message)
        } else if (data) {
          const mapped: ProductData[] = data.map((p: any) => ({
            id: p.id,
            name: p.name,
            category: p.category,
            price: p.price,
            originalPrice: p.original_price,
            rating: Number(p.rating),
            reviews: p.reviews,
            badge: p.badge,
            desc: p.desc,
            features: p.features,
            previewSlug: p.preview_slug,
            available: p.available,
            color: p.color,
            thumbnail: p.thumbnail
          }))
          setProducts(mapped)
        }
      } catch (err) {
        console.error('Failed to load products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const waMessage = (name: string) =>
    encodeURIComponent(`Halo Bimora Digital! Saya tertarik untuk memesan template undangan digital *${name}*. Boleh konsultasi lebih lanjut?`)

  return (
    <div className="bg-[#FAF9F6] text-stone-850 font-body min-h-screen selection:bg-emerald-100 selection:text-[#0F3A26]">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="bg-white border-b border-stone-200 pt-8 pb-12 sm:pt-16 sm:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex flex-col items-center">
            {/* Tagline */}
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-[#0F3A26] text-[10px] font-bold tracking-[2px] uppercase px-3 py-1 rounded-md mb-6">
              <IoSparkles /> Bimora Digital
            </div>
            
            {/* Title & Desc */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F3A26] tracking-tight leading-tight mb-4 max-w-2xl">
              Undangan Pernikahan Digital Premium & Cepat
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-8 font-medium">
              Desain modern berkelas Nusantara, dioptimalkan sepenuhnya untuk tampilan mobile Android & iOS. Pembuatan mudah, revisi gratis sepuasnya, selesai dalam 24 jam.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href="#katalog-produk"
                className="px-6 py-3 bg-[#0F3A26] hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                Lihat Pilihan Desain <IoArrowForwardOutline />
              </a>
              <Link
                to="/cara-order"
                className="px-6 py-3 bg-white hover:bg-emerald-50 border border-stone-300 text-stone-700 font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Cara Pemesanan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DIRECT PRODUCTS LISTING (KATALOG UTAMA) ===== */}
      <section id="katalog-produk" className="py-16 bg-[#FAF9F6] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 bg-emerald-50 text-[#0F3A26] text-[9px] tracking-[3px] uppercase font-bold rounded-full mb-3">
              KATALOG TERPOPULER
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F3A26]">
              Pilih Desain Undangan Anda
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-2 font-medium max-w-md mx-auto">
              Temukan desain terbaik untuk hari bahagia Anda. Klik produk untuk melihat info detail dan live demo.
            </p>
          </div>

          {/* Grid Layout */}
          {loading ? (
            <div className="flex items-center justify-center py-20 w-full col-span-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F3A26]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {products.map(product => {
                const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                return (
                  <div
                    key={product.id}
                    className="bg-white border border-stone-200 rounded-lg overflow-hidden flex flex-col hover:border-[#0F3A26] transition-all shadow-sm group"
                  >
                  {/* Thumbnail Image */}
                  <div className="relative aspect-[16/10] w-full bg-stone-900 overflow-hidden border-b border-stone-100">
                    {product.thumbnail ? (
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#0F3A26] flex items-center justify-center p-4">
                        <span className="text-white text-xs font-bold text-center">{product.name}</span>
                      </div>
                    )}
                    {/* Category Pill Tag */}
                    <span className="absolute top-3 left-3 px-2 py-0.5 bg-white text-[#0F3A26] border border-stone-200 text-[9px] font-bold rounded uppercase tracking-wider">
                      {product.category}
                    </span>
                    {/* Diskon tag */}
                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-red-100 text-red-700 text-[9px] font-bold rounded">
                      -{discountPercent}%
                    </span>
                  </div>

                  {/* Card details */}
                  <div className="p-4 flex flex-col flex-grow">
                    {/* Title */}
                    <h3 className="text-sm sm:text-base font-bold text-stone-900 leading-snug mb-2 min-h-[40px]">
                      {product.name}
                    </h3>

                    {/* Features checklist snippet */}
                    <div className="space-y-1 mb-4 flex-grow">
                      {product.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[10px] text-stone-550">
                          <IoCheckmarkCircle className="text-emerald-700 text-xs shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Pricing row */}
                    <div className="border-t border-stone-100 pt-3 flex justify-between items-end mb-3.5">
                      <div>
                        <span className="text-[8px] text-stone-400 uppercase tracking-wider block font-bold">Harga Promo</span>
                        <span className="font-bold text-[#0F3A26] text-xs sm:text-sm">Rp {product.price.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-stone-400 line-through">Rp {product.originalPrice.toLocaleString('id-ID')}</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to={`/produk/${product.id}`}
                        className="py-2 border border-stone-200 text-[#0F3A26] hover:bg-emerald-50 text-[10px] font-bold rounded-md transition-all text-center flex items-center justify-center gap-1"
                      >
                        <IoEyeOutline /> Detail Info
                      </Link>
                      <a
                        href={`https://wa.me/${settings.waNumber}?text=${waMessage(product.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 bg-[#0F3A26] hover:bg-emerald-800 text-white text-[10px] font-bold rounded-md transition-all text-center flex items-center justify-center gap-1"
                      >
                        <IoLogoWhatsapp /> Pesan
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          )}

          <div className="text-center mt-10">
            <Link
              to="/produk"
              className="inline-flex items-center gap-1.5 px-6 py-3 bg-white border border-stone-300 text-stone-700 hover:text-[#0F3A26] hover:border-[#0F3A26] text-xs font-bold rounded-lg transition-all"
            >
              Lihat Semua Desain Undangan ({products.length + 2}+)
            </Link>
          </div>
        </div>
      </section>

      {/* ===== STEPS SECTION ===== */}
      <section className="py-16 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-emerald-50 text-[#0F3A26] text-[9px] tracking-[3px] uppercase font-bold rounded-full mb-3">
              CARA PEMESANAN
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F3A26]">
              4 Langkah Mudah Membuat Undangan
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-2 max-w-md mx-auto">
              Tidak perlu ribet coding atau desain manual. Serahkan semua pengisian data dan pengerjaan kepada tim kami.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {steps.map((s, i) => (
              <div key={i} className="bg-[#FAF9F6] border border-stone-200 rounded-lg p-5 flex flex-col justify-between hover:border-[#0F3A26] transition-all">
                <div>
                  <div className="w-8 h-8 bg-[#0F3A26] text-white font-bold text-xs rounded-md flex items-center justify-center mb-4">
                    {s.num}
                  </div>
                  <h3 className="font-bold text-stone-900 mb-1.5 text-xs sm:text-sm">{s.title}</h3>
                  <p className="text-stone-500 text-[11px] sm:text-xs leading-relaxed font-light">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/cara-order"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F3A26] hover:text-emerald-800"
            >
              Baca panduan order lengkap dan berkas yang perlu disiapkan &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURES / VALUE PROPOSITION ===== */}
      <section className="py-16 bg-[#FAF9F6] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-emerald-50 text-[#0F3A26] text-[9px] tracking-[3px] uppercase font-bold rounded-full mb-3">
              FITUR LENGKAP
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F3A26]">
              Fitur Premium Bimora Digital
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((f, i) => (
              <div key={i} className="bg-white border border-stone-200 p-6 rounded-lg hover:border-[#0F3A26] transition-all">
                <div className="w-10 h-10 bg-emerald-50 text-[#0F3A26] rounded-md flex items-center justify-center text-xl mb-4">
                  {f.icon}
                </div>
                <h3 className="font-bold text-stone-900 mb-2 text-xs sm:text-sm">{f.title}</h3>
                <p className="text-stone-500 text-[11px] sm:text-xs leading-relaxed font-light">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
