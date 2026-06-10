import { useState, useEffect, useRef } from "react"

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

export default function Reservation() {
  const [tab, setTab]   = useState("form")
  const [form, setForm] = useState({ name:"", phone:"", date:"", time:"", people:"2", branch:"Altozano", notes:"" })
  const [sent, setSent] = useState(false)
  const inlineRef = useRef(null)

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    window.open(`https://wa.me/${WA_NUMBER}?text=${buildWAMessage(form)}`, "_blank")
    setSent(true)
  }

  // Cuando el tab cambia a "calendly", inicializar el widget inline
  useEffect(() => {
    if (tab !== "calendly") return
    if (!inlineRef.current) return

    // Limpiar contenido previo
    inlineRef.current.innerHTML = ""

    const tryInit = (attempts = 0) => {
      if (window.Calendly) {
        window.Calendly.initInlineWidget({
          url: CALENDLY_URL,
          parentElement: inlineRef.current,
          prefill: {},
          utm: {},
        })
      } else if (attempts < 20) {
        // SDK aún no cargó — reintentar hasta 2 segundos
        setTimeout(() => tryInit(attempts + 1), 100)
      } else {
        // Fallback: mostrar botón de nueva pestaña
        if (inlineRef.current) {
          inlineRef.current.innerHTML = `
            <div style="text-align:center;padding:2rem">
              <p style="color:#a89880;margin-bottom:1rem">No se pudo cargar el calendario automáticamente.</p>
              <a href="${CALENDLY_URL}" target="_blank" rel="noreferrer"
                 style="display:inline-flex;align-items:center;gap:.5rem;padding:.85rem 1.6rem;
                        background:#c0392b;color:#fff;border-radius:999px;font-weight:700;text-decoration:none">
                📅 Abrir Calendly →
              </a>
            </div>`
        }
      }
    }

    tryInit()
  }, [tab])

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
          <button className={`res-tab ${tab==="calendly"?"active":""}`} onClick={()=>setTab("calendly")}>
            📅 Calendly
          </button>
        </div>

        {tab === "form" ? (
          <div className="res-grid d3">
            <div className="res-right">
              {sent ? (
                <div className="form-ok">
                  <span>✅</span>
                  <h3>¡Mensaje enviado a WhatsApp!</h3>
                  <p>Revisa tu app de WhatsApp. Confirmamos en menos de 30 minutos.</p>
                  <button className="btn btn-red" style={{marginTop:"1rem"}} onClick={()=>setSent(false)}>Nueva reserva</button>
                </div>
              ) : (
                <form className="res-form" onSubmit={submit}>
                  <div className="form-row">
                    <div className="field"><label>Nombre completo</label>
                      <input type="text" placeholder="Tu nombre" required value={form.name} onChange={e=>update("name",e.target.value)}/>
                    </div>
                    <div className="field"><label>WhatsApp</label>
                      <input type="tel" placeholder="443 000 0000" required value={form.phone} onChange={e=>update("phone",e.target.value)}/>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="field"><label>Fecha</label>
                      <input type="date" required value={form.date} onChange={e=>update("date",e.target.value)}/>
                    </div>
                    <div className="field"><label>Hora</label>
                      <input type="time" required value={form.time} onChange={e=>update("time",e.target.value)}/>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="field"><label>Personas</label>
                      <select value={form.people} onChange={e=>update("people",e.target.value)}>
                        {[1,2,3,4,5,6,7,8].map(n=><option key={n}>{n}</option>)}
                      </select>
                    </div>
                    <div className="field"><label>Sucursal</label>
                      <select value={form.branch} onChange={e=>update("branch",e.target.value)}>
                        <option>Altozano</option>
                        <option>Las Camelinas</option>
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label>Ocasión especial / notas / alergias</label>
                    <textarea rows={3} placeholder="Cumpleaños, aniversario, alergia al mariscos..." value={form.notes} onChange={e=>update("notes",e.target.value)}/>
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
        ) : (
          /* ─── CALENDLY TAB ────────────────────────────── */
          <div className="calendly-section d3">
            {/* Widget inline — se inicializa al cambiar al tab */}
            <div className="calendly-wrap-dark">
              <div
                ref={inlineRef}
                className="calendly-inline-container"
              />
              <p className="calendly-note">
                ¿Problemas? <a href={CALENDLY_URL} target="_blank" rel="noreferrer">Abre Calendly directamente →</a>
              </p>
            </div>

            <div className="calendly-info-row">
              <div className="res-badge">
                <span>🔥</span>
                <div><strong>Buffet Viernes</strong><p>$349 por persona · Come todo lo que quieras</p></div>
              </div>
              <div className="res-contact-row">
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
