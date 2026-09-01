import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const dataKasus = [
  {
    tahun: '2023',
    kasus: [
      {
        id: 'k1',
        judul: 'Kasus Ferdy Sambo',
        kode: 'KS-2023-01',
        status: 'DISOROT',
        deskripsi: 'Mendalami kronologi pembunuhan berencana oleh petinggi Polri. Menganalisis celah narasi resmi vs fakta lapangan, jaringan perlindungan internal, dan manipulasi alat bukti digital.',
        temuan: ['Rekayasa TKP terstruktur', 'Jaringan backing internal Polri', 'Manipulasi CCTV gedung'],
        tingkat: 'TINGGI',
      },
      {
        id: 'k2',
        judul: 'Sabu-sabu Berkedok Sabun',
        kode: 'KS-2023-02',
        status: 'TERBUKA',
        deskripsi: 'Investigasi jaringan distribusi narkoba yang menggunakan produk rumah tangga sebagai kamuflase. Menelusuri jalur distribusi dari hulu ke hilir dan keterlibatan oknum aparat.',
        temuan: ['Jaringan distribusi 3 provinsi', 'Keterlibatan oknum bea cukai', 'Metode pengiriman via marketplace'],
        tingkat: 'KRITIS',
      },
      {
        id: 'k3',
        judul: 'Kekacauan UUD — Tidak Tertata',
        kode: 'KS-2023-03',
        status: 'DISOROT',
        deskripsi: 'Menganalisis inkonsistensi amandemen UUD yang menciptakan celah hukum yang dimanfaatkan kelompok elite. Pemetaan pasal-pasal yang sengaja dibiarkan multitafsir.',
        temuan: ['12 pasal ambigu teridentifikasi', 'Celah jabatan pejabat', 'Warisan kepentingan oligarki'],
        tingkat: 'TINGGI',
      },
    ],
  },
  {
    tahun: '2024',
    kasus: [
      {
        id: 'k4',
        judul: 'Manipulasi Skema Ponzi',
        kode: 'KS-2024-01',
        status: 'TUNTAS',
        deskripsi: 'Membongkar skema investasi palsu yang menjangkau ribuan korban. Menelusuri aliran dana melalui multiple rekening dan perusahaan cangkang lintas negara.',
        temuan: ['Dana Rp 180M+ hilang', 'Jaringan 7 perusahaan cangkang', 'Koneksi ke pejabat daerah'],
        tingkat: 'KRITIS',
      },
    ],
  },
  {
    tahun: '2025',
    kasus: [
      {
        id: 'k5',
        judul: 'Kecurangan Ijazah & Tata Data',
        kode: 'KS-2025-01',
        status: 'BERLANGSUNG',
        deskripsi: 'Menginvestigasi jaringan jual-beli ijazah palsu yang melibatkan pejabat aktif. Menganalisis kebocoran data kependudukan yang diperjualbelikan di dark web.',
        temuan: ['Database 40jt WNI bocor', 'Jaringan ijazah 15 universitas', 'Koneksi ke dark web marketplace'],
        tingkat: 'KRITIS',
      },
      {
        id: 'k6',
        judul: 'Kerentanan AI Tools — Eksploitasi Data',
        kode: 'KS-2025-02',
        status: 'BERLANGSUNG',
        deskripsi: 'Fokus pada celah keamanan platform AI (GitHub, Kiro, Antigravity, Kimi, Meta AI) yang berpotensi disalahgunakan untuk pengumpulan data tanpa izin dan profiling warga.',
        temuan: ['5 platform AI ditelusuri', 'Data training tanpa persetujuan', 'Celah prompt injection teridentifikasi'],
        tingkat: 'TINGGI',
      },
    ],
  },
]

const warnaStatus = {
  'DISOROT': 'text-white/70 border-white/30',
  'TERBUKA': 'text-white border-white',
  'TUNTAS': 'text-white/40 border-white/20',
  'BERLANGSUNG': 'text-white border-white animate-pulse',
  'KRITIS': 'text-white/90 border-white/50',
}

