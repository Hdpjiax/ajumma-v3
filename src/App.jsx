import { Suspense, lazy } from "react"
import Navbar        from "./components/Navbar"
import Hero          from "./components/Hero"
import ErrorBoundary from "./components/ErrorBoundary"
import { useScrollReveal } from "./hooks/useScrollReveal"
import "./styles/animations.css"

// Todo lo que no es above-the-fold → lazy
const Marquee       = lazy(() => import("./components/Marquee"))
const Experience    = lazy(() => import("./components/Experience"))
const Menu          = lazy(() => import("./components/Menu"))
const Tasting       = lazy(() => import("./components/Tasting"))
const Gallery       = lazy(() => import("./components/Gallery"))
const Locations     = lazy(() => import("./components/Locations"))
const Reviews       = lazy(() => import("./components/Reviews"))
const FAQ           = lazy(() => import("./components/FAQ"))
const Reservation   = lazy(() => import("./components/Reservation"))
const InstagramStrip = lazy(() => import("./components/InstagramStrip"))
const Footer        = lazy(() => import("./components/Footer"))
const Chatbot       = lazy(() => import("./components/Chatbot"))

export default function App() {
  useScrollReveal()
  return (
    <ErrorBoundary>
      <div className="page">
        <div className="amb amb1"/><div className="amb amb2"/><div className="amb amb3"/>
        <Navbar/>
        <Hero/>
        <Suspense fallback={null}>
          <Marquee/>
          <Experience/>
          <Menu/>
          <Tasting/>
          <Gallery/>
          <Locations/>
          <Reviews/>
          <FAQ/>
          <Reservation/>
          <ErrorBoundary><InstagramStrip/></ErrorBoundary>
          <ErrorBoundary><Footer/></ErrorBoundary>
          <ErrorBoundary><Chatbot/></ErrorBoundary>
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}
