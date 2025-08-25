import React, { useEffect, useRef, useState } from 'react'
import Router from 'next/router'

type Tick = { symbol: string; price: number; time: number }
export default function Dashboard(){
  const [user, setUser] = useState<{name:string} | null>(null)
  const [symbols, setSymbols] = useState<string>('RELIANCE,TCS,INFY,HDFCBANK')
  const [ticks, setTicks] = useState<Record<string, Tick>>({})
  const [angel, setAngel] = useState({ client_code: '', password: '', totp: '' })
  const [loginMsg, setLoginMsg] = useState<string>('')
  const esRef = useRef<EventSource | null>(null)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (!token) { Router.push('/'); return }
    fetch('/api/me', { headers: { Authorization: 'Bearer ' + token }})
      .then(r=>r.json()).then(d=>{ if (d.user) setUser(d.user) })
  }, [])

  function logout(){ localStorage.removeItem('token'); Router.push('/') }

  async function loginAngel(e: React.FormEvent){
    e.preventDefault()
    setLoginMsg('')
    const res = await fetch('/api/broker/angel?_action=login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(angel)
    })
    const data = await res.json()
    if (!res.ok) setLoginMsg(data.error || 'Login failed')
    else setLoginMsg('Angel login OK')
  }

  function startStream(){
    stopStream()
    const q = new URLSearchParams({ symbols, client_code: angel.client_code }).toString()
    const es = new EventSource('/api/broker/angel/stream?' + q)
    es.onmessage = (ev) => {
      try {
        const j = JSON.parse(ev.data) as Tick[]
        setTicks(prev => {
          const next = { ...prev }
          j.forEach(t => next[t.symbol] = t)
          return next
        })
      } catch {}
    }
    es.onerror = () => console.warn('SSE connection lost')
    esRef.current = es
  }
  function stopStream(){ if (esRef.current) { esRef.current.close(); esRef.current = null }}

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">SR ALGO SCREENER</h2>
          <div className="flex items-center gap-3">
            <div>{user ? `Hi, ${user.name}` : '...'}</div>
            <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={logout}>Logout</button>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Angel One — Server Login</h3>
          <form onSubmit={loginAngel} className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input className="p-2 border rounded" placeholder="Client Code" value={angel.client_code} onChange={e=>setAngel({...angel, client_code:e.target.value})} />
            <input type="password" className="p-2 border rounded" placeholder="Password" value={angel.password} onChange={e=>setAngel({...angel, password:e.target.value})} />
            <input className="p-2 border rounded" placeholder="TOTP (optional)" value={angel.totp} onChange={e=>setAngel({...angel, totp:e.target.value})} />
            <button className="p-2 bg-blue-600 text-white rounded">Login</button>
          </form>
          {loginMsg && <div className="mt-2 text-sm">{loginMsg}</div>}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Live SSE Watchlist</h3>
          <div className="flex gap-2 mb-3">
            <input className="flex-1 p-2 border rounded" value={symbols} onChange={e=>setSymbols(e.target.value)} />
            <button className="px-3 py-2 bg-green-600 text-white rounded" onClick={startStream}>Go Live</button>
            <button className="px-3 py-2 bg-gray-600 text-white rounded" onClick={stopStream}>Stop</button>
          </div>
          <table className="w-full text-left">
            <thead><tr><th>Symbol</th><th>Price</th><th>Time</th></tr></thead>
            <tbody>
              {Object.values(ticks).map(t => (
                <tr key={t.symbol}>
                  <td className="py-1">{t.symbol}</td>
                  <td>{t.price?.toFixed ? t.price.toFixed(2) : String(t.price)}</td>
                  <td>{new Date(t.time).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
