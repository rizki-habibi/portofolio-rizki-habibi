import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Lock, Send, CheckCircle, Shield, ArrowRight, Circle } from 'lucide-react'

const saluranIkon = { Email: Mail, Signal: Lock, Telegram: Send }

const saluranKomunikasi = [
  { nama: 'Email Investigasi', nilai: 'rizki.investigasi@proton.me', catatan: 'Untuk laporan kasus & kolaborasi sensitif', ikonKey: 'Email' },
  { nama: 'Signal', nilai: '@rizki_habibi', catatan: 'Platform terenkripsi, respons cepat', ikonKey: 'Signal' },
  { nama: 'Telegram', nilai: 't.me/rizki_aktif', catatan: 'Update kasus & diskusi publik', ikonKey: 'Telegram' },
]

const Kontak = () => {
  const [pesan, setPesan] = useState({ nama: '', email: '', subjek: '', isi: '' })
  const [terkirim, setTerkirim] = useState(false)
  const [loading, setLoading] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setTerkirim(true) }, 1500)
  }

  return (
    <section id="kontak" className="relative py-28 lg:py-36 bg-hitam-abu overflow-hidden">
      <div className="absolute top-8 left-8 font-judul text-white/[0.03] select-none pointer-events-none"
        style={{ fontSize: 'clamp(6rem, 18vw, 14rem)', lineHeight: 1 }}>09</div>

      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-[0.03]"
        style={{ background: 'repeating-conic-gradient(from 0deg at 100% 100%, rgba(255,255,255,1) 0deg, transparent 2deg, transparent 4deg)' }} />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-white/40" />
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Hubungi</span>
          </div>
          <h2 className="font-judul text-white" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>KIRIM LAPORAN</h2>
          <p className="text-white/40 mt-4 max-w-xl font-mono text-sm leading-relaxed">
            Punya kasus yang belum tuntas? Informasi yang ingin dibagikan dengan aman? Semua pesan diperlakukan dengan kerahasiaan penuh.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.8 }}>
            {!terkirim ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { key: 'nama', label: 'Nama / Alias', type: 'text', placeholder: 'Nama atau alias aman' },
                  { key: 'email', label: 'Email Aman', type: 'email', placeholder: 'ProtonMail atau email biasa' },
                  { key: 'subjek', label: 'Subjek Laporan', type: 'text', placeholder: 'Topik atau nama kasus' },
                ].map((field) => (
                  <div key={field.key} className="space-y-1.5">
                    <label className="font-mono text-xs text-white/40 uppercase tracking-widest">{field.label}</label>
                    <input type={field.type} value={pesan[field.key]}
                      onChange={e => setPesan({ ...pesan, [field.key]: e.target.value })}
                      placeholder={field.placeholder} required
                      className="w-full bg-transparent border border-white/15 text-white/70 placeholder:text-white/20 px-4 py-3 font-mono text-sm focus:outline-none focus:border-white/40 transition-colors duration-200"
                    />
                  </div>
                ))}
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-white/40 uppercase tracking-widest">Isi Pesan</label>
                  <textarea rows={5} value={pesan.isi}
                    onChange={e => setPesan({ ...pesan, isi: e.target.value })}
                    placeholder="Ceritakan kasusnya secara detail..." required
                    className="w-full bg-transparent border border-white/15 text-white/70 placeholder:text-white/20 px-4 py-3 font-mono text-sm focus:outline-none focus:border-white/40 transition-colors duration-200 resize-none"
                  />
                </div>
                <motion.button type="submit" disabled={loading}
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center justify-center gap-3 bg-white text-hitam font-judul text-xl uppercase tracking-widest py-4 hover:bg-white/90 transition-colors duration-200 disabled:opacity-60"
                  data-hover
                >
                  {loading ? (
                    <><Circle size={16} className="animate-spin" /> MENGIRIM...</>
                  ) : (
                    <><Send size={16} /> KIRIM LAPORAN</>
                  )}
                </motion.button>
                <div className="flex items-center justify-center gap-2">
                  <Lock size={12} className="text-white/20" />
                  <p className="font-mono text-xs text-white/20">Pesan dienkripsi. Identitas Anda terlindungi.</p>
                </div>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="border border-white/20 p-12 text-center space-y-4"
              >
                <CheckCircle size={40} className="text-white/70 mx-auto" />
                <h3 className="font-judul text-white text-2xl uppercase">PESAN TERKIRIM</h3>
                <p className="font-mono text-sm text-white/40">Laporan Anda telah diterima. Akan ada respons dalam 1-3 hari kerja.</p>
                <button onClick={() => setTerkirim(false)}
                  className="font-mono text-xs text-white/30 hover:text-white/60 underline transition-colors" data-hover>
                  Kirim laporan lain
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Info Kontak */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4, duration: 0.8 }} className="space-y-8">
            <div className="space-y-4">
              {saluranKomunikasi.map((saluran, i) => {
                const Ikon = saluranIkon[saluran.ikonKey]
                return (
                  <motion.div key={saluran.nama}
                    initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                    className="kartu-kasus p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 border border-white/10 mt-0.5">
                        <Ikon size={16} className="text-white/40" />
                      </div>
                      <div>
                        <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-1">{saluran.nama}</p>
                        <p className="font-mono text-sm text-white/70">{saluran.nilai}</p>
                        <p className="font-mono text-xs text-white/25 mt-1">{saluran.catatan}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.9, duration: 0.8 }}
              className="border border-white/10 p-6 space-y-3"
            >
              <div className="flex items-center gap-2 mb-4">
                <Shield size={14} className="text-white/30" />
                <p className="font-mono text-xs text-white/30 uppercase tracking-widest">Panduan Keamanan</p>
              </div>
              {[
                'Gunakan VPN sebelum menghubungi untuk kasus sensitif.',
                'ProtonMail atau Tutanota untuk komunikasi terenkripsi.',
                'Jangan sertakan data pribadi yang tidak perlu.',
                'Gunakan alias jika situasi membutuhkan anonimitas.',
              ].map((tip, i) => (
                <div key={i} className="flex gap-2 font-mono text-xs text-white/35">
                  <ArrowRight size={10} className="flex-shrink-0 mt-0.5 text-white/20" />
                  {tip}
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.0, duration: 0.8 }}
              className="flex items-center gap-3 font-mono text-xs text-white/25"
            >
              <Circle size={6} className="text-white/40 fill-white/40 animate-pulse" />
              Respons: 1-3 hari kerja (tergantung mood & beban kasus aktif)
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Kontak
