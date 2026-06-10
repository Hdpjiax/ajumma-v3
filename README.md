# AJUMMA v3.2

Landing page premium para restaurante coreano/sushi con:

- Hero cinematográfico
- Galería tipo carrusel infinito
- Menú interactivo
- Reservas con WhatsApp y Calendly
- Push notifications vía Service Worker + web-push
- SEO, Open Graph y Schema.org
- Imágenes optimizadas a WebP

## Instalación

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Reserva real

- El formulario envía los datos a WhatsApp.
- El bloque de Calendly usa un iframe; reemplaza la URL por la tuya.

## Push notifications

Dentro de `push-server/` hay un servidor Node.js con `web-push` para mandar avisos al dueño cuando entra una reserva.

### 1) Instala dependencias

```bash
cd push-server
npm install
```

### 2) Genera llaves VAPID

```bash
npm run generate-keys
```

### 3) Configura `.env`

Copia `.env.example` a `.env` y pega tus llaves.

## GitHub

Este proyecto ya incluye un `.gitignore` recomendado para React + Vite + Node.
