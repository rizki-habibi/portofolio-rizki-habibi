import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, ChevronDown, Calendar, Tag, Circle } from 'lucide-react'

const dataTimeline = [
  {
    tahun: '2022',
    bulan: 'Juli–Agustus',
    judul: 'Mulai Investigasi Kasus Brigadir J',
    tipe: 'INVESTIGASI',
    deskripsi: 'Mengikuti perkembangan kasus pembunuhan Brigadir J sejak hari pertama. Mendokumentasikan inkonsistensi narasi resmi Polri vs bukti lapangan.',
    dampak: 'Narasi "tembak-menembak" terbukti rekayasa 30 hari kemudian.',
    link: { label: 'Wikipedia — Kronologi Lengkap', url: 'https://en.wikipedia.org/wiki/Murder_of_Nofriansyah_Yosua_Hutabarat' },
    status: 'SELESAI',
  },
  {
    tahun: '2022',
    bulan: 'September',
    judul: 'Pantau Operasi Bjorka — Data KTP Bocor Massal',
    tipe: 'SIBER',
    deskripsi: 'Menelusuri rangkaian aksi hacker Bjorka yang meretas data pemerintah Indonesia. Menganalisis implikasi kebijakan registrasi SIM 2017 terhadap eksposur data warga.',
    dampak: 'Kesadaran publik tentang bahaya data terpusat meningkat signifikan.',
    link: { label: 'The Diplomat — Bjorka vs Pemerintah', url: 'https://thediplomat.com/2022/09/bjorka-the-online-hacker-trying-to-take-down-the-indonesian-government/' },
    status: 'SELESAI',
  },
  {
    tahun: '2023',
    bulan: 'Februari',
    judul: 'Dokumentasi Vonis Mati Ferdy Sambo',
    tipe: 'HUKUM',
    deskripsi: 'Mendokumentasikan vonis mati PN Jakarta Selatan terhadap Ferdy Sambo. Analisis mendalam tentang 97 personel Polri yang terlibat penutupan kasus.',
    dampak: 'Artikel analisis dibaca 40K+ kali di platform investigasi.',
    link: { label: 'CNA — Vonis Hukuman Mati', url: 'https://www.channelnewsasia.com/asia/former-police-general-fredy-sambo-death-murder-3273866' },
    status: 'SELESAI',
  },
  {
    tahun: '2023',
    bulan: 'Mei–Desember',
    judul: 'Investigasi Jaringan Sabu-Sabun & Celah UUD',
    tipe: 'INVESTIGASI',
    deskripsi: 'Dua investigasi paralel: (1) Pemetaan jaringan distribusi narkoba via marketplace online, (2) Analisis pasal-pasal UUD yang rentan disalahgunakan oleh elite politik.',
    dampak: 'Temuan diserahkan ke jaringan jurnalis investigatif independen.',
    link: { label: 'Protes Indonesia 2025 — Dampak Lanjutan', url: 'https://en.wikipedia.org/wiki/2025_Indonesian_protests' },
    status: 'BERLANJUT',
  },
  {
    tahun: '2024',
    bulan: 'Maret–Desember',
    judul: 'Bongkar Skema Ponzi — Pola Berulang',
    tipe: 'KEUANGAN',
    deskripsi: 'Investigasi intensif skema investasi bodong yang menjangkau ribuan korban. Mengacu pola WNI Francius Marganda yang divonis bersalah atas Ponzi $23 juta di AS.',
    dampak: 'Laporan 200+ testimoni korban diserahkan ke Bareskrim & OJK.',
    link: { label: 'ICE.gov — WNI Pleads Guilty $23M', url: 'https://www.ice.gov/news/releases/indonesian-national-pleads-guilty-international-ponzi-scheme' },
    status: 'SELESAI',
  },
  {
    tahun: '2025',
    bulan: 'Januari–April',
    judul: 'Monitor Dark Web — Data Kependudukan Indonesia',
    tipe: 'SIBER',
    deskripsi: 'Pemantauan aktif forum dark web BreachForums, Telegram ilegal, dan pasar data. Mendokumentasikan kebocoran data Kab. Tuban (April) dan ancaman data keuangan.',
    dampak: 'Identifikasi 3 forum aktif yang menjual data NIK warga Indonesia.',
    link: { label: 'BrinzTech — Kebocoran Data Tuban', url: 'https://www.brinztech.com/breach-alerts/brinztech-sovereign-threat-alert-government-directory-bank-jatim-account-numbers-leaked-via-pdf-arrays-kabupaten-tuban/' },
    status: 'AKTIF',
  },
  {
    tahun: '2025',
    bulan: 'Mei–September',
    judul: 'Investigasi Kontroversi Ijazah & 58 Juta Data Siswa',
    tipe: 'DATA',
    deskripsi: 'Mendalami kontroversi ijazah pejabat publik bersamaan dengan klaim kebocoran 58 juta data siswa Indonesia. Verifikasi silang antara data dark web dan sumber resmi pemerintah.',
    dampak: 'Proses verifikasi masih berjalan — laporan dalam penyusunan.',
    link: { label: 'TorNews — 58 Juta Data Siswa', url: 'https://tornews.com/news/data-breaches/indonesia-student-data-dark-web-sale/' },
    status: 'AKTIF',
  },
  {
    tahun: '2025',
    bulan: 'Oktober–Sekarang',
    judul: 'Riset Kerentanan AI Tools & Privasi Data Warga',
    tipe: 'TEKNOLOGI',
    deskripsi: 'Menguji prompt injection, kebocoran konteks sesi, dan potensi data harvesting pada 6 platform AI aktif. Indonesia berada di posisi 55.7% target dari total ancaman siber regional.',
    dampak: 'Hasil uji platform GitHub, Kiro, Kimi, Meta AI, Antigravity dalam dokumentasi.',
    link: { label: 'SOCRadar — Indonesia Threat Landscape 2025', url: 'https://socradar.io/resources/report/indonesia-threat-landscape-report-2025/' },
    status: 'AKTIF',
  },
]

