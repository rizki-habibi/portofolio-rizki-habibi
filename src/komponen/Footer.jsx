import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Circle, ArrowRight } from 'lucide-react'

const Footer = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const tahunSekarang = new Date().getFullYear()

  const gulirKe = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer ref={ref} className="relative bg-hitam border-t border-white/10 overflow-hidden">
      <div className="absolute top-4 right-8 font-judul text-white/[0.025] select-none pointer-events-none"
        style={{ fontSize: 'clamp(5rem, 15vw, 10rem)', lineHeight: 1 }}>EOF</div>

      <div className="border-b border-white/10 py-16 lg:py-24 text-center overflow-hidden">
        <motion.div initial={{ opacity: 0, y: 60 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          <p className="font-mono text-xs text-white/25 uppercase tracking-widest mb-6">Ada kasus yang ingin diungkap?</p>
          <button onClick={() => gulirKe('kontak')}
            className="font-judul text-white hover:text-white/80 transition-colors duration-300 leading-none" data-hover
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >MULAI BICARA</button>
          <div className="w-32 h-px bg-white/20 mx-auto mt-6" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.7 }} className="space-y-4">
            <div className="font-judul text-white text-3xl tracking-widest">RH.</div>
            <p className="font-mono text-xs text-white/35 leading-relaxed">
              Rizki Habibi — Jurnalis Investigatif & Aktivis Digital. Mengungkap kasus yang belum tuntas.
            </p>
            <div className="flex items-center gap-2">
              <Circle size={6} className="text-white/50 fill-white/50 animate-pulse" />
              <span className="font-mono text-xs text-white/25">Aktif Menginvestigasi</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, duration: 0.7 }} className="space-y-4">
            <p className="font-mono text-xs text-white/25 uppercase tracking-widest">Navigasi</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Beranda', id: 'beranda' }, { label: 'Tentang', id: 'tentang' },
                { label: 'Keahlian', id: 'keahlian' }, { label: 'Kasus', id: 'kasus' },
                { label: 'Misi', id: 'misi' }, { label: 'Kemampuan', id: 'kemampuan' },
                { label: 'AI Tools', id: 'ai-tools' }, { label: 'Jadwal', id: 'jadwal' },
                { label: 'Kontak', id: 'kontak' },
              ].map(item => (
                <button key={item.id} onClick={() => gulirKe(item.id)}
                  className="text-left font-mono text-xs text-white/30 hover:text-white/70 uppercase tracking-wider transition-colors duration-200" data-hover>
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4, duration: 0.7 }} className="space-y-4">
            <p className="font-mono text-xs text-white/25 uppercase tracking-widest">Kasus Terbaru</p>
            <div className="space-y-3">
              {[
                { tahun: '2025', judul: 'Kecurangan Ijazah & Data' },
                { tahun: '2025', judul: 'Kerentanan AI Tools' },
                { tahun: '2024', judul: 'Manipulasi Skema Ponzi' },
              ].map((k, i) => (
                <button key={i} onClick={() => gulirKe('kasus')}
                  className="w-full text-left flex items-center gap-3 group" data-hover>
                  <ArrowRight size={10} className="text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0" />
                  <span className="font-mono text-xs text-white/30">{k.tahun}</span>
                  <span className="font-mono text-xs text-white/40 group-hover:text-white/70 transition-colors leading-snug">{k.judul}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6, duration: 0.8 }}
          className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="font-mono text-xs text-white/20">© {tahunSekarang} Rizki Habibi. Semua hak dilindungi.</p>
          <p className="font-mono text-xs text-white/15">Dibangun dengan React + Framer Motion — Di-host di Vercel</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
