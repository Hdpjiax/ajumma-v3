import { useEffect, useRef } from "react"

function isMobile() {
  return window.matchMedia("(max-width: 768px)").matches
}

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (isMobile()) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let W = canvas.width  = canvas.offsetWidth
    let H = canvas.height = canvas.offsetHeight
    let raf
    let running = true

    const DOTS = Array.from({ length: 25 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.4 + 0.2,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      a: Math.random(),
    }))

    function draw() {
      if (!running) return
      ctx.clearRect(0, 0, W, H)
      DOTS.forEach(d => {
        d.x += d.vx; d.y += d.vy
        if (d.x < 0) d.x = W; if (d.x > W) d.x = 0
        if (d.y < 0) d.y = H; if (d.y > H) d.y = 0
        d.a += 0.006
        const alpha = (Math.sin(d.a) * 0.5 + 0.5) * 0.5 + 0.1
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,164,74,${alpha})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }

    // Defer canvas start by 300ms so hero paint is not blocked
    const t = setTimeout(() => draw(), 300)

    const onResize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    window.addEventListener("resize", onResize, { passive: true })
    return () => {
      running = false
      clearTimeout(t)
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  const scrollTo = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="hero" id="hero">
      {/* webp first, jpg fallback via CSS custom property */}
      <picture>
        <source srcSet="/imgs/food-sushi-roll.webp" type="image/webp" />
        <img
          src="/imgs/food-sushi-roll.jpg"
          alt=""
          aria-hidden="true"
          className="hero-photo-img"
          fetchPriority="high"
          decoding="sync"
        />
      </picture>
      <div className="hero-overlay"/>
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true"/>
      <div className="embers" aria-hidden="true">
        {[...Array(12)].map((_,i) => <span key={i} className="ember" style={{"--i":i}}/>)}
      </div>

      <div className="container hero-content">
        <div className="hero-left">
          <p className="hero-kr">&#xD658;&#xC601;&#xD569;&#xB2C8;&#xB2E4;!</p>
          <h1 className="hero-h1">AJUMMA</h1>
          <p className="hero-sub">KOREAN BBQ &amp; SUSHI</p>
          <p className="hero-tag">
            Cocina asi&#xe1;tica con alma coreana.<br/>
            Momentos que se quedan contigo.
          </p>
          <div className="hero-btns">
            <a href="#menu" className="btn btn-gold" onClick={e => scrollTo(e, "menu")}>VER MEN&#xDA; &#x2192;</a>
            <a href="#reserva" className="btn btn-outline-light" onClick={e => scrollTo(e, "reserva")}>RESERVAR MESA &#x1F5D3;</a>
          </div>
          <div className="hero-social-proof">
            <div className="avatar-stack">
              {["A","C","V","D"].map(l => <span key={l}>{l}</span>)}
            </div>
            <div className="social-proof-text">
              <strong>+10K</strong>
              <p>Seguidores disfrutan la experiencia</p>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <a href="https://www.instagram.com/ajummaoficial" target="_blank" rel="noreferrer" className="video-pill">
            <span className="play-btn">&#x25B6;</span>
            VER VIDEO
          </a>
          <div className="hero-scroll-line" aria-hidden="true"/>
        </div>
      </div>

      <a href="#experiencia" className="scroll-cue" aria-label="Bajar" onClick={e => scrollTo(e, "experiencia")}>
        <span>Desliza</span>
        <div className="scroll-bar"/>
      </a>
    </section>
  )
}
