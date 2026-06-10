
import { useEffect, useRef, useState } from "react"

const QR_TARGET = "https://ajumma.mx/#menu"   // change to real domain

// Lightweight QR via Google Charts API (no npm package needed)
const QR_URL = (text, size=300) =>
  `https://chart.googleapis.com/chart?cht=qr&chs=${size}x${size}&chl=${encodeURIComponent(text)}&choe=UTF-8&chld=H|1`

export default function QRModal({ onClose }) {
  const [url, setUrl]   = useState(QR_TARGET)
  const [size, setSize] = useState(300)
  const [label, setLabel] = useState("Escanea y ve nuestro menú")
  const printRef = useRef(null)

  const qrSrc = QR_URL(url, size)

  const download = async () => {
    const res    = await fetch(qrSrc)
    const blob   = await res.blob()
    const a      = document.createElement("a")
    a.href       = URL.createObjectURL(blob)
    a.download   = "ajumma-qr-menu.png"
    a.click()
  }

  const print = () => {
    const w = window.open("", "_blank")
    w.document.write(`
      <html><head><title>QR Ajumma</title>
      <style>
        body { font-family:sans-serif; display:flex; flex-direction:column;
               align-items:center; justify-content:center; min-height:100vh; background:#0a0806; color:#f4ece0; }
        img  { width:240px; height:240px; border:6px solid #c9a44a; border-radius:16px; }
        h2   { font-size:1.5rem; margin:1rem 0 .3rem; letter-spacing:.08em; }
        p    { font-size:.9rem; color:#a89880; }
        .kr  { font-size:1.1rem; color:#c0392b; letter-spacing:.1em; }
      </style>
      </head><body>
        <p class="kr">아주마</p>
        <h2>AJUMMA</h2>
        <img src="${qrSrc}" alt="QR Menu"/>
        <p>${label}</p>
      </body></html>
    `)
    w.document.close()
    w.print()
  }

  // close on Escape
  useEffect(() => {
    const fn = e => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [onClose])

  return (
    <div className="qr-backdrop" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="qr-modal">
        <button className="qr-close" onClick={onClose}>✕</button>

        <div className="qr-left">
          <p className="eyebrow gold">MENÚ DIGITAL</p>
          <h2 style={{fontSize:"2rem",marginBottom:"1rem"}}>Código <em>QR</em></h2>

          <div className="qr-preview">
            <img src={qrSrc} alt="QR Ajumma Menu" width={size} height={size}/>
            <p className="qr-label">{label}</p>
          </div>

          <div className="qr-btns">
            <button className="btn btn-gold" onClick={download}>⬇ Descargar PNG</button>
            <button className="btn btn-outline-light" onClick={print}>🖨 Imprimir</button>
          </div>
        </div>

        <div className="qr-right">
          <h3>Configurar QR</h3>

          <div className="form-field">
            <label>URL destino</label>
            <input value={url} onChange={e=>setUrl(e.target.value)}/>
          </div>
          <div className="form-field">
            <label>Texto bajo el QR</label>
            <input value={label} onChange={e=>setLabel(e.target.value)}/>
          </div>
          <div className="form-field">
            <label>Tamaño: {size}px</label>
            <input type="range" min={150} max={500} step={50} value={size} onChange={e=>setSize(+e.target.value)}
              style={{width:"100%",accentColor:"var(--red)"}}/>
          </div>

          <div className="qr-tips">
            <h4>💡 URLs sugeridas</h4>
            {[
              ["Menú completo",   "https://ajumma.mx/#menu"],
              ["Reservaciones",   "https://ajumma.mx/#reserva"],
              ["Buffet Viernes",  "https://ajumma.mx/#menu?cat=Buffet"],
              ["Instagram",       "https://instagram.com/ajummaoficial"],
              ["WhatsApp",        "https://wa.me/524433862070"],
            ].map(([lbl, u]) => (
              <button key={lbl} className="qr-tip-btn" onClick={()=>{setUrl(u);setLabel(lbl)}}>
                {lbl}
              </button>
            ))}
          </div>

          <div className="qr-info">
            <p>📱 Imprime este QR y ponlo en las mesas. Los clientes escanean y ven el menú en su teléfono sin tocar carta física.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
