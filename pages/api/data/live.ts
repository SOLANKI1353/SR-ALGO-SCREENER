import type { NextApiRequest, NextApiResponse } from 'next'
export default function handler(req: NextApiRequest, res: NextApiResponse){
  const sample = [
    { symbol: 'RELIANCE', price: 2550 + Math.random() * 20, time: Date.now() },
    { symbol: 'TCS', price: 3300 + Math.random() * 10, time: Date.now() },
    { symbol: 'INFY', price: 1600 + Math.random() * 12, time: Date.now() },
    { symbol: 'HDFCBANK', price: 1600 + Math.random() * 8, time: Date.now() },
  ]
  res.setHeader('Cache-Control', 'no-store')
  return res.json({ data: sample })
}
