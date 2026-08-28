import type { Release } from '../../data/releases'
import { Disc3, Play } from 'lucide-react'

interface ReleaseCardProps {
  release: Release
  onSelect: (release: Release) => void
}

export function ReleaseCard({ release, onSelect }: ReleaseCardProps) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden bg-surface border border-white/8 p-3 sm:p-4 flex flex-col justify-between h-full cursor-pointer hover:border-accent/50 transition-all duration-500 shadow-xl hover:-translate-y-1"
      onClick={() => onSelect(release)}
      data-cursor="listen"
    >
      {/* Top Half: Fixed Aspect-Square Artwork + Uniform Metadata */}
      <div>
        {/* Artwork Container — square ratio 1:1 */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-background mb-3 shrink-0">
          <img
            src={release.image}
            alt={release.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Play Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center shadow-2xl shadow-accent/50 scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play size={20} className="fill-white translate-x-0.5" />
            </div>
          </div>

          {/* Release badge */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="px-2 py-0.5 rounded-md bg-background/80 backdrop-blur-md text-white font-mono text-[10px] font-bold border border-white/10">
              RD-{release.number}
            </span>
          </div>
        </div>

        {/* Metadata — Fixed uniform min-height for symmetrical alignment */}
        <div className="space-y-1 min-h-[68px] sm:min-h-[74px] flex flex-col justify-start">
          <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
            <span>SURF ROCK</span>
            <span>{release.year}</span>
          </div>
          <h4 className="font-display font-black text-base sm:text-lg text-white tracking-tight uppercase group-hover:text-accent transition-colors duration-200 leading-tight truncate">
            {release.title}
          </h4>
          <p className="text-xs text-white/40 line-clamp-1 font-light">{release.subtitle}</p>
        </div>
      </div>

      {/* Bottom Half: Action Footer */}
      <div className="pt-3 mt-3 border-t border-white/8 flex items-center justify-between font-mono text-xs text-accent shrink-0">
        <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px]">
          <Disc3 size={13} className="group-hover:animate-spin" style={{ animationDuration: '3s' }} />
          <span>LISTEN NOW</span>
        </span>
        <span className="text-white/30 text-[10px]">SPOTIFY ↗</span>
      </div>
    </div>
  )
}
