import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Komponen teks ketik
const TeksKetik = ({ teks, delay = 0 }) => {
  const [tampil, setTampil] = useState('')
  const [selesai, setSelesai] = useState(false)

  useEffect(() => {
    let i = 0
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < teks.length) {
          setTampil(teks.slice(0, i + 1))
          i++
        } else {
          setSelesai(true)
          clearInterval(interval)
        }
      }, 60)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [teks, delay])

  return (
    <span>
      {tampil}
      {!selesai && <span className="animate-pulse">_</span>}
    </span>
  )
}

const HalamanUtama = () => {
  const [hitungan, setHitungan] = useState({ kasus: 0, tahun: 0, koruptor: 0 })

  useEffect(() => {
    // Animasi angka counter
    const animasiAngka = (target, kunci, durasi = 2000) => {
      let awal = 0
      const langkah = target / (durasi / 16)
      const timer = setInterval(() => {
        awal += langkah
        if (awal >= target) {
          setHitungan(prev => ({ ...prev, [kunci]: target }))
          clearInterval(timer)
        } else {
          setHitungan(prev => ({ ...prev, [kunci]: Math.floor(awal) }))
        }
      }, 16)
    }

    const timeout = setTimeout(() => {
      animasiAngka(47, 'kasus', 2500)
      animasiAngka(3, 'tahun', 1500)
      animasiAngka(12, 'koruptor', 2000)
    }, 1200)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <section
      id="beranda"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-hitam"
    >
      {/* Latar manga - garis aksi */}
      <div className="absolute inset-0 z-0">
        {/* Garis aksi radial */}
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 36 }, (_, i) => {
            const sudut = (i * 10) * Math.PI / 180
            const x2 = 720 + Math.cos(sudut) * 2000
            const y2 = 450 + Math.sin(sudut) * 2000
            return (
              <line key={i} x1="720" y1="450" x2={x2} y2={y2} stroke="white" strokeWidth="1" />
            )
          })}
        </svg>

        {/* Halftone dots kiri bawah */}
        <div
          className="absolute bottom-0 left-0 w-64 h-64 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '12px 12px',
          }}
        />

        {/* Halftone dots kanan atas */}
        <div
          className="absolute top-0 right-0 w-96 h-96 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      {/* Panel manga hitam - sisi kanan */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-20 bg-white origin-right"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

          {/* Kolom Kiri - Teks Utama */}
          <div className="space-y-8">
            {/* Badge status */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <span className="lencana-aktif inline-block w-2 h-2 rounded-full bg-white" />
              <span className="font-mono text-xs text-white/50 tracking-widest uppercase">
                Aktif Menginvestigasi
              </span>
            </motion.div>

            {/* Nama utama */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="font-judul text-white leading-none tracking-tight"
                style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)' }}
              >
                RIZKI
              </motion.h1>
              <motion.h1
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="font-judul text-white leading-none tracking-tight"
                style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)' }}
              >
                HABIBI
              </motion.h1>
            </div>

            {/* Label pekerjaan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.7 }}
              className="flex flex-wrap gap-3"
            >
              {['Jurnalis Investigatif', 'Aktivis Digital', 'Penelusur Kasus'].map((label, i) => (
                <span
                  key={label}
                  className="border border-white/20 text-white/60 px-3 py-1 text-xs font-mono uppercase tracking-widest"
                >
                  {label}
                </span>
              ))}
            </motion.div>

            {/* Deskripsi dengan teks ketik */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="font-mono text-sm text-white/40 border-l-2 border-white/20 pl-4 leading-relaxed"
            >
              <TeksKetik
                teks="Mengungkap kebenaran yang sengaja dikubur. Dari dunia virtual hingga realita — tidak ada kasus yang benar-benar tutup buku."
                delay={1400}
              />
            </motion.div>

            {/* Tombol CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <motion.button
                onClick={() => document.getElementById('kasus')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-hitam font-mono text-sm uppercase tracking-widest px-8 py-3 hover:bg-white/80 transition-colors duration-200 font-bold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-hover
              >
                Lihat Kasus
              </motion.button>
              <motion.button
                onClick={() => document.getElementById('kontak')?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-white/30 text-white/60 font-mono text-sm uppercase tracking-widest px-8 py-3 hover:border-white/60 hover:text-white transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-hover
              >
                Hubungi
              </motion.button>
            </motion.div>
          </div>

          {/* Kolom Kanan - Panel Visual */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            {/* Frame panel manga */}
            <div className="relative border border-white/10 p-1">
              {/* Panel utama - silhouette */}
              <div className="relative aspect-[3/4] bg-abu-gelap overflow-hidden">
                {/* Latar speed lines */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'repeating-conic-gradient(from 0deg at 50% 120%, rgba(255,255,255,0.03) 0deg, transparent 1.5deg, transparent 3deg)',
                  }}
                />

                {/* Siluet karakter - representasi artistik */}
                <svg
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-auto opacity-90"
                  viewBox="0 0 200 350"
                  fill="none"
                >
                  {/* Badan - siluet sederhana bergaya manga */}
                  <ellipse cx="100" cy="60" rx="30" ry="35" fill="white" opacity="0.9"/>
                  {/* Leher */}
                  <rect x="90" y="88" width="20" height="15" fill="white" opacity="0.9"/>
                  {/* Bahu & badan */}
                  <path d="M40 110 Q100 100 160 110 L165 200 Q100 215 35 200 Z" fill="white" opacity="0.85"/>
                  {/* Tangan kanan */}
                  <path d="M160 115 L185 170 L175 175 L150 125 Z" fill="white" opacity="0.8"/>
                  {/* Tangan kiri - pose terangkat */}
                  <path d="M40 115 L10 140 L20 150 L50 125 Z" fill="white" opacity="0.8"/>
                  {/* Kaki kanan */}
                  <rect x="108" y="200" width="35" height="150" rx="5" fill="white" opacity="0.85"/>
                  {/* Kaki kiri */}
                  <rect x="57" y="200" width="35" height="150" rx="5" fill="white" opacity="0.85"/>
                  {/* Detail kacamata */}
                  <rect x="78" y="50" width="18" height="12" rx="3" fill="none" stroke="#0a0a0a" strokeWidth="2"/>
                  <rect x="100" y="50" width="18" height="12" rx="3" fill="none" stroke="#0a0a0a" strokeWidth="2"/>
                  <line x1="96" y1="56" x2="100" y2="56" stroke="#0a0a0a" strokeWidth="2"/>
                </svg>

                {/* Teks efek manga di dalam panel */}
                <div className="absolute top-4 left-4 font-judul text-white/20 text-6xl select-none">
                  調査
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-white/20 text-xs">
                  FILE: RH-001
                </div>

                {/* Scan line animasi */}
                <div className="absolute inset-0 pointer-events-none scan-line" />
              </div>

              {/* Label di bawah panel */}
              <div className="absolute -bottom-6 left-0 right-0 flex justify-between font-mono text-xs text-white/30">
                <span>SUBJEK: RH</span>
                <span>STATUS: AKTIF</span>
              </div>
            </div>

            {/* Panel kecil melayang */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 border border-white/15 bg-hitam p-3 w-32"
            >
              <div className="font-mono text-xs text-white/40 mb-1">MOOD</div>
              <div className="font-judul text-white text-lg">AKTIF</div>
              <div className="w-full h-0.5 bg-white/10 mt-2">
                <div className="h-full bg-white w-4/5" />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-8 -left-6 border border-white/15 bg-hitam p-3 w-36"
            >
              <div className="font-mono text-xs text-white/40 mb-1">INVESTIGASI</div>
              <div className="font-judul text-white text-xl">{hitungan.kasus}+</div>
              <div className="font-mono text-xs text-white/30">KASUS DITANGANI</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Statistik bawah */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="grid grid-cols-3 gap-4 mt-16 pt-8 border-t border-white/10"
        >
          {[
            { angka: hitungan.kasus, label: 'Kasus Diinvestigasi', suffix: '+' },
            { angka: hitungan.tahun, label: 'Tahun Pengalaman', suffix: '' },
            { angka: hitungan.koruptor, label: 'Kasus Korupsi Disorot', suffix: '+' },
          ].map((stat, i) => (
            <div key={i} className="text-center lg:text-left">
              <div className="font-judul text-white text-4xl lg:text-5xl">
                {stat.angka}{stat.suffix}
              </div>
              <div className="font-mono text-xs text-white/30 uppercase tracking-widest mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Indikator gulir */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-white/20 uppercase tracking-widest">Gulir</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  )
}

export default HalamanUtama
