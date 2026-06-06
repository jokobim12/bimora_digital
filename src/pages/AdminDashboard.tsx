import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  IoLockClosedOutline, IoAddOutline, IoTrashOutline,
  IoCreateOutline, IoEyeOutline, IoCloseOutline,
  IoChevronBackOutline, IoSaveOutline, IoTrashBinOutline,
  IoHomeOutline, IoCartOutline, IoReceiptOutline, IoMailOpenOutline,
  IoLogOutOutline, IoPeopleOutline, IoWalletOutline, IoCalendarOutline,
  IoSearchOutline, IoMenuOutline, IoCheckmarkCircleOutline
} from 'react-icons/io5'
import type { WeddingData, ProductData, OrderData } from '../utils/dummyData'
import {
  getLocalInvitations, addOrUpdateLocalInvitation, deleteLocalInvitation,
  getLocalProducts, addOrUpdateLocalProduct, deleteLocalProduct,
  getLocalOrders, addOrUpdateLocalOrder, deleteLocalOrder
} from '../utils/dummyData'

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)
  
  // Navigation
  const [activeTab, setActiveTab] = useState<'dashboard' | 'produk' | 'pesanan' | 'template'>('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Data States
  const [invitations, setInvitations] = useState<WeddingData[]>([])
  const [products, setProducts] = useState<ProductData[]>([])
  const [orders, setOrders] = useState<OrderData[]>([])

  // Modal Controls
  const [showInvitationModal, setShowInvitationModal] = useState(false)
  const [showProductModal, setShowProductModal] = useState(false)
  const [showOrderModal, setShowOrderModal] = useState(false)

  // Editing items
  const [editingInvitation, setEditingInvitation] = useState<WeddingData | null>(null)
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null)
  const [editingOrder, setEditingOrder] = useState<OrderData | null>(null)

  // Search filters
  const [searchQuery, setSearchQuery] = useState('')

  // Toast notifications
  const [toastMsg, setToastMsg] = useState('')
  const [showToast, setShowToast] = useState(false)

  // ----------------------------------------------------
  // INVITATION FORM STATES
  // ----------------------------------------------------
  const [slug, setSlug] = useState('')
  const [templateType, setTemplateType] = useState('jawa')
  const [isInvitationActive, setIsInvitationActive] = useState(true)
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
  const [stories, setStories] = useState<{ year: string; title: string; desc: string }[]>([])
  const [weddingDate, setWeddingDate] = useState('2026-08-15')
  const [akadTime, setAkadTime] = useState('08:00 - 10:00 WIB')
  const [resepsiTime, setResepsiTime] = useState('11:00 - 14:00 WIB')
  const [locationName, setLocationName] = useState('')
  const [locationAddress, setLocationAddress] = useState('')
  const [mapsEmbed, setMapsEmbed] = useState('')
  const [mapsLink, setMapsLink] = useState('')
  const [musicUrl, setMusicUrl] = useState('/music/jawa.mp3')
  const [gifts, setGifts] = useState<{ bank: string; number: string; name: string }[]>([])

  // ----------------------------------------------------
  // PRODUCT FORM STATES
  // ----------------------------------------------------
  const [pId, setPId] = useState<string | number>('')
  const [pName, setPName] = useState('')
  const [pCategory, setPCategory] = useState('Adat Jawa')
  const [pPrice, setPPrice] = useState(129000)
  const [pOriginalPrice, setPOriginalPrice] = useState(169000)
  const [pRating, setPRating] = useState(5)
  const [pReviews, setPReviews] = useState(10)
  const [pBadge, setPBadge] = useState('')
  const [pDesc, setPDesc] = useState('')
  const [pFeatures, setPFeatures] = useState('')
  const [pPreviewSlug, setPPreviewSlug] = useState('')
  const [pAvailable, setPAvailable] = useState(true)
  const [pThumbnail, setPThumbnail] = useState<string>('')
  const [rawProductImage, setRawProductImage] = useState<string | null>(null)
  const [imageBaseDims, setImageBaseDims] = useState<{ w: number; h: number } | null>(null)
  const [cropScale, setCropScale] = useState(1)
  const [cropX, setCropX] = useState(0)
  const [cropY, setCropY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const cropperContainerRef = useRef<HTMLDivElement | null>(null)

  // ----------------------------------------------------
  // ORDER FORM STATES
  // ----------------------------------------------------
  const [oId, setOId] = useState('')
  const [oCustomerName, setOCustomerName] = useState('')
  const [oCustomerPhone, setOCustomerPhone] = useState('')
  const [oProductName, setOProductName] = useState('')
  const [oOrderDate, setOOrderDate] = useState('')
  const [oStatus, setOStatus] = useState<'Menunggu Pembayaran' | 'Diproses' | 'Selesai' | 'Dibatalkan'>('Menunggu Pembayaran')
  const [oTotalPrice, setOTotalPrice] = useState(129000)

  // Check auth on load
  useEffect(() => {
    const session = sessionStorage.getItem('bimora_admin_auth')
    if (session === 'true') {
      setIsLoggedIn(true)
      loadAllData()
    }
  }, [])

  const loadAllData = () => {
    setInvitations(getLocalInvitations())
    setProducts(getLocalProducts())
    setOrders(getLocalOrders())
  }

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
      loadAllData()
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

  // ----------------------------------------------------
  // FILE / MEDIA UPLOADS
  // ----------------------------------------------------
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setter(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleMusicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 4.5 * 1024 * 1024) {
        alert('File terlalu besar! Maksimal 4.5MB untuk prototype database.')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => setMusicUrl(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const remaining = 6 - gallery.length
    if (remaining <= 0) {
      triggerToast('Maksimal 6 foto galeri!')
      return
    }
    files.slice(0, remaining).forEach(file => {
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

  // ----------------------------------------------------
  // INVITATION ACTIONS
  // ----------------------------------------------------
  const handleCreateInvitation = () => {
    setEditingInvitation(null)
    setSlug('')
    setTemplateType('jawa')
    setIsInvitationActive(true)
    setGroomName('')
    setGroomNickname('')
    setGroomParents('')
    setGroomPhoto('/assets/mempelai/groom.png')
    setBrideName('')
    setBrideNickname('')
    setBrideParents('')
    setBridePhoto('/assets/mempelai/bride.png')
    setCouplePhoto('/assets/mempelai/mempelai.png')
    setGallery([])
    setStories([
      { year: '2022', title: 'Pertama Bertemu', desc: 'Kami pertama kali bertemu di sebuah acara seminar teknologi.' },
      { year: '2024', title: 'Menjalin Komitmen', desc: 'Setelah dua tahun berteman baik, kami memutuskan untuk menjalin komitmen serius.' },
      { year: '2026', title: 'Pernikahan Agung', desc: 'Hari di mana kami mengikat janji suci pernikahan.' }
    ])
    setWeddingDate('2026-08-15')
    setAkadTime('08:00 - 10:00 WIB')
    setResepsiTime('11:00 - 14:00 WIB')
    setLocationName('Gedung Graha Saba Buana')
    setLocationAddress('Jl. Letjen Suprapto No.80B, Sumber, Kec. Banjarsari, Kota Surakarta, Jawa Tengah 57137')
    setMapsEmbed('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.195029419177!2d110.80624027476343!3d-7.553683692460142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a16efe15db5e1%3A0x6bcfd35bcfa2ebf9!2sGedung%20Graha%20Saba%20Buana!5e0!3m2!1sid!2sid!4v1700000000000')
    setMapsLink('https://maps.app.goo.gl/9Zc1zG29XvH2T1x27')
    setMusicUrl('/music/jawa.mp3')
    setGifts([{ bank: 'BCA', number: '', name: '' }])
    setShowInvitationModal(true)
  }

  const handleEditInvitation = (item: WeddingData) => {
    setEditingInvitation(item)
    setSlug(item.slug)
    setTemplateType(item.template_type)
    setIsInvitationActive(item.is_active)
    setGroomName(item.groom_name)
    setGroomNickname(item.groom_nickname)
    setGroomParents(item.groom_parents)
    setGroomPhoto(item.groom_photo)
    setBrideName(item.bride_name)
    setBrideNickname(item.bride_nickname)
    setBrideParents(item.bride_parents)
    setBridePhoto(item.bride_photo)
    setCouplePhoto(item.couple_photo || '/assets/mempelai/mempelai.png')
    setGallery(item.gallery || [])
    setStories(item.stories || [])
    setWeddingDate(item.wedding_date)
    setAkadTime(item.akad_time || '08:00 - 10:00 WIB')
    setResepsiTime(item.resepsi_time || '11:00 - 14:00 WIB')
    setLocationName(item.location_name)
    setLocationAddress(item.location_address)
    setMapsEmbed(item.maps_embed)
    setMapsLink(item.maps_link)
    setMusicUrl(item.music_url)
    setGifts(item.gifts || [])
    setShowInvitationModal(true)
  }

  const handleDeleteInvitation = (slugToDelete: string) => {
    if (window.confirm(`Hapus undangan /undangan/${slugToDelete}?`)) {
      deleteLocalInvitation(slugToDelete)
      loadAllData()
      triggerToast('Undangan berhasil dihapus!')
    }
  }

  const handleInvitationFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!slug.trim()) return
    const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-')

    if (!editingInvitation) {
      const exists = invitations.some(item => item.slug === cleanSlug)
      if (exists) {
        alert('Slug URL sudah digunakan!')
        return
      }
    }

    const payload: WeddingData = {
      id: editingInvitation ? editingInvitation.id : (Math.random().toString(36).substring(2, 9) + Date.now().toString(36)),
      slug: cleanSlug,
      template_type: templateType,
      is_active: isInvitationActive,
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
      gallery: gallery,
      stories: stories.filter(s => s.year.trim() && s.title.trim() && s.desc.trim())
    }

    addOrUpdateLocalInvitation(payload)
    loadAllData()
    setShowInvitationModal(false)
    triggerToast(editingInvitation ? 'Undangan diperbarui!' : 'Undangan baru ditambahkan!')
  }

  // ----------------------------------------------------
  // PRODUCT ACTIONS
  // ----------------------------------------------------
  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true)
    setDragStart({ x: clientX - cropX, y: clientY - cropY })
  }

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return
    setCropX(clientX - dragStart.x)
    setCropY(clientY - dragStart.y)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    const iw = img.naturalWidth
    const ih = img.naturalHeight
    const container = cropperContainerRef.current
    const containerW = container ? container.clientWidth : 400
    const containerH = container ? container.clientHeight : 250
    const scaleFit = Math.max(containerW / iw, containerH / ih)
    setImageBaseDims({
      w: iw * scaleFit,
      h: ih * scaleFit
    })
  }

  const handleCropProductImage = () => {
    if (!rawProductImage || !imageBaseDims) return
    const canvas = document.createElement('canvas')
    canvas.width = 400
    canvas.height = 250
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const img = new Image()
      img.onload = () => {
        ctx.fillStyle = '#0f172a'
        ctx.fillRect(0, 0, 400, 250)

        const container = cropperContainerRef.current
        const containerW = container ? container.clientWidth : 400
        const scaleRatio = 400 / containerW

        const drawW = imageBaseDims.w * cropScale * scaleRatio
        const drawH = imageBaseDims.h * cropScale * scaleRatio

        const x = (400 - drawW) / 2 + cropX * scaleRatio
        const y = (250 - drawH) / 2 + cropY * scaleRatio

        ctx.drawImage(img, x, y, drawW, drawH)
        setPThumbnail(canvas.toDataURL('image/jpeg', 0.85))
        setRawProductImage(null)
        setImageBaseDims(null)
      }
      img.src = rawProductImage
    }
  }

  const handleCreateProduct = () => {
    setEditingProduct(null)
    setPId(Date.now())
    setPName('')
    setPCategory('Adat Jawa')
    setPPrice(149000)
    setPOriginalPrice(199000)
    setPRating(5)
    setPReviews(10)
    setPBadge('')
    setPDesc('')
    setPFeatures('Countdown Hari H, Love Story, Galeri Foto, Maps Interaktif, Form RSVP')
    setPPreviewSlug('')
    setPAvailable(true)
    setPThumbnail('')
    setRawProductImage(null)
    setImageBaseDims(null)
    setCropScale(1)
    setCropX(0)
    setCropY(0)
    setShowProductModal(true)
  }

  const handleEditProduct = (prod: ProductData) => {
    setEditingProduct(prod)
    setPId(prod.id)
    setPName(prod.name)
    setPCategory(prod.category)
    setPPrice(prod.price)
    setPOriginalPrice(prod.originalPrice)
    setPRating(prod.rating)
    setPReviews(prod.reviews)
    setPBadge(prod.badge)
    setPDesc(prod.desc)
    setPFeatures(prod.features.join(', '))
    setPPreviewSlug(prod.previewSlug || '')
    setPAvailable(prod.available)
    setPThumbnail(prod.thumbnail || '')
    setRawProductImage(null)
    setImageBaseDims(null)
    setCropScale(1)
    setCropX(0)
    setCropY(0)
    setShowProductModal(true)
  }

  const handleDeleteProduct = (id: string | number) => {
    if (window.confirm('Hapus produk ini?')) {
      deleteLocalProduct(id)
      loadAllData()
      triggerToast('Produk berhasil dihapus!')
    }
  }

  const handleProductFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!pName.trim()) return

    const payload: ProductData = {
      id: pId,
      name: pName.trim(),
      category: pCategory,
      price: Number(pPrice),
      originalPrice: Number(pOriginalPrice),
      rating: Number(pRating),
      reviews: Number(pReviews),
      badge: pBadge.trim(),
      desc: pDesc.trim(),
      features: pFeatures.split(',').map(f => f.trim()).filter(Boolean),
      previewSlug: pPreviewSlug.trim() || null,
      available: pAvailable,
      thumbnail: pThumbnail
    }

    addOrUpdateLocalProduct(payload)
    loadAllData()
    setShowProductModal(false)
    triggerToast(editingProduct ? 'Produk diperbarui!' : 'Produk baru ditambahkan!')
  }

  // ----------------------------------------------------
  // ORDER ACTIONS
  // ----------------------------------------------------
  const handleCreateOrder = () => {
    setEditingOrder(null)
    setOId('ORD-' + Math.floor(1000 + Math.random() * 9000))
    setOCustomerName('')
    setOCustomerPhone('')
    setOProductName(products[0]?.name || 'Adat Jawa Premium')
    setOOrderDate(new Date().toISOString().split('T')[0])
    setOStatus('Menunggu Pembayaran')
    setOTotalPrice(149000)
    setShowOrderModal(true)
  }

  const handleEditOrder = (order: OrderData) => {
    setEditingOrder(order)
    setOId(order.id)
    setOCustomerName(order.customerName)
    setOCustomerPhone(order.customerPhone)
    setOProductName(order.productName)
    setOOrderDate(order.orderDate)
    setOStatus(order.status)
    setOTotalPrice(order.totalPrice)
    setShowOrderModal(true)
  }

  const handleDeleteOrder = (id: string) => {
    if (window.confirm('Hapus data pesanan ini?')) {
      deleteLocalOrder(id)
      loadAllData()
      triggerToast('Pesanan berhasil dihapus!')
    }
  }

  const handleOrderFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!oCustomerName.trim()) return

    const payload: OrderData = {
      id: oId,
      customerName: oCustomerName.trim(),
      customerPhone: oCustomerPhone.trim(),
      productName: oProductName,
      orderDate: oOrderDate,
      status: oStatus,
      totalPrice: Number(oTotalPrice)
    }

    addOrUpdateLocalOrder(payload)
    loadAllData()
    setShowOrderModal(false)
    triggerToast(editingOrder ? 'Pesanan diperbarui!' : 'Pesanan baru ditambahkan!')
  }

  // format price helper
  const formatPrice = (price: number) => {
    return 'Rp ' + price.toLocaleString('id-ID')
  }

  // ----------------------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------------------
  if (!isLoggedIn) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center font-body px-4">
        <div className="bg-white border border-slate-200 p-8 rounded-lg w-full max-w-[400px] flex flex-col items-center">
          <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
            <span className="text-white font-heading font-bold text-xl">B</span>
          </div>
          <h1 className="font-heading text-xl text-stone-800 tracking-wider font-bold">Portal Admin Bimora</h1>
          <p className="font-body text-xs text-stone-400 mb-6 mt-1 text-center">Silakan masukkan kata sandi akses admin</p>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <div>
              <label className="block text-xs text-stone-500 mb-1.5 font-semibold">Kata Sandi</label>
              <div className="relative flex items-center">
                <IoLockClosedOutline className="absolute left-3 text-emerald-600 text-base pointer-events-none" />
                <input
                  type="password"
                  placeholder="Masukkan kata sandi (admin)"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-stone-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none rounded-lg text-xs text-stone-800 font-body"
                  required
                />
              </div>
            </div>

            {loginError && (
              <span className="text-[11px] text-red-500 font-medium text-center bg-red-50 py-1.5 px-3 rounded-lg border border-red-200">
                Sandi salah! Silakan coba lagi.
              </span>
            )}

            <button
              type="submit"
              className="mt-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-body text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              Masuk Dashboard
            </button>
          </form>

          <Link to="/" className="mt-6 text-xs text-stone-400 hover:text-emerald-600 transition-colors flex items-center gap-1">
            <IoChevronBackOutline /> Kembali ke Beranda
          </Link>
        </div>
      </div>
    )
  }

  // ----------------------------------------------------
  // RENDER SECTIONS
  // ----------------------------------------------------
  const renderDashboardTab = () => {
    const totalSales = orders
      .filter(o => o.status === 'Selesai')
      .reduce((sum, o) => sum + o.totalPrice, 0)
    const activeInvitesCount = invitations.filter(i => i.is_active).length

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-800 font-heading">Ringkasan Sistem</h1>
          <p className="text-xs text-stone-400 mt-1">Berikut adalah ikhtisar operasional platform Bimora Digital saat ini.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-stone-200 p-5 rounded-lg flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center text-xl">
              <IoWalletOutline />
            </div>
            <div>
              <p className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">Pendapatan Selesai</p>
              <h3 className="text-lg font-bold text-stone-800 mt-0.5">{formatPrice(totalSales)}</h3>
            </div>
          </div>

          <div className="bg-white border border-stone-200 p-5 rounded-lg flex items-center gap-4">
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center text-xl">
              <IoMailOpenOutline />
            </div>
            <div>
              <p className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">Undangan Aktif</p>
              <h3 className="text-lg font-bold text-stone-800 mt-0.5">{activeInvitesCount} / {invitations.length}</h3>
            </div>
          </div>

          <div className="bg-white border border-stone-200 p-5 rounded-lg flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center text-xl">
              <IoCartOutline />
            </div>
            <div>
              <p className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">Total Template Produk</p>
              <h3 className="text-lg font-bold text-stone-800 mt-0.5">{products.length} Desain</h3>
            </div>
          </div>

          <div className="bg-white border border-stone-200 p-5 rounded-lg flex items-center gap-4">
            <div className="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-lg flex items-center justify-center text-xl">
              <IoReceiptOutline />
            </div>
            <div>
              <p className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">Pesanan Diproses</p>
              <h3 className="text-lg font-bold text-stone-800 mt-0.5">
                {orders.filter(o => o.status === 'Diproses' || o.status === 'Menunggu Pembayaran').length} Pesanan
              </h3>
            </div>
          </div>
        </div>

        {/* Recent Orders List */}
        <div className="bg-white border border-stone-200 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-stone-100 flex justify-between items-center">
            <h3 className="font-heading font-semibold text-stone-800 text-sm">Pesanan Terbaru</h3>
            <button 
              onClick={() => setActiveTab('pesanan')}
              className="text-xs text-emerald-600 font-semibold hover:underline"
            >
              Lihat Semua
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-stone-500 uppercase text-[10px] tracking-wider border-b border-stone-100">
                  <th className="p-4 font-semibold">ID Pesanan</th>
                  <th className="p-4 font-semibold">Nama Klien</th>
                  <th className="p-4 font-semibold">Template</th>
                  <th className="p-4 font-semibold">Tanggal</th>
                  <th className="p-4 font-semibold">Total</th>
                  <th className="p-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {orders.slice(0, 5).map(o => (
                  <tr key={o.id} className="hover:bg-slate-50/55">
                    <td className="p-4 font-mono font-bold text-emerald-600">{o.id}</td>
                    <td className="p-4 font-semibold">{o.customerName}</td>
                    <td className="p-4">{o.productName}</td>
                    <td className="p-4">{o.orderDate}</td>
                    <td className="p-4 font-bold">{formatPrice(o.totalPrice)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        o.status === 'Selesai' ? 'bg-green-50 text-green-700' :
                        o.status === 'Diproses' ? 'bg-emerald-50 text-emerald-700' :
                        o.status === 'Dibatalkan' ? 'bg-red-50 text-red-700' :
                        'bg-yellow-50 text-yellow-700'
                      }`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  const renderProdukTab = () => {
    const filteredProds = products.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-800 font-heading">Manajemen Produk / Template</h1>
            <p className="text-xs text-stone-400 mt-1">Atur harga, deskripsi, preview, dan visibilitas katalog produk Anda.</p>
          </div>
          <button
            onClick={handleCreateProduct}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <IoAddOutline className="text-base" /> Tambah Produk Baru
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white border border-stone-200 p-4 rounded-lg flex items-center">
          <div className="relative flex-grow max-w-md">
            <IoSearchOutline className="absolute left-3 top-2.5 text-stone-400 text-base" />
            <input
              type="text"
              placeholder="Cari nama atau kategori produk..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs"
            />
          </div>
        </div>

        {/* Table List */}
        <div className="bg-white border border-stone-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-stone-500 uppercase text-[10px] tracking-wider border-b border-stone-100">
                  <th className="p-4 font-semibold">Produk</th>
                  <th className="p-4 font-semibold">Kategori</th>
                  <th className="p-4 font-semibold">Harga</th>
                  <th className="p-4 font-semibold">Coretan</th>
                  <th className="p-4 font-semibold">Preview</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {filteredProds.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/55">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-9 rounded bg-slate-900 border border-stone-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {p.thumbnail ? (
                            <img src={p.thumbnail} className="w-full h-full object-cover" alt={p.name} />
                          ) : (
                            <span className="text-[7px] text-stone-400 font-semibold uppercase">No Image</span>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-stone-800">{p.name}</div>
                          <div className="text-[10px] text-stone-400 mt-0.5 line-clamp-1">{p.desc}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-stone-600 text-[10px]">
                        {p.category}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-emerald-600">{formatPrice(p.price)}</td>
                    <td className="p-4 text-stone-400 line-through">{formatPrice(p.originalPrice)}</td>
                    <td className="p-4">
                      {p.previewSlug ? (
                        p.previewSlug.startsWith('http') || p.previewSlug.startsWith('/') ? (
                          <a href={p.previewSlug} target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline">
                            {p.previewSlug}
                          </a>
                        ) : (
                          <a href={`/undangan/${p.previewSlug}`} target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline">
                            /{p.previewSlug}
                          </a>
                        )
                      ) : (
                        <span className="text-stone-300">-</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${p.available ? 'bg-green-50 text-green-700' : 'bg-stone-100 text-stone-400'}`}>
                        {p.available ? 'Tersedia' : 'Segera Hadir'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEditProduct(p)}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                          title="Edit"
                        >
                          <IoCreateOutline className="text-base" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Hapus"
                        >
                          <IoTrashOutline className="text-base" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredProds.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-stone-400">
                      Tidak ada produk ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  const renderPesananTab = () => {
    const filteredOrders = orders.filter(o =>
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.productName.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-800 font-heading">Manajemen Pesanan</h1>
            <p className="text-xs text-stone-400 mt-1">Kelola dan update status pemesanan template undangan dari klien.</p>
          </div>
          <button
            onClick={handleCreateOrder}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <IoAddOutline className="text-base" /> Tambah Pesanan Baru
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white border border-stone-200 p-4 rounded-lg flex items-center">
          <div className="relative flex-grow max-w-md">
            <IoSearchOutline className="absolute left-3 top-2.5 text-stone-400 text-base" />
            <input
              type="text"
              placeholder="Cari ID, Klien, atau Template..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs"
            />
          </div>
        </div>

        {/* Table List */}
        <div className="bg-white border border-stone-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-stone-500 uppercase text-[10px] tracking-wider border-b border-stone-100">
                  <th className="p-4 font-semibold">ID</th>
                  <th className="p-4 font-semibold">Klien / Kontak</th>
                  <th className="p-4 font-semibold">Template</th>
                  <th className="p-4 font-semibold">Tanggal Pesan</th>
                  <th className="p-4 font-semibold">Total Biaya</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {filteredOrders.map(o => (
                  <tr key={o.id} className="hover:bg-slate-50/55">
                    <td className="p-4 font-mono font-bold text-emerald-600">{o.id}</td>
                    <td className="p-4">
                      <div className="font-semibold text-stone-800">{o.customerName}</div>
                      <div className="text-[10px] text-stone-400 mt-0.5">{o.customerPhone}</div>
                    </td>
                    <td className="p-4">{o.productName}</td>
                    <td className="p-4">{o.orderDate}</td>
                    <td className="p-4 font-bold">{formatPrice(o.totalPrice)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        o.status === 'Selesai' ? 'bg-green-50 text-green-700' :
                        o.status === 'Diproses' ? 'bg-emerald-50 text-emerald-700' :
                        o.status === 'Dibatalkan' ? 'bg-red-50 text-red-700' :
                        'bg-yellow-50 text-yellow-700'
                      }`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEditOrder(o)}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                          title="Edit Status"
                        >
                          <IoCreateOutline className="text-base" />
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(o.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Hapus"
                        >
                          <IoTrashOutline className="text-base" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-stone-400">
                      Tidak ada pesanan ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  const renderTemplateTab = () => {
    const filteredInvites = invitations.filter(i =>
      i.groom_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.bride_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.slug.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-800 font-heading">Manajemen Template Undangan Klien</h1>
            <p className="text-xs text-stone-400 mt-1">Buat, edit, dan konfigurasi isi undangan digital (mempelai, peta, lagu, dll) milik klien.</p>
          </div>
          <button
            onClick={handleCreateInvitation}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <IoAddOutline className="text-base" /> Tambah Undangan Baru
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white border border-stone-200 p-4 rounded-lg flex items-center">
          <div className="relative flex-grow max-w-md">
            <IoSearchOutline className="absolute left-3 top-2.5 text-stone-400 text-base" />
            <input
              type="text"
              placeholder="Cari nama mempelai atau slug..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs"
            />
          </div>
        </div>

        {/* Table List */}
        <div className="bg-white border border-stone-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-stone-500 uppercase text-[10px] tracking-wider border-b border-stone-100">
                  <th className="p-4 font-semibold">Pasangan</th>
                  <th className="p-4 font-semibold">Tautan URL</th>
                  <th className="p-4 font-semibold">Tipe Template</th>
                  <th className="p-4 font-semibold">Tanggal Nikah</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {filteredInvites.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/55">
                    <td className="p-4 font-semibold text-stone-800">
                      {item.groom_nickname} &amp; {item.bride_nickname}
                    </td>
                    <td className="p-4 font-mono">
                      <a
                        href={`/undangan/${item.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-800 font-medium hover:underline"
                      >
                        /undangan/{item.slug}
                      </a>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded text-[10px] uppercase font-semibold">
                        {item.template_type}
                      </span>
                    </td>
                    <td className="p-4">{item.wedding_date}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${item.is_active ? 'bg-green-50 text-green-700' : 'bg-stone-100 text-stone-400'}`}>
                        {item.is_active ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-1.5">
                        <a
                          href={`/undangan/${item.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-stone-500 hover:text-emerald-600 hover:bg-slate-100 rounded transition-colors"
                          title="Lihat Website"
                        >
                          <IoEyeOutline className="text-base" />
                        </a>
                        <button
                          onClick={() => handleEditInvitation(item)}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                          title="Edit"
                        >
                          <IoCreateOutline className="text-base" />
                        </button>
                        <button
                          onClick={() => handleDeleteInvitation(item.slug)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Hapus"
                        >
                          <IoTrashOutline className="text-base" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredInvites.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-stone-400">
                      Belum ada undangan klien.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 text-stone-800 min-h-screen font-body flex flex-col md:flex-row">
      
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden md:flex w-64 bg-slate-950 text-slate-300 flex-col shrink-0">
        <div className="p-5 border-b border-slate-900 flex items-center gap-2.5">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-heading font-bold text-sm">B</span>
          </div>
          <span className="font-heading text-base font-bold tracking-wider text-white">BIMORA <span className="text-emerald-500">ADMIN</span></span>
        </div>

        <nav className="p-4 flex-grow space-y-1">
          <button
            onClick={() => { setActiveTab('dashboard'); setSearchQuery('') }}
            className={`w-full py-2.5 px-4 rounded-lg flex items-center gap-3 text-xs font-semibold tracking-wide transition-colors ${
              activeTab === 'dashboard' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-900 hover:text-white'
            }`}
          >
            <IoHomeOutline className="text-base" /> Dashboard
          </button>
          
          <button
            onClick={() => { setActiveTab('produk'); setSearchQuery('') }}
            className={`w-full py-2.5 px-4 rounded-lg flex items-center gap-3 text-xs font-semibold tracking-wide transition-colors ${
              activeTab === 'produk' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-900 hover:text-white'
            }`}
          >
            <IoCartOutline className="text-base" /> Produk / Katalog
          </button>

          <button
            onClick={() => { setActiveTab('pesanan'); setSearchQuery('') }}
            className={`w-full py-2.5 px-4 rounded-lg flex items-center gap-3 text-xs font-semibold tracking-wide transition-colors ${
              activeTab === 'pesanan' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-900 hover:text-white'
            }`}
          >
            <IoReceiptOutline className="text-base" /> Pesanan
          </button>

          <button
            onClick={() => { setActiveTab('template'); setSearchQuery('') }}
            className={`w-full py-2.5 px-4 rounded-lg flex items-center gap-3 text-xs font-semibold tracking-wide transition-colors ${
              activeTab === 'template' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-900 hover:text-white'
            }`}
          >
            <IoMailOpenOutline className="text-base" /> Template Undangan
          </button>
        </nav>

        <div className="p-4 border-t border-slate-900">
          <a href="/" target="_blank" rel="noreferrer" className="block text-center text-[10px] uppercase font-bold tracking-wider py-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors mb-2">
            Lihat Website Utama
          </a>
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-950/20 border border-red-900/30 text-red-400 hover:bg-red-900 hover:text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <IoLogOutOutline className="text-base" /> Keluar
          </button>
        </div>
      </aside>

      {/* HEADER (Mobile & Tablet) */}
      <header className="md:hidden bg-slate-950 border-b border-slate-900 text-white py-3 px-4 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-heading font-bold text-xs">B</span>
          </div>
          <span className="font-heading text-sm font-bold tracking-wide">BIMORA ADMIN</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1 text-slate-400 hover:text-white text-2xl"
        >
          <IoMenuOutline />
        </button>
      </header>

      {/* MOBILE MENU NAV */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-900 text-slate-300 flex flex-col p-4 space-y-2 sticky top-[53px] z-30">
          <button
            onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); setSearchQuery('') }}
            className={`py-2 px-3 rounded-lg flex items-center gap-2 text-xs ${activeTab === 'dashboard' ? 'bg-emerald-600 text-white' : ''}`}
          >
            <IoHomeOutline /> Dashboard
          </button>
          <button
            onClick={() => { setActiveTab('produk'); setMobileMenuOpen(false); setSearchQuery('') }}
            className={`py-2 px-3 rounded-lg flex items-center gap-2 text-xs ${activeTab === 'produk' ? 'bg-emerald-600 text-white' : ''}`}
          >
            <IoCartOutline /> Produk / Katalog
          </button>
          <button
            onClick={() => { setActiveTab('pesanan'); setMobileMenuOpen(false); setSearchQuery('') }}
            className={`py-2 px-3 rounded-lg flex items-center gap-2 text-xs ${activeTab === 'pesanan' ? 'bg-emerald-600 text-white' : ''}`}
          >
            <IoReceiptOutline /> Pesanan
          </button>
          <button
            onClick={() => { setActiveTab('template'); setMobileMenuOpen(false); setSearchQuery('') }}
            className={`py-2 px-3 rounded-lg flex items-center gap-2 text-xs ${activeTab === 'template' ? 'bg-emerald-600 text-white' : ''}`}
          >
            <IoMailOpenOutline /> Template Undangan
          </button>
          <div className="pt-2 border-t border-slate-900 flex justify-between gap-2">
            <a href="/" target="_blank" className="flex-grow text-center py-2 bg-slate-900 text-[10px] font-bold rounded-lg text-slate-400">Web Utama</a>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-950 text-red-400 text-xs font-bold rounded-lg">Keluar</button>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="flex-grow p-4 sm:p-8 overflow-y-auto max-h-screen">
        {activeTab === 'dashboard' && renderDashboardTab()}
        {activeTab === 'produk' && renderProdukTab()}
        {activeTab === 'pesanan' && renderPesananTab()}
        {activeTab === 'template' && renderTemplateTab()}
      </main>

      {/* ==================================================== */}
      {/* MODAL 1: TEMPLATE INVITATION FORM */}
      {/* ==================================================== */}
      {showInvitationModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto no-scrollbar">
          <div className="bg-white border border-stone-200 rounded-lg w-full max-w-[820px] relative flex flex-col max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="border-b border-stone-200 p-5 flex justify-between items-center bg-emerald-50">
              <h2 className="font-heading text-base text-emerald-900 font-bold">
                {editingInvitation ? 'Edit Data Undangan Klien' : 'Buat Undangan Klien Baru'}
              </h2>
              <button onClick={() => setShowInvitationModal(false)} className="text-xl text-stone-400 hover:text-stone-700 cursor-pointer">
                <IoCloseOutline />
              </button>
            </div>

            {/* Scrollable Body */}
            <form id="invitation-form" onSubmit={handleInvitationFormSubmit} className="overflow-y-auto p-6 flex-grow flex flex-col gap-6 no-scrollbar bg-white">
              {/* SYSTEM CONFIG */}
              <div>
                <h3 className="font-heading text-xs text-emerald-600 tracking-wide border-b border-stone-200 pb-1.5 mb-4 uppercase">1. Pengaturan Tautan &amp; Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] text-stone-500 mb-1 font-semibold">SLUG URL UNDANGAN</label>
                    <input
                      type="text"
                      placeholder="contoh: bimantara-clara"
                      value={slug}
                      onChange={e => setSlug(e.target.value)}
                      disabled={!!editingInvitation}
                      className="w-full px-3 py-2 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs disabled:opacity-50 font-mono"
                      required
                    />
                    <span className="text-[9px] text-stone-400 mt-1 block">*Hanya huruf kecil, angka, dan strip (-)</span>
                  </div>

                  <div>
                    <label className="block text-[10px] text-stone-500 mb-1 font-semibold">PILIHAN DESAIN TEMPLATE</label>
                    <select
                      value={templateType}
                      onChange={e => setTemplateType(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs"
                    >
                      <option value="jawa">Adat Jawa Premium</option>
                      <option value="modern" disabled>Modern Emerald (Coming Soon)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-stone-500 mb-1 font-semibold">STATUS UNDANGAN</label>
                    <select
                      value={isInvitationActive ? 'aktif' : 'nonaktif'}
                      onChange={e => setIsInvitationActive(e.target.value === 'aktif')}
                      className="w-full px-3 py-2 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs"
                    >
                      <option value="aktif">Aktif (Dapat Diakses)</option>
                      <option value="nonaktif">Nonaktif (Masa Aktif Habis)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* MEMPELAI DATA */}
              <div>
                <h3 className="font-heading text-xs text-emerald-600 tracking-wide border-b border-stone-200 pb-1.5 mb-4 uppercase">2. Informasi Pengantin</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pria */}
                  <div className="border border-stone-100 p-4 rounded-lg bg-slate-50/50 flex flex-col gap-3">
                    <h4 className="font-heading text-xs text-emerald-700 font-bold uppercase mb-1">Mempelai Pria</h4>
                    <div>
                      <label className="block text-[9px] text-stone-500 mb-1">NAMA PANGGILAN</label>
                      <input
                        type="text"
                        placeholder="contoh: Bimantara"
                        value={groomNickname}
                        onChange={e => setGroomNickname(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] text-stone-500 mb-1">NAMA LENGKAP & GELAR</label>
                      <input
                        type="text"
                        placeholder="contoh: Bimantara Al Rasyid, S.Kom."
                        value={groomName}
                        onChange={e => setGroomName(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] text-stone-500 mb-1">KETERANGAN ORANG TUA</label>
                      <textarea
                        rows={2}
                        placeholder="contoh: Putra Pertama dari Bapak H. Ahmad & Ibu Hj. Siti"
                        value={groomParents}
                        onChange={e => setGroomParents(e.target.value)}
                        className="w-full px-3 py-1 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs resize-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] text-stone-500 mb-1">FOTO PORTRAIT PRIA</label>
                      <div className="flex items-center gap-3">
                        {groomPhoto && <img src={groomPhoto} className="w-12 h-12 object-cover rounded-lg border border-stone-200" alt="Groom" />}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => handleFileUpload(e, setGroomPhoto)}
                          className="text-[10px] file:py-1 file:px-2 file:border-0 file:bg-emerald-50 file:text-emerald-700 file:rounded file:font-bold hover:file:bg-emerald-100 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Wanita */}
                  <div className="border border-stone-100 p-4 rounded-lg bg-slate-50/50 flex flex-col gap-3">
                    <h4 className="font-heading text-xs text-emerald-700 font-bold uppercase mb-1">Mempelai Wanita</h4>
                    <div>
                      <label className="block text-[9px] text-stone-500 mb-1">NAMA PANGGILAN</label>
                      <input
                        type="text"
                        placeholder="contoh: Claraveliana"
                        value={brideNickname}
                        onChange={e => setBrideNickname(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] text-stone-500 mb-1">NAMA LENGKAP & GELAR</label>
                      <input
                        type="text"
                        placeholder="contoh: Claraveliana Putri, S.Pd."
                        value={brideName}
                        onChange={e => setBrideName(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] text-stone-500 mb-1">KETERANGAN ORANG TUA</label>
                      <textarea
                        rows={2}
                        placeholder="contoh: Putri Kedua dari Bapak H. Bambang & Ibu Hj. Ratna"
                        value={brideParents}
                        onChange={e => setBrideParents(e.target.value)}
                        className="w-full px-3 py-1 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs resize-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] text-stone-500 mb-1">FOTO PORTRAIT WANITA</label>
                      <div className="flex items-center gap-3">
                        {bridePhoto && <img src={bridePhoto} className="w-12 h-12 object-cover rounded-lg border border-stone-200" alt="Bride" />}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => handleFileUpload(e, setBridePhoto)}
                          className="text-[10px] file:py-1 file:px-2 file:border-0 file:bg-emerald-50 file:text-emerald-700 file:rounded file:font-bold hover:file:bg-emerald-100 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prewedding Photo */}
                <div className="border border-stone-100 p-4 rounded-lg bg-slate-50/50 mt-4 flex flex-col md:flex-row gap-4 items-center">
                  {couplePhoto && <img src={couplePhoto} className="w-32 h-20 object-cover rounded-lg border border-stone-200" alt="Couple" />}
                  <div className="flex-grow">
                    <label className="block text-[9px] text-stone-500 mb-1">FOTO BERSAMA / SAMPUL UTAMA</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleFileUpload(e, setCouplePhoto)}
                      className="text-[10px] file:py-1 file:px-2.5 file:border-0 file:bg-emerald-50 file:text-emerald-700 file:rounded file:font-bold hover:file:bg-emerald-100 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* LOGISTICS & MAPS */}
              <div>
                <h3 className="font-heading text-xs text-emerald-600 tracking-wide border-b border-stone-200 pb-1.5 mb-4 uppercase">3. Waktu &amp; Lokasi Acara</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] text-stone-500 mb-1">TANGGAL COUNTDOWN HARI H</label>
                    <input
                      type="date"
                      value={weddingDate}
                      onChange={e => setWeddingDate(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-500 mb-1">WAKTU AKAD NIKAH</label>
                    <input
                      type="text"
                      placeholder="contoh: 08:00 - 10:00 WIB"
                      value={akadTime}
                      onChange={e => setAkadTime(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-500 mb-1">WAKTU RESEPSI</label>
                    <input
                      type="text"
                      placeholder="contoh: 11:00 - 14:00 WIB"
                      value={resepsiTime}
                      onChange={e => setResepsiTime(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-stone-500 mb-1">NAMA LOKASI ACARA</label>
                    <input
                      type="text"
                      placeholder="contoh: Gedung Graha Saba Buana"
                      value={locationName}
                      onChange={e => setLocationName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-500 mb-1">ALAMAT LENGKAP LOKASI</label>
                    <input
                      type="text"
                      placeholder="Alamat jalan lengkap..."
                      value={locationAddress}
                      onChange={e => setLocationAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-500 mb-1">GOOGLE MAPS EMBED SRC (IFRAME URL)</label>
                    <input
                      type="text"
                      placeholder="https://www.google.com/maps/embed?pb=..."
                      value={mapsEmbed}
                      onChange={e => setMapsEmbed(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-500 mb-1">GOOGLE MAPS SHARE LINK (DIRECT URL)</label>
                    <input
                      type="text"
                      placeholder="https://maps.app.goo.gl/..."
                      value={mapsLink}
                      onChange={e => setMapsLink(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs font-mono"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* PERJALANAN CINTA */}
              <div>
                <div className="flex justify-between items-center border-b border-stone-200 pb-1.5 mb-4">
                  <h3 className="font-heading text-xs text-emerald-600 tracking-wide uppercase">4. Kisah Perjalanan (Timeline)</h3>
                  <button
                    type="button"
                    onClick={() => setStories([...stories, { year: '', title: '', desc: '' }])}
                    className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-[9px] font-bold uppercase rounded-lg transition-colors"
                  >
                    Tambah Momen
                  </button>
                </div>
                <div className="space-y-3">
                  {stories.map((story, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-50/50 p-3 border border-stone-100 rounded-lg">
                      <div>
                        <label className="block text-[9px] text-stone-400 mb-1">TAHUN</label>
                        <input
                          type="text"
                          placeholder="2022"
                          value={story.year}
                          onChange={e => {
                            const updated = [...stories]
                            updated[idx].year = e.target.value
                            setStories(updated)
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] text-stone-400 mb-1">JUDUL MOMEN</label>
                        <input
                          type="text"
                          placeholder="Pertama Bertemu"
                          value={story.title}
                          onChange={e => {
                            const updated = [...stories]
                            updated[idx].title = e.target.value
                            setStories(updated)
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs"
                          required
                        />
                      </div>
                      <div className="md:col-span-2 flex gap-3 items-end">
                        <div className="flex-grow">
                          <label className="block text-[9px] text-stone-400 mb-1">DESKRIPSI KISAH</label>
                          <textarea
                            rows={1}
                            placeholder="Ceritakan momen ini..."
                            value={story.desc}
                            onChange={e => {
                              const updated = [...stories]
                              updated[idx].desc = e.target.value
                              setStories(updated)
                            }}
                            className="w-full px-3 py-1 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs resize-none"
                            required
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setStories(stories.filter((_, i) => i !== idx))}
                          className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded border border-red-200 cursor-pointer"
                        >
                          <IoTrashOutline />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TANDA KASIH / BANK */}
              <div>
                <div className="flex justify-between items-center border-b border-stone-200 pb-1.5 mb-4">
                  <h3 className="font-heading text-xs text-emerald-600 tracking-wide uppercase">5. Rekening Hadiah (Kado Digital)</h3>
                  <button
                    type="button"
                    onClick={() => setGifts([...gifts, { bank: '', number: '', name: '' }])}
                    className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-[9px] font-bold uppercase rounded-lg transition-colors"
                  >
                    Tambah Rekening
                  </button>
                </div>
                <div className="space-y-3">
                  {gifts.map((gift, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-50/50 p-3 border border-stone-100 rounded-lg items-end">
                      <div>
                        <label className="block text-[9px] text-stone-400 mb-1">BANK / DOMPET</label>
                        <input
                          type="text"
                          placeholder="BCA / Mandiri"
                          value={gift.bank}
                          onChange={e => {
                            const updated = [...gifts]
                            updated[idx].bank = e.target.value
                            setGifts(updated)
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] text-stone-400 mb-1">NOMOR REKENING</label>
                        <input
                          type="text"
                          placeholder="123456789"
                          value={gift.number}
                          onChange={e => {
                            const updated = [...gifts]
                            updated[idx].number = e.target.value
                            setGifts(updated)
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] text-stone-400 mb-1">ATAS NAMA</label>
                        <input
                          type="text"
                          placeholder="Nama pemilik..."
                          value={gift.name}
                          onChange={e => {
                            const updated = [...gifts]
                            updated[idx].name = e.target.value
                            setGifts(updated)
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setGifts(gifts.filter((_, i) => i !== idx))}
                        className="py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded border border-red-200 flex items-center justify-center cursor-pointer"
                      >
                        <IoTrashOutline className="text-base" /> Hapus
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* BACKGROUND MUSIC */}
              <div>
                <h3 className="font-heading text-xs text-emerald-600 tracking-wide border-b border-stone-200 pb-1.5 mb-4 uppercase">6. Musik Latar Belakang (MP3)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-stone-500 mb-1 font-semibold font-body">UNGGAH FILE MP3</label>
                    <input
                      type="file"
                      accept="audio/mp3,audio/mpeg"
                      onChange={handleMusicUpload}
                      className="w-full text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-500 mb-1 font-semibold font-body">URL FILE MUSIC</label>
                    <input
                      type="text"
                      placeholder="/music/jawa.mp3"
                      value={musicUrl.startsWith('data:audio') ? '[Musik Terunggah]' : musicUrl}
                      onChange={e => setMusicUrl(e.target.value)}
                      disabled={musicUrl.startsWith('data:audio')}
                      className="w-full px-3 py-2 bg-white border border-stone-200 outline-none focus:border-emerald-500 rounded-lg text-xs font-mono"
                    />
                    {musicUrl.startsWith('data:audio') && (
                      <button
                        type="button"
                        onClick={() => setMusicUrl('/music/jawa.mp3')}
                        className="text-[10px] text-red-500 hover:underline mt-1 font-semibold cursor-pointer"
                      >
                        Reset ke Musik Default
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* ALBUM PHOTO GALLERY */}
              <div>
                <div className="flex justify-between items-center border-b border-stone-200 pb-1.5 mb-4">
                  <h3 className="font-heading text-xs text-emerald-600 tracking-wide uppercase font-body">7. Galeri Foto Album ({gallery.length}/6 foto)</h3>
                  {gallery.length < 6 && (
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryUpload}
                      className="text-[10px] file:py-1 file:px-2.5 file:border-0 file:bg-emerald-50 file:text-emerald-700 file:rounded file:font-semibold hover:file:bg-emerald-100 cursor-pointer"
                    />
                  )}
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {gallery.map((img, idx) => (
                    <div key={idx} className="relative rounded-lg overflow-hidden aspect-square border border-stone-200 group bg-stone-100">
                      <img src={img} className="w-full h-full object-cover" alt="" />
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(idx)}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-red-400 font-semibold text-xs hover:text-red-500 cursor-pointer gap-1"
                      >
                        <IoTrashOutline className="text-lg" />
                        Hapus
                      </button>
                    </div>
                  ))}
                  {Array.from({ length: 6 - gallery.length }).map((_, i) => (
                    <div key={i} className="rounded-lg border border-dashed border-stone-200 bg-slate-50/50 aspect-square flex items-center justify-center text-[10px] text-stone-300 font-medium select-none uppercase tracking-widest">
                      Kosong
                    </div>
                  ))}
                </div>
              </div>
            </form>

            {/* Footer */}
            <div className="border-t border-stone-200 p-5 bg-emerald-50 flex justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setShowInvitationModal(false)}
                className="px-5 py-2.5 bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                form="invitation-form"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <IoSaveOutline className="text-sm" /> Simpan Undangan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 2: PRODUCT CRUD FORM */}
      {/* ==================================================== */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-lg w-full max-w-lg relative flex flex-col max-h-[90vh] overflow-hidden">
            <div className="border-b border-stone-200 p-4 flex justify-between items-center bg-emerald-50 shrink-0">
              <h2 className="font-heading text-sm text-emerald-900 font-bold">
                {editingProduct ? 'Edit Informasi Produk' : 'Tambah Produk Baru'}
              </h2>
              <button onClick={() => setShowProductModal(false)} className="text-lg text-stone-400 hover:text-stone-700 cursor-pointer">
                <IoCloseOutline />
              </button>
            </div>

            <form onSubmit={handleProductFormSubmit} className="p-5 overflow-y-auto flex-grow flex flex-col gap-4 no-scrollbar">
              {/* Product Thumbnail Uploader with Drag-to-Crop */}
              <div className="border border-stone-100 p-4 rounded-lg bg-slate-50/50 flex flex-col gap-3">
                <label className="block text-xs text-stone-500 font-semibold uppercase">Thumbnail Produk / Template</label>
                
                {rawProductImage ? (
                  /* Cropper Viewport */
                  <div className="flex flex-col gap-3">
                    <div 
                      ref={cropperContainerRef}
                      className="relative w-full max-w-[400px] aspect-[16/10] mx-auto bg-slate-900 border border-stone-300 rounded-lg overflow-hidden cursor-move select-none"
                      onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
                      onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
                      onMouseUp={handleDragEnd}
                      onMouseLeave={handleDragEnd}
                      onTouchStart={(e) => {
                        if (e.touches[0]) handleDragStart(e.touches[0].clientX, e.touches[0].clientY)
                      }}
                      onTouchMove={(e) => {
                        if (e.touches[0]) handleDragMove(e.touches[0].clientX, e.touches[0].clientY)
                      }}
                      onTouchEnd={handleDragEnd}
                    >
                      {/* Guides / Crop Overlay */}
                      <div className="absolute inset-0 border-2 border-dashed border-white/40 pointer-events-none z-10 m-3" />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <span className="text-[10px] bg-black/60 text-white py-1 px-2.5 rounded font-medium">Seret untuk Geser Gambar</span>
                      </div>

                      <img
                        src={rawProductImage}
                        alt="Raw preview"
                        onLoad={handleImageLoad}
                        draggable={false}
                        className="max-w-none origin-center pointer-events-none absolute"
                        style={{
                          width: imageBaseDims ? `${imageBaseDims.w}px` : 'auto',
                          height: imageBaseDims ? `${imageBaseDims.h}px` : 'auto',
                          left: '50%',
                          top: '50%',
                          transform: `translate(calc(-50% + ${cropX}px), calc(-50% + ${cropY}px)) scale(${cropScale})`,
                          transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                        }}
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-stone-400 font-semibold font-body">ZOOM:</span>
                      <input 
                        type="range"
                        min="1"
                        max="3.5"
                        step="0.05"
                        value={cropScale}
                        onChange={(e) => setCropScale(Number(e.target.value))}
                        className="flex-grow h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      />
                      <span className="text-xs font-mono font-bold text-stone-600">{Math.round(cropScale * 100)}%</span>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setRawProductImage(null)
                          setImageBaseDims(null)
                          setCropScale(1)
                          setCropX(0)
                          setCropY(0)
                        }}
                        className="px-3 py-1.5 border border-stone-200 text-stone-600 rounded-lg text-xs hover:bg-stone-100 font-semibold cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        onClick={handleCropProductImage}
                        className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 cursor-pointer"
                      >
                        Potong & Simpan
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Thumbnail Preview & Upload Triggers */
                  <div className="flex items-center gap-4">
                    {pThumbnail ? (
                      <div className="relative w-28 h-18 rounded-lg overflow-hidden border border-stone-200 bg-slate-900 group">
                        <img src={pThumbnail} className="w-full h-full object-cover" alt="Thumbnail Preview" />
                        <button
                          type="button"
                          onClick={() => setPThumbnail('')}
                          className="absolute inset-0 bg-red-600/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                        >
                          Hapus
                        </button>
                      </div>
                    ) : (
                      <div className="w-28 h-18 rounded-lg border border-dashed border-stone-300 bg-white flex flex-col items-center justify-center text-[10px] text-stone-400 font-medium select-none uppercase tracking-widest">
                        Kosong
                      </div>
                    )}
                    
                    <div className="flex flex-col gap-1.5">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onloadend = () => {
                              setRawProductImage(reader.result as string)
                              setCropScale(1)
                              setCropX(0)
                              setCropY(0)
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                        className="text-xs file:py-1 file:px-2.5 file:border-0 file:bg-emerald-50 file:text-emerald-700 file:rounded file:font-semibold hover:file:bg-emerald-100 cursor-pointer"
                      />
                      <span className="text-[9px] text-stone-400 font-medium leading-normal">Unggah gambar rekomendasi rasio landscape 16:10.</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs text-stone-500 mb-1 font-semibold">Nama Template / Produk</label>
                <input
                  type="text"
                  value={pName}
                  onChange={e => setPName(e.target.value)}
                  placeholder="Contoh: Adat Jawa Premium - Megah"
                  className="w-full px-3 py-2 border border-stone-200 focus:border-emerald-500 outline-none rounded-lg text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-stone-500 mb-1 font-semibold">Kategori</label>
                  <select
                    value={pCategory}
                    onChange={e => setPCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-200 focus:border-emerald-500 outline-none rounded-lg text-xs"
                  >
                    <option value="Adat Jawa">Adat Jawa</option>
                    <option value="Modern">Modern</option>
                    <option value="Islami">Islami</option>
                    <option value="Sunda">Sunda</option>
                    <option value="Bali">Bali</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-stone-500 mb-1 font-semibold">Label Badge (Opsional)</label>
                  <input
                    type="text"
                    value={pBadge}
                    onChange={e => setPBadge(e.target.value)}
                    placeholder="Contoh: Terlaris / Promo"
                    className="w-full px-3 py-2 border border-stone-200 focus:border-emerald-500 outline-none rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-stone-500 mb-1 font-semibold">Harga Jual (Rp)</label>
                  <input
                    type="number"
                    value={pPrice}
                    onChange={e => setPPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-200 focus:border-emerald-500 outline-none rounded-lg text-xs font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-500 mb-1 font-semibold">Harga Coret (Rp)</label>
                  <input
                    type="number"
                    value={pOriginalPrice}
                    onChange={e => setPOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-200 focus:border-emerald-500 outline-none rounded-lg text-xs font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-stone-500 mb-1 font-semibold">Tautan URL Preview</label>
                  <input
                    type="text"
                    value={pPreviewSlug}
                    onChange={e => setPPreviewSlug(e.target.value)}
                    placeholder="Contoh: bimantara-clara"
                    className="w-full px-3 py-2 border border-stone-200 focus:border-emerald-500 outline-none rounded-lg text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-500 mb-1 font-semibold">Ketersediaan Produk</label>
                  <select
                    value={pAvailable ? 'tersedia' : 'tidak'}
                    onChange={e => setPAvailable(e.target.value === 'tersedia')}
                    className="w-full px-3 py-2 border border-stone-200 focus:border-emerald-500 outline-none rounded-lg text-xs"
                  >
                    <option value="tersedia">Tersedia</option>
                    <option value="tidak">Segera Hadir / Kosong</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-stone-500 mb-1 font-semibold">Deskripsi Singkat</label>
                <textarea
                  rows={3}
                  value={pDesc}
                  onChange={e => setPDesc(e.target.value)}
                  placeholder="Tuliskan deskripsi singkat mengenai desain template..."
                  className="w-full px-3 py-2 border border-stone-200 focus:border-emerald-500 outline-none rounded-lg text-xs resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-stone-500 mb-1 font-semibold">Fitur Utama (Pisahkan dengan tanda Koma)</label>
                <input
                  type="text"
                  value={pFeatures}
                  onChange={e => setPFeatures(e.target.value)}
                  placeholder="Countdown, Galeri Foto, Google Maps, RSVP, Backsound"
                  className="w-full px-3 py-2 border border-stone-200 focus:border-emerald-500 outline-none rounded-lg text-xs"
                />
              </div>

              <div className="mt-4 flex justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 border border-stone-200 text-stone-600 text-xs font-semibold rounded-lg hover:bg-stone-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 3: ORDER CRUD FORM */}
      {/* ==================================================== */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-lg w-full max-w-md relative flex flex-col max-h-[90vh] overflow-hidden">
            <div className="border-b border-stone-200 p-4 flex justify-between items-center bg-emerald-50 shrink-0">
              <h2 className="font-heading text-sm text-emerald-900 font-bold">
                {editingOrder ? 'Update Status Pesanan' : 'Tambah Pesanan Baru'}
              </h2>
              <button onClick={() => setShowOrderModal(false)} className="text-lg text-stone-400 hover:text-stone-700 cursor-pointer">
                <IoCloseOutline />
              </button>
            </div>

            <form onSubmit={handleOrderFormSubmit} className="p-5 overflow-y-auto flex-grow flex flex-col gap-4 no-scrollbar">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-stone-500 mb-1 font-semibold">ID Pesanan</label>
                  <input
                    type="text"
                    value={oId}
                    onChange={e => setOId(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-200 bg-stone-50 outline-none rounded-lg text-xs font-mono font-bold text-stone-600"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-xs text-stone-500 mb-1 font-semibold">Tanggal Pesan</label>
                  <input
                    type="date"
                    value={oOrderDate}
                    onChange={e => setOOrderDate(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-200 focus:border-emerald-500 outline-none rounded-lg text-xs font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-stone-500 mb-1 font-semibold">Nama Klien / Pelanggan</label>
                <input
                  type="text"
                  value={oCustomerName}
                  onChange={e => setOCustomerName(e.target.value)}
                  placeholder="Masukkan nama lengkap klien"
                  className="w-full px-3 py-2 border border-stone-200 focus:border-emerald-500 outline-none rounded-lg text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-stone-500 mb-1 font-semibold">Nomor WhatsApp Pelanggan</label>
                <input
                  type="text"
                  value={oCustomerPhone}
                  onChange={e => setOCustomerPhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full px-3 py-2 border border-stone-200 focus:border-emerald-500 outline-none rounded-lg text-xs font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-stone-500 mb-1 font-semibold">Pilih Desain Template</label>
                <select
                  value={oProductName}
                  onChange={e => setOProductName(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-200 focus:border-emerald-500 outline-none rounded-lg text-xs"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-stone-500 mb-1 font-semibold">Total Harga (Rp)</label>
                  <input
                    type="number"
                    value={oTotalPrice}
                    onChange={e => setOTotalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-200 focus:border-emerald-500 outline-none rounded-lg text-xs font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-stone-500 mb-1 font-semibold">Status Transaksi</label>
                  <select
                    value={oStatus}
                    onChange={e => setOStatus(e.target.value as any)}
                    className="w-full px-3 py-2 border border-stone-200 focus:border-emerald-500 outline-none rounded-lg text-xs"
                  >
                    <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
                    <option value="Diproses">Diproses</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Dibatalkan">Dibatalkan</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowOrderModal(false)}
                  className="px-4 py-2 border border-stone-200 text-stone-600 text-xs font-semibold rounded-lg hover:bg-stone-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Simpan Pesanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global Toast */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 z-[100] bg-stone-900 text-white rounded-lg py-2.5 px-6 flex items-center justify-center gap-2 max-w-xs transition-all duration-300 ${
          showToast ? 'bottom-10 opacity-100' : 'bottom-0 opacity-0 pointer-events-none'
        }`}
      >
        <IoCheckmarkCircleOutline className="text-emerald-500 text-base" />
        <span className="text-xs font-semibold">{toastMsg}</span>
      </div>

    </div>
  )
}
