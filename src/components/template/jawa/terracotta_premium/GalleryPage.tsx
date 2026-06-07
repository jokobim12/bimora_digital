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
      <p className="font-body text-[10px] tracking-[4px] uppercase text-[#8B3D30] font-semibold reveal delay-100">
        Momen Indah
      </p>
      <h2 className="font-heading text-3xl font-light text-[#5A1E17] tracking-wide mt-1 reveal reveal-down delay-200">
        Galeri Foto
      </h2>
      <div className="gold-divider my-6 reveal reveal-scale delay-300">
        <span className="line !bg-[#8B3D30]" />
        <span className="diamond !bg-[#8B3D30]" />
        <span className="line !bg-[#8B3D30]" />
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
              className={`rounded-2xl overflow-hidden aspect-square cursor-pointer relative bg-[#FAF6EC] border border-[#8B3D30]/25 hover:border-[#8B3D30]/60 hover:scale-[1.02] transition-all duration-300 shadow-md group reveal reveal-scale ${
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
                <div className="w-full h-full flex flex-col items-center justify-center text-[#8B3D30]/40 gap-2 p-4 bg-[#FAF6EC]">
                  <IoImagesOutline className="text-2xl group-hover:scale-110 transition-transform duration-300 text-[#8B3D30]/60" />
                  <span className="font-body text-[9px] tracking-widest uppercase text-[#8B3D30] font-bold">
                    Momen {photo.id + 1}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Ornament gunungan */}
      <img className="w-16 lg:w-20 h-auto opacity-45 my-10 lg:my-12 reveal reveal-scale delay-200" src="/assets/terracotta/gunungan.png" alt="" />
    </div>
  )
}
