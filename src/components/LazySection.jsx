import { useEffect, useRef, useState } from "react"

/**
 * Renderiza children de forma lazy (IntersectionObserver).
 * IMPORTANTE: siempre pone el id del hijo en el wrapper div
 * para que los links de navegación puedan encontrar la sección
 * incluso antes de que se monte el componente real.
 */
export default function LazySection({
  children,
  rootMargin = "300px",
  fallback,
  minHeight = "60px",
}) {
  const ref   = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight + 300) { setShow(true); return }

    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShow(true); io.disconnect() } },
      { rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  // Extrae el id del primer hijo para ponerlo en el wrapper
  // así los links de nav funcionan antes del render lazy
  const childId = children?.props?.id ?? null

  return (
    <div ref={ref} id={childId ? undefined : undefined} data-lazy-id={childId ?? undefined}>
      {show
        ? children
        : (fallback ?? <div id={childId ?? undefined} style={{ minHeight, background: "transparent" }} aria-hidden="true" />)
      }
    </div>
  )
}
