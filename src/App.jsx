import { Suspense, lazy } from "react"
import Navbar          from "./components/Navbar"
import Hero            from "./components/Hero"
import Marquee         from "./components/Marquee"
import Experience      from "./components/Experience"
import Menu            from "./components/Menu"
import Tasting         from "./components/Tasting"
import Gallery         from "./components/Gallery"
import Locations       from "./components/Locations"
import Reviews         from "./components/Reviews"
import Reservation     from "./components/Reservation"
import ErrorBoundary   from "./components/ErrorBoundary"
import { useScrollReveal } from "./hooks/useScrollReveal"
import "./styles/animations.css"
import FAQ from "./components/FAQ"

const InstagramStrip = lazy(() => import("./components/InstagramStrip"))
const Footer         = lazy(() => import("./components/Footer"))
const Chatbot        = lazy(() => import("./components/Chatbot"))

export default function App() {
  useScrollReveal()
  return (
    <ErrorBoundary>
      <div className="page">
        <div className="amb amb1"/><div className="amb amb2"/><div className="amb amb3"/>
        <Navbar/>
        <Hero/>
        <Marquee/>
        <Experience/>
        <Menu/>
        <Tasting/>
        <Gallery/>
        <Locations/>
        <Reviews/>
        <FAQ/>
        <Reservation/>
        <Suspense fallback={null}>
          <ErrorBoundary><InstagramStrip/></ErrorBoundary>
          <ErrorBoundary><Footer/></ErrorBoundary>
          <ErrorBoundary><Chatbot/></ErrorBoundary>
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}
