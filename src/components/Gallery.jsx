import { useRef, useEffect } from "react"
import { GALLERY } from "../data/content"

export default function Gallery() {
  const trackRef = useRef(null)
  const rafRef = useRef(null)
  const posRef = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const isMobile = window.matchMedia("(max-width: 768px)").matches
    const speed = isMobile ? 1.4 : 0.9

    const animate = () => {
      posRef.current += speed
      const setWidth = track.scrollWidth / 2
      if (posRef.current >= setWidth) posRef.current = 0
      track.style.transform = `translateX(-${posRef.current}px)`
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(rafRef.current)
    // No pause on hover — carousel runs continuously
  }, [])

  const doubled = [...GALLERY, ...GALLERY]

  return (
    <section className="section gallery-sec" id="galeria">
      <div className="container">
        <p className="eyebrow red fade-up">AMBIENTE QUE ENAMORA</p>
        <h2 className="fade-up d1">
          La experiencia<br /><em>en imágenes</em>
        </h2>
      </div>

      <div className="gallery-outer">
        <div className="gallery-track-wrap">
          <div className="gallery-track" ref={trackRef}>
            {doubled.map((src, i) => (
              <div key={i} className="gall-card">
                <img src={src} alt={`Ajumma ${(i % GALLERY.length) + 1}`} loading="lazy" />
                <div className="gall-shine" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ textAlign: "center", marginTop: "2.5rem" }}>
        <a
          href="https://www.instagram.com/ajummaoficial"
          target="_blank" rel="noreferrer"
          className="btn btn-outline-light fade-up"
        >
          📸 @ajummaoficial — Ver más en Instagram
        </a>
      </div>
    </section>
  )
}
