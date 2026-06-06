import { useState } from 'react'
import { IoImagesOutline, IoCloseOutline } from 'react-icons/io5'
import type { WeddingData } from '../../../../utils/dummyData'
import { defaultWeddingData } from '../../../../utils/dummyData'

interface GalleryPageProps {
  isDesktopMode?: boolean
  data?: WeddingData
}

export default function GalleryPage({ isDesktopMode = false, data = defaultWeddingData }: GalleryPageProps) {
  const [lightbox, setLightbox] = useState<string | null>(null)

  const galleryImages = data.gallery || []
  const photos = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    src: galleryImages[i] || '',
    alt: `${data.groom_nickname} & ${data.bride_nickname} Prewedding ${i + 1}`,
  }))

  return (
    <div className={`w-full mx-auto px-6 py-12 lg:py-16 flex flex-col items-center transition-all duration-500 ${
      isDesktopMode ? 'max-w-[920px]' : 'max-w-[480px]'
    }`}>
      
      {/* Title */}
      <p className="font-body text-[10px] tracking-[4px] uppercase text-[#B38520] font-medium reveal delay-100">
        Momen Indah
      </p>
      <h2 className="font-heading text-3xl font-light text-[#A17A24] tracking-wide mt-1 reveal reveal-down delay-200">
        Galeri Foto
      </h2>
      <div className="gold-divider my-6 reveal reveal-scale delay-300">
        <span className="line !bg-[#B38520]" />
        <span className="diamond !bg-[#B38520]" />
        <span className="line !bg-[#B38520]" />
      </div>

      {/* Grid Layout */}
      <div className={`grid gap-4 w-full transition-all duration-500 ${
        isDesktopMode ? 'grid-cols-3' : 'grid-cols-2 gap-3'
      }`}>
        {photos.map(photo => {
          const hasImage = !!photo.src
          const isExpandedMobile = photo.id === 2 && !isDesktopMode

          return (
            <div
              key={photo.id}
              className={`rounded-2xl overflow-hidden aspect-square cursor-pointer relative bg-white/60 border border-[#B38520]/20 hover:border-[#B38520]/60 hover:scale-[1.02] transition-all duration-300 shadow-sm group reveal reveal-scale ${
                isExpandedMobile ? 'col-span-2 aspect-[2/1]' : 'col-span-1'
              }`}
              style={{ transitionDelay: `${(photo.id + 1) * 100}ms` }}
              onClick={() => hasImage && setLightbox(photo.src)}
            >
              {hasImage ? (
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  src={photo.src} 
                  alt={photo.alt} 
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-[#B38520]/40 gap-2 p-4 bg-[#FAF6EC]/50">
                  <IoImagesOutline className="text-2xl group-hover:scale-110 transition-transform duration-300 text-[#B38520]/60" />
                  <span className="font-body text-[9px] tracking-widest uppercase text-[#B38520]">
                    Momen {photo.id + 1}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Ornament gunungan */}
      <img className="w-16 lg:w-20 h-auto opacity-30 my-10 lg:my-12 reveal reveal-scale delay-200" src="/assets/gunungan.png" alt="" />

      {/* Lightbox Popup */}
      <div 
        className={`fixed inset-0 z-[90] bg-black/95 flex items-center justify-center transition-all duration-300 ${
          lightbox ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setLightbox(null)}
      >
        <button 
          className="absolute top-6 right-6 text-3xl text-[#FAF6EC]/70 hover:text-[#FAF6EC] hover:scale-110 transition-all cursor-pointer"
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
  )
}
