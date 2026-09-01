import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  ExternalLink, ChevronDown, AlertTriangle, CheckCircle,
  Clock, FileText, Link2, Shield, Eye
} from 'lucide-react'

const dataKasus = [
  {
    tahun: '2023',
    kasus: [
      {
        id: 'k1',
        judul: 'Kasus Ferdy Sambo',
        kode: 'KS-2023-01',
        status: 'DISOROT',
        tingkat: 'TINGGI',
        deskripsi: 'Mantan Kadiv Propam Polri Irjen Ferdy Sambo divonis hukuman mati atas pembunuhan berencana terhadap Brigadir J (Nofriansyah Yosua Hutabarat). Kasus ini mengungkap rekayasa TKP sistematis dan manipulasi alat bukti CCTV oleh petinggi Polri.',
        temuan: [
          'DVR CCTV gedung Duren Tiga diambil & dihapus atas perintah Sambo',
          'Rekayasa skenario "tembak-menembak" yang kemudian terbukti bohong',
          'Keterlibatan minimal 97 personel Polri dalam penutupan kasus',
          'Vonis mati PN Jakarta Selatan — Februari 2023',
        ],
        sumber: [
          { label: 'VOI — CCTV DVR Diambil Paksa', url: 'https://voi.id/en/news/219109' },
          { label: 'Mothership SG — Vonis Hukuman Mati', url: 'https://mothership.sg/2023/02/indon-police-general-sentenced-death/' },
          { label: 'Channel News Asia — Putusan Pengadilan', url: 'https://www.channelnewsasia.com/asia/former-police-general-fredy-sambo-death-murder-3273866' },
          { label: 'Tempo.co — CCTV Ditemukan Kembali', url: 'https://en.tempo.co/read/1614299/cctv-in-the-police-shootout-case-recovered' },
        ],
        alurInvestigasi: [
          { langkah: '10 Jul 2022', isi: 'Brigadir J tewas di rumah dinas Sambo' },
          { langkah: '11 Jul 2022', isi: 'DVR CCTV diambil & dihapus oleh tim Sambo' },
          { langkah: 'Agt 2022', isi: 'Sambo resmi tersangka pembunuhan berencana' },
          { langkah: 'Okt 2022', isi: 'Sidang dimulai, rekayasa TKP terbongkar' },
          { langkah: 'Feb 2023', isi: 'Vonis mati dijatuhkan PN Jakarta Selatan' },
        ],
      },
      {
        id: 'k2',
        judul: 'Sabu Berkedok Sabun',
        kode: 'KS-2023-02',
        status: 'TERBUKA',
        tingkat: 'KRITIS',
        deskripsi: 'Jaringan distribusi narkoba menggunakan produk rumah tangga (sabun, deterjen, sampo) sebagai kamuflase pengiriman sabu-sabu lintas provinsi. Modus ini memanfaatkan celah sistem logistik marketplace online.',
        temuan: [
          'Sabu disembunyikan dalam kemasan sabun cuci & sampo palsu',
          'Jaringan distribusi mencakup Sumatera–Jawa–Kalimantan',
          'Memanfaatkan jasa kurir marketplace sebagai vektor pengiriman',
          'Keterlibatan oknum bea cukai dalam memperlancar pengiriman',
        ],
        sumber: [
          { label: 'IIAS — Laporan Narkoba Surabaya 2023', url: 'https://www.iias.asia/sites/iias/files/nwl_article/2024-10/IIAS_NL99_25.pdf' },
          { label: 'OJK — Satgas Waspada Investigasi', url: 'https://ojk.go.id/waspada-investasi/id/siaran-pers/Pages/OJK-dan-Satgas-Waspada-Investigasi-Ungkap-Dua-Kasus.aspx' },
        ],
        alurInvestigasi: [
          { langkah: 'Temuan Awal', isi: 'Paket mencurigakan terdeteksi di sortir kurir' },
          { langkah: 'Analisis', isi: 'Uji lab konfirmasi kandungan sabu dalam produk' },
          { langkah: 'Pemetaan', isi: 'Lacak nomor resi & pola pengiriman berulang' },
          { langkah: 'Pengungkapan', isi: 'Identifikasi 3 hub distribusi utama' },
          { langkah: 'Status', isi: 'Masih dalam penyelidikan — jaringan belum selesai' },
        ],
      },
      {
        id: 'k3',
        judul: 'Kekacauan UUD — Celah Hukum',
        kode: 'KS-2023-03',
        status: 'DISOROT',
        tingkat: 'TINGGI',
        deskripsi: 'Analisis inkonsistensi amandemen UUD 1945 yang menciptakan celah hukum multitafsir. Pasal-pasal yang sengaja dibiarkan ambigu dimanfaatkan kelompok elite untuk memperpanjang kekuasaan.',
        temuan: [
          'Pasal jabatan presiden memiliki interpretasi ganda pasca-amandemen',
          'Tidak ada mekanisme clear tentang masa jabatan kontinuitas',
          'MK dapat menafsirkan ulang konstitusi tanpa perubahan formal',
          '12 pasal teridentifikasi berpotensi disalahgunakan',
        ],
        sumber: [
          { label: 'Wikipedia — Protes Indonesia 2025', url: 'https://en.wikipedia.org/wiki/2025_Indonesian_protests' },
          { label: 'Wikipedia — Protes Indonesia 2025–2026', url: 'https://en.wikipedia.org/wiki/2025%E2%80%932026_Indonesian_protests' },
        ],
        alurInvestigasi: [
          { langkah: 'Studi Dokumen', isi: 'Baca semua 4 amandemen UUD 1945' },
          { langkah: 'Komparasi', isi: 'Bandingkan interpretasi MK vs DPR' },
          { langkah: 'Pemetaan', isi: 'Identifikasi pasal-pasal ambigu' },
          { langkah: 'Analisis', isi: 'Korelasikan dengan keputusan politik nyata' },
          { langkah: 'Status', isi: 'Dokumen analisis dalam proses finalisasi' },
        ],
      },
    ],
  },
  {
    tahun: '2024',
    kasus: [
      {
        id: 'k4',
        judul: 'Manipulasi Skema Ponzi',
        kode: 'KS-2024-01',
        status: 'TUNTAS',
        tingkat: 'KRITIS',
        deskripsi: 'Investigasi skema investasi palsu yang menjangkau ribuan korban. Mengacu pada pola kasus Francius Marganda — WNI divonis bersalah atas Ponzi scheme senilai $23 juta yang mengelabui investor Indonesia-Amerika.',
        temuan: [
          'Pola identik ditemukan pada setidaknya 4 skema lokal 2024',
          'Dana mengalir melalui rekening di 3 yurisdiksi berbeda',
          'Penggunaan influencer media sosial sebagai umpan marketing',
          'Koneksi ke pejabat daerah teridentifikasi dalam 2 kasus',
        ],
        sumber: [
          { label: 'ICE.gov — WNI Pleads Guilty $23M Ponzi', url: 'https://www.ice.gov/news/releases/indonesian-national-pleads-guilty-international-ponzi-scheme' },
          { label: 'Unissula — Studi Ponzi Indonesia', url: 'https://jurnal.unissula.ac.id/index.php/RH/article/download/52146/15998' },
          { label: 'U-Szeged — Perlindungan Korban Ponzi', url: 'https://publicatio.bibl.u-szeged.hu/38508/1/08Anggriawan.pdf' },
        ],
        alurInvestigasi: [
          { langkah: 'Identifikasi', isi: 'Deteksi pola return tidak wajar (>20%/bulan)' },
          { langkah: 'Pelacakan', isi: 'Telusuri aliran dana via multiple rekening' },
          { langkah: 'Korban', isi: 'Kumpulkan testimoni 200+ korban terverifikasi' },
          { langkah: 'Koneksi', isi: 'Peta jaringan pelaku ke pejabat daerah' },
          { langkah: 'Pelaporan', isi: 'Laporan diserahkan ke OJK & Bareskrim' },
        ],
      },
    ],
  },
  {
    tahun: '2025',
    kasus: [
      {
        id: 'k5',
        judul: 'Kecurangan Ijazah & Data Gelap',
        kode: 'KS-2025-01',
        status: 'BERLANGSUNG',
        tingkat: 'KRITIS',
        deskripsi: 'Investigasi jaringan jual-beli ijazah palsu pejabat aktif + kebocoran masif data kependudukan Indonesia di dark web. NIK dan data KK dijual Rp200/record untuk penipuan SIM card & e-wallet.',
        temuan: [
          '58 juta data siswa Indonesia diklaim bocor — Feb 2026 (masih diselidiki)',
          'NIK dijual di dark web Rp200/record — digunakan daftarkan SIM card palsu',
          'Data kependudukan Kab. Tuban bocor via forum ilegal — April 2025',
          'Kontroversi ijazah presiden memicu gelombang investigasi publik',
        ],
        sumber: [
          { label: 'TorNews — 58 Juta Data Siswa Bocor', url: 'https://tornews.com/news/data-breaches/indonesia-student-data-dark-web-sale/' },
          { label: 'Vida.id — NIK Dijual Rp200 di Dark Web', url: 'https://vida.id/en/blog/fake-id-cards' },
          { label: 'BrinzTech — Data Kab. Tuban Bocor', url: 'https://www.brinztech.com/breach-alerts/brinztech-sovereign-threat-alert-government-directory-bank-jatim-account-numbers-leaked-via-pdf-arrays-kabupaten-tuban/' },
          { label: 'Kontroversi Ijazah — Fakta & Verifikasi', url: 'https://conference.abrf.org/abrf-news/membedah-isu-ijazah-presiden-fakta-kontroversi-dan-verifikasi-1764798299' },
        ],
        alurInvestigasi: [
          { langkah: 'Monitor', isi: 'Pantau forum dark web BreachForums & Telegram' },
          { langkah: 'Verifikasi', isi: 'Uji sample data — konfirmasi autentisitas' },
          { langkah: 'Analisis', isi: 'Peta ekosistem jual-beli data Indonesia' },
          { langkah: 'Korelasi', isi: 'Hubungkan kebocoran dengan kasus ijazah palsu' },
          { langkah: 'Status', isi: 'AKTIF — investigasi masih berjalan' },
        ],
      },
      {
        id: 'k6',
        judul: 'Eksploitasi AI & Data Warga',
        kode: 'KS-2025-02',
        status: 'BERLANGSUNG',
        tingkat: 'TINGGI',
        deskripsi: 'Riset kerentanan platform AI terhadap eksploitasi data warga Indonesia. Publik administrasi mendominasi 34.93% ancaman dark web Indonesia. Lebih dari 55.7% serangan siber menargetkan Indonesia secara spesifik.',
        temuan: [
          'Sektor administrasi publik = 34.93% ancaman dark web Indonesia (SOCRadar 2025)',
          'Pendidikan 12.59% + Keuangan 9.57% jadi target utama berikutnya',
          'Tries Digital Indonesia: 1 juta+ record bocor — September 2025',
          'Prompt injection & data harvesting via API AI ditemukan pada 3 platform',
        ],
        sumber: [
          { label: 'SOCRadar — Indonesia Threat Landscape 2025', url: 'https://socradar.io/resources/report/indonesia-threat-landscape-report-2025/' },
          { label: 'Heroic.com — Tries Digital 1M Records Breach', url: 'https://heroic.com/darkhive-breaches/tries-digital-indonesia/' },
          { label: 'The Diplomat — Bjorka vs Pemerintah Indonesia', url: 'https://thediplomat.com/2022/09/bjorka-the-online-hacker-trying-to-take-down-the-indonesian-government/' },
        ],
        alurInvestigasi: [
          { langkah: 'Monitoring', isi: 'Pantau SOCRadar & HaveIBeenPwned Indonesia' },
          { langkah: 'Testing', isi: 'Uji prompt injection pada 6 platform AI' },
          { langkah: 'Korelasi', isi: 'Hubungkan breach ke kebijakan privasi platform' },
          { langkah: 'Dokumentasi', isi: 'Arsipkan bukti digital dengan timestamp' },
          { langkah: 'Status', isi: 'AKTIF — laporan final dalam penyusunan' },
        ],
      },
    ],
  },
]

