import { IoImagesOutline } from 'react-icons/io5'
import type { WeddingData } from '../../../../utils/dummyData'
import { defaultWeddingData } from '../../../../utils/dummyData'

interface GalleryPageProps {
  isDesktopMode?: boolean
  data?: WeddingData
  onImageClick?: (src: string) => void
}

export default function GalleryPage({ isDesktopMode = false, data = defaultWeddingData, onImageClick }: GalleryPageProps) {
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
      <p className="font-body text-[10px] tracking-[4px] uppercase text-jawa-gold-light/70 reveal delay-100">
        Momen Indah
      </p>
      <h2 className="font-heading text-3xl font-light text-jawa-gold tracking-wide mt-1 reveal reveal-down delay-200">
        Galeri Foto
      </h2>
      <div className="gold-divider my-6 reveal reveal-scale delay-300">
        <span className="line" /><span className="diamond" /><span className="line" />
      </div>

      {/* Grid Layout - 3 columns on desktop, 2 columns on mobile */}
      <div className={`grid gap-4 w-full transition-all duration-500 ${
        isDesktopMode ? 'grid-cols-3' : 'grid-cols-2 gap-3'
      }`}>
        {photos.map(photo => {
          const hasImage = !!photo.src
          // In mobile, photo index 2 expands to col-span-2. In desktop, keep it col-span-1 for perfect symmetry.
          const isExpandedMobile = photo.id === 2 && !isDesktopMode

          return (
            <div
              key={photo.id}
              className={`rounded-2xl overflow-hidden aspect-square cursor-pointer relative bg-jawa-black-card/40 border border-jawa-gold/10 hover:border-jawa-gold/30 hover:scale-[1.02] transition-all duration-300 shadow-md group reveal reveal-scale ${
                isExpandedMobile ? 'col-span-2 aspect-[2/1]' : 'col-span-1'
              }`}
              style={{ transitionDelay: `${(photo.id + 1) * 100}ms` }}
              onClick={() => {
                if (hasImage && onImageClick) {
                  onImageClick(photo.src)
                }
              }}
            >
              {hasImage ? (
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  src={photo.src} 
                  alt={photo.alt} 
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-jawa-gold/30 gap-2 p-4">
                  <IoImagesOutline className="text-2xl group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-body text-[9px] tracking-widest uppercase">
                    Momen {photo.id + 1}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Ornament gunungan */}
      <img className="w-16 lg:w-20 h-auto opacity-20 blend-screen my-10 lg:my-12 reveal reveal-scale delay-200" src="/assets/gunungan.png" alt="" />
    </div>
  )
}
