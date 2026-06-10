
/**
 * usePush — Web Push helper
 *
 * Usage:
 *   const { supported, permission, subscribe, sendTestPush } = usePush()
 *
 * Flow:
 *   1. subscribe()  → registers SW + requests Notification permission
 *                     → saves PushSubscription to localStorage
 *   2. sendTestPush() → triggers a local SW push so the owner can test
 *
 * Production note:
 *   Replace VAPID_PUBLIC_KEY with your own (generate at web-push-codelab.glitch.me)
 *   Store the PushSubscription server-side and call web-push from your backend.
 */

import { useState, useEffect } from 'react'

// ── Replace with your real VAPID public key ──────────────────
const VAPID_PUBLIC_KEY = 'BEl62iUYgUivxIkv69yViEuiBIa40HI8MpGQCxAjz_R_X0xPNLzPPEYC8JHVCl8pBkfj9HiPFnlRz8gP4v0Ia3Q'

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64   = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const raw      = atob(base64)
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)))
}

export function usePush() {
  const [supported,   setSupported]   = useState(false)
  const [permission,  setPermission]  = useState('default')
  const [subscription, setSub]        = useState(null)
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState(null)

  useEffect(() => {
    setSupported('serviceWorker' in navigator && 'PushManager' in window)
    setPermission(Notification.permission)
    // Restore existing subscription from localStorage
    const saved = localStorage.getItem('ajumma-push-sub')
    if (saved) setSub(JSON.parse(saved))
  }, [])

  async function registerSW() {
    const reg = await navigator.serviceWorker.getRegistration('/sw.js')
    if (reg) return reg
    return navigator.serviceWorker.register('/sw.js', { scope: '/' })
  }

  async function subscribe() {
    if (!supported) return
    setLoading(true); setError(null)
    try {
      const reg  = await registerSW()
      await navigator.serviceWorker.ready

      const perm = await Notification.requestPermission()
      setPermission(perm)
      if (perm !== 'granted') throw new Error('Permiso denegado')

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly:      true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      })

      localStorage.setItem('ajumma-push-sub', JSON.stringify(sub))
      setSub(sub)

      // ── In production: POST sub to your backend ──────────
      // await fetch('/api/push/subscribe', {
      //   method:  'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body:    JSON.stringify(sub),
      // })

      return sub
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function unsubscribe() {
    if (!subscription) return
    await subscription.unsubscribe()
    localStorage.removeItem('ajumma-push-sub')
    setSub(null)
  }

  /**
   * sendTestPush — triggers a visible test notification locally
   * via postMessage to the service worker.
   * No backend needed for testing.
   */
  async function sendTestPush(payload = {}) {
    const reg = await navigator.serviceWorker.ready
    reg.active?.postMessage({ type: 'TEST_PUSH', ...payload })
  }

  return { supported, permission, subscription, loading, error, subscribe, unsubscribe, sendTestPush }
}
