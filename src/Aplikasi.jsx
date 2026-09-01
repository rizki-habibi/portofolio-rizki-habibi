import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Inti
import PembukaSakamoto from './komponen/PembukaSakamoto'
import KursorKustom from './komponen/KursorKustom'
import Navigasi from './komponen/Navigasi'
import PartikelLatar from './komponen/PartikelLatar'

// 10 Seksi utama
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

// Seksi tambahan baru
import BuktiNyata from './komponen/BuktiNyata'
import SkemaJaringan from './komponen/SkemaJaringan'
import StatistikLive from './komponen/StatistikLive'
import TimelineAktivisme from './komponen/TimelineAktivisme'
import DarkWebMonitor from './komponen/DarkWebMonitor'
import IndeksKorupsi from './komponen/IndeksKorupsi'

// Pemisah bergaya manga
const Pemisah = () => (
  <div className="relative h-px bg-white/5 overflow-visible mx-6 lg:mx-12">
    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 border border-white/20 rotate-45 bg-hitam" />
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border border-white/20 rotate-45 bg-hitam" />
  </div>
)

const Aplikasi = () => {
  const [pembukaSelesai, setPembukaSelesai] = useState(false)

  return (
    <>
      <PembukaSakamoto selesai={() => setPembukaSelesai(true)} />
      <div className="noise-texture fixed inset-0 z-[9980] pointer-events-none" />

      <AnimatePresence>
        {pembukaSelesai && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <KursorKustom />
            <PartikelLatar />
            <Navigasi />

            <main>
              {/* ─── BLOK 1: Perkenalan ─── */}
              <HalamanUtama />
              <Pemisah />
              <TentangSaya />
              <Pemisah />
              <Keahlian />

              {/* ─── BLOK 2: Investigasi ─── */}
              <Pemisah />
              <Kasus />
              <Pemisah />
              <BuktiNyata />
              <Pemisah />
              <SkemaJaringan />

              {/* ─── BLOK 3: Data & Statistik ─── */}
              <Pemisah />
              <StatistikLive />
              <Pemisah />
              <IndeksKorupsi />
              <Pemisah />
              <DarkWebMonitor />

              {/* ─── BLOK 4: Aktivisme & Misi ─── */}
              <Pemisah />
              <TimelineAktivisme />
              <Pemisah />
              <Misi />
              <Pemisah />
              <KemampuanTempur />

              {/* ─── BLOK 5: Tools & Penutup ─── */}
              <Pemisah />
              <InvestasiAI />
              <Pemisah />
              <JadwalKerja />
              <Pemisah />
              <Kontak />
              <Footer />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Aplikasi
