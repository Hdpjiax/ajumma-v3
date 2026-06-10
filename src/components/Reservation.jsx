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

function pad(n) { return String(n).padStart(2,"0") }

function buildWAMessage(d) {
  return encodeURIComponent(
`🍽️ *Nueva Reserva — AJUMMA*

👤 Nombre: ${d.name}
📱 WhatsApp: ${d.phone}
📅 Fecha: ${d.date}
⏰ Hora: ${d.time}
👥 Personas: ${d.people}
📍 Sucursal: ${d.branch}
📝 Notas: ${d.notes || "Sin notas"}`)
}

function buildCalendlyURL(d) {
  const p = new URLSearchParams({
    name:  d.name,
    email: d.email,
    date:  d.isoDate,
    a1:    d.branch,
    a2:    `${d.people} persona(s)`,
    a3:    `Hora preferida: ${d.time}${d.notes ? " | Notas: "+d.notes : ""}`,
  })
  return `${CALENDLY_URL}?${p.toString()}`
}

/* ─── DateInput: compatible Safari ────────────────────────────
   Safari iOS no muestra el valor interno del input[type=date]
   cuando está vacío. Usamos un wrapper con label flotante
   que muestra el placeholder cuando no hay valor.
*/
function DateInput({ value, onChange, required }) {
  return (
    <div className="safari-date-wrap">
      <input
        type="date"
        required={required}
        value={value}
        onChange={onChange}
        className={value ? "has-value" : ""}
      />
      {!value && <span className="safari-date-placeholder">dd / mm / aaaa</span>}
    </div>
  )
}

function TimeInput({ value, onChange, required }) {
  return (
    <div className="safari-date-wrap">
      <input
        type="time"
        required={required}
        value={value}
        onChange={onChange}
        className={value ? "has-value" : ""}
      />
      {!value && <span className="safari-date-placeholder">— : —</span>}
    </div>
  )
}

/* ─── Mini Calendar ─────────────────────────────────── */
function MiniCalendar({ selected, onSelect }) {
  const today = new Date(); today.setHours(0,0,0,0)
  const [view, setView] = useState(() => {
    const d = selected || today
    return { year: d.getFullYear(), month: d.getMonth() }
  })
  const firstDay    = new Date(view.year, view.month, 1).getDay()
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate()
  const prev = () => setView(v => v.month === 0
    ? { year: v.year-1, month: 11 } : { year: v.year, month: v.month-1 })
  const next = () => setView(v => v.month === 11
    ? { year: v.year+1, month: 0  } : { year: v.year, month: v.month+1 })
  const cells = [...Array(firstDay).fill(null),
                 ...Array.from({length: daysInMonth}, (_,i) => i+1)]
  const isSel  = d => selected && selected.getFullYear()===view.year &&
                      selected.getMonth()===view.month && selected.getDate()===d
  const isPast = d => new Date(view.year, view.month, d) < today
  return (
    <div className="mc-cal">
      <div className="mc-cal-head">
        <button className="mc-nav" onClick={prev} type="button">‹</button>
        <span className="mc-month">{MONTHS_ES[view.month]} {view.year}</span>
        <button className="mc-nav" onClick={next} type="button">›</button>
      </div>
      <div className="mc-days-header">{DAYS_ES.map(d=><span key={d}>{d}</span>)}</div>
      <div className="mc-grid">
        {cells.map((d,i) => d===null
          ? <span key={`e${i}`}/>
          : <button key={d} type="button"
              className={`mc-day${isSel(d)?' sel':''}${isPast(d)?' past':''}`}
              onClick={() => !isPast(d) && onSelect(new Date(view.year,view.month,d))}
              disabled={isPast(d)}>{d}</button>
        )}
      </div>
    </div>
  )
}

/* ─── Info Bar ─────────────────────────────────────────── */
function InfoBar() {
  return (
    <div className="res-info-bar">
      <div className="rib-item">
        <span>🔥</span>
        <div><strong>Buffet Viernes</strong><p>$349 por persona · Come todo lo que quieras</p></div>
      </div>
      <div className="rib-divider"/>
      <div className="rib-item">
        <span>⏰</span>
        <div><strong>Horarios</strong><p>Lun – Dom &nbsp;1:00 PM – 11:00 PM</p></div>
      </div>
      <div className="rib-divider"/>
      <div className="rib-item">
        <span>📍</span>
        <div><strong>Sucursales</strong><p>Altozano · Las Camelinas</p></div>
      </div>
      <div className="rib-divider"/>
      <div className="rib-item rib-btns">
        <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer"
           className="btn btn-red btn-sm">💬 WA directo</a>
        <a href="tel:4433862070" className="btn btn-outline-light btn-sm">📞 443 386 2070</a>
      </div>
    </div>
  )
}

