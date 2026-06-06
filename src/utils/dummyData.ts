export interface WeddingData {
  id: string
  slug: string
  template_type: string
  is_active: boolean
  
  // Mempelai Pria
  groom_name: string
  groom_nickname: string
  groom_parents: string
  groom_photo: string
  
  // Mempelai Wanita
  bride_name: string
  bride_nickname: string
  bride_parents: string
  bride_photo: string

  // Foto Bersama / Couple
  couple_photo?: string
  
  // Detail Acara
  wedding_date: string // format: YYYY-MM-DD
  akad_time: string
  resepsi_time: string
  location_name: string
  location_address: string
  maps_embed: string
  maps_link: string
  
  // Musik & Kado
  music_url: string
  gifts: Array<{
    bank: string
    number: string
    name: string
  }>
  stories?: Array<{
    year: string
    title: string
    desc: string
  }>
  gallery?: string[]
}

export const defaultWeddingData: WeddingData = {
  id: 'default',
  slug: 'bimantara-clara',
  template_type: 'jawa',
  is_active: true,
  groom_name: 'Bimantara Al Rasyid, S.Kom.',
  groom_nickname: 'Bimantara',
  groom_parents: 'Putra Pertama dari Bapak Ahmad & Ibu Siti',
  groom_photo: '/assets/mempelai/groom.png',
  bride_name: 'Claraveliana Putri, S.Pd.',
  bride_nickname: 'Claraveliana',
  bride_parents: 'Putri Kedua dari Bapak Budi & Ibu Ani',
  bride_photo: '/assets/mempelai/bride.png',
  couple_photo: '/assets/mempelai/mempelai.png',
  wedding_date: '2026-08-15',
  akad_time: '08:00 - 10:00 WIB',
  resepsi_time: '11:00 - 14:00 WIB',
  location_name: 'Gedung Graha Saba Buana',
  location_address: 'Jl. Letjen Suprapto No.80B, Sumber, Kec. Banjarsari, Kota Surakarta, Jawa Tengah 57137',
  maps_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.195029419177!2d110.80624027476343!3d-7.553683692460142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a16efe15db5e1%3A0x6bcfd35bcfa2ebf9!2sGedung%20Graha%20Saba%20Buana!5e0!3m2!1sid!2sid!4v1700000000000',
  maps_link: 'https://maps.app.goo.gl/9Zc1zG29XvH2T1x27',
  music_url: '/music/jawa.mp3',
  gifts: [
    { bank: 'BCA', number: '1234567890', name: 'Bimantara Al Rasyid' },
    { bank: 'Mandiri', number: '0987654321', name: 'Claraveliana Putri' }
  ],
  stories: [
    { year: '2022', title: 'Pertama Bertemu', desc: 'Kami pertama kali bertemu di sebuah acara seminar teknologi di Kota Surakarta. Pertemuan singkat yang berkesan.' },
    { year: '2024', title: 'Menjalin Komitmen', desc: 'Setelah dua tahun berteman baik, kami memutuskan untuk menjalin komitmen serius untuk melangkah ke jenjang pernikahan.' },
    { year: '2026', title: 'Pernikahan Agung', desc: 'Hari di mana kami mengikat janji suci pernikahan di hadapan Allah SWT dan dipersatukan dalam ikatan keluarga.' }
  ]
}

// LocalStorage Helper functions for the Prototype Database
const STORAGE_KEY = 'bimora_invitations'
const PRODUCTS_KEY = 'bimora_products'
const ORDERS_KEY = 'bimora_orders'

export function getLocalInvitations(): WeddingData[] {
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) {
    // Initialize with default template data
    const initial = [defaultWeddingData]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial))
    return initial
  }
  try {
    return JSON.parse(data)
  } catch (e) {
    return [defaultWeddingData]
  }
}

export function saveLocalInvitations(invitations: WeddingData[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(invitations))
}

export function getLocalInvitationBySlug(slug: string): WeddingData | undefined {
  const list = getLocalInvitations()
  return list.find(item => item.slug === slug)
}

export function addOrUpdateLocalInvitation(invitation: WeddingData): void {
  const list = getLocalInvitations()
  const index = list.findIndex(item => item.slug === invitation.slug)
  if (index !== -1) {
    list[index] = invitation
  } else {
    list.push(invitation)
  }
  saveLocalInvitations(list)
}

