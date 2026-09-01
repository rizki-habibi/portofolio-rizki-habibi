import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const dataKeahlian = [
  {
    kategori: 'Investigasi & Riset',
    ikon: '🔍',
    daftar: [
      { nama: 'OSINT (Open Source Intelligence)', nilai: 95 },
      { nama: 'Analisis Dokumen & Data', nilai: 90 },
      { nama: 'Investigasi Lapangan', nilai: 85 },
      { nama: 'Verifikasi Fakta', nilai: 92 },
    ],
  },
  {
    kategori: 'Dunia Digital',
    ikon: '💻',
    daftar: [
      { nama: 'Navigasi Dark Web', nilai: 80 },
      { nama: 'Forensik Data Digital', nilai: 75 },
      { nama: 'Tracking Jaringan Korupsi', nilai: 88 },
      { nama: 'Analisis Blockchain / Ponzi', nilai: 78 },
    ],
  },
  {
    kategori: 'Komunikasi & Pengaruh',
    ikon: '📡',
    daftar: [
      { nama: 'Penulisan Investigatif', nilai: 94 },
      { nama: 'Jurnalisme Publik', nilai: 90 },
      { nama: 'Aktivisme Digital', nilai: 87 },
      { nama: 'Membangun Narasi', nilai: 92 },
    ],
  },
  {
    kategori: 'Kemampuan Khusus',
    ikon: '⚡',
    daftar: [
      { nama: 'Membaca Pola Tersembunyi', nilai: 96 },
      { nama: 'Analisis Kasus Dingin', nilai: 89 },
      { nama: 'Pemetaan Jaringan Koruptor', nilai: 85 },
      { nama: 'Adaptasi & Penyamaran', nilai: 80 },
    ],
  },
]

const BarKeahlian = ({ nama, nilai, terlihat, delay }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-mono text-xs text-white/60 uppercase tracking-wider">{nama}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={terlihat ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: delay + 0.8 }}
          className="font-mono text-xs text-white/40"
        >
          {nilai}%
        </motion.span>
      </div>
      <div className="h-px bg-white/10 relative overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={terlihat ? { scaleX: nilai / 100 } : { scaleX: 0 }}
          transition={{ delay: delay + 0.3, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 bg-white origin-left h-full"
          style={{ height: '1px' }}
        />
      </div>
    </div>
  )
}

const Keahlian = () => {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="keahlian" className="relative py-28 lg:py-36 bg-hitam overflow-hidden">
      {/* Nomor seksi */}
      <div className="absolute top-8 left-8 font-judul text-white/[0.03] select-none pointer-events-none"
        style={{ fontSize: 'clamp(6rem, 18vw, 14rem)', lineHeight: 1 }}>
        03
      </div>

      {/* Pola halftone latar */}
      <div className="absolute bottom-0 right-0 w-72 h-72 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
          backgroundSize: '18px 18px',
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-white/40" />
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Arsenal</span>
          </div>
          <h2 className="font-judul text-white" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
            KEAHLIAN UNIK
          </h2>
          <p className="text-white/40 mt-4 max-w-xl font-mono text-sm leading-relaxed">
            Kemampuan yang diasah melalui kasus nyata — bukan kelas, bukan sertifikat.
          </p>
        </motion.div>

        {/* Grid keahlian */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {dataKeahlian.map((grup, gi) => (
            <motion.div
              key={grup.kategori}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: gi * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="kartu-kasus p-6 lg:p-8"
            >
              {/* Header kategori */}
              <div className="flex items-center gap-3 mb-8">
                <span className="text-2xl">{grup.ikon}</span>
                <div>
                  <h3 className="font-judul text-white text-xl tracking-wide uppercase">
                    {grup.kategori}
                  </h3>
                  <div className="w-8 h-px bg-white/30 mt-1" />
                </div>
              </div>

              {/* Bar keahlian */}
              <div className="space-y-6">
                {grup.daftar.map((item, ii) => (
                  <BarKeahlian
                    key={item.nama}
                    nama={item.nama}
                    nilai={item.nilai}
                    terlihat={inView}
                    delay={gi * 0.15 + ii * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Kemampuan tambahan — badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 pt-12 border-t border-white/10"
        >
          <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-6">
            Kemampuan Tambahan
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              'Kriptografi Dasar', 'VPN & Anonimitas', 'Social Engineering', 'Analisis Media Sosial',
              'Penyadapan Legal', 'Whistleblower Network', 'Dokumentasi Hukum', 'Wawancara Mendalam',
              'Pemetaan Hubungan', 'Analisis Keuangan Publik', 'Pengarsipan Digital',
            ].map((kemampuan, i) => (
              <motion.span
                key={kemampuan}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.0 + i * 0.04, duration: 0.4 }}
                className="border border-white/10 text-white/40 px-3 py-1.5 text-xs font-mono uppercase tracking-wider hover:border-white/30 hover:text-white/70 transition-all duration-200 cursor-default"
              >
                {kemampuan}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Keahlian
