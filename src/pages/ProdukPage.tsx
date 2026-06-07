import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  IoSearchOutline, IoCloseOutline, IoCheckmarkCircle, IoChevronBackOutline,
  IoEyeOutline, IoLogoWhatsapp, IoPlayCircleOutline
} from 'react-icons/io5'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { type ProductData, getLocalAppSettings } from '../utils/dummyData'
import { supabase } from '../utils/supabaseClient'

const categories = ['Semua', 'Adat Jawa', 'Modern', 'Islami', 'Sunda']

export default function ProdukPage() {
  const [products, setProducts] = useState<ProductData[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Semua')
  const settings = getLocalAppSettings()

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: true })

        if (error) {
          console.error('Error fetching products:', error.message)
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

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'Semua' || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="bg-[#FAF9F6] text-stone-850 font-body min-h-screen selection:bg-emerald-100 selection:text-[#0F3A26]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-10 pb-20">
        
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8 pb-5 border-b border-stone-250">
          <Link 
            to="/" 
            className="w-10 h-10 rounded-lg bg-white border border-stone-200 text-[#0F3A26] flex items-center justify-center text-lg hover:bg-emerald-50 transition-all"
          >
            <IoChevronBackOutline />
          </Link>
          <div className="text-right">
            <span className="text-[9px] tracking-widest uppercase text-emerald-700 font-bold block">
              Bimora Digital
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#0F3A26] tracking-tight">
              Koleksi Undangan Digital
            </h1>
          </div>
        </div>

        {/* Filters and Search Container */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
                  activeCategory === cat
                    ? 'bg-[#0F3A26] text-white border-[#0F3A26]'
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-emerald-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm" />
            <input
              type="text"
              placeholder="Cari tema / kategori..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-9 py-2 rounded-lg border border-stone-200 focus:border-[#0F3A26] focus:ring-1 focus:ring-[#0F3A26] outline-none text-xs text-stone-700 bg-white transition-all"
            />
            {search && (
              <button 
                onClick={() => setSearch('')} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <IoCloseOutline className="text-sm" />
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F3A26]"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white border border-stone-200 rounded-lg p-6">
            <IoSearchOutline className="text-4xl text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-850">Desain tidak ditemukan</h3>
            <p className="text-stone-400 text-xs mt-1">Coba gunakan kata kunci pencarian yang lain.</p>
            <button 
              onClick={() => { setSearch(''); setActiveCategory('Semua') }} 
              className="mt-4 px-4 py-2 bg-[#0F3A26] hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors"
            >
              Reset Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(product => {
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

                    {/* Preview button */}
                    {product.previewSlug && (
                      <Link
                        to={`/undangan/${product.previewSlug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full mb-2 py-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#0F3A26] text-[10px] font-bold rounded-md transition-all text-center flex items-center justify-center gap-1.5"
                      >
                        <IoPlayCircleOutline className="text-sm" /> Lihat Preview Template
                      </Link>
                    )}

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
      </main>

      <Footer />
    </div>
  )
}
