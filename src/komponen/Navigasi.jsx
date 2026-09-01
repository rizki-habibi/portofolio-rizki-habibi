import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, X, Menu, ChevronDown, Search,
  Circle, Activity, ExternalLink, Home, User, Zap,
  FileSearch, BarChart2, Phone, ChevronRight
} from 'lucide-react'

// ─── Struktur menu + submenu ─────────────────────────────────────────────────
const strukturMenu = [
  {
    label: 'Beranda', id: 'beranda', Ikon: Home, sub: null,
  },
  {
    label: 'Profil', id: 'tentang', Ikon: User,
    sub: [
      { label: 'Tentang Saya', id: 'tentang', desc: 'Identitas & latar belakang' },
      { label: 'Keahlian', id: 'keahlian', desc: 'Skills investigatif & digital' },
      { label: 'Kemampuan', id: 'kemampuan', desc: 'Virtual & realita' },
      { label: 'Jadwal & Mood', id: 'jadwal', desc: 'Pola kerja & produktivitas' },
      { label: 'Data Nyata', id: 'data-nyata', desc: 'Breach, angka & referensi' },
    ],
  },
  {
    label: 'Investigasi', id: 'kasus', Ikon: FileSearch,
    sub: [
      { label: 'Kasus', id: 'kasus', desc: 'Timeline kasus 2023–2025' },
      { label: 'Bukti Nyata', id: 'bukti', desc: '13 referensi terverifikasi' },
      { label: 'Skema Jaringan', id: 'skema', desc: 'Peta interaktif korupsi' },
      { label: 'Timeline', id: 'timeline', desc: 'Rekam jejak aktivisme' },
    ],
  },
  {
    label: 'Data', id: 'statistik', Ikon: BarChart2,
    sub: [
      { label: 'Statistik Live', id: 'statistik', desc: 'Angka nyata terverifikasi' },
      { label: 'Indeks Korupsi', id: 'indeks', desc: 'Penilaian per kasus' },
      { label: 'Dark Web Monitor', id: 'monitor', desc: 'Feed intelijen siber' },
    ],
  },
  {
    label: 'Misi', id: 'misi', Ikon: Zap,
    sub: [
      { label: 'Misi & Manifesto', id: 'misi', desc: '4 tujuan investigasi' },
      { label: 'AI Tools', id: 'ai-tools', desc: 'Analisis kerentanan AI' },
    ],
  },
  {
    label: 'Kontak', id: 'kontak', Ikon: Phone, sub: null,
  },
]

const semuaId = strukturMenu.flatMap(m =>
  m.sub ? [m.id, ...m.sub.map(s => s.id)] : [m.id]
)

const referensiCepat = [
  { judul: 'Indonesia Threat Landscape 2025', domain: 'socradar.io', url: 'https://socradar.io/resources/report/indonesia-threat-landscape-report-2025/' },
  { judul: 'WNI Ponzi Scheme $23 Juta', domain: 'ice.gov', url: 'https://www.ice.gov/news/releases/indonesian-national-pleads-guilty-international-ponzi-scheme' },
  { judul: '58 Juta Data Siswa Bocor', domain: 'tornews.com', url: 'https://tornews.com/news/data-breaches/indonesia-student-data-dark-web-sale/' },
]

// ─── Komponen Dropdown Desktop ───────────────────────────────────────────────
const DropdownMenu = ({ menu, seksiAktif, gulirKe, tutup }) => (
  <motion.div
    initial={{ opacity: 0, y: 8, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 4, scale: 0.96 }}
    transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
    onMouseLeave={tutup}
    className="absolute top-full left-0 mt-2 w-60 bg-hitam border border-white/12
               backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.8)] z-50"
  >
    <div className="px-3 pt-2.5 pb-2 border-b border-white/8 flex items-center gap-2">
      <menu.Ikon size={10} className="text-white/30" />
      <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">{menu.label}</span>
    </div>
    {menu.sub.map((sub) => {
      const akt = seksiAktif === sub.id
      return (
        <button key={sub.id} onClick={() => { gulirKe(sub.id); tutup() }}
          className={`w-full flex items-start gap-2.5 px-3 py-2.5 text-left border-b border-white/4
                      last:border-0 transition-all duration-150 group ${akt ? 'bg-white/8' : 'hover:bg-white/5'}`}
          data-hover
        >
          <ChevronRight size={10} className={`mt-0.5 flex-shrink-0 transition-colors ${akt ? 'text-white' : 'text-white/20 group-hover:text-white/50'
            }`} />
          <div>
            <div className={`font-mono text-xs uppercase tracking-wider transition-colors ${akt ? 'text-white' : 'text-white/60 group-hover:text-white/90'
              }`}>{sub.label}</div>
            <div className="font-mono text-[10px] text-white/25 mt-0.5">{sub.desc}</div>
          </div>
        </button>
      )
    })}
  </motion.div>
)

