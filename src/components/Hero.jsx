
import { useEffect, useRef } from "react"

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let W = canvas.width  = canvas.offsetWidth
    let H = canvas.height = canvas.offsetHeight
    let raf

    const DOTS = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      a: Math.random(),
    }))

    function draw() {
      ctx.clearRect(0, 0, W, H)
      DOTS.forEach(d => {
        d.x += d.vx; d.y += d.vy
        if (d.x < 0) d.x = W
        if (d.x > W) d.x = 0
        if (d.y < 0) d.y = H
        if (d.y > H) d.y = 0
        d.a += 0.008
        const alpha = (Math.sin(d.a) * 0.5 + 0.5) * 0.7 + 0.1
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,164,74,${alpha})`
        ctx.fill()
      })
      // subtle connecting lines
      for (let i = 0; i < DOTS.length; i++) {
        for (let j = i + 1; j < DOTS.length; j++) {
          const dx = DOTS[i].x - DOTS[j].x
          const dy = DOTS[i].y - DOTS[j].y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 90) {
            ctx.beginPath()
            ctx.moveTo(DOTS[i].x, DOTS[i].y)
            ctx.lineTo(DOTS[j].x, DOTS[j].y)
            ctx.strokeStyle = `rgba(201,164,74,${(1 - dist/90)*0.12})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    window.addEventListener("resize", onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize) }
  }, [])

  return (
    <section className="hero" id="hero">
      {/* BG photo — sushi roll full right side */}
      <div className="hero-photo"/>

      {/* Dark gradient overlay left-heavy like reference */}
      <div className="hero-overlay"/>

      {/* Animated particles canvas */}
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true"/>

      {/* Embers / sparks */}
      <div className="embers" aria-hidden="true">
        {[...Array(22)].map((_,i) => <span key={i} className="ember" style={{"--i":i}}/>)}
      </div>

      {/* Content */}
      <div className="container hero-content">
        <div className="hero-left">
          <p className="hero-kr fade-up">환영합니다!</p>
          <h1 className="hero-h1 fade-up d1">AJUMMA</h1>
          <p className="hero-sub fade-up d2">KOREAN BBQ &amp; SUSHI</p>
          <p className="hero-tag fade-up d3">
            Cocina asiática con alma coreana.<br/>
            Momentos que se quedan contigo.
          </p>
          <div className="hero-btns fade-up d4">
            <a href="#menu" className="btn btn-gold">VER MENÚ →</a>
            <a href="#reserva" className="btn btn-outline-light">RESERVAR MESA 🗓</a>
          </div>
          <div className="hero-social-proof fade-up d5">
            <div className="avatar-stack">
              {["A","C","V","D"].map(l => <span key={l}>{l}</span>)}
            </div>
            <div>
              <strong>+10K</strong>
              <p>Seguidores disfrutan la experiencia</p>
            </div>
          </div>
        </div>

        {/* Right side — decorative video CTA pill */}
        <div className="hero-right fade-up d3">
          <a href="https://www.instagram.com/ajummaoficial" target="_blank" rel="noreferrer" className="video-pill">
            <span className="play-btn">▶</span>
            VER VIDEO
          </a>
          <div className="hero-scroll-line" aria-hidden="true"/>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#experiencia" className="scroll-cue" aria-label="Bajar">
        <span>SCROLL</span>
        <div className="scroll-bar"/>
      </a>
    </section>
  )
}
