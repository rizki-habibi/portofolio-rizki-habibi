import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Komponen utama
import PembukaSakamoto from './komponen/PembukaSakamoto'
import KursorKustom from './komponen/KursorKustom'
import Navigasi from './komponen/Navigasi'
import PartikelLatar from './komponen/PartikelLatar'

// 10 Seksi / Halaman
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

const Aplikasi = () => {
  const [pembukaSelesai, setPembukaSelesai] = useState(false)

  return (
    <>
      {/* Layar pembuka bergaya manga */}
      <PembukaSakamoto selesai={() => setPembukaSelesai(true)} />

      {/* Noise texture overlay */}
      <div className="noise-texture fixed inset-0 z-[9980] pointer-events-none" />

      <AnimatePresence>
        {pembukaSelesai && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Kursor kustom */}
            <KursorKustom />

            {/* Partikel latar */}
            <PartikelLatar />

            {/* Navigasi tetap */}
            <Navigasi />

            {/* Konten utama */}
            <main>
              {/* Seksi 1: Hero */}
              <HalamanUtama />

              {/* Pemisah seksi */}
              <GarisPemisah />

              {/* Seksi 2: Tentang */}
              <TentangSaya />

              <GarisPemisah />

              {/* Seksi 3: Keahlian */}
              <Keahlian />

              <GarisPemisah />

              {/* Seksi 4: Kasus */}
              <Kasus />

              <GarisPemisah />

              {/* Seksi 5: Misi */}
              <Misi />

              <GarisPemisah />

              {/* Seksi 6: Kemampuan Tempur */}
              <KemampuanTempur />

              <GarisPemisah />

              {/* Seksi 7: AI Tools */}
              <InvestasiAI />

              <GarisPemisah />

              {/* Seksi 8: Jadwal Kerja */}
              <JadwalKerja />

              <GarisPemisah />

              {/* Seksi 9: Kontak */}
              <Kontak />

              {/* Seksi 10: Footer */}
              <Footer />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Komponen pemisah seksi bergaya manga
const GarisPemisah = () => (
  <div className="relative h-px bg-white/5 overflow-visible mx-6 lg:mx-12">
    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 border border-white/20 rotate-45" />
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border border-white/20 rotate-45" />
  </div>
)

export default Aplikasi
