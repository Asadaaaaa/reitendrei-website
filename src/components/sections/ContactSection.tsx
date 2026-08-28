import { useState } from 'react'
import { socials, contactInfo } from '../../data/socials'
import { Reveal } from '../motion/Reveal'
import { useLenis } from '../../hooks/useLenis'
import { MagneticButton } from '../ui/MagneticButton'
import { Mail, ArrowUpRight, ArrowUp, Copy, Check } from 'lucide-react'

export function ContactSection() {
  const { scrollTo } = useLenis()
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <footer id="contact" className="relative bg-[#05070a] pt-28 pb-16 px-6 sm:px-8 md:px-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-accent/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-24">
        {/* Contact Header & Call to Action */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <Reveal direction="up">
              <div className="flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-widest">
                <Mail size={14} />
                <span>BOOKING & INQUIRIES</span>
              </div>
              <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tighter uppercase text-white mt-3">
                LET'S MAKE WAVES TOGETHER
              </h2>
              <p className="text-muted text-base sm:text-lg max-w-lg mt-4 leading-relaxed">
                For gigs, press releases, music licensing, and collaborations, reach out directly through email or our official social channels.
              </p>
            </Reveal>

            {/* Email Box */}
            <Reveal direction="up" delay={0.2}>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-surface border border-white/15 hover:border-accent text-white font-mono text-sm sm:text-base font-bold transition-all shadow-xl hover:shadow-accent/20"
                  data-cursor="link"
                >
                  <Mail size={18} className="text-accent" />
                  <span>{contactInfo.email}</span>
                  <ArrowUpRight size={18} className="text-muted" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-5 py-4 rounded-2xl bg-card border border-white/10 hover:border-white/30 text-white/80 hover:text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check size={16} className="text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </Reveal>
          </div>

          {/* Social Channels List */}
          <div className="lg:col-span-5 space-y-4">
            <Reveal direction="left" delay={0.1}>
              <span className="font-mono text-xs text-muted/60 uppercase tracking-widest block mb-4">
                OFFICIAL CHANNELS
              </span>
            </Reveal>

            <div className="space-y-3">
              {socials.map((social, idx) => (
                <Reveal key={social.name} direction="up" delay={0.1 + idx * 0.05}>
                  <MagneticButton strength={15} className="w-full">
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-5 rounded-2xl bg-surface/50 border border-white/5 hover:border-accent/50 hover:bg-surface transition-all duration-300 w-full"
                      data-cursor="link"
                    >
                      <div className="space-y-1">
                        <div className="font-display font-bold text-lg text-white group-hover:text-accent transition-colors">
                          {social.name.toUpperCase()}
                        </div>
                        <div className="font-mono text-xs text-muted">
                          {social.handle}
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-accent group-hover:bg-accent/10 flex items-center justify-center text-muted group-hover:text-accent transition-all">
                        <ArrowUpRight size={18} />
                      </div>
                    </a>
                  </MagneticButton>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Minimal Footer as specified in Plan.md Section 27 */}
        <div className="border-t border-white/10 pt-16 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-3">
              <span className="font-display font-black text-3xl sm:text-4xl text-white tracking-widest block">
                REITEN DREI
              </span>
              <div className="font-mono text-xs text-muted space-y-1">
                <div className="text-accent font-semibold">SURF ROCK</div>
                <div>BEKASI, INDONESIA</div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-6 sm:gap-8 font-mono text-xs uppercase tracking-wider text-muted">
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
                className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-surface/60 hover:border-accent hover:text-accent text-xs font-mono text-muted uppercase tracking-widest transition-all"
                data-cursor="pointer"
              >
                <span>BACK TO TOP</span>
                <ArrowUp size={14} />
              </button>
            </MagneticButton>
          </div>

          {/* Copyright & Signoff */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[11px] text-muted/60 border-t border-white/5 pt-8">
            <div>© {new Date().getFullYear()} REITEN DREI. ALL RIGHTS RESERVED.</div>
            <div>SURF ROCK FROM BEKASI, INDONESIA</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
