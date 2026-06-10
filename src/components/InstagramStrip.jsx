
import { GALLERY } from "../data/content"

export default function InstagramStrip() {
  return (
    <section className="insta">
      <div className="container insta-head fade-up">
        <p className="eyebrow red">SÍGUENOS EN INSTAGRAM</p>
        <h2 className="insta-handle"><em>@ajummaoficial</em></h2>
      </div>
      <div className="insta-grid">
        {GALLERY.slice(0,10).map((src,i) => (
          <a key={i} href="https://www.instagram.com/ajummaoficial" target="_blank" rel="noreferrer" className="insta-item fade-up" style={{"--d":`${i*0.04}s`}}>
            <img src={src} alt={`ig ${i+1}`} loading="lazy"/>
            <div className="insta-hover"><span>❤</span></div>
          </a>
        ))}
      </div>
    </section>
  )
}