// ─── Komponen Panel Search ────────────────────────────────────────────────────
const PanelSearch = ({ tutup, gulirKe }) => {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  const semuaItem = strukturMenu.flatMap(m =>
    m.sub
      ? m.sub.map(s => ({ ...s, grup: m.label }))
      : [{ label: m.label, id: m.id, desc: '', grup: '' }]
  )
  const hasil = query.length > 1
    ? semuaItem.filter(i =>
      i.label.toLowerCase().includes(query.toLowerCase()) ||
      i.desc?.toLowerCase().includes(query.toLowerCase())
    )
    : []

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.16 }}
      className="absolute right-0 top-full mt-2 w-72 bg-hitam border border-white/12
                 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.8)] z-50"
    >
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/8">
        <Search size={12} className="text-white/30 flex-shrink-0" />
        <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Cari seksi..." aria-label="Cari seksi"
          className="flex-1 bg-transparent font-mono text-xs text-white
                     placeholder:text-white/25 focus:outline-none" />
        {query && (
          <button onClick={() => setQuery('')} className="text-white/30 hover:text-white/60">
            <X size={11} />
          </button>
        )}
      </div>

      {hasil.length > 0 ? (
        <div className="max-h-52 overflow-y-auto">
          {hasil.map(item => (
            <button key={item.id} onClick={() => { gulirKe(item.id); tutup() }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-white/5 border-b border-white/4 last:border-0"
              data-hover
            >
              <ChevronRight size={10} className="text-white/20 flex-shrink-0" />
              <div>
                {item.grup && <div className="font-mono text-[9px] text-white/20 uppercase">{item.grup}</div>}
                <div className="font-mono text-xs text-white/65">{item.label}</div>
              </div>
            </button>
          ))}
        </div>
      ) : query.length > 1 ? (
        <div className="px-3 py-5 font-mono text-xs text-white/25 text-center">Tidak ditemukan</div>
      ) : (
        <div>
          <div className="px-3 py-2 font-mono text-[10px] text-white/25 uppercase tracking-widest border-b border-white/6">
            Referensi Terbaru
          </div>
          {referensiCepat.map((a, i) => (
            <a key={i} href={a.url} target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-2 px-3 py-2.5 hover:bg-white/5 border-b border-white/4 last:border-0"
              data-hover
            >
              <ExternalLink size={10} className="text-white/20 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-mono text-[11px] text-white/55 leading-snug">{a.judul}</div>
                <div className="font-mono text-[9px] text-white/20 mt-0.5">{a.domain}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </motion.div>
  )
}

// ─── Navigasi Utama ───────────────────────────────────────────────────────────
const Navigasi = () => {
  const [gulir, setGulir] = useState(false)
  const [scrollPersen, setScrollPersen] = useState(0)
  const [menuTerbuka, setMenuTerbuka] = useState(false)
  const [seksiAktif, setSeksiAktif] = useState('beranda')
  const [dropdownAktif, setDropdownAktif] = useState(null)
  const [searchTerbuka, setSearchTerbuka] = useState(false)
  const [subMobile, setSubMobile] = useState(null)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const max = document.body.scrollHeight - window.innerHeight
      setGulir(y > 60)
      setScrollPersen(max > 0 ? (y / max) * 100 : 0)
      semuaId.forEach(id => {
        const el = document.getElementById(id)
        if (el) {
          const r = el.getBoundingClientRect()
          if (r.top <= 130 && r.bottom >= 130) setSeksiAktif(id)
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuTerbuka ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuTerbuka])

  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setDropdownAktif(null)
        setSearchTerbuka(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const gulirKe = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuTerbuka(false)
    setDropdownAktif(null)
    setSearchTerbuka(false)
  }

  const isParentAktif = (menu) =>
    menu.sub
      ? menu.sub.some(s => s.id === seksiAktif) || seksiAktif === menu.id
      : seksiAktif === menu.id

  return (
    <>
      {/* ── Navbar ── */}
      <motion.nav ref={navRef}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${gulir
            ? 'bg-hitam/96 backdrop-blur-lg border-b border-white/6'
            : 'bg-gradient-to-b from-hitam/70 to-transparent'
          }`}
      >
        {/* Progress bar scroll */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5 pointer-events-none">
          <div className="h-full bg-white/60 transition-all duration-100" style={{ width: `${scrollPersen}%` }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16 gap-4">

          {/* Logo */}
          <motion.button onClick={() => gulirKe('beranda')}
            whileHover={{ scale: 1.04 }}
            className="flex items-center gap-2.5 flex-shrink-0 group" data-hover
          >
            <div className="relative w-8 h-8 border border-white/25 flex items-center justify-center
                            group-hover:border-white/55 transition-colors duration-300">
              <span className="font-judul text-white text-base leading-none">R</span>
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="font-judul text-white text-base tracking-widest">RIZKI</div>
              <div className="font-mono text-[9px] text-white/30 tracking-widest uppercase">Habibi · Jurnalis</div>
            </div>
          </motion.button>

          {/* Menu desktop + dropdown */}
          <div className="hidden lg:flex items-center gap-0.5">
            {strukturMenu.map((menu, i) => {
              const akt = isParentAktif(menu)
              return (
                <div key={menu.id} className="relative">
                  <motion.button
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 + 0.2 }}
                    onClick={() => {
                      if (!menu.sub) { gulirKe(menu.id); return }
                      setDropdownAktif(dropdownAktif === menu.id ? null : menu.id)
                      setSearchTerbuka(false)
                    }}
                    onMouseEnter={() => { if (menu.sub) { setDropdownAktif(menu.id); setSearchTerbuka(false) } }}
                    className={`flex items-center gap-1 px-3 py-2 font-mono text-xs uppercase tracking-widest
                                transition-all duration-200 whitespace-nowrap ${akt
                        ? 'text-white bg-white/8'
                        : 'text-white/45 hover:text-white/80 hover:bg-white/5'
                      }`}
                    data-hover
                  >
                    {menu.label}
                    {menu.sub && (
                      <ChevronDown size={10} className={`transition-transform duration-200 ${dropdownAktif === menu.id ? 'rotate-180 text-white' : ''
                        }`} />
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {menu.sub && dropdownAktif === menu.id && (
                      <DropdownMenu
                        menu={menu}
                        seksiAktif={seksiAktif}
                        gulirKe={gulirKe}
                        tutup={() => setDropdownAktif(null)}
                      />
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          {/* Fitur kanan */}
          <div className="flex items-center gap-2 flex-shrink-0">

            {/* Indikator live */}
            <div className="hidden xl:flex items-center gap-1.5 border border-white/10 px-2 py-1 bg-white/[0.02]">
              <Activity size={9} className="text-white/40 animate-pulse" />
              <span className="font-mono text-[9px] text-white/35 uppercase tracking-wider">Live</span>
            </div>

            {/* Tombol Search */}
            <div className="relative">
              <button
                onClick={() => { setSearchTerbuka(!searchTerbuka); setDropdownAktif(null) }}
                className={`flex items-center justify-center w-8 h-8 border transition-all duration-200 ${searchTerbuka
                    ? 'border-white/40 bg-white/8 text-white'
                    : 'border-white/15 hover:border-white/35 text-white/45 hover:text-white/80'
                  }`}
                aria-label="Cari"
                data-hover
              >
                <Search size={13} />
              </button>
              <AnimatePresence>
                {searchTerbuka && <PanelSearch tutup={() => setSearchTerbuka(false)} gulirKe={gulirKe} />}
              </AnimatePresence>
            </div>

            {/* Tombol Kontak */}
            <motion.button
              onClick={() => gulirKe('kontak')}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="hidden sm:flex items-center gap-1.5 bg-white text-hitam font-mono text-xs
                         uppercase tracking-widest px-4 py-2 font-bold hover:bg-white/90 transition-colors"
              data-hover
            >
              Kontak <ArrowRight size={10} />
            </motion.button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuTerbuka(!menuTerbuka)}
              className="lg:hidden flex items-center justify-center w-9 h-9 border border-white/15
                         hover:border-white/40 transition-colors"
              aria-label={menuTerbuka ? 'Tutup' : 'Menu'}
              data-hover
            >
              <AnimatePresence mode="wait">
                {menuTerbuka
                  ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ opacity: 0 }}><X size={14} className="text-white" /></motion.span>
                  : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ opacity: 0 }}><Menu size={14} className="text-white/60" /></motion.span>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Menu Mobile / Tablet ── */}
      <AnimatePresence>
        {menuTerbuka && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-hitam/99 backdrop-blur-2xl flex flex-col"
          >
            {/* Header mobile */}
            <div className="flex items-center justify-between px-5 h-14 sm:h-16 border-b border-white/6 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 border border-white/25 flex items-center justify-center">
                  <span className="font-judul text-white text-sm">R</span>
                </div>
                <div>
                  <div className="font-judul text-white text-base tracking-widest">RIZKI HABIBI</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-white/50 animate-pulse inline-block" />
                    <span className="font-mono text-[9px] text-white/30 uppercase tracking-wider">Aktif Investigasi</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setMenuTerbuka(false)}
                className="w-9 h-9 border border-white/15 flex items-center justify-center hover:border-white/40 transition-colors"
                aria-label="Tutup"
              >
                <X size={14} className="text-white/60" />
              </button>
            </div>

            {/* Daftar menu mobile — dengan accordion submenu */}
            <nav className="flex-1 overflow-y-auto px-5 py-4">
              {strukturMenu.map((menu, i) => (
                <div key={menu.id} className="border-b border-white/5 last:border-0">
                  {/* Item utama */}
                  <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center"
                  >
                    <button
                      onClick={() => {
                        if (!menu.sub) { gulirKe(menu.id); return }
                        setSubMobile(subMobile === menu.id ? null : menu.id)
                      }}
                      className={`flex-1 flex items-center justify-between py-4 transition-colors duration-150 group ${isParentAktif(menu) ? 'text-white' : 'text-white/40 hover:text-white/70'
                        }`}
                      data-hover
                    >
                      <div className="flex items-center gap-3">
                        <menu.Ikon size={16} className={isParentAktif(menu) ? 'text-white/70' : 'text-white/25'} />
                        <span className="font-judul text-2xl sm:text-3xl uppercase tracking-widest">
                          {menu.label}
                        </span>
                      </div>
                      {menu.sub ? (
                        <ChevronDown size={14} className={`transition-transform duration-200 ${subMobile === menu.id ? 'rotate-180 text-white/60' : 'text-white/20'
                          }`} />
                      ) : (
                        <ArrowRight size={14} className="text-white/20 group-hover:text-white/50 transition-colors" />
                      )}
                    </button>
                  </motion.div>

                  {/* Submenu accordion */}
                  <AnimatePresence>
                    {menu.sub && subMobile === menu.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-3 pl-7 space-y-0.5">
                          {menu.sub.map((sub, si) => {
                            const akt = seksiAktif === sub.id
                            return (
                              <motion.button
                                key={sub.id}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: si * 0.04 }}
                                onClick={() => gulirKe(sub.id)}
                                className={`w-full flex items-start gap-2.5 px-3 py-2.5 text-left rounded-sm
                                            transition-all duration-150 ${akt ? 'bg-white/8 text-white' : 'text-white/40 hover:text-white/70 hover:bg-white/4'
                                  }`}
                                data-hover
                              >
                                <ChevronRight size={10} className="mt-0.5 flex-shrink-0 text-white/30" />
                                <div>
                                  <div className="font-mono text-sm uppercase tracking-wider">{sub.label}</div>
                                  <div className="font-mono text-[10px] text-white/25 mt-0.5">{sub.desc}</div>
                                </div>
                              </motion.button>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Footer mobile */}
            <div className="px-5 py-4 border-t border-white/6 space-y-2 flex-shrink-0">
              {/* Referensi cepat */}
              <div className="mb-3">
                <div className="font-mono text-[10px] text-white/25 uppercase tracking-widest mb-2">
                  Referensi Terbaru
                </div>
                {referensiCepat.slice(0, 2).map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 py-1.5 group"
                    data-hover
                  >
                    <ExternalLink size={9} className="text-white/20 flex-shrink-0" />
                    <span className="font-mono text-[10px] text-white/35 group-hover:text-white/60 transition-colors truncate">
                      {r.judul}
                    </span>
                  </a>
                ))}
              </div>

              <button
                onClick={() => gulirKe('kontak')}
                className="w-full bg-white text-hitam font-judul text-lg uppercase tracking-widest py-3.5
                           hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                data-hover
              >
                Hubungi Sekarang <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigasi
