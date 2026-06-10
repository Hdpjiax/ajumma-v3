import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles/global.css"
import "./styles/fixes.css"
import "./styles/calendar.css"
import "./styles/map.css"
import "./styles/faq.css"

// Bloquear pinch-zoom vía JS — algunos browsers ignoran user-scalable=no
;(function lockZoom() {
  // 1. Prevenir gesture zoom (Safari iOS)
  document.addEventListener("gesturestart",  e => e.preventDefault(), { passive: false })
  document.addEventListener("gesturechange", e => e.preventDefault(), { passive: false })
  document.addEventListener("gestureend",   e => e.preventDefault(), { passive: false })

  // 2. Prevenir pinch-to-zoom (todos los browsers táctiles)
  document.addEventListener("touchmove", e => {
    if (e.touches.length > 1) e.preventDefault()
  }, { passive: false })

  // 3. Si el usuario logró hacer zoom de alguna forma, resetearlo
  document.addEventListener("touchend", () => {
    if (window.visualViewport && window.visualViewport.scale !== 1) {
      const meta = document.querySelector("meta[name=viewport]")
      if (meta) {
        meta.content = "width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"
      }
    }
  }, { passive: true })
})()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><App/></React.StrictMode>
)
