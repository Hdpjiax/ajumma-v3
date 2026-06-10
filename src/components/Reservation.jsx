import { useState } from "react"

const WA_NUMBER    = "524433862070"
const CALENDLY_URL = "https://calendly.com/garia350/new-meeting"

const MONTHS_ES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio",
                   "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
const DAYS_ES   = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"]
const HOURS     = ["13:00","13:30","14:00","14:30","15:00","15:30",
                   "16:00","16:30","17:00","17:30","18:00","18:30",
                   "19:00","19:30","20:00","20:30","21:00","21:30",
                   "22:00","22:30"]

function buildWAMessage(d) {
  return encodeURIComponent(
`🍽️ *Nueva Reserva — AJUMMA*

👤 Nombre: ${d.name}
📱 WhatsApp: ${d.phone}
📅 Fecha: ${d.dateLabel}
⏰ Hora: ${d.time}
👥 Personas: ${d.people}
📍 Sucursal: ${d.branch}
📝 Notas: ${d.notes || "Sin notas"}`)
}

function buildCalendlyURL(d) {
  const p = new URLSearchParams({
    name:  d.name,
    email: d.email,
    a1:    d.branch,
    a2:    `${d.people} persona(s)`,
    a3:    d.notes || "",
  })
  return `${CALENDLY_URL}?${p.toString()}`
}

