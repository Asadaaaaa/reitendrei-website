'use client'
import { members } from '../../data/members'
import { Reveal } from '../motion/Reveal'
import { Users } from 'lucide-react'

export function MembersGallery() {
  return (
    <section
      id="members"
      className="relative py-20 sm:py-28 px-4 sm:px-8 md:px-12 bg-[#080c13] border-b border-white/5 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <Reveal direction="up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/8">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-accent uppercase tracking-widest mb-2">
                <Users size={13} />
                <span>04 // PERSONNEL</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tighter uppercase text-white leading-none">
                THE BAND MEMBERS
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/40 max-w-xs leading-relaxed flex-shrink-0">
              5-piece surf rock unit from Bekasi, Indonesia.
            </p>
          </div>
        </Reveal>

        {/* Symmetrical 5-Member Grid — 2-col mobile, 3-col tablet, 5-col desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 items-stretch">
          {members.map((member, idx) => (
            <Reveal key={member.id} direction="up" delay={idx * 0.06} className="h-full">
              <div className="group relative rounded-2xl overflow-hidden bg-surface border border-white/8 p-3 sm:p-3.5 flex flex-col justify-between h-full hover:border-accent/40 transition-all duration-500 shadow-xl hover:-translate-y-1">
                {/* Fixed Ratio 4:5 Portrait */}
                <div>
                  <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-background mb-3 shrink-0">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-black/10 opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Instrument badge */}
                    <div className="absolute bottom-2.5 left-2.5 z-10">
                      <span className="px-2.5 py-0.5 rounded-md bg-accent/90 text-white font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-md">
                        {member.instrument}
                      </span>
                    </div>
                  </div>

                  {/* Name & Role */}
                  <div className="space-y-0.5 min-h-[48px] sm:min-h-[54px] flex flex-col justify-start">
                    <div className="font-mono text-[10px] text-white/40 uppercase tracking-wide truncate">
                      {member.role}
                    </div>
                    <h3 className="font-display font-black text-xs sm:text-sm md:text-base text-white tracking-tight uppercase group-hover:text-accent transition-colors duration-200 leading-snug line-clamp-2">
                      {member.name}
                    </h3>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
