import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown, Circle, ArrowRight, Shield, Search, Zap,
  Eye, Target, Wifi
} from 'lucide-react'

// Teks ketik animasi
const TeksKetik = ({ teks, delay = 0 }) => {
  const [tampil, setTampil] = useState('')
  const [selesai, setSelesai] = useState(false)
  useEffect(() => {
    let i = 0
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < teks.length) { setTampil(teks.slice(0, i + 1)); i++ }
        else { setSelesai(true); clearInterval(interval) }
      }, 55)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [teks, delay])
  return <span>{tampil}{!selesai && <span className="animate-pulse">_</span>}</span>
}

// Data foto galeri
const dataFoto = [
  { src: '/foto/profil-rizki.png', label: 'Profil Utama', aktif: true },
  { src: '/foto/foto-latihan.png', label: 'Latihan', aktif: false },
  { src: '/foto/hal-yang-terjadi.png', label: 'Di Lapangan', aktif: false },
  { src: '/foto/menyamar.png', label: 'Penyamaran', aktif: false },
  { src: '/foto/perubahan.png', label: 'Perubahan', aktif: false },
  { src: '/foto/hal-yang-ingin-dilakukan.png', label: 'Visi', aktif: false },
]

// Fitur unggulan
const fiturUnggulan = [
  { ikon: Search, judul: 'Investigasi Mendalam', isi: 'Menelusuri fakta di balik narasi resmi hingga ke akarnya.' },
  { ikon: Shield, judul: 'Aktivisme Digital', isi: 'Melindungi ruang digital dari eksploitasi kekuasaan.' },
  { ikon: Eye, judul: 'Pengawasan Korupsi', isi: 'Memantau aliran dana gelap & jaringan pejabat korup.' },
  { ikon: Zap, judul: 'Respons Cepat', isi: 'Bergerak saat kasus sedang panas, tidak menunggu izin.' },
  { ikon: Target, judul: 'Fokus & Presisi', isi: 'Setiap klaim didukung data terverifikasi, bukan asumsi.' },
  { ikon: Wifi, judul: 'Jaringan Informan', isi: 'Sumber dari berbagai lapisan — dari jalanan hingga dark web.' },
]

