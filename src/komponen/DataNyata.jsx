import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, TrendingUp, AlertTriangle, Database, Globe, Clock } from 'lucide-react'

// ─── Data riset berdasarkan sumber nyata ──────────────────────────────────────
const dataNyata = {
  breachTerbaru: [
    {
      tanggal: 'Sep 2025',
      judul: 'Tries Digital Indonesia',
      detail: '1 juta+ record terekspos di forum ilegal',
      sumber: 'Heroic.com',
      url: 'https://heroic.com/darkhive-breaches/tries-digital-indonesia/',
      level: 'KRITIS',
    },
    {
      tanggal: 'Apr 2025',
      judul: 'Data Kab. Tuban Bocor',
      detail: 'Database demografi & profil personal warga Tuban',
      sumber: 'BrinzTech',
      url: 'https://www.brinztech.com/breach-alerts/brinztech-sovereign-threat-alert-government-directory-bank-jatim-account-numbers-leaked-via-pdf-arrays-kabupaten-tuban/',
      level: 'TINGGI',
    },
    {
      tanggal: 'Feb 2026',
      judul: '58 Juta Data Siswa',
      detail: 'Klaim oleh "SN1F" — masih dalam investigasi',
      sumber: 'TorNews',
      url: 'https://tornews.com/news/data-breaches/indonesia-student-data-dark-web-sale/',
      level: 'KRITIS',
    },
  ],
  angkaKunci: [
    { nilai: '34.93%', label: 'Target dark web = sektor publik Indonesia', sumber: 'SOCRadar 2025', url: 'https://socradar.io/resources/report/indonesia-threat-landscape-report-2025/' },
    { nilai: 'Rp 200', label: 'Harga NIK/record di pasar gelap digital', sumber: 'Vida.id 2025', url: 'https://vida.id/en/blog/fake-id-cards' },
    { nilai: '$23 Jt', label: 'Kerugian Ponzi WNI Francius Marganda', sumber: 'ICE.gov 2024', url: 'https://www.ice.gov/news/releases/indonesian-national-pleads-guilty-international-ponzi-scheme' },
    { nilai: '97',     label: 'Personel Polri terlibat tutup kasus Sambo', sumber: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Murder_of_Nofriansyah_Yosua_Hutabarat' },
    { nilai: '212 Jt', label: 'Pengguna internet Indonesia (penetrasi 74.6%)', sumber: 'DataReportal 2025', url: 'https://datareportal.com/reports/digital-2025-indonesia' },
    { nilai: '55.7%',  label: 'Serangan siber menarget Indonesia secara spesifik', sumber: 'SOCRadar 2025', url: 'https://socradar.io/resources/report/indonesia-threat-landscape-report-2025/' },
  ],
  referensiUtama: [
    { kategori: 'PUTUSAN RESMI', judul: 'Ferdy Sambo Divonis Mati', media: 'Channel News Asia', tahun: '2023', url: 'https://www.channelnewsasia.com/asia/former-police-general-fredy-sambo-death-murder-3273866' },
    { kategori: 'SIARAN PERS',   judul: 'WNI Mengaku Bersalah — Ponzi $23 Juta', media: 'ICE.gov (Pemerintah AS)', tahun: '2024', url: 'https://www.ice.gov/news/releases/indonesian-national-pleads-guilty-international-ponzi-scheme' },
    { kategori: 'THREAT INTEL',  judul: 'Indonesia Threat Landscape 2025', media: 'SOCRadar', tahun: '2025', url: 'https://socradar.io/resources/report/indonesia-threat-landscape-report-2025/' },
    { kategori: 'BREACH REPORT', judul: '58 Juta Data Siswa Bocor', media: 'TorNews', tahun: '2026', url: 'https://tornews.com/news/data-breaches/indonesia-student-data-dark-web-sale/' },
    { kategori: 'ARSIP KASUS',   judul: 'Pembunuhan Brigadir J — Rekam Lengkap', media: 'Wikipedia', tahun: '2022–23', url: 'https://en.wikipedia.org/wiki/Murder_of_Nofriansyah_Yosua_Hutabarat' },
    { kategori: 'INVESTIGASI',   judul: 'NIK Dijual Rp 200/Record di Dark Web', media: 'Vida.id', tahun: '2025', url: 'https://vida.id/en/blog/fake-id-cards' },
  ],
}

const warnaLevel = { KRITIS: 'text-white border-white', TINGGI: 'text-white/60 border-white/40' }
const warnaKategori = {
  'PUTUSAN RESMI': 'bg-white/10 text-white',
  'SIARAN PERS':   'bg-white/8 text-white/80',
  'THREAT INTEL':  'bg-white/6 text-white/70',
  'BREACH REPORT': 'bg-white/5 text-white/65',
  'ARSIP KASUS':   'bg-white/4 text-white/55',
  'INVESTIGASI':   'bg-white/4 text-white/55',
}

const DataNyata = () => {
  const [tab, setTab] = useState('breach')
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  const tabs = [
    { key: 'breach', label: 'Breach Terbaru',  Ikon: AlertTriangle },
    { key: 'angka',  label: 'Angka Kunci',     Ikon: TrendingUp    },
    { key: 'ref',    label: 'Referensi Utama', Ikon: Database      },
  ]

  return (
    <section id="data-nyata" className="relative py-20 lg:py-28 bg-hitam overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-white/40" />
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Basis Data</span>
          </div>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <h2 className="font-judul text-white" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
              DATA NYATA
            </h2>
            <a href="https://socradar.io/resources/report/indonesia-threat-landscape-report-2025/"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-xs text-white/35 border border-white/10
                         px-3 py-1.5 hover:border-white/30 hover:text-white/60 transition-all"
              data-hover
            >
              <Globe size={11} /> Buka Laporan SOCRadar 2025
            </a>
          </div>
          <p className="font-mono text-sm text-white/35 mt-3 max-w-xl leading-relaxed">
            Semua data bersumber dari laporan publik terverifikasi — bukan estimasi, bukan opini.
          </p>
        </motion.div>

        {/* Tab selector */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-0 border border-white/10 w-fit mb-8"
        >
          {tabs.map(t => {
            const Ikon = t.Ikon
            return (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 font-mono text-xs uppercase tracking-widest
                             transition-all duration-200 ${
                  tab === t.key ? 'bg-white text-hitam' : 'text-white/40 hover:text-white/70'
                }`}
                data-hover
              >
                <Ikon size={11} />
                <span className="hidden sm:inline">{t.label}</span>
                <span className="sm:hidden">{t.label.split(' ')[0]}</span>
              </button>
            )
          })}
        </motion.div>

        {/* Konten tab */}
        {tab === 'breach' && (
          <div className="space-y-3">
            {dataNyata.breachTerbaru.map((item, i) => (
              <motion.a key={i} href={item.url} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                className="kartu-kasus p-4 sm:p-5 flex items-start gap-4 group"
                data-hover
              >
                <div className="flex-shrink-0 mt-1">
                  <div className={`font-mono text-[10px] border px-2 py-0.5 ${warnaLevel[item.level]}`}>
                    {item.level}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap mb-1">
                    <span className="font-judul text-white text-xl uppercase tracking-wide">{item.judul}</span>
                    <span className="font-mono text-xs text-white/30">{item.tanggal}</span>
                  </div>
                  <p className="font-mono text-xs text-white/45 leading-relaxed">{item.detail}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Globe size={9} className="text-white/20" />
                    <span className="font-mono text-[10px] text-white/25">{item.sumber}</span>
                  </div>
                </div>
                <ExternalLink size={13} className="text-white/20 group-hover:text-white/55 flex-shrink-0 mt-1 transition-colors" />
              </motion.a>
            ))}
          </div>
        )}

        {tab === 'angka' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {dataNyata.angkaKunci.map((item, i) => (
              <motion.a key={i} href={item.url} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.6 }}
                className="kartu-kasus p-5 group"
                data-hover
              >
                <div className="font-judul text-white mb-2 leading-none" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
                  {item.nilai}
                </div>
                <p className="font-mono text-xs text-white/55 leading-snug mb-3">{item.label}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Clock size={9} className="text-white/20" />
                    <span className="font-mono text-[9px] text-white/25">{item.sumber}</span>
                  </div>
                  <ExternalLink size={11} className="text-white/15 group-hover:text-white/50 transition-colors" />
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {tab === 'ref' && (
          <div className="space-y-2">
            {dataNyata.referensiUtama.map((item, i) => (
              <motion.a key={i} href={item.url} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-white/8
                           hover:border-white/25 hover:bg-white/[0.02] transition-all duration-200 group"
                data-hover
              >
                <span className={`font-mono text-[9px] px-2 py-1 flex-shrink-0 whitespace-nowrap ${
                  warnaKategori[item.kategori] || 'bg-white/4 text-white/40'
                }`}>
                  {item.kategori}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-xs sm:text-sm text-white/65 group-hover:text-white/85 transition-colors truncate">
                    {item.judul}
                  </div>
                  <div className="font-mono text-[10px] text-white/25 mt-0.5">{item.media} · {item.tahun}</div>
                </div>
                <ExternalLink size={12} className="text-white/20 group-hover:text-white/55 flex-shrink-0 transition-colors" />
              </motion.a>
            ))}
          </div>
        )}

        {/* Footer link ke semua sumber */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}
          className="mt-8 pt-6 border-t border-white/8 flex flex-wrap gap-x-6 gap-y-2"
        >
          <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest w-full mb-1">
            Sumber terverifikasi:
          </span>
          {[
            { label: 'SOCRadar',       url: 'https://socradar.io/resources/report/indonesia-threat-landscape-report-2025/' },
            { label: 'ICE.gov',        url: 'https://www.ice.gov/news/releases/indonesian-national-pleads-guilty-international-ponzi-scheme' },
            { label: 'Wikipedia',      url: 'https://en.wikipedia.org/wiki/Murder_of_Nofriansyah_Yosua_Hutabarat' },
            { label: 'TorNews',        url: 'https://tornews.com/news/data-breaches/indonesia-student-data-dark-web-sale/' },
            { label: 'Vida.id',        url: 'https://vida.id/en/blog/fake-id-cards' },
            { label: 'The Diplomat',   url: 'https://thediplomat.com/2022/09/bjorka-the-online-hacker-trying-to-take-down-the-indonesian-government/' },
            { label: 'BrinzTech',      url: 'https://www.brinztech.com/breach-alerts/brinztech-sovereign-threat-alert-government-directory-bank-jatim-account-numbers-leaked-via-pdf-arrays-kabupaten-tuban/' },
            { label: 'DataReportal',   url: 'https://datareportal.com/reports/digital-2025-indonesia' },
          ].map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
              className="font-mono text-[10px] text-white/25 hover:text-white/55 transition-colors flex items-center gap-1"
              data-hover
            >
              <ExternalLink size={8} />
              {s.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default DataNyata
