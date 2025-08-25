import jwt from 'jsonwebtoken'
const SECRET = process.env.JWT_SECRET || 'dev_secret_change_it'
export function sign(payload: any, opts: jwt.SignOptions = {}) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d', ...opts })
}
export function verify(token: string){
  try { return jwt.verify(token, SECRET) as any } catch { return null }
}
