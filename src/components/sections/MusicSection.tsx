import { releases } from '../../data/releases'
import { ReleaseScene } from '../releases/ReleaseScene'
import { Reveal } from '../motion/Reveal'
import { Waves } from 'lucide-react'

export function MusicSection() {
  return (
    <section id="music" className="relative bg-background">
      {/* Section Global Intro Header */}
      <div className="pt-24 pb-12 px-6 sm:px-8 md:px-12 border-b border-white/5 max-w-7xl mx-auto">
        <Reveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-widest mb-3">
                <Waves size={16} />
                <span>DISCOGRAPHY // SINGLES</span>
              </div>
              <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tighter uppercase text-white">
                MUSIC RELEASES
              </h2>
            </div>
            <p className="text-sm md:text-base text-muted max-w-md">
              Stream official singles directly or explore the narratives behind each release.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Render Releases Data-Drivingly */}
      <div className="divide-y divide-white/5">
        {releases.map((release, idx) => (
          <ReleaseScene key={release.id} release={release} index={idx} />
        ))}
      </div>
    </section>
  )
}
