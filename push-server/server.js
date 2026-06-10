
require("dotenv").config()
const express    = require("express")
const bodyParser = require("body-parser")
const cors       = require("cors")
const webpush    = require("web-push")

const app = express()
app.use(cors({ origin: process.env.ALLOWED_ORIGIN }))
app.use(bodyParser.json())

// VAPID setup
webpush.setVapidDetails(
  process.env.VAPID_EMAIL,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
)

// In-memory store (replace with DB in production)
const subscriptions = new Map()

// ── POST /api/push/subscribe ─────────────────────────────────
// Called by the frontend when user enables notifications
app.post("/api/push/subscribe", (req, res) => {
  const sub = req.body
  if (!sub?.endpoint) return res.status(400).json({ error: "Invalid subscription" })
  const key = sub.endpoint
  subscriptions.set(key, sub)
  console.log(`✅ Nueva suscripción registrada: ${subscriptions.size} total`)
  res.json({ ok: true, count: subscriptions.size })
})

// ── POST /api/push/notify ─────────────────────────────────────
// Protected endpoint to send a push to ALL subscribers
// Call this from your backend/webhook/Zapier when a reservation arrives
app.post("/api/push/notify", async (req, res) => {
  // Simple secret check (add a real auth token in production)
  const { secret, title, body, url } = req.body
  if (secret !== (process.env.NOTIFY_SECRET || "ajumma-secret")) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  const payload = JSON.stringify({ title, body, url: url || "/" })
  const results = []

  for (const [key, sub] of subscriptions) {
    try {
      await webpush.sendNotification(sub, payload)
      results.push({ key: key.slice(-20), status: "ok" })
    } catch (err) {
      console.warn("Push error, removing stale sub:", err.statusCode)
      subscriptions.delete(key)
      results.push({ key: key.slice(-20), status: "failed" })
    }
  }

  res.json({ sent: results.filter(r => r.status === "ok").length, results })
})

// ── POST /api/push/reservation ───────────────────────────────
// Dedicated endpoint: called by Reservation.jsx via fetch when form is submitted
// Sends notification to the OWNER (pre-subscribed device)
app.post("/api/push/reservation", async (req, res) => {
  const { name, date, time, people, branch, phone } = req.body
  const payload = JSON.stringify({
    title: "🍽️ Nueva Reserva — AJUMMA",
    body:  `${name} · ${people} personas · ${branch} · ${date} ${time}`,
    url:   "/"
  })

  let sent = 0
  for (const [key, sub] of subscriptions) {
    try {
      await webpush.sendNotification(sub, payload)
      sent++
    } catch (err) {
      subscriptions.delete(key)
    }
  }
  res.json({ ok: true, sent })
})

// ── Health check ─────────────────────────────────────────────
app.get("/health", (_, res) => res.json({ ok: true, subs: subscriptions.size }))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`🔔 Push server corriendo en http://localhost:${PORT}`))
