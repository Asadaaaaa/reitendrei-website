import { useState } from 'react'
import { releases, type Release } from '../../data/releases'
import { ReleaseCard } from './ReleaseCard'
import { ReleaseDetailModal } from './ReleaseDetailModal'
import { Reveal } from '../motion/Reveal'
import { Disc3 } from 'lucide-react'

export function ReleaseGallery() {
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null)

  return (
    <div id="releases" className="space-y-5">
      {/* Sub-header */}
      <Reveal direction="up">
        <div className="flex items-center justify-between pb-4 border-b border-white/8">
          <div className="flex items-center gap-2 font-mono text-[10px] text-accent uppercase tracking-widest">
            <Disc3 size={13} />
            <span>DISCOGRAPHY // RELEASES</span>
          </div>
          <span className="font-mono text-[10px] text-white/30">
            {releases.length} SINGLES
          </span>
        </div>
      </Reveal>

      {/* Symmetrical Grid of Artwork Cards — 2 cols with items-stretch */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 items-stretch">
        {releases.map((release, idx) => (
          <Reveal key={release.id} direction="up" delay={idx * 0.1} className="h-full">
            <ReleaseCard
              release={release}
              onSelect={(rel) => setSelectedRelease(rel)}
            />
          </Reveal>
        ))}
      </div>

      <ReleaseDetailModal
        release={selectedRelease}
        isOpen={!!selectedRelease}
        onClose={() => setSelectedRelease(null)}
      />
    </div>
  )
}