// ─── Mini Calendar Component ───────────────────────────
function MiniCalendar({ selected, onSelect }) {
  const today = new Date()
  today.setHours(0,0,0,0)
  const [view, setView] = useState(() => {
    const d = selected || today
    return { year: d.getFullYear(), month: d.getMonth() }
  })

  const firstDay  = new Date(view.year, view.month, 1).getDay()
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate()

  const prev = () => {
    setView(v => {
      const m = v.month === 0 ? 11 : v.month - 1
      const y = v.month === 0 ? v.year - 1 : v.year
      return { year: y, month: m }
    })
  }
  const next = () => {
    setView(v => {
      const m = v.month === 11 ? 0 : v.month + 1
      const y = v.month === 11 ? v.year + 1 : v.year
      return { year: y, month: m }
    })
  }

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const isSel = (d) => selected &&
    selected.getFullYear() === view.year &&
    selected.getMonth()    === view.month &&
    selected.getDate()     === d

  const isPast = (d) => new Date(view.year, view.month, d) < today

  return (
    <div className="mc-cal">
      <div className="mc-cal-head">
        <button className="mc-nav" onClick={prev} aria-label="Mes anterior">‹</button>
        <span className="mc-month">{MONTHS_ES[view.month]} {view.year}</span>
        <button className="mc-nav" onClick={next} aria-label="Mes siguiente">›</button>
      </div>
      <div className="mc-days-header">
        {DAYS_ES.map(d => <span key={d}>{d}</span>)}
      </div>
      <div className="mc-grid">
        {cells.map((d, i) =>
          d === null ? (
            <span key={`e-${i}`} />
          ) : (
            <button
              key={d}
              className={`mc-day ${ isSel(d) ? "sel" : "" } ${ isPast(d) ? "past" : "" }`}
              onClick={() => !isPast(d) && onSelect(new Date(view.year, view.month, d))}
              disabled={isPast(d)}
              type="button"
            >
              {d}
            </button>
          )
        )}
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────
const EMPTY_FORM = { name:"", phone:"", people:"2", branch:"Altozano", notes:"" }
const EMPTY_CAL  = { name:"", email:"", people:"2", branch:"Altozano", notes:"" }

export default function Reservation() {
  const [tab,     setTab]     = useState("form")
  const [form,    setForm]    = useState(EMPTY_FORM)
  const [cal,     setCal]     = useState(EMPTY_CAL)
  const [selDate, setSelDate] = useState(null)
  const [selTime, setSelTime] = useState("")
  const [sent,    setSent]    = useState(false)
  const [calSent, setCalSent] = useState(false)

  const upForm = (k,v) => setForm(f => ({...f,[k]:v}))
  const upCal  = (k,v) => setCal(c  => ({...c,[k]:v}))

  const dateLabel = selDate
    ? `${selDate.getDate()} de ${MONTHS_ES[selDate.getMonth()]} ${selDate.getFullYear()}`
    : ""

  const submitWA = (e) => {
    e.preventDefault()
    if (!selDate || !selTime) { alert("Selecciona fecha y hora"); return }
    window.open(`https://wa.me/${WA_NUMBER}?text=${buildWAMessage({...form, dateLabel, time: selTime})}`, "_blank")
    setSent(true)
  }

  const submitCal = (e) => {
    e.preventDefault()
    if (!selDate || !selTime) { alert("Selecciona fecha y hora"); return }
    window.open(buildCalendlyURL({...cal, dateLabel, time: selTime}), "_blank")
    setCalSent(true)
  }

  const resetWA  = () => { setSent(false);    setForm(EMPTY_FORM); setSelDate(null); setSelTime("") }
  const resetCal = () => { setCalSent(false); setCal(EMPTY_CAL);   setSelDate(null); setSelTime("") }

  const formBlock = (onSubmit, data, update, isSent, onReset, extraField) => (
    isSent ? (
      <div className="form-ok">
        <span>{tab === "form" ? "✅" : "📅"}</span>
        <h3>{tab === "form" ? "¡Reserva enviada por WhatsApp!" : "¡Se abrió el calendario!"}</h3>
        <p style={{marginBottom:"1.2rem"}}>
          {tab === "form"
            ? "Revisa tu WhatsApp. Confirmamos en menos de 30 minutos."
            : "Selecciona la hora en Calendly. Te confirmaremos por correo."}
        </p>
        <div style={{display:"flex",gap:".8rem",flexWrap:"wrap",justifyContent:"center"}}>
          {tab === "calendly" && (
            <button className="btn btn-red" onClick={() => window.open(buildCalendlyURL({...cal,dateLabel,time:selTime}),"_blank")}>
              Abrir de nuevo →
            </button>
          )}
          <button className="btn btn-outline-light" onClick={onReset}>Nueva reserva</button>
        </div>
      </div>
    ) : (
      <form className="res-form" onSubmit={onSubmit}>
        {/* Calendario */}
        <div className="mc-section">
          <label className="mc-label">📅 Selecciona tu fecha</label>
          <MiniCalendar selected={selDate} onSelect={setSelDate} />
          {selDate && (
            <p className="mc-selected-label">
              Fecha elegida: <strong>{dateLabel}</strong>
            </p>
          )}
        </div>

        {/* Horarios */}
        {selDate && (
          <div className="mc-section">
            <label className="mc-label">⏰ Selecciona tu hora</label>
            <div className="time-grid">
              {HOURS.map(h => (
                <button
                  key={h} type="button"
                  className={`time-slot ${selTime === h ? "sel" : ""}`}
                  onClick={() => setSelTime(h)}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Datos personales */}
        {selDate && selTime && (
          <>
            <div className="form-row">
              <div className="field">
                <label>Nombre completo</label>
                <input type="text" placeholder="Tu nombre" required
                  value={data.name} onChange={e=>update("name",e.target.value)}/>
              </div>
              {extraField}
            </div>
            <div className="form-row">
              <div className="field">
                <label>Personas</label>
                <select value={data.people} onChange={e=>update("people",e.target.value)}>
                  {[1,2,3,4,5,6,7,8].map(n=><option key={n}>{n}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Sucursal</label>
                <select value={data.branch} onChange={e=>update("branch",e.target.value)}>
                  <option>Altozano</option>
                  <option>Las Camelinas</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label>Ocasión / notas / alergias</label>
              <textarea rows={2} placeholder="Cumpleaños, aniversario, alergia..."
                value={data.notes} onChange={e=>update("notes",e.target.value)}/>
            </div>

            {/* Resumen */}
            <div className="res-summary">
              <span>📅 {dateLabel}</span>
              <span>⏰ {selTime}</span>
              <span>👥 {data.people} personas</span>
              <span>📍 {data.branch}</span>
            </div>

            <button type="submit" className="btn btn-red btn-full">
              {tab === "form" ? "Enviar por WhatsApp 💬" : "Continuar en nuestro Calendario 📅"}
            </button>
            <p className="form-hint">
              {tab === "form"
                ? "Se abrirá WhatsApp con tu reserva lista para enviar."
                : "Abriremos el calendario con tus datos pre-llenados."}
            </p>
          </>
        )}
      </form>
    )
  )

  return (
    <section className="section reservation" id="reserva">
      <div className="container">
        <p className="eyebrow red fade-up">RESERVACIONES</p>
        <div className="res-top fade-up d1">
          <h2>Agenda tu <em>experiencia</em></h2>
          <p className="res-intro">Elige fecha, hora y método. Confirmamos en menos de 30 min.</p>
        </div>

        <div className="res-tabs fade-up d2">
          <button className={`res-tab ${tab==="form"?"active":""}`}
            onClick={()=>{setTab("form"); setSent(false); setSelDate(null); setSelTime("")}}>
            💬 WhatsApp
          </button>
          <button className={`res-tab ${tab==="calendly"?"active":""}`}
            onClick={()=>{setTab("calendly"); setCalSent(false); setSelDate(null); setSelTime("")}}>
            📅 Agenda tu reserva
          </button>
        </div>

        <div className="res-grid">
          {/* COLUMNA DERECHA — formulario */}
          <div className="res-right">
            {tab === "form"
              ? formBlock(
                  submitWA, form, upForm, sent, resetWA,
                  <div className="field">
                    <label>WhatsApp</label>
                    <input type="tel" placeholder="443 000 0000" required
                      value={form.phone} onChange={e=>upForm("phone",e.target.value)}/>
                  </div>
                )
              : formBlock(
                  submitCal, cal, upCal, calSent, resetCal,
                  <div className="field">
                    <label>Correo electrónico</label>
                    <input type="email" placeholder="tu@correo.com" required
                      value={cal.email} onChange={e=>upCal("email",e.target.value)}/>
                  </div>
                )
            }
          </div>

          {/* COLUMNA IZQUIERDA — info */}
          <div className="res-left">
            <div className="res-badge">
              <span>🔥</span>
              <div>
                <strong>Buffet Viernes</strong>
                <p>$349 por persona · Come todo lo que quieras</p>
              </div>
            </div>
            <div className="res-contact">
              <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer" className="btn btn-red">
                💬 WhatsApp directo
              </a>
              <a href="tel:4433862070" className="btn btn-outline-light">📞 443 386 2070</a>
            </div>
            <div className="res-hours">
              <h4>⏰ Horarios</h4>
              <p>Lunes – Domingo: 1:00 PM – 11:00 PM</p>
              <h4 style={{marginTop:"1rem"}}>📍 Sucursales</h4>
              <p>Altozano · Las Camelinas</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
