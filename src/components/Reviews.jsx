
import { useState } from "react"
import { REVIEWS } from "../data/content"

export default function Reviews() {
  const [idx, setIdx] = useState(0)
  const prev = () => setIdx(i => (i-1+REVIEWS.length)%REVIEWS.length)
  const next = () => setIdx(i => (i+1)%REVIEWS.length)
  return (
    <section className="section reviews" id="opiniones">
      <div className="container reviews-grid">
        <div className="rev-left fade-up">
          <p className="eyebrow red">LO QUE DICEN</p>
          <h2>Experiencias <em>reales</em></h2>
          <div className="rating">
            <span className="rat-num">3.9</span>
            <div><div className="rat-stars">★★★★<span style={{opacity:.3}}>★</span></div><p>59 opiniones en Google</p></div>
          </div>
          <div className="rev-cards">
            {REVIEWS.map((r,i) => (
              <div key={r.name} className={`rev-card ${i===idx?"active":""}`} onClick={()=>setIdx(i)}>
                <div className="rev-head">
                  <span className="rev-av">{r.name[0]}</span>
                  <div><strong>{r.name}</strong><span className="rev-stars">{"★".repeat(r.stars)}</span></div>
                </div>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
          <div className="rev-nav"><button onClick={prev}>‹</button><button onClick={next}>›</button></div>
          <a href="https://maps.app.goo.gl/FHCSja6k65tKHZLUA" target="_blank" rel="noreferrer" className="btn-link">Ver todas en Google →</a>
        </div>
        <div className="rev-right fade-up d2">
          <img src="/imgs/food-cocktail.webp" alt="Ajumma" className="rev-img"/>
          <div className="rev-badge">
            <span>🔥</span>
            <div><strong>Viernes de Buffet</strong><p>Come todo lo que quieras</p></div>
          </div>
        </div>
      </div>
    </section>
  )
}
