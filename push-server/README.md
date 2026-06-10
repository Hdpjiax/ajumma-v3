# AJUMMA Push Server

Servidor Node.js para enviar notificaciones push al teléfono del dueño cuando llega una nueva reserva.

## Setup rápido

```bash
cd push-server
npm install

# 1. Generar llaves VAPID
node generate-keys.js

# 2. Copiar .env.example → .env y pegar las llaves
cp .env.example .env

# 3. Iniciar servidor
npm start
```

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/push/subscribe` | El frontend registra una suscripción |
| POST | `/api/push/reservation` | Llama al recibir una reserva → push al dueño |
| POST | `/api/push/notify` | Enviar push manual a todos |
| GET  | `/health` | Status del servidor |

## Flujo de reserva

1. Cliente llena el formulario en la web
2. Frontend envía `POST /api/push/reservation` con los datos
3. El servidor manda push notification al teléfono del dueño
4. El dueño ve: *"🍽️ Nueva Reserva — María · 4 personas · Altozano · 15/06 8:00 PM"*

## Deploy en Railway / Render (gratis)

```bash
# Railway
railway init && railway up

# Render: usa render.yaml o sube el repo
# Build: npm install
# Start: npm start
```
