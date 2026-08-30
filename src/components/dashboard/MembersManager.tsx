'use client'
import { useState, useEffect } from 'react'
import { FileUploader } from './FileUploader'
import { Plus, Edit2, Trash2, Check, AlertCircle, Save, X, Users } from 'lucide-react'

export interface MemberRecord {
  id: string
  name: string
  role: string
  instrument: string
  image: string
  bio: string | null
  order_index: number
}

export function MembersManager() {
  const [items, setItems] = useState<MemberRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [activeItem, setActiveItem] = useState<Partial<MemberRecord>>({})
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/members')
      const data = await res.json()
      if (res.ok) setItems(data.data)
    } catch (err: unknown) {
      console.error('Fetch members error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleOpenCreate = () => {
    setActiveItem({
      name: '',
      role: 'GUITAR',
      instrument: 'GUITAR',
      image: '',
      bio: '',
      order_index: items.length,
    })
    setIsEditing(true)
  }

  const handleOpenEdit = (item: MemberRecord) => {
    setActiveItem({ ...item })
    setIsEditing(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setFeedback(null)

    if (!activeItem.name || !activeItem.role || !activeItem.instrument || !activeItem.image) {
      setFeedback({ type: 'error', message: 'Name, Role, Instrument, and Photo are required.' })
      return
    }

    try {
      const isUpdate = !!activeItem.id && items.some((it) => it.id === activeItem.id)
      const url = isUpdate ? `/api/members/${activeItem.id}` : '/api/members'
      const method = isUpdate ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activeItem),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save member')

      setFeedback({ type: 'success', message: 'Member profile saved successfully!' })
      setIsEditing(false)
      fetchMembers()
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      setFeedback({ type: 'error', message: errorMsg })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this band member?')) return

    try {
      const res = await fetch(`/api/members/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      setFeedback({ type: 'success', message: 'Member removed.' })
      fetchMembers()
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
            Section 4: Band Members Lineup
          </h2>
          <p className="text-xs font-mono text-white/50">
            Manage band lineup, portraits, instrument badges, and biographical chronicles.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-slate-950 font-mono text-xs font-black uppercase tracking-wider hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20"
        >
          <Plus size={15} />
          <span>Add New Member</span>
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
              <Users size={18} className="text-accent" />
              <h3 className="font-display font-bold text-base text-accent uppercase">
                {activeItem.id ? 'Edit Member Profile' : 'Add Band Member'}
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
                <label className="text-xs font-mono text-white/70 uppercase">Full Name</label>
                <input
                  type="text"
                  required
                  value={activeItem.name || ''}
                  onChange={(e) => setActiveItem({ ...activeItem, name: e.target.value })}
                  placeholder="e.g. Zein Ahza"
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm font-display font-bold text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-white/70 uppercase">Role</label>
                <input
                  type="text"
                  required
                  value={activeItem.role || ''}
                  onChange={(e) => setActiveItem({ ...activeItem, role: e.target.value })}
                  placeholder="e.g. LEAD VOCALS"
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-white/70 uppercase">Instrument Badge</label>
                <input
                  type="text"
                  required
                  value={activeItem.instrument || ''}
                  onChange={(e) => setActiveItem({ ...activeItem, instrument: e.target.value })}
                  placeholder="e.g. VOCALS, GUITAR, BASS, DRUMS"
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-white/70 uppercase">Bio / Character Note</label>
              <textarea
                rows={2}
                value={activeItem.bio || ''}
                onChange={(e) => setActiveItem({ ...activeItem, bio: e.target.value })}
                placeholder="Brief description of sonic role in the band..."
                className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-accent"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-white/70 uppercase">Display Order (0, 1, 2...)</label>
              <input
                type="number"
                value={activeItem.order_index ?? 0}
                onChange={(e) => setActiveItem({ ...activeItem, order_index: parseInt(e.target.value, 10) || 0 })}
                className="w-24 px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-accent"
              />
            </div>

            {/* Member Photo Upload */}
            <FileUploader
              value={activeItem.image || ''}
              onChange={(url) => setActiveItem({ ...activeItem, image: url })}
              label="Member Portrait Photo"
              helperText="Upload portrait photo saved to /storage as UUID. Recommended aspect: 3:4 portrait."
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
                <span>Save Member</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full p-8 text-center font-mono text-xs text-white/40">Loading members from SQLite...</div>
        ) : items.length === 0 ? (
          <div className="col-span-full p-8 text-center font-mono text-xs text-white/40 border border-dashed border-white/10 rounded-2xl">
            No members found. Click &quot;Add New Member&quot; to create.
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-surface/60 border border-white/8 hover:border-white/20 flex flex-col justify-between gap-4 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-14 h-16 rounded-xl bg-black/60 border border-white/10 overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-accent text-slate-950 font-mono text-[9px] font-black uppercase">
                      {item.instrument}
                    </span>
                    <span className="text-[10px] font-mono text-white/40">#{index + 1}</span>
                  </div>
                  <h4 className="font-display font-black text-sm text-white truncate">{item.name}</h4>
                  <p className="text-[10px] font-mono text-white/50 truncate">{item.role}</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-accent border border-white/5 transition-colors"
                  title="Edit member"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 border border-white/5 transition-colors"
                  title="Delete member"
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
