import React, { useEffect, useRef } from 'react'

const KursorKustom = () => {
  const kursorRef = useRef(null)
  const lingkaranRef = useRef(null)
  const posisiMouse = useRef({ x: 0, y: 0 })
  const posisiLingkaran = useRef({ x: 0, y: 0 })
  const animasiRef = useRef(null)

  useEffect(() => {
    const gerakMouse = (e) => {
      posisiMouse.current = { x: e.clientX, y: e.clientY }
      if (kursorRef.current) {
        kursorRef.current.style.left = e.clientX + 'px'
        kursorRef.current.style.top = e.clientY + 'px'
      }
    }

    const animasiLingkaran = () => {
      posisiLingkaran.current.x += (posisiMouse.current.x - posisiLingkaran.current.x) * 0.12
      posisiLingkaran.current.y += (posisiMouse.current.y - posisiLingkaran.current.y) * 0.12

      if (lingkaranRef.current) {
        lingkaranRef.current.style.left = posisiLingkaran.current.x + 'px'
        lingkaranRef.current.style.top = posisiLingkaran.current.y + 'px'
      }
      animasiRef.current = requestAnimationFrame(animasiLingkaran)
    }

    const hoverMasuk = () => {
      if (kursorRef.current) {
        kursorRef.current.style.width = '20px'
        kursorRef.current.style.height = '20px'
      }
      if (lingkaranRef.current) {
        lingkaranRef.current.style.width = '60px'
        lingkaranRef.current.style.height = '60px'
        lingkaranRef.current.style.borderColor = 'rgba(255,255,255,0.8)'
      }
    }

    const hoverKeluar = () => {
      if (kursorRef.current) {
        kursorRef.current.style.width = '12px'
        kursorRef.current.style.height = '12px'
      }
      if (lingkaranRef.current) {
        lingkaranRef.current.style.width = '40px'
        lingkaranRef.current.style.height = '40px'
        lingkaranRef.current.style.borderColor = 'rgba(255,255,255,0.5)'
      }
    }

    document.addEventListener('mousemove', gerakMouse)
    animasiRef.current = requestAnimationFrame(animasiLingkaran)

    const elemenInteraktif = document.querySelectorAll('a, button, [data-hover]')
    elemenInteraktif.forEach(el => {
      el.addEventListener('mouseenter', hoverMasuk)
      el.addEventListener('mouseleave', hoverKeluar)
    })

    return () => {
      document.removeEventListener('mousemove', gerakMouse)
      cancelAnimationFrame(animasiRef.current)
    }
  }, [])

  return (
    <>
      <div ref={kursorRef} className="kursor-utama" />
      <div ref={lingkaranRef} className="kursor-lingkaran" />
    </>
  )
}

export default KursorKustom