const warnaTipe = {
  INVESTIGASI: 'border-white/50 text-white/70',
  SIBER:       'border-white/40 text-white/60',
  HUKUM:       'border-white/35 text-white/55',
  KEUANGAN:    'border-white/30 text-white/50',
  DATA:        'border-white/30 text-white/50',
  TEKNOLOGI:   'border-white/40 text-white/60',
}

const warnaStatus = {
  SELESAI:    { dot: 'bg-white/40',    teks: 'text-white/40' },
  BERLANJUT:  { dot: 'bg-white/60',    teks: 'text-white/60' },
  AKTIF:      { dot: 'bg-white animate-pulse', teks: 'text-white' },
}

const ItemTimeline = ({ item, index, inView }) => {
  const [buka, setBuka] = useState(false)
  const w = warnaStatus[item.status]

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid lg:grid-cols-[1fr,40px,1fr] gap-0 items-start"
    >
      {/* Konten kiri (genap) atau kanan (ganjil) */}
      {index % 2 === 0 ? (
        <>
          <button onClick={() => setBuka(!buka)}
            className="lg:text-right lg:pr-8 pb-8 lg:pb-12 group text-left" data-hover>
            <KontenItem item={item} buka={buka} />
          </button>
          {/* Titik tengah */}
          <div className="hidden lg:flex flex-col items-center">
            <div className={`w-3 h-3 rounded-full border-2 border-hitam flex-shrink-0 z-10 ${w.dot}`} />
            <div className="flex-1 w-px bg-white/10 mt-1" />
          </div>
          <div className="hidden lg:block" />
        </>
      ) : (
        <>
          <div className="hidden lg:block" />
          <div className="hidden lg:flex flex-col items-center">
            <div className={`w-3 h-3 rounded-full border-2 border-hitam flex-shrink-0 z-10 ${w.dot}`} />
            <div className="flex-1 w-px bg-white/10 mt-1" />
          </div>
          <button onClick={() => setBuka(!buka)}
            className="lg:pl-8 pb-8 lg:pb-12 group text-left" data-hover>
            <KontenItem item={item} buka={buka} />
          </button>
        </>
      )}
    </motion.div>
  )
}

