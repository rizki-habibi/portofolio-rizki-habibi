import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, BarChart2, AlertTriangle } from 'lucide-react'

const dataKasus = [
  { id:'sambo',   nama:'Ferdy Sambo',          sektor:'Penegakan Hukum',    tahun:2022, skor:15, penyelesaian:'VONIS MATI',        progress:95, deskripsi:'Rekayasa TKP & manipulasi CCTV oleh Kadiv Propam. 97 personel Polri terlibat.', sumber:{label:'Wikipedia — Brigadir J',url:'https://en.wikipedia.org/wiki/Murder_of_Nofriansyah_Yosua_Hutabarat'} },
  { id:'ponzi',   nama:'Ponzi & Investasi',    sektor:'Keuangan',           tahun:2024, skor:72, penyelesaian:'PARSIAL',            progress:45, deskripsi:'WNI Francius Marganda divonis atas Ponzi $23 juta di AS. Ribuan korban kehilangan dana.', sumber:{label:'ICE.gov — Ponzi WNI',url:'https://www.ice.gov/news/releases/indonesian-national-pleads-guilty-international-ponzi-scheme'} },
  { id:'data',    nama:'Kebocoran Data',        sektor:'Tata Kelola Digital', tahun:2025, skor:85, penyelesaian:'BELUM DITANGANI',   progress:10, deskripsi:'NIK Rp200/record di dark web. 58 juta data siswa bocor. Kab. Tuban bocor April 2025.', sumber:{label:'SOCRadar Indonesia 2025',url:'https://socradar.io/resources/report/indonesia-threat-landscape-report-2025/'} },
  { id:'uud',     nama:'Celah Konstitusi',      sektor:'Hukum & Politik',    tahun:2023, skor:68, penyelesaian:'BERGOLAK',           progress:25, deskripsi:'Pasal UUD multitafsir dimanfaatkan elite. Protes 2025 menuntut akuntabilitas.', sumber:{label:'Protes Indonesia 2025',url:'https://en.wikipedia.org/wiki/2025_Indonesian_protests'} },
  { id:'darkweb', nama:'Pasar Gelap Digital',   sektor:'Keamanan Siber',     tahun:2025, skor:78, penyelesaian:'BELUM DITANGANI',   progress:5,  deskripsi:'Administrasi publik = 34.93% target dark web Indonesia. Ekosistem data ilegal masif.', sumber:{label:'SOCRadar Threat 2025',url:'https://socradar.io/resources/report/indonesia-threat-landscape-report-2025/'} },
  { id:'narkoba', nama:'Narkoba Berkamuflase',  sektor:'Penegakan Hukum',    tahun:2023, skor:60, penyelesaian:'TERBUKA',            progress:35, deskripsi:'Sabu tersembunyi dalam kemasan sabun — distribusi via celah logistik e-commerce.', sumber:{label:'IIAS Narkoba 2023',url:'https://www.iias.asia/sites/iias/files/nwl_article/2024-10/IIAS_NL99_25.pdf'} },
]

const wS = {
  'VONIS MATI':'text-white border-white',
  'PARSIAL':'text-white/60 border-white/30',
  'BERGOLAK':'text-white/55 border-white/25',
  'TERBUKA':'text-white/50 border-white/20',
  'BELUM DITANGANI':'text-white/25 border-white/15',
}

