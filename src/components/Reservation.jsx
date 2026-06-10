import { useState } from "react"

const WA_NUMBER    = "524433862070"
const CALENDLY_URL = "https://calendly.com/garia350/new-meeting"

function buildWAMessage(data) {
  return encodeURIComponent(
`🍽️ *Nueva Reserva — AJUMMA*

👤 Nombre: ${data.name}
📱 WhatsApp: ${data.phone}
📅 Fecha: ${data.date}
⏰ Hora: ${data.time}
👥 Personas: ${data.people}
📍 Sucursal: ${data.branch}
📝 Notas: ${data.notes || "Sin notas"}`
  )
}

function buildCalendlyURL(data) {
  const params = new URLSearchParams({
    name:  data.name  || "",
    email: data.email || "",
    a1:    data.branch,
    a2:    `${data.people} persona(s)`,
    a3:    data.notes || "",
  })
  return `${CALENDLY_URL}?${params.toString()}`
}

const EMPTY_CAL = { name:"", email:"", people:"2", branch:"Altozano", notes:"" }

export default function Reservation() {
  const [tab, setTab]   = useState("form")
  const [form, setForm] = useState({ name:"", phone:"", date:"", time:"", people:"2", branch:"Altozano", notes:"" })
  const [cal,  setCal]  = useState(EMPTY_CAL)
  const [sent, setSent] = useState(false)
  const [calSent, setCalSent] = useState(false)

  const upForm = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const upCal  = (k, v) => setCal(c  => ({ ...c, [k]: v }))

  const submitWA = (e) => {
    e.preventDefault()
    window.open(`https://wa.me/${WA_NUMBER}?text=${buildWAMessage(form)}`, "_blank")
    setSent(true)
  }

  const submitCal = (e) => {
    e.preventDefault()
    window.open(buildCalendlyURL(cal), "_blank")
    setCalSent(true)
  }

  return (
    <section className="section reservation" id="reserva">
      <div className="container">
        <p className="eyebrow red fade-up">RESERVACIONES</p>
        <div className="res-top fade-up d1">
          <h2>Reserva tu <em>experiencia</em></h2>
          <p className="res-intro">Elige el método que prefieras. Confirmamos en menos de 30 minutos.</p>
        </div>

        <div className="res-tabs fade-up d2">
          <button className={`res-tab ${tab==="form"?"active":""}`} onClick={()=>{setTab("form"); setSent(false)}}>
            💬 WhatsApp rápido
          </button>
          <button className={`res-tab ${tab==="calendly"?"active":""}`} onClick={()=>{setTab("calendly"); setCalSent(false)}}>
            📅 Reservar con Calendly
          </button>
        </div>

        {/* ─── TAB WHATSAPP ──────────────────────────────── */}
        {tab === "form" && (
          <div className="res-grid">
            <div className="res-right">
              {sent ? (
                <div className="form-ok">
                  <span>✅</span>
                  <h3>¡Mensaje enviado a WhatsApp!</h3>
                  <p>Revisa tu app. Confirmamos en menos de 30 minutos.</p>
                  <button className="btn btn-red" style={{marginTop:"1rem"}} onClick={()=>setSent(false)}>Nueva reserva</button>
                </div>
              ) : (
                <form className="res-form" onSubmit={submitWA}>
                  <div className="form-row">
                    <div className="field"><label>Nombre completo</label>
                      <input type="text" placeholder="Tu nombre" required value={form.name} onChange={e=>upForm("name",e.target.value)}/>
                    </div>
                    <div className="field"><label>WhatsApp</label>
                      <input type="tel" placeholder="443 000 0000" required value={form.phone} onChange={e=>upForm("phone",e.target.value)}/>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="field"><label>Fecha</label>
                      <input type="date" required value={form.date} onChange={e=>upForm("date",e.target.value)}/>
                    </div>
                    <div className="field"><label>Hora</label>
                      <input type="time" required value={form.time} onChange={e=>upForm("time",e.target.value)}/>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="field"><label>Personas</label>
                      <select value={form.people} onChange={e=>upForm("people",e.target.value)}>
                        {[1,2,3,4,5,6,7,8].map(n=><option key={n}>{n}</option>)}
                      </select>
                    </div>
                    <div className="field"><label>Sucursal</label>
                      <select value={form.branch} onChange={e=>upForm("branch",e.target.value)}>
                        <option>Altozano</option>
                        <option>Las Camelinas</option>
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label>Ocasión especial / notas / alergias</label>
                    <textarea rows={3} placeholder="Cumpleaños, aniversario, alergia al mariscos..." value={form.notes} onChange={e=>upForm("notes",e.target.value)}/>
                  </div>
                  <button type="submit" className="btn btn-red btn-full">Enviar por WhatsApp 💬</button>
                  <p className="form-hint">Se abrirá WhatsApp con todos los datos listos para enviar.</p>
                </form>
              )}
            </div>
            <div className="res-left">
              <div className="res-badge">
                <span>🔥</span>
                <div><strong>Buffet Viernes</strong><p>$349 por persona · Come todo lo que quieras</p></div>
              </div>
              <div className="res-contact">
                <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer" className="btn btn-red">💬 WhatsApp directo</a>
                <a href="tel:4433862070" className="btn btn-outline-light">📞 443 386 2070</a>
              </div>
              <div className="res-hours">
                <h4>⏰ Horarios</h4><p>Lunes – Domingo: 1:00 PM – 11:00 PM</p>
                <h4 style={{marginTop:"1rem"}}>📍 Sucursales</h4><p>Altozano · Las Camelinas</p>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB CALENDLY ────────────────────────────── */}
        {tab === "calendly" && (
          <div className="res-grid">
            <div className="res-right">
              {calSent ? (
                <div className="form-ok">
                  <span>📅</span>
                  <h3>¡Se abrió Calendly!</h3>
                  <p>Selecciona la hora en la pestaña que se abrió. Te confirmaremos por correo.</p>
                  <div style={{display:"flex",gap:"1rem",marginTop:"1rem",flexWrap:"wrap"}}>
                    <button className="btn btn-red" onClick={()=>{ window.open(buildCalendlyURL(cal),"_blank") }}>
                      Abrir de nuevo →
                    </button>
                    <button className="btn btn-outline-light" onClick={()=>setCalSent(false)}>
                      Modificar datos
                    </button>
                  </div>
                </div>
              ) : (
                <form className="res-form" onSubmit={submitCal}>
                  <div className="cal-form-header">
                    <span className="cal-form-icon">📅</span>
                    <div>
                      <h3>Agenda con Calendly</h3>
                      <p>Llena tus datos y te llevaremos directo al calendario para elegir tu hora.</p>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="field"><label>Nombre completo</label>
                      <input type="text" placeholder="Tu nombre" required value={cal.name} onChange={e=>upCal("name",e.target.value)}/>
                    </div>
                    <div className="field"><label>Correo electrónico</label>
                      <input type="email" placeholder="tu@correo.com" required value={cal.email} onChange={e=>upCal("email",e.target.value)}/>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="field"><label>Personas</label>
                      <select value={cal.people} onChange={e=>upCal("people",e.target.value)}>
                        {[1,2,3,4,5,6,7,8].map(n=><option key={n}>{n}</option>)}
                      </select>
                    </div>
                    <div className="field"><label>Sucursal</label>
                      <select value={cal.branch} onChange={e=>upCal("branch",e.target.value)}>
                        <option>Altozano</option>
                        <option>Las Camelinas</option>
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label>Ocasión especial / notas</label>
                    <textarea rows={2} placeholder="Cumpleaños, aniversario..." value={cal.notes} onChange={e=>upCal("notes",e.target.value)}/>
                  </div>
                  <button type="submit" className="btn btn-red btn-full">
                    Continuar a Calendly 📅
                  </button>
                  <p className="form-hint">Se abrirá Calendly con tus datos pre-llenados para elegir fecha y hora.</p>
                </form>
              )}
            </div>
            <div className="res-left">
              <div className="res-badge">
                <span>🔥</span>
                <div><strong>Buffet Viernes</strong><p>$349 por persona · Come todo lo que quieras</p></div>
              </div>
              <div className="res-contact">
                <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer" className="btn btn-red">💬 WhatsApp directo</a>
                <a href="tel:4433862070" className="btn btn-outline-light">📞 443 386 2070</a>
              </div>
              <div className="res-hours">
                <h4>⏰ Horarios</h4><p>Lunes – Domingo: 1:00 PM – 11:00 PM</p>
                <h4 style={{marginTop:"1rem"}}>📍 Sucursales</h4><p>Altozano · Las Camelinas</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
