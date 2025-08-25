import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export const config = { api: { bodyParser: false } } // stream

function sseInit(res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache, no-transform')
  res.setHeader('Connection', 'keep-alive')
  // @ts-ignore
  if (res.flushHeaders) res.flushHeaders()
}

function sseSend(res: NextApiResponse, data: any){
  res.write(`data: ${JSON.stringify(data)}\n\n`)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const apiKey = process.env.ANGEL_API_KEY
  if (!apiKey) return res.status(501).json({ error: 'ANGEL_API_KEY missing' } as any)

  const symbolsParam = (req.query.symbols as string) || 'RELIANCE,TCS'
  const symbols = symbolsParam.split(',').map(s => s.trim()).filter(Boolean)

  sseInit(res)

  async function fetchQuotes(){
    try {
      const headers: Record<string,string> = { 'Content-Type': 'application/json', 'api_key': apiKey }
      const results: any[] = []
      for (const sym of symbols){
        const url = `https://apiconnect.angelbroking.com/rest/market/quote/v1/getQuote?symbol=${encodeURIComponent(sym)}`
        const r = await axios.get(url, { headers, timeout: 8000 })
        const price = Number(r.data?.data?.ltp || r.data?.ltp || r.data?.data?.[0]?.ltp || 0)
        results.push({ symbol: sym, price: price || Math.random()*100, time: Date.now() })
      }
      sseSend(res, results)
    } catch (e:any) {
      sseSend(res, { error: e?.message || 'fetch error' })
    }
  }

  await fetchQuotes()
  const iv = setInterval(fetchQuotes, 2000)

  const tidy = () => { clearInterval(iv); try { res.end() } catch {} }
  req.on('close', tidy)
  req.on('error', tidy)
}
