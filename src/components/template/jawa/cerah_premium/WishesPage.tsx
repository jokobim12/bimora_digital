import { useState, useEffect } from 'react'
import { IoSendOutline, IoCopyOutline, IoCheckmarkOutline } from 'react-icons/io5'
import type { WeddingData } from '../../../../utils/dummyData'
import { defaultWeddingData } from '../../../../utils/dummyData'
import { supabase } from '../../../../utils/supabaseClient'

interface Wish {
  name: string
  text: string
  attendance: string
  time: string
}

interface WishesPageProps {
  showToast: (msg: string) => void
  isDesktopMode?: boolean
  data?: WeddingData
}

export default function WishesPage({ showToast, isDesktopMode = false, data = defaultWeddingData }: WishesPageProps) {
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [attendance, setAttendance] = useState('hadir')
  const [wishes, setWishes] = useState<Wish[]>([])
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)
  const [sending, setSending] = useState(false)

  const activeGifts = data.gifts && data.gifts.length > 0 ? data.gifts : defaultWeddingData.gifts

  useEffect(() => {
    // 1. Fetch existing wishes from Supabase
    async function fetchWishes() {
      try {
        const { data: wishesData, error } = await supabase
          .from('wishes')
          .select('name, text, attendance, time')
          .eq('invitation_slug', data.slug)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error loading wishes:', error.message)
        } else if (wishesData && wishesData.length > 0) {
          setWishes(wishesData as Wish[])
        } else {
          // Fallback initial state if no database entries yet
          setWishes([
            { name: 'Keluarga Raden Mas Haryo', text: `Selamat menempuh hidup baru ${data.groom_nickname} & ${data.bride_nickname}. Semoga senantiasa diberikan kelancaran sampai hari H dan menjadi keluarga yang sakinah mawaddah warahmah.`, attendance: 'hadir', time: '1/6/2026 08:12' },
            { name: 'Anissa & Rian', text: 'Barakallahulakum wa baraka alaikum wa jamaa bainakuma fii khoir. Selamat ya guys! Akhirnya pelaminan juga.', attendance: 'hadir', time: '1/6/2026 07:45' }
          ])
        }
      } catch (err) {
        console.error('Exception fetching wishes:', err)
      }
    }

    fetchWishes()

    // 2. Subscribe to real-time additions of new wishes
    const channel = supabase
      .channel(`wishes-realtime-${data.slug}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'wishes', filter: `invitation_slug=eq.${data.slug}` },
        (payload) => {
          const newWish: Wish = {
            name: payload.new.name,
            text: payload.new.text,
            attendance: payload.new.attendance,
            time: payload.new.time
          }
          setWishes((prev) => [newWish, ...prev])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [data.slug, data.groom_nickname, data.bride_nickname])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !text.trim()) return
    setSending(true)
    
    try {
      const formattedTime = new Date().toLocaleDateString('id-ID') + ' ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      const { error } = await supabase
        .from('wishes')
        .insert([
          {
            invitation_slug: data.slug,
            name: name.trim(),
            text: text.trim(),
            attendance,
            time: formattedTime
          }
        ])

      if (error) {
        console.error('Error inserting wish:', error.message)
        showToast('Gagal mengirim ucapan, silakan coba lagi.')
      } else {
        setName('')
        setText('')
        setAttendance('hadir')
        showToast('Ucapan terkirim! Terima kasih banyak 🤍')
      }
    } catch (err) {
      console.error('Submission failed:', err)
      showToast('Gagal mengirim ucapan. Masalah koneksi.')
    } finally {
      setSending(false)
    }
  }

  const copyNumber = (num: string, idx: number) => {
    navigator.clipboard.writeText(num).then(() => {
      setCopiedIdx(idx)
      showToast('Nomor rekening disalin!')
      setTimeout(() => setCopiedIdx(null), 2000)
    })
  }

  return (
    <div className={`w-full mx-auto px-6 py-12 lg:py-16 flex flex-col items-center transition-all duration-500 ${
      isDesktopMode ? 'max-w-[920px]' : 'max-w-[480px]'
    }`}>
      
      {/* RSVP Section */}
      <p className="font-body text-[10px] tracking-[4px] uppercase text-[#B38520] font-medium reveal delay-100">
        Konfirmasi Kehadiran
      </p>
      <h2 className="font-heading text-3xl font-light text-[#A17A24] tracking-wide mt-1 reveal reveal-down delay-200">
        RSVP &amp; Ucapan
      </h2>
      <div className="gold-divider my-6 reveal reveal-scale delay-300">
        <span className="line !bg-[#B38520]" />
        <span className="diamond !bg-[#B38520]" />
        <span className="line !bg-[#B38520]" />
      </div>

      {/* Main Form & Wishes layout */}
      <div className={`w-full ${
        isDesktopMode ? 'grid grid-cols-2 gap-8 items-start' : 'flex flex-col gap-6'
      }`}>
        
        {/* RSVP Form */}
        <form className="w-full bg-white/80 border border-[#B38520]/20 rounded-2xl p-5 reveal reveal-left delay-100 shadow-sm backdrop-blur-sm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-body text-[10px] tracking-wider uppercase text-[#B38520] mb-1.5 font-medium">
              Nama Tamu
            </label>
            <input
              type="text" 
              placeholder="Masukkan nama lengkap Anda"
              className="w-full px-4 py-3 bg-[#FAF6EC] border border-[#B38520]/25 focus:border-[#B38520] rounded-xl text-[#332211] placeholder-[#7A6B5D]/65 text-xs font-body transition-colors outline-none"
              value={name} 
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-body text-[10px] tracking-wider uppercase text-[#B38520] mb-1.5 font-medium">
              Konfirmasi Kehadiran
            </label>
            <select 
              className="w-full px-4 py-3 bg-[#FAF6EC] border border-[#B38520]/25 focus:border-[#B38520] rounded-xl text-[#332211] text-xs font-body transition-colors outline-none cursor-pointer"
              value={attendance} 
              onChange={e => setAttendance(e.target.value)}
            >
              <option value="hadir">Insya Allah Hadir</option>
              <option value="tidak">Maaf, Tidak Bisa Hadir</option>
              <option value="ragu">Masih Ragu</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block font-body text-[10px] tracking-wider uppercase text-[#B38520] mb-1.5 font-medium">
              Pesan &amp; Doa Restu
            </label>
            <textarea
              placeholder="Tulis ucapan dan doa terbaik Anda di sini..."
              rows={4}
              className="w-full px-4 py-3 bg-[#FAF6EC] border border-[#B38520]/25 focus:border-[#B38520] rounded-xl text-[#332211] placeholder-[#7A6B5D]/65 text-xs font-body transition-colors outline-none resize-none"
              value={text} 
              onChange={e => setText(e.target.value)}
              required
            />
          </div>

          <button 
            className="w-full py-3.5 bg-gradient-to-r from-[#8F6510] to-[#B38520] hover:brightness-110 text-white font-body text-xs font-semibold tracking-widest uppercase rounded-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            type="submit" 
            disabled={sending || !name.trim() || !text.trim()}
          >
            {sending ? (
              'Mengirim...'
            ) : (
              <>
                <IoSendOutline className="text-sm" /> Kirim Ucapan
              </>
            )}
          </button>
        </form>

        {/* Guest Book Wishes List */}
        <div className={`w-full overflow-y-auto pr-1 flex flex-col gap-3 no-scrollbar reveal reveal-right delay-300 ${
          isDesktopMode ? 'max-h-[440px] border border-[#B38520]/15 p-4 rounded-2xl bg-[#FAF6EC]/30 shadow-inner' : 'max-h-[350px]'
        }`}>
          <div className="font-heading text-xs tracking-wider uppercase text-[#B38520] pb-2 mb-1 border-b border-[#B38520]/15 flex justify-between items-center">
            <span>Daftar Ucapan</span>
            <span className="bg-[#B38520]/10 text-[#B38520] text-[9px] px-2 py-0.5 rounded-full font-body">
              {wishes.length} Pesan
            </span>
          </div>

          {wishes.length === 0 ? (
            <p className="text-center font-body text-xs text-[#7A6B5D] py-6">
              Belum ada ucapan. Jadilah yang pertama! 💌
            </p>
          ) : (
            wishes.map((w, i) => (
              <div className="bg-white border border-[#B38520]/15 rounded-2xl p-4 flex flex-col shadow-sm backdrop-blur-sm" key={i}>
                <div className="flex justify-between items-start gap-2">
                  <span className="font-heading text-sm font-semibold text-[#A17A24]">
                    {w.name}
                  </span>
                  <span className={`text-[8px] px-2 py-0.5 rounded-full font-body font-medium uppercase tracking-wider ${
                    w.attendance === 'hadir' 
                      ? 'bg-green-50 text-green-700 border border-green-200/50' 
                      : w.attendance === 'tidak' 
                        ? 'bg-red-50 text-red-700 border border-red-200/50' 
                        : 'bg-yellow-50 text-yellow-700 border border-yellow-200/50'
                  }`}>
                    {w.attendance === 'hadir' ? '✓ Hadir' : w.attendance === 'tidak' ? '✗ Absen' : '? Ragu'}
                  </span>
                </div>
                <p className="font-body text-[11px] text-[#4A3B32] mt-2 leading-relaxed whitespace-pre-wrap">
                  {w.text}
                </p>
                <span className="font-body text-[8px] text-[#7A6B5D] mt-3 self-end">
                  {w.time}
                </span>
              </div>
            ))
          )}
        </div>

      </div>

      {/* Gift Section */}
      <div id="gift-section" className="w-full mt-24">
        <p className="font-body text-[10px] tracking-[4px] uppercase text-[#B38520] font-medium text-center reveal delay-100">
          Kirim Kado / Amplop
        </p>
        <h2 className="font-heading text-3xl font-light text-[#A17A24] tracking-wide text-center mt-1 reveal reveal-down delay-200">
          Tanda Kasih
        </h2>
        <div className="gold-divider my-6 reveal reveal-scale delay-300">
          <span className="line !bg-[#B38520]" />
          <span className="diamond !bg-[#B38520]" />
          <span className="line !bg-[#B38520]" />
        </div>
        
        <p className="text-center font-body text-[11px] leading-relaxed text-[#6B5A43] mb-8 max-w-[340px] lg:max-w-[480px] mx-auto reveal reveal-up delay-400">
          Bagi bapak/ibu/saudara yang ingin memberikan tanda kasih untuk kedua mempelai secara cashless, dapat mengirimkan melalui rekening berikut:
        </p>

        {/* Gift Cards */}
        <div className={`w-full ${
          isDesktopMode ? 'grid grid-cols-2 gap-8' : 'flex flex-col gap-4'
        }`}>
          {activeGifts.map((g, i) => (
            <div className={`bg-white border border-[#B38520]/20 rounded-2xl p-5 text-center relative overflow-hidden reveal shadow-sm backdrop-blur-sm flex flex-col items-center justify-between ${
              i === 0 ? 'reveal-left delay-100' : 'reveal-right delay-200'
            }`} key={i}>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#B38520] to-transparent" />
              
              <div className="w-full">
                <div className="font-heading text-sm font-semibold tracking-wider text-[#A17A24] uppercase">
                  {g.bank}
                </div>
                
                <div className="font-body text-base font-medium text-[#332211] tracking-[2px] bg-[#FAF6EC] px-4 py-2 border border-[#B38520]/15 rounded-xl my-3 select-all">
                  {g.number}
                </div>
                
                <div className="font-body text-[10px] text-[#6B5A43]">
                  Atas Nama: <span className="text-[#332211] font-semibold">{g.name}</span>
                </div>
              </div>
              
              <button
                className={`mt-4 inline-flex items-center gap-1.5 px-6 py-2.5 bg-transparent border rounded-full font-body text-[9px] tracking-wider uppercase transition-all duration-300 hover:shadow-sm active:scale-95 cursor-pointer ${
                  copiedIdx === i 
                    ? 'border-[#B38520] bg-[#B38520] text-white font-semibold' 
                    : 'border-[#B38520]/30 text-[#B38520] hover:border-[#B38520] hover:bg-[#FAF6EC]'
                }`}
                onClick={() => copyNumber(g.number, i)}
              >
                {copiedIdx === i ? (
                  <>
                    <IoCheckmarkOutline className="text-xs" /> Tersalin
                  </>
                ) : (
                  <>
                    <IoCopyOutline className="text-xs" /> Salin Rekening
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Last Ornament */}
      <img className="w-16 lg:w-20 h-auto opacity-30 my-10 lg:my-12 reveal reveal-scale delay-200" src="/assets/gunungan.png" alt="" />
    </div>
  )
}
