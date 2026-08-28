import { Reveal } from '../motion/Reveal'
import { Disc, Calendar, MapPin, Sparkles, Compass } from 'lucide-react'

export function BandStorySection() {
  const pillars = [
    { name: 'FREEDOM', desc: 'Unconstrained expression of raw youth energy and dynamic guitar reverb.' },
    { name: 'SOCIAL CRITICISM', desc: 'Sharp satirical observations challenging hypocrisy and modern greed.' },
    { name: 'NATURE', desc: 'The powerful ebb and flow of ocean tides and coastal mythology.' },
    { name: 'KARMA', desc: 'The inevitable reckoning of human actions, pride, and humility.' },
    { name: 'STORYTELLING', desc: 'Cinematic narrative arcs wrapped inside high-voltage surf rhythms.' },
  ]

  return (
    <section id="story" className="relative py-28 md:py-40 px-6 sm:px-8 md:px-12 bg-[#0a0f17] border-b border-white/5 overflow-hidden">
      {/* Background accents */}
      <div className="absolute -right-20 top-1/3 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <Reveal direction="up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3 font-mono text-xs text-accent uppercase tracking-widest mb-3">
                <Compass size={16} />
                <span>CHRONICLE // ORIGIN</span>
              </div>
              <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tighter uppercase text-white">
                THE BAND STORY
              </h2>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-muted">
              <span className="flex items-center gap-1.5"><Calendar size={14} className="text-accent" /> 25 AUG 2024</span>
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-accent" /> BEKASI, INDONESIA</span>
            </div>
          </div>
        </Reveal>

        {/* Editorial Story Layout */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Big Lead Statement */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal direction="up" delay={0.1}>
              <div className="p-8 rounded-2xl bg-surface/80 border border-white/10 relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 right-0 p-6 opacity-10 text-white pointer-events-none">
                  <Disc size={120} />
                </div>
                <span className="font-mono text-xs text-accent font-bold uppercase tracking-widest block mb-4">
                  OFFICIAL PRESS STATEMENT
                </span>
                <p className="text-xl sm:text-2xl font-display font-bold leading-snug text-white">
                  Reiten Drei is an Indonesian Surf Rock band originating from Bekasi, formed on August 25, 2024.
                </p>
                <div className="mt-6 pt-6 border-t border-white/10 text-sm text-muted leading-relaxed">
                  The band utilizes the vibrant textures and driving rhythms of Surf Rock as a powerful medium for expressing freedom, social criticism, nature, karma, and cinematic storytelling.
                </div>
              </div>
            </Reveal>

            {/* Quick Stats / Identity */}
            <Reveal direction="up" delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-xl bg-card border border-white/5">
                  <span className="text-[10px] font-mono text-muted uppercase block">FOUNDED</span>
                  <span className="text-xl font-display font-black text-white mt-1 block">25.08.2024</span>
                  <span className="text-xs text-muted/70 mt-1 block">Bekasi, West Java</span>
                </div>
                <div className="p-6 rounded-xl bg-card border border-white/5">
                  <span className="text-[10px] font-mono text-muted uppercase block">LINEUP</span>
                  <span className="text-xl font-display font-black text-accent mt-1 block">4 MEMBERS</span>
                  <span className="text-xs text-muted/70 mt-1 block">Drums, Bass, Guitar, Vocals</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Pillars of Expression */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal direction="left" delay={0.15}>
              <div className="space-y-2 mb-8">
                <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                  <Sparkles size={14} />
                  <span className="tracking-widest uppercase">THEMATIC FOUNDATIONS</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white">
                  CORE MEDIUMS OF EXPRESSION
                </h3>
              </div>
            </Reveal>

            <div className="space-y-4">
              {pillars.map((pillar, idx) => (
                <Reveal key={pillar.name} direction="up" delay={0.1 + idx * 0.08}>
                  <div className="group p-6 rounded-xl bg-surface/50 border border-white/5 hover:border-accent/40 hover:bg-surface/80 transition-all duration-300">
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-accent font-bold">0{idx + 1}</span>
                        <h4 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-accent transition-colors">
                          {pillar.name}
                        </h4>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted pl-8 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
