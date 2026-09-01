import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Zap, Target, Eye, Moon, Circle, Clock } from 'lucide-react'

const kondisiMood = [
  { level: 'ULTRA', Ikon: Zap, deskripsi: 'Mode penuh — investigasi aktif, konten produktif, siap 24 jam.', jam: '14+ jam/hari', warna: 'text-white' },
  { level: 'FOKUS', Ikon: Target, deskripsi: 'Kerja terstruktur — riset mendalam, penulisan, dan analisis data.', jam: '8-12 jam/hari', warna: 'text-white/80' },
  { level: 'STANDBY', Ikon: Eye, deskripsi: 'Monitoring pasif — memantau perkembangan kasus, tidak produksi aktif.', jam: '2-4 jam/hari', warna: 'text-white/50' },
  { level: 'RECHARGE', Ikon: Moon, deskripsi: 'Istirahat total — tidak ada output, perlu waktu untuk memproses.', jam: '0 jam/hari', warna: 'text-white/20' },
]

const jadwalHarian = [
  { waktu: '00:00 - 03:00', aktivitas: 'Deep Research', catatan: 'Kondisi terbaik untuk dark web browsing', aktif: true },
  { waktu: '03:00 - 06:00', aktivitas: 'Tidur / Recharge', catatan: 'Waktu minimal istirahat', aktif: false },
  { waktu: '06:00 - 08:00', aktivitas: 'Monitoring Berita', catatan: 'Update kasus aktif, feed investigasi', aktif: true },
  { waktu: '08:00 - 12:00', aktivitas: 'Penulisan & Dokumentasi', catatan: 'Drafting laporan investigasi', aktif: true },
  { waktu: '12:00 - 14:00', aktivitas: 'Fleksibel', catatan: 'Tergantung mood dan kondisi kasus', aktif: false },
  { waktu: '14:00 - 20:00', aktivitas: 'Analisis & Riset', catatan: 'Inti jam kerja produktif utama', aktif: true },
  { waktu: '20:00 - 00:00', aktivitas: 'Review & Planning', catatan: 'Persiapan hari berikutnya', aktif: true },
]

const aturanKerja = [
  'Ketika kasus sedang panas — tidak ada hari libur.',
  'Ketika mood rendah — tidak ada pemaksaan output.',
  'Deadline diri sendiri lebih ketat dari deadline editor.',
  'Kualitas di atas kuantitas, selalu.',
  'Istirahat bukan kelemahan — itu strategi.',
]

const JadwalKerja = () => {
  const [moodAktif, setMoodAktif] = useState(0)
  const [jamSekarang, setJamSekarang] = useState(new Date())
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  useEffect(() => {
    const timer = setInterval(() => setJamSekarang(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const jam = jamSekarang.getHours().toString().padStart(2, '0')
  const menit = jamSekarang.getMinutes().toString().padStart(2, '0')

  return (
    <section id="jadwal" className="relative py-28 lg:py-36 bg-hitam overflow-hidden">
      <div className="absolute bottom-8 right-8 font-judul text-white/[0.03] select-none pointer-events-none"
        style={{ fontSize: 'clamp(6rem, 18vw, 14rem)', lineHeight: 1 }}>08</div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-white/40" />
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Waktu Kerja</span>
          </div>
          <h2 className="font-judul text-white" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>JADWAL & MOOD</h2>
          <p className="text-white/40 mt-4 max-w-xl font-mono text-sm leading-relaxed">
            Tidak ada jadwal 9-5 di sini. Kerja dilakukan ketika kondisi optimal — dan itu menghasilkan output terbaik.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Jam & Mood */}
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="border border-white/10 p-8 text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock size={12} className="text-white/25" />
                <span className="font-mono text-xs text-white/25 uppercase tracking-widest">Waktu Sekarang</span>
              </div>
              <div className="font-judul text-white leading-none mb-2" style={{ fontSize: 'clamp(4rem, 10vw, 6rem)' }}>
                {jam}:{menit}
              </div>
              <div className="font-mono text-xs text-white/30">
                WIB — {jamSekarang.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4, duration: 0.7 }}>
              <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-4">Level Produktivitas</p>
              <div className="space-y-3">
                {kondisiMood.map((mood, i) => {
                  const Ikon = mood.Ikon
                  return (
                    <button key={mood.level} onClick={() => setMoodAktif(i)}
                      className={`w-full text-left border p-4 transition-all duration-300 ${moodAktif === i ? 'border-white/40 bg-white/5' : 'border-white/10 hover:border-white/20'}`}
                      data-hover
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Ikon size={16} className={mood.warna} />
                          <div>
                            <div className={`font-judul text-xl uppercase tracking-wide ${mood.warna}`}>{mood.level}</div>
                            <div className="font-mono text-xs text-white/25">{mood.jam}</div>
                          </div>
                        </div>
                        {moodAktif === i && <Circle size={6} className="text-white fill-white" />}
                      </div>
                      <AnimatePresence>
                        {moodAktif === i && (
                          <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                            className="font-mono text-xs text-white/40 mt-3 overflow-hidden"
                          >{mood.deskripsi}</motion.p>
                        )}
                      </AnimatePresence>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Jadwal Harian */}
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5, duration: 0.7 }}>
              <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-4">Pola Jadwal Tipikal</p>
              <div className="space-y-2">
                {jadwalHarian.map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.07, duration: 0.5 }}
                    className={`flex items-start gap-4 p-3 border transition-all duration-200 ${item.aktif ? 'border-white/15 bg-white/[0.02]' : 'border-transparent opacity-40'}`}
                  >
                    <Circle size={6} className={`mt-1.5 flex-shrink-0 ${item.aktif ? 'text-white fill-white' : 'text-white/20'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2 flex-wrap">
                        <span className="font-mono text-xs text-white/40">{item.waktu}</span>
                        <span className={`font-mono text-xs font-bold ${item.aktif ? 'text-white/70' : 'text-white/30'}`}>{item.aktivitas}</span>
                      </div>
                      <p className="font-mono text-xs text-white/20 mt-0.5">{item.catatan}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.0, duration: 0.7 }}
              className="border border-white/10 p-6"
            >
              <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-5">Aturan Tidak Tertulis</p>
              <ul className="space-y-3">
                {aturanKerja.map((aturan, i) => (
                  <li key={i} className="flex items-start gap-3 font-mono text-xs text-white/40">
                    <span className="text-white/20 flex-shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}.</span>
                    {aturan}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default JadwalKerja
