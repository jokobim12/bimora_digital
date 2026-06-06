import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { IoChevronBackOutline, IoWarningOutline } from 'react-icons/io5'
import type { WeddingData } from '../utils/dummyData'
import { getLocalInvitationBySlug } from '../utils/dummyData'
import InvitationTemplateGelap from '../components/template/jawa/gelap_premium/InvitationTemplate'
import InvitationTemplateCerah from '../components/template/jawa/cerah_premium/InvitationTemplate'

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
      <div className="bg-slate-50 text-emerald-600 min-h-screen flex flex-col items-center justify-center font-heading text-lg">
        <div className="w-12 h-12 border-4 border-emerald-600/30 border-t-emerald-600 rounded-full animate-spin mb-4" />
        Memuat Undangan...
      </div>
    )
  }

  // Invitation Not Found (404)
  if (!weddingData) {
    return (
      <div className="bg-slate-50 text-stone-800 min-h-screen flex flex-col items-center justify-center p-6 font-body text-center">
        <div className="bg-white border border-stone-200 p-8 rounded-lg w-full max-w-[400px] flex flex-col items-center">
          <IoWarningOutline className="text-5xl text-emerald-600 mb-4" />
          <h1 className="font-heading text-xl text-emerald-600 tracking-wide font-bold uppercase">Undangan Tidak Ditemukan</h1>
          
          <p className="font-body text-[10px] text-stone-500 leading-relaxed mt-4 mb-6">
            Mohon maaf, tautan undangan digital yang Anda akses tidak terdaftar dalam database sistem Bimora Digital. Silakan periksa kembali alamat tautan Anda.
          </p>

          <Link 
            to="/" 
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-body text-xs font-bold tracking-wider uppercase rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
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
      <div className="bg-slate-50 text-stone-800 min-h-screen flex flex-col items-center justify-center p-6 font-body text-center">
        <div className="bg-white border border-stone-200 p-8 rounded-lg w-full max-w-[400px] flex flex-col items-center">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
            <IoWarningOutline className="text-3xl" />
          </div>
          <h1 className="font-heading text-xl text-emerald-600 tracking-wide font-bold uppercase">Masa Aktif Habis</h1>
          
          <p className="font-body text-[10px] text-stone-500 leading-relaxed mt-4 mb-6">
            Undangan digital milik <span className="text-emerald-600 font-semibold">{weddingData.groom_nickname} &amp; {weddingData.bride_nickname}</span> saat ini telah dinonaktifkan atau masa kontrak layanan aktif telah berakhir.
          </p>

          <Link 
            to="/" 
            className="w-full py-3 border border-emerald-300 hover:border-emerald-500 text-emerald-750 font-body text-xs font-bold tracking-wider uppercase rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:bg-emerald-50"
          >
            <IoChevronBackOutline /> Portal Utama Bimora
          </Link>
        </div>
      </div>
    )
  }

  // Active Invitation - Render Template Container based on template_type!
  if (weddingData.template_type === 'jawa_cerah') {
    return <InvitationTemplateCerah data={weddingData} />
  }

  // Default to Gelap Premium (jawa)
  return <InvitationTemplateGelap data={weddingData} />
}
