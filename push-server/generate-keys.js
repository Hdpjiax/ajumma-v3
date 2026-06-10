
const webpush = require("web-push")
const vapid   = webpush.generateVAPIDKeys()
console.log("\n🔑 VAPID Keys generadas:")
console.log("VAPID_PUBLIC_KEY=",  vapid.publicKey)
console.log("VAPID_PRIVATE_KEY=", vapid.privateKey)
console.log("\nCopia estas líneas en push-server/.env y en src/components/PushNotifications.jsx")
