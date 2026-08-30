'use client'
import { useState, useEffect } from 'react'
import { FileUploader } from './FileUploader'
import { Plus, Edit2, Trash2, Check, AlertCircle, Save, X, Disc3, ExternalLink } from 'lucide-react'

export interface ReleaseRecord {
  id: string
  number: string
  title: string
  subtitle: string
  year: string
  cover_image: string
  spotify_track_id: string
  spotify_url: string
  youtube_url: string | null
  description: string
  sonic_character: string
  order_index: number
}

export function ReleasesManager() {
  const [items, setItems] = useState<ReleaseRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [activeItem, setActiveItem] = useState<Partial<ReleaseRecord>>({})
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const fetchReleases = async () => {
    try {
      const res = await fetch('/api/releases')
      const data = await res.json()
      if (res.ok) setItems(data.data)
    } catch (err: unknown) {
      console.error('Fetch releases error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchReleases()
  }, [])

  const handleOpenCreate = () => {
    setActiveItem({
      number: String(items.length + 1).padStart(2, '0'),
      title: '',
      subtitle: 'SINGLE // SURF ROCK',
      year: new Date().getFullYear().toString(),
      cover_image: '',
      spotify_track_id: '',
      spotify_url: '',
      youtube_url: '',
      description: '',
      sonic_character: '',
      order_index: items.length,
    })
    setIsEditing(true)
  }

  const handleOpenEdit = (item: ReleaseRecord) => {
    setActiveItem({ ...item })
    setIsEditing(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setFeedback(null)

    if (!activeItem.title || !activeItem.cover_image || !activeItem.spotify_track_id) {
      setFeedback({ type: 'error', message: 'Title, Cover Image, and Spotify Track ID are required.' })
      return
    }

    try {
      const isUpdate = !!activeItem.id && items.some((it) => it.id === activeItem.id)
      const url = isUpdate ? `/api/releases/${activeItem.id}` : '/api/releases'
      const method = isUpdate ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activeItem),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save release')

      setFeedback({ type: 'success', message: 'Release saved successfully!' })
      setIsEditing(false)
      fetchReleases()
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      setFeedback({ type: 'error', message: errorMsg })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this release?')) return

    try {
      const res = await fetch(`/api/releases/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      setFeedback({ type: 'success', message: 'Release deleted.' })
      fetchReleases()
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      setFeedback({ type: 'error', message: errorMsg })
    }
  }

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="font-display font-black text-xl text-white uppercase tracking-tight">
            Section 2: Music Singles &amp; Discography
          </h2>
          <p className="text-xs font-mono text-white/50">
            Manage singles (Nelayan Pantai Sanur, BADJINGAN), Spotify tracks, YouTube videos, and artwork covers.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-slate-950 font-mono text-xs font-black uppercase tracking-wider hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20"
        >
          <Plus size={15} />
          <span>Add New Release</span>
        </button>
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

      {/* Editor Modal / Form */}
      {isEditing && (
        <div className="p-6 rounded-3xl bg-surface/90 border border-accent/40 shadow-2xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Disc3 size={18} className="text-accent" />
              <h3 className="font-display font-bold text-base text-accent uppercase">
                {activeItem.id ? 'Edit Single Release' : 'Create New Single Release'}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="p-1 text-white/40 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-white/70 uppercase">Catalog Number</label>
                <input
                  type="text"
                  required
                  value={activeItem.number || ''}
                  onChange={(e) => setActiveItem({ ...activeItem, number: e.target.value })}
                  placeholder="01, 02..."
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-white/70 uppercase">Year</label>
                <input
                  type="text"
                  required
                  value={activeItem.year || ''}
                  onChange={(e) => setActiveItem({ ...activeItem, year: e.target.value })}
                  placeholder="2024"
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-white/70 uppercase">Subtitle Tag</label>
                <input
                  type="text"
                  value={activeItem.subtitle || ''}
                  onChange={(e) => setActiveItem({ ...activeItem, subtitle: e.target.value })}
                  placeholder="DEBUT SINGLE // SURF TRADITIONAL"
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-white/70 uppercase">Single Title</label>
              <input
                type="text"
                required
                value={activeItem.title || ''}
                onChange={(e) => setActiveItem({ ...activeItem, title: e.target.value })}
                placeholder="e.g. Nelayan Pantai Sanur"
                className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm font-display font-bold text-white focus:outline-none focus:border-accent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-white/70 uppercase">Spotify Track ID</label>
                <input
                  type="text"
                  required
                  value={activeItem.spotify_track_id || ''}
                  onChange={(e) => setActiveItem({ ...activeItem, spotify_track_id: e.target.value })}
                  placeholder="e.g. 7e5CxBlmNSDcT5nhwH3Tm2"
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-accent"
                />
                <p className="text-[10px] font-mono text-white/40">ID found at end of open.spotify.com/track/ID</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-white/70 uppercase">YouTube Official Video Link</label>
                <input
                  type="text"
                  value={activeItem.youtube_url || ''}
                  onChange={(e) => setActiveItem({ ...activeItem, youtube_url: e.target.value })}
                  placeholder="https://youtu.be/..."
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-white/70 uppercase">Storyline &amp; Concept Description</label>
              <textarea
                rows={3}
                value={activeItem.description || ''}
                onChange={(e) => setActiveItem({ ...activeItem, description: e.target.value })}
                placeholder="Story behind the track..."
                className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-accent"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-white/70 uppercase">Sonic Character</label>
              <input
                type="text"
                value={activeItem.sonic_character || ''}
                onChange={(e) => setActiveItem({ ...activeItem, sonic_character: e.target.value })}
                placeholder="Spring reverb chime, driving bassline..."
                className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-accent"
              />
            </div>

            {/* Artwork Upload */}
            <FileUploader
              value={activeItem.cover_image || ''}
              onChange={(url) => setActiveItem({ ...activeItem, cover_image: url })}
              label="Official Single Artwork"
              helperText="Upload artwork image saved to /storage with UUID."
            />

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 font-mono text-xs uppercase"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-accent text-slate-950 font-mono text-xs font-black uppercase hover:bg-accent-hover shadow-lg"
              >
                <Save size={14} />
                <span>Save Release</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Items List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="p-8 text-center font-mono text-xs text-white/40">Loading releases from SQLite...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center font-mono text-xs text-white/40 border border-dashed border-white/10 rounded-2xl">
            No releases found. Click &quot;Add New Release&quot; to add one.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-surface/60 border border-white/8 hover:border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-14 h-14 rounded-xl bg-black/60 border border-white/10 overflow-hidden flex-shrink-0">
                  <img src={item.cover_image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-accent/20 text-accent font-mono text-[9px] font-bold">
                      RD-{item.number}
                    </span>
                    <span className="font-mono text-[10px] text-white/40">{item.year}</span>
                    {item.youtube_url && (
                      <span className="text-[9px] font-mono text-red-400 font-bold">YOUTUBE VIDEO</span>
                    )}
                  </div>
                  <h4 className="font-display font-black text-sm text-white truncate">{item.title}</h4>
                  <p className="text-[11px] font-mono text-white/40 truncate">{item.subtitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <a
                  href={`https://open.spotify.com/track/${item.spotify_track_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-white/40 hover:text-emerald-400 border border-white/5 transition-colors"
                  title="Open in Spotify"
                >
                  <ExternalLink size={14} />
                </a>
                <button
                  type="button"
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-accent border border-white/5 transition-colors"
                  title="Edit release"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 border border-white/5 transition-colors"
                  title="Delete release"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
