import { useState, useEffect, useRef } from "react"
import { MENU } from "../data/content"

const CATS = ["Todos","Buffet","Entradas","Fuertes","Sushi","Bebidas"]

export default function Menu() {
  const [cat, setCat] = useState("Todos")
  const gridRef = useRef(null)

  const items = cat === "Todos" ? MENU : MENU.filter(m => m.cat === cat)

  // Re-observar las cards cada vez que cambia la categoria
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    // Resetear todas las cards a estado invisible
    const cards = grid.querySelectorAll(".menu-card")
    cards.forEach(card => card.classList.remove("visible"))

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("visible")
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    // Pequeño delay para que el DOM se actualice antes de observar
    const t = setTimeout(() => {
      cards.forEach(card => obs.observe(card))
    }, 30)

    return () => {
      clearTimeout(t)
      obs.disconnect()
    }
  }, [cat])

  return (
    <section className="section menu-sec" id="menu">
      <div className="container">
        <p className="eyebrow red fade-up">LO MÁS PEDIDO</p>
        <div className="menu-top fade-up d1">
          <h2>Nuestros <em>favoritos</em></h2>
          <a href="#reserva" className="btn-link">VER MENÚ COMPLETO →</a>
        </div>
        <div className="menu-tabs fade-up d2">
          {CATS.map(c => (
            <button key={c} className={`tab ${cat===c?"active":""}`} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
        <div className="menu-grid" ref={gridRef}>
          {items.map((item, i) => (
            <article
              key={`${cat}-${item.name}`}
              className="menu-card fade-up"
              style={{"--d": `${(i % 5) * 0.07}s`}}
            >
              <div className="mc-img">
                <img src={item.img} alt={item.name} loading="lazy"/>
                <span className="mc-cat">{item.cat}</span>
                <button className="mc-add" aria-label="Agregar">+</button>
              </div>
              <div className="mc-body">
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <strong>{item.price} MXN</strong>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
