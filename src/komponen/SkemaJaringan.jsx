import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Info, ZoomIn, RotateCcw, ExternalLink } from 'lucide-react'

// ─── Data jaringan per kasus ──────────────────────────────────────────────────
const skemaData = {
  sambo: {
    judul: 'Jaringan Rekayasa Kasus Ferdy Sambo',
    deskripsi: 'Peta keterlibatan aktor dalam penutupan kasus pembunuhan Brigadir J',
    sumber: { label: 'Wikipedia — Kasus Pembunuhan Brigadir J', url: 'https://en.wikipedia.org/wiki/Murder_of_Nofriansyah_Yosua_Hutabarat' },
    nodes: [
      { id: 'sambo',   x: 400, y: 200, label: 'Ferdy Sambo',      sub: 'Irjen / Kadiv Propam', tipe: 'dalang',  radius: 32 },
      { id: 'putri',   x: 220, y: 130, label: 'Putri Candrawati',  sub: 'Istri Sambo',           tipe: 'terlibat', radius: 24 },
      { id: 'chuck',   x: 580, y: 130, label: 'Chuck Putranto',    sub: 'Eks-Korspri',           tipe: 'eksekutor', radius: 24 },
      { id: 'irfan',   x: 600, y: 300, label: 'Irfan Widyanto',    sub: 'Pegang DVR CCTV',       tipe: 'eksekutor', radius: 22 },
      { id: 'ricky',   x: 200, y: 300, label: 'Ricky Rizal',       sub: 'Ajudan / Eksekutor',    tipe: 'eksekutor', radius: 22 },
      { id: 'kuat',    x: 400, y: 360, label: 'Kuat Ma\'ruf',       sub: 'Asisten Rumah Tangga',  tipe: 'pendukung', radius: 20 },
      { id: 'cctv',    x: 580, y: 430, label: 'DVR CCTV',          sub: 'Barang Bukti Dihapus',  tipe: 'bukti',    radius: 18 },
      { id: 'polri',   x: 200, y: 430, label: '97 Personel Polri', sub: 'Penutup Kasus',         tipe: 'institusi', radius: 20 },
    ],
    edges: [
      { from: 'sambo', to: 'putri',  label: 'rekayasa skenario' },
      { from: 'sambo', to: 'chuck',  label: 'perintah hapus bukti' },
      { from: 'sambo', to: 'ricky',  label: 'koordinasi' },
      { from: 'chuck', to: 'irfan',  label: 'ambil DVR' },
      { from: 'irfan', to: 'cctv',   label: 'hapus rekaman' },
      { from: 'sambo', to: 'polri',  label: 'backing institusional' },
      { from: 'polri', to: 'cctv',   label: 'sempat kuasai' },
      { from: 'kuat',  to: 'sambo',  label: 'saksi kunci' },
    ],
  },

  ponzi: {
    judul: 'Skema Alur Dana Ponzi Indonesia',
    deskripsi: 'Visualisasi bagaimana dana investor bersirkulasi dalam skema piramida investasi bodong',
    sumber: { label: 'ICE.gov — WNI Ponzi $23 Juta', url: 'https://www.ice.gov/news/releases/indonesian-national-pleads-guilty-international-ponzi-scheme' },
    nodes: [
      { id: 'master',   x: 400, y: 80,  label: 'Mastermind',        sub: 'Pelaku Utama',           tipe: 'dalang',   radius: 30 },
      { id: 'mkt',      x: 160, y: 180, label: 'Tim Marketing',      sub: 'Influencer & Agen',      tipe: 'pendukung', radius: 24 },
      { id: 'shell1',   x: 600, y: 160, label: 'Perusahaan Cangkang', sub: 'PT Fiktif A',           tipe: 'institusi', radius: 22 },
      { id: 'shell2',   x: 650, y: 290, label: 'Offshore Account',    sub: 'Singapura / Cayman',    tipe: 'institusi', radius: 22 },
      { id: 'inv1',     x: 100, y: 330, label: 'Investor Lama',       sub: 'Dibayar dari dana baru', tipe: 'korban',   radius: 20 },
      { id: 'inv2',     x: 250, y: 400, label: 'Investor Baru',       sub: 'Dana masuk terus',       tipe: 'korban',   radius: 20 },
      { id: 'pejabat',  x: 430, y: 320, label: 'Oknum Pejabat',       sub: 'Backing & proteksi',     tipe: 'eksekutor', radius: 22 },
      { id: 'rekening', x: 400, y: 430, label: 'Rekening Pribadi',    sub: 'Dana akhir ditarik',     tipe: 'bukti',    radius: 18 },
    ],
    edges: [
      { from: 'master',  to: 'mkt',      label: 'rekrut agen' },
      { from: 'master',  to: 'shell1',   label: 'buat entitas fiktif' },
      { from: 'shell1',  to: 'shell2',   label: 'transfer offshore' },
      { from: 'mkt',     to: 'inv2',     label: 'rekrut investor baru' },
      { from: 'inv2',    to: 'master',   label: 'setor dana' },
      { from: 'master',  to: 'inv1',     label: 'bayar return palsu' },
      { from: 'master',  to: 'pejabat',  label: 'suap proteksi' },
      { from: 'shell2',  to: 'rekening', label: 'withdrawal akhir' },
    ],
  },

  darkweb: {
    judul: 'Ekosistem Penjualan Data Indonesia di Dark Web',
    deskripsi: 'Alur kebocoran data kependudukan dari sumber hingga ke penggunaan kriminal',
    sumber: { label: 'SOCRadar — Indonesia Threat Landscape 2025', url: 'https://socradar.io/resources/report/indonesia-threat-landscape-report-2025/' },
    nodes: [
      { id: 'dukcapil', x: 150, y: 100, label: 'Database Dukcapil',    sub: 'NIK, KK, KTP warga',         tipe: 'institusi', radius: 26 },
      { id: 'edu',      x: 380, y: 80,  label: 'Platform Edukasi',     sub: '58 juta data siswa bocor',    tipe: 'institusi', radius: 24 },
      { id: 'hack',     x: 610, y: 100, label: 'Peretas / Insider',    sub: 'Bjorka & aktor lain',         tipe: 'dalang',   radius: 24 },
      { id: 'forum',    x: 400, y: 230, label: 'Dark Web Forum',       sub: 'BreachForums & Telegram',     tipe: 'pendukung', radius: 26 },
      { id: 'broker',   x: 200, y: 340, label: 'Data Broker',          sub: 'Rp 200/NIK',                  tipe: 'eksekutor', radius: 22 },
      { id: 'penipu',   x: 420, y: 380, label: 'Sindikat Penipuan',    sub: 'SIM palsu & e-wallet fraud',  tipe: 'eksekutor', radius: 22 },
      { id: 'korban',   x: 620, y: 350, label: 'Korban Warga',         sub: '1 juta+ terekspos',           tipe: 'korban',   radius: 22 },
      { id: 'pinjol',   x: 250, y: 450, label: 'Pinjol Ilegal',        sub: 'Data KTP dipakai daftar',     tipe: 'eksekutor', radius: 20 },
    ],
    edges: [
      { from: 'dukcapil', to: 'hack',   label: 'kebocoran kebijakan SIM 2017' },
      { from: 'edu',      to: 'hack',   label: 'breach edu platform' },
      { from: 'hack',     to: 'forum',  label: 'unggah & jual' },
      { from: 'forum',    to: 'broker', label: 'transaksi massal' },
      { from: 'broker',   to: 'penipu', label: 'supply data' },
      { from: 'penipu',   to: 'korban', label: 'eksploitasi identitas' },
      { from: 'broker',   to: 'pinjol', label: 'daftarkan KTP palsu' },
      { from: 'pinjol',   to: 'korban', label: 'tagihan atas nama korban' },
    ],
  },
}

