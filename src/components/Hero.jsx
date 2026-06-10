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

    const COUNT     = mobile ? 18 : 38
    const CONN_DIST = mobile ? 0  : 130
    const GLOW_R    = mobile ? 5  : 12

    const COLORS = [
      [201, 164,  74],
      [201, 164,  74],
      [220, 130,  40],
      [192,  57,  43],
      [255, 200, 100],
    ]

    function mkParticle(fromBottom = false) {
      const col = COLORS[Math.floor(Math.random() * COLORS.length)]
      return {
        x:    Math.random() * W,
        y:    fromBottom ? H + 10 : Math.random() * H,
        r:    Math.random() * (mobile ? 1.5 : 2.2) + 0.5,
        vx:   (Math.random() - 0.5) * (mobile ? 0.28 : 0.45),
        vy:   -(Math.random() * 0.55 + 0.18),
        a:    Math.random() * Math.PI * 2,
        da:   (Math.random() * 0.007 + 0.003) * (Math.random() < 0.5 ? 1 : -1),
        life: Math.random(),
        col,
        trail: [],
      }
    }

    let particles = Array.from({ length: COUNT }, () => mkParticle())

    function rgba([r,g,b], a) { return `rgba(${r},${g},${b},${a.toFixed(3)})` }

    function drawGlow(x, y, r, col, alpha) {
      const grad = ctx.createRadialGradient(x, y, 0, x, y, GLOW_R * r)
      grad.addColorStop(0,   rgba(col, alpha * 0.85))
      grad.addColorStop(0.4, rgba(col, alpha * 0.35))
      grad.addColorStop(1,   rgba(col, 0))
      ctx.beginPath()
      ctx.arc(x, y, GLOW_R * r, 0, Math.PI * 2)
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
        const a = (i / trail.length) * 0.22
        ctx.beginPath()
        ctx.moveTo(trail[i-1].x, trail[i-1].y)
        ctx.lineTo(trail[i].x,   trail[i].y)
        ctx.strokeStyle = rgba(col, a)
        ctx.lineWidth = 0.7
        ctx.stroke()
      }
    }

    function draw() {
      if (!running) return

      // CLEAR completamente — el canvas es transparente, la imagen se ve debajo
      ctx.clearRect(0, 0, W, H)

      // Líneas de conexión (desktop)
      if (CONN_DIST > 0) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const dist = Math.sqrt(dx*dx + dy*dy)
            if (dist < CONN_DIST) {
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.strokeStyle = `rgba(201,164,74,${((1 - dist / CONN_DIST) * 0.1).toFixed(3)})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      }

      // Partículas
      particles.forEach((p, idx) => {
        p.x += p.vx + Math.sin(p.a * 0.7) * 0.15
        p.y += p.vy
        p.a += p.da
        p.life += 0.004

        p.trail.push({ x: p.x, y: p.y })
        if (p.trail.length > 8) p.trail.shift()

        if (p.x < -10) p.x = W + 10
        if (p.x > W + 10) p.x = -10
        if (p.y < -20) {
          particles[idx] = mkParticle(true)
          return
        }

        const pulse = Math.sin(p.life * Math.PI * 2) * 0.3 + 0.7
        const alpha = Math.min(pulse, 1)

        drawTrail(p.trail, p.col)
        drawGlow(p.x, p.y, p.r, p.col, alpha * 0.5)
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
