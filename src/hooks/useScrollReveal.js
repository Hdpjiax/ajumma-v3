import { useEffect } from "react"

/**
 * useScrollReveal
 * ----------------
 * Versión segura para móvil:
 * - Sin MutationObserver (causaba lag en móvil)
 * - Quita .visible al salir para que la animación se repita al volver a subir
 * - Re-escanea en resize por si React renderiza más elementos
 */
export function useScrollReveal() {
  useEffect(() => {
    const SELECTOR = ".fade-up, .fade-left, .fade-right, .scale-in, .blur-in, .stagger-item"

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          } else {
            entry.target.classList.remove("visible")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    )

    const observe = () =>
      document.querySelectorAll(SELECTOR).forEach(el => io.observe(el))

    observe()

    // Re-escanear 500ms y 1500ms despues del mount
    // cubre el caso donde React renderiza componentes lazy despues del primer paint
    const t1 = setTimeout(observe, 500)
    const t2 = setTimeout(observe, 1500)

    return () => {
      io.disconnect()
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])
}
