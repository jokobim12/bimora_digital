import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  IoLockClosedOutline, IoAddOutline, IoTrashOutline, 
  IoCreateOutline, IoEyeOutline, IoCloseOutline, 
  IoChevronBackOutline, IoSaveOutline, IoTrashBinOutline 
} from 'react-icons/io5'
import type { WeddingData } from '../utils/dummyData'
import { 
  getLocalInvitations, 
  addOrUpdateLocalInvitation, deleteLocalInvitation 
} from '../utils/dummyData'

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)
  
  const [invitations, setInvitations] = useState<WeddingData[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<WeddingData | null>(null)
  
  // Toast State
  const [toastMsg, setToastMsg] = useState('')
  const [showToast, setShowToast] = useState(false)

  // Form Fields State
  const [slug, setSlug] = useState('')
  const [templateType, setTemplateType] = useState('jawa')
  const [isActive, setIsActive] = useState(true)
  
  const [groomName, setGroomName] = useState('')
  const [groomNickname, setGroomNickname] = useState('')
  const [groomParents, setGroomParents] = useState('')
  const [groomPhoto, setGroomPhoto] = useState('/assets/mempelai/groom.png')
  
  const [brideName, setBrideName] = useState('')
  const [brideNickname, setBrideNickname] = useState('')
  const [brideParents, setBrideParents] = useState('')
  const [bridePhoto, setBridePhoto] = useState('/assets/mempelai/bride.png')
  const [couplePhoto, setCouplePhoto] = useState('/assets/mempelai/mempelai.png')
  const [gallery, setGallery] = useState<string[]>([])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setter(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMusicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 4.5 * 1024 * 1024) {
        alert('File musik terlalu besar (Maksimal 4.5MB untuk prototype local storage)!')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setMusicUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const remainingCount = 6 - gallery.length
    if (remainingCount <= 0) {
      triggerToast('Maksimal 6 foto galeri!')
      return
    }
    
    const filesToUpload = files.slice(0, remainingCount)
    
    filesToUpload.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setGallery(prev => [...prev, reader.result as string].slice(0, 6))
      }
      reader.readAsDataURL(file)
    })
  }

  const handleRemoveGalleryImage = (index: number) => {
    setGallery(prev => prev.filter((_, i) => i !== index))
  }
  
  const [weddingDate, setWeddingDate] = useState('2026-08-15')
  const [akadTime, setAkadTime] = useState('08:00 - 10:00 WIB')
  const [resepsiTime, setResepsiTime] = useState('11:00 - 14:00 WIB')
  const [locationName, setLocationName] = useState('')
  const [locationAddress, setLocationAddress] = useState('')
  const [mapsEmbed, setMapsEmbed] = useState('')
  const [mapsLink, setMapsLink] = useState('')
  
  const [musicUrl, setMusicUrl] = useState('/music/jawa.mp3')
  const [gifts, setGifts] = useState<{ bank: string; number: string; name: string }[]>([])

  // Load Invitations on Enter
  useEffect(() => {
    // Check session auth
    const session = sessionStorage.getItem('bimora_admin_auth')
    if (session === 'true') {
      setIsLoggedIn(true)
      setInvitations(getLocalInvitations())
    }
  }, [])

  const triggerToast = (msg: string) => {
    setToastMsg(msg)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'admin') {
      setIsLoggedIn(true)
      setLoginError(false)
      sessionStorage.setItem('bimora_admin_auth', 'true')
      setInvitations(getLocalInvitations())
      triggerToast('Selamat datang, Admin! 👋')
    } else {
      setLoginError(true)
      setPassword('')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    sessionStorage.removeItem('bimora_admin_auth')
  }

  // Open modal for creating new record
  const handleCreateNew = () => {
    setEditingItem(null)
    setSlug('')
    setTemplateType('jawa')
    setIsActive(true)
    setGroomName('')
    setGroomNickname('')
    setGroomParents('')
    setGroomPhoto('/assets/mempelai/groom.png')
    setBrideName('')
    setBrideNickname('')
    setBrideParents('')
    setBridePhoto('/assets/mempelai/bride.png')
    setCouplePhoto('/assets/mempelai/mempelai.png')
    setGallery([]) // Reset gallery
    setWeddingDate('2026-08-15')
    setAkadTime('08:00 - 10:00 WIB')
    setResepsiTime('11:00 - 14:00 WIB')
    setLocationName('Gedung Graha Saba Buana')
    setLocationAddress('Jl. Letjen Suprapto No.80B, Sumber, Kec. Banjarsari, Kota Surakarta, Jawa Tengah 57137')
    setMapsEmbed('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.195029419177!2d110.80624027476343!3d-7.553683692460142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a16efe15db5e1%3A0x6bcfd35bcfa2ebf9!2sGedung%20Graha%20Saba%20Buana!5e0!3m2!1sid!2sid!4v1700000000000')
    setMapsLink('https://maps.app.goo.gl/9Zc1zG29XvH2T1x27')
    setMusicUrl('/music/jawa.mp3')
    setGifts([
      { bank: 'BCA', number: '', name: '' }
    ])
    setShowModal(true)
  }

  // Open modal for editing record
  const handleEdit = (item: WeddingData) => {
    setEditingItem(item)
    setSlug(item.slug)
    setTemplateType(item.template_type)
    setIsActive(item.is_active)
    setGroomName(item.groom_name)
    setGroomNickname(item.groom_nickname)
    setGroomParents(item.groom_parents)
    setGroomPhoto(item.groom_photo)
    setBrideName(item.bride_name)
    setBrideNickname(item.bride_nickname)
    setBrideParents(item.bride_parents)
    setBridePhoto(item.bride_photo)
    setCouplePhoto(item.couple_photo || '/assets/mempelai/mempelai.png')
    setGallery(item.gallery || []) // Load existing gallery
    setWeddingDate(item.wedding_date)
    setAkadTime(item.akad_time || '08:00 - 10:00 WIB')
    setResepsiTime(item.resepsi_time || '11:00 - 14:00 WIB')
    setLocationName(item.location_name)
    setLocationAddress(item.location_address)
    setMapsEmbed(item.maps_embed)
    setMapsLink(item.maps_link)
    setMusicUrl(item.music_url)
    setGifts(item.gifts || [])
    setShowModal(true)
  }

  const handleDelete = (slugToDelete: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus undangan dengan URL: /undangan/${slugToDelete}?`)) {
      deleteLocalInvitation(slugToDelete)
      setInvitations(getLocalInvitations())
      triggerToast('Undangan berhasil dihapus!')
    }
  }

  const handleAddGiftField = () => {
    setGifts([...gifts, { bank: '', number: '', name: '' }])
  }

  const handleRemoveGiftField = (index: number) => {
    setGifts(gifts.filter((_, i) => i !== index))
  }

  const handleGiftChange = (index: number, field: 'bank' | 'number' | 'name', value: string) => {
    const updated = [...gifts]
    updated[index][field] = value
    setGifts(updated)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!slug.trim()) return

    // Validate slug (letters, numbers, hyphens only)
    const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-')
    
    // Check duplicates if creating new
    if (!editingItem) {
      const exists = invitations.some(item => item.slug === cleanSlug)
      if (exists) {
        alert('Slug URL sudah digunakan! Silakan pilih nama slug lain.')
        return
      }
    }

    const payload: WeddingData = {
      id: editingItem ? editingItem.id : (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9) + Date.now().toString(36)),
      slug: cleanSlug,
      template_type: templateType,
      is_active: isActive,
      groom_name: groomName.trim(),
      groom_nickname: groomNickname.trim(),
      groom_parents: groomParents.trim(),
      groom_photo: groomPhoto.trim(),
      bride_name: brideName.trim(),
      bride_nickname: brideNickname.trim(),
      bride_parents: brideParents.trim(),
      bride_photo: bridePhoto.trim(),
      couple_photo: couplePhoto.trim(),
      wedding_date: weddingDate,
      akad_time: akadTime.trim(),
      resepsi_time: resepsiTime.trim(),
      location_name: locationName.trim(),
      location_address: locationAddress.trim(),
      maps_embed: mapsEmbed.trim(),
      maps_link: mapsLink.trim(),
      music_url: musicUrl.trim(),
      gifts: gifts.filter(g => g.bank.trim() && g.number.trim()),
      gallery: gallery
    }

    addOrUpdateLocalInvitation(payload)
    setInvitations(getLocalInvitations())
    setShowModal(false)
    triggerToast(editingItem ? 'Undangan diperbarui!' : 'Undangan baru ditambahkan!')
  }

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center font-body px-6">
        <div className="bg-jawa-black-card border-2 border-jawa-gold/30 p-8 rounded-2xl w-full max-w-[380px] shadow-2xl flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-jawa-gold to-transparent" />
          
          <img src="/assets/gunungan.png" alt="" className="w-14 h-auto blend-screen opacity-90 mb-4 filter brightness-110" />
          <h1 className="font-heading text-2xl text-jawa-gold tracking-widest font-bold">PORTAL ADMIN</h1>
          <p className="font-body text-[10px] tracking-wider text-jawa-cream/55 uppercase mb-6 mt-1">Bimora Digital Dashboard</p>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <div className="relative">
              <label className="block text-[9px] uppercase tracking-wider text-jawa-gold-light/80 mb-1.5">Kata Sandi Akses</label>
              <div className="relative flex items-center">
                <IoLockClosedOutline className="absolute left-3.5 text-jawa-gold-light text-base pointer-events-none" />
                <input 
                  type="password" 
                  placeholder="Masukkan kata sandi (Ketik: admin)" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black border border-jawa-gold/25 focus:border-jawa-gold outline-none rounded-xl text-xs text-jawa-cream tracking-widest font-body"
                  required
                />
              </div>
            </div>

            {loginError && (
              <span className="text-[10px] text-red-400 font-medium text-center bg-red-950/20 py-1.5 px-3 rounded-lg border border-red-900/30">
                Sandi salah! Silakan coba lagi (Sandi: admin)
              </span>
            )}

            <button 
              type="submit" 
              className="mt-2 py-3 bg-jawa-gold hover:bg-jawa-gold-dark text-black font-body text-xs font-bold tracking-widest uppercase rounded-xl transition-all active:scale-98 cursor-pointer"
            >
              Masuk Dashboard
            </button>
          </form>

          <Link to="/" className="mt-6 text-[10px] tracking-widest uppercase text-jawa-cream/40 hover:text-jawa-gold transition-colors flex items-center gap-1">
            <IoChevronBackOutline /> Kembali ke Beranda
          </Link>
        </div>
      </div>
    )
  }

  // ADMIN DASHBOARD SCREEN
  return (
    <div className="bg-black text-jawa-cream min-h-screen font-body relative">
      
      {/* HEADER */}
      <header className="border-b border-jawa-gold/15 bg-jawa-black-card py-4 px-6 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <img src="/assets/gunungan.png" alt="Bimora Logo" className="w-8 h-auto blend-screen" />
            <span className="font-heading text-lg font-bold tracking-widest text-jawa-gold">BIMORA ADMIN</span>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/" className="text-[10px] tracking-wider font-semibold uppercase text-jawa-cream/60 hover:text-jawa-gold transition-colors">
              Lihat Web Utama
            </Link>
            <button 
              onClick={handleLogout}
              className="px-4 py-1.5 bg-red-950/40 hover:bg-red-950 border border-red-900/40 hover:border-red-900 text-red-400 font-body text-[9px] tracking-wider uppercase font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Keluar
            </button>
          </div>
        </div>
      </header>

      {/* DASHBOARD CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="font-heading text-2xl font-bold text-jawa-gold">Daftar Undangan Klien</h1>
            <p className="font-body text-[11px] text-jawa-cream/50 mt-1">Kelola tautan dan isi undangan digital klien Anda di sini.</p>
          </div>

          <button
            onClick={handleCreateNew}
            className="px-6 py-3.5 bg-jawa-gold hover:bg-jawa-gold-dark text-black font-body text-xs font-bold tracking-wider uppercase rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <IoAddOutline className="text-base" /> Tambah Undangan Baru
          </button>
        </div>

        {/* INVITATION GRID / CARDS */}
        {invitations.length === 0 ? (
          <div className="border border-dashed border-jawa-gold/20 rounded-2xl p-16 text-center bg-jawa-black-card/10">
            <IoTrashBinOutline className="text-5xl text-jawa-gold/20 mx-auto mb-4" />
            <h3 className="font-heading text-lg text-jawa-gold-light">Belum Ada Undangan</h3>
            <p className="font-body text-xs text-jawa-cream/40 max-w-sm mx-auto mt-2">
              Silakan klik tombol "Tambah Undangan Baru" di atas untuk membuat tautan undangan digital pertama Anda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {invitations.map(item => (
              <div 
                key={item.id} 
                className="bg-jawa-black-card border border-jawa-gold/15 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-jawa-gold to-transparent" />
                
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-3 py-1 bg-jawa-gold/10 text-jawa-gold border border-jawa-gold/20 rounded-full font-body text-[8.5px] uppercase tracking-wider font-semibold">
                      Template: {item.template_type}
                    </span>
                    <span className={`w-2.5 h-2.5 rounded-full ${item.is_active ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-stone-600'}`} />
                  </div>

                  <h3 className="font-heading text-lg text-jawa-cream font-semibold">
                    {item.groom_nickname} &amp; {item.bride_nickname}
                  </h3>
                  
                  <div className="text-[10px] font-body text-jawa-cream/55 mt-2 flex flex-col gap-1">
                    <div>URL: <span className="text-jawa-gold select-all font-mono">/undangan/{item.slug}</span></div>
                    <div>Tanggal: <span className="text-jawa-cream/80">{item.wedding_date}</span></div>
                    <div>Tempat: <span className="text-jawa-cream/80 truncate block mt-0.5">{item.location_name}</span></div>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-jawa-gold/10 my-4" />

                <div className="grid grid-cols-3 gap-2">
                  <a 
                    href={`/undangan/${item.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 bg-stone-900 border border-stone-800 text-jawa-gold hover:border-jawa-gold font-body text-[9px] tracking-wider uppercase font-semibold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <IoEyeOutline className="text-xs" /> Lihat
                  </a>

                  <button 
                    onClick={() => handleEdit(item)}
                    className="py-2.5 bg-jawa-gold/10 border border-jawa-gold/20 text-jawa-gold hover:bg-jawa-gold hover:text-black font-body text-[9px] tracking-wider uppercase font-semibold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <IoCreateOutline className="text-xs" /> Edit
                  </button>

                  <button 
                    onClick={() => handleDelete(item.slug)}
                    className="py-2.5 bg-red-950/20 border border-red-950/40 text-red-400 hover:bg-red-950 hover:border-red-900 font-body text-[9px] tracking-wider uppercase font-semibold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <IoTrashOutline className="text-xs" /> Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FORM MODAL (ADD / EDIT INVITATION) */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 overflow-y-auto no-scrollbar">
          <div className="bg-jawa-black-card border border-jawa-gold/30 rounded-2xl w-full max-w-[820px] shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden animate-[zoomIn_0.3s_ease]">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-jawa-gold to-transparent" />
            
            {/* Modal Header */}
            <div className="border-b border-jawa-gold/15 p-5 flex justify-between items-center bg-black/50">
              <h2 className="font-heading text-lg text-jawa-gold tracking-wide font-bold">
                {editingItem ? 'Edit Data Undangan Klien' : 'Buat Undangan Klien Baru'}
              </h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-2xl text-jawa-cream/60 hover:text-jawa-gold transition-colors cursor-pointer"
              >
                <IoCloseOutline />
              </button>
            </div>

            {/* Modal Scroll Body */}
            <form id="invitation-form" onSubmit={handleFormSubmit} className="overflow-y-auto p-6 flex-grow flex flex-col gap-6 no-scrollbar">
              
              {/* SECTION: SYSTEM / LINK CONFIG */}
              <div>
                <h3 className="font-heading text-sm text-jawa-gold tracking-wide border-b border-jawa-gold/10 pb-1.5 mb-4 uppercase">1. Pengaturan Tautan &amp; Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[9.5px] uppercase tracking-wider text-jawa-gold-light/80 mb-1.5 font-medium">Slug URL Undangan</label>
                    <input 
                      type="text" 
                      placeholder="contoh: bimantara-clara" 
                      value={slug}
                      onChange={e => setSlug(e.target.value)}
                      disabled={!!editingItem}
                      className="w-full px-4 py-2.5 bg-black border border-jawa-gold/20 focus:border-jawa-gold outline-none rounded-xl text-xs text-jawa-cream font-mono disabled:opacity-50"
                      required
                    />
                    <span className="text-[8.5px] text-jawa-cream/40 mt-1 block">*Hanya huruf kecil, angka, dan strip</span>
                  </div>

                  <div>
                    <label className="block text-[9.5px] uppercase tracking-wider text-jawa-gold-light/80 mb-1.5 font-medium">Pilihan Desain Template</label>
                    <select 
                      value={templateType}
                      onChange={e => setTemplateType(e.target.value)}
                      className="w-full px-4 py-2.5 bg-black border border-jawa-gold/20 focus:border-jawa-gold outline-none rounded-xl text-xs text-jawa-cream cursor-pointer"
                    >
                      <option value="jawa">Adat Jawa Premium</option>
                      <option value="modern" disabled>Modern Emerald (Coming Soon)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[9.5px] uppercase tracking-wider text-jawa-gold-light/80 mb-1.5 font-medium">Status Undangan</label>
                    <select 
                      value={isActive ? 'aktif' : 'nonaktif'}
                      onChange={e => setIsActive(e.target.value === 'aktif')}
                      className="w-full px-4 py-2.5 bg-black border border-jawa-gold/20 focus:border-jawa-gold outline-none rounded-xl text-xs text-jawa-cream cursor-pointer"
                    >
                      <option value="aktif">Aktif (Bisa Diakses)</option>
                      <option value="nonaktif">Nonaktif (Masa Aktif Habis)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION: GROOM & BRIDE DATA */}
              <div>
                <h3 className="font-heading text-sm text-jawa-gold tracking-wide border-b border-jawa-gold/10 pb-1.5 mb-4 uppercase">2. Informasi Pengantin Pria &amp; Wanita</h3>
                
                {/* Foto Bersama (Couple Photo) - Upload dari Device */}
                <div className="border border-jawa-gold/15 p-4 rounded-xl bg-black/20 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <h4 className="font-heading text-xs text-jawa-gold-light font-bold uppercase">Foto Bersama / Prewedding Utama</h4>
                    <span className="text-[8.5px] text-jawa-cream/50 mt-0.5 font-body">Ditampilkan di bagian atas halaman Mempelai sebagai foto portrait utama pasangan.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {couplePhoto && (
                      <img src={couplePhoto} className="w-14 h-14 object-cover rounded-lg border border-jawa-gold/25 bg-black" alt="Couple Portrait Preview" />
                    )}
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={e => handleFileUpload(e, setCouplePhoto)}
                      className="text-[10px] text-jawa-cream file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[9.5px] file:font-semibold file:bg-jawa-gold file:text-black hover:file:bg-jawa-gold-dark file:cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mempelai Pria */}
                  <div className="border border-jawa-gold/15 p-4 rounded-xl bg-black/20 flex flex-col gap-4">
                    <h4 className="font-heading text-xs text-jawa-gold-light font-bold mb-1 uppercase">Mempelai Pria</h4>
                    
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-jawa-cream/60 mb-1">Nama Panggilan</label>
                      <input 
                        type="text" 
                        placeholder="contoh: Bimantara" 
                        value={groomNickname}
                        onChange={e => setGroomNickname(e.target.value)}
                        className="w-full px-3 py-2 bg-black border border-jawa-gold/15 focus:border-jawa-gold outline-none rounded-lg text-xs text-jawa-cream font-body"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-jawa-cream/60 mb-1">Nama Lengkap &amp; Gelar</label>
                      <input 
                        type="text" 
                        placeholder="contoh: Bimantara Al Rasyid, S.Kom." 
                        value={groomName}
                        onChange={e => setGroomName(e.target.value)}
                        className="w-full px-3 py-2 bg-black border border-jawa-gold/15 focus:border-jawa-gold outline-none rounded-lg text-xs text-jawa-cream font-body"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-jawa-cream/60 mb-1">Keterangan Orang Tua</label>
                      <textarea 
                        rows={2}
                        placeholder="contoh: Putra Pertama dari Bapak H. Ahmad & Ibu Hj. Siti" 
                        value={groomParents}
                        onChange={e => setGroomParents(e.target.value)}
                        className="w-full px-3 py-2 bg-black border border-jawa-gold/15 focus:border-jawa-gold outline-none rounded-lg text-xs text-jawa-cream font-body resize-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-jawa-cream/60 mb-1">Foto Mempelai Pria</label>
                      <div className="flex flex-col gap-2">
                        {groomPhoto && (
                          <img src={groomPhoto} className="w-16 h-16 object-cover rounded-lg border border-jawa-gold/25 bg-black" alt="Groom Preview" />
                        )}
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={e => handleFileUpload(e, setGroomPhoto)}
                          className="w-full text-[10px] text-jawa-cream file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[9px] file:font-semibold file:bg-jawa-gold/20 file:text-jawa-gold hover:file:bg-jawa-gold/30 file:cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mempelai Wanita */}
                  <div className="border border-jawa-gold/15 p-4 rounded-xl bg-black/20 flex flex-col gap-4">
                    <h4 className="font-heading text-xs text-jawa-gold-light font-bold mb-1 uppercase">Mempelai Wanita</h4>
                    
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-jawa-cream/60 mb-1">Nama Panggilan</label>
                      <input 
                        type="text" 
                        placeholder="contoh: Claraveliana" 
                        value={brideNickname}
                        onChange={e => setBrideNickname(e.target.value)}
                        className="w-full px-3 py-2 bg-black border border-jawa-gold/15 focus:border-jawa-gold outline-none rounded-lg text-xs text-jawa-cream font-body"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-jawa-cream/60 mb-1">Nama Lengkap &amp; Gelar</label>
                      <input 
                        type="text" 
                        placeholder="contoh: Claraveliana Putri, S.Pd." 
                        value={brideName}
                        onChange={e => setBrideName(e.target.value)}
                        className="w-full px-3 py-2 bg-black border border-jawa-gold/15 focus:border-jawa-gold outline-none rounded-lg text-xs text-jawa-cream font-body"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-jawa-cream/60 mb-1">Keterangan Orang Tua</label>
                      <textarea 
                        rows={2}
                        placeholder="contoh: Putri Kedua dari Bapak H. Bambang & Ibu Hj. Ratna" 
                        value={brideParents}
                        onChange={e => setBrideParents(e.target.value)}
                        className="w-full px-3 py-2 bg-black border border-jawa-gold/15 focus:border-jawa-gold outline-none rounded-lg text-xs text-jawa-cream font-body resize-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-jawa-cream/60 mb-1">Foto Mempelai Wanita</label>
                      <div className="flex flex-col gap-2">
                        {bridePhoto && (
                          <img src={bridePhoto} className="w-16 h-16 object-cover rounded-lg border border-jawa-gold/25 bg-black" alt="Bride Preview" />
                        )}
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={e => handleFileUpload(e, setBridePhoto)}
                          className="w-full text-[10px] text-jawa-cream file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[9px] file:font-semibold file:bg-jawa-gold/20 file:text-jawa-gold hover:file:bg-jawa-gold/30 file:cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION: DATES, LOGISTICS & MAPS */}
              <div>
                <h3 className="font-heading text-sm text-jawa-gold tracking-wide border-b border-jawa-gold/10 pb-1.5 mb-4 uppercase">3. Jadwal Acara &amp; Peta Lokasi</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-jawa-cream/60 mb-1">Tanggal Pernikahan (Countdown)</label>
                    <input 
                      type="date" 
                      value={weddingDate}
                      onChange={e => setWeddingDate(e.target.value)}
                      className="w-full px-3 py-2 bg-black border border-jawa-gold/15 focus:border-jawa-gold outline-none rounded-lg text-xs text-jawa-cream font-body"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-jawa-cream/60 mb-1">Jam Akad Nikah</label>
                    <input 
                      type="text" 
                      placeholder="contoh: 08:00 - 10:00 WIB" 
                      value={akadTime}
                      onChange={e => setAkadTime(e.target.value)}
                      className="w-full px-3 py-2 bg-black border border-jawa-gold/15 focus:border-jawa-gold outline-none rounded-lg text-xs text-jawa-cream font-body"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-jawa-cream/60 mb-1">Jam Resepsi</label>
                    <input 
                      type="text" 
                      placeholder="contoh: 11:00 WIB - Selesai" 
                      value={resepsiTime}
                      onChange={e => setResepsiTime(e.target.value)}
                      className="w-full px-3 py-2 bg-black border border-jawa-gold/15 focus:border-jawa-gold outline-none rounded-lg text-xs text-jawa-cream font-body"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-jawa-cream/60 mb-1">Nama Tempat Acara</label>
                    <input 
                      type="text" 
                      placeholder="contoh: Gedung Graha Saba Buana" 
                      value={locationName}
                      onChange={e => setLocationName(e.target.value)}
                      className="w-full px-3 py-2 bg-black border border-jawa-gold/15 focus:border-jawa-gold outline-none rounded-lg text-xs text-jawa-cream font-body"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-jawa-cream/60 mb-1">Alamat Lengkap</label>
                    <input 
                      type="text" 
                      placeholder="Masukkan alamat lengkap lokasi pernikahan" 
                      value={locationAddress}
                      onChange={e => setLocationAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-black border border-jawa-gold/15 focus:border-jawa-gold outline-none rounded-lg text-xs text-jawa-cream font-body"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-jawa-cream/60 mb-1">Google Maps (Embed Iframe Src)</label>
                    <input 
                      type="text" 
                      placeholder="Tempel tautan https://google.com/maps/embed?..." 
                      value={mapsEmbed}
                      onChange={e => setMapsEmbed(e.target.value)}
                      className="w-full px-3 py-2 bg-black border border-jawa-gold/15 focus:border-jawa-gold outline-none rounded-lg text-[9.5px] text-jawa-cream/80 font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-jawa-cream/60 mb-1">Google Maps (Direct Link)</label>
                    <input 
                      type="text" 
                      placeholder="Tempel tautan berbagi https://maps.app.goo.gl/..." 
                      value={mapsLink}
                      onChange={e => setMapsLink(e.target.value)}
                      className="w-full px-3 py-2 bg-black border border-jawa-gold/15 focus:border-jawa-gold outline-none rounded-lg text-[9.5px] text-jawa-cream/80 font-mono"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* SECTION: GIFTS / GIFT REKENING */}
              <div>
                <div className="flex justify-between items-center border-b border-jawa-gold/10 pb-1.5 mb-4">
                  <h3 className="font-heading text-sm text-jawa-gold tracking-wide uppercase">4. Tanda Kasih / Rekening Kado</h3>
                  <button
                    type="button"
                    onClick={handleAddGiftField}
                    className="px-3 py-1 bg-jawa-gold/15 hover:bg-jawa-gold border border-jawa-gold/30 hover:border-jawa-gold text-jawa-gold hover:text-black font-body text-[8.5px] tracking-wider uppercase font-semibold rounded-lg transition-all"
                  >
                    Tambah Rekening
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {gifts.map((gift, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-black/10 border border-jawa-gold/10 p-3 rounded-xl items-end">
                      <div>
                        <label className="block text-[8px] uppercase tracking-wider text-jawa-cream/50 mb-1">Nama Bank / Dompet</label>
                        <input 
                          type="text" 
                          placeholder="contoh: BCA / Mandiri" 
                          value={gift.bank}
                          onChange={e => handleGiftChange(idx, 'bank', e.target.value)}
                          className="w-full px-3 py-1.5 bg-black border border-jawa-gold/15 focus:border-jawa-gold outline-none rounded-lg text-xs text-jawa-cream"
                        />
                      </div>

                      <div>
                        <label className="block text-[8px] uppercase tracking-wider text-jawa-cream/50 mb-1">Nomor Rekening</label>
                        <input 
                          type="text" 
                          placeholder="contoh: 12345678" 
                          value={gift.number}
                          onChange={e => handleGiftChange(idx, 'number', e.target.value)}
                          className="w-full px-3 py-1.5 bg-black border border-jawa-gold/15 focus:border-jawa-gold outline-none rounded-lg text-xs text-jawa-cream font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[8px] uppercase tracking-wider text-jawa-cream/50 mb-1">Nama Pemilik Rekening</label>
                        <input 
                          type="text" 
                          placeholder="contoh: Bimantara" 
                          value={gift.name}
                          onChange={e => handleGiftChange(idx, 'name', e.target.value)}
                          className="w-full px-3 py-1.5 bg-black border border-jawa-gold/15 focus:border-jawa-gold outline-none rounded-lg text-xs text-jawa-cream"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveGiftField(idx)}
                        className="py-2.5 bg-red-950/20 border border-red-950/40 hover:bg-red-950 hover:border-red-900 text-red-400 font-body text-[9px] tracking-wider uppercase font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <IoTrashOutline /> Hapus
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* MUSIC CONFIG */}
              <div>
                <h3 className="font-heading text-sm text-jawa-gold tracking-wide border-b border-jawa-gold/10 pb-1.5 mb-4 uppercase">5. Lagu Latar Belakang</h3>
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-jawa-cream/60 mb-1">Unggah Musik dari Perangkat (Format MP3)</label>
                    <input 
                      type="file" 
                      accept="audio/mp3,audio/mpeg"
                      onChange={handleMusicUpload}
                      className="w-full text-[10px] text-jawa-cream file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[9.5px] file:font-semibold file:bg-jawa-gold file:text-black hover:file:bg-jawa-gold-dark file:cursor-pointer"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-jawa-cream/60 mb-1">Atau Tautan URL File Musik (MP3)</label>
                    <input 
                      type="text" 
                      placeholder="Masukkan URL file MP3 musik latar belakang" 
                      value={musicUrl.startsWith('data:audio') ? '[Musik Terunggah Dari Perangkat]' : musicUrl}
                      onChange={e => setMusicUrl(e.target.value)}
                      disabled={musicUrl.startsWith('data:audio')}
                      className="w-full px-3 py-2 bg-black border border-jawa-gold/15 focus:border-jawa-gold outline-none rounded-lg text-[10px] text-jawa-cream/80 font-mono disabled:opacity-50"
                      required
                    />
                    {musicUrl.startsWith('data:audio') && (
                      <button
                        type="button"
                        onClick={() => setMusicUrl('/music/jawa.mp3')}
                        className="text-[9px] text-red-400 hover:text-red-500 font-semibold tracking-wider uppercase mt-1 cursor-pointer"
                      >
                        Reset ke Musik Default
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* PHOTO GALLERY CONFIG */}
              <div>
                <h3 className="font-heading text-sm text-jawa-gold tracking-wide border-b border-jawa-gold/10 pb-1.5 mb-4 uppercase">6. Galeri Foto Prewedding (Maksimal 6 Foto)</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                    <span className="text-[10px] text-jawa-cream/60">Unggah foto album prewedding dari perangkat ({gallery.length}/6 foto)</span>
                    {gallery.length < 6 && (
                      <input 
                        type="file" 
                        accept="image/*"
                        multiple
                        onChange={handleGalleryUpload}
                        className="text-[10px] text-jawa-cream file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[9.5px] file:font-semibold file:bg-jawa-gold file:text-black hover:file:bg-jawa-gold-dark file:cursor-pointer"
                      />
                    )}
                  </div>
                  
                  {/* Photo Grid Preview */}
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {gallery.map((img, idx) => (
                      <div key={idx} className="relative rounded-xl overflow-hidden aspect-square border border-jawa-gold/20 group bg-black">
                        <img src={img} className="w-full h-full object-cover" alt={`Gallery Preview ${idx + 1}`} />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(idx)}
                          className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-red-400 font-semibold hover:text-red-500 cursor-pointer gap-1"
                        >
                          <IoTrashOutline className="text-lg" />
                          <span className="text-[7.5px] tracking-wider uppercase">Hapus</span>
                        </button>
                      </div>
                    ))}
                    {Array.from({ length: Math.max(0, 6 - gallery.length) }).map((_, idx) => (
                      <div key={idx} className="rounded-xl border-2 border-dashed border-jawa-gold/10 aspect-square flex flex-col items-center justify-center text-jawa-gold/15 text-[8.5px] uppercase tracking-widest font-semibold font-body bg-black/10 select-none">
                        Kosong
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </form>

            {/* Modal Footer Controls */}
            <div className="border-t border-jawa-gold/15 p-5 bg-black/50 flex justify-end gap-3.5">
              <button 
                type="button"
                onClick={() => setShowModal(false)}
                className="px-6 py-3 border border-jawa-gold/25 text-jawa-gold-light hover:bg-jawa-gold/10 font-body text-xs font-semibold tracking-wider uppercase rounded-xl transition-all cursor-pointer"
              >
                Batal
              </button>
              
              <button 
                type="submit"
                form="invitation-form"
                className="px-8 py-3 bg-jawa-gold hover:bg-jawa-gold-dark text-black font-body text-xs font-bold tracking-wider uppercase rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <IoSaveOutline className="text-sm" /> Simpan Undangan
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Global Symmetrical Toast */}
      <div 
        className={`fixed left-1/2 -translate-x-1/2 z-[100] bg-jawa-black-light border-2 border-jawa-gold/50 rounded-2xl py-3 px-6 shadow-[0_10px_30px_rgba(212,168,71,0.25)] flex items-center justify-center gap-2.5 backdrop-blur-md w-[88%] max-w-[320px] transition-all duration-500 ease-out text-center ${
          showToast ? 'bottom-12 opacity-100 scale-100' : 'bottom-6 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <span className="font-body text-[10.5px] font-semibold text-jawa-gold tracking-wide">
          {toastMsg}
        </span>
      </div>

    </div>
  )
}
