# SR ALGO SCREENER — FINAL V3
Next.js (TypeScript) + Tailwind + SQLite auth + Dashboard + Angel SmartAPI proxy (REST) + SSE live stream (polling fallback).

## Quick Start
1) Copy `.env.example` → `.env` and set `JWT_SECRET` and `ANGEL_API_KEY`. For quick test, you can also set `ANGEL_CLIENT_CODE`, `ANGEL_PASSWORD`, `ANGEL_TOTP` (optional), or login from UI.
2) `npm install`
3) `npm run dev`
4) Open http://localhost:3000

### Broker API
- Login (server session): `POST /api/broker/angel?_action=login` ({ client_code, password, totp? })
- Quote: `GET /api/broker/angel?symbol=RELIANCE&client_code=...`
- Live SSE (polling): `GET /api/broker/angel/stream?symbols=RELIANCE,TCS&client_code=...`

> Note: This SSE stream polls REST quote endpoint every 2 sec as a safe fallback. You can switch to SmartAPI WebSocket later if desired.

## Deploy
- Vercel: set ENV in project settings. Then deploy.
- Node/VPS: `npm run build` → `npm start` (make sure `.env` is present on server).

Security: Do NOT expose passwords/keys to client—only send to server over HTTPS.
