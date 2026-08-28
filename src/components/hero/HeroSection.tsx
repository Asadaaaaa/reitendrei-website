import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/animations'
import { useLenis } from '../../hooks/useLenis'
import { MagneticButton } from '../ui/MagneticButton'
import { Disc3, ArrowDown, Waves } from 'lucide-react'

export function HeroSection() {
  const { scrollTo } = useLenis()
  const sectionRef = useRef<HTMLElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const visualRef = useRef<HTMLDivElement | null>(null)
  const detailsRef = useRef<HTMLDivElement | null>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '.hero-tag',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          '.hero-title-letter',
          { y: 120, opacity: 0, rotateZ: 4 },
          { y: 0, opacity: 1, rotateZ: 0, duration: 1.1, stagger: 0.04 },
          '-=0.5'
        )
        .fromTo(
          visualRef.current,
          { scale: 0.9, opacity: 0, y: 40 },
          { scale: 1, opacity: 1, y: 0, duration: 1.2 },
          '-=0.8'
        )
        .fromTo(
          detailsRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        )

      // Subtle parallax on scroll
      gsap.to(visualRef.current, {
        y: 120,
        scale: 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.to(titleRef.current, {
        y: -60,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const titleChars = 'REITEN DREI'.split('')

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 sm:px-8 md:px-12 overflow-hidden bg-gradient-to-b from-background via-[#080d14] to-background"
    >
      {/* Dynamic ambient lights in background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[300px] bg-sky-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Top Header Tag */}
      <div className="hero-tag flex flex-wrap items-center justify-between gap-4 max-w-7xl mx-auto w-full pt-4 border-t border-white/5">
        <div className="flex items-center gap-2 font-mono text-xs text-accent">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span className="tracking-widest uppercase font-bold">EST. 25 AUGUST 2024</span>
        </div>
        <div className="flex items-center gap-6 font-mono text-xs text-muted">
          <span>ORIGIN: BEKASI, INDONESIA</span>
          <span className="hidden sm:inline">GENRE: SURF ROCK / GARAGE</span>
        </div>
      </div>

      {/* Center Big Typography & Visual Stage */}
      <div className="my-auto py-8 max-w-7xl mx-auto w-full flex flex-col items-center justify-center relative">
        {/* Massive Headline */}
        <h1
          ref={titleRef}
          className="font-display font-black text-[14vw] leading-[0.85] tracking-tight uppercase text-center select-none w-full text-foreground"
          aria-label="Reiten Drei"
        >
          <div className="overflow-hidden flex justify-center flex-wrap">
            {titleChars.map((char, index) => (
              <span
                key={index}
                className={`hero-title-letter inline-block ${char === ' ' ? 'w-[4vw]' : ''} ${
                  index >= 7 ? 'text-accent' : ''
                }`}
              >
                {char}
              </span>
            ))}
          </div>
        </h1>

        {/* Visual Anchor Box / Surfing Energy Graphic */}
        <div
          ref={visualRef}
          className="relative mt-6 md:mt-8 w-full max-w-3xl mx-auto rounded-2xl border border-white/10 bg-surface/70 backdrop-blur-md p-6 sm:p-8 shadow-2xl overflow-hidden group"
          data-cursor="view"
        >
          {/* Subtle noise and gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-sky-500/10 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-accent">
                <Waves size={16} />
                <span className="tracking-widest uppercase font-bold">RAW COASTAL ENERGY</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display tracking-tight text-white">
                WAVE-DRIVEN REVERB & SATIRICAL TRUTH
              </h2>
              <p className="text-xs sm:text-sm text-muted max-w-md">
                Exploring karma, youth rebellion, and human arrogance through crashing guitar twangs, heavy basslines, and unapologetic vocals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col items-center gap-3 shrink-0">
              <MagneticButton strength={15}>
                <button
                  type="button"
                  onClick={() => scrollTo('#music')}
                  className="flex items-center gap-3 px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white font-mono text-xs font-bold tracking-widest uppercase transition-all shadow-lg shadow-accent/25 hover:shadow-accent/40"
                  data-cursor="listen"
                >
                  <Disc3 size={16} className="animate-spin" style={{ animationDuration: '4s' }} />
                  <span>EXPLORE SINGLES</span>
                </button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row Information & Scroll Down Indicator */}
      <div
        ref={detailsRef}
        className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-b border-white/5"
      >
        <div className="flex items-center gap-8 font-mono text-xs">
          <div>
            <span className="text-muted/60 block text-[10px] uppercase">LATEST RELEASES</span>
            <span className="text-white font-bold">02 SINGLES AVAILABLE</span>
          </div>
          <div>
            <span className="text-muted/60 block text-[10px] uppercase">MEMBERS</span>
            <span className="text-white font-bold">4-PIECE ONSLAUGHT</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div ref={scrollIndicatorRef} className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollTo('#manifesto')}
            className="flex items-center gap-2 font-mono text-xs tracking-widest text-muted hover:text-accent uppercase transition-colors group"
            data-cursor="pointer"
          >
            <span>DIVE DEEPER</span>
            <div className="w-6 h-6 rounded-full border border-muted/40 group-hover:border-accent flex items-center justify-center transition-colors">
              <ArrowDown size={12} className="animate-bounce text-accent" />
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}
