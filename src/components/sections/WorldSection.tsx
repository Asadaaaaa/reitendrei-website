import { useEffect, useRef } from 'react'
import { galleryItems } from '../../data/gallery'
import { gsap } from '../../lib/animations'
import { ArrowRight, Layers } from 'lucide-react'

export function WorldSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 769px)', () => {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 100)

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth + 800}`,
          invalidateOnRefresh: true,
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })

    return () => mm.revert()
  }, [])

  const getToneGradients = (tone: string) => {
    switch (tone) {
      case 'ocean':
        return 'from-sky-900/40 via-sky-800/10 to-[#0c121d]'
      case 'asphalt':
        return 'from-amber-900/40 via-amber-800/10 to-[#120f0d]'
      case 'myth':
        return 'from-cyan-900/40 via-cyan-800/10 to-[#0b151e]'
      case 'satire':
        return 'from-rose-900/40 via-rose-800/10 to-[#1b0d0d]'
      case 'band':
        return 'from-orange-900/40 via-orange-800/10 to-[#160f0d]'
      default:
        return 'from-surface via-card to-background'
    }
  }

  return (
    <section
      id="world"
      ref={sectionRef}
      className="relative bg-[#06080d] border-b border-white/5 overflow-hidden"
    >
      {/* Mobile Header (Sticky/Static on small screens) */}
      <div className="md:hidden pt-20 px-6 pb-6">
        <div className="flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-widest mb-2">
          <Layers size={14} />
          <span>VISUAL ARCHIVE</span>
        </div>
        <h2 className="font-display font-black text-4xl uppercase text-white">
          THE WORLD OF REITEN DREI
        </h2>
        <p className="text-sm text-muted mt-2">
          Scroll down to explore the visual landscape and creative dimensions.
        </p>
      </div>

      {/* Horizontal Track Container */}
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row md:h-screen h-auto md:items-center px-6 sm:px-8 md:px-16 py-12 md:py-0 gap-8 md:gap-12 will-change-transform"
      >
        {/* Intro Card inside horizontal flow for Desktop */}
        <div className="hidden md:flex flex-col justify-between w-[450px] shrink-0 p-12 rounded-3xl bg-surface/80 border border-white/10 h-[520px]">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-widest mb-4">
              <Layers size={16} />
              <span>HORIZON // 04</span>
            </div>
            <h2 className="font-display font-black text-5xl uppercase text-white leading-tight">
              THE WORLD OF REITEN DREI
            </h2>
            <p className="text-sm text-muted mt-6 leading-relaxed">
              An immersive panorama capturing the sounds, folklore, coastal myths, suburban asphalt origins, and satirical rebellion that define our universe.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-accent">
            <span>SCROLL TO TRAVERSE</span>
            <ArrowRight size={16} className="animate-pulse" />
          </div>
        </div>

        {/* Gallery Visual Slides */}
        {galleryItems.map((item, idx) => (
          <div
            key={item.id}
            className="w-full md:w-[480px] shrink-0 h-[480px] md:h-[520px] rounded-3xl overflow-hidden border border-white/15 bg-surface relative flex flex-col justify-between p-8 sm:p-10 shadow-2xl group transition-transform duration-500 hover:-translate-y-2"
            data-cursor="drag"
          >
            {/* Ambient tone gradient background */}
            <div
              className={`absolute inset-0 bg-gradient-to-b ${getToneGradients(
                item.tone
              )} opacity-80 group-hover:opacity-100 transition-opacity duration-500`}
            />

            {/* Subtle grid pattern background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[size:24px_24px] pointer-events-none" />

            {/* Top Slide Meta */}
            <div className="relative z-10 flex items-center justify-between font-mono text-xs text-white/80">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 font-bold uppercase tracking-wider">
                {item.tag}
              </span>
              <span className="text-muted">{item.year}</span>
            </div>

            {/* Center Big Abstract Visual Number */}
            <div className="relative z-10 my-auto py-6">
              <span className="text-[120px] font-display font-black leading-none text-white/[0.07] block select-none group-hover:text-white/[0.12] transition-colors">
                0{idx + 1}
              </span>
              <div className="font-mono text-xs text-sky-400 tracking-widest uppercase mb-1">
                {item.subtitle}
              </div>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase group-hover:text-accent transition-colors duration-300">
                {item.title}
              </h3>
            </div>

            {/* Bottom Description */}
            <div className="relative z-10 border-t border-white/10 pt-4">
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
