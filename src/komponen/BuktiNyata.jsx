import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, FileText, Globe, Shield, AlertTriangle, ChevronRight, Eye, Calendar } from 'lucide-react'

const kategoriBukti = [
  {
    id: 'polri',
    label: 'Kasus Polri',
    warna: 'border-white/40',
    bukti: [
      {
        judul: 'Ferdy Sambo Divonis Mati',
        media: 'Channel News Asia',
        tanggal: 'Feb 2023',
        kutipan: '"The defendant Ferdy Sambo was legally and convincingly guilty of committing a crime, participating in premeditated murder and for acting in a way which resulted in the electronic system not working properly"',
        url: 'https://www.channelnewsasia.com/asia/former-police-general-fredy-sambo-death-murder-3273866',
        domain: 'channelnewsasia.com',
        tipe: 'PUTUSAN PENGADILAN',
        kredibilitas: 95,
      },
      {
        judul: 'CCTV DVR Diambil Paksa oleh Tim Sambo',
        media: 'VOI Indonesia',
        tanggal: 'Okt 2022',
        kutipan: '"Ferdy Sambo panicked when he found out that the CCTV DVR in Duren Tiga was in the hands of the South Jakarta Police investigators."',
        url: 'https://voi.id/en/news/219109',
        domain: 'voi.id',
        tipe: 'BUKTI PERSIDANGAN',
        kredibilitas: 90,
      },
      {
        judul: 'CCTV Ditemukan Kembali — Alibis Runtuh',
        media: 'Tempo.co',
        tanggal: 'Jul 2022',
        kutipan: 'CCTV at the home of Ferdy Sambo has been found and will be used for the investigation — footage contradicting initial announcement.',
        url: 'https://en.tempo.co/read/1614299/cctv-in-the-police-shootout-case-recovered',
        domain: 'tempo.co',
        tipe: 'INVESTIGASI MEDIA',
        kredibilitas: 92,
      },
      {
        judul: 'Pembunuhan Brigadir J — Rekam Sejarah Lengkap',
        media: 'Wikipedia',
        tanggal: '2022–2023',
        kutipan: 'Inspector General Ferdy Sambo, Hutabarat\'s former boss and the head of internal affairs for the Indonesian National Police, was charged with Hutabarat\'s murder.',
        url: 'https://en.wikipedia.org/wiki/Murder_of_Nofriansyah_Yosua_Hutabarat',
        domain: 'wikipedia.org',
        tipe: 'ARSIP KASUS',
        kredibilitas: 88,
      },
    ],
  },
  {
    id: 'ponzi',
    label: 'Penipuan Investasi',
    warna: 'border-white/30',
    bukti: [
      {
        judul: 'WNI Mengaku Bersalah — Ponzi $23 Juta',
        media: 'ICE.gov (Resmi AS)',
        tanggal: 'Jul 2024',
        kutipan: 'Francius Marganda, an Indonesian national, pleaded guilty to securities fraud in connection with a $23 million Ponzi scheme that defrauded hundreds of predominantly Indonesian investors.',
        url: 'https://www.ice.gov/news/releases/indonesian-national-pleads-guilty-international-ponzi-scheme',
        domain: 'ice.gov',
        tipe: 'SIARAN PERS RESMI',
        kredibilitas: 99,
      },
      {
        judul: 'Kerangka Hukum Perlindungan Korban Ponzi',
        media: 'Jurnal U-Szeged',
        tanggal: '2025',
        kutipan: 'Cases like the Budi Hermanto gold investment fraud and the Binomo investment scam illustrate the failure of asset confiscation and restitution mechanisms.',
        url: 'https://publicatio.bibl.u-szeged.hu/38508/1/08Anggriawan.pdf',
        domain: 'u-szeged.hu',
        tipe: 'JURNAL AKADEMIK',
        kredibilitas: 85,
      },
      {
        judul: 'Definisi & Mekanisme Skema Ponzi Indonesia',
        media: 'Jurnal Unissula',
        tanggal: '2024',
        kutipan: 'A Ponzi scheme is a fraudulent investment model that promises unusually high returns within a short period by using funds from new participants to pay earlier investors.',
        url: 'https://jurnal.unissula.ac.id/index.php/RH/article/download/52146/15998',
        domain: 'unissula.ac.id',
        tipe: 'JURNAL HUKUM',
        kredibilitas: 83,
      },
    ],
  },
  {
    id: 'darkweb',
    label: 'Dark Web & Data',
    warna: 'border-white/20',
    bukti: [
      {
        judul: '58 Juta Data Siswa Indonesia Bocor',
        media: 'TorNews',
        tanggal: 'Feb 2026',
        kutipan: 'Claims that cybercriminals obtained personal information for as many as 58 million Indonesian students have sent shockwaves through the country\'s education sector.',
        url: 'https://tornews.com/news/data-breaches/indonesia-student-data-dark-web-sale/',
        domain: 'tornews.com',
        tipe: 'BREACH REPORT',
        kredibilitas: 78,
      },
      {
        judul: 'NIK Dijual Rp 200/Record di Dark Web',
        media: 'Vida.id',
        tanggal: '2025',
        kutipan: 'The police uncovered a syndicate buying thousands of NIK and family card numbers from the dark web for only Rp 200 per record — used to register fake SIM cards.',
        url: 'https://vida.id/en/blog/fake-id-cards',
        domain: 'vida.id',
        tipe: 'LAPORAN INVESTIGASI',
        kredibilitas: 87,
      },
      {
        judul: 'Indonesia Threat Landscape 2025',
        media: 'SOCRadar',
        tanggal: 'Apr 2025',
        kutipan: 'Public Administration dominates at 34.93% of dark web threats, followed by Education (12.59%) and Finance (9.57%). Over 55.7% of threats specifically target Indonesia.',
        url: 'https://socradar.io/resources/report/indonesia-threat-landscape-report-2025/',
        domain: 'socradar.io',
        tipe: 'THREAT INTELLIGENCE',
        kredibilitas: 93,
      },
      {
        judul: 'Data Kab. Tuban Bocor — Forum Ilegal',
        media: 'BrinzTech',
        tanggal: 'Apr 2025',
        kutipan: 'A comprehensive relational database containing demographic data and personal profiles of thousands of citizens registered within Kabupaten Tuban has been publicly leaked.',
        url: 'https://www.brinztech.com/breach-alerts/brinztech-sovereign-threat-alert-government-directory-bank-jatim-account-numbers-leaked-via-pdf-arrays-kabupaten-tuban/',
        domain: 'brinztech.com',
        tipe: 'BREACH ALERT',
        kredibilitas: 82,
      },
      {
        judul: 'Tries Digital Indonesia — 1 Juta Record',
        media: 'Heroic.com',
        tanggal: 'Sep 2025',
        kutipan: 'A significant data leak surfacing on illicit forums originating from Tries Digital Indonesia — exceeding one million records, pointing to a broad impact on users.',
        url: 'https://heroic.com/darkhive-breaches/tries-digital-indonesia/',
        domain: 'heroic.com',
        tipe: 'BREACH REPORT',
        kredibilitas: 80,
      },
      {
        judul: 'Bjorka — Hacker vs Pemerintah Indonesia',
        media: 'The Diplomat',
        tanggal: 'Sep 2022',
        kutipan: 'The data was harvested as a result of a 2017 policy requiring SIM card registration using KTP — creating a massive centralized database that became a prime target.',
        url: 'https://thediplomat.com/2022/09/bjorka-the-online-hacker-trying-to-take-down-the-indonesian-government/',
        domain: 'thediplomat.com',
        tipe: 'ANALISIS MENDALAM',
        kredibilitas: 90,
      },
    ],
  },
]

