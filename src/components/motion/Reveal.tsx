import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from '../../lib/animations'

interface RevealProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'clip'
  delay?: number
  duration?: number
  distance?: number
  threshold?: number
}

export function Reveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 1.1,
  distance = 50,
  threshold = 0.15,
}: RevealProps) {
  const elRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1, clipPath: 'none' })
      return
    }

    const ctx = gsap.context(() => {
      let initialVars: gsap.TweenVars = { opacity: 0 }
      let targetVars: gsap.TweenVars = {
        opacity: 1,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: `top ${100 - threshold * 100}%`,
          toggleActions: 'play none none none',
          once: true,
        },
      }

      switch (direction) {
        case 'up':
          initialVars = { ...initialVars, y: distance }
          targetVars = { ...targetVars, y: 0 }
          break
        case 'down':
          initialVars = { ...initialVars, y: -distance }
          targetVars = { ...targetVars, y: 0 }
          break
        case 'left':
          initialVars = { ...initialVars, x: distance }
          targetVars = { ...targetVars, x: 0 }
          break
        case 'right':
          initialVars = { ...initialVars, x: -distance }
          targetVars = { ...targetVars, x: 0 }
          break
        case 'scale':
          initialVars = { ...initialVars, scale: 0.88, y: 20 }
          targetVars = { ...targetVars, scale: 1, y: 0 }
          break
        case 'clip':
          initialVars = { ...initialVars, clipPath: 'inset(100% 0 0 0)' }
          targetVars = { ...targetVars, clipPath: 'inset(0% 0 0 0)', ease: 'power4.out', duration: duration * 1.2 }
          break
      }

      gsap.fromTo(el, initialVars, targetVars)
    }, elRef)

    return () => ctx.revert()
  }, [direction, delay, duration, distance, threshold])

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  )
}
