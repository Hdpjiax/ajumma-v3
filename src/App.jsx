
import { useEffect } from "react"
import Navbar            from "./components/Navbar"
import Hero              from "./components/Hero"
import Marquee           from "./components/Marquee"
import Experience        from "./components/Experience"
import Menu              from "./components/Menu"
import Tasting           from "./components/Tasting"
import Gallery           from "./components/Gallery"
import Locations         from "./components/Locations"
import Reviews           from "./components/Reviews"
import InstagramStrip    from "./components/InstagramStrip"
import Reservation       from "./components/Reservation"
import Footer            from "./components/Footer"
import Chatbot           from "./components/Chatbot"
import LazySection       from "./components/LazySection"
import PushBanner        from "./components/PushNotifications"

export default function App() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible") }),
      { threshold: 0.08 }
    )
    const observe = () => document.querySelectorAll(".fade-up:not(.visible)").forEach(el => io.observe(el))
    observe()
    const mo = new MutationObserver(observe)
    mo.observe(document.getElementById("root"), { childList: true, subtree: true })

    const onScroll = () => {
      document.querySelectorAll(".parallax").forEach(el => {
        const rect = el.getBoundingClientRect()
        const pct  = rect.top / window.innerHeight
        el.style.transform = `translateY(${pct * 30}px) scale(1.08)`
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => { io.disconnect(); mo.disconnect(); window.removeEventListener("scroll", onScroll) }
  }, [])

  return (
    <div className="page">
      <div className="amb amb1"/><div className="amb amb2"/><div className="amb amb3"/>
      <Navbar/>
      <PushBanner/>
      <Hero/>
      <Marquee/>
      <LazySection minHeight="500px"><Experience/></LazySection>
      <LazySection minHeight="600px"><Menu/></LazySection>
      <LazySection minHeight="500px"><Tasting/></LazySection>
      <LazySection minHeight="460px"><Gallery/></LazySection>
      <LazySection minHeight="500px"><Locations/></LazySection>
      <LazySection minHeight="400px"><Reviews/></LazySection>
      <LazySection minHeight="300px"><InstagramStrip/></LazySection>
      <LazySection minHeight="420px"><Reservation/></LazySection>
      <LazySection minHeight="300px"><Footer/></LazySection>
      <Chatbot/>
    </div>
  )
}