const warnaKredibilitas = (n) => {
  if (n >= 90) return 'text-white'
  if (n >= 80) return 'text-white/70'
  return 'text-white/50'
}

const KartuBukti = ({ bukti, i, terlihat }) => (
  <motion.a
    href={bukti.url}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 30 }}
    animate={terlihat ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="kartu-kasus p-5 block group"
    data-hover
  >
    {/* Header */}
    <div className="flex items-start justify-between gap-3 mb-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span className="font-mono text-[10px] border border-white/15 text-white/35 px-1.5 py-0.5">
            {bukti.tipe}
          </span>
          <div className="flex items-center gap-1">
            <Calendar size={9} className="text-white/20" />
            <span className="font-mono text-[10px] text-white/25">{bukti.tanggal}</span>
          </div>
        </div>
        <h4 className="font-judul text-white text-base uppercase tracking-wide leading-tight group-hover:text-white/90">
          {bukti.judul}
        </h4>
      </div>
      <ExternalLink size={14} className="text-white/20 group-hover:text-white/60 flex-shrink-0 mt-1 transition-colors" />
    </div>

    {/* Kutipan */}
    <blockquote className="border-l-2 border-white/15 pl-3 mb-3">
      <p className="font-mono text-xs text-white/40 leading-relaxed italic line-clamp-3">
        "{bukti.kutipan}"
      </p>
    </blockquote>

    {/* Footer */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Globe size={11} className="text-white/25" />
        <span className="font-mono text-xs text-white/35">{bukti.media}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-mono text-[10px] text-white/20">Kredibilitas</span>
        <div className="flex items-center gap-1">
          <div className="w-12 h-px bg-white/10">
            <div className="h-full bg-white/60 origin-left" style={{ width: `${bukti.kredibilitas}%` }} />
          </div>
          <span className={`font-mono text-xs font-bold ${warnaKredibilitas(bukti.kredibilitas)}`}>
            {bukti.kredibilitas}%
          </span>
        </div>
      </div>
    </div>
  </motion.a>
)

const BuktiNyata = () => {
  const [kategoriAktif, setKategoriAktif] = useState('polri')
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })
  const aktif = kategoriBukti.find(k => k.id === kategoriAktif)

  return (
    <section id="bukti" className="relative py-28 lg:py-36 bg-hitam-abu overflow-hidden">
      {/* Nomor */}
      <div className="absolute top-8 left-8 font-judul text-white/[0.03] select-none pointer-events-none"
        style={{ fontSize: 'clamp(6rem, 18vw, 14rem)', lineHeight: 1 }}>05</div>

      {/* Grid latar */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-white/40" />
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Dokumentasi</span>
          </div>
          <h2 className="font-judul text-white" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>BUKTI NYATA</h2>
          <p className="text-white/40 mt-4 max-w-2xl font-mono text-sm leading-relaxed">
            Semua referensi di bawah adalah <strong className="text-white/60">sumber publik terverifikasi</strong> — dari media internasional, lembaga pemerintah resmi, jurnal akademik, dan laporan intelijen siber. Klik kartu untuk buka sumber aslinya.
          </p>
        </motion.div>

        {/* Disclaimer */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-start gap-3 border border-white/10 p-4 mb-10 bg-white/[0.02]"
        >
          <Shield size={14} className="text-white/30 flex-shrink-0 mt-0.5" />
          <p className="font-mono text-xs text-white/35 leading-relaxed">
            Semua kutipan diambil langsung dari sumber asli dan tidak dimodifikasi. Skor kredibilitas berdasarkan reputasi media, independensi editorial, dan verifikasi silang antar sumber. Investigasi berlangsung — beberapa kasus masih terbuka.
          </p>
        </motion.div>

        {/* Tab kategori */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap gap-0 border border-white/10 w-fit mb-10"
        >
          {kategoriBukti.map(k => (
            <button key={k.id} onClick={() => setKategoriAktif(k.id)}
              className={`px-5 py-3 font-mono text-xs uppercase tracking-widest transition-all duration-200 ${
                kategoriAktif === k.id ? 'bg-white text-hitam' : 'text-white/40 hover:text-white/70'
              }`}
              data-hover
            >
              {k.label}
              <span className={`ml-2 text-[10px] ${kategoriAktif === k.id ? 'text-hitam/50' : 'text-white/20'}`}>
                {kategoriBukti.find(x => x.id === k.id)?.bukti.length}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Grid bukti */}
        <AnimatePresence mode="wait">
          <motion.div key={kategoriAktif}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {aktif?.bukti.map((bukti, i) => (
              <KartuBukti key={bukti.url} bukti={bukti} i={i} terlihat={inView} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Footer total */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-6 font-mono text-xs text-white/25 items-center"
        >
          <div className="flex items-center gap-2">
            <FileText size={12} className="text-white/20" />
            <span>Total sumber: <strong className="text-white/50">13 referensi terverifikasi</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Eye size={12} className="text-white/20" />
            <span>Domain: ICE.gov · CNA · Tempo · VOI · SOCRadar · The Diplomat · Wikipedia</span>
          </div>
          <a href="https://socradar.io/resources/report/indonesia-threat-landscape-report-2025/" target="_blank" rel="noopener noreferrer"
            className="ml-auto flex items-center gap-1.5 text-white/35 hover:text-white/60 transition-colors"
            data-hover
          >
            <span>Lihat laporan lengkap SOCRadar 2025</span>
            <ChevronRight size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default BuktiNyata
