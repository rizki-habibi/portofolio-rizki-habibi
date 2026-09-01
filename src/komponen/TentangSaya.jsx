import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const varianMasuk = {
  tersembunyi: { opacity: 0, y: 60 },
  terlihat: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
}

const faktaData = [
  { label: 'Nama Lengkap', nilai: 'Rizki Habibi' },
  { label: 'Profesi', nilai: 'Jurnalis & Aktivis' },
  { label: 'Jam Kerja', nilai: 'Ketika Mood Bagus' },
  { label: 'Spesialisasi', nilai: 'Kasus Tidak Tuntas' },
  { label: 'Domain', nilai: 'Virtual & Realita' },
  { label: 'Status', nilai: 'Aktif Investigasi' },
]

const TentangSaya = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="tentang" className="relative py-28 lg:py-36 bg-hitam overflow-hidden">
      {/* Nomor seksi besar di latar */}
      <div className="absolute top-8 right-8 font-judul text-white/[0.03] select-none pointer-events-none"
        style={{ fontSize: 'clamp(6rem, 18vw, 14rem)', lineHeight: 1 }}>
        02
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header seksi */}
        <motion.div
          variants={varianMasuk}
          initial="tersembunyi"
          animate={inView ? 'terlihat' : 'tersembunyi'}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-white/40" />
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Profil</span>
          </div>
          <h2 className="font-judul text-white" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
            TENTANG SAYA
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Kolom kiri — teks narasi */}
          <div className="space-y-8">
            {[
              {
                teks: 'Saya bukan sekadar jurnalis biasa. Saya adalah seseorang yang melihat masalah yang sudah dinyatakan "selesai" — dan tahu bahwa itu belum benar-benar selesai.',
                delay: 0,
              },
              {
                teks: 'Seperti karakter dalam Sakamoto Days yang melepas identitas lamanya namun tetap membawa keahlian uniknya — saya membawa kepekaan mendalam terhadap kebohongan, manipulasi, dan data yang sengaja disembunyikan.',
                delay: 1,
              },
              {
                teks: 'Dari dunia virtual hingga jalanan nyata, saya mendalami kasus yang dianggap sudah basi oleh media mainstream. Korupsi tidak punya tanggal kadaluarsa, dan saya tidak punya rencana berhenti.',
                delay: 2,
              },
            ].map((item, i) => (
              <motion.p
                key={i}
                variants={varianMasuk}
                custom={item.delay}
                initial="tersembunyi"
                animate={inView ? 'terlihat' : 'tersembunyi'}
                className="text-white/60 leading-relaxed text-base lg:text-lg"
              >
                {item.teks}
              </motion.p>
            ))}

            {/* Quote manga style */}
            <motion.div
              variants={varianMasuk}
              custom={3}
              initial="tersembunyi"
              animate={inView ? 'terlihat' : 'tersembunyi'}
              className="relative border-l-4 border-white pl-6 py-2 mt-8"
            >
              {/* Efek speed lines di background quote */}
              <div className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 20px)',
                }}
              />
              <p className="font-judul text-white text-2xl lg:text-3xl tracking-wide relative z-10">
                "YANG BELUM SELESAI, SAYA TUNTASKAN."
              </p>
              <span className="font-mono text-xs text-white/30 mt-2 block">— Rizki Habibi</span>
            </motion.div>
          </div>

          {/* Kolom kanan — panel data karakter */}
          <motion.div
            variants={varianMasuk}
            custom={2}
            initial="tersembunyi"
            animate={inView ? 'terlihat' : 'tersembunyi'}
          >
            {/* Panel identitas bergaya manga */}
            <div className="border border-white/10 relative">
              {/* Header panel */}
              <div className="border-b border-white/10 px-6 py-3 flex items-center justify-between">
                <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
                  DATA KARAKTER
                </span>
                <span className="font-mono text-xs text-white/20">FILE-RH-001</span>
              </div>

              {/* Avatar / visual karakter */}
              <div className="relative h-48 bg-abu-gelap overflow-hidden">
                {/* Garis aksi latar */}
                <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 200">
                  {Array.from({ length: 20 }, (_, i) => {
                    const sudut = (i * 18) * Math.PI / 180
                    return (
                      <line key={i}
                        x1="200" y1="100"
                        x2={200 + Math.cos(sudut) * 600}
                        y2={100 + Math.sin(sudut) * 600}
                        stroke="white" strokeWidth="1"
                      />
                    )
                  })}
                </svg>

                {/* Inisial besar */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-judul text-white/80 select-none"
                    style={{ fontSize: '7rem', lineHeight: 1 }}>
                    RH
                  </span>
                </div>

                {/* Badge pojok */}
                <div className="absolute top-3 left-3 border border-white/20 px-2 py-1">
                  <span className="font-mono text-xs text-white/50">JURNALIS</span>
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <span className="lencana-aktif w-1.5 h-1.5 rounded-full bg-white inline-block" />
                  <span className="font-mono text-xs text-white/40">AKTIF</span>
                </div>
              </div>

              {/* Tabel data */}
              <div className="divide-y divide-white/5">
                {faktaData.map((fakta, i) => (
                  <motion.div
                    key={fakta.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                    className="flex items-center justify-between px-6 py-3"
                  >
                    <span className="font-mono text-xs text-white/30 uppercase tracking-wider">
                      {fakta.label}
                    </span>
                    <span className="font-mono text-sm text-white/80">
                      {fakta.nilai}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Footer panel */}
              <div className="border-t border-white/10 px-6 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="font-mono text-xs text-white/20">TERVERIFIKASI</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
              </div>
            </div>

            {/* Tags keahlian kunci */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {['Investigasi', 'OSINT', 'Dark Web', 'Korupsi', 'AI Tools', 'Ponzi', 'Data Forensik'].map(tag => (
                <span key={tag}
                  className="bg-white/5 border border-white/10 text-white/50 px-3 py-1 text-xs font-mono uppercase tracking-wider hover:bg-white/10 hover:text-white/80 transition-all duration-200 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TentangSaya
