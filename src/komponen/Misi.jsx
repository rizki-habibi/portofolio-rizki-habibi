import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Eye, Database, Shield, BookOpen } from 'lucide-react'

const dataMisi = [
  {
    nomor: '01',
    judul: 'UNGKAP YANG DISEMBUNYIKAN',
    deskripsi: 'Kasus yang sudah dinyatakan selesai oleh media mainstream — sering kali baru benar-benar dimulai. Misi pertama adalah menemukan apa yang sengaja ditutupi.',
    Ikon: Eye,
  },
  {
    nomor: '02',
    judul: 'LAWAN KORUPSI DENGAN DATA',
    deskripsi: 'Koruptor paling takut pada data yang detail dan terverifikasi. Senjata terbaik bukan teriakan di jalan — tapi angka, dokumen, dan jejak digital yang tidak bisa dibantah.',
    Ikon: Database,
  },
  {
    nomor: '03',
    judul: 'JAGA RUANG DIGITAL',
    deskripsi: 'Internet bukan tempat yang aman dari kekuasaan. Misi adalah memastikan ruang digital tetap bisa digunakan oleh rakyat biasa — bukan hanya alat pengawasan negara dan korporasi.',
    Ikon: Shield,
  },
  {
    nomor: '04',
    judul: 'PENDIDIKAN PUBLIK',
    deskripsi: 'Rakyat yang paham adalah kekuatan terbesar. Menerjemahkan kasus kompleks menjadi narasi yang bisa dipahami semua orang — tanpa kehilangan substansinya.',
    Ikon: BookOpen,
  },
]

const nilaiFilosofi = [
  { label: 'Keberanian', isi: 'Bicara saat semua orang diam.' },
  { label: 'Presisi', isi: 'Fakta harus kuat sebelum diterbitkan.' },
  { label: 'Konsistensi', isi: 'Tidak berhenti di tengah jalan.' },
  { label: 'Adaptasi', isi: 'Metode berubah, tujuan tetap.' },
]

const Misi = () => {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="misi" className="relative py-28 lg:py-36 overflow-hidden bg-hitam-abu">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, white 40px, white 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, white 40px, white 41px)' }} />

      <div className="absolute bottom-8 left-8 font-judul text-white/[0.03] select-none pointer-events-none"
        style={{ fontSize: 'clamp(6rem, 18vw, 14rem)', lineHeight: 1 }}>05</div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-white/40" />
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Tujuan</span>
          </div>
          <h2 className="font-judul text-white" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>MISI & MANIFESTO</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {dataMisi.map((misi, i) => {
            const Ikon = misi.Ikon
            return (
              <motion.div key={misi.nomor}
                initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="kartu-kasus p-6 lg:p-8 group"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 mt-1 p-2.5 border border-white/10 group-hover:border-white/25 transition-colors">
                    <Ikon size={20} className="text-white/50 group-hover:text-white/80 transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-xs text-white/20">{misi.nomor}</span>
                      <div className="flex-1 h-px bg-white/10 group-hover:bg-white/20 transition-colors" />
                    </div>
                    <h3 className="font-judul text-white text-xl lg:text-2xl uppercase mb-3 tracking-wide">{misi.judul}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{misi.deskripsi}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="border border-white/10 p-8 lg:p-12"
        >
          <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-8">Nilai yang Dipegang</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {nilaiFilosofi.map((nilai, i) => (
              <motion.div key={nilai.label}
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 + i * 0.1, duration: 0.6 }}
                className="space-y-3"
              >
                <div className="w-8 h-px bg-white/40" />
                <h4 className="font-judul text-white text-2xl uppercase tracking-wide">{nilai.label}</h4>
                <p className="font-mono text-xs text-white/40 leading-relaxed">{nilai.isi}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.0, duration: 1.0 }}
          className="mt-20 text-center"
        >
          <p className="font-judul text-white/10 select-none leading-none"
            style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}>
            KEBENARAN TIDAK PERNAH KADALUARSA
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Misi
