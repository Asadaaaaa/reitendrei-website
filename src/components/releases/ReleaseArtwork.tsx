import { Waves, Disc3, Flame } from 'lucide-react'
import type { Release } from '../../data/releases'

interface ReleaseArtworkProps {
  release: Release
  className?: string
}

export function ReleaseArtwork({ release, className = '' }: ReleaseArtworkProps) {
  const isSanur = release.coverType === 'sanur'

  return (
    <div
      className={`relative aspect-square w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-surface group select-none ${className}`}
      data-cursor="view"
    >
      {/* Vinyl record peek out effect on hover */}
      <div className="absolute top-1/2 -right-8 md:-right-12 -translate-y-1/2 w-4/5 h-4/5 rounded-full bg-[#111] border-4 border-[#222] shadow-2xl flex items-center justify-center -z-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-6 md:group-hover:translate-x-10 transition-all duration-700 ease-out">
        <div className="w-24 h-24 rounded-full border-2 border-white/20 flex items-center justify-center bg-accent/20">
          <Disc3 size={32} className="text-white/60 animate-spin" style={{ animationDuration: '6s' }} />
        </div>
      </div>

      {/* Main Sleeve Artwork Container */}
      <div className="relative z-10 w-full h-full p-6 sm:p-8 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#101722] via-[#0d131a] to-[#070a0e]">
        {/* Abstract Artwork Visuals */}
        {isSanur ? (
          // Sanur Visual (Sea, waves, talisman, coastal karma)
          <div className="absolute inset-0 pointer-events-none opacity-85">
            <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="sanurGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#0369a1" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#080b0e" stopOpacity="0.8" />
                </linearGradient>
                <radialGradient id="talismanGlow" cx="50%" cy="40%" r="50%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="400" height="400" fill="url(#sanurGrad)" />
              <circle cx="200" cy="160" r="100" fill="url(#talismanGlow)" />
              
              {/* Crashing Surf Waves Vector */}
              <path
                d="M-20 280 Q 80 200, 180 260 T 380 230 T 450 300 L 450 420 L -20 420 Z"
                fill="#0369a1"
                opacity="0.5"
              />
              <path
                d="M-20 310 Q 100 240, 200 290 T 400 270 T 450 340 L 450 420 L -20 420 Z"
                fill="#0284c7"
                opacity="0.6"
              />
              <path
                d="M-20 340 Q 60 300, 160 330 T 360 310 T 450 360 L 450 420 L -20 420 Z"
                fill="#0c4a6e"
                opacity="0.9"
              />

              {/* Talisman / Karma Symbol */}
              <circle cx="200" cy="160" r="40" stroke="#38bdf8" strokeWidth="3" fill="none" opacity="0.8" />
              <circle cx="200" cy="160" r="22" stroke="#7dd3fc" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
              <polygon points="200,130 225,175 175,175" stroke="#f0f9ff" strokeWidth="2" fill="rgba(56, 189, 248, 0.2)" />
            </svg>
          </div>
        ) : (
          // BADJINGAN Visual (Satirical Shrimp-head, fiery coral, punk energy)
          <div className="absolute inset-0 pointer-events-none opacity-90">
            <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="badjinganGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff4d29" stopOpacity="0.4" />
                  <stop offset="60%" stopColor="#b91c1c" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#07090e" stopOpacity="0.85" />
                </linearGradient>
                <radialGradient id="shrimpGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff5733" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#ff4d29" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="400" height="400" fill="url(#badjinganGrad)" />
              <circle cx="200" cy="190" r="110" fill="url(#shrimpGlow)" />

              {/* Satirical Shrimp Head Illustration Path */}
              <g transform="translate(130, 100) scale(0.7)">
                {/* Shrimp Antennae */}
                <path d="M70 40 C30 -20, 10 -40, -10 -50" stroke="#ff8c69" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M120 40 C170 -20, 200 -30, 230 -40" stroke="#ff8c69" strokeWidth="4" fill="none" strokeLinecap="round" />
                
                {/* Shrimp Carapace Head */}
                <path
                  d="M50 140 C40 80, 70 30, 100 20 C130 30, 160 80, 150 140 C130 180, 70 180, 50 140 Z"
                  fill="#ff4d29"
                  stroke="#fff"
                  strokeWidth="3"
                />
                
                {/* Shrimp Eyes */}
                <circle cx="75" cy="65" r="10" fill="#fff" />
                <circle cx="75" cy="65" r="5" fill="#07090e" />
                <circle cx="125" cy="65" r="10" fill="#fff" />
                <circle cx="125" cy="65" r="5" fill="#07090e" />

                {/* Sharp Satirical Smile / Mouth */}
                <path d="M75 125 Q 100 150, 125 125" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
                <polygon points="90,126 100,138 110,126" fill="#fff" />
              </g>

              {/* Distorted noise lines */}
              <line x1="20" y1="340" x2="380" y2="340" stroke="#ff4d29" strokeWidth="2" strokeDasharray="10 5" opacity="0.6" />
              <line x1="40" y1="355" x2="360" y2="355" stroke="#fff" strokeWidth="1" strokeDasharray="5 5" opacity="0.4" />
            </svg>
          </div>
        )}

        {/* Sleeve Top Info Header */}
        <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-white/70">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-white/10 font-bold text-white tracking-widest">
              RD-{release.number}
            </span>
            <span className="uppercase tracking-widest text-muted">{release.year}</span>
          </div>
          <div className="flex items-center gap-1">
            {isSanur ? <Waves size={14} className="text-sky-400" /> : <Flame size={14} className="text-accent" />}
            <span className="uppercase tracking-wider font-semibold text-white/90">
              {isSanur ? 'SANUR COAST' : 'SATIRE // VOL.1'}
            </span>
          </div>
        </div>

        {/* Sleeve Center Branding Badge */}
        <div className="relative z-10 text-center my-auto py-8">
          <div className="inline-block px-4 py-1 rounded-full border border-white/20 bg-background/60 backdrop-blur-md font-mono text-[10px] uppercase tracking-widest text-white/90 mb-3">
            {isSanur ? 'SURF ROCK • SPIRITUAL KARMA' : 'SURF ROCK • SHARP SATIRE'}
          </div>
          <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight uppercase drop-shadow-md">
            {release.title}
          </h3>
        </div>

        {/* Sleeve Bottom Meta */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] font-mono text-muted/80">
          <span>REITEN DREI DISCOGRAPHY</span>
          <span className="text-white font-bold">STEREO / 45 RPM</span>
        </div>
      </div>
    </div>
  )
}