const warnaNode = {
  dalang:    { bg: '#ffffff',           teks: '#0a0a0a', border: '#ffffff' },
  eksekutor: { bg: 'rgba(255,255,255,0.15)', teks: '#ffffff', border: '#aaaaaa' },
  pendukung: { bg: 'rgba(255,255,255,0.08)', teks: '#cccccc', border: '#666666' },
  institusi: { bg: 'rgba(255,255,255,0.05)', teks: '#aaaaaa', border: '#444444' },
  korban:    { bg: 'rgba(255,255,255,0.03)', teks: '#888888', border: '#333333' },
  bukti:     { bg: 'transparent',      teks: '#666666', border: '#333333' },
}

// Hitung koordinat garis antar node
const hitungEdge = (nodes, fromId, toId) => {
  const f = nodes.find(n => n.id === fromId)
  const t = nodes.find(n => n.id === toId)
  if (!f || !t) return null
  const dx = t.x - f.x, dy = t.y - f.y
  const dist = Math.sqrt(dx * dx + dy * dy)
  const ux = dx / dist, uy = dy / dist
  return {
    x1: f.x + ux * f.radius, y1: f.y + uy * f.radius,
    x2: t.x - ux * t.radius, y2: t.y - uy * t.radius,
    mx: (f.x + t.x) / 2,     my: (f.y + t.y) / 2,
  }
}

