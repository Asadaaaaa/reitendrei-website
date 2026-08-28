import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/animations'

interface TextRevealProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span'
  delay?: number
  stagger?: number
  mode?: 'lines' | 'words' | 'chars'
}

export function TextReveal({
  text,
  className = '',
  as: Component = 'div',
  delay = 0,
  stagger = 0.05,
  mode = 'words',
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    const items = el.querySelectorAll('.reveal-unit')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        {
          y: '110%',
          opacity: 0,
          rotateZ: 2,
        },
        {
          y: '0%',
          opacity: 1,
          rotateZ: 0,
          duration: 0.9,
          stagger,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [delay, stagger, mode, text])

  if (mode === 'words') {
    const words = text.split(' ')
    return (
      <Component ref={containerRef as any} className={`overflow-hidden ${className}`}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-top">
            <span className="reveal-unit inline-block will-change-transform">{word}</span>
          </span>
        ))}
      </Component>
    )
  }

  // Lines mode: splits on \n
  const lines = text.split('\n')
  return (
    <Component ref={containerRef as any} className={`overflow-hidden ${className}`}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <div className="reveal-unit will-change-transform">{line}</div>
        </div>
      ))}
    </Component>
  )
}
