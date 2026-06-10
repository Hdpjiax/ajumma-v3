import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles/global.css"
import "./styles/fixes.css"
import "./styles/calendar.css"
import "./styles/map.css"
import "./styles/faq.css"

// ── Bloqueo de zoom — 3 capas ──────────────────────────────
;(function lockZoom() {
  // 1. Gestures Safari iOS
  document.addEventListener("gesturestart",  e => e.preventDefault(), { passive: false })
  document.addEventListener("gesturechange", e => e.preventDefault(), { passive: false })
  document.addEventListener("gestureend",   e => e.preventDefault(), { passive: false })

  // 2. Pinch (2+ dedos) todos los browsers
  document.addEventListener("touchmove", e => {
    if (e.touches.length > 1) e.preventDefault()
  }, { passive: false })

  // 3. visualViewport API — la más robusta:
  //    si el scale cambia (zoom doble-tap, etc.) lo resetea inmediatamente
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", () => {
      if (window.visualViewport.scale !== 1) {
        // Forzar scale=1 manipulando el meta
        const meta = document.querySelector("meta[name=viewport]")
        if (meta) {
          // Toggle trick: cambiar y revertir hace que Chrome/Safari reapliquen el scale
          meta.content = "width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"
          setTimeout(() => {
            meta.content = "width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"
          }, 50)
        }
      }
    })
  }
})()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><App/></React.StrictMode>
)
