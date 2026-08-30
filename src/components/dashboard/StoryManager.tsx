'use client'
import { useState, useEffect } from 'react'
import { FileUploader } from './FileUploader'
import { Check, AlertCircle, Save, Sparkles, BookOpen } from 'lucide-react'

export interface BandStoryRecord {
  id: string
  tagline: string
  hero_image: string
  story_p1: string
  story_p2: string
  quote: string
  quote_author: string
}

export function StoryManager() {
  const [story, setStory] = useState<BandStoryRecord>({
    id: 'main',
    tagline: '',
    hero_image: '',
    story_p1: '',
    story_p2: '',
    quote: '',
    quote_author: '',
  })
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const fetchStory = async () => {
    try {
      const res = await fetch('/api/story')
      const data = await res.json()
      if (res.ok && data.data) {
        setStory(data.data)
      }
    } catch (err: unknown) {
      console.error('Fetch story error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStory()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setFeedback(null)

    try {
      const res = await fetch('/api/story', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(story),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update band story')

      setFeedback({ type: 'success', message: 'Band story updated successfully!' })
      if (data.data) setStory(data.data)
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      setFeedback({ type: 'error', message: errorMsg })
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-4 border-b border-white/10">
        <h2 className="font-display font-black text-xl text-white uppercase tracking-tight">
          Section 2: Band Story, Manifesto &amp; Hero Bio
        </h2>
        <p className="text-xs font-mono text-white/50">
          Manage the overarching band narrative, hero band photo, manifesto tagline, and signature quote.
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
        <div className="p-8 text-center font-mono text-xs text-white/40">Loading band story from SQLite...</div>
      ) : (
        <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl bg-surface/80 border border-white/10 space-y-6 shadow-2xl">
          <div className="space-y-2">
            <label className="block font-mono text-xs text-white/70 uppercase font-semibold">
              Tagline Manifesto (Top Display)
            </label>
            <textarea
              rows={2}
              value={story.tagline || ''}
              onChange={(e) => setStory({ ...story, tagline: e.target.value })}
              placeholder="e.g. BORN IN THE CONCRETE OF BEKASI, RIDING THE ETHEREAL SURF..."
              className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm font-display font-bold text-white focus:outline-none focus:border-accent uppercase tracking-tight leading-snug"
            />
          </div>

          {/* Hero Image */}
          <FileUploader
            value={story.hero_image || ''}
            onChange={(url) => setStory({ ...story, hero_image: url })}
            label="Band Story Main Photo"
            helperText="Uploaded to /storage as UUID. Displays on Section 2 left card."
          />

          <div className="space-y-4 pt-2 border-t border-white/5">
            <div className="flex items-center gap-2 text-xs font-mono text-accent">
              <BookOpen size={14} />
              <span className="font-bold uppercase">Chronicle Bio Paragraphs</span>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-white/60 uppercase">Paragraph 1 (Origins &amp; Sound)</label>
              <textarea
                rows={3}
                value={story.story_p1 || ''}
                onChange={(e) => setStory({ ...story, story_p1: e.target.value })}
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white leading-relaxed focus:outline-none focus:border-accent"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-white/60 uppercase">Paragraph 2 (Narrative &amp; Singles)</label>
              <textarea
                rows={3}
                value={story.story_p2 || ''}
                onChange={(e) => setStory({ ...story, story_p2: e.target.value })}
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white leading-relaxed focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2 border-t border-white/5">
            <div className="flex items-center gap-2 text-xs font-mono text-accent">
              <Sparkles size={14} />
              <span className="font-bold uppercase">Signature Quote Box</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-[11px] font-mono text-white/60 uppercase">Quote</label>
                <input
                  type="text"
                  value={story.quote || ''}
                  onChange={(e) => setStory({ ...story, quote: e.target.value })}
                  placeholder="WE DON’T JUST PLAY SURF ROCK..."
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-white/60 uppercase">Author Attribution</label>
                <input
                  type="text"
                  value={story.quote_author || ''}
                  onChange={(e) => setStory({ ...story, quote_author: e.target.value })}
                  placeholder="REITEN DREI"
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
              <span>Save Band Story</span>
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