export function deleteLocalInvitation(slug: string): void {
  const list = getLocalInvitations()
  const filtered = list.filter(item => item.slug !== slug)
  saveLocalInvitations(filtered)
}

// Product Management
export interface ProductData {
  id: string | number
  name: string
  category: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  badge: string
  desc: string
  features: string[]
  previewSlug: string | null
  available: boolean
  color?: string
  thumbnail?: string
}

export const defaultProducts: ProductData[] = [
  {
    id: 1,
    name: 'Adat Jawa Premium – Gelap Megah',
    category: 'Adat Jawa',
    price: 149000,
    originalPrice: 199000,
    rating: 5,
    reviews: 48,
    badge: 'Terlaris',
    desc: 'Desain luhur dengan ornamen gunungan wayang kulit, animasi megah, latar gelap berkelas, dan iringan gending Jawa klasik.',
    features: ['Countdown Hari H', 'Love Story Timeline', 'Galeri 15 Foto', 'Kustom Musik MP3', 'Maps Interaktif', 'Form RSVP'],
    previewSlug: 'bimantara-clara',
    available: true,
    color: 'from-stone-900 to-stone-800',
  },
  {
    id: 2,
    name: 'Modern Emerald Gold – Minimalis Elegan',
    category: 'Modern',
    price: 129000,
    originalPrice: 169000,
    rating: 4,
    reviews: 23,
    badge: 'Segera Hadir',
    desc: 'Perpaduan hijau emerald dengan emas yang bersih, modern, dan berkesan mewah tanpa kesan berlebihan.',
    features: ['Countdown Hari H', 'Galeri 10 Foto', 'Maps Interaktif', 'Form RSVP', 'Musik Latar'],
    previewSlug: null,
    available: false,
    color: 'from-emerald-900 to-emerald-800',
  },
  {
    id: 3,
    name: 'Nuansa Islami – Putih Sakral',
    category: 'Islami',
    price: 139000,
    originalPrice: 179000,
    rating: 5,
    reviews: 15,
    badge: 'Segera Hadir',
    desc: 'Desain suci bernuansa Islam dengan kaligrafi Arab, ornamen arabesque, warna putih & emas lembut.',
    features: ['Countdown Hari H', 'Kaligrafi Bismillah', 'Galeri 12 Foto', 'Maps Interaktif', 'Form RSVP'],
    previewSlug: null,
    available: false,
    color: 'from-amber-950 to-amber-900',
  },
  {
    id: 4,
    name: 'Sunda Tradisional – Mekar Parahyangan',
    category: 'Sunda',
    price: 149000,
    originalPrice: 189000,
    rating: 5,
    reviews: 0,
    badge: 'Segera Hadir',
    desc: 'Kecantikan tradisi Sunda dalam digital – motif kain batik Parahyangan dengan warna biru indigo elegan.',
    features: ['Countdown Hari H', 'Love Story', 'Galeri 12 Foto', 'Maps Interaktif', 'Form RSVP'],
    previewSlug: null,
    available: false,
    color: 'from-indigo-900 to-indigo-800',
  },
]

export function getLocalProducts(): ProductData[] {
  const data = localStorage.getItem(PRODUCTS_KEY)
  if (!data) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts))
    return defaultProducts
  }
  try {
    return JSON.parse(data)
  } catch (e) {
    return defaultProducts
  }
}

export function saveLocalProducts(products: ProductData[]): void {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
}

export function addOrUpdateLocalProduct(product: ProductData): void {
  const list = getLocalProducts()
  const index = list.findIndex(item => String(item.id) === String(product.id))
  if (index !== -1) {
    list[index] = product
  } else {
    list.push(product)
  }
  saveLocalProducts(list)
}

export function deleteLocalProduct(id: string | number): void {
  const list = getLocalProducts()
  const filtered = list.filter(item => String(item.id) !== String(id))
  saveLocalProducts(filtered)
}

// Order Management
export interface OrderData {
  id: string
  customerName: string
  customerPhone: string
  productName: string
  orderDate: string
  status: 'Menunggu Pembayaran' | 'Diproses' | 'Selesai' | 'Dibatalkan'
  totalPrice: number
}

