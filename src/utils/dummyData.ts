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
