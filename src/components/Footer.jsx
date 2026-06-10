
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="f-brand">
          <div className="nav-logo footer-logo">
            <span className="logo-kr">아주마</span>
            <div><span className="logo-en">AJUMMA</span><span className="logo-sub">KOREAN BBQ &amp; SHOP</span></div>
          </div>
          <p>Restaurante asiático que combina lo mejor de la cocina coreana, japonesa y sabores únicos en Morelia.</p>
        </div>
        {[
          { h:"NAVEGACIÓN", links:[["Inicio","#hero"],["Menú","#menu"],["Experiencia","#experiencia"],["Galería","#galeria"],["Reservas","#reserva"]] },
          { h:"INFORMACIÓN", links:[["Eventos","#reserva"],["Promociones","#menu"],["Reservaciones","#reserva"],["Políticas","#"]] },
        ].map(col => (
          <div key={col.h} className="f-col">
            <h4>{col.h}</h4>
            <ul>{col.links.map(([l,h])=><li key={l}><a href={h}>{l}</a></li>)}</ul>
          </div>
        ))}
        <div className="f-col">
          <h4>HORARIOS</h4>
          <p>Lunes a Domingo<br/>1:00 PM – 11:00 PM</p>
          <h4 style={{marginTop:"1.2rem"}}>SÍGUENOS</h4>
          <div className="f-social">
            <a href="https://www.instagram.com/ajummaoficial" target="_blank" rel="noreferrer">📷</a>
            <a href="https://www.facebook.com/Ajummamorelia" target="_blank" rel="noreferrer">📘</a>
            <a href="#" aria-label="TikTok">🎵</a>
          </div>
        </div>
        <div className="f-col">
          <h4>RECIBE PROMOCIONES</h4>
          <p>Déjanos tu correo y recibe ofertas exclusivas.</p>
          <div className="email-row">
            <input type="email" placeholder="Tu correo electrónico"/>
            <button className="btn btn-red btn-sm">→</button>
          </div>
        </div>
      </div>
      <div className="footer-bar">
        <p>© 2025 AJUMMA Korean BBQ &amp; Sushi. Todos los derechos reservados.</p>
        <div><a href="#">Privacidad</a><a href="#">Términos</a></div>
      </div>
    </footer>
  )
}
