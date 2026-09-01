import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const saluranKomunikasi = [
  {
    nama: 'Email Investigasi',
    nilai: 'rizki.investigasi@proton.me',
    catatan: 'Untuk laporan kasus & kolaborasi sensitif',
    ikon: '✉',
  },
  {
    nama: 'Signal',
    nilai: '@rizki_habibi',
    catatan: 'Platform terenkripsi, respons cepat',
    ikon: '🔐',
  },
  {
    nama: 'Telegram',
    nilai: 't.me/rizki_aktif',
    catatan: 'Update kasus & diskusi publik',
    ikon: '📱',
  },
]

const Kontak = () => {
  const [pesan, setPesan] = useState({ nama: '', email: '', subjek: '', isi: '' })
  const [terkirim, setTerkirim] = useState(false)
  const [loading, setLoading] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulasi pengiriman
    setTimeout(() => {
      setLoading(false)
      setTerkirim(true)
    }, 1500)
  }

  return (
    <section id="kontak" className="relative py-28 lg:py-36 bg-hitam-abu overflow-hidden">
      {/* Nomor seksi */}
      <div className="absolute top-8 left-8 font-judul text-white/[0.03] select-none pointer-events-none"
        style={{ fontSize: 'clamp(6rem, 18vw, 14rem)', lineHeight: 1 }}>
        09
      </div>

      {/* Garis aksi latar */}
      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-[0.03]"
        style={{
          background: 'repeating-conic-gradient(from 0deg at 100% 100%, rgba(255,255,255,1) 0deg, transparent 2deg, transparent 4deg)',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-white/40" />
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Hubungi</span>
          </div>
          <h2 className="font-judul text-white" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
            KIRIM LAPORAN
          </h2>
          <p className="text-white/40 mt-4 max-w-xl font-mono text-sm leading-relaxed">
            Punya kasus yang belum tuntas? Informasi yang ingin dibagikan dengan aman?
            Semua pesan diperlakukan dengan kerahasiaan penuh.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Kolom kiri — Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {!terkirim ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { key: 'nama', label: 'Nama / Alias', type: 'text', placeholder: 'Nama atau alias aman' },
                  { key: 'email', label: 'Email Aman', type: 'email', placeholder: 'ProtonMail atau email biasa' },
                  { key: 'subjek', label: 'Subjek Laporan', type: 'text', placeholder: 'Topik atau nama kasus' },
                ].map((field) => (
                  <div key={field.key} className="space-y-1.5">
                    <label className="font-mono text-xs text-white/40 uppercase tracking-widest">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={pesan[field.key]}
                      onChange={e => setPesan({ ...pesan, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full bg-transparent border border-white/15 text-white/70 placeholder:text-white/20 px-4 py-3 font-mono text-sm focus:outline-none focus:border-white/40 transition-colors duration-200"
                      required
                    />
                  </div>
                ))}

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-white/40 uppercase tracking-widest">
                    Isi Pesan
                  </label>
                  <textarea
                    rows={5}
                    value={pesan.isi}
                    onChange={e => setPesan({ ...pesan, isi: e.target.value })}
                    placeholder="Ceritakan kasusnya secara detail..."
                    className="w-full bg-transparent border border-white/15 text-white/70 placeholder:text-white/20 px-4 py-3 font-mono text-sm focus:outline-none focus:border-white/40 transition-colors duration-200 resize-none"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-white text-hitam font-judul text-xl uppercase tracking-widest py-4 hover:bg-white/90 transition-colors duration-200 disabled:opacity-60"
                  data-hover
                >
                  {loading ? 'MENGIRIM...' : 'KIRIM LAPORAN'}
                </motion.button>

                <p className="font-mono text-xs text-white/20 text-center">
                  🔐 Pesan dienkripsi. Identitas Anda terlindungi.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-white/20 p-12 text-center space-y-4"
              >
                <div className="font-judul text-white text-5xl">✓</div>
                <h3 className="font-judul text-white text-2xl uppercase">PESAN TERKIRIM</h3>
                <p className="font-mono text-sm text-white/40">
                  Laporan Anda telah diterima. Akan ada respons dalam 1-3 hari kerja (ketika mood mendukung).
                </p>
                <button
                  onClick={() => setTerkirim(false)}
                  className="font-mono text-xs text-white/30 hover:text-white/60 underline transition-colors"
                  data-hover
                >
                  Kirim laporan lain
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Kolom kanan — Info Kontak */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-8"
          >
            {/* Saluran komunikasi */}
            <div className="space-y-4">
              {saluranKomunikasi.map((saluran, i) => (
                <motion.div
                  key={saluran.nama}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                  className="kartu-kasus p-5"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl flex-shrink-0">{saluran.ikon}</span>
                    <div>
                      <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-1">
                        {saluran.nama}
                      </p>
                      <p className="font-mono text-sm text-white/70">{saluran.nilai}</p>
                      <p className="font-mono text-xs text-white/25 mt-1">{saluran.catatan}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Peringatan keamanan */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="border border-white/10 p-6 space-y-3"
            >
              <p className="font-mono text-xs text-white/30 uppercase tracking-widest">
                Panduan Keamanan
              </p>
              {[
                'Gunakan VPN sebelum menghubungi untuk kasus sensitif.',
                'ProtonMail atau Tutanota untuk komunikasi terenkripsi.',
                'Jangan sertakan data pribadi yang tidak perlu.',
                'Gunakan alias jika situasi membutuhkan anonimitas.',
              ].map((tip, i) => (
                <p key={i} className="flex gap-2 font-mono text-xs text-white/35">
                  <span className="flex-shrink-0">—</span>
                  {tip}
                </p>
              ))}
            </motion.div>

            {/* Waktu respons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="flex items-center gap-3 font-mono text-xs text-white/25"
            >
              <span className="lencana-aktif w-1.5 h-1.5 rounded-full bg-white/40 inline-block" />
              Respons: 1-3 hari kerja (tergantung mood & beban kasus aktif)
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Kontak