const RadarChart = ({ data, inView }) => {
  const cx=150, cy=150, r=100, n=data.length
  const ang = (i) => (i*2*Math.PI/n) - Math.PI/2
  const titik = data.map((d,i)=>({ x: cx+(r*d.skor/100)*Math.cos(ang(i)), y: cy+(r*d.skor/100)*Math.sin(ang(i)) }))
  const luar  = data.map((_,i)=>({ x: cx+r*Math.cos(ang(i)), y: cy+r*Math.sin(ang(i)) }))
  const jalur = titik.map((p,i)=>`${i===0?'M':'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')+' Z'
  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[260px] mx-auto">
      {[25,50,75,100].map(p=>(
        <circle key={p} cx={cx} cy={cy} r={r*p/100} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      ))}
      {luar.map((p,i)=>(
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
      ))}
      <motion.path d={jalur} fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"
        initial={{opacity:0,scale:0}} animate={inView?{opacity:1,scale:1}:{}}
        transition={{delay:0.5,duration:0.9,ease:[0.22,1,0.36,1]}}
        style={{transformOrigin:`${cx}px ${cy}px`}}
      />
      {titik.map((p,i)=>(
        <motion.circle key={i} cx={p.x} cy={p.y} r="3.5" fill="white"
          initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.8+i*0.06}}/>
      ))}
      {data.map((d,i)=>{
        const lx=cx+(r+22)*Math.cos(ang(i)), ly=cy+(r+22)*Math.sin(ang(i))
        return <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
          fill="rgba(255,255,255,0.35)" fontSize="7.5" fontFamily="monospace">{d.sektor.split(' ')[0]}</text>
      })}
    </svg>
  )
}

const IndeksKorupsi = () => {
  const [aktif, setAktif] = useState(null)
  const { ref, inView } = useInView({ threshold:0.04, triggerOnce:true })
  const rata = Math.round(dataKasus.reduce((a,b)=>a+b.skor,0)/dataKasus.length)

  return (
    <section id="indeks" className="relative py-28 lg:py-36 bg-hitam overflow-hidden">
      <div className="absolute bottom-8 right-8 font-judul text-white/[0.03] select-none pointer-events-none"
        style={{fontSize:'clamp(6rem,18vw,14rem)',lineHeight:1}}>CPI</div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div initial={{opacity:0,y:40}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.8}} className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-white/40"/>
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Penilaian Investigatif</span>
          </div>
          <h2 className="font-judul text-white" style={{fontSize:'clamp(3rem,7vw,5.5rem)'}}>INDEKS KORUPSI</h2>
          <p className="text-white/40 mt-4 max-w-xl font-mono text-sm leading-relaxed">
            Skor per kasus berdasarkan investigasi. <strong className="text-white/60">0 = bersih, 100 = korup total.</strong> Klik untuk detail & sumber.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[3fr,2fr] gap-10 items-start">
          {/* Tabel */}
          <div>
            <motion.div initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.15}}
              className="hidden sm:grid grid-cols-[2fr,60px,1fr,80px] gap-3 px-4 py-2 border-b border-white/10 mb-2">
              {['Kasus','Skor','Status','Selesai'].map(h=>(
                <span key={h} className="font-mono text-[10px] text-white/25 uppercase tracking-widest">{h}</span>
              ))}
            </motion.div>

            <div className="space-y-1.5">
              {dataKasus.map((k,i)=>(
                <motion.div key={k.id}
                  initial={{opacity:0,x:-20}} animate={inView?{opacity:1,x:0}:{}}
                  transition={{delay:0.2+i*0.07,duration:0.6}}>
                  <button onClick={()=>setAktif(aktif===k.id?null:k.id)}
                    className={`w-full grid sm:grid-cols-[2fr,60px,1fr,80px] grid-cols-1 gap-3 items-start sm:items-center px-4 py-3.5 border transition-all duration-200 text-left ${aktif===k.id?'border-white/30 bg-white/5':'border-white/8 hover:border-white/20 hover:bg-white/[0.02]'}`}
                    data-hover>
                    <div>
                      <p className="font-judul text-white text-base uppercase tracking-wide">{k.nama}</p>
                      <p className="font-mono text-[10px] text-white/30">{k.sektor} · {k.tahun}</p>
                    </div>
                    <div className={`font-judul text-2xl ${k.skor>=75?'text-white':k.skor>=50?'text-white/65':'text-white/45'}`}>{k.skor}</div>
                    <span className={`font-mono text-[10px] border px-1.5 py-0.5 w-fit ${wS[k.penyelesaian]}`}>{k.penyelesaian}</span>
                    <div className="h-px bg-white/10 overflow-hidden">
                      <motion.div initial={{scaleX:0}} animate={inView?{scaleX:k.progress/100}:{}}
                        transition={{delay:0.5+i*0.07,duration:1.1,ease:[0.25,0.46,0.45,0.94]}}
                        className="h-full bg-white/60 origin-left"/>
                    </div>
                  </button>

                  <AnimatePresence>
                    {aktif===k.id && (
                      <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}}
                        exit={{height:0,opacity:0}} transition={{duration:0.35}} className="overflow-hidden">
                        <div className="border border-t-0 border-white/15 p-4 bg-white/[0.02] space-y-3">
                          <p className="text-white/55 text-sm leading-relaxed">{k.deskripsi}</p>
                          <div className="flex items-center gap-4 flex-wrap font-mono text-xs text-white/35">
                            <div className="flex items-center gap-1.5">
                              <BarChart2 size={11}/>
                              <span>Penyelesaian: <strong className="text-white/60">{k.progress}%</strong></span>
                            </div>
                          </div>
                          <a href={k.sumber.url} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-xs text-white/40 hover:text-white/70 border border-white/10 px-3 py-1.5 hover:border-white/25 transition-all"
                            data-hover>
                            <ExternalLink size={11}/>
                            {k.sumber.label}
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.8}}
              className="mt-6 pt-5 border-t border-white/10 flex items-center gap-2">
              <AlertTriangle size={12} className="text-white/25"/>
              <p className="font-mono text-xs text-white/25">Skor bukan penilaian resmi — berdasarkan temuan investigatif & sumber publik terverifikasi.</p>
            </motion.div>
          </div>

          {/* Radar chart kanan */}
          <motion.div initial={{opacity:0,x:30}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.3,duration:0.8}}
            className="space-y-6">
            <div className="border border-white/10 p-6">
              <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-2">Peta Radar Korupsi</p>
              <p className="font-mono text-[10px] text-white/20 mb-6">Makin besar area = makin tinggi skor korupsi</p>
              <RadarChart data={dataKasus} inView={inView}/>
            </div>

            <div className="border border-white/10 p-6 space-y-4">
              <p className="font-mono text-xs text-white/30 uppercase tracking-widest">Ringkasan</p>
              {[
                { label:'Rata-rata Skor', nilai:`${rata}/100` },
                { label:'Kasus Belum Selesai', nilai:`${dataKasus.filter(k=>k.penyelesaian==='BELUM DITANGANI').length} kasus` },
                { label:'Kasus Kritis', nilai:`${dataKasus.filter(k=>k.skor>=75).length} kasus` },
                { label:'Total Dikaji', nilai:`${dataKasus.length} kasus` },
              ].map((s,i)=>(
                <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
                  <span className="font-mono text-xs text-white/35">{s.label}</span>
                  <span className="font-judul text-white text-xl">{s.nilai}</span>
                </div>
              ))}
            </div>

            <a href="https://socradar.io/resources/report/indonesia-threat-landscape-report-2025/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 border border-white/10 p-4 hover:border-white/25 hover:bg-white/[0.02] transition-all group"
              data-hover>
              <ExternalLink size={14} className="text-white/30 group-hover:text-white/60"/>
              <div>
                <p className="font-mono text-xs text-white/45 group-hover:text-white/70">Baca: SOCRadar Indonesia 2025</p>
                <p className="font-mono text-[9px] text-white/20">socradar.io</p>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default IndeksKorupsi
