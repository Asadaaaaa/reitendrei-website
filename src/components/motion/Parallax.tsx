'use client'
import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from '../../lib/animations'

interface ParallaxProps {
  children: ReactNode
  className?: string
  speed?: number // Positive means moves up faster / opposite scroll, negative moves down
  rotationSpeed?: number
  scaleEffect?: boolean
}

export function Parallax({
  children,
  className = '',
  speed = 0.2,
  rotationSpeed = 0,
  scaleEffect = false,
}: ParallaxProps) {
  const elRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    const ctx = gsap.context(() => {
      const distance = speed * 150

      const tweenVars: gsap.TweenVars = {
        y: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }

      if (rotationSpeed !== 0) {
        tweenVars.rotation = rotationSpeed * 15
      }

      if (scaleEffect) {
        tweenVars.scale = 1.08
      }

      gsap.to(el, tweenVars)
    }, elRef)

    return () => ctx.revert()
  }, [speed, rotationSpeed, scaleEffect])

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  )
}
