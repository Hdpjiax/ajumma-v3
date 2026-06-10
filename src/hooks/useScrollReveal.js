import { useEffect } from "react"

/**
 * useScrollReveal
 * ----------------
 * Observes ALL elements with class `fade-up` (and `fade-left`, `fade-right`,
 * `scale-in`, `blur-in`) and toggles `.visible` when they enter/leave the
 * viewport. Because we do NOT call `unobserve`, elements animate every time
 * they re-enter the viewport (scroll down AND back up).
 */
export function useScrollReveal() {
  useEffect(() => {
    const SELECTORS = ".fade-up, .fade-left, .fade-right, .scale-in, .blur-in, .stagger-item"

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          } else {
            // Remove .visible so the animation replays on next entry
            entry.target.classList.remove("visible")
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    )

    // Observe elements already in DOM
    document.querySelectorAll(SELECTORS).forEach(el => io.observe(el))

    // Re-observe when DOM changes (e.g. React renders new content)
    const mo = new MutationObserver(() => {
      document.querySelectorAll(SELECTORS).forEach(el => {
        // Only observe elements not yet tracked
        if (!el.dataset.observed) {
          el.dataset.observed = "1"
          io.observe(el)
        }
      })
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => { io.disconnect(); mo.disconnect() }
  }, [])
}
