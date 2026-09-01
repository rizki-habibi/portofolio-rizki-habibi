import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Activity, ExternalLink, Terminal, Clock, Circle, Shield } from 'lucide-react'

const logAktivitas = [
  { id: 1, ts: '2026-02-10 03:14', level: 'KRITIS', pesan: '[SN1F] Menawarkan 58M data siswa Indonesia — forum dark web', sumber: 'TorNews', url: 'https://tornews.com/news/data-breaches/indonesia-student-data-dark-web-sale/' },
  { id: 2, ts: '2025-09-27 18:02', level: 'TINGGI', pesan: '[BREACH] Tries Digital Indonesia — 1 juta+ record terekspos di forum ilegal', sumber: 'Heroic.com', url: 'https://heroic.com/darkhive-breaches/tries-digital-indonesia/' },
  { id: 3, ts: '2025-04-19 11:30', level: 'TINGGI', pesan: '[LEAK] Data kependudukan Kab. Tuban bocor via forum dark web', sumber: 'BrinzTech', url: 'https://www.brinztech.com/breach-alerts/brinztech-sovereign-threat-alert-government-directory-bank-jatim-account-numbers-leaked-via-pdf-arrays-kabupaten-tuban/' },
  { id: 4, ts: '2025-03-01 00:00', level: 'INFO', pesan: '[LAPORAN] SOCRadar: 55.7% ancaman dark web menarget Indonesia secara spesifik', sumber: 'SOCRadar', url: 'https://socradar.io/resources/report/indonesia-threat-landscape-report-2025/' },
  { id: 5, ts: '2025-01-15 09:45', level: 'SEDANG', pesan: '[MONITOR] NIK dijual Rp200/record — sindikat SIM card palsu masih aktif beroperasi', sumber: 'Vida.id', url: 'https://vida.id/en/blog/fake-id-cards' },
  { id: 6, ts: '2024-07-18 14:22', level: 'KRITIS', pesan: '[HUKUM] WNI Francius Marganda mengaku bersalah — Ponzi scheme $23 juta di AS', sumber: 'ICE.gov', url: 'https://www.ice.gov/news/releases/indonesian-national-pleads-guilty-international-ponzi-scheme' },
  { id: 7, ts: '2023-04-12 07:11', level: 'SEDANG', pesan: '[DISTRIBUSI] Narkoba dalam kemasan sabun — hub Sumatera–Jawa–Kalimantan terdeteksi', sumber: 'IIAS', url: 'https://www.iias.asia/sites/iias/files/nwl_article/2024-10/IIAS_NL99_25.pdf' },
  { id: 8, ts: '2023-02-13 16:00', level: 'KRITIS', pesan: '[VONIS] Ferdy Sambo dijatuhi hukuman mati — PN Jakarta Selatan', sumber: 'CNA', url: 'https://www.channelnewsasia.com/asia/former-police-general-fredy-sambo-death-murder-3273866' },
  { id: 9, ts: '2022-10-17 10:30', level: 'TINGGI', pesan: '[SIDANG] DVR CCTV Duren Tiga — terbukti dihapus atas perintah Sambo', sumber: 'VOI', url: 'https://voi.id/en/news/219109' },
  { id: 10, ts: '2022-09-08 22:17', level: 'TINGGI', pesan: '[BJORKA] Data KTP 279M WNI diklaim bocor — dampak kebijakan SIM 2017', sumber: 'The Diplomat', url: 'https://thediplomat.com/2022/09/bjorka-the-online-hacker-trying-to-take-down-the-indonesian-government/' },
]

const statusSektor = [
  { sektor: 'Database Pemerintah', risiko: 89, sumber: 'SOCRadar 2025' },
  { sektor: 'Data Pendidikan', risiko: 74, sumber: 'TorNews 2026' },
  { sektor: 'Layanan Keuangan', risiko: 62, sumber: 'SOCRadar 2025' },
  { sektor: 'Platform E-Commerce', risiko: 55, sumber: 'SOCRadar 2025' },
  { sektor: 'Layanan Telekomunikasi', risiko: 48, sumber: 'Vida.id 2025' },
]

const barisBoot = [
  '> Menghubungkan ke feed intelijen siber...',
  '> [OK] Terkoneksi ke SOCRadar Indonesia Watch',
  '> [OK] Memuat riwayat breach 2022–2026',
  '> [SCAN] Memindai 127 forum dark web aktif...',
  '> [ALERT] 3 breach aktif terdeteksi — Indonesia',
  '> [STATUS] Monitoring berlangsung — live',
  '> _',
]

