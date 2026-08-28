import { Reveal } from '../motion/Reveal'
import { MagneticButton } from '../ui/MagneticButton'
import { Disc3, ArrowUpRight, Waves } from 'lucide-react'
import { socials } from '../../data/socials'

export function FinalCTA() {
  const instagram = socials.find((s) => s.type === 'instagram')
  const spotify = socials.find((s) => s.type === 'spotify')

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-12 bg-gradient-to-b from-background via-[#0b111b] to-background border-b border-white/5 overflow-hidden">
      {/* Ambient center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/12 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <Reveal direction="up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-white/10 text-accent font-mono text-[11px] font-bold uppercase tracking-widest mb-2">
            <Waves size={13} />
            <span>JOIN THE SURF FREQUENCY</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight uppercase text-white leading-none mt-4">
            YOU HEARD THE WAVE.
            <br />
            <span className="text-stroke hover:text-accent transition-colors">NOW FOLLOW IT.</span>
          </h2>
        </Reveal>

        <Reveal direction="up" delay={0.12}>
          <p className="text-sm sm:text-base text-white/40 max-w-md mx-auto leading-relaxed">
            Stay updated with raw rehearsal sessions, upcoming gigs, new music drops, and behind-the-scenes visual archives.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.22}>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            {spotify && (
              <MagneticButton strength={20}>
                <a
                  href={spotify.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-xl shadow-accent/30 hover:shadow-accent/50"
                  data-cursor="listen"
                >
                  <Disc3 size={16} className="animate-spin" style={{ animationDuration: '4s' }} />
                  <span>STREAM ON SPOTIFY</span>
                  <ArrowUpRight size={14} />
                </a>
              </MagneticButton>
            )}

            {instagram && (
              <MagneticButton strength={20}>
                <a
                  href={instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-surface hover:bg-card border border-white/10 hover:border-white/30 text-white font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-lg"
                  data-cursor="link"
                >
                  <svg className="w-3.5 h-3.5 text-accent fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>FOLLOW INSTAGRAM</span>
                  <ArrowUpRight size={14} className="text-white/40" />
                </a>
              </MagneticButton>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
