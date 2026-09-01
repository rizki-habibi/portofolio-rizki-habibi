import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Inti
import PembukaSakamoto from './komponen/PembukaSakamoto'
import KursorKustom from './komponen/KursorKustom'
import Navigasi from './komponen/Navigasi'
import PartikelLatar from './komponen/PartikelLatar'
import BatasPesan from './komponen/BatasPesan'

// Seksi utama
import HalamanUtama from './komponen/HalamanUtama'
import TentangSaya from './komponen/TentangSaya'
import Keahlian from './komponen/Keahlian'
import Kasus from './komponen/Kasus'
import Misi from './komponen/Misi'
import KemampuanTempur from './komponen/KemampuanTempur'
import InvestasiAI from './komponen/InvestasiAI'
import JadwalKerja from './komponen/JadwalKerja'
import Kontak from './komponen/Kontak'
import Footer from './komponen/Footer'

// Seksi baru
import BuktiNyata from './komponen/BuktiNyata'
import SkemaJaringan from './komponen/SkemaJaringan'
import StatistikLive from './komponen/StatistikLive'
import TimelineAktivisme from './komponen/TimelineAktivisme'
import DarkWebMonitor from './komponen/DarkWebMonitor'
import IndeksKorupsi from './komponen/IndeksKorupsi'
import DataNyata from './komponen/DataNyata'

// Pemisah bergaya manga
const Pemisah = () => (
  <div className="relative h-px bg-white/5 overflow-visible mx-6 lg:mx-12">
    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 border border-white/20 rotate-45 bg-hitam" />
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border border-white/20 rotate-45 bg-hitam" />
  </div>
)

// Bungkus tiap komponen dengan Error Boundary
const Aman = ({ children }) => <BatasPesan>{children}</BatasPesan>

const Aplikasi = () => {
  const [tampil, setTampil] = useState(false)

  // Fallback: tampilkan konten setelah 4 detik, bahkan jika pembuka gagal
  useEffect(() => {
    const batas = setTimeout(() => setTampil(true), 4000)
    return () => clearTimeout(batas)
  }, [])

  return (
    <div className="relative">
      {/* Layar pembuka — ditangkap error boundary, tidak block konten */}
      {!tampil && (
        <Aman>
          <PembukaSakamoto selesai={() => setTampil(true)} />
        </Aman>
      )}

      {/* Konten utama — muncul setelah pembuka selesai/timeout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: tampil ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ visibility: tampil ? 'visible' : 'hidden' }}
      >
        {/* Overlay & UI persisten */}
        <div className="noise-texture fixed inset-0 z-[9980] pointer-events-none" />
        <Aman><KursorKustom /></Aman>
        <Aman><PartikelLatar /></Aman>
        <Aman><Navigasi /></Aman>

        <main>
          {/* BLOK 1: Perkenalan */}
          <Aman><HalamanUtama /></Aman>
          <Pemisah />
          <Aman><DataNyata /></Aman>
          <Pemisah />
          <Aman><TentangSaya /></Aman>
          <Pemisah />
          <Aman><Keahlian /></Aman>

          {/* BLOK 2: Investigasi */}
          <Pemisah />
          <Aman><Kasus /></Aman>
          <Pemisah />
          <Aman><BuktiNyata /></Aman>
          <Pemisah />
          <Aman><SkemaJaringan /></Aman>

          {/* BLOK 3: Data & Statistik */}
          <Pemisah />
          <Aman><StatistikLive /></Aman>
          <Pemisah />
          <Aman><IndeksKorupsi /></Aman>
          <Pemisah />
          <Aman><DarkWebMonitor /></Aman>

          {/* BLOK 4: Aktivisme & Misi */}
          <Pemisah />
          <Aman><TimelineAktivisme /></Aman>
          <Pemisah />
          <Aman><Misi /></Aman>
          <Pemisah />
          <Aman><KemampuanTempur /></Aman>

          {/* BLOK 5: Tools & Penutup */}
          <Pemisah />
          <Aman><InvestasiAI /></Aman>
          <Pemisah />
          <Aman><JadwalKerja /></Aman>
          <Pemisah />
          <Aman><Kontak /></Aman>
          <Aman><Footer /></Aman>
        </main>
      </motion.div>
    </div>
  )
}

export default Aplikasi