const warnaLevel = {
  KRITIS: 'text-white border-white',
  TINGGI: 'text-white/70 border-white/50',
  SEDANG: 'text-white/50 border-white/25',
  INFO: 'text-white/30 border-white/15',
}

const dotLevel = {
  KRITIS: 'bg-white',
  TINGGI: 'bg-white/60',
  SEDANG: 'bg-white/40',
  INFO: 'bg-white/20',
}

const DarkWebMonitor = () => {
  const [filter, setFilter] = useState('SEMUA')
  const [baris, setBaris] = useState([])
  const [bootSelesai, setBootSelesai] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.04, triggerOnce: true })
  const termRef = useRef(null)

  useEffect(() => {
    if (!inView || bootSelesai) return
    let i = 0
    const iv = setInterval(() => {
      if (i < barisBoot.length) { setBaris(p => [...p, barisBoot[i]]); i++ }
      else { setBootSelesai(true); clearInterval(iv) }
    }, 360)
    return () => clearInterval(iv)
  }, [inView, bootSelesai])

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight
  }, [baris])

  const logTerfilter = filter === 'SEMUA' ? logAktivitas : logAktivitas.filter(l => l.level === filter)

  return (
    <section id="monitor" className="relative py-28 lg:py-36 bg-hitam-abu overflow-hidden">
      <div className="absolute top-8 right-8 font-judul text-white/[0.03] select-none pointer-events-none"
        style={{ fontSize: 'clamp(6rem, 18vw, 14rem)', lineHeight: 1 }}>DWM</div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-white/40" />
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Intelijen Siber</span>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <h2 className="font-judul text-white" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>DARK WEB MONITOR</h2>
            <div className="flex items-center gap-2 border border-white/20 px-3 py-1.5">
              <Activity size={12} className="text-white animate-pulse" />
              <span className="font-mono text-xs text-white">LIVE FEED</span>
            </div>
          </div>
          <p className="text-white/40 mt-4 max-w-xl font-mono text-sm leading-relaxed">
            Log ancaman siber terhadap Indonesia — dikompilasi dari sumber intelijen terverifikasi. Setiap entri punya link sumber asli.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[3fr,2fr] gap-8">
          {/* Kiri: terminal + log */}
          <div className="space-y-5">
            {/* Terminal */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }}
              className="border border-white/10 bg-hitam"
            >
              <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-white/[0.02]">
                <Terminal size={12} className="text-white/30" />
                <span className="font-mono text-xs text-white/40">rizki@investigator:~$</span>
                <span className="font-mono text-xs text-white/50">./monitor --darkweb --indonesia</span>
              </div>
              <div ref={termRef} className="p-4 h-40 overflow-y-auto space-y-1" style={{ scrollbarWidth: 'none' }}>
                {baris.map((b, i) => (
                  <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}
                    className={`font-mono text-xs leading-snug ${b.includes('[OK]') ? 'text-white/70' : b.includes('[ALERT]') ? 'text-white font-bold' : b.includes('[STATUS]') ? 'text-white/50' : 'text-white/30'
                      }`}
                  >{b}</motion.p>
                ))}
              </div>
            </motion.div>

            {/* Filter pills */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {['SEMUA', 'KRITIS', 'TINGGI', 'SEDANG', 'INFO'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`font-mono text-xs border px-3 py-1.5 uppercase tracking-wider transition-all duration-200 ${filter === f ? 'bg-white text-hitam border-white' : 'border-white/15 text-white/35 hover:text-white/60 hover:border-white/30'
                    }`}
                  data-hover
                >
                  {f}
                  <span className="ml-1.5 opacity-50">
                    {f === 'SEMUA' ? logAktivitas.length : logAktivitas.filter(l => l.level === f).length}
                  </span>
                </button>
              ))}
            </motion.div>

            {/* Log list */}
            <div className="space-y-1.5">
              <AnimatePresence mode="popLayout">
                {logTerfilter.map((log, i) => (
                  <motion.a key={log.id}
                    href={log.url} target="_blank" rel="noopener noreferrer"
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ delay: 0.4 + i * 0.035, duration: 0.4 }}
                    className="flex items-start gap-3 p-3 border border-white/8 hover:border-white/25 hover:bg-white/[0.025] transition-all duration-200 group"
                    data-hover
                  >
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${dotLevel[log.level]}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className={`font-mono text-[10px] border px-1.5 py-px ${warnaLevel[log.level]}`}>{log.level}</span>
                        <div className="flex items-center gap-1 text-white/20">
                          <Clock size={9} />
                          <span className="font-mono text-[9px]">{log.ts}</span>
                        </div>
                      </div>
                      <p className="font-mono text-xs text-white/55 leading-snug">{log.pesan}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="font-mono text-[9px] text-white/25">{log.sumber}</span>
                      <ExternalLink size={10} className="text-white/30" />
                    </div>
                  </motion.a>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Kanan: status sektor + ringkasan */}
          <div className="space-y-5">
            {/* Status monitor */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4, duration: 0.7 }}
              className="border border-white/10 p-5"
            >
              <div className="flex items-center justify-between mb-5">
                <p className="font-mono text-xs text-white/30 uppercase tracking-widest">Status Monitor</p>
                <div className="flex items-center gap-1.5">
                  <Circle size={6} className="text-white fill-white animate-pulse" />
                  <span className="font-mono text-xs text-white">ONLINE</span>
                </div>
              </div>
              {[
                { label: 'Forum Dipantau', nilai: '127', unit: 'aktif' },
                { label: 'Breach Aktif (ID)', nilai: '3', unit: 'terbuka' },
                { label: 'Record Terekspos', nilai: '59M+', unit: 'warga' },
                { label: 'Sumber Data', nilai: 'Live', unit: 'SOCRadar' },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                  <span className="font-mono text-xs text-white/35">{s.label}</span>
                  <div className="text-right">
                    <span className="font-judul text-white text-lg">{s.nilai}</span>
                    <span className="font-mono text-xs text-white/25 ml-1">{s.unit}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Risiko per sektor */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.5, duration: 0.7 }}
              className="border border-white/10 p-5"
            >
              <div className="flex items-center gap-2 mb-5">
                <Shield size={14} className="text-white/30" />
                <p className="font-mono text-xs text-white/30 uppercase tracking-widest">Indeks Risiko per Sektor</p>
              </div>
              <div className="space-y-4">
                {statusSektor.map((s, i) => (
                  <motion.div key={s.sektor}
                    initial={{ opacity: 0, x: 10 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.07, duration: 0.5 }}
                  >
                    <div className="flex justify-between font-mono text-xs mb-1.5">
                      <span className="text-white/50">{s.sektor}</span>
                      <span className={s.risiko >= 80 ? 'text-white font-bold' : s.risiko >= 60 ? 'text-white/70' : 'text-white/45'}>{s.risiko}</span>
                    </div>
                    <div className="h-px bg-white/8 relative overflow-hidden">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: s.risiko / 100 } : {}}
                        transition={{ delay: 0.7 + i * 0.07, duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute inset-0 bg-white origin-left"
                        style={{ opacity: 0.3 + (s.risiko / 100) * 0.7 }}
                      />
                    </div>
                    <p className="font-mono text-[9px] text-white/15 mt-0.5">{s.sumber}</p>
                  </motion.div>
                ))}
              </div>
              <a href="https://socradar.io/resources/report/indonesia-threat-landscape-report-2025/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-[10px] text-white/20 hover:text-white/50 mt-5 transition-colors" data-hover>
                <ExternalLink size={10} />
                Sumber: SOCRadar Threat Landscape 2025
              </a>
            </motion.div>

            {/* Quick links sumber */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.6, duration: 0.7 }}
              className="border border-white/10 p-5"
            >
              <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-4">Sumber Intelligence</p>
              <div className="space-y-2">
                {[
                  { label: 'SOCRadar Indonesia 2025', url: 'https://socradar.io/resources/report/indonesia-threat-landscape-report-2025/' },
                  { label: 'Dark Web Report H1\'23', url: 'https://socradar.io/resources/country-reports/indonesia-dark-web-report-h123/' },
                  { label: 'DataReportal Indonesia', url: 'https://datareportal.com/reports/digital-2025-indonesia' },
                ].map((l, i) => (
                  <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-xs text-white/30 hover:text-white/60 transition-colors py-1" data-hover>
                    <ExternalLink size={10} className="flex-shrink-0" />
                    {l.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DarkWebMonitor
