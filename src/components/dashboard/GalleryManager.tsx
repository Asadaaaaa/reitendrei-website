'use client'
import { useState, useEffect } from 'react'
import { FileUploader } from './FileUploader'
import { Plus, Edit2, Trash2, Check, AlertCircle, Save, X, Camera, Film } from 'lucide-react'

export interface GalleryPhotoRecord {
  id: string
  image: string
  type: string
  title: string
  date: string
  venue: string
  description: string
  aspect: string
  order_index: number
}

export function GalleryManager() {
  const [items, setItems] = useState<GalleryPhotoRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [activeItem, setActiveItem] = useState<Partial<GalleryPhotoRecord>>({})
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/gallery')
      const data = await res.json()
      if (res.ok) setItems(data.data)
    } catch (err: unknown) {
      console.error('Fetch gallery error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGallery()
  }, [])

  const handleOpenCreate = () => {
    setActiveItem({
      image: '',
      type: 'LIVE SESSION',
      title: '',
      date: '2026',
      venue: 'Bekasi Stage',
      description: '',
      aspect: 'landscape',
      order_index: items.length,
    })
    setIsEditing(true)
  }

  const handleOpenEdit = (item: GalleryPhotoRecord) => {
    setActiveItem({ ...item })
    setIsEditing(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setFeedback(null)

    if (!activeItem.image || !activeItem.title) {
      setFeedback({ type: 'error', message: 'Photo/Media and Title are required.' })
      return
    }

    try {
      const isUpdate = !!activeItem.id && items.some((it) => it.id === activeItem.id)
      const url = isUpdate ? `/api/gallery/${activeItem.id}` : '/api/gallery'
      const method = isUpdate ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activeItem),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save photo')

      setFeedback({ type: 'success', message: 'Gallery item saved successfully!' })
      setIsEditing(false)
      fetchGallery()
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      setFeedback({ type: 'error', message: errorMsg })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery visual?')) return

    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      setFeedback({ type: 'success', message: 'Visual deleted.' })
      fetchGallery()
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
            Section 3: Visual Archive &amp; Gallery
          </h2>
          <p className="text-xs font-mono text-white/50">
            Upload and manage live concert captures, backstage chronicles, and official photography.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-slate-950 font-mono text-xs font-black uppercase tracking-wider hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20"
        >
          <Plus size={15} />
          <span>Upload New Visual</span>
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
              <Camera size={18} className="text-accent" />
              <h3 className="font-display font-bold text-base text-accent uppercase">
                {activeItem.id ? 'Edit Gallery Photo' : 'Upload New Gallery Photo'}
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
                <label className="text-xs font-mono text-white/70 uppercase">Category / Tag</label>
                <input
                  type="text"
                  required
                  value={activeItem.type || ''}
                  onChange={(e) => setActiveItem({ ...activeItem, type: e.target.value })}
                  placeholder="LIVE SESSION, BACKSTAGE..."
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-white/70 uppercase">Venue / Location</label>
                <input
                  type="text"
                  value={activeItem.venue || ''}
                  onChange={(e) => setActiveItem({ ...activeItem, venue: e.target.value })}
                  placeholder="e.g. Terpingkal Coffee"
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-white/70 uppercase">Date / Year</label>
                <input
                  type="text"
                  value={activeItem.date || ''}
                  onChange={(e) => setActiveItem({ ...activeItem, date: e.target.value })}
                  placeholder="2026"
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-white/70 uppercase">Photo Title</label>
              <input
                type="text"
                required
                value={activeItem.title || ''}
                onChange={(e) => setActiveItem({ ...activeItem, title: e.target.value })}
                placeholder="Visual title..."
                className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm font-display font-bold text-white focus:outline-none focus:border-accent"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-white/70 uppercase">Description</label>
              <textarea
                rows={2}
                value={activeItem.description || ''}
                onChange={(e) => setActiveItem({ ...activeItem, description: e.target.value })}
                placeholder="Chronicle description..."
                className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-accent"
              />
            </div>

            {/* Photo / Video Upload */}
            <FileUploader
              value={activeItem.image || ''}
              onChange={(url) => setActiveItem({ ...activeItem, image: url })}
              label="Gallery Image or Video"
              helperText="Saved to /storage with UUID. Uniform 4:3 aspect ratio recommended."
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
                <span>Save Visual</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full p-8 text-center font-mono text-xs text-white/40">Loading gallery from SQLite...</div>
        ) : items.length === 0 ? (
          <div className="col-span-full p-12 text-center border border-dashed border-white/10 rounded-3xl space-y-3 bg-surface/30">
            <Film className="w-10 h-10 text-accent/60 mx-auto animate-pulse" />
            <div className="space-y-1">
              <h4 className="font-display font-bold text-sm text-white uppercase">Gallery is in Coming Soon state</h4>
              <p className="text-xs font-mono text-white/50 max-w-md mx-auto">
                No items currently stored. The website automatically renders the sleek Coming Soon state until you upload visuals.
              </p>
            </div>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-2xl bg-surface/60 border border-white/8 hover:border-white/20 flex flex-col justify-between gap-3 transition-all"
            >
              <div className="aspect-[4/3] rounded-xl bg-black/60 border border-white/10 overflow-hidden relative group">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[9px] font-mono text-accent font-bold">
                  {item.type}
                </div>
              </div>

              <div className="space-y-1 px-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
                  <span>{item.venue}</span>
                  <span>{item.date}</span>
                </div>
                <h4 className="font-display font-bold text-sm text-white truncate">{item.title}</h4>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-accent border border-white/5 transition-colors"
                  title="Edit visual"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 border border-white/5 transition-colors"
                  title="Delete visual"
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
