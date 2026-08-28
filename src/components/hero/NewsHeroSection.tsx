import { NewsSlider } from '../news/NewsSlider'
import { ConnectList } from '../sidebar/ConnectList'
import { NowAnnouncement } from '../sidebar/NowAnnouncement'
import { Reveal } from '../motion/Reveal'
import { Waves } from 'lucide-react'

export function NewsHeroSection() {
  return (
    <section
      id="news"
      className="relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-8 md:px-12 bg-background overflow-hidden border-b border-white/5"
    >
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-accent/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-sky-500/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Minimal Editorial Header */}
        <Reveal direction="down">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/8">
            <div className="flex items-center gap-2.5">
              <span className="font-display font-black text-xl sm:text-2xl text-white tracking-widest">
                REITEN DREI
              </span>
              <span className="h-4 w-px bg-white/20" />
              <div className="flex items-center gap-1.5 font-mono text-xs text-accent">
                <Waves size={13} />
                <span className="tracking-widest uppercase font-semibold">DIGITAL ARCHIVE</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Main Grid: Slider left, Sidebar right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
          {/* News Slider — 8 cols desktop */}
          <div className="lg:col-span-8">
            <Reveal direction="up" delay={0.1}>
              <NewsSlider />
            </Reveal>
          </div>

          {/* Right Sidebar — 4 cols desktop, stacked below on mobile */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Reveal direction="up" delay={0.2}>
              <NowAnnouncement />
            </Reveal>
            <Reveal direction="up" delay={0.3}>
              <ConnectList />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
