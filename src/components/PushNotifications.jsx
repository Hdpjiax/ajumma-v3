
import { useState, useEffect } from "react"

// ── VAPID public key (replace with your own from web-push generate-vapid-keys)
// This is a placeholder — generate yours with: npx web-push generate-vapid-keys
const VAPID_PUBLIC_KEY = "BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBYYFmaZEBhFmhS6_uqE"

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64  = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")
  const raw     = atob(base64)
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)))
}

export function usePushNotifications() {
  const [permission, setPermission] = useState(Notification.permission)
  const [subscription, setSubscription] = useState(null)

  const register = async () => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return null

    // Register SW
    const reg = await navigator.serviceWorker.register("/sw.js")
    await navigator.serviceWorker.ready

    // Request notification permission
    const result = await Notification.requestPermission()
    setPermission(result)
    if (result !== "granted") return null

    // Subscribe to push
    try {
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly:      true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      })
      setSubscription(sub)
      // ── Send subscription to your backend here ──────────────
      // await fetch("/api/push/subscribe", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(sub),
      // })
      console.log("✅ Push subscription:", JSON.stringify(sub))
      return sub
    } catch (err) {
      console.warn("Push subscribe error:", err)
      return null
    }
  }

  // Auto-register SW on mount (no permission request yet)
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {})
    }
  }, [])

  return { permission, subscription, register }
}

// ── UI component shown in footer / settings ──────────────────
export default function PushBanner() {
  const { permission, register } = usePushNotifications()
  const [dismissed, setDismissed] = useState(false)
  const [done, setDone] = useState(false)

  if (permission === "granted" || dismissed) return null

  const handleEnable = async () => {
    const sub = await register()
    if (sub) setDone(true)
  }

  return (
    <div className="push-banner">
      {done ? (
        <p>✅ ¡Notificaciones activadas! Te avisaremos de promociones y confirmaciones.</p>
      ) : (
        <>
          <div className="push-text">
            <span>🔔</span>
            <div>
              <strong>¿Recibir notificaciones?</strong>
              <p>Entérate de promociones, buffet viernes y confirma tu reserva.</p>
            </div>
          </div>
          <div className="push-actions">
            <button className="btn btn-red btn-sm" onClick={handleEnable}>Activar</button>
            <button className="btn btn-outline-light btn-sm" onClick={()=>setDismissed(true)}>No, gracias</button>
          </div>
        </>
      )}
    </div>
  )
}
