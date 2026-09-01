import React from 'react'

/**
 * Error Boundary — menangkap error di komponen anak
 * agar tidak mematikan seluruh aplikasi.
 */
class BatasPesan extends React.Component {
  constructor(props) {
    super(props)
    this.state = { adaError: false, pesan: '' }
  }

  static getDerivedStateFromError(error) {
    return { adaError: true, pesan: error?.message || 'Terjadi kesalahan' }
  }

  componentDidCatch(error, info) {
    console.error('[BatasPesan]', error, info)
  }

  render() {
    if (this.state.adaError) {
      return (
        <div className="py-12 px-6 text-center border border-white/10 mx-6 my-4">
          <p className="font-mono text-xs text-white/25 uppercase tracking-widest mb-2">
            Komponen gagal dimuat
          </p>
          <p className="font-mono text-xs text-white/15">{this.state.pesan}</p>
        </div>
      )
    }
    return this.props.children
  }
}

export default BatasPesan
