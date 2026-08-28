import { socials } from '../../data/socials'
import { ArrowUpRight } from 'lucide-react'

export function ConnectList() {
  return (
    <div className="p-5 rounded-2xl bg-surface/60 border border-white/8 space-y-3">
      <div className="flex items-center justify-between pb-3 border-b border-white/8">
        <span className="font-mono text-[10px] text-accent font-bold tracking-widest uppercase">
          CONNECT
        </span>
        <span className="font-mono text-[10px] text-white/30">CHANNELS</span>
      </div>

      <nav className="space-y-0.5" aria-label="Social Links">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between py-2 px-2 rounded-xl hover:bg-white/5 text-foreground/70 hover:text-accent transition-all duration-200"
            data-cursor="link"
          >
            <span className="font-mono text-xs font-semibold tracking-wide">
              {social.name.toUpperCase()}
            </span>
            <ArrowUpRight
              size={12}
              className="text-white/30 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0"
            />
          </a>
        ))}
      </nav>
    </div>
  )
}
