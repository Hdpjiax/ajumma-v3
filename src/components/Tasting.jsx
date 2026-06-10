
import { TASTING } from "../data/content"

export default function Tasting() {
  return (
    <section className="tasting" id="degustacion">
      <div className="tasting-photo parallax" style={{backgroundImage:"url('/imgs/food-nigiri.webp')"}}/>
      <div className="tasting-overlay"/>
      <div className="container tasting-body">
        <div className="tast-left fade-up">
          <p className="eyebrow gold">EXPERIENCIA COMPLETA</p>
          <h2 style={{color:"#fff"}}>Menú<br/><em style={{color:"var(--gold)"}}>Degustación</em></h2>
          <p className="tast-copy">
            Un viaje de 7 tiempos por los sabores más icónicos de Corea.
            Perfecto para parejas y celebraciones especiales.
          </p>
          <div className="tast-price">
            <span>Desde</span>
            <strong>$480</strong>
            <small>por persona · bebidas no incluidas</small>
          </div>
          <a href="#reserva" className="btn btn-gold">Reservar Degustación</a>
        </div>
        <div className="tast-steps fade-up d2">
          {TASTING.map((t,i) => (
            <div key={t.step} className="tast-step" style={{"--d":`${i*0.07}s`}}>
              <span className="step-num">{t.step}</span>
              <div>
                <strong>{t.name}</strong>
                <p>{t.dish}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
