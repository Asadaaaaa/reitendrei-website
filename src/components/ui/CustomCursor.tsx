'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/animations'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const dotRef = useRef<HTMLDivElement | null>(null)
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'view' | 'listen' | 'drag'>('default')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    // Set initial GSAP transform origins
    gsap.set(cursor, { xPercent: -50, yPercent: -50 })
    gsap.set(dot, { xPercent: -50, yPercent: -50 })

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.25, ease: 'power2.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.25, ease: 'power2.out' })
    const dotXTo = gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'power1.out' })
    const dotYTo = gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'power1.out' })

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true)
      xTo(e.clientX)
      yTo(e.clientY)
      dotXTo(e.clientX)
      dotYTo(e.clientY)

      const target = e.target as HTMLElement | null
      if (!target) return

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor') as any
        setCursorType(type || 'pointer')
      } else if (target.closest('a, button, [role="button"], input, select, textarea')) {
        setCursorType('pointer')
      } else {
        setCursorType('default')
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  if (isTouch) return null

  const getOuterStyles = () => {
    switch (cursorType) {
      case 'view':
        return 'w-20 h-20 bg-accent/90 text-white font-mono font-black text-[11px] tracking-widest border border-white/30 shadow-2xl shadow-accent/50 scale-100'
      case 'listen':
        return 'w-22 h-22 bg-white text-background font-mono font-black text-[11px] tracking-widest border border-white/50 shadow-2xl scale-100'
      case 'drag':
        return 'w-18 h-18 bg-accent/80 text-white font-mono font-bold text-[10px] tracking-widest border border-white/30 scale-100'
      case 'pointer':
        return 'w-12 h-12 bg-accent/20 border-2 border-accent scale-110 shadow-lg shadow-accent/30'
      default:
        return 'w-8 h-8 bg-transparent border border-white/30 scale-100'
    }
  }

  const getLabel = () => {
    switch (cursorType) {
      case 'view':
        return 'VIEW'
      case 'listen':
        return 'PLAY'
      case 'drag':
        return 'SLIDE'
      default:
        return ''
    }
  }

  return (
    <>
      {/* Outer Follower Ring / Pill */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center transition-[width,height,background-color,border-color,transform] duration-200 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${getOuterStyles()}`}
      >
        <span className="uppercase select-none text-center font-mono">
          {getLabel()}
        </span>
      </div>

      {/* Center Precise Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[10000] w-2 h-2 rounded-full bg-accent shadow-sm transition-opacity duration-150 ${
          isVisible && cursorType === 'default' ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  )
}
