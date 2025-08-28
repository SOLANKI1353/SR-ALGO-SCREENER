SR ALGO SCREENER - Modern ZIP
1) Create Neon Postgres and copy DATABASE_URL
2) Set Vercel env vars: DATABASE_URL, JWT_SECRET, SCHEDULER_TIMEZONE=Asia/Kolkata
3) Run locally: npm install && npx prisma generate && npx prisma migrate deploy
4) Deploy on Vercel, visit /signup, create an account, /settings to paste Angel API key
Note: pages/api/market.js contains placeholder for live SmartAPI integration. Replace with SmartAPI SDK calls.
