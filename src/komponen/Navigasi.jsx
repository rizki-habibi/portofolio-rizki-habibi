import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const itemMenu = [
  { label: 'Beranda', id: 'beranda' },
  { label: 'Tentang', id: 'tentang' },
  { label: 'Keahlian', id: 'keahlian' },
  { label: 'Kasus', id: 'kasus' },
  { label: 'Misi', id: 'misi' },
  { label: 'Kemampuan', id: 'kemampuan' },
  { label: 'AI Tools', id: 'ai-tools' },
  { label: 'Jadwal', id: 'jadwal' },
  { label: 'Kontak', id: 'kontak' },
]

const Navigasi = () => {
  const [gulir, setGulir] = useState(false)
  const [menuTerbuka, setMenuTerbuka] = useState(false)
  const [seksiAktif, setSeksiAktif] = useState('beranda')

  useEffect(() => {
    const handleGulir = () => {
      setGulir(window.scrollY > 50)

      // Deteksi seksi aktif
      const seksi = itemMenu.map(item => document.getElementById(item.id))
      seksi.forEach((el, i) => {
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setSeksiAktif(itemMenu[i].id)
          }
        }
      })
    }

    window.addEventListener('scroll', handleGulir)
    return () => window.removeEventListener('scroll', handleGulir)
  }, [])

  const gulirKe = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuTerbuka(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          gulir
            ? 'bg-hitam/90 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="font-judul text-2xl text-white cursor-pointer tracking-widest"
            onClick={() => gulirKe('beranda')}
            whileHover={{ scale: 1.05 }}
            data-hover
          >
            <span className="text-white">RH</span>
            <span className="text-white/30">.</span>
          </motion.div>

          {/* Menu Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {itemMenu.map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => gulirKe(item.id)}
                className={`relative text-sm font-mono uppercase tracking-widest transition-colors duration-300 ${
                  seksiAktif === item.id ? 'text-white' : 'text-white/40 hover:text-white/80'
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.3 }}
                data-hover
              >
                {item.label}
                {seksiAktif === item.id && (
                  <motion.div
                    layoutId="garis-nav"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-white"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Tombol Kontak */}
          <motion.button
            onClick={() => gulirKe('kontak')}
            className="hidden lg:block border border-white/20 text-white/70 hover:text-white hover:border-white/60 px-5 py-2 text-xs font-mono uppercase tracking-widest transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-hover
          >
            Hubungi
          </motion.button>

          {/* Tombol Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuTerbuka(!menuTerbuka)}
            aria-label="Buka menu"
            data-hover
          >
            <motion.span
              animate={menuTerbuka ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-white transition-all"
            />
            <motion.span
              animate={menuTerbuka ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-px bg-white transition-all"
            />
            <motion.span
              animate={menuTerbuka ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-white transition-all"
            />
          </button>
        </div>
      </motion.nav>

      {/* Menu Mobile */}
      <AnimatePresence>
        {menuTerbuka && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-hitam/98 backdrop-blur-lg flex flex-col items-center justify-center"
          >
            {itemMenu.map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => gulirKe(item.id)}
                className="text-4xl font-judul text-white/60 hover:text-white py-3 tracking-widest uppercase transition-colors duration-200"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                data-hover
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigasi
