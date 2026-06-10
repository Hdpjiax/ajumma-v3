
import { useRef, useEffect } from "react"
import { GALLERY } from "../data/content"

export default function Gallery() {
  const trackRef = useRef(null)
  const rafRef   = useRef(null)
  const posRef   = useRef(0)
  const pauseRef = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // After mount, measure one "set" width and auto-scroll
    const speed = 0.55   // px per frame  (~33px/s at 60fps)

    const animate = () => {
      if (!pauseRef.current) {
        posRef.current += speed
        // When we've scrolled exactly one full set, reset to 0 (seamless loop)
        const setWidth = track.scrollWidth / 2
        if (posRef.current >= setWidth) posRef.current = 0
        track.style.transform = `translateX(-${posRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    // Pause on hover/touch
    const pause  = () => { pauseRef.current = true }
    const resume = () => { pauseRef.current = false }
    track.addEventListener("mouseenter", pause)
    track.addEventListener("mouseleave", resume)
    track.addEventListener("touchstart",  pause, { passive: true })
    track.addEventListener("touchend",    resume)

    return () => {
      cancelAnimationFrame(rafRef.current)
      track.removeEventListener("mouseenter", pause)
      track.removeEventListener("mouseleave", resume)
      track.removeEventListener("touchstart",  pause)
      track.removeEventListener("touchend",    resume)
    }
  }, [])

  // Duplicate gallery items so the loop is truly seamless
  const doubled = [...GALLERY, ...GALLERY]

  return (
    <section className="section gallery-sec" id="galeria">
      <div className="container">
        <p className="eyebrow red fade-up">AMBIENTE QUE ENAMORA</p>
        <h2 className="fade-up d1">
          La experiencia<br/><em>en imágenes</em>
        </h2>
      </div>

      {/* Outer wrapper: clips overflow, no scrollbar, no whitespace */}
      <div className="gallery-outer">
        <div className="gallery-track-wrap">
          <div className="gallery-track" ref={trackRef}>
            {doubled.map((src, i) => (
              <div key={i} className="gall-card">
                <img src={src} alt={`Ajumma ${(i % GALLERY.length) + 1}`} loading="lazy"/>
                <div className="gall-shine"/>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{textAlign:"center", marginTop:"2.5rem"}}>
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
