import React from "react"
import ReactDOM from "react-dom/client"
import { inject as injectAnalytics } from "@vercel/analytics"
import { injectSpeedInsights } from "@vercel/speed-insights"
import App from "./App"
import "./styles/global.css"
import "./styles/fixes.css"
import "./styles/calendar.css"
import "./styles/map.css"
import "./styles/faq.css"

injectAnalytics()
injectSpeedInsights()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><App/></React.StrictMode>
)