const KartuKasus = ({ kasus, terlihat, delay }) => {
  const [terbuka, setTerbuka] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={terlihat ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="kartu-kasus cursor-pointer"
      onClick={() => setTerbuka(!terbuka)}
      data-hover
    >
      <div className="p-5 lg:p-6">
        {/* Header kartu */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1.5">
              <span className="font-mono text-xs text-white/25">{kasus.kode}</span>
              <span className={`font-mono text-xs border px-2 py-0.5 ${warnaStatus[kasus.status]}`}>
                {kasus.status}
              </span>
            </div>
            <h4 className="font-judul text-white text-xl lg:text-2xl uppercase tracking-wide">
              {kasus.judul}
            </h4>
          </div>
          <motion.div
            animate={{ rotate: terbuka ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-white/30 text-xl mt-1 flex-shrink-0"
          >
            +
          </motion.div>
        </div>

        {/* Level tingkat */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-white/25">TINGKAT:</span>
          <span className={`font-mono text-xs font-bold ${
            kasus.tingkat === 'KRITIS' ? 'text-white' : 'text-white/60'
          }`}>
            {kasus.tingkat}
          </span>
        </div>
      </div>

      {/* Detail yang bisa dibuka */}
      <AnimatePresence>
        {terbuka && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10"
          >
            <div className="p-5 lg:p-6 space-y-4">
              <p className="text-white/50 text-sm leading-relaxed">{kasus.deskripsi}</p>
              <div>
                <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-3">
                  Temuan Kunci:
                </p>
                <ul className="space-y-2">
                  {kasus.temuan.map((t, i) => (
                    <li key={i} className="flex items-start gap-3 font-mono text-xs text-white/60">
                      <span className="text-white/20 mt-0.5 flex-shrink-0">▸</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const Kasus = () => {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="kasus" className="relative py-28 lg:py-36 bg-hitam overflow-hidden">
      {/* Nomor seksi */}
      <div className="absolute top-8 right-8 font-judul text-white/[0.03] select-none pointer-events-none"
        style={{ fontSize: 'clamp(6rem, 18vw, 14rem)', lineHeight: 1 }}>
        04
      </div>

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
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Rekam Jejak</span>
          </div>
          <h2 className="font-judul text-white" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
            KASUS INVESTIGASI
          </h2>
          <p className="text-white/40 mt-4 max-w-xl font-mono text-sm leading-relaxed">
            Klik kasus untuk membuka detail temuan. Semua kasus adalah nyata — sebagian masih berjalan.
          </p>
        </motion.div>

        {/* Timeline per tahun */}
        <div className="space-y-16">
          {dataKasus.map((grup, gi) => (
            <div key={grup.tahun} className="relative">
              <div className="grid lg:grid-cols-[120px,1fr] gap-8 lg:gap-12">
                {/* Label tahun */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: gi * 0.2, duration: 0.7 }}
                  className="lg:text-right"
                >
                  <div className="font-judul text-white/80 sticky top-24"
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
                    {grup.tahun}
                  </div>
                  <div className="hidden lg:block mt-2 w-full h-px bg-white/10" />
                </motion.div>

                {/* Daftar kasus */}
                <div className="relative">
                  {/* Garis timeline */}
                  <div className="hidden lg:block absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />

                  <div className="space-y-4">
                    {grup.kasus.map((kasus, ki) => (
                      <KartuKasus
                        key={kasus.id}
                        kasus={kasus}
                        terlihat={inView}
                        delay={gi * 0.2 + ki * 0.12}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer kasus */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-8 font-mono text-xs text-white/30"
        >
          <span>Total Kasus: <strong className="text-white/60">6</strong></span>
          <span>Masih Berlangsung: <strong className="text-white/60">2</strong></span>
          <span>Tuntas: <strong className="text-white/60">1</strong></span>
          <span>Disorot: <strong className="text-white/60">2</strong></span>
          <span>Terbuka: <strong className="text-white/60">1</strong></span>
        </motion.div>
      </div>
    </section>
  )
}

export default Kasus
