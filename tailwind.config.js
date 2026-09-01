/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hitam: '#0a0a0a',
        'hitam-abu': '#111111',
        'abu-gelap': '#1a1a1a',
        'abu-sedang': '#2a2a2a',
        'abu-terang': '#4a4a4a',
        putih: '#f5f5f5',
        'putih-redup': '#cccccc',
        'putih-abu': '#999999',
        aksen: '#ffffff',
        'aksen-redup': '#e0e0e0',
      },
      fontFamily: {
        judul: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        teks: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        manga: ['"Permanent Marker"', 'cursive'],
      },
      fontSize: {
        'raksasa': ['8rem', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        'besar-sekali': ['5rem', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
      },
      animation: {
        'glitch': 'glitch 2s infinite',
        'scan-line': 'scan-line 3s linear infinite',
        'noise': 'noise 0.5s steps(2) infinite',
        'fade-up': 'fade-up 0.8s ease forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-3px, 3px)', filter: 'hue-rotate(90deg)' },
          '40%': { transform: 'translate(3px, -3px)' },
          '60%': { transform: 'translate(-2px, 2px)', filter: 'hue-rotate(180deg)' },
          '80%': { transform: 'translate(2px, -1px)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'halftone': 'radial-gradient(circle, #333 1px, transparent 1px)',
        'garis-aksi': 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        'panel-manga': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
      },
    },
  },
  plugins: [],
}