const SkemaJaringan = () => {
  const [aktif, setAktif] = useState('sambo')
  const [nodeHover, setNodeHover] = useState(null)
  const [zoom, setZoom] = useState(1)
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })
  const data = skemaData[aktif]

  return (
    <section id="skema" className="relative py-28 lg:py-36 bg-hitam overflow-hidden">
      {/* Nomor */}
      <div className="absolute top-8 right-8 font-judul text-white/[0.03] select-none pointer-events-none"
        style={{ fontSize: 'clamp(6rem, 18vw, 14rem)', lineHeight: 1 }}>06</div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-white/40" />
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Visualisasi</span>
          </div>
          <h2 className="font-judul text-white" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>SKEMA JARINGAN</h2>
          <p className="text-white/40 mt-4 max-w-xl font-mono text-sm leading-relaxed">
            Peta interaktif hubungan antar aktor dalam setiap kasus. Hover node untuk detail. Klik tab untuk ganti kasus.
          </p>
        </motion.div>

        {/* Tab selector */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap gap-0 border border-white/10 w-fit mb-8"
        >
          {Object.entries(skemaData).map(([key, val]) => (
            <button key={key} onClick={() => { setAktif(key); setNodeHover(null); setZoom(1) }}
              className={`px-5 py-3 font-mono text-xs uppercase tracking-widest transition-all duration-200 ${aktif === key ? 'bg-white text-hitam' : 'text-white/40 hover:text-white/70'}`}
              data-hover
            >
              {key === 'sambo' ? 'Kasus Sambo' : key === 'ponzi' ? 'Skema Ponzi' : 'Dark Web'}
            </button>
          ))}
        </motion.div>

        {/* Area diagram */}
        <AnimatePresence mode="wait">
          <motion.div key={aktif}
            initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Info bar */}
            <div className="border border-white/10 p-4 mb-4 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <Info size={14} className="text-white/30 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-judul text-white text-lg uppercase tracking-wide">{data.judul}</p>
                  <p className="font-mono text-xs text-white/35 mt-1">{data.deskripsi}</p>
                </div>
              </div>
              <a href={data.sumber.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs text-white/30 hover:text-white/60 transition-colors flex-shrink-0 border border-white/10 px-3 py-1.5"
                data-hover
              >
                <ExternalLink size={11} />
                Sumber
              </a>
            </div>

            {/* SVG Diagram */}
            <div className="relative border border-white/10 bg-hitam overflow-hidden" style={{ height: 520 }}>
              {/* Controls */}
              <div className="absolute top-3 right-3 flex gap-2 z-20">
                <button onClick={() => setZoom(z => Math.min(z + 0.2, 2))}
                  className="border border-white/15 p-2 hover:bg-white/10 transition-colors font-mono text-xs text-white/40" data-hover>
                  <ZoomIn size={14} />
                </button>
                <button onClick={() => setZoom(1)}
                  className="border border-white/15 p-2 hover:bg-white/10 transition-colors font-mono text-xs text-white/40" data-hover>
                  <RotateCcw size={14} />
                </button>
              </div>

              {/* Legend */}
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-3 z-20">
                {[
                  { tipe: 'dalang',    label: 'Dalang Utama' },
                  { tipe: 'eksekutor', label: 'Eksekutor' },
                  { tipe: 'pendukung', label: 'Pendukung' },
                  { tipe: 'institusi', label: 'Institusi' },
                  { tipe: 'korban',    label: 'Korban' },
                ].map(l => (
                  <div key={l.tipe} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full border"
                      style={{ backgroundColor: warnaNode[l.tipe].bg, borderColor: warnaNode[l.tipe].border }} />
                    <span className="font-mono text-[9px] text-white/30">{l.label}</span>
                  </div>
                ))}
              </div>

              <svg
                viewBox="0 0 800 500"
                className="w-full h-full"
                style={{ transform: `scale(${zoom})`, transformOrigin: 'center', transition: 'transform 0.3s ease' }}
              >
                {/* Halftone latar */}
                <defs>
                  <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="0.8" fill="rgba(255,255,255,0.06)" />
                  </pattern>
                  <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L6,3 z" fill="rgba(255,255,255,0.25)" />
                  </marker>
                  <marker id="arrow-hover" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L6,3 z" fill="rgba(255,255,255,0.7)" />
                  </marker>
                </defs>
                <rect width="800" height="500" fill="url(#dots)" />

                {/* Edges */}
                {data.edges.map((e, i) => {
                  const pts = hitungEdge(data.nodes, e.from, e.to)
                  if (!pts) return null
                  const isHover = nodeHover === e.from || nodeHover === e.to
                  return (
                    <g key={i}>
                      <line
                        x1={pts.x1} y1={pts.y1} x2={pts.x2} y2={pts.y2}
                        stroke={isHover ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.15)'}
                        strokeWidth={isHover ? 1.5 : 0.8}
                        strokeDasharray={isHover ? 'none' : '4 3'}
                        markerEnd={isHover ? 'url(#arrow-hover)' : 'url(#arrow)'}
                        style={{ transition: 'all 0.3s ease' }}
                      />
                      {isHover && (
                        <text x={pts.mx} y={pts.my - 5} textAnchor="middle"
                          fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="monospace">
                          {e.label}
                        </text>
                      )}
                    </g>
                  )
                })}

                {/* Nodes */}
                {data.nodes.map(node => {
                  const w = warnaNode[node.tipe]
                  const isHov = nodeHover === node.id
                  return (
                    <g key={node.id} style={{ cursor: 'pointer' }}
                      onMouseEnter={() => setNodeHover(node.id)}
                      onMouseLeave={() => setNodeHover(null)}
                    >
                      <circle
                        cx={node.x} cy={node.y} r={node.radius + (isHov ? 4 : 0)}
                        fill={w.bg} stroke={w.border}
                        strokeWidth={isHov ? 2 : 1}
                        style={{ transition: 'all 0.25s ease' }}
                      />
                      {isHov && (
                        <circle cx={node.x} cy={node.y} r={node.radius + 8}
                          fill="none" stroke={w.border} strokeWidth="0.5" strokeDasharray="3 3" />
                      )}
                      <text x={node.x} y={node.y - 2} textAnchor="middle"
                        fill={w.teks} fontSize={node.radius > 24 ? 9 : 8}
                        fontWeight="bold" fontFamily="'Bebas Neue', sans-serif" letterSpacing="0.05em">
                        {node.label.length > 14 ? node.label.slice(0, 13) + '…' : node.label}
                      </text>
                      <text x={node.x} y={node.y + 10} textAnchor="middle"
                        fill={`${w.teks}99`} fontSize="7" fontFamily="monospace">
                        {node.sub.length > 16 ? node.sub.slice(0, 15) + '…' : node.sub}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>

            {/* Detail node yang di-hover */}
            <AnimatePresence>
              {nodeHover && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="mt-3 border border-white/15 p-4 bg-white/[0.03]"
                >
                  {(() => {
                    const n = data.nodes.find(x => x.id === nodeHover)
                    const relEdges = data.edges.filter(e => e.from === nodeHover || e.to === nodeHover)
                    return (
                      <div className="flex items-start gap-6 flex-wrap">
                        <div>
                          <p className="font-judul text-white text-xl uppercase">{n?.label}</p>
                          <p className="font-mono text-xs text-white/40">{n?.sub}</p>
                          <span className="font-mono text-[10px] border border-white/15 text-white/30 px-1.5 py-0.5 mt-1.5 inline-block uppercase">
                            {n?.tipe}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-mono text-xs text-white/25 uppercase tracking-widest mb-2">Koneksi:</p>
                          <div className="flex flex-wrap gap-2">
                            {relEdges.map((e, i) => {
                              const otherId = e.from === nodeHover ? e.to : e.from
                              const other = data.nodes.find(x => x.id === otherId)
                              return (
                                <span key={i} className="font-mono text-xs text-white/40 border border-white/10 px-2 py-1">
                                  {e.from === nodeHover ? '→' : '←'} {other?.label} <span className="text-white/20">({e.label})</span>
                                </span>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default SkemaJaringan
