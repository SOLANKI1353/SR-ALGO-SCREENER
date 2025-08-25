import React, { useState } from 'react'
import Router from 'next/router'

export default function Signup(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')

  async function submit(e: React.FormEvent){
    e.preventDefault()
    setErr('')
    const res = await fetch('/api/auth/signup', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    const data = await res.json()
    if (!res.ok) return setErr(data.error || 'Signup failed')
    localStorage.setItem('token', data.token)
    Router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4">SR ALGO SCREENER — Signup</h1>
        {err && <div className="mb-3 text-red-600">{err}</div>}
        <form onSubmit={submit}>
          <label className="block mb-1">Full name</label>
          <input className="w-full p-2 border rounded mb-3" value={name} onChange={e=>setName(e.target.value)} />
          <label className="block mb-1">Email</label>
          <input className="w-full p-2 border rounded mb-3" value={email} onChange={e=>setEmail(e.target.value)} />
          <label className="block mb-1">Password</label>
          <input type="password" className="w-full p-2 border rounded mb-4" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="w-full py-2 bg-green-600 text-white rounded">Create account</button>
        </form>
        <div className="mt-4 text-sm">Already have an account? <a href="/" className="text-blue-600">Login</a></div>
      </div>
    </div>
  )
}
