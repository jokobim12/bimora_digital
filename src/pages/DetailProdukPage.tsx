import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  IoLogoWhatsapp, IoEyeOutline, IoStar, IoStarOutline,
  IoCheckmarkCircle, IoChevronBackOutline, IoSearchOutline
} from 'react-icons/io5'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { type ProductData, getLocalAppSettings } from '../utils/dummyData'
import { supabase } from '../utils/supabaseClient'

function formatPrice(price: number) {
  return 'Rp ' + price.toLocaleString('id-ID')
}

export default function DetailProdukPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<ProductData | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<ProductData[]>([])
  const [loading, setLoading] = useState(true)
  const settings = getLocalAppSettings()

  useEffect(() => {
    window.scrollTo(0, 0)
    async function loadProductDetails() {
      if (!id) {
        setLoading(false)
        return
      }
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: true })

        if (error) {
          console.error('Error loading product details from Supabase:', error.message)
        } else if (data) {
          const allProducts: ProductData[] = data.map((p: any) => ({
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

          const found = allProducts.find(p => String(p.id) === String(id))
          if (found) {
            setProduct(found)
            const related = allProducts
              .filter(p => String(p.id) !== String(id))
              .sort((a, b) => {
                const matchA = a.category === found.category ? 1 : 0
                const matchB = b.category === found.category ? 1 : 0
                return matchB - matchA
              })
              .slice(0, 3)
            setRelatedProducts(related)
          } else {
            setProduct(null)
          }
        }
      } catch (err) {
        console.error('Exception loading product details:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProductDetails()
  }, [id])

  if (loading) {
    return (
      <div className="bg-[#FAF9F6] text-stone-850 font-body min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F3A26]"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="bg-[#FAF9F6] text-stone-850 font-body min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center py-20 px-4">
          <IoSearchOutline className="text-5xl text-stone-300 mb-4" />
          <h1 className="text-2xl font-bold text-stone-850 mb-2">Produk Tidak Ditemukan</h1>
          <p className="text-stone-500 mb-6 text-center max-w-sm">
            Maaf, detail produk yang Anda cari tidak tersedia.
          </p>
          <Link to="/produk" className="px-5 py-2.5 bg-[#0F3A26] hover:bg-emerald-800 text-white font-bold rounded-lg transition-colors flex items-center gap-2">
            <IoChevronBackOutline /> Kembali ke Galeri
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const waMessage = (name: string) =>
    encodeURIComponent(`Halo Bimora Digital! Saya tertarik untuk memesan template undangan digital *${name}*. Boleh konsultasi lebih lanjut?`)

  return (
    <div className="bg-[#FAF9F6] text-stone-850 font-body min-h-screen selection:bg-emerald-100 selection:text-[#0F3A26]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-10 pb-20">
        
        {/* Navigation / Back Button Row */}
        <div className="flex items-center justify-between mb-8 pb-5 border-b border-stone-255">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-lg bg-white border border-stone-200 text-[#0F3A26] flex items-center justify-center text-lg hover:bg-emerald-50 transition-all cursor-pointer"
          >
            <IoChevronBackOutline />
          </button>
          <div className="text-right">
            <span className="text-[9px] tracking-widest uppercase text-emerald-700 font-bold block">
              Detail Desain
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#0F3A26] tracking-tight">
              {product.name}
            </h1>
          </div>
        </div>

        {/* Product Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Image Preview & Description */}
          <div className="md:col-span-7 space-y-6">
            <div className="relative aspect-[16/10] w-full bg-[#0F3A26] rounded-lg overflow-hidden border border-stone-200">
              {product.thumbnail ? (
                <img
                  src={product.thumbnail}
                  className="w-full h-full object-cover"
                  alt={product.name}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-6 text-center">
                  <span className="text-white text-lg font-bold">{product.name}</span>
                </div>
              )}
            </div>

            {/* Keterangan / Deskripsi */}
            <div className="bg-white border border-stone-200 rounded-lg p-6 sm:p-8">
              <span className="inline-block px-2.5 py-1 bg-emerald-50 text-[#0F3A26] text-[9px] font-bold rounded uppercase tracking-wider mb-4 border border-emerald-100">
                Deskripsi Desain
              </span>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-light">
                {product.desc}
              </p>
            </div>
          </div>

          {/* Right Column: Pricing, Buy Button, Features, Recommendations */}
          <div className="md:col-span-5 space-y-6">
            
            {/* Pricing Card */}
            <div className="bg-white border border-stone-200 rounded-lg p-6">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-2xl font-bold text-[#0F3A26] tracking-tight">
                  {formatPrice(product.price)}
                </span>
                <span className="text-[9px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded">
                  HEMAT {discountPercent}%
                </span>
              </div>
              
              <p className="text-xs text-stone-500 mb-4">
                Harga normal dari <span className="line-through">{formatPrice(product.originalPrice)}</span>
              </p>

              <div className="border-t border-stone-100 pt-4 flex justify-between items-center text-[10px] sm:text-xs text-stone-500 font-bold uppercase tracking-wider">
                <span>Kategori: {product.category}</span>
                <span className="text-emerald-700">Status: Siap Pengerjaan</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="bg-white border border-stone-200 rounded-lg p-6 space-y-3">
              <a
                href={`https://wa.me/${settings.waNumber}?text=${waMessage(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#0F3A26] hover:bg-emerald-800 text-white font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm text-center"
              >
                <IoLogoWhatsapp className="text-base text-green-400" /> Pesan & Isi Data via WhatsApp
              </a>

              {product.previewSlug && (
                product.previewSlug.startsWith('http') || product.previewSlug.startsWith('/') ? (
                  <a
                    href={product.previewSlug}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-white border border-[#0F3A26] text-[#0F3A26] hover:bg-emerald-50 font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
                  >
                    <IoEyeOutline className="text-base" /> Lihat Demo Undangan
                  </a>
                ) : (
                  <Link
                    to={`/undangan/${product.previewSlug}`}
                    className="w-full py-2.5 bg-white border border-[#0F3A26] text-[#0F3A26] hover:bg-emerald-50 font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
                  >
                    <IoEyeOutline className="text-base" /> Lihat Demo Undangan
                  </Link>
                )
              )}
            </div>

            {/* Features Card */}
            <div className="bg-white border border-stone-200 rounded-lg p-6">
              <span className="inline-block px-2.5 py-1 bg-emerald-50 text-[#0F3A26] text-[9px] font-bold rounded uppercase tracking-wider mb-4 border border-emerald-100">
                Fitur yang Didapatkan
              </span>
              <div className="space-y-2.5">
                {product.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <IoCheckmarkCircle className="text-emerald-700 text-sm shrink-0 mt-0.5" />
                    <span className="text-xs text-stone-700 leading-tight font-light">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Card */}
            <div className="bg-white border border-stone-200 rounded-lg p-6">
              <h3 className="text-xs font-bold text-stone-850 uppercase tracking-wider mb-3">
                Ulasan Pembeli ({product.reviews})
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, j) => (
                    j < product.rating
                      ? <IoStar key={j} className="text-amber-500 text-xs" />
                      : <IoStarOutline key={j} className="text-stone-200 text-xs" />
                  ))}
                </div>
                <span className="text-xs font-bold text-stone-750">{product.rating.toFixed(1)} / 5.0</span>
              </div>
            </div>

            {/* Recommendations */}
            {relatedProducts.length > 0 && (
              <div className="bg-white border border-stone-200 rounded-lg p-6">
                <h3 className="text-xs font-bold text-stone-850 uppercase tracking-wider mb-4">
                  Rekomendasi Tema Lain
                </h3>
                <div className="space-y-3">
                  {relatedProducts.map(prod => (
                    <Link
                      key={prod.id}
                      to={`/produk/${prod.id}`}
                      className="bg-white border border-stone-150 rounded-lg p-3 flex gap-3 hover:border-emerald-700 transition-all block"
                    >
                      <div className="w-20 aspect-[16/10] bg-[#0F3A26] rounded overflow-hidden shrink-0 flex items-center justify-center">
                        {prod.thumbnail ? (
                          <img src={prod.thumbnail} alt={prod.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[8px] text-white font-bold text-center p-1">{prod.name.split('–')[0]}</span>
                        )}
                      </div>
                      <div className="flex flex-col justify-between">
                        <div>
                          <span className="text-[8px] text-emerald-700 font-bold uppercase tracking-wider">{prod.category}</span>
                          <h4 className="text-xs font-bold text-[#0F3A26] line-clamp-1 mt-0.5">{prod.name}</h4>
                        </div>
                        <span className="text-xs font-bold text-[#0F3A26]">{formatPrice(prod.price)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </main>

      <Footer />
    </div>
  )
}
