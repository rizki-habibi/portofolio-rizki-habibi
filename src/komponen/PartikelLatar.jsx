import React, { useEffect, useRef } from 'react'

const PartikelLatar = () => {
  const canvasRef = useRef(null)
  const partikelRef = useRef([])
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const aturUkuran = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    aturUkuran()
    window.addEventListener('resize', aturUkuran)

    // Buat partikel
    const jumlahPartikel = 80
    partikelRef.current = Array.from({ length: jumlahPartikel }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.4 + 0.05,
    }))

    const gambar = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      partikelRef.current.forEach((p, i) => {
        // Gerak partikel
        p.x += p.vx
        p.y += p.vy

        // Wrap around
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Gambar titik
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
        ctx.fill()

        // Gambar garis ke partikel dekat
        for (let j = i + 1; j < partikelRef.current.length; j++) {
          const p2 = partikelRef.current[j]
          const jarak = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (jarak < 100) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.04 * (1 - jarak / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      animRef.current = requestAnimationFrame(gambar)
    }

    gambar()

    return () => {
      window.removeEventListener('resize', aturUkuran)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}

export default PartikelLatar
