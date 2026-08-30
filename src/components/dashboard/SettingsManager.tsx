'use client'
import { useState, useEffect } from 'react'
import { Check, AlertCircle, Save, Globe, Mail, Phone, MessageSquare, Music } from 'lucide-react'

export function SettingsManager() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings')
      const data = await res.json()
      if (res.ok && data.data) {
        setSettings(data.data)
      }
    } catch (err: unknown) {
      console.error('Fetch settings error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setFeedback(null)

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update settings')

      setFeedback({ type: 'success', message: 'Settings saved successfully!' })
      if (data.data) setSettings(data.data)
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      setFeedback({ type: 'error', message: errorMsg })
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-4 border-b border-white/10">
        <h2 className="font-display font-black text-xl text-white uppercase tracking-tight">
          Section 5: Social Channels &amp; Contact Information
        </h2>
        <p className="text-xs font-mono text-white/50">
          Manage band contact email, booking description, phone numbers, and official social media URLs.
        </p>
      </div>

      {feedback && (
        <div
          className={`p-3.5 rounded-xl text-xs font-mono flex items-center gap-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}
        >
          {feedback.type === 'success' ? <Check size={14} /> : <AlertCircle size={14} />}
          <span>{feedback.message}</span>
        </div>
      )}

      {isLoading ? (
        <div className="p-8 text-center font-mono text-xs text-white/40">Loading settings from SQLite...</div>
      ) : (
        <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl bg-surface/80 border border-white/10 space-y-6 shadow-2xl">
          {/* Contact Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-accent">
              <Mail size={14} />
              <span className="font-bold uppercase">Direct Contact &amp; Inquiries</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-white/70 uppercase">Official Email</label>
                <input
                  type="email"
                  required
                  value={settings.contact_email || ''}
                  onChange={(e) => handleChange('contact_email', e.target.value)}
                  placeholder="reitendrei@gmail.com"
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-white/70 uppercase">WhatsApp Link / Phone</label>
                <input
                  type="text"
                  value={settings.contact_whatsapp || ''}
                  onChange={(e) => handleChange('contact_whatsapp', e.target.value)}
                  placeholder="https://wa.me/..."
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-white/70 uppercase">Booking Notice / Description</label>
              <textarea
                rows={2}
                value={settings.contact_description || ''}
                onChange={(e) => handleChange('contact_description', e.target.value)}
                placeholder="For bookings, press inquiries, music licensing..."
                className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-xs font-mono text-accent">
              <Globe size={14} />
              <span className="font-bold uppercase">Official Social &amp; Streaming Channels</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-white/70 uppercase">Instagram URL</label>
                <input
                  type="text"
                  value={settings.instagram_url || ''}
                  onChange={(e) => handleChange('instagram_url', e.target.value)}
                  placeholder="https://instagram.com/reitendrei"
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-white/70 uppercase">YouTube Channel URL</label>
                <input
                  type="text"
                  value={settings.youtube_url || ''}
                  onChange={(e) => handleChange('youtube_url', e.target.value)}
                  placeholder="https://youtube.com/@reitendreiofficial..."
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-white/70 uppercase">TikTok URL</label>
                <input
                  type="text"
                  value={settings.tiktok_url || ''}
                  onChange={(e) => handleChange('tiktok_url', e.target.value)}
                  placeholder="https://tiktok.com/@reiten.drei"
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-white/70 uppercase">Spotify Profile / Track URL</label>
                <input
                  type="text"
                  value={settings.spotify_url || ''}
                  onChange={(e) => handleChange('spotify_url', e.target.value)}
                  placeholder="https://open.spotify.com/..."
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-accent"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-white/10">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-slate-950 font-mono text-xs font-black uppercase tracking-wider hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20"
            >
              <Save size={15} />
              <span>Save Settings</span>
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