const KontenItem = ({ item, buka }) => {
  const w = warnaStatus[item.status]
  return (
    <div className="kartu-kasus p-5 text-left">
      {/* Tags atas */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <span className={`font-mono text-[10px] border px-2 py-0.5 ${warnaTipe[item.tipe]}`}>{item.tipe}</span>
        <div className="flex items-center gap-1">
          <Circle size={6} className={`fill-current ${w.teks}`} />
          <span className={`font-mono text-[10px] ${w.teks}`}>{item.status}</span>
        </div>
        <div className="ml-auto flex items-center gap-1 text-white/25">
          <Calendar size={9} />
          <span className="font-mono text-[9px]">{item.bulan} {item.tahun}</span>
        </div>
      </div>

      <h4 className="font-judul text-white text-lg uppercase tracking-wide leading-tight mb-2">
        {item.judul}
      </h4>

      <AnimatePresence>
        {buka && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden"
          >
            <p className="text-white/50 text-sm leading-relaxed mb-3">{item.deskripsi}</p>
            <div className="border-l-2 border-white/15 pl-3 mb-3">
              <p className="font-mono text-xs text-white/35 italic">
                Dampak: {item.dampak}
              </p>
            </div>
            <a href={item.link.url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-white/40 hover:text-white/70 border border-white/10 px-3 py-1.5 hover:border-white/25 transition-all"
              data-hover
            >
              <ExternalLink size={11} />
              {item.link.label}
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
        <span className="font-mono text-[9px] text-white/20">{item.bulan} {item.tahun}</span>
        <ChevronDown size={12} className={`text-white/20 transition-transform duration-200 ${buka ? 'rotate-180' : ''}`} />
      </div>
    </div>
  )
}

const TimelineAktivisme = () => {
  const { ref, inView } = useInView({ threshold: 0.04, triggerOnce: true })
  const aktif  = dataTimeline.filter(d => d.status === 'AKTIF').length
  const selesai = dataTimeline.filter(d => d.status === 'SELESAI').length

  return (
    <section id="timeline" className="relative py-28 lg:py-36 bg-hitam overflow-hidden">
      <div className="absolute top-8 left-8 font-judul text-white/[0.03] select-none pointer-events-none"
        style={{ fontSize: 'clamp(6rem, 18vw, 14rem)', lineHeight: 1 }}>ACT</div>

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-white/40" />
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Rekam Aktivisme</span>
          </div>
          <h2 className="font-judul text-white" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>TIMELINE AKTIVISME</h2>
          <p className="text-white/40 mt-4 max-w-xl font-mono text-sm leading-relaxed">
            Kronologi lengkap investigasi & aktivisme dari 2022 hingga sekarang. Klik kartu untuk detail dan sumber.
          </p>
        </motion.div>

        {/* Summary bar */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap gap-6 mb-16 font-mono text-xs"
        >
          <div className="flex items-center gap-2">
            <Circle size={8} className="text-white fill-white animate-pulse" />
            <span className="text-white">{aktif} Investigasi Aktif</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle size={8} className="text-white/40 fill-white/40" />
            <span className="text-white/40">{selesai} Selesai</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/25">Rentang: 2022–Sekarang</span>
          </div>
          <div className="ml-auto">
            <a href="https://en.wikipedia.org/wiki/2025_Indonesian_protests"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-white/25 hover:text-white/50 transition-colors" data-hover>
              <span>Konteks: Protes Indonesia 2025</span>
              <ExternalLink size={10} />
            </a>
          </div>
        </motion.div>

        {/* Garis timeline tengah */}
        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent -translate-x-1/2" />

          <div className="space-y-0 lg:space-y-0">
            {dataTimeline.map((item, i) => (
              <ItemTimeline key={item.judul} item={item} index={i} inView={inView} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1, duration: 0.8 }}
          className="mt-8 pt-8 border-t border-white/10 text-center"
        >
          <p className="font-judul text-white/10 select-none" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>
            TIDAK ADA YANG BERHENTI
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default TimelineAktivisme