/* ─── Main ─────────────────────────────────────────────── */
const EMPTY_WA  = { name:"", phone:"", date:"", time:"", people:"2", branch:"Altozano", notes:"" }
const EMPTY_CAL = { name:"", email:"", people:"2", branch:"Altozano", notes:"" }

export default function Reservation() {
  const [tab,     setTab]     = useState("wa")
  const [wa,      setWa]      = useState(EMPTY_WA)
  const [waSent,  setWaSent]  = useState(false)
  const [cal,     setCal]     = useState(EMPTY_CAL)
  const [selDate, setSelDate] = useState(null)
  const [selTime, setSelTime] = useState("")
  const [calSent, setCalSent] = useState(false)

  const upWa  = (k,v) => setWa(f => ({...f,[k]:v}))
  const upCal = (k,v) => setCal(c => ({...c,[k]:v}))

  const dateLabel = selDate
    ? `${selDate.getDate()} de ${MONTHS_ES[selDate.getMonth()]} ${selDate.getFullYear()}` : ""

  const isoDate = selDate
    ? `${selDate.getFullYear()}-${pad(selDate.getMonth()+1)}-${pad(selDate.getDate())}` : ""

  const switchTab = (t) => {
    setTab(t); setWaSent(false); setCalSent(false)
    setSelDate(null); setSelTime("")
  }

  const submitWA = (e) => {
    e.preventDefault()
    window.open(`https://wa.me/${WA_NUMBER}?text=${buildWAMessage(wa)}`, "_blank")
    setWaSent(true)
  }

  const submitCal = (e) => {
    e.preventDefault()
    if (!selDate || !selTime) return
    window.open(buildCalendlyURL({ ...cal, dateLabel, time: selTime, isoDate }), "_blank")
    setCalSent(true)
  }

  return (
    <section className="section reservation" id="reserva">
      <div className="container">

        <p className="eyebrow red fade-up">RESERVACIONES</p>
        <div className="res-top fade-up d1">
          <h2>Agenda tu <em>experiencia</em></h2>
          <p className="res-intro">Elige fecha, hora y método. Confirmamos en menos de 30 min.</p>
        </div>

        <div className="res-tabs fade-up d2">
          <button className={`res-tab ${tab==="wa"?"active":""}`} onClick={()=>switchTab("wa")}>
            💬 WhatsApp rápido
          </button>
          <button className={`res-tab ${tab==="cal"?"active":""}`} onClick={()=>switchTab("cal")}>
            📅 Agenda tu reserva
          </button>
        </div>

        {tab === "wa" && (
          <div className="res-wa-wrap">
            {waSent ? (
              <div className="form-ok">
                <span>✅</span>
                <h3>¡Reserva enviada por WhatsApp!</h3>
                <p style={{marginBottom:"1.2rem"}}>Revisa tu app. Confirmamos en menos de 30 minutos.</p>
                <button className="btn btn-outline-light"
                  onClick={()=>{ setWaSent(false); setWa(EMPTY_WA) }}>Nueva reserva</button>
              </div>
            ) : (
              <form className="res-form res-wa-form" onSubmit={submitWA}>
                <div className="form-row">
                  <div className="field"><label>Nombre completo</label>
                    <input type="text" placeholder="Tu nombre" required
                      value={wa.name} onChange={e=>upWa("name",e.target.value)}/>
                  </div>
                  <div className="field"><label>WhatsApp</label>
                    <input type="tel" placeholder="443 000 0000" required
                      value={wa.phone} onChange={e=>upWa("phone",e.target.value)}/>
                  </div>
                </div>
                <div className="form-row">
                  <div className="field"><label>Fecha</label>
                    <DateInput
                      value={wa.date}
                      onChange={e => upWa("date", e.target.value)}
                      required style={{height:"3rem"}}
                    />
                  </div>
                  <div className="field"><label>Hora</label>
                    <TimeInput
                      value={wa.time}
                      onChange={e => upWa("time", e.target.value)}
                      required style={{height:"3rem"}}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="field"><label>Personas</label>
                    <select value={wa.people} onChange={e=>upWa("people",e.target.value)}>
                      {[1,2,3,4,5,6,7,8].map(n=><option key={n}>{n}</option>)}
                    </select>
                  </div>
                  <div className="field"><label>Sucursal</label>
                    <select value={wa.branch} onChange={e=>upWa("branch",e.target.value)}>
                      <option>Altozano</option><option>Las Camelinas</option>
                    </select>
                  </div>
                </div>
                <div className="field"><label>Ocasión / notas / alergias</label>
                  <textarea rows={3} placeholder="Cumpleaños, aniversario, alergia..."
                    value={wa.notes} onChange={e=>upWa("notes",e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-red btn-full">Enviar por WhatsApp 💬</button>
                <p className="form-hint">Se abrirá WhatsApp con tu reserva lista para enviar.</p>
              </form>
            )}
          </div>
        )}

        {tab === "cal" && (
          <div className="res-cal-wrap">
            {calSent ? (
              <div className="form-ok">
                <span>📅</span>
                <h3>¡Listo! El calendario se abrió</h3>
                <p style={{marginBottom:".4rem"}}>
                  Tu fecha <strong style={{color:"var(--text)"}}>{dateLabel}</strong> y hora preferida
                  <strong style={{color:"var(--text)"}}> {selTime}</strong> ya están pre-llenados.
                </p>
                <p style={{marginBottom:"1.4rem",fontSize:".82rem"}}>
                  Confirma haciendo clic en el horario disponible más cercano a tu preferencia.
                </p>
                <div style={{display:"flex",gap:".8rem",flexWrap:"wrap",justifyContent:"center"}}>
                  <button className="btn btn-red"
                    onClick={()=>window.open(buildCalendlyURL({...cal,dateLabel,time:selTime,isoDate}),"_blank")}>
                    Abrir de nuevo →
                  </button>
                  <button className="btn btn-outline-light"
                    onClick={()=>{ setCalSent(false); setCal(EMPTY_CAL); setSelDate(null); setSelTime("") }}>
                    Modificar
                  </button>
                </div>
              </div>
            ) : (
              <form className="res-cal-form" onSubmit={submitCal}>
                <div className="cal-top-row">
                  <div className="cal-col-left">
                    <p className="mc-label">📅 Selecciona tu fecha</p>
                    <MiniCalendar selected={selDate} onSelect={(d)=>{ setSelDate(d); setSelTime("") }}/>
                    {selDate && (
                      <p className="mc-selected-label">Fecha: <strong>{dateLabel}</strong></p>
                    )}
                  </div>
                  <div className="cal-col-right">
                    <p className="mc-label">⏰ Selecciona tu hora preferida</p>
                    {selDate ? (
                      <div className="time-grid">
                        {HOURS.map(h=>(
                          <button key={h} type="button"
                            className={`time-slot${selTime===h?' sel':''}`}
                            onClick={()=>setSelTime(h)}>{h}</button>
                        ))}
                      </div>
                    ) : (
                      <div className="time-placeholder">
                        <span>📅</span>
                        <p>Primero elige una fecha en el calendario</p>
                      </div>
                    )}
                    {selTime && (
                      <p className="mc-selected-label" style={{marginTop:".6rem"}}>
                        Hora preferida: <strong>{selTime}</strong>
                        <span style={{fontSize:".72rem",color:"var(--muted)",display:"block",marginTop:".2rem"}}>
                          Podrás confirmar el slot exacto en el calendario
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                {selDate && selTime && (
                  <div className="cal-form-row">
                    <div className="cal-form-inner">
                      <p className="mc-label" style={{marginBottom:".8rem"}}>👤 Tus datos</p>
                      <div className="form-row">
                        <div className="field"><label>Nombre completo</label>
                          <input type="text" placeholder="Tu nombre" required
                            value={cal.name} onChange={e=>upCal("name",e.target.value)}/>
                        </div>
                        <div className="field"><label>Correo electrónico</label>
                          <input type="email" placeholder="tu@correo.com" required
                            value={cal.email} onChange={e=>upCal("email",e.target.value)}/>
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
                            <option>Altozano</option><option>Las Camelinas</option>
                          </select>
                        </div>
                        <div className="field" style={{flex:2}}><label>Notas / alergias</label>
                          <input type="text" placeholder="Cumpleaños, alergia al camaron..."
                            value={cal.notes} onChange={e=>upCal("notes",e.target.value)}/>
                        </div>
                      </div>
                      <div className="res-summary">
                        <span>📅 {dateLabel}</span>
                        <span>⏰ {selTime}</span>
                        <span>👥 {cal.people} personas</span>
                        <span>📍 {cal.branch}</span>
                      </div>
                      <button type="submit" className="btn btn-red btn-full">
                        Confirmar en nuestro Calendario 📅
                      </button>
                      <p className="form-hint">
                        Abriremos el calendario con tu fecha y datos pre-llenados. Solo elige el slot final.
                      </p>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        )}

        <InfoBar />
      </div>
    </section>
  )
}
