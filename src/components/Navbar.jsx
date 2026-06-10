import { useState, useEffect } from "react"
import { NAV } from "../data/content"

export default function Navbar() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen]   = useState(false)

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 50)
    window.addEventListener("scroll", fn, { passive:true })
    fn()
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      <header className={`nav ${solid ? "solid" : ""}`}>
        <div className="nav-social">
          <a href="https://www.instagram.com/ajummaoficial" target="_blank" rel="noreferrer" aria-label="Instagram">...</a>
          <a href="https://www.facebook.com/Ajummamorelia" target="_blank" rel="noreferrer" aria-label="Facebook">...</a>
          <a href="#" aria-label="TikTok">...</a>
          <a href="https://maps.app.goo.gl/FHCSja6k65tKHZLUA" target="_blank" rel="noreferrer" aria-label="Maps">...</a>
        </div>

        <a href="#hero" className="nav-logo">
          <span className="logo-kr">아주마</span>
          <div>
            <span className="logo-en">AJUMMA</span>
            <span className="logo-sub">KOREAN BBQ & SUSHI</span>
          </div>
        </a>

        <nav className={`nav-links ${open ? "open" : ""}`}>{NAV.map(l => <a key={l.label} href={l.href} onClick={close}>{l.label}</a>)}</nav>

        <a href="#reserva" className="btn btn-red nav-cta" onClick={close}>RESERVAR MESA 🗓</a>

        <button className={`burger ${open ? "open" : ""}`} onClick={() => setOpen(o => !o)} aria-label="Menú">
          <span/><span/><span/>
        </button>
      </header>

      {open && <div className="nav-backdrop" onClick={close}/>} 
    </>
  )
}