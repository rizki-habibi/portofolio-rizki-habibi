import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Layar pembuka bergaya Sakamoto Days — muncul sekali saat pertama load
 * Panel manga hitam-putih yang menutup lalu membuka website
 */
const PembukaSakamoto = ({ selesai }) => {
  const [fase, setFase] = useState(0)
  // fase 0: panel masuk
  // fase 1: teks muncul
  // fase 2: panel keluar

  useEffect(() => {
    const t1 = setTimeout(() => setFase(1), 600)
    const t2 = setTimeout(() => setFase(2), 2200)
    const t3 = setTimeout(() => selesai(), 3400)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [selesai])

  return (
    <AnimatePresence>
      {fase < 2 && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden"
          exit={{ scaleY: 0, originY: 0, transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Latar garis aksi */}
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1440 900">
            {Array.from({ length: 48 }, (_, i) => {
              const sudut = (i * 7.5) * Math.PI / 180
              return (
                <line key={i}
                  x1="720" y1="450"
                  x2={720 + Math.cos(sudut) * 2000}
                  y2={450 + Math.sin(sudut) * 2000}
                  stroke="black" strokeWidth="1"
                />
              )
            })}
          </svg>

          <AnimatePresence>
            {fase >= 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center relative z-10 select-none"
              >
                {/* Panel manga utama */}
                <div className="border-4 border-black p-8 lg:p-12 bg-white relative">
                  {/* Halftone corner */}
                  <div className="absolute top-0 left-0 w-24 h-24 opacity-10"
                    style={{
                      backgroundImage: 'radial-gradient(circle, black 1.5px, transparent 1.5px)',
                      backgroundSize: '8px 8px',
                    }}
                  />
                  <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10"
                    style={{
                      backgroundImage: 'radial-gradient(circle, black 1.5px, transparent 1.5px)',
                      backgroundSize: '8px 8px',
                    }}
                  />

                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="font-mono text-xs text-black/40 uppercase tracking-widest mb-4"
                  >
                    Memuat Identitas...
                  </motion.div>

                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="font-judul text-black leading-none mb-1"
                    style={{ fontSize: 'clamp(3rem, 10vw, 6rem)' }}
                  >
                    RIZKI
                  </motion.div>

                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="font-judul text-black leading-none mb-6"
                    style={{ fontSize: 'clamp(3rem, 10vw, 6rem)' }}
                  >
                    HABIBI
                  </motion.div>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="w-full h-0.5 bg-black mb-6 origin-left"
                  />

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="font-mono text-xs text-black/50 uppercase tracking-widest"
                  >
                    Jurnalis · Aktivis · Investigator
                  </motion.p>
                </div>

                {/* Efek SFX teks bergaya manga */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  className="absolute -bottom-8 -right-8 font-judul text-black/15 text-6xl lg:text-8xl select-none rotate-12"
                >
                  ドン！
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PembukaSakamoto
