import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { TrendingUp, AlertTriangle, Database, Shield, Users, ExternalLink } from 'lucide-react'

// Semua angka bersumber dari data riset nyata
const dataStatistik = [
  {
    angka: 34.93,
    suffix: '%',
    label: 'Ancaman Dark Web — Sektor Publik Indonesia',
    sub: 'Administrasi publik adalah target terbesar dark web di Indonesia',
    sumber: 'SOCRadar Indonesia Threat Landscape 2025',
    url: 'https://socradar.io/resources/report/indonesia-threat-landscape-report-2025/',
    Ikon: AlertTriangle,
    desimal: 2,
  },
  {
    angka: 55.7,
    suffix: '%',
    label: 'Serangan Siber Menarget Indonesia Secara Spesifik',
    sub: 'Dari total ancaman dark web regional, mayoritas ditujukan ke Indonesia',
    sumber: 'SOCRadar Indonesia Threat Landscape 2025',
    url: 'https://socradar.io/resources/report/indonesia-threat-landscape-report-2025/',
    Ikon: Shield,
    desimal: 1,
  },
  {
    angka: 58,
    suffix: ' Juta',
    label: 'Data Siswa Indonesia Diklaim Bocor',
    sub: 'Hacker "SN1F" klaim kuasai data 58 juta siswa via dark web — Feb 2026',
    sumber: 'TorNews — Student Data Dark Web Sale',
    url: 'https://tornews.com/news/data-breaches/indonesia-student-data-dark-web-sale/',
    Ikon: Database,
    desimal: 0,
  },
  {
    angka: 1,
    suffix: ' Juta+',
    label: 'Record Bocor dari Tries Digital Indonesia',
    sub: 'Kebocoran signifikan terdeteksi di forum ilegal — September 2025',
    sumber: 'Heroic.com — Tries Digital Breach',
    url: 'https://heroic.com/darkhive-breaches/tries-digital-indonesia/',
    Ikon: Database,
    desimal: 0,
  },
  {
    angka: 200,
    suffix: ' Rp',
    label: 'Harga NIK / Record di Dark Web',
    sub: 'Sindikat beli ribuan NIK & KK seharga Rp 200/record untuk penipuan SIM',
    sumber: 'Vida.id — Fake ID Cards Dark Web',
    url: 'https://vida.id/en/blog/fake-id-cards',
    Ikon: Users,
    desimal: 0,
  },
  {
    angka: 23,
    suffix: ' Juta USD',
    label: 'Kerugian Ponzi Scheme WNI di AS',
    sub: 'Francius Marganda (WNI) mengaku bersalah atas penipuan senilai $23 juta',
    sumber: 'ICE.gov — Ponzi Scheme Indonesia',
    url: 'https://www.ice.gov/news/releases/indonesian-national-pleads-guilty-international-ponzi-scheme',
    Ikon: TrendingUp,
    desimal: 0,
  },
]

// Data grafik batang ancaman per sektor (SOCRadar 2025)
const dataSektorAncaman = [
  { sektor: 'Administrasi Publik', persen: 34.93, warna: 'bg-white' },
  { sektor: 'Pendidikan',          persen: 12.59, warna: 'bg-white/70' },
  { sektor: 'Keuangan',            persen: 9.57,  warna: 'bg-white/55' },
  { sektor: 'Teknologi',           persen: 8.21,  warna: 'bg-white/40' },
  { sektor: 'Kesehatan',           persen: 6.88,  warna: 'bg-white/30' },
  { sektor: 'Lainnya',             persen: 27.82, warna: 'bg-white/20' },
]

// Animasi counter angka
const Counter = ({ target, desimal, suffix, terlihat }) => {
  const [nilai, setNilai] = useState(0)
  useEffect(() => {
    if (!terlihat) return
    const durasi = 1800
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / durasi, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setNilai(target * ease)
      if (progress < 1) requestAnimationFrame(tick)
      else setNilai(target)
    }
    const id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [terlihat, target])

  return (
    <span>
      {desimal === 0 ? Math.floor(nilai).toLocaleString('id') : nilai.toFixed(desimal)}
      {suffix}
    </span>
  )
}

