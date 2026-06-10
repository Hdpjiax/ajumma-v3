import { useState } from "react"

const FAQS = [
  { q: "¿Necesito reserva o puedo llegar sin cita?", a: "Aceptamos ambas opciones. Puedes llegar directamente (walk-in) o reservar tu mesa con anticipación para garantizar tu lugar, especialmente en fines de semana." },
  { q: "¿Hay estacionamiento disponible?", a: "Sí, contamos con estacionamiento disponible en ambas sucursales. En Altozano está dentro de Plaza GEA." },
  { q: "¿Tienen opciones vegetarianas?", a: "Sí, tenemos opciones vegetarianas en nuestro menú. Pregunta a tu mesero y con gusto te orientamos." },
  { q: "¿Es apto para ir con niños?", a: "¡Totalmente! Ajumma es un espacio familiar. Los niños son bienvenidos y pueden disfrutar de varios platillos del menú." },
  { q: "¿Cuánto cuesta el Buffet Ajumma?", a: "El Buffet Ajumma tiene un costo de $359 por persona. Incluye acceso ilimitado a nigiris, sushi, comida coreana, ramen y más." },
  { q: "¿El buffet está disponible todos los días?", a: "El Buffet Ajumma está disponible ciertos días de la semana, incluyendo los jueves. Te recomendamos confirmarnos antes de tu visita." },
  { q: "¿Hacen eventos privados o celebraciones?", a: "Sí, organizamos eventos privados, cumpleaños y cenas especiales. Escríbenos por WhatsApp para cotización personalizada." },
  { q: "¿Aceptan tarjeta o solo efectivo?", a: "Aceptamos ambas formas de pago: tarjeta de crédito/débito y efectivo. ¡Como prefieras!" },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)
  const toggle = (i) => setOpen(open === i ? null : i)

  return (
    <section className="section faq-sec" id="faq">
      <div className="container">
        <p className="eyebrow red fade-up">RESOLVEMOS TUS DUDAS</p>
        <h2 className="fade-up d1">Preguntas<br/><em>frecuentes</em></h2>
        <div className="faq-list fade-up d2">
          {FAQS.map((item, i) => (
            <div key={i} className={`faq-item${open === i ? " faq-item--open" : ""}`}>
              <button className="faq-question" onClick={() => toggle(i)} aria-expanded={open === i}>
                <span>{item.q}</span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </button>
              <div className="faq-answer"><p>{item.a}</p></div>
            </div>
          ))}
        </div>
        <div className="faq-cta fade-up d3">
          <p>¿Tienes otra pregunta?</p>
          <a href="https://wa.me/524433862070?text=Hola%20Ajumma%20tengo%20una%20pregunta" target="_blank" rel="noreferrer" className="btn btn-red">💬 Escríbenos por WhatsApp</a>
        </div>
      </div>
    </section>
  )
}