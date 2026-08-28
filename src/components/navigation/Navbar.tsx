'use client'
import { useState, useEffect } from 'react'
import { useLenis } from '../../hooks/useLenis'
import { MobileMenu } from './MobileMenu'
import { Menu, Music2 } from 'lucide-react'
import { MagneticButton } from '../ui/MagneticButton'

export function Navbar() {
  const { scrollTo } = useLenis()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (target: string) => {
    scrollTo(target, { offset: -20 })
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/85 backdrop-blur-md border-b border-white/5 py-4'
            : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex items-center justify-between">
          {/* Logo & Brand */}
          <MagneticButton strength={15}>
            <button
              type="button"
              onClick={() => scrollTo(0)}
              className="flex items-center gap-3 text-left group"
              data-cursor="pointer"
            >
              <img
                src="/images/brand/logo.webp"
                alt="Reiten Drei Logo"
                className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-display font-black tracking-widest text-base md:text-lg text-white leading-none group-hover:text-accent transition-colors">
                REITEN DREI
              </span>
            </button>
          </MagneticButton>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Main Navigation">
            <button
              type="button"
              onClick={() => handleNavClick('#story')}
              className="text-xs font-mono font-semibold tracking-widest text-foreground/80 hover:text-accent uppercase transition-colors"
              data-cursor="pointer"
            >
              STORY &amp; MUSIC
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('#gallery')}
              className="text-xs font-mono font-semibold tracking-widest text-foreground/80 hover:text-accent uppercase transition-colors"
              data-cursor="pointer"
            >
              GALLERY
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('#members')}
              className="text-xs font-mono font-semibold tracking-widest text-foreground/80 hover:text-accent uppercase transition-colors"
              data-cursor="pointer"
            >
              MEMBERS
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('#contact')}
              className="text-xs font-mono font-semibold tracking-widest text-foreground/80 hover:text-accent uppercase transition-colors"
              data-cursor="pointer"
            >
              CONTACT
            </button>
          </nav>

          {/* Right Action / Status Beacon */}
          <div className="hidden md:flex items-center gap-4">
            <MagneticButton strength={20}>
              <button
                type="button"
                onClick={() => handleNavClick('#releases')}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-accent/40 bg-accent/10 hover:bg-accent hover:text-white text-accent text-xs font-mono font-semibold tracking-wider transition-all duration-300 shadow-sm hover:shadow-accent/30"
                data-cursor="listen"
              >
                <Music2 size={14} className="animate-pulse text-accent group-hover:text-white" />
                <span>STREAM SINGLES</span>
              </button>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 rounded-lg border border-border bg-surface/60 text-foreground hover:text-accent hover:border-accent transition-all"
              aria-label="Open Navigation Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavigate={handleNavClick}
      />
    </>
  )
}
