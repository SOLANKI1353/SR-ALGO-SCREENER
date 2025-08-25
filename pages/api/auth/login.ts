import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import db from '../../../lib/db'
import { sign } from '../../../lib/jwt'

export default function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method !== 'POST') return res.status(405).end()
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' })

  const row = db.prepare('SELECT id, name, email, password FROM users WHERE email = ?').get(email) as any
  if (!row) return res.status(401).json({ error: 'Invalid credentials' })

  const ok = bcrypt.compareSync(password, row.password)
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' })

  const token = sign({ sub: row.id, email: row.email })
  const user = { id: row.id, name: row.name, email: row.email }
  return res.json({ user, token })
}
