
import { BENEFITS } from "../data/content"

export default function Experience() {
  return (
    <section className="section experience" id="experiencia">
      <div className="container">
        <div className="exp-grid">
          <div className="exp-text">
            <p className="eyebrow red fade-up">EXPERIENCIA AJUMMA</p>
            <h2 className="fade-up d1">
              Más que un restaurante,<br/>es una <em>experiencia.</em>
            </h2>
            <p className="exp-copy fade-up d2">
              Cada visita a Ajumma es un viaje sensorial: aromas de parrilla, texturas auténticas
              y una presentación que merece fotografiarse. Bienvenido a Corea en Morelia.
            </p>
            <a href="#menu" className="btn-link fade-up d3">CONOCE MÁS →</a>
          </div>
          <div className="exp-img-col fade-up d2">
            <img src="/imgs/food-tacos.webp" alt="Ajumma experiencia" className="exp-img"/>
          </div>
        </div>
        <div className="benefits fade-up d3">
          {BENEFITS.map(b => (
            <article key={b.title} className="benefit-card">
              <span className="b-icon">{b.icon}</span>
              <strong>{b.title}</strong>
              <p>{b.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
