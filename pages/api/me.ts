import type { NextApiRequest, NextApiResponse } from 'next'
import { verify } from '../../lib/jwt'
import db from '../../lib/db'

export default function handler(req: NextApiRequest, res: NextApiResponse){
  const auth = req.headers.authorization || ''
  const token = auth.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token' })
  const payload = verify(token)
  if (!payload) return res.status(401).json({ error: 'Invalid token' })
  const row = db.prepare('SELECT id, name, email FROM users WHERE id = ?').get((payload as any).sub)
  if (!row) return res.status(404).json({ error: 'User not found' })
  return res.json({ user: row })
}
