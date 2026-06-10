export default function Locations() {
  const locs = [
    {
      name:   "Altozano",
      addr:   "Blvrd Juan Pablo II 1735, Morelia, Mich.",
      note:   "Atrás de Dairy Queen",
      hours:  "1:00 PM – 11:00 PM todos los días",
      phone:  "443 386 2070",
      maps:   "https://maps.app.goo.gl/FHCSja6k65tKHZLUA"
    },
    {
      name:   "Las Camelinas",
      addr:   "Plaza Xentric Las Camelinas, Morelia, Mich.",
      note:   "Nueva sucursal",
      hours:  "1:00 PM – 11:00 PM todos los días",
      phone:  "443 857 2129",
      maps:   "https://maps.app.goo.gl/FHCSja6k65tKHZLUA"
    },
  ]

  /* Embed real de Ajumma Altozano — Blvrd Juan Pablo II 1735, Morelia */
  const MAP_EMBED =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3756.536!2d-101.19516!3d19.68993!"
    + "2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842d0ddc57adb0b5%3A0x5c0e62d2a5d23d0b!"
    + "2sAjumma%20Altozano!5e0!3m2!1ses-419!2smx!4v1"

  return (
    <section className="section locations" id="ubicacion">
      <div className="container">
        <p className="eyebrow red fade-up">VISÍTANOS</p>
        <h2 className="fade-up d1">Te esperamos<br/>en <em>Morelia</em></h2>
        <div className="loc-grid">
          <div className="loc-cards fade-up d2">
            {locs.map(l => (
              <div key={l.name} className="loc-card">
                <h3>Ajumma {l.name}</h3>
                <div className="loc-row"><span>📍</span><p>{l.addr} <small>{l.note}</small></p></div>
                <div className="loc-row"><span>⏰</span><p>{l.hours}</p></div>
                <div className="loc-row"><span>📞</span><p>{l.phone}</p></div>
                <a href={l.maps} target="_blank" rel="noreferrer" className="btn btn-red btn-sm">
                  CÓMO LLEGAR 🗺
                </a>
              </div>
            ))}
          </div>

          <div className="loc-map fade-up d3">
            <iframe
              title="Ajumma Altozano — Blvrd Juan Pablo II 1735 Morelia"
              src={MAP_EMBED}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
