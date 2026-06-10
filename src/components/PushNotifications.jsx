import { useState, useEffect } from "react"

const VAPID_PUBLIC_KEY = "BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBYYFmaZEBhFmhS6_uqE"

const PUSH_SUPPORTED =
  typeof window !== "undefined" &&
  "Notification" in window &&
  "serviceWorker" in navigator &&
  "PushManager" in window

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64  = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")
  const raw     = window.atob(base64)
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)))
}

export function usePushNotifications() {
  const [permission, setPermission] = useState(
    PUSH_SUPPORTED ? window.Notification.permission : "denied"
  )
  const [subscription, setSubscription] = useState(null)

  const register = async () => {
    if (!PUSH_SUPPORTED) return null
    try {
      const reg = await navigator.serviceWorker.register("/sw.js")
      await navigator.serviceWorker.ready
      const result = await window.Notification.requestPermission()
      setPermission(result)
      if (result !== "granted") return null
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      })
      setSubscription(sub)
      return sub
    } catch (err) {
      console.warn("Push error:", err)
      return null
    }
  }

  useEffect(() => {
    if (PUSH_SUPPORTED) navigator.serviceWorker.register("/sw.js").catch(() => {})
  }, [])

  return { permission, subscription, register }
}

export default function PushBanner() {
  if (!PUSH_SUPPORTED) return null
  return <PushBannerInner />
}

function PushBannerInner() {
  const { permission, register } = usePushNotifications()
  const [dismissed, setDismissed] = useState(false)
  const [done, setDone] = useState(false)
  if (permission === "granted" || dismissed) return null
  const handleEnable = async () => { const sub = await register(); if (sub) setDone(true) }
  return (
    <div className="push-banner">
      {done ? (
        <p>Notificaciones activadas!</p>
      ) : (
        <>
          <div className="push-text"><span>🔔</span><div><strong>Recibir notificaciones?</strong><p>Promociones y confirmacion de reserva.</p></div></div>
          <div className="push-actions">
            <button className="btn btn-red btn-sm" onClick={handleEnable}>Activar</button>
            <button className="btn btn-outline-light btn-sm" onClick={() => setDismissed(true)}>No gracias</button>
          </div>
        </>
      )}
    </div>
  )
}