export const defaultOrders: OrderData[] = [
  {
    id: 'ORD-1001',
    customerName: 'Ahmad Subarjo',
    customerPhone: '081234567890',
    productName: 'Adat Jawa Premium – Gelap Megah',
    orderDate: '2026-06-05',
    status: 'Selesai',
    totalPrice: 149000,
  },
  {
    id: 'ORD-1002',
    customerName: 'Dewi Rahmawati',
    customerPhone: '089876543210',
    productName: 'Modern Emerald Gold – Minimalis Elegan',
    orderDate: '2026-06-06',
    status: 'Diproses',
    totalPrice: 129000,
  },
  {
    id: 'ORD-1003',
    customerName: 'Bagas Prasetyo',
    customerPhone: '085233445566',
    productName: 'Nuansa Islami – Putih Sakral',
    orderDate: '2026-06-06',
    status: 'Menunggu Pembayaran',
    totalPrice: 139000,
  },
]

export function getLocalOrders(): OrderData[] {
  const data = localStorage.getItem(ORDERS_KEY)
  if (!data) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(defaultOrders))
    return defaultOrders
  }
  try {
    return JSON.parse(data)
  } catch (e) {
    return defaultOrders
  }
}

export function saveLocalOrders(orders: OrderData[]): void {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
}

export function addOrUpdateLocalOrder(order: OrderData): void {
  const list = getLocalOrders()
  const index = list.findIndex(item => item.id === order.id)
  if (index !== -1) {
    list[index] = order
  } else {
    list.push(order)
  }
  saveLocalOrders(list)
}

export function deleteLocalOrder(id: string): void {
  const list = getLocalOrders()
  const filtered = list.filter(item => item.id !== id)
  saveLocalOrders(filtered)
}

export interface AboutUsValue {
  title: string
  desc: string
  iconType: string
}

export interface AboutUsTeam {
  name: string
  role: string
  ig: string
}

export interface AboutUsData {
  title: string
  subtitle: string
  descShort: string
  storyTitle: string
  story1: string
  story2: string
  story3: string
  values: AboutUsValue[]
  team: AboutUsTeam[]
}

const ABOUT_KEY = 'bimora_about_us'

export const defaultAboutUs: AboutUsData = {
  title: 'Tentang Bimora Digital',
  subtitle: 'Siapa Kami',
  descShort: 'Bimora Digital lahir dari kecintaan terhadap budaya Nusantara dan teknologi modern — menghadirkan undangan pernikahan digital yang elegan, bermakna, dan mudah dijangkau.',
  storyTitle: 'Dibangun dari Semangat Budaya & Teknologi',
  story1: 'Bimora Digital didirikan dengan misi sederhana: membuat undangan pernikahan digital yang benar-benar cantik, bermakna, dan terjangkau untuk semua kalangan masyarakat Indonesia.',
  story2: 'Kami percaya bahwa setiap momen pernikahan layak dirayakan dengan cara terbaik. Melalui desain yang memadukan kekayaan tradisi Nusantara dengan estetika digital modern, kami hadir untuk membuat hari spesial Anda semakin berkesan.',
  story3: 'Sejak berdiri, kami telah membantu lebih dari 200 pasangan dari berbagai penjuru Indonesia mengabadikan undangan pernikahan mereka secara digital — dan perjalanan ini baru saja dimulai.',
  values: [
    { title: 'Penuh Dedikasi', desc: 'Setiap undangan kami kerjakan dengan sepenuh hati, memastikan detail terkecil pun tersampaikan dengan indah.', iconType: 'heart' },
    { title: 'Kualitas Premium', desc: 'Kami tidak berkompromi soal kualitas. Setiap template dirancang dengan standar desain tertinggi.', iconType: 'star' },
    { title: 'Respon Cepat', desc: 'Tim CS kami siap membantu Anda dalam waktu singkat, mulai dari konsultasi hingga revisi.', iconType: 'rocket' }
  ],
  team: [
    { name: 'Joko Bimantara', role: 'Founder & Designer', ig: '@jokobim12' }
  ]
}

export function getLocalAboutUs(): AboutUsData {
  const data = localStorage.getItem(ABOUT_KEY)
  if (!data) {
    localStorage.setItem(ABOUT_KEY, JSON.stringify(defaultAboutUs))
    return defaultAboutUs
  }
  try {
    return JSON.parse(data)
  } catch (e) {
    return defaultAboutUs
  }
}

export function saveLocalAboutUs(about: AboutUsData): void {
  localStorage.setItem(ABOUT_KEY, JSON.stringify(about))
}


