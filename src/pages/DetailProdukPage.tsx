import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  IoLogoWhatsapp, IoEyeOutline, IoStar, IoStarOutline,
  IoCheckmarkCircle, IoChevronBackOutline, IoSearchOutline
} from 'react-icons/io5'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getLocalProducts, type ProductData } from '../utils/dummyData'

function formatPrice(price: number) {
  return 'Rp ' + price.toLocaleString('id-ID')
}

export default function DetailProdukPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<ProductData | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<ProductData[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
    const allProducts = getLocalProducts()
    const found = allProducts.find(p => String(p.id) === String(id))
    if (found) {
      setProduct(found)
      const related = allProducts
        .filter(p => String(p.id) !== String(id))
        .sort((a, b) => (a.category === found.category ? -1 : 1))
        .slice(0, 3)
      setRelatedProducts(related)
    } else {
      setProduct(null)
    }
  }, [id])

  if (!product) {
    return (
      <div className="bg-white text-stone-800 font-body min-h-screen flex flex-col">
        <div className="hidden md:block">
          <Navbar />
        </div>
        <div className="flex-grow flex flex-col items-center justify-center py-20 px-4">
          <IoSearchOutline className="text-5xl text-stone-300 mb-4" />
          <h1 className="font-heading text-2xl font-bold text-stone-800 mb-2">Produk Tidak Ditemukan</h1>
          <p className="text-stone-500 mb-6 text-center max-w-sm">
            Maaf, detail produk yang Anda cari tidak tersedia.
          </p>
          <Link to="/produk" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors flex items-center gap-2">
            <IoChevronBackOutline /> Kembali ke Galeri
          </Link>
        </div>
        <div className="hidden md:block">
          <Footer />
        </div>
      </div>
    )
  }

  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const waMessage = (name: string) =>
    encodeURIComponent(`Halo Bimora Digital! Saya tertarik untuk memesan template undangan digital *${name}*. Boleh konsultasi lebih lanjut?`)

  return (
    <div className="bg-slate-50 text-stone-800 font-body min-h-screen">
      {/* Navbar - Desktop Only */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      <main className="max-w-7xl mx-auto px-4 pt-6 pb-20">
        
        {/* Responsive Grid layout: 2 columns on desktop (7 cols left, 5 cols right), 1 column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Column: Cover Image & Description */}
          <div className="md:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] w-full bg-slate-900 rounded-2xl overflow-hidden">
              {product.thumbnail ? (
                <img
                  src={product.thumbnail}
                  className="w-full h-full object-cover"
                  alt={product.name}
                />
              ) : (
                <div className="w-full h-full bg-slate-950 flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">Bimora Premium Template</span>
                </div>
              )}
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              {/* Floating Back Button */}
              <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm text-stone-800 flex items-center justify-center text-lg hover:bg-white active:scale-95 transition-all cursor-pointer"
              >
                <IoChevronBackOutline />
              </button>

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 pt-12">
                <h1 className="font-heading text-base sm:text-lg font-extrabold text-white leading-tight">
                  {product.name}
                </h1>
              </div>
            </div>

            {/* Keterangan Card */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5">
              <span className="inline-block px-2.5 py-0.5 bg-emerald-600 text-white text-[9px] font-extrabold rounded uppercase tracking-wider mb-3">
                Keterangan
              </span>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {product.desc}
              </p>
            </div>
          </div>

          {/* Right Column: Pricing, CTAs, Features, Reviews */}
          <div className="md:col-span-5 space-y-4">
            
            {/* Pricing & Key Metrics Card */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-2xl font-bold text-emerald-600 tracking-tight">
                  {formatPrice(product.price)}
                </span>
                <span className="text-[10px] bg-red-50 text-red-500 font-extrabold px-2.5 py-0.5 rounded">
                  DISKON {discountPercent}%
                </span>
              </div>
              
              <p className="text-xs text-stone-500 font-medium mb-3">
                Harga normal dari <span className="line-through">{formatPrice(product.originalPrice)}</span>
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mb-3">
                <div className="bg-emerald-500 h-full rounded-full w-full" />
              </div>

              {/* Sub metrics */}
              <div className="flex justify-between items-center text-[10px] sm:text-xs text-stone-500 font-bold uppercase tracking-wider">
                <span>Kategori: {product.category}</span>
                <span className="text-emerald-600">Status: Tersedia</span>
              </div>
            </div>

            {/* Call to Actions (CTA) */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-3">
              <a
                href={`https://wa.me/6281234567890?text=${waMessage(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <IoLogoWhatsapp className="text-base" /> Pesan Sekarang via WhatsApp
              </a>

              {product.previewSlug && (
                product.previewSlug.startsWith('http') || product.previewSlug.startsWith('/') ? (
                  <a
                    href={product.previewSlug}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <IoEyeOutline className="text-base" /> Lihat Preview Live Web Demo
                  </a>
                ) : (
                  <Link
                    to={`/undangan/${product.previewSlug}`}
                    className="w-full py-2.5 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <IoEyeOutline className="text-base" /> Lihat Preview Live Web Demo
                  </Link>
                )
              )}
            </div>

            {/* Fitur Undangan Card */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5">
              <span className="inline-block px-2.5 py-0.5 bg-emerald-600 text-white text-[9px] font-extrabold rounded uppercase tracking-wider mb-3">
                Fitur Undangan
              </span>
              <div className="space-y-2">
                {product.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <IoCheckmarkCircle className="text-emerald-600 text-sm shrink-0 mt-0.5" />
                    <span className="text-xs text-stone-700 leading-tight font-semibold">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating & Ulasan Card */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5">
              <h3 className="font-heading text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5">
                Ulasan Pembeli ({product.reviews})
              </h3>
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, j) => (
                    j < product.rating
                      ? <IoStar key={j} className="text-amber-400 text-xs" />
                      : <IoStarOutline key={j} className="text-stone-200 text-xs" />
                  ))}
                </div>
                <span className="text-xs font-bold text-stone-700">{product.rating.toFixed(1)} dari 5.0</span>
              </div>
            </div>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
              <div className="bg-white border border-stone-200 rounded-2xl p-5">
                <h3 className="font-heading text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
                  Rekomendasi Template Lain
                </h3>
                <div className="space-y-3">
                  {relatedProducts.map(prod => (
                    <Link
                      key={prod.id}
                      to={`/produk/${prod.id}`}
                      className="bg-white border border-stone-100 rounded-xl p-3 flex gap-3 hover:border-emerald-500/30 transition-all block"
                    >
                      <div className="w-20 aspect-[16/10] bg-slate-900 rounded overflow-hidden shrink-0">
                        {prod.thumbnail ? (
                          <img src={prod.thumbnail} alt={prod.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-slate-950" />
                        )}
                      </div>
                      <div className="flex flex-col justify-between">
                        <div>
                          <span className="text-[8px] text-emerald-600 font-bold uppercase tracking-wider">{prod.category}</span>
                          <h4 className="font-heading text-xs font-bold text-stone-800 line-clamp-1 mt-0.5">{prod.name}</h4>
                        </div>
                        <span className="text-xs font-bold text-emerald-600">{formatPrice(prod.price)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </main>

      {/* Footer - Desktop Only */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  )
}
