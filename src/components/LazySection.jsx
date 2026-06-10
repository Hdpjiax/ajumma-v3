
import { useEffect, useRef, useState } from "react"

/**
 * Wraps any section in an IntersectionObserver.
 * The component is NOT rendered until it enters the viewport (+ rootMargin offset).
 * Once rendered it stays mounted (no re-unmount on scroll away).
 *
 * Props:
 *   children   — JSX to render lazily
 *   rootMargin — how early to start loading (default "200px")
 *   fallback   — placeholder shown before the component loads (default: spacer div)
 *   minHeight  — height of the spacer to avoid layout shift (default "60px")
 */
export default function LazySection({
  children,
  rootMargin = "200px",
  fallback,
  minHeight = "60px",
}) {
  const ref       = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Already in viewport on mount (hero etc.) — show immediately
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight + 200) { setShow(true); return }

    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShow(true); io.disconnect() } },
      { rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  return (
    <div ref={ref}>
      {show
        ? children
        : (fallback ?? <div style={{ minHeight, background: "transparent" }} aria-hidden="true" />)
      }
    </div>
  )
}
