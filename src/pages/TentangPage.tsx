import { IoLogoWhatsapp, IoLogoInstagram, IoHeartOutline, IoStarOutline, IoRocketOutline } from 'react-icons/io5'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const values = [
  { icon: <IoHeartOutline />, title: 'Penuh Dedikasi', desc: 'Setiap undangan kami kerjakan dengan sepenuh hati, memastikan detail terkecil pun tersampaikan dengan indah.' },
  { icon: <IoStarOutline />, title: 'Kualitas Premium', desc: 'Kami tidak berkompromi soal kualitas. Setiap template dirancang dengan standar desain tertinggi.' },
  { icon: <IoRocketOutline />, title: 'Respon Cepat', desc: 'Tim CS kami siap membantu Anda dalam waktu singkat, mulai dari konsultasi hingga revisi.' },
]

const team = [
  { name: 'Joko Bimantara', role: 'Founder & Designer', ig: '@jokobim12' },
]

export default function TentangPage() {
  return (
    <div className="bg-white text-stone-800 font-body min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-amber-50 via-white to-yellow-50 py-10 sm:py-14 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[10px] tracking-[4px] uppercase text-amber-500 font-semibold mb-2">Siapa Kami</p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-stone-800 mb-3">Tentang Bimora Digital</h1>
          <p className="text-stone-500 text-sm max-w-2xl">
            Bimora Digital lahir dari kecintaan terhadap budaya Nusantara dan teknologi modern — menghadirkan undangan pernikahan digital yang elegan, bermakna, dan mudah dijangkau.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <div className="flex-1">
            <p className="text-[10px] tracking-[4px] uppercase text-amber-500 font-semibold mb-3">Kisah Kami</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-stone-800 mb-5">
              Dibangun dari Semangat Budaya & Teknologi
            </h2>
            <div className="space-y-4 text-stone-500 text-sm leading-relaxed">
              <p>
                Bimora Digital didirikan dengan misi sederhana: membuat undangan pernikahan digital yang benar-benar cantik, bermakna, dan terjangkau untuk semua kalangan masyarakat Indonesia.
              </p>
              <p>
                Kami percaya bahwa setiap momen pernikahan layak dirayakan dengan cara terbaik. Melalui desain yang memadukan kekayaan tradisi Nusantara dengan estetika digital modern, kami hadir untuk membuat hari spesial Anda semakin berkesan.
              </p>
              <p>
                Sejak berdiri, kami telah membantu lebih dari 200 pasangan dari berbagai penjuru Indonesia mengabadikan undangan pernikahan mereka secara digital — dan perjalanan ini baru saja dimulai.
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="relative w-64 sm:w-80 h-64 sm:h-80 rounded-3xl bg-gradient-to-br from-amber-100 to-yellow-100 border-2 border-amber-200 flex items-center justify-center shadow-xl">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="font-heading text-white text-4xl font-bold">B</span>
                </div>
                <p className="font-heading text-2xl font-bold text-amber-700">BIMORA</p>
                <p className="text-[10px] tracking-[3px] text-amber-500 uppercase">Digital</p>
                <p className="text-stone-400 text-xs mt-3">Est. 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gradient-to-b from-amber-50/50 to-white py-14 sm:py-20 border-t border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[4px] uppercase text-amber-500 font-semibold mb-2">Nilai Kami</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-stone-800">Yang Kami Pegang Teguh</h2>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-400" />
              <div className="w-2 h-2 bg-amber-500 rotate-45" />
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-400" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {values.map((v, i) => (
              <div key={i} className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-amber-200 transition-all text-center">
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                  {v.icon}
                </div>
                <h3 className="font-semibold text-stone-800 mb-2">{v.title}</h3>
                <p className="text-stone-400 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[4px] uppercase text-amber-500 font-semibold mb-2">Di Balik Layar</p>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-stone-800">Tim Kami</h2>
        </div>
        <div className="flex justify-center">
          {team.map((t, i) => (
            <div key={i} className="bg-white border border-stone-100 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-amber-200 transition-all text-center max-w-xs w-full">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md shadow-amber-100">
                <span className="font-heading text-white text-3xl font-bold">
                  {t.name.charAt(0)}
                </span>
              </div>
              <p className="font-semibold text-stone-800">{t.name}</p>
              <p className="text-xs text-amber-600 mb-2">{t.role}</p>
              <a
                href={`https://instagram.com/${t.ig.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-amber-600 transition-colors"
              >
                <IoLogoInstagram /> {t.ig}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone-900 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">Ada Pertanyaan? Kami Siap Membantu!</h2>
          <p className="text-stone-400 text-sm mb-6">Hubungi kami kapan saja melalui WhatsApp atau Instagram.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/6281234567890"
              target="_blank" rel="noopener noreferrer"
              className="px-7 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold text-sm rounded-full shadow-md transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <IoLogoWhatsapp /> WhatsApp Kami
            </a>
            <a
              href="https://instagram.com/jokobim12"
              target="_blank" rel="noopener noreferrer"
              className="px-7 py-3.5 border-2 border-stone-600 hover:border-amber-400 text-stone-300 hover:text-amber-400 font-bold text-sm rounded-full transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <IoLogoInstagram /> Follow Instagram
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
