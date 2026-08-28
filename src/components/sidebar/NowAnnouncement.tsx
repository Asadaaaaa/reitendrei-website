import { currentAnnouncement } from '../../data/announcements'
import { ArrowRight, Flame } from 'lucide-react'

export function NowAnnouncement() {
  return (
    <a
      href={currentAnnouncement.href || '#releases'}
      className="block p-5 rounded-2xl bg-gradient-to-br from-card via-surface to-[#160d0b] border border-white/8 hover:border-accent/40 transition-all duration-300 group shadow-lg"
      data-cursor="view"
    >
      {/* Label Row */}
      <div className="flex items-center justify-between pb-3 border-b border-white/8">
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-accent font-bold tracking-widest uppercase">
          <Flame size={12} className="animate-pulse" />
          <span>{currentAnnouncement.label}</span>
        </div>
        {currentAnnouncement.date && (
          <span className="font-mono text-[10px] text-white/30 uppercase">
            {currentAnnouncement.date}
          </span>
        )}
      </div>

      {/* Title */}
      <div className="pt-3 space-y-1">
        <h4 className="font-display font-black text-base sm:text-lg text-white tracking-tight uppercase leading-tight group-hover:text-accent transition-colors line-clamp-2">
          {currentAnnouncement.title}
        </h4>
        {currentAnnouncement.subtitle && (
          <p className="font-mono text-[10px] text-white/40 tracking-wider uppercase line-clamp-1">
            {currentAnnouncement.subtitle}
          </p>
        )}
      </div>

      {/* CTA */}
      <div className="pt-3 flex items-center gap-1.5 font-mono text-xs text-accent font-semibold">
        <span>EXPLORE</span>
        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </a>
  )
}
