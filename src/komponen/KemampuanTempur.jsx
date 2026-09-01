import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const domainKemampuan = [
  {
    domain: 'VIRTUAL',
    sub: 'Dunia Digital',
    warna: 'border-white/30',
    kemampuan: [
      { nama: 'Penelusuran Dark Web', level: 'MAHIR', deskripsi: 'Menelusuri forum, marketplace ilegal, dan jaringan tersembunyi di dark web menggunakan teknik anonim.' },
      { nama: 'OSINT Lanjutan', level: 'MAHIR', deskripsi: 'Menggabungkan data publik dari berbagai sumber digital untuk membangun profil target investigasi.' },
      { nama: 'Analisis Metadata', level: 'MENENGAH', deskripsi: 'Mengekstrak informasi tersembunyi dari dokumen, gambar, dan file digital untuk keperluan investigasi.' },
      { nama: 'Tracking Keuangan Digital', level: 'MENENGAH', deskripsi: 'Melacak aliran dana melalui rekening virtual, e-wallet, dan transaksi kripto dalam kasus penipuan.' },
      { nama: 'Counter-Surveillance Digital', level: 'MAHIR', deskripsi: 'Mendeteksi dan menghindari pengawasan digital dari pihak yang diinvestigasi.' },
    ],
  },
  {
    domain: 'REALITA',
    sub: 'Dunia Nyata',
    warna: 'border-white/15',
    kemampuan: [
      { nama: 'Wawancara Psikologis', level: 'MAHIR', deskripsi: 'Teknik wawancara mendalam yang menggunakan prinsip psikologi untuk mendapatkan informasi dari narasumber.' },
      { nama: 'Liputan Lapangan', level: 'MAHIR', deskripsi: 'Dokumentasi langsung di lapangan termasuk lingkungan berisiko dengan tetap menjaga keselamatan.' },
      { nama: 'Perlindungan Narasumber', level: 'MAHIR', deskripsi: 'Menjaga identitas dan keamanan whistleblower serta informan yang memberikan informasi sensitif.' },
      { nama: 'Analisis Bahasa Tubuh', level: 'MENENGAH', deskripsi: 'Membaca signal non-verbal dalam interaksi langsung untuk mengidentifikasi ketidakjujuran.' },
      { nama: 'Jaringan Informan', level: 'MENENGAH', deskripsi: 'Membangun dan memelihara jaringan sumber informasi yang dapat dipercaya di berbagai sektor.' },
    ],
  },
]

const warnaLevel = {
  'MAHIR': 'text-white border-white',
  'MENENGAH': 'text-white/60 border-white/30',
  'DASAR': 'text-white/30 border-white/15',
}

const KemampuanTempur = () => {
  const [domainAktif, setDomainAktif] = useState(0)
  const [kemampuanAktif, setKemampuanAktif] = useState(null)
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  const dataAktif = domainKemampuan[domainAktif]

  return (
    <section id="kemampuan" className="relative py-28 lg:py-36 bg-hitam overflow-hidden">
      {/* Nomor seksi */}
      <div className="absolute top-8 left-8 font-judul text-white/[0.03] select-none pointer-events-none"
        style={{ fontSize: 'clamp(6rem, 18vw, 14rem)', lineHeight: 1 }}>
        06
      </div>

      {/* Latar diagonal lines */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 30px)',
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
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Kemampuan Tempur</span>
          </div>
          <h2 className="font-judul text-white" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
            VIRTUAL & REALITA
          </h2>
          <p className="text-white/40 mt-4 max-w-xl font-mono text-sm leading-relaxed">
            Seperti Sakamoto — dua dunia, satu tujuan. Kemampuan yang dilatih di jalur berbeda, diarahkan ke sasaran yang sama.
          </p>
        </motion.div>

        {/* Tab selector domain */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex gap-0 mb-12 border border-white/10 w-fit"
        >
          {domainKemampuan.map((d, i) => (
            <button
              key={d.domain}
              onClick={() => { setDomainAktif(i); setKemampuanAktif(null) }}
              className={`relative px-8 py-4 font-judul text-lg uppercase tracking-widest transition-all duration-300 ${
                domainAktif === i
                  ? 'bg-white text-hitam'
                  : 'bg-transparent text-white/40 hover:text-white/70'
              }`}
              data-hover
            >
              {d.domain}
              <div className="font-mono text-xs font-normal normal-case tracking-normal mt-0.5 opacity-60">
                {d.sub}
              </div>
            </button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Daftar kemampuan */}
          <div className="space-y-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={domainAktif}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-3"
              >
                {dataAktif.kemampuan.map((item, i) => (
                  <motion.button
                    key={item.nama}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                    onClick={() => setKemampuanAktif(kemampuanAktif === i ? null : i)}
                    className={`w-full text-left kartu-kasus p-4 lg:p-5 transition-all duration-200 ${
                      kemampuanAktif === i ? 'border-white/30 bg-white/5' : ''
                    }`}
                    data-hover
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          kemampuanAktif === i ? 'bg-white' : 'bg-white/20'
                        }`} />
                        <span className="font-mono text-sm text-white/70 group-hover:text-white">
                          {item.nama}
                        </span>
                      </div>
                      <span className={`font-mono text-xs border px-2 py-0.5 flex-shrink-0 ${warnaLevel[item.level]}`}>
                        {item.level}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Panel detail */}
          <div className="lg:pl-8 lg:border-l lg:border-white/10">
            <AnimatePresence mode="wait">
              {kemampuanAktif !== null ? (
                <motion.div
                  key={`detail-${domainAktif}-${kemampuanAktif}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div>
                    <span className={`font-mono text-xs border px-2 py-0.5 ${warnaLevel[dataAktif.kemampuan[kemampuanAktif].level]}`}>
                      {dataAktif.kemampuan[kemampuanAktif].level}
                    </span>
                  </div>
                  <h3 className="font-judul text-white text-3xl lg:text-4xl uppercase tracking-wide">
                    {dataAktif.kemampuan[kemampuanAktif].nama}
                  </h3>
                  <p className="text-white/50 leading-relaxed">
                    {dataAktif.kemampuan[kemampuanAktif].deskripsi}
                  </p>
                  <div className="w-12 h-px bg-white/30" />
                  <p className="font-mono text-xs text-white/25 uppercase tracking-widest">
                    Domain: {dataAktif.domain}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-48 flex items-center justify-center"
                >
                  <p className="font-mono text-xs text-white/20 uppercase tracking-widest text-center">
                    ← Pilih kemampuan<br />untuk melihat detail
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Perbandingan Visual */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-12 border-t border-white/10 pt-8 space-y-4"
            >
              <p className="font-mono text-xs text-white/25 uppercase tracking-widest">Distribusi</p>
              {['Virtual', 'Realita'].map((label, i) => (
                <div key={label} className="space-y-1">
                  <div className="flex justify-between font-mono text-xs text-white/40">
                    <span>{label}</span>
                    <span>{i === 0 ? '60%' : '40%'}</span>
                  </div>
                  <div className="h-px bg-white/10">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: i === 0 ? 0.6 : 0.4 } : {}}
                      transition={{ delay: 1.0 + i * 0.2, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="h-full bg-white origin-left"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default KemampuanTempur
