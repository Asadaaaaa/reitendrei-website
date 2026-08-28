import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/animations'
import { Reveal } from '../motion/Reveal'

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const line1Ref = useRef<HTMLDivElement | null>(null)
  const line2Ref = useRef<HTMLDivElement | null>(null)
  const line3Ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Scrub animations for dynamic typographic kinetic motion
      gsap.fromTo(
        line1Ref.current,
        { x: -60, opacity: 0.2 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: line1Ref.current,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      )

      gsap.fromTo(
        line2Ref.current,
        { x: 60, opacity: 0.2 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: line2Ref.current,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      )

      gsap.fromTo(
        line3Ref.current,
        { scale: 0.9, opacity: 0.3 },
        {
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: line3Ref.current,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative py-28 md:py-40 px-6 sm:px-8 md:px-12 bg-background border-b border-white/5 overflow-hidden"
    >
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <Reveal direction="up" className="mb-12 md:mb-20">
          <div className="flex items-center gap-4 font-mono text-xs text-accent">
            <span className="w-8 h-[1px] bg-accent" />
            <span className="tracking-widest uppercase font-bold">MANIFESTO // 01</span>
          </div>
        </Reveal>

        {/* Large Typography Layout */}
        <div className="space-y-6 md:space-y-12 select-none">
          <div ref={line1Ref} className="font-display font-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl leading-none tracking-tighter text-foreground uppercase">
            WE PLAY <span className="text-stroke hover:text-accent">SURF ROCK</span>
          </div>

          <div ref={line2Ref} className="font-mono font-medium text-lg sm:text-2xl md:text-4xl text-muted tracking-widest uppercase pl-4 sm:pl-12 border-l-2 border-accent">
            TO TALK ABOUT
          </div>

          <div
            ref={line3Ref}
            className="font-display font-black text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] leading-[0.85] tracking-tighter uppercase space-y-2 md:space-y-4"
          >
            <div className="text-foreground transition-all duration-500 hover:translate-x-4">
              PEOPLE.
            </div>
            <div className="text-sky-400 transition-all duration-500 hover:translate-x-4">
              NATURE.
            </div>
            <div className="text-accent transition-all duration-500 hover:translate-x-4">
              KARMA.
            </div>
          </div>
        </div>

        {/* Footnote statement */}
        <Reveal direction="up" delay={0.2} className="mt-16 md:mt-24 pt-12 border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 font-mono text-xs text-muted/60 uppercase tracking-widest">
              SONIC PHILOSOPHY
            </div>
            <div className="md:col-span-8 text-base sm:text-xl md:text-2xl text-foreground/90 font-light leading-relaxed">
              Surf rock is not just about sunny beaches; for Reiten Drei, it is a high-velocity vessel for social critique, raw self-reflection, and coastal folklore translated into electrifying Indonesian energy.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
