'use client'
import { useState } from 'react'
import { socials } from '../../data/socials'
import { contactData } from '../../data/contact'
import { Reveal } from '../motion/Reveal'
import { useLenis } from '../../hooks/useLenis'
import { MagneticButton } from '../ui/MagneticButton'
import { Mail, ArrowUpRight, ArrowUp, Copy, Check, Sparkles } from 'lucide-react'

export function ContactSection() {
  const { scrollTo } = useLenis()
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactData.email)
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
                <span>{contactData.label}</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tighter uppercase text-white mt-2 leading-none">
                {contactData.heading}
              </h2>
              <p className="text-sm text-white/40 max-w-md mt-3 leading-relaxed font-light">
                {contactData.description}
              </p>
            </Reveal>

            {/* Email Action Row */}
            <Reveal direction="up" delay={0.15}>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${contactData.email}`}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-surface border border-white/10 hover:border-accent text-white font-mono text-sm font-bold transition-all shadow-lg hover:shadow-accent/20"
                  data-cursor="link"
                >
                  <Mail size={16} className="text-accent flex-shrink-0" />
                  <span>{contactData.email}</span>
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
              <div className="flex items-center gap-2 font-mono text-[11px] text-white/30">
                <Sparkles size={12} className="text-sky-400" />
                <span>CONTACT PERSON: {contactData.contactPerson}</span>
              </div>
            </Reveal>
          </div>

          {/* Right: Social Channels */}
          <div className="lg:col-span-5 space-y-3">
            <Reveal direction="left" delay={0.1}>
              <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest block mb-3">
                OFFICIAL CHANNELS
              </span>
            </Reveal>

            <div className="space-y-2">
              {socials.map((social, idx) => (
                <Reveal key={social.name} direction="up" delay={0.1 + idx * 0.05}>
                  <MagneticButton strength={12} className="w-full">
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 rounded-xl bg-surface/40 border border-white/5 hover:border-accent/40 hover:bg-surface transition-all duration-300 w-full"
                      data-cursor="link"
                    >
                      <div className="space-y-0.5">
                        <div className="font-display font-bold text-base text-white group-hover:text-accent transition-colors">
                          {social.name.toUpperCase()}
                        </div>
                        <div className="font-mono text-[11px] text-white/30">
                          {social.handle}
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-white/8 group-hover:border-accent group-hover:bg-accent/10 flex items-center justify-center text-white/30 group-hover:text-accent transition-all flex-shrink-0">
                        <ArrowUpRight size={15} />
                      </div>
                    </a>
                  </MagneticButton>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/8 pt-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            {/* Brand Block */}
            <div className="space-y-2">
              <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-widest block">
                REITEN DREI
              </span>
              <div className="font-mono text-[11px] text-white/30 space-y-0.5">
                <div className="text-accent font-semibold">{contactData.genre.toUpperCase()}</div>
                <div>{contactData.origin.toUpperCase()}</div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-4 sm:gap-6 font-mono text-[11px] uppercase tracking-wider text-white/60">
              {socials.map((social) => (
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
