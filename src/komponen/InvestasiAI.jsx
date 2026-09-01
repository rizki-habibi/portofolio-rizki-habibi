import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const dataAI = [
  {
    nama: 'GitHub',
    kategori: 'Platform Kode',
    kegunaan: 'Arsip kode investigasi, kolaborasi anonim, dan penyimpanan skrip analisis data.',
    celah: 'Riwayat commit mengungkap pola kerja; metadata repositori bisa dieksploitasi.',
    status: 'AKTIF DIGUNAKAN',
    skor: 85,
    tag: ['Code Archive', 'Collaboration', 'Version Control'],
  },
  {
    nama: 'Kiro AI',
    kategori: 'AI Coding Assistant',
    kegunaan: 'Bantuan pembuatan alat analisis data kustom dan automasi riset investigatif.',
    celah: 'Konteks sesi bisa tersimpan; perlu filter informasi sensitif.',
    status: 'AKTIF DIGUNAKAN',
    skor: 80,
    tag: ['Code Generation', 'Automation', 'Research Tool'],
  },
  {
    nama: 'Antigravity',
    kategori: 'AI Platform',
    kegunaan: 'Eksplorasi kemampuan pemrosesan dokumen panjang untuk analisis kasus hukum.',
    celah: 'Model baru — belum ada audit keamanan independen yang memadai.',
    status: 'DITELUSURI',
    skor: 60,
    tag: ['Document Analysis', 'Long Context', 'Legal'],
  },
  {
    nama: 'Kimi AI',
    kategori: 'AI Tiongkok',
    kegunaan: 'Komparasi perspektif dan analisis konten berbahasa Mandarin untuk kasus lintas negara.',
    celah: 'Yurisdiksi data berada di luar Indonesia; potensi akses pihak ketiga.',
    status: 'WASPADA',
    skor: 50,
    tag: ['Cross-border', 'Language', 'Comparative'],
  },
  {
    nama: 'Meta AI',
    kategori: 'AI Sosial',
    kegunaan: 'Analisis pola media sosial dan tracking sentimen publik terhadap kasus tertentu.',
    celah: 'Terintegrasi dengan ekosistem Meta — privasi data sangat terbatas.',
    status: 'TERBATAS',
    skor: 45,
    tag: ['Social Media', 'Sentiment', 'Public Monitoring'],
  },
  {
    nama: 'AI Lainnya',
    kategori: 'Ekosistem AI',
    kegunaan: 'Claude, Gemini, Perplexity — digunakan untuk cross-check informasi dan riset awal.',
    celah: 'Setiap platform memiliki kebijakan privasi berbeda; tidak ada yang 100% aman.',
    status: 'TERUKUR',
    skor: 70,
    tag: ['Research', 'Verification', 'Cross-check'],
  },
]

const warnaStatus = {
  'AKTIF DIGUNAKAN': 'text-white border-white',
  'DITELUSURI': 'text-white/60 border-white/30',
  'WASPADA': 'text-white/50 border-white/25',
  'TERBATAS': 'text-white/30 border-white/15',
  'TERUKUR': 'text-white/60 border-white/30',
}

const InvestasiAI = () => {
  const [dipilih, setDipilih] = useState(null)
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="ai-tools" className="relative py-28 lg:py-36 bg-hitam-abu overflow-hidden">
      {/* Nomor seksi */}
      <div className="absolute top-8 right-8 font-judul text-white/[0.03] select-none pointer-events-none"
        style={{ fontSize: 'clamp(6rem, 18vw, 14rem)', lineHeight: 1 }}>
        07
      </div>

      {/* Latar dot grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-white/40" />
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Alat Investigasi</span>
          </div>
          <h2 className="font-judul text-white" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
            KERENTANAN AI
          </h2>
        </motion.div>

        {/* Peringatan */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-16 border-l-2 border-white/40 pl-4 py-2"
        >
          <p className="font-mono text-sm text-white/40 leading-relaxed">
            Setiap alat AI memiliki dua sisi: potensi investigasi dan potensi eksploitasi.
            Mendalami keduanya adalah keahlian kunci.
          </p>
        </motion.div>

        {/* Grid AI Tools */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {dataAI.map((ai, i) => (
            <motion.div
              key={ai.nama}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setDipilih(dipilih === i ? null : i)}
              className={`kartu-kasus cursor-pointer transition-all duration-300 ${
                dipilih === i ? 'border-white/30' : ''
              }`}
              data-hover
            >
              <div className="p-5 lg:p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-mono text-xs text-white/25 mb-1">{ai.kategori}</div>
                    <h3 className="font-judul text-white text-2xl uppercase tracking-wide">
                      {ai.nama}
                    </h3>
                  </div>
                  <span className={`font-mono text-xs border px-2 py-0.5 flex-shrink-0 ${warnaStatus[ai.status]}`}>
                    {ai.status}
                  </span>
                </div>

                {/* Skor kepercayaan */}
                <div className="mb-4">
                  <div className="flex justify-between font-mono text-xs text-white/30 mb-1">
                    <span>SKOR KEPERCAYAAN</span>
                    <span>{ai.skor}%</span>
                  </div>
                  <div className="h-px bg-white/10">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: ai.skor / 100 } : {}}
                      transition={{ delay: 0.5 + i * 0.1, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="h-full bg-white origin-left"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {ai.tag.map(t => (
                    <span key={t} className="font-mono text-xs text-white/25 bg-white/5 px-2 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Detail tersembunyi */}
              <AnimatePresence>
                {dipilih === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden border-t border-white/10"
                  >
                    <div className="p-5 lg:p-6 space-y-4">
                      <div>
                        <p className="font-mono text-xs text-white/25 uppercase tracking-widest mb-2">
                          Kegunaan Investigasi
                        </p>
                        <p className="text-white/50 text-sm leading-relaxed">{ai.kegunaan}</p>
                      </div>
                      <div>
                        <p className="font-mono text-xs text-white/25 uppercase tracking-widest mb-2">
                          ⚠ Celah Keamanan
                        </p>
                        <p className="text-white/40 text-sm leading-relaxed">{ai.celah}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Kesimpulan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-16 grid lg:grid-cols-3 gap-6 pt-12 border-t border-white/10"
        >
          {[
            { angka: '6+', label: 'Platform AI Ditelusuri' },
            { angka: '100%', label: 'Sadar Risiko Privasi' },
            { angka: '0', label: 'Data Sensitif Dibagikan' },
          ].map((stat, i) => (
            <div key={i} className="text-center border border-white/10 p-6">
              <div className="font-judul text-white text-5xl mb-2">{stat.angka}</div>
              <div className="font-mono text-xs text-white/30 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default InvestasiAI
