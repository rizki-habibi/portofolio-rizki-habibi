import { useInView } from 'react-intersection-observer'

/**
 * Hook kustom untuk animasi saat elemen masuk viewport
 * @param {number} threshold - Persentase elemen yang harus terlihat (0-1)
 * @param {boolean} sekaliSaja - Apakah animasi hanya berjalan sekali
 */
export function gunakanAnimasiScroll(threshold = 0.1, sekaliSaja = true) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: sekaliSaja,
  })

  return { ref, terlihat: inView }
}

export default gunakanAnimasiScroll
