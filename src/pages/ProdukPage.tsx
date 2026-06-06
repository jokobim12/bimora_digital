import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  IoSearchOutline, IoCloseOutline, IoCheckmarkCircle, IoChevronBackOutline
} from 'react-icons/io5'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getLocalProducts } from '../utils/dummyData'

const categories = ['Semua', 'Adat Jawa', 'Modern', 'Islami', 'Sunda', 'Bali']

function formatPrice(price: number) {
  return 'Rp ' + price.toLocaleString('id-ID')
}

export default function ProdukPage() {
  const [products] = useState(() => getLocalProducts())
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Semua')

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'Semua' || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="bg-slate-50 text-stone-800 font-body min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-6 pb-20">
        
        {/* Header Row */}
        <div className="flex items-center justify-between mb-5">
          <Link 
            to="/" 
            className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg hover:bg-emerald-100 transition-colors"
          >
            <IoChevronBackOutline />
          </Link>
          <div className="text-right">
            <span className="text-[9px] tracking-widest uppercase text-emerald-600 font-bold block">
              BIMORA DIGITAL
            </span>
            <h1 className="font-heading text-lg font-extrabold text-stone-850 tracking-tight">
              DAFTAR TEMPLATE
            </h1>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mb-5 max-w-md">
          <IoSearchOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-base" />
          <input
            type="text"
            placeholder="Cari program donasi / template..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-stone-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-xs text-stone-700 bg-white transition-all"
          />
          {search && (
            <button 
              onClick={() => setSearch('')} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <IoCloseOutline className="text-base" />
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Single Column List */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white border border-stone-200 rounded-2xl p-6">
            <IoSearchOutline className="text-4xl text-stone-300 mx-auto mb-3" />
            <h3 className="font-heading text-base font-bold text-stone-800">Template tidak ditemukan</h3>
            <p className="text-stone-400 text-xs mt-1">Coba gunakan kata kunci pencarian yang lain.</p>
            <button 
              onClick={() => { setSearch(''); setActiveCategory('Semua') }} 
              className="mt-4 px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-stone-700 text-xs font-bold rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map(product => (
              <Link
                key={product.id}
                to={`/produk/${product.id}`}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden flex flex-col hover:border-emerald-500/30 transition-all duration-200 block"
              >
                {/* Thumbnail Image */}
                <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                  {product.thumbnail ? (
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-950 flex items-center justify-center">
                      <span className="text-white text-xs">No Thumbnail</span>
                    </div>
                  )}
                  {/* Category Pill Tag */}
                  <span className="absolute top-3 left-3 px-3 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>

                {/* Card details */}
                <div className="p-4 flex flex-col flex-grow">
                  {/* Title */}
                  <h3 className="font-heading text-sm sm:text-base font-bold text-stone-800 leading-snug mb-3">
                    {product.name}
                  </h3>

                  {/* Creator / Verified */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[9px] flex items-center justify-center">
                      BD
                    </div>
                    <span className="text-xs text-stone-500 font-semibold">Bimora Digital</span>
                    <IoCheckmarkCircle className="text-emerald-500 text-sm" />
                  </div>

                  {/* Decorative Progress Bar */}
                  <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden mb-3">
                    <div className="bg-emerald-500 h-full rounded-full w-full" />
                  </div>

                  {/* Pricing row */}
                  <div className="flex justify-between items-end mt-auto">
                    <div>
                      <span className="text-[9px] text-stone-400 uppercase tracking-wider block font-bold">Harga Promo</span>
                      <span className="font-bold text-emerald-600 text-sm sm:text-base">{formatPrice(product.price)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-stone-400 uppercase tracking-wider block font-bold">Original</span>
                      <span className="text-xs text-stone-400 line-through font-mono">{formatPrice(product.originalPrice)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Footer - Hidden on Mobile */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  )
}
