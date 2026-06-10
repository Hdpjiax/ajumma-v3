import { GALLERY } from "../data/content"

export default function Gallery() {
  const doubled = [...GALLERY, ...GALLERY]

  return (
    <section className="section gallery-sec" id="galeria">
      <div className="container">
        <p className="eyebrow red fade-up">AMBIENTE QUE ENAMORA</p>
        <h2 className="fade-up d1">La experiencia<br/><em>en imágenes</em></h2>
      </div>

      <div className="gallery-outer">
        <div className="gallery-track-wrap">
          <div className="gallery-track gallery-track--auto">
            {doubled.map((src, i) => (
              <div key={i} className="gall-card">
                <img
                  src={src}
                  alt={`Ajumma ${(i % GALLERY.length) + 1}`}
                  loading="lazy"
                />
                <div className="gall-shine"/>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{textAlign:"center", marginTop:"2.5rem"}}>
        <a
          href="https://www.instagram.com/ajummaoficial"
          target="_blank" rel="noreferrer"
          className="btn btn-outline-light fade-up"
        >
          📸 @ajummaoficial — Ver más en Instagram
        </a>
      </div>
    </section>
  )
}