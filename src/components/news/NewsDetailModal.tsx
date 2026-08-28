import { Modal } from '../ui/Modal'
import type { NewsItem } from '../../data/news'
import { Calendar, ExternalLink, Sparkles } from 'lucide-react'

interface NewsDetailModalProps {
  news: NewsItem | null
  isOpen: boolean
  onClose: () => void
}

export function NewsDetailModal({ news, isOpen, onClose }: NewsDetailModalProps) {
  if (!news) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="4xl">
      {/* Banner Image */}
      <div className="relative aspect-[16/8] w-full overflow-hidden bg-background rounded-t-2xl">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1420] via-transparent to-black/20 pointer-events-none" />

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-full bg-accent text-white font-mono text-[10px] font-bold tracking-widest uppercase shadow-lg shadow-accent/30">
            {news.category}
          </span>
        </div>
      </div>

      {/* Detail Content */}
      <div className="p-5 sm:p-8 space-y-5">
        <div className="space-y-1.5">
          {news.date && (
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-white/40">
              <Calendar size={12} className="text-accent" />
              <span>{news.date}</span>
            </div>
          )}
          <h3 className="font-display font-black text-xl sm:text-3xl text-white tracking-tight uppercase leading-tight">
            {news.title}
          </h3>
        </div>

        {/* Description Box */}
        <div className="p-4 sm:p-5 rounded-xl bg-white/3 border border-white/5 space-y-2">
          <div className="flex items-center gap-2 font-mono text-[10px] text-sky-400">
            <Sparkles size={13} />
            <span className="uppercase tracking-widest font-bold">FULL OVERVIEW</span>
          </div>
          <p className="text-sm text-white/80 leading-relaxed">
            {news.description || news.shortDescription}
          </p>
        </div>

        {/* CTA Button */}
        {news.ctaUrl && (
          <div className="flex justify-end pt-1">
            <a
              href={news.ctaUrl}
              target={news.ctaUrl.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-accent/25"
            >
              <span>{news.ctaLabel || 'EXPLORE NOW'}</span>
              <ExternalLink size={13} />
            </a>
          </div>
        )}
      </div>
    </Modal>
  )
}