const StatistikLive = () => {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="statistik" className="relative py-28 lg:py-36 bg-hitam-abu overflow-hidden">
      <div className="absolute bottom-8 left-8 font-judul text-white/[0.03] select-none pointer-events-none"
        style={{ fontSize: 'clamp(6rem, 18vw, 14rem)', lineHeight: 1 }}>07</div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-white/40" />
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Data Riset</span>
          </div>
          <h2 className="font-judul text-white" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>STATISTIK NYATA</h2>
          <p className="text-white/40 mt-4 max-w-xl font-mono text-sm leading-relaxed">
            Angka-angka ini bukan estimasi. Semua bersumber dari laporan resmi, lembaga pemerintah, dan intelligence report terverifikasi.
          </p>
        </motion.div>

        {/* Grid counter besar */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {dataStatistik.map((stat, i) => {
            const Ikon = stat.Ikon
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="kartu-kasus p-6 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <Ikon size={18} className="text-white/30 group-hover:text-white/60 transition-colors" />
                  <a href={stat.url} target="_blank" rel="noopener noreferrer"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    data-hover
                  >
                    <ExternalLink size={12} className="text-white/40" />
                  </a>
                </div>

                <div className="font-judul text-white leading-none mb-2"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                  <Counter target={stat.angka} desimal={stat.desimal} suffix={stat.suffix} terlihat={inView} />
                </div>

                <p className="font-mono text-xs text-white/60 leading-snug mb-3">{stat.label}</p>
                <p className="font-mono text-[10px] text-white/30 leading-relaxed mb-3 border-t border-white/5 pt-3">{stat.sub}</p>

                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="font-mono text-[9px] text-white/20 italic">{stat.sumber}</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Grafik batang: Ancaman per Sektor */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6, duration: 0.8 }}
          className="border border-white/10 p-6 lg:p-8"
        >
          <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
            <div>
              <p className="font-judul text-white text-2xl uppercase tracking-wide">Distribusi Ancaman Dark Web Indonesia</p>
              <p className="font-mono text-xs text-white/30 mt-1">per Sektor — Sumber: SOCRadar Indonesia Threat Landscape Report 2025</p>
            </div>
            <a href="https://socradar.io/resources/report/indonesia-threat-landscape-report-2025/"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 border border-white/15 px-3 py-1.5 font-mono text-xs text-white/35 hover:text-white/60 hover:border-white/30 transition-all"
              data-hover
            >
              <ExternalLink size={11} />
              Buka Laporan
            </a>
          </div>

          <div className="space-y-4">
            {dataSektorAncaman.map((item, i) => (
              <motion.div key={item.sektor}
                initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.08, duration: 0.6 }}
                className="flex items-center gap-4"
              >
                <div className="font-mono text-xs text-white/40 w-36 flex-shrink-0 text-right pr-2">{item.sektor}</div>
                <div className="flex-1 h-5 bg-white/5 relative overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: item.persen / 100 } : {}}
                    transition={{ delay: 0.8 + i * 0.08, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className={`absolute inset-y-0 left-0 ${item.warna} origin-left`}
                    style={{ width: '100%' }}
                  />
                </div>
                <div className="font-judul text-white w-16 flex-shrink-0">{item.persen}%</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-2">
            <AlertTriangle size={12} className="text-white/25" />
            <p className="font-mono text-xs text-white/25">
              Data dikumpulkan dari aktivitas dark web, forum ilegal, dan threat intelligence feeds — bukan estimasi.
            </p>
          </div>
        </motion.div>

        {/* Perbandingan skala */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-8 grid sm:grid-cols-3 gap-4"
        >
          {[
            { label: 'Pengguna Internet Indonesia', angka: '212 Juta', sub: 'DataReportal 2025 — penetrasi 74.6%', url: 'https://datareportal.com/reports/digital-2025-indonesia' },
            { label: 'NIK Terekspos Dark Web', angka: '1M+ Record', sub: 'Berbagai breach 2022–2025 terdokumentasi', url: 'https://vida.id/en/blog/fake-id-cards' },
            { label: 'Platform Investigasi Aktif', angka: '6 Platform', sub: 'GitHub, Kiro, Antigravity, Kimi, Meta AI, Claude', url: 'https://socradar.io/resources/country-reports/indonesia-dark-web-report-h123/' },
          ].map((item, i) => (
            <a key={i} href={item.url} target="_blank" rel="noopener noreferrer"
              className="border border-white/10 p-5 hover:border-white/25 hover:bg-white/[0.02] transition-all duration-200 group"
              data-hover
            >
              <div className="font-judul text-white text-3xl mb-1 group-hover:text-white/90">{item.angka}</div>
              <div className="font-mono text-xs text-white/50 mb-2">{item.label}</div>
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-white/15" />
                <span className="font-mono text-[9px] text-white/20">{item.sub}</span>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default StatistikLive
