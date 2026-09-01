import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Circle, ArrowRight, Shield, Search, Zap, Eye, Target, Wifi } from 'lucide-react'

const TeksKetik = ({ teks, delay = 0 }) => {
  const [tampil, setTampil] = useState('')
  const [selesai, setSelesai] = useState(false)
  useEffect(() => {
    let i = 0
    const timer = setTimeout(() => {
      const iv = setInterval(() => {
        if (i < teks.length) { setTampil(teks.slice(0, i + 1)); i++ }
        else { setSelesai(true); clearInterval(iv) }
      }, 50)
      return () => clearInterval(iv)
    }, delay)
    return () => clearTimeout(timer)
  }, [teks, delay])
  return <span>{tampil}{!selesai && <span className="animate-pulse">_</span>}</span>
}

const dataFoto = [
  { src: '/foto/profil-rizki.png', label: 'Profil Utama' },
  { src: '/foto/foto-latihan.png', label: 'Latihan' },
  { src: '/foto/hal-yang-terjadi.png', label: 'Di Lapangan' },
  { src: '/foto/menyamar.png', label: 'Penyamaran' },
  { src: '/foto/perubahan.png', label: 'Perubahan' },
  { src: '/foto/hal-yang-ingin-dilakukan.png', label: 'Visi' },
]

const fiturUnggulan = [
  { Ikon: Search, judul: 'Investigasi', isi: 'Menelusuri fakta di balik narasi resmi.' },
  { Ikon: Shield, judul: 'Aktivisme', isi: 'Melindungi ruang digital dari eksploitasi.' },
  { Ikon: Eye, judul: 'Pengawasan', isi: 'Memantau aliran dana gelap & koruptor.' },
  { Ikon: Zap, judul: 'Respons', isi: 'Bergerak saat kasus sedang panas.' },
  { Ikon: Target, judul: 'Presisi', isi: 'Setiap klaim didukung data terverifikasi.' },
  { Ikon: Wifi, judul: 'Jaringan', isi: 'Sumber dari jalanan hingga dark web.' },
]

