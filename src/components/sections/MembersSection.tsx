import { members } from '../../data/members'
import { Reveal } from '../motion/Reveal'
import { Parallax } from '../motion/Parallax'
import { Users, Music, Drum, Mic, Guitar } from 'lucide-react'

export function MembersSection() {
  const getInstrumentIcon = (instrument: string) => {
    switch (instrument.toLowerCase()) {
      case 'drum':
        return <Drum size={18} className="text-accent" />
      case 'bass':
        return <Music size={18} className="text-sky-400" />
      case 'guitar':
        return <Guitar size={18} className="text-amber-400" />
      case 'vocal':
        return <Mic size={18} className="text-rose-400" />
      default:
        return <Music size={18} className="text-accent" />
    }
  }

  return (
    <section id="members" className="relative py-28 md:py-40 px-6 sm:px-8 md:px-12 bg-[#090d14] border-b border-white/5 overflow-hidden">
      {/* Background glowing aura */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <Reveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-widest mb-3">
                <Users size={16} />
                <span>PERSONNEL // LINEUP</span>
              </div>
              <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tighter uppercase text-white">
                THE BAND MEMBERS
              </h2>
            </div>
            <p className="text-sm md:text-base text-muted max-w-md">
              Four individuals converging from Bekasi, weaving surf twangs, rhythmic tide, and raw vocal storytelling.
            </p>
          </div>
        </Reveal>

        {/* Editorial Asymmetric Member Grid */}
        <div className="mt-16 md:mt-24 space-y-16 md:space-y-24">
          {members.map((member, idx) => {
            const isOdd = idx % 2 === 1
            return (
              <div
                key={member.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Visual Portrait Container */}
                <div
                  className={`lg:col-span-5 ${
                    isOdd ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <Parallax speed={0.1}>
                    <div
                      className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-3xl overflow-hidden bg-surface border border-white/15 shadow-2xl group"
                      data-cursor="view"
                    >
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-surface/40 to-transparent z-10" />

                      {/* Editorial Portrait Placeholder Illustration */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-[#0e1622] group-hover:scale-105 transition-transform duration-700">
                        <div className="w-24 h-24 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-6 shadow-inner">
                          {getInstrumentIcon(member.instrument)}
                        </div>
                        <span className="font-display font-black text-4xl sm:text-5xl text-white/20 select-none tracking-tight">
                          {member.instrument.toUpperCase()}
                        </span>
                        <span className="font-mono text-[10px] tracking-widest text-muted/60 uppercase mt-2">
                          PORTRAIT // ARCHIVE 2024
                        </span>
                      </div>

                      {/* Member Info Overlay on Card Bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20 space-y-2">
                        <div className="flex items-center justify-between font-mono text-xs text-white/80">
                          <span className="text-accent font-bold">MEMBER {member.number}</span>
                          <span className="uppercase text-[10px] tracking-widest bg-white/10 px-2 py-0.5 rounded">
                            {member.instrument}
                          </span>
                        </div>
                        <div className="font-display font-extrabold text-xl sm:text-2xl text-white leading-tight">
                          {member.name}
                        </div>
                      </div>
                    </div>
                  </Parallax>
                </div>

                {/* Member Editorial Detail Text */}
                <div
                  className={`lg:col-span-7 space-y-6 ${
                    isOdd ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <Reveal direction="up" delay={0.1}>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-3xl sm:text-4xl font-black text-accent/50">
                        {member.number}
                      </span>
                      <div className="h-0.5 flex-1 bg-white/10" />
                    </div>
                  </Reveal>

                  <Reveal direction="up" delay={0.15}>
                    <div className="space-y-1">
                      <span className="font-mono text-xs text-muted uppercase tracking-widest">
                        {member.role}
                      </span>
                      <h3 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase leading-none">
                        {member.name}
                      </h3>
                    </div>
                  </Reveal>

                  <Reveal direction="up" delay={0.2}>
                    <blockquote className="p-6 rounded-2xl bg-surface/50 border-l-4 border-accent text-base sm:text-lg text-foreground/90 italic font-light">
                      "{member.quote}"
                    </blockquote>
                  </Reveal>

                  <Reveal direction="up" delay={0.25}>
                    <div className="space-y-2">
                      <span className="font-mono text-[11px] text-accent uppercase tracking-widest font-semibold block">
                        SONIC ROLE & DYNAMICS
                      </span>
                      <p className="text-sm sm:text-base text-muted leading-relaxed">
                        {member.focus}
                      </p>
                    </div>
                  </Reveal>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
