import { useState } from "react"
import { CHATBOT } from "../data/content"
import Reservation from "./Reservation"

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState("start")
  const [log, setLog] = useState([])
  const [input, setInput] = useState("")

  const pick = (opt) => {
    const next = opt.next
    setLog(prev => [...prev, { type: "user", text: opt.label }])
    if (next.startsWith("http") || next.startsWith("tel")) {
      window.open(next, "_blank")
      setTimeout(() => { setStep("start"); setLog(l=>[...l,{type:"bot",text:CHATBOT.start.msg}]) }, 300)
    } else {
      setTimeout(() => { setStep(next); setLog(l=>[...l,{type:"bot",text:CHATBOT[next].msg}]) }, 200)
    }
  }

  const handleSend = () => {
    if(!input) return
    setLog(prev => [...prev, {type:"user", text:input}])
    setInput("")
    // Aquí se puede integrar Calendly: preguntas de fecha, personas, etc.
  }

  return (
    <>
      <button className="fab" onClick={()=>setOpen(o=>!o)} aria-label="Chat">
        {open ? "✕" : "💬"}
        {!open && <span className="fab-dot"/>}
      </button>
      {open && (
        <div className="chat-box" style={{background:'#0a0806', color:'#f4ece0'}}>
          <div className="chat-head">
            <div className="chat-av">A</div>
            <div><strong>AJUMMA</strong><span>● En línea</span></div>
            <button onClick={()=>setOpen(false)} className="chat-x">✕</button>
          </div>
          <div className="chat-body">
            <div className="chat-msg bot"><p>{CHATBOT[step].msg}</p></div>
            {log.map((m,i)=><div key={i} className={`chat-msg ${m.type}`}><p>{m.text}</p></div>)}
          </div>
          <div className="chat-opts">
            {CHATBOT[step].opts.map(o=>(
              <button key={o.label} className="chat-opt" onClick={()=>pick(o)}>{o.label}</button>
            ))}
          </div>
          <div className="chat-foot">
            <input placeholder="Escribe tu mensaje..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter' && handleSend()}/>
            <button onClick={handleSend}>➤</button>
          </div>
          <p className="chat-pw">Powered by <strong>AJUMMA</strong></p>
        </div>
      )}
    </>
  )
}