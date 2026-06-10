
// ── AJUMMA Service Worker v1.0 ──────────────────────────────
const CACHE_NAME = "ajumma-v1"

// Assets to pre-cache on install
const PRECACHE = [
  "/",
  "/imgs/food-sushi-roll.webp",
]

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(PRECACHE))
  )
  self.skipWaiting()
})

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  )
  self.clients.claim()
})

// Network-first for HTML/JS, Cache-first for images
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url)
  if (e.request.destination === "image") {
    e.respondWith(
      caches.match(e.request).then(cached =>
        cached || fetch(e.request).then(res => {
          const clone = res.clone()
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone))
          return res
        })
      )
    )
  }
})

// ── Push event: show notification ───────────────────────────
self.addEventListener("push", (e) => {
  let data = { title: "AJUMMA", body: "Nueva notificación", icon: "/imgs/food-sushi-roll.webp" }
  try { data = { ...data, ...e.data.json() } } catch (_) {}

  e.waitUntil(
    self.registration.showNotification(data.title, {
      body:    data.body,
      icon:    data.icon || "/imgs/food-sushi-roll.webp",
      badge:   "/imgs/food-sushi-roll.webp",
      vibrate: [200, 100, 200],
      data:    { url: data.url || "/" },
      actions: [
        { action: "open",    title: "Ver reserva" },
        { action: "dismiss", title: "Cerrar" },
      ],
    })
  )
})

// ── Notification click ───────────────────────────────────────
self.addEventListener("notificationclick", (e) => {
  e.notification.close()
  if (e.action === "dismiss") return
  const url = e.notification.data?.url || "/"
  e.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
      const existing = list.find(c => c.url.includes(url))
      if (existing) return existing.focus()
      return clients.openWindow(url)
    })
  )
})
