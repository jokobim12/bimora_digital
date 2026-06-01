import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { IoChevronBackOutline, IoWarningOutline } from 'react-icons/io5'
import type { WeddingData } from '../utils/dummyData'
import { getLocalInvitationBySlug } from '../utils/dummyData'
import InvitationTemplate from '../components/InvitationTemplate'

export default function InvitationViewer() {
  const { slug } = useParams<{ slug: string }>()
  const [loading, setLoading] = useState(true)
  const [weddingData, setWeddingData] = useState<WeddingData | null>(null)

  useEffect(() => {
    if (slug) {
      const data = getLocalInvitationBySlug(slug)
      setWeddingData(data || null)
    }
    setLoading(false)
  }, [slug])

  if (loading) {
    return (
      <div className="bg-black text-jawa-gold min-h-screen flex flex-col items-center justify-center font-heading text-lg">
        <img src="/assets/gunungan.png" alt="" className="w-16 h-auto blend-screen animate-pulse filter brightness-110 mb-4" />
        Memuat Undangan...
      </div>
    )
  }

  // Invitation Not Found (404)
  if (!weddingData) {
    return (
      <div className="bg-black text-jawa-cream min-h-screen flex flex-col items-center justify-center p-6 font-body text-center">
        <div className="bg-jawa-black-card border border-jawa-gold/25 p-8 rounded-2xl w-full max-w-[400px] shadow-2xl flex flex-col items-center">
          <IoWarningOutline className="text-5xl text-jawa-gold mb-4" />
          <h1 className="font-heading text-xl text-jawa-gold tracking-wide font-bold uppercase">Undangan Tidak Ditemukan</h1>
          
          <p className="font-body text-xs text-jawa-cream/60 leading-relaxed mt-4 mb-6">
            Mohon maaf, tautan undangan digital yang Anda akses tidak terdaftar dalam database sistem Bimora Digital. Silakan periksa kembali alamat tautan Anda.
          </p>

          <Link 
            to="/" 
            className="w-full py-3 bg-jawa-gold hover:bg-jawa-gold-dark text-black font-body text-xs font-bold tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <IoChevronBackOutline /> Kembali Ke Beranda
          </Link>
        </div>
      </div>
    )
  }

  // Invitation Inactive (Expired)
  if (!weddingData.is_active) {
    return (
      <div className="bg-black text-jawa-cream min-h-screen flex flex-col items-center justify-center p-6 font-body text-center">
        <div className="bg-jawa-black-card border border-jawa-gold/25 p-8 rounded-2xl w-full max-w-[400px] shadow-2xl flex flex-col items-center">
          <img src="/assets/gunungan.png" alt="" className="w-16 h-auto blend-screen opacity-50 mb-4 filter brightness-90" />
          <h1 className="font-heading text-xl text-jawa-gold tracking-wide font-bold uppercase">Masa Aktif Habis</h1>
          
          <p className="font-body text-xs text-jawa-cream/60 leading-relaxed mt-4 mb-6">
            Undangan digital milik <span className="text-jawa-gold font-semibold">{weddingData.groom_nickname} &amp; {weddingData.bride_nickname}</span> saat ini telah dinonaktifkan atau masa kontrak layanan aktif telah berakhir.
          </p>

          <Link 
            to="/" 
            className="w-full py-3 border border-jawa-gold/30 hover:border-jawa-gold text-jawa-gold font-body text-xs font-bold tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <IoChevronBackOutline /> Portal Utama Bimora
          </Link>
        </div>
      </div>
    )
  }

  // Active Invitation - Render Template Container!
  return <InvitationTemplate data={weddingData} />
}
