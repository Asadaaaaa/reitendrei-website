import { Reveal } from '../motion/Reveal'
import { Parallax } from '../motion/Parallax'
import { ReleaseArtwork } from './ReleaseArtwork'
import { SpotifyEmbed } from './SpotifyEmbed'
import { ExternalLink, Sparkles, Radio } from 'lucide-react'
import type { Release } from '../../data/releases'
import { MagneticButton } from '../ui/MagneticButton'

interface ReleaseSceneProps {
  release: Release
  index: number
}

export function ReleaseScene({ release, index }: ReleaseSceneProps) {
  const isEven = index % 2 === 1

  return (
    <article
      id={release.id}
      className="relative py-24 md:py-36 px-6 sm:px-8 md:px-12 border-b border-white/5 overflow-hidden"
      style={{
        backgroundImage: release.bgGradient,
      }}
    >
      {/* Background chapter marker */}
      <div className="absolute top-10 right-10 text-[18vw] font-display font-black text-white/[0.03] select-none pointer-events-none leading-none">
        {release.number}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Chapter Header */}
        <Reveal direction="up">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-12 border-b border-white/10">
            <div className="flex items-center gap-3 font-mono text-xs text-accent">
              <span className="px-2.5 py-1 rounded bg-accent/15 border border-accent/30 font-bold">
                CHAPTER // {release.number}
              </span>
              <span className="text-white/80 font-semibold tracking-widest uppercase">
                OFFICIAL SINGLE
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-muted">
              <span>YEAR: {release.year}</span>
              <span>GENRE: SURF ROCK</span>
            </div>
          </div>
        </Reveal>

        {/* Content Split: Typography & Story + Artwork & Player */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center`}>
          {/* Text Information Column */}
          <div className={`space-y-8 lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
            <Reveal direction="up" delay={0.1}>
              <div className="space-y-3">
                <span className="text-xs sm:text-sm font-mono tracking-widest text-muted uppercase">
                  {release.subtitle}
                </span>
                <h3 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tighter uppercase text-white leading-none">
                  {release.title}
                </h3>
              </div>
            </Reveal>

            {/* Song Narrative Description */}
            <Reveal direction="up" delay={0.2}>
              <div className="p-6 rounded-2xl bg-surface/60 border border-white/10 backdrop-blur-sm space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs text-sky-400">
                  <Sparkles size={14} />
                  <span className="uppercase tracking-widest font-bold">NARRATIVE CONCEPT</span>
                </div>
                <p className="text-base sm:text-lg text-foreground/90 leading-relaxed">
                  {release.description}
                </p>
                <div className="pt-3 border-t border-white/10">
                  <span className="text-[11px] font-mono text-accent font-semibold uppercase block mb-1">
                    SONIC SIGNATURE
                  </span>
                  <p className="text-xs sm:text-sm text-muted">
                    {release.sonicCharacter}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Thematic Tags */}
            <Reveal direction="up" delay={0.3}>
              <div className="space-y-3">
                <span className="text-xs font-mono text-muted/60 uppercase tracking-widest block">
                  EXPLORED THEMES
                </span>
                <div className="flex flex-wrap gap-2">
                  {release.themes.map((theme) => (
                    <span
                      key={theme}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-white/80 hover:border-accent/50 hover:text-accent transition-colors"
                    >
                      #{theme}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* External Direct Links */}
            <Reveal direction="up" delay={0.4}>
              <div className="flex items-center gap-4 pt-2">
                <MagneticButton strength={15}>
                  <a
                    href={release.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-accent hover:text-white border border-white/15 text-white font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md"
                    data-cursor="listen"
                  >
                    <span>OPEN IN SPOTIFY</span>
                    <ExternalLink size={14} />
                  </a>
                </MagneticButton>
              </div>
            </Reveal>
          </div>

          {/* Artwork & Live Spotify Player Column */}
          <div className={`space-y-8 lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
            <Parallax speed={0.15}>
              <ReleaseArtwork release={release} />
            </Parallax>

            {/* Spotify Embedded Player */}
            <Reveal direction="scale" delay={0.25} className="w-full max-w-md mx-auto">
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-[11px] text-muted px-1">
                  <span className="flex items-center gap-1 text-accent font-semibold">
                    <Radio size={12} className="animate-pulse" /> DIRECT STREAM
                  </span>
                  <span>SPOTIFY PLAYER</span>
                </div>
                <SpotifyEmbed trackId={release.spotifyTrackId} title={`${release.title} - Reiten Drei`} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </article>
  )
}
