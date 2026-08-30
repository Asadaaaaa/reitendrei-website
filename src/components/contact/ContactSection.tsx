'use client'
import { useState, useEffect } from 'react'
import { socials as defaultSocials } from '../../data/socials'
import { contactData as defaultContact } from '../../data/contact'
import { Reveal } from '../motion/Reveal'
import { useLenis } from '../../hooks/useLenis'
import { MagneticButton } from '../ui/MagneticButton'
import { Mail, ArrowUpRight, ArrowUp, Copy, Check, Sparkles } from 'lucide-react'

export function ContactSection() {
  const { scrollTo } = useLenis()
  const [copied, setCopied] = useState(false)
  const [contact, setContact] = useState(defaultContact)
  const [socialLinks, setSocialLinks] = useState(defaultSocials)

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          const s = data.data
          if (s.contact_email) {
            setContact((prev) => ({
              ...prev,
              email: s.contact_email,
              description: s.contact_description || prev.description,
            }))
          }
          if (s.instagram_url || s.youtube_url || s.tiktok_url || s.spotify_url) {
            setSocialLinks([
              {
                name: 'Instagram',
                handle: '@reitendrei',
                url: s.instagram_url || 'https://instagram.com/reitendrei',
                type: 'instagram',
                description: 'Visual chronicles, gig announcements & backstage snapshots',
              },
              {
                name: 'YouTube',
                handle: '@reitendreiofficial',
                url: s.youtube_url || 'https://youtube.com/@reitendreiofficial?si=k8AWNngPrkXf3kCk',
                type: 'youtube',
                description: 'Official music videos, live session archives & bootlegs',
              },
              {
                name: 'TikTok',
                handle: '@reiten.drei',
                url: s.tiktok_url || 'https://tiktok.com/@reiten.drei',
                type: 'tiktok',
                description: 'Short-form twang riffs, studio outtakes & surf action',
              },
              {
                name: 'Spotify',
                handle: 'Reiten Drei',
                url: s.spotify_url || 'https://open.spotify.com/track/7e5CxBlmNSDcT5nhwH3Tm2',
                type: 'spotify',
                description: 'Stream our complete single discography',
              },
            ])
          }
        }
      })
      .catch((err) => console.error('Failed to load settings:', err))
  }, [])

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <footer
      id="contact"
      className="relative bg-[#05070a] pt-20 sm:pt-28 pb-12 px-4 sm:px-8 md:px-12 overflow-hidden"
    >
      {/* Ambient bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-accent/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">
          {/* Left: Heading + Email */}
          <div className="lg:col-span-7 space-y-5">
            <Reveal direction="up">
              <div className="flex items-center gap-2 font-mono text-[10px] text-accent uppercase tracking-widest">
                <Mail size={13} />
                <span>{contact.label}</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tighter uppercase text-white mt-2 leading-none">
                {contact.heading}
              </h2>
              <p className="text-sm text-white/50 max-w-md mt-3 leading-relaxed font-light">
                {contact.description}
              </p>
            </Reveal>

            {/* Email Action Row */}
            <Reveal direction="up" delay={0.15}>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-surface border border-white/10 hover:border-accent text-white font-mono text-sm font-bold transition-all shadow-lg hover:shadow-accent/20"
                  data-cursor="link"
                >
                  <Mail size={16} className="text-accent flex-shrink-0" />
                  <span>{contact.email}</span>
                  <ArrowUpRight size={15} className="text-white/30" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-4 py-3 rounded-xl bg-card border border-white/8 hover:border-white/25 text-white/60 hover:text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
                  aria-label="Copy email"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-white/50">
                <Sparkles size={13} className="text-accent" />
                <span>Based in Bekasi, West Java // Available worldwide</span>
              </div>
            </Reveal>
          </div>

          {/* Right: Social & Channel Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {socialLinks.map((social, idx) => (
              <Reveal key={social.name} direction="up" delay={idx * 0.08} className="h-full">
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 rounded-2xl bg-surface border border-white/8 hover:border-accent/40 flex flex-col justify-between h-full transition-all duration-300 shadow-md hover:-translate-y-0.5"
                  data-cursor="link"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-white/40 group-hover:text-accent transition-colors">
                      <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">
                        {social.name}
                      </span>
                      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <div className="font-display font-bold text-sm text-white group-hover:text-accent transition-colors">
                      {social.handle}
                    </div>
                  </div>
                  <p className="text-[11px] text-white/50 leading-normal font-light pt-2 border-t border-white/5 mt-2">
                    {social.description}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-white/8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Brand Logo in Footer */}
            <div className="flex items-center">
              <img
                src="/images/brand/logo.webp"
                alt="Reiten Drei"
                className="h-9 w-auto object-contain"
              />
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-4 sm:gap-6 font-mono text-[11px] uppercase tracking-wider text-white/60">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>

            {/* Back to Top */}
            <MagneticButton strength={20}>
              <button
                type="button"
                onClick={() => scrollTo(0)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-surface/50 hover:border-accent hover:text-accent text-[11px] font-mono text-white/75 uppercase tracking-widest transition-all"
                data-cursor="pointer"
              >
                <span>TOP</span>
                <ArrowUp size={13} />
              </button>
            </MagneticButton>
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-[10px] text-white/50 border-t border-white/5 pt-6">
            <div>© {new Date().getFullYear()} REITEN DREI. ALL RIGHTS RESERVED.</div>
            <div>SURF ROCK DIGITAL ARCHIVE // BEKASI, INDONESIA</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
