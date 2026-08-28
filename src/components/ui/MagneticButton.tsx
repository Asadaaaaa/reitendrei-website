'use client'
import { useRef, type ReactNode, type MouseEvent } from 'react'
import { gsap } from '../../lib/animations'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  href?: string
  target?: string
  rel?: string
  'data-cursor'?: string
}

export function MagneticButton({
  children,
  className = '',
  strength = 25,
  onClick,
  href,
  target,
  rel,
  'data-cursor': dataCursor = 'pointer',
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement | null>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = buttonRef.current
    if (!el) return

    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const { clientX, clientY } = e
    const { left, top, width, height } = el.getBoundingClientRect()

    const x = (clientX - (left + width / 2)) / (width / 2)
    const y = (clientY - (top + height / 2)) / (height / 2)

    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    const el = buttonRef.current
    if (!el) return

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.4)',
    })
  }

  const content = (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block will-change-transform ${className}`}
      data-cursor={dataCursor}
    >
      {children}
    </div>
  )

  if (href) {
    return (
      <a href={href} target={target} rel={rel} onClick={onClick} className="inline-block">
        {content}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className="inline-block border-none bg-transparent p-0">
      {content}
    </button>
  )
}
