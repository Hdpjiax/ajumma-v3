
import { useState } from "react"
import QRModal from "./QRModal"

export default function QRFloatingBtn() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button className="qr-fab" onClick={() => setOpen(true)} title="Ver QR del Menú">
        <span>QR</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
          <path d="M14 14h.01M18 14h.01M14 18h.01M18 18h.01M14 16h2M16 14v2"/>
        </svg>
      </button>
      {open && <QRModal onClose={() => setOpen(false)}/>}
    </>
  )
}