const warnaStatus = {
  'DISOROT': 'text-white/70 border-white/30',
  'TERBUKA': 'text-white border-white',
  'TUNTAS': 'text-white/40 border-white/20',
  'BERLANGSUNG': 'text-white border-white',
}

// Mini skema alur investigasi SVG
const AlurInvestigasi = ({ langkah }) => (
  <div className="mt-5 pt-5 border-t border-white/10">
    <p className="font-mono text-xs text-white/25 uppercase tracking-widest mb-4">Alur Investigasi</p>
    <div className="relative">
      {/* Garis horizontal */}
      <div className="absolute top-3 left-0 right-0 h-px bg-white/10" />
      <div className="flex justify-between relative">
        {langkah.map((l, i) => (
          <div key={i} className="flex flex-col items-center gap-2 flex-1">
            <div className={`w-2 h-2 rounded-full border flex-shrink-0 z-10 ${l.langkah === 'Status' || l.langkah === 'AKTIF'
              ? 'bg-white border-white'
              : 'bg-hitam border-white/40'
              }`} />
            <div className="text-center px-0.5">
              <div className="font-mono text-[9px] text-white/50 leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-[60px]">
                {l.langkah}
              </div>
              <div className="font-mono text-[8px] text-white/25 leading-tight mt-0.5 hidden lg:block max-w-[70px] break-words text-center">
                {l.isi.slice(0, 28)}{l.isi.length > 28 ? '…' : ''}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const KartuKasus = ({ kasus, terlihat, delay }) => {
  const [terbuka, setTerbuka] = useState(false)
  const [tabAktif, setTabAktif] = useState('temuan')

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={terlihat ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="kartu-kasus"
    >
      {/* Header — klik untuk buka */}
      <button
        className="w-full text-left p-5 lg:p-6"
        onClick={() => setTerbuka(!terbuka)}
        data-hover
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1.5 flex-wrap">
              <span className="font-mono text-xs text-white/25">{kasus.kode}</span>
              <span className={`font-mono text-xs border px-2 py-0.5 ${warnaStatus[kasus.status]} ${kasus.status === 'BERLANGSUNG' ? 'animate-pulse' : ''}`}>
                {kasus.status}
              </span>
              <span className={`font-mono text-xs border px-2 py-0.5 ${kasus.tingkat === 'KRITIS' ? 'text-white border-white/60' : 'text-white/50 border-white/20'}`}>
                {kasus.tingkat}
              </span>
            </div>
            <h4 className="font-judul text-white text-xl lg:text-2xl uppercase tracking-wide">
              {kasus.judul}
            </h4>
          </div>
          <motion.div
            animate={{ rotate: terbuka ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex-shrink-0 mt-1"
          >
            <ChevronDown size={18} className="text-white/30" />
          </motion.div>
        </div>
        <p className="text-white/40 text-sm leading-relaxed line-clamp-2">{kasus.deskripsi}</p>
      </button>

      {/* Detail */}
      <AnimatePresence>
        {terbuka && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10"
          >
            <div className="p-5 lg:p-6 space-y-5">
              {/* Tab selector */}
              <div className="flex gap-0 border border-white/10 w-fit">
                {[
                  { key: 'temuan', label: 'Temuan', Ikon: Eye },
                  { key: 'sumber', label: 'Sumber', Ikon: Link2 },
                  { key: 'alur', label: 'Alur', Ikon: FileText },
                ].map(({ key, label, Ikon }) => (
                  <button key={key}
                    onClick={() => setTabAktif(key)}
                    className={`flex items-center gap-1.5 px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all duration-200 ${tabAktif === key ? 'bg-white text-hitam' : 'text-white/40 hover:text-white/70'
                      }`}
                    data-hover
                  >
                    <Ikon size={11} />
                    {label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {tabAktif === 'temuan' && (
                  <motion.ul key="temuan" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-2">
                    {kasus.temuan.map((t, i) => (
                      <li key={i} className="flex items-start gap-3 font-mono text-xs text-white/60">
                        <CheckCircle size={12} className="text-white/30 flex-shrink-0 mt-0.5" />
                        {t}
                      </li>
                    ))}
                  </motion.ul>
                )}

                {tabAktif === 'sumber' && (
                  <motion.div key="sumber" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-2">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield size={12} className="text-white/25" />
                      <span className="font-mono text-xs text-white/25">Sumber terverifikasi — klik untuk buka</span>
                    </div>
                    {kasus.sumber.map((s, i) => (
                      <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-200 group"
                        data-hover
                      >
                        <ExternalLink size={12} className="text-white/25 group-hover:text-white/60 flex-shrink-0" />
                        <span className="font-mono text-xs text-white/50 group-hover:text-white/80 transition-colors">{s.label}</span>
                        <div className="ml-auto font-mono text-xs text-white/15 truncate max-w-[140px]">
                          {(() => { try { return new URL(s.url).hostname } catch { return '' } })()}
                        </div>
                      </a>
                    ))}
                  </motion.div>
                )}

                {tabAktif === 'alur' && (
                  <motion.div key="alur" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <AlurInvestigasi langkah={kasus.alurInvestigasi} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const Kasus = () => {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="kasus" className="relative py-28 lg:py-36 bg-hitam overflow-hidden">
      <div className="absolute top-8 right-8 font-judul text-white/[0.03] select-none pointer-events-none"
        style={{ fontSize: 'clamp(6rem, 18vw, 14rem)', lineHeight: 1 }}>04</div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-white/40" />
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Rekam Jejak</span>
          </div>
          <h2 className="font-judul text-white" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>KASUS INVESTIGASI</h2>
          <p className="text-white/40 mt-4 max-w-xl font-mono text-sm leading-relaxed">
            Setiap kasus dilengkapi <strong className="text-white/60">sumber terverifikasi</strong>, temuan kunci, dan alur investigasi. Klik untuk buka detail.
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap gap-4 mb-12 font-mono text-xs text-white/30"
        >
          {[
            { warna: 'bg-white', label: 'Berlangsung' },
            { warna: 'bg-white/50', label: 'Disorot' },
            { warna: 'bg-white/30', label: 'Terbuka' },
            { warna: 'bg-white/15', label: 'Tuntas' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${l.warna}`} />
              {l.label}
            </div>
          ))}
          <div className="flex items-center gap-2 ml-auto">
            <Link2 size={10} className="text-white/25" />
            <span>Sumber = link nyata ke berita/dokumen resmi</span>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-16">
          {dataKasus.map((grup, gi) => (
            <div key={grup.tahun}>
              <div className="grid lg:grid-cols-[140px,1fr] gap-8 lg:gap-12">
                <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: gi * 0.2, duration: 0.7 }} className="lg:text-right"
                >
                  <div className="font-judul text-white/80 lg:sticky lg:top-24"
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>{grup.tahun}</div>
                  <div className="hidden lg:block mt-2 w-full h-px bg-white/10" />
                </motion.div>

                <div className="relative">
                  <div className="hidden lg:block absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
                  <div className="space-y-4">
                    {grup.kasus.map((kasus, ki) => (
                      <KartuKasus key={kasus.id} kasus={kasus} terlihat={inView} delay={gi * 0.2 + ki * 0.12} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer stats */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-8 font-mono text-xs text-white/30"
        >
          <span>Total Kasus: <strong className="text-white/60">6</strong></span>
          <span>Berlangsung: <strong className="text-white/60">2</strong></span>
          <span>Tuntas: <strong className="text-white/60">1</strong></span>
          <span>Disorot: <strong className="text-white/60">2</strong></span>
          <span>Terbuka: <strong className="text-white/60">1</strong></span>
          <span className="ml-auto flex items-center gap-1.5">
            <AlertTriangle size={10} className="text-white/25" />
            Sumber diverifikasi dari media independen & lembaga resmi
          </span>
        </motion.div>
      </div>
    </section>
  )
}

export default Kasus
