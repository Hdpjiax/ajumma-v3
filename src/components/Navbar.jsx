
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
      <header className={`nav ${solid?"solid":""}`}>
        {/* Social sidebar */}
        <div className="nav-social">
          <a href="https://www.instagram.com/ajummaoficial" target="_blank" rel="noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="https://www.facebook.com/Ajummamorelia" target="_blank" rel="noreferrer" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
          </a>
          <a href="#" aria-label="TikTok">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.73a4.85 4.85 0 01-1.01-.04z"/></svg>
          </a>
          <a href="https://maps.app.goo.gl/FHCSja6k65tKHZLUA" target="_blank" rel="noreferrer" aria-label="Maps">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg>
          </a>
        </div>

        <a href="#hero" className="nav-logo">
          <span className="logo-kr">아주마</span>
          <div>
            <span className="logo-en">AJUMMA</span>
            <span className="logo-sub">KOREAN BBQ &amp; SUSHI</span>
          </div>
        </a>

        <nav className={`nav-links ${open?"open":""}`}>
          {NAV.map(l => <a key={l.label} href={l.href} onClick={close}>{l.label}</a>)}
        </nav>

        <a href="#reserva" className="btn btn-red nav-cta" onClick={close}>RESERVAR MESA 🗓</a>

        <button className={`burger ${open?"open":""}`} onClick={() => setOpen(o=>!o)} aria-label="Menú">
          <span/><span/><span/>
        </button>
      </header>

      {open && <div className="nav-backdrop" onClick={close}/>}
    </>
  )
}
