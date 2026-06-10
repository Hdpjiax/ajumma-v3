import { useEffect, useRef } from "react"

function isMobile() {
  return window.matchMedia("(max-width: 768px)").matches
}

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    const mobile = isMobile()

    let W = canvas.width  = canvas.offsetWidth
    let H = canvas.height = canvas.offsetHeight
    let raf, running = true

    // ── Particle config per device ──────────────────────
    const COUNT       = mobile ? 18 : 38
    const CONN_DIST   = mobile ? 0  : 140   // connection line distance (0 = off on mobile)
    const GLOW_RADIUS = mobile ? 6  : 14    // glow halo radius

    // Color palette: gold + ember red
    const COLORS = [
      [201, 164,  74],  // gold
      [201, 164,  74],  // gold (weighted)
      [220, 130,  40],  // amber
      [192,  57,  43],  // red ember
      [255, 200, 100],  // bright spark
    ]

    // ── Particle factory ────────────────────────────────
    function mkParticle(fromBottom = false) {
      const col = COLORS[Math.floor(Math.random() * COLORS.length)]
      return {
        x:    Math.random() * W,
        y:    fromBottom ? H + 10 : Math.random() * H,
        r:    Math.random() * (mobile ? 1.6 : 2.4) + 0.6,
        vx:   (Math.random() - 0.5) * (mobile ? 0.3 : 0.5),
        vy:   -(Math.random() * 0.6 + 0.2),   // always drifts upward (ember)
        a:    Math.random() * Math.PI * 2,
        da:   (Math.random() * 0.008 + 0.003) * (Math.random() < 0.5 ? 1 : -1),
        life: Math.random(),                   // 0-1 phase
        col,
        trail: [],                             // last N positions
      }
    }

    let particles = Array.from({ length: COUNT }, () => mkParticle())

    // ── Helpers ─────────────────────────────────────────
    function rgba([r,g,b], a) { return `rgba(${r},${g},${b},${a})` }

    function drawGlow(x, y, r, col, alpha) {
      const grad = ctx.createRadialGradient(x, y, 0, x, y, GLOW_RADIUS * r)
      grad.addColorStop(0,   rgba(col, alpha * 0.9))
      grad.addColorStop(0.4, rgba(col, alpha * 0.4))
      grad.addColorStop(1,   rgba(col, 0))
      ctx.beginPath()
      ctx.arc(x, y, GLOW_RADIUS * r, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()
    }

    function drawCore(x, y, r, col, alpha) {
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fillStyle = rgba(col, alpha)
      ctx.fill()
    }

    function drawTrail(trail, col) {
      if (trail.length < 2) return
      for (let i = 1; i < trail.length; i++) {
        const a = (i / trail.length) * 0.25
        ctx.beginPath()
        ctx.moveTo(trail[i-1].x, trail[i-1].y)
        ctx.lineTo(trail[i].x, trail[i].y)
        ctx.strokeStyle = rgba(col, a)
        ctx.lineWidth = 0.8
        ctx.stroke()
      }
    }

    // ── Main loop ────────────────────────────────────────
    function draw() {
      if (!running) return

      // Fade trail instead of full clear — gives motion blur feel
      ctx.fillStyle = "rgba(8,6,4,0.18)"
      ctx.fillRect(0, 0, W, H)

      // ── Connection lines (desktop only) ─────────────
      if (CONN_DIST > 0) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const dist = Math.sqrt(dx*dx + dy*dy)
            if (dist < CONN_DIST) {
              const a = (1 - dist / CONN_DIST) * 0.12
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.strokeStyle = `rgba(201,164,74,${a})`
              ctx.lineWidth = 0.6
              ctx.stroke()
            }
          }
        }
      }

      // ── Particles ───────────────────────────────────
      particles.forEach((p, idx) => {
        // Update position
        p.x += p.vx + Math.sin(p.a * 0.7) * 0.18  // gentle wobble
        p.y += p.vy
        p.a += p.da
        p.life += 0.004

        // Trail
        p.trail.push({ x: p.x, y: p.y })
        if (p.trail.length > 10) p.trail.shift()

        // Wrap horizontal, respawn from bottom when off top
        if (p.x < -10) p.x = W + 10
        if (p.x > W + 10) p.x = -10
        if (p.y < -20) {
          particles[idx] = mkParticle(true)
          return
        }

        // Pulse alpha via sine on life phase
        const pulse = Math.sin(p.life * Math.PI * 2) * 0.35 + 0.65
        const alpha = Math.min(pulse, 1)

        drawTrail(p.trail, p.col)
        drawGlow(p.x, p.y, p.r, p.col, alpha * 0.55)
        drawCore(p.x, p.y, p.r, p.col, alpha)
      })

      raf = requestAnimationFrame(draw)
    }

    const t = setTimeout(() => draw(), 200)

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
