import { useState, useEffect, useRef } from "react"
import { CHATBOT } from "../data/content"

const MENU_URL = "#menu"  // Reemplaza con tu enlace real de menú digital

const CALENDLY_URL = "https://calendly.com/garia350/new-meeting"

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState("start")
  const [log, setLog]   = useState([])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const [calendlyStep, setCalendlyStep] = useState(null)
  const [reservaData, setReservaData] = useState({})
  const bodyRef = useRef(null)

  // Auto-scroll al fondo
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [log, typing, calendlyStep])

  const botSay = (text, delay = 350) => {
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setLog(prev => [...prev, { type: "bot", text }])
    }, delay)
  }

  const pick = (opt) => {
    const next = opt.next
    setLog(prev => [...prev, { type: "user", text: opt.label }])

    if (next === "ver_menu") {
      const el = document.getElementById("menu")
      if (el) el.scrollIntoView({ behavior: "smooth" })
      setOpen(false)
      return
    }
    if (next === "reservar_calendly") {
      setCalendlyStep("personas")
      setLog(prev => [...prev, { type: "bot", text: "¿Para cuántas personas es la reserva? 👥" }])
      return
    }
    if (next.startsWith("http") || next.startsWith("tel")) {
      window.open(next, "_blank")
      setTimeout(() => { setStep("start"); setLog(l=>[...l,{type:"bot",text:CHATBOT.start.msg}]) }, 300)
      return
    }
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setStep(next)
      setLog(l => [...l, { type: "bot", text: CHATBOT[next].msg }])
    }, 300)
  }

  const handleCalendlyFlow = (text) => {
    const t = text.trim()
    if (!t) return
    setLog(prev => [...prev, { type: "user", text: t }])
    setInput("")

    if (calendlyStep === "personas") {
      setReservaData(d => ({...d, personas: t}))
      setCalendlyStep("fecha")
      botSay("¿Qué fecha tienes en mente? 📅 (Ej: 15 de julio)")
    } else if (calendlyStep === "fecha") {
      setReservaData(d => ({...d, fecha: t}))
      setCalendlyStep("sucursal")
      botSay("¿Qué sucursal prefieres? \n📍 Altozano o Las Camelinas")
    } else if (calendlyStep === "sucursal") {
      const data = {...reservaData, sucursal: t}
      setReservaData(data)
      setCalendlyStep(null)
      botSay(`¡Perfecto! ${data.personas} personas en ${t} el ${data.fecha}. Abriendo Calendly para confirmar la hora... 📅`, 500)
      setTimeout(() => {
        window.open(
          `${CALENDLY_URL}?guests=${encodeURIComponent(data.personas)}&a1=${encodeURIComponent(data.sucursal)}`,
          "_blank"
        )
        setTimeout(() => {
          setStep("start")
          setLog(l => [...l, { type: "bot", text: CHATBOT.start.msg }])
        }, 800)
      }, 1200)
    }
  }

  const handleSend = () => {
    if (!input.trim()) return
    if (calendlyStep) {
      handleCalendlyFlow(input)
      return
    }
    // Respuesta libre — detectar intención básica
    const txt = input.toLowerCase()
    setLog(prev => [...prev, { type: "user", text: input }])
    setInput("")
    if (txt.includes("reserv") || txt.includes("mesa") || txt.includes("cita")) {
      botSay("Para reservar puedes usar WhatsApp o Calendly. ¿Cuál prefieres?")
      setTimeout(() => setStep("reservar"), 400)
    } else if (txt.includes("menu") || txt.includes("menú") || txt.includes("comida")) {
      botSay("Te muestro nuestro menú ahora mismo 🍣")
      setTimeout(() => { document.getElementById("menu")?.scrollIntoView({behavior:"smooth"}); setOpen(false) }, 600)
    } else if (txt.includes("horario") || txt.includes("hora") || txt.includes("abre")) {
      botSay("Abrimos todos los días de 1:00 PM a 11:00 PM 🕐")
    } else if (txt.includes("ubicaci") || txt.includes("donde") || txt.includes("dónde")) {
      botSay("Tenemos 2 sucursales: Altozano (Juan Pablo II 1735) y Las Camelinas (Plaza Xentric) 📍")
    } else {
      botSay("No entendí bien 😅 ¿Puedo ayudarte con algo de la lista de abajo?")
      setTimeout(() => setStep("start"), 400)
    }
  }

  const currentOpts = calendlyStep ? [] : (CHATBOT[step]?.opts || [])

  // Opciones especiales para reservar
  const reservarOpts = step === "reservar" ? [
    { label: "📅 Reservar con Calendly", next: "reservar_calendly" },
    { label: "💬 WhatsApp", next: "https://wa.me/524433862070?text=Hola%20Ajumma%20quiero%20reservar" },
    { label: "📞 443 386 2070", next: "tel:4433862070" },
    { label: "⬅ Volver", next: "start" },
  ] : null

  const displayOpts = reservarOpts || currentOpts

  return (
    <>
      <button
        className={`fab ${open ? "fab-open" : ""}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Chat"
      >
        <span className="fab-icon">{open ? "✕" : "💬"}</span>
        {!open && <span className="fab-dot"/>}
      </button>

      {open && (
        <div className="chat-box">
          {/* Header */}
          <div className="chat-head">
            <div className="chat-av">A</div>
            <div>
              <strong>AJUMMA</strong>
              <span>● En línea</span>
            </div>
            <button onClick={() => setOpen(false)} className="chat-x" aria-label="Cerrar">✕</button>
          </div>

          {/* Messages */}
          <div className="chat-body" ref={bodyRef}>
            <div className="chat-msg bot"><p>{CHATBOT["start"].msg}</p></div>
            {log.map((m, i) => (
              <div key={i} className={`chat-msg ${m.type}`}>
                <p>{m.text}</p>
              </div>
            ))}
            {typing && (
              <div className="chat-msg bot chat-typing">
                <span/><span/><span/>
              </div>
            )}
          </div>

          {/* Options */}
          {displayOpts.length > 0 && (
            <div className="chat-opts">
              {displayOpts.map(o => (
                <button
                  key={o.label}
                  className="chat-opt"
                  onClick={() => pick(o)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chat-foot">
            <input
              placeholder={calendlyStep ? "Escribe tu respuesta..." : "Escribe algo o usa las opciones..."}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
            />
            <button className="chat-send" onClick={handleSend} aria-label="Enviar">➤</button>
          </div>
          <p className="chat-pw">Powered by <strong>AJUMMA</strong></p>
        </div>
      )}
    </>
  )
}
