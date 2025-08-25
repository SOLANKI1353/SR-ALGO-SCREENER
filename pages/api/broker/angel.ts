import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
const SmartAPI = (() => { try { return require('smartapi-javascript').SmartAPI || require('smartapi-javascript') } catch(e){ return null } })()

type SessionInfo = { access_token?: string; refresh_token?: string; expiresAt?: number }
const sessions: Record<string, SessionInfo> = {}

async function sdkGenerateSession(apiKey: string, client_code: string, password: string, totp?: string){
  if (!SmartAPI) throw new Error('smartapi-javascript SDK not installed')
  const smart = new SmartAPI({ api_key: apiKey })
  return await smart.generateSession(client_code, password, totp || '')
}
async function restLoginByPassword(client_code: string, password: string, totp?: string){
  const url = 'https://apiconnect.angelbroking.com/rest/auth/angelbroking/user/v1/loginByPassword'
  const body: any = { clientcode: client_code, password }
  if (totp) body.totp = totp
  const r = await axios.post(url, body, { headers: { 'Content-Type': 'application/json' }, timeout: 10000 })
  return r.data
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const apiKey = process.env.ANGEL_API_KEY
  if (!apiKey) return res.status(501).json({ error: 'ANGEL_API_KEY missing in environment' })

  try {
    if (req.method === 'POST' && req.query._action === 'login') {
      const { client_code, password, totp } = req.body || {}
      const fallbackClient = process.env.ANGEL_CLIENT_CODE
      const fallbackPass = process.env.ANGEL_PASSWORD
      const fallbackTotp = process.env.ANGEL_TOTP
      const cc = client_code || fallbackClient
      const pw = password || fallbackPass
      const tp = (totp || fallbackTotp || '') as string
      if (!cc || !pw) return res.status(400).json({ error: 'Missing client_code or password (body or .env)' })

      let loginResp: any
      try {
        if (SmartAPI) loginResp = await sdkGenerateSession(apiKey, cc, pw, tp)
        else loginResp = await restLoginByPassword(cc, pw, tp)
      } catch (err: any) {
        console.error('Angel login error', err?.response?.data || err.message || err)
        return res.status(502).json({ error: 'Login failed', detail: err?.response?.data || err.message })
      }

      const access_token = loginResp?.data?.access_token || loginResp?.data?.jwtToken || loginResp?.access_token || loginResp?.jwtToken
      const refresh_token = loginResp?.data?.refresh_token || loginResp?.refresh_token
      sessions[cc] = { access_token, refresh_token, expiresAt: Date.now() + (3600 - 60) * 1000 }
      return res.json({ ok: true, client_code: cc, loginResp })
    }

    if (req.method === 'GET') {
      const symbol = (req.query.symbol as string) || 'RELIANCE'
      const client_code = (req.query.client_code as string) || process.env.ANGEL_CLIENT_CODE
      if (!client_code) return res.status(400).json({ error: 'client_code missing (query or .env)' })
      const session = sessions[client_code]

      // SDK LTP first
      if (SmartAPI && session?.access_token) {
        try {
          const smart = new SmartAPI({ api_key: apiKey, access_token: session.access_token, refresh_token: session.refresh_token })
          const fn = (smart as any).ltpData || (smart as any).getLTP || (smart as any).getLtpData
          if (typeof fn === 'function') {
            const ltp = await fn.call(smart, symbol)
            return res.json({ provider: 'angel-sdk', symbol, ltp })
          }
        } catch(e:any) {
          console.warn('SDK LTP failed, falling back to REST', e?.message || e)
        }
      }

      // REST fallback
      const quoteUrl = `https://apiconnect.angelbroking.com/rest/market/quote/v1/getQuote?symbol=${encodeURIComponent(symbol)}`
      const headers: Record<string,string> = { 'Content-Type': 'application/json', 'api_key': apiKey }
      if (session?.access_token) headers['Authorization'] = `Bearer ${session.access_token}`
      const r = await axios.get(quoteUrl, { headers, timeout: 8000 })
      return res.json({ provider: 'angel-rest', symbol, raw: r.data })
    }

    res.setHeader('Allow', 'GET, POST')
    return res.status(405).end()
  } catch (err:any) {
    console.error('Angel proxy error', err?.message || err)
    return res.status(502).json({ error: 'Broker proxy error', detail: err?.message || err })
  }
}
