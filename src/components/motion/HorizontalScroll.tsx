'use client'
import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from '../../lib/animations'

interface HorizontalScrollProps {
  children: ReactNode
  className?: string
}

export function HorizontalScroll({ children, className = '' }: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Desktop/larger screens GSAP pinning
    const mm = gsap.matchMedia()

    mm.add('(min-width: 769px)', () => {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 120)

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${Math.max(window.innerHeight * 2, track.scrollWidth - window.innerWidth + 200)}`,
          invalidateOnRefresh: true,
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })

    return () => {
      mm.revert()
    }
  }, [])

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={trackRef}
        className="flex md:flex-row flex-col md:h-screen h-auto items-center md:items-stretch will-change-transform"
      >
        {children}
      </div>
    </div>
  )
}