const HalamanUtama = () => {
  const [fotoAktif, setFotoAktif] = useState(0)
  const [hitungan, setHitungan] = useState({ kasus: 0, tahun: 0, koruptor: 0 })
  const intervalRef = useRef(null)

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

  useEffect(() => {
    intervalRef.current = setInterval(() => setFotoAktif(p => (p + 1) % dataFoto.length), 3500)
    return () => clearInterval(intervalRef.current)
  }, [])

  const pindahFoto = (i) => {
    clearInterval(intervalRef.current)
    setFotoAktif(i)
    intervalRef.current = setInterval(() => setFotoAktif(p => (p + 1) % dataFoto.length), 3500)
  }

  return (
    <section id="beranda" className="relative min-h-screen bg-hitam overflow-hidden">
      {/* Latar garis aksi */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 36 }, (_, i) => {
            const a = (i * 10) * Math.PI / 180
            return <line key={i} x1="720" y1="450" x2={720 + Math.cos(a) * 2000} y2={450 + Math.sin(a) * 2000} stroke="white" strokeWidth="1" />
          })}
        </svg>
        <div className="absolute bottom-0 left-0 w-64 h-64 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
      </div>

      {/* Panel reveal intro */}
      <motion.div
        initial={{ scaleX: 1 }} animate={{ scaleX: 0 }}
        transition={{ duration: 1.1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 z-20 bg-white origin-right pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-24 sm:pt-28 pb-10">
        {/* ── Grid 2 kolom — stacks di mobile/tablet ── */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[85vh]">

          {/* Kolom kiri: teks */}
          <div className="space-y-5 sm:space-y-7 order-2 md:order-1">
            {/* Badge */}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
              className="flex items-center gap-2"
            >
              <Circle size={7} className="text-white fill-white animate-pulse" />
              <span className="font-mono text-xs text-white/50 tracking-widest uppercase">Aktif Menginvestigasi</span>
            </motion.div>

            {/* Nama */}
            <div className="overflow-hidden">
              {['RIZKI', 'HABIBI'].map((kata, i) => (
                <motion.h1 key={kata}
                  initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.14, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="font-judul text-white leading-none tracking-tight"
                  style={{ fontSize: 'clamp(3.2rem, 8vw, 7rem)' }}
                >{kata}</motion.h1>
              ))}
            </div>

            {/* Label profesi */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
              className="flex flex-wrap gap-2"
            >
              {['Jurnalis Investigatif', 'Aktivis Digital', 'Penelusur Kasus'].map(l => (
                <span key={l} className="border border-white/20 text-white/55 px-2.5 py-1 text-xs font-mono uppercase tracking-wider">
                  {l}
                </span>
              ))}
            </motion.div>

            {/* Teks ketik */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              className="font-mono text-sm text-white/40 border-l-2 border-white/20 pl-4 leading-relaxed max-w-md"
            >
              <TeksKetik teks="Mengungkap kebenaran yang sengaja dikubur — dari dunia virtual hingga realita." delay={1500} />
            </motion.div>

            {/* CTA — full width di mobile */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7 }}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <motion.button
                onClick={() => document.getElementById('kasus')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 bg-white text-hitam font-mono text-sm uppercase tracking-widest px-6 py-3 font-bold hover:bg-white/90 transition-colors w-full sm:w-auto"
                data-hover
              >
                Lihat Kasus <ArrowRight size={13} />
              </motion.button>
              <motion.button
                onClick={() => document.getElementById('kontak')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center border border-white/30 text-white/60 font-mono text-sm uppercase tracking-widest px-6 py-3 hover:border-white/60 hover:text-white transition-all w-full sm:w-auto"
                data-hover
              >
                Hubungi
              </motion.button>
            </motion.div>

            {/* Statistik */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9 }}
              className="grid grid-cols-3 gap-3 pt-5 border-t border-white/10"
            >
              {[
                { angka: hitungan.kasus, label: 'Kasus', suffix: '+' },
                { angka: hitungan.tahun, label: 'Tahun', suffix: '' },
                { angka: hitungan.koruptor, label: 'Korupsi', suffix: '+' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="font-judul text-white" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                    {s.angka}{s.suffix}
                  </div>
                  <div className="font-mono text-xs text-white/30 uppercase tracking-wider mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Kolom kanan: foto */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 md:order-2 flex flex-col items-center gap-4"
          >
            {/* Frame foto */}
            <div className="relative w-full max-w-xs sm:max-w-sm mx-auto">
              <div className="absolute -inset-2 border border-white/8 pointer-events-none" />
              <div className="absolute -inset-1 border border-white/4 pointer-events-none" />

              <div className="relative overflow-hidden border border-white/15 bg-abu-gelap"
                style={{ aspectRatio: '3/4' }}>
                <AnimatePresence mode="wait">
                  <motion.img key={fotoAktif}
                    src={dataFoto[fotoAktif].src}
                    alt={dataFoto[fotoAktif].label}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    style={{ filter: 'grayscale(15%) contrast(1.05)' }}
                  />
                </AnimatePresence>

                {/* Overlay bawah */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-hitam/80 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <span className="font-mono text-xs text-white/60">{dataFoto[fotoAktif].label}</span>
                  <span className="font-mono text-xs text-white/30">{fotoAktif + 1}/{dataFoto.length}</span>
                </div>
                <div className="absolute top-3 left-3 border border-white/20 bg-hitam/60 px-2 py-1">
                  <span className="font-mono text-xs text-white/50">RH</span>
                </div>
                <div className="absolute inset-0 pointer-events-none scan-line" />
              </div>

              {/* Badge melayang */}
              <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 -right-3 border border-white/15 bg-hitam/95 p-2.5 z-10 hidden sm:block">
                <div className="font-mono text-xs text-white/30 mb-1">STATUS</div>
                <div className="flex items-center gap-1.5">
                  <Circle size={5} className="text-white fill-white animate-pulse" />
                  <div className="font-judul text-white text-sm">AKTIF</div>
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-3 -left-3 border border-white/15 bg-hitam/95 p-2.5 z-10 hidden sm:block">
                <div className="font-mono text-xs text-white/30 mb-0.5">KASUS</div>
                <div className="font-judul text-white text-xl">{hitungan.kasus}+</div>
              </motion.div>
            </div>

            {/* Thumbnail galeri — scrollable horizontal di mobile kecil */}
            <div className="flex gap-2 overflow-x-auto pb-1 w-full max-w-xs sm:max-w-sm justify-center"
              style={{ scrollbarWidth: 'none' }}>
              {dataFoto.map((f, i) => (
                <button key={i} onClick={() => pindahFoto(i)}
                  className={`relative flex-shrink-0 w-11 h-14 sm:w-12 sm:h-16 overflow-hidden border transition-all duration-300 ${fotoAktif === i ? 'border-white/60 scale-105' : 'border-white/15 opacity-50 hover:opacity-80'
                    }`}
                  data-hover
                >
                  <img src={f.src} alt={f.label} className="w-full h-full object-cover object-top"
                    style={{ filter: 'grayscale(30%)' }} />
                  {fotoAktif === i && <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white" />}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fitur unggulan */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-16">
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.1, duration: 0.8 }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="font-mono text-xs text-white/25 uppercase tracking-widest whitespace-nowrap">Keunggulan Utama</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* 2 kolom di mobile, 3 di sm, 6 di lg */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {fiturUnggulan.map((f, i) => {
              const Ikon = f.Ikon
              return (
                <motion.div key={f.judul}
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2 + i * 0.07, duration: 0.5 }}
                  className="kartu-kasus p-3 sm:p-4 group text-center hover:bg-white/5 transition-all duration-300"
                >
                  <div className="flex justify-center mb-2">
                    <Ikon size={20} className="text-white/35 group-hover:text-white/70 transition-colors duration-300" />
                  </div>
                  <div className="font-judul text-white text-xs sm:text-sm uppercase tracking-wide leading-tight mb-1">
                    {f.judul}
                  </div>
                  <div className="font-mono text-[10px] text-white/25 leading-snug hidden md:block">
                    {f.isi}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Indikator gulir */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10">
        <span className="font-mono text-xs text-white/15 uppercase tracking-widest">Gulir</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown size={14} className="text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HalamanUtama
