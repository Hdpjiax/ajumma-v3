export default function Locations() {
  const locs = [
    { name:"Altozano",    addr:"Av. Juan Pablo II 1957-A, Altozano, Morelia, Mich.", note:"Plaza GEA - Atras de Dairy Queen", hours:"1:00 PM - 11:00 PM todos los dias", phone:"443 386 2070", maps:"https://maps.app.goo.gl/FHCSja6k65tKHZLUA" },
    { name:"Las Camelinas", addr:"Plaza Xentric Las Camelinas, Morelia, Mich.",         note:"Nueva sucursal",                  hours:"1:00 PM - 11:00 PM todos los dias", phone:"443 857 2129", maps:"https://maps.app.goo.gl/FHCSja6k65tKHZLUA" },
  ]

  // Coordenadas exactas Ajumma Altozano - solo pin, sin rutas
  const MAP_SRC = "https://maps.google.com/maps?q=19.6878,-101.2048&z=17&output=embed"

  return (
    <section className="section locations" id="ubicacion">
      <div className="container">
        <p className="eyebrow red fade-up">VISITANOS</p>
        <h2 className="fade-up d1">Te esperamos<br/>en <em>Morelia</em></h2>
        <div className="loc-grid">

          <div className="loc-cards fade-up d2">
            {locs.map(l => (
              <div key={l.name} className="loc-card">
                <h3>Ajumma {l.name}</h3>
                <div className="loc-row"><span>&#x1F4CD;</span><p>{l.addr} <small>{l.note}</small></p></div>
                <div className="loc-row"><span>&#x23F0;</span><p>{l.hours}</p></div>
                <div className="loc-row"><span>&#x1F4DE;</span><p>{l.phone}</p></div>
                <a href={l.maps} target="_blank" rel="noreferrer" className="btn btn-red btn-sm">COMO LLEGAR &#x1F5FA;</a>
              </div>
            ))}
          </div>

          <div className="loc-map fade-up d3">
            <div className="map-inner">
              <iframe
                title="Ajumma Altozano Morelia"
                src={MAP_SRC}
                allowFullScreen
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="map-overlay">
                <div className="map-badge">
                  <span className="map-dot" />
                  <div>
                    <strong>Ajumma Altozano</strong>
                    <p>Av. Juan Pablo II 1957-A, Morelia</p>
                  </div>
                  <a href="https://maps.app.goo.gl/FHCSja6k65tKHZLUA" target="_blank" rel="noreferrer" className="btn btn-red btn-sm">Abrir &#x1F5FA;</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