const HalamanUtama = () => {
  const [fotoAktif, setFotoAktif] = useState(0)
  const [hitungan, setHitungan] = useState({ kasus: 0, tahun: 0, koruptor: 0 })
  const intervalRef = useRef(null)

  // Counter angka
  useEffect(() => {
    const animAngka = (target, kunci, durasi = 2000) => {
      let awal = 0
      const langkah = target / (durasi / 16)
      const t = setInterval(() => {
        awal += langkah
        if (awal >= target) { setHitungan(p => ({ ...p, [kunci]: target })); clearInterval(t) }
        else { setHitungan(p => ({ ...p, [kunci]: Math.floor(awal) })) }
      }, 16)
    }
    const to = setTimeout(() => {
      animAngka(47, 'kasus', 2500)
      animAngka(3, 'tahun', 1500)
      animAngka(12, 'koruptor', 2000)
    }, 1400)
    return () => clearTimeout(to)
  }, [])

  // Auto-slide foto
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setFotoAktif(p => (p + 1) % dataFoto.length)
    }, 3500)
    return () => clearInterval(intervalRef.current)
  }, [])

  const pindahFoto = (i) => {
    clearInterval(intervalRef.current)
    setFotoAktif(i)
    intervalRef.current = setInterval(() => {
      setFotoAktif(p => (p + 1) % dataFoto.length)
    }, 3500)
  }

  return (
    <section id="beranda" className="relative min-h-screen bg-hitam overflow-hidden">

      {/* ── Latar garis aksi radial ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 40 }, (_, i) => {
            const a = (i * 9) * Math.PI / 180
            return <line key={i} x1="720" y1="450" x2={720 + Math.cos(a) * 2000} y2={450 + Math.sin(a) * 2000} stroke="white" strokeWidth="1" />
          })}
        </svg>
        <div className="absolute bottom-0 left-0 w-72 h-72 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
        <div className="absolute top-0 right-0 w-80 h-80 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
      </div>

      {/* ── Panel reveal intro ── */}
      <motion.div
        initial={{ scaleX: 1 }} animate={{ scaleX: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 z-20 bg-white origin-right"
      />

      {/* ════════════════════════════════
          HERO — dua kolom
      ════════════════════════════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[90vh]">

          {/* ── Kolom Kiri: teks ── */}
          <div className="space-y-7 order-2 lg:order-1">

            {/* Badge status */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <Circle size={8} className="text-white fill-white animate-pulse" />
              <span className="font-mono text-xs text-white/50 tracking-widest uppercase">
                Aktif Menginvestigasi
              </span>
            </motion.div>

            {/* Nama */}
            <div className="overflow-hidden space-y-1">
              {['RIZKI', 'HABIBI'].map((kata, i) => (
                <motion.h1
                  key={kata}
                  initial={{ y: 110, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="font-judul text-white leading-none tracking-tight"
                  style={{ fontSize: 'clamp(4rem, 10vw, 7.5rem)' }}
                >
                  {kata}
                </motion.h1>
              ))}
            </div>

            {/* Label profesi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.7 }}
              className="flex flex-wrap gap-2"
            >
              {['Jurnalis Investigatif', 'Aktivis Digital', 'Penelusur Kasus'].map(l => (
                <span key={l}
                  className="border border-white/20 text-white/55 px-3 py-1 text-xs font-mono uppercase tracking-widest">
                  {l}
                </span>
              ))}
            </motion.div>

            {/* Teks ketik */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="font-mono text-sm text-white/40 border-l-2 border-white/20 pl-4 leading-relaxed max-w-md"
            >
              <TeksKetik
                teks="Mengungkap kebenaran yang sengaja dikubur. Dari dunia virtual hingga realita — tidak ada kasus yang benar-benar tutup buku."
                delay={1500}
              />
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.6 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <motion.button
                onClick={() => document.getElementById('kasus')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 bg-white text-hitam font-mono text-sm uppercase tracking-widest px-7 py-3 font-bold hover:bg-white/90 transition-colors"
                data-hover
              >
                Lihat Kasus <ArrowRight size={14} />
              </motion.button>
              <motion.button
                onClick={() => document.getElementById('kontak')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="border border-white/30 text-white/60 font-mono text-sm uppercase tracking-widest px-7 py-3 hover:border-white/60 hover:text-white transition-all"
                data-hover
              >
                Hubungi
              </motion.button>
            </motion.div>

            {/* Statistik */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.8 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10"
            >
              {[
                { angka: hitungan.kasus, label: 'Kasus', suffix: '+' },
                { angka: hitungan.tahun, label: 'Tahun', suffix: '' },
                { angka: hitungan.koruptor, label: 'Korupsi', suffix: '+' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="font-judul text-white text-3xl lg:text-4xl">{s.angka}{s.suffix}</div>
                  <div className="font-mono text-xs text-white/30 uppercase tracking-widest mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Kolom Kanan: Foto profil + galeri ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 lg:order-2 flex flex-col items-center gap-5"
          >
            {/* Frame foto utama */}
            <div className="relative w-full max-w-sm mx-auto">
              {/* Border dekoratif */}
              <div className="absolute -inset-3 border border-white/8 pointer-events-none z-0" />
              <div className="absolute -inset-1.5 border border-white/5 pointer-events-none z-0" />

              {/* Foto utama dengan animasi crossfade */}
              <div className="relative aspect-[3/4] overflow-hidden border border-white/15 bg-abu-gelap">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={fotoAktif}
                    src={dataFoto[fotoAktif].src}
                    alt={dataFoto[fotoAktif].label}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    style={{ filter: 'grayscale(20%) contrast(1.05)' }}
                  />
                </AnimatePresence>

                {/* Overlay gradient bawah */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-hitam/80 to-transparent pointer-events-none" />

                {/* Label foto */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <span className="font-mono text-xs text-white/60">{dataFoto[fotoAktif].label}</span>
                  <span className="font-mono text-xs text-white/30">{fotoAktif + 1}/{dataFoto.length}</span>
                </div>

                {/* Badge pojok kiri atas */}
                <div className="absolute top-3 left-3 border border-white/20 bg-hitam/60 backdrop-blur-sm px-2 py-1">
                  <span className="font-mono text-xs text-white/50">RH</span>
                </div>

                {/* Scan line efek */}
                <div className="absolute inset-0 pointer-events-none scan-line" />
              </div>

              {/* Panel mood melayang */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 border border-white/15 bg-hitam/90 backdrop-blur-sm p-3 w-28 z-10"
              >
                <div className="font-mono text-xs text-white/30 mb-1">STATUS</div>
                <div className="flex items-center gap-1.5">
                  <Circle size={6} className="text-white fill-white animate-pulse" />
                  <div className="font-judul text-white text-base">AKTIF</div>
                </div>
              </motion.div>

              {/* Panel kasus melayang */}
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-4 border border-white/15 bg-hitam/90 backdrop-blur-sm p-3 w-36 z-10"
              >
                <div className="font-mono text-xs text-white/30 mb-1">INVESTIGASI</div>
                <div className="font-judul text-white text-2xl">{hitungan.kasus}+</div>
                <div className="font-mono text-xs text-white/25">KASUS AKTIF</div>
              </motion.div>
            </div>

            {/* Thumbnail galeri */}
            <div className="flex gap-2 mt-2">
              {dataFoto.map((f, i) => (
                <button
                  key={i}
                  onClick={() => pindahFoto(i)}
                  className={`relative w-12 h-14 overflow-hidden border transition-all duration-300 ${fotoAktif === i ? 'border-white/60 scale-105' : 'border-white/15 opacity-50 hover:opacity-80'
                    }`}
                  data-hover
                >
                  <img
                    src={f.src} alt={f.label}
                    className="w-full h-full object-cover object-top"
                    style={{ filter: 'grayscale(30%)' }}
                  />
                  {fotoAktif === i && (
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ════════════════════════════════
          FITUR UNGGULAN
      ════════════════════════════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.8 }}
        >
          {/* Judul fitur */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-white/10" />
            <span className="font-mono text-xs text-white/25 uppercase tracking-widest whitespace-nowrap">
              Keunggulan Utama
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Grid 6 fitur */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {fiturUnggulan.map((f, i) => {
              const Ikon = f.ikon
              return (
                <motion.div
                  key={f.judul}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2 + i * 0.08, duration: 0.6 }}
                  className="kartu-kasus p-4 group text-center hover:bg-white/5 transition-all duration-300"
                >
                  <div className="flex justify-center mb-3">
                    <Ikon size={22} className="text-white/40 group-hover:text-white/80 transition-colors duration-300" />
                  </div>
                  <div className="font-judul text-white text-sm uppercase tracking-wide leading-tight mb-2">
                    {f.judul}
                  </div>
                  <div className="font-mono text-xs text-white/25 leading-relaxed hidden lg:block">
                    {f.isi}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Indikator gulir */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="font-mono text-xs text-white/15 uppercase tracking-widest">Gulir</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={16} className="text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HalamanUtama
