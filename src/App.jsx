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
import { useScrollReveal } from "./hooks/useScrollReveal"
import "./styles/animations.css"

export default function App() {
  // Repeating scroll reveal — removes .visible on exit so it re-animates on scroll back up
  useScrollReveal()

  return (
    <div className="page">
      <div className="amb amb1"/><div className="amb amb2"/><div className="amb amb3"/>
      <Navbar/>
      <PushBanner/>

      <Hero/>
      <Marquee/>
      <Experience/>
      <Menu/>
      <Tasting/>
      <Gallery/>
      <Locations/>
      <Reviews/>
      <Reservation/>

      <LazySection minHeight="300px"><InstagramStrip/></LazySection>
      <LazySection minHeight="300px"><Footer/></LazySection>

      <Chatbot/>
    </div>
  )
}
