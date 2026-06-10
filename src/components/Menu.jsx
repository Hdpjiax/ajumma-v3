
import { useState } from "react"
import { MENU } from "../data/content"

const CATS = ["Todos","Buffet","Entradas","Fuertes","Sushi","Bebidas"]

export default function Menu() {
  const [cat, setCat] = useState("Todos")
  const items = cat === "Todos" ? MENU : MENU.filter(m => m.cat === cat)

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
            <button key={c} className={`tab ${cat===c?"active":""}`} onClick={()=>setCat(c)}>{c}</button>
          ))}
        </div>
        <div className="menu-grid">
          {items.map((item, i) => (
            <article key={item.name} className="menu-card fade-up" style={{"--d":`${(i%5)*0.07}s`}}>
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
