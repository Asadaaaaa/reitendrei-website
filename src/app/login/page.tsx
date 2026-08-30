'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, User, ArrowRight, ShieldCheck, Waves } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Login failed')
      }

      router.push('/dashboard')
      router.refresh()
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      setError(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#07090e] text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-surface border border-white/10 shadow-2xl mb-2">
            <img
              src="/images/brand/logo.webp"
              alt="Reiten Drei Logo"
              className="h-12 w-auto object-contain"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2 font-mono text-[11px] text-accent font-bold uppercase tracking-widest">
              <Waves size={14} />
              <span>CONTENT MANAGEMENT SYSTEM</span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
              ADMINISTRATOR LOGIN
            </h1>
          </div>
        </div>

        {/* Login Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-surface/80 backdrop-blur-xl border border-white/10 shadow-2xl space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
              <span className="font-bold">ERROR:</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Input */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-white/70 uppercase tracking-wider font-semibold">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-mono"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-white/70 uppercase tracking-wider font-semibold">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <Lock size={16} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-mono"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-accent text-slate-950 font-mono text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-accent-hover transition-all duration-300 shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span>AUTHENTICATING...</span>
              ) : (
                <>
                  <span>SIGN IN TO DASHBOARD</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Security Note */}
          <div className="pt-2 border-t border-white/5 flex items-center justify-center gap-1.5 text-[10px] font-mono text-white/40">
            <ShieldCheck size={12} className="text-accent" />
            <span>ENCRYPTED SESSION // REIDEN DREI STUDIO</span>
          </div>
        </div>

        {/* Back to Website Link */}
        <div className="text-center">
          <a
            href="/"
            className="text-xs font-mono text-white/50 hover:text-accent transition-colors uppercase tracking-wider"
          >
            ← Back to Live Website
          </a>
        </div>
      </div>
    </div>
  )
}
