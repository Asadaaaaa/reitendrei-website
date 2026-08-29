'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/animations'
import { socials } from '../../data/socials'
import { X, ExternalLink, ArrowRight } from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (target: string) => void
}

export function MobileMenu({ isOpen, onClose, onNavigate }: MobileMenuProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const linksRef = useRef<HTMLDivElement | null>(null)

  const navItems = [
    { label: 'LATEST NEWS', target: '#news', number: '01' },
    { label: 'STORY & RELEASES', target: '#story', number: '02' },
    { label: 'LIVE GALLERY', target: '#gallery', number: '03' },
    { label: 'BAND MEMBERS', target: '#members', number: '04' },
    { label: 'CONTACT & BOOKINGS', target: '#contact', number: '05' },
  ]

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(
        el.querySelectorAll('.mobile-nav-item'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power3.out', delay: 0.05 }
      )
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClick = (target: string) => {
    onClose()
    setTimeout(() => {
      onNavigate(target)
    }, 200)
  }

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 bg-background/98 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-12 overflow-y-auto transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
      }`}
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border/40 pb-6">
        <div className="flex items-center">
          <img
            src="/images/brand/logo.webp"
            alt="Reiten Drei Logo"
            className="h-10 w-auto object-contain"
          />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-3 rounded-full border border-border text-foreground hover:text-accent hover:border-accent transition-colors"
          aria-label="Close Navigation Menu"
        >
          <X size={24} />
        </button>
      </div>

      {/* Main navigation list */}
      <div ref={linksRef} className="py-8 space-y-3 sm:space-y-5">
        {navItems.map((item) => (
          <div key={item.target} className="mobile-nav-item overflow-hidden">
            <button
              type="button"
              onClick={() => handleClick(item.target)}
              className="group flex items-baseline justify-between w-full text-left py-2 border-b border-white/5 hover:border-accent/40 transition-all"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-accent font-bold">{item.number}</span>
                <span className="font-display text-xl sm:text-3xl font-extrabold tracking-tight text-foreground group-hover:text-accent group-hover:translate-x-2 transition-all duration-300">
                  {item.label}
                </span>
              </div>
              <ArrowRight
                size={18}
                className="text-muted group-hover:text-accent group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100"
              />
            </button>
          </div>
        ))}
      </div>

      {/* Bottom socials & info */}
      <div className="mobile-nav-item border-t border-border/40 pt-6 space-y-4">
        <div className="flex flex-wrap gap-4 text-xs font-mono">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-muted hover:text-accent uppercase tracking-wider transition-colors"
            >
              {social.name} <ExternalLink size={12} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
