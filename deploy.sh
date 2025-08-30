#!/bin/bash
echo "📦 Building project..."
npm run build

echo "🗄️ Running Prisma migration..."
npx prisma migrate deploy

echo "🚀 Starting server..."
npm run start
