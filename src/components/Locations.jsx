export default function Locations() {
  const locs = [
    {
      name: "Altozano",
      addr: "Blvrd Juan Pablo II 1735, Morelia, Mich.",
      note: "Atrás de Dairy Queen",
      hours: "1:00 PM – 11:00 PM todos los días",
      phone: "443 386 2070",
      maps: "https://maps.app.goo.gl/FHCSja6k65tKHZLUA"
    },
    {
      name: "Las Camelinas",
      addr: "Plaza Xentric Las Camelinas, Morelia, Mich.",
      note: "Nueva sucursal",
      hours: "1:00 PM – 11:00 PM todos los días",
      phone: "443 857 2129",
      maps: "https://maps.app.goo.gl/FHCSja6k65tKHZLUA"
    },
  ]

  /* Embed real de Ajumma Altozano — Blvrd Juan Pablo II 1735, Morelia */
  const MAP_SRC =
    "https://maps.google.com/maps" +
    "?q=Ajumma+Altozano+Av+Juan+Pablo+II+1957-A+Morelia+Michoacan+Mexico" +
    "&t=&z=17&ie=UTF8&iwloc=B&output=embed"

  return (
    <section className="section locations" id="ubicacion">
      <div className="container">
        <p className="eyebrow red fade-up">VISÍTANOS</p>
        <h2 className="fade-up d1">Te esperamos<br />en <em>Morelia</em></h2>
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
              title="Ajumma Altozano Morelia"
              src={MAP_SRC}
              width="100%"
              height="460"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
