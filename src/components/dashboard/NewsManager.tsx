'use client'
import { useState, useEffect } from 'react'
import { FileUploader } from './FileUploader'
import { Plus, Edit2, Trash2, Check, AlertCircle, Eye, EyeOff, Save, X } from 'lucide-react'

export interface NewsItemRecord {
  id: string
  category: string
  title: string
  date: string | null
  short_description: string | null
  description: string | null
  image: string
  cta_label: string | null
  cta_url: string | null
  active: number
  order_index: number
}

export function NewsManager() {
  const [items, setItems] = useState<NewsItemRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [activeItem, setActiveItem] = useState<Partial<NewsItemRecord>>({})
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const fetchNews = async () => {
    try {
      const res = await fetch('/api/news')
      const data = await res.json()
      if (res.ok) setItems(data.data)
    } catch (err: unknown) {
      console.error('Fetch news error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const handleOpenCreate = () => {
    setActiveItem({
      category: 'ANNIVERSARY',
      title: '',
      date: 'August 2026',
      short_description: '',
      description: '',
      image: '',
      cta_label: 'View Details',
      cta_url: '#',
      active: 1,
      order_index: items.length,
    })
    setIsEditing(true)
  }

  const handleOpenEdit = (item: NewsItemRecord) => {
    setActiveItem({ ...item })
    setIsEditing(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setFeedback(null)

    if (!activeItem.title || !activeItem.category || !activeItem.image) {
      setFeedback({ type: 'error', message: 'Title, Category, and Image are required.' })
      return
    }

    try {
      const isUpdate = !!activeItem.id && items.some((it) => it.id === activeItem.id)
      const url = isUpdate ? `/api/news/${activeItem.id}` : '/api/news'
      const method = isUpdate ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activeItem),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save news item')

      setFeedback({ type: 'success', message: 'News item saved successfully!' })
      setIsEditing(false)
      fetchNews()
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      setFeedback({ type: 'error', message: errorMsg })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this update item?')) return

    try {
      const res = await fetch(`/api/news/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      setFeedback({ type: 'success', message: 'Item deleted.' })
      fetchNews()
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
            Section 1: Updates &amp; Announcements
          </h2>
          <p className="text-xs font-mono text-white/50">
            Manage slides, headlines, event announcements, and media banners on the top slider.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-slate-950 font-mono text-xs font-black uppercase tracking-wider hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20"
        >
          <Plus size={15} />
          <span>Add New Update</span>
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
            <h3 className="font-display font-bold text-base text-accent uppercase">
              {activeItem.id ? 'Edit Update Slide' : 'Create New Update Slide'}
            </h3>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="p-1 text-white/40 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-white/70 uppercase">Category Tag</label>
                <input
                  type="text"
                  required
                  value={activeItem.category || ''}
                  onChange={(e) => setActiveItem({ ...activeItem, category: e.target.value })}
                  placeholder="e.g. ANNIVERSARY / LIVE EVENT / SINGLE"
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-white/70 uppercase">Event Date / Label</label>
                <input
                  type="text"
                  value={activeItem.date || ''}
                  onChange={(e) => setActiveItem({ ...activeItem, date: e.target.value })}
                  placeholder="e.g. 29 August 2026"
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-white/70 uppercase">Title</label>
              <input
                type="text"
                required
                value={activeItem.title || ''}
                onChange={(e) => setActiveItem({ ...activeItem, title: e.target.value })}
                placeholder="Headline title"
                className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm font-display font-bold text-white focus:outline-none focus:border-accent"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-white/70 uppercase">Short Description (Slide Hover)</label>
              <textarea
                rows={2}
                value={activeItem.short_description || ''}
                onChange={(e) => setActiveItem({ ...activeItem, short_description: e.target.value })}
                placeholder="Short summary displayed on slider hover..."
                className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-accent"
              />
            </div>

            {/* Media Upload (UUID storage) */}
            <FileUploader
              value={activeItem.image || ''}
              onChange={(url) => setActiveItem({ ...activeItem, image: url })}
              label="Banner Image or Video"
              helperText="Upload image/video saved to /storage as UUID. Recommended ratio: 16:9 landscape."
            />

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer font-mono text-xs text-white/80">
                <input
                  type="checkbox"
                  checked={Boolean(activeItem.active)}
                  onChange={(e) => setActiveItem({ ...activeItem, active: e.target.checked ? 1 : 0 })}
                  className="w-4 h-4 rounded bg-black/40 border-white/20 text-accent focus:ring-accent"
                />
                <span>Active on live slider</span>
              </label>
            </div>

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
                <span>Save Update</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Items List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="p-8 text-center font-mono text-xs text-white/40">Loading items from SQLite...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center font-mono text-xs text-white/40 border border-dashed border-white/10 rounded-2xl">
            No updates found in database. Click &quot;Add New Update&quot; to create one.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-surface/60 border border-white/8 hover:border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-16 h-12 rounded-lg bg-black/60 border border-white/10 overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-accent/20 text-accent font-mono text-[9px] font-bold uppercase">
                      {item.category}
                    </span>
                    {item.date && (
                      <span className="font-mono text-[10px] text-white/40">{item.date}</span>
                    )}
                    {item.active ? (
                      <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-400">
                        <Eye size={10} /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[9px] font-mono text-white/30">
                        <EyeOff size={10} /> Hidden
                      </span>
                    )}
                  </div>
                  <h4 className="font-display font-bold text-sm text-white truncate">{item.title}</h4>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-accent border border-white/5 transition-colors"
                  title="Edit item"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 border border-white/5 transition-colors"
                  title="Delete item"
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
