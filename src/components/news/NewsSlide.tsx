import type { NewsItem } from '../../data/news'
import { Calendar } from 'lucide-react'

interface NewsSlideProps {
  item: NewsItem
  isActive: boolean
}

export function NewsSlide({ item, isActive }: NewsSlideProps) {
  return (
    <div
      className={`absolute inset-0 select-none group cursor-pointer transition-all duration-700 ease-in-out ${
        isActive
          ? 'opacity-100 pointer-events-auto z-10'
          : 'opacity-0 pointer-events-none z-0'
      }`}
      data-cursor="drag"
    >
      {/* Background Banner Image - Static, no zoom */}
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover"
      />

      {/* Gradient Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7 md:p-9 z-10">
        {/* Top Meta Row */}
        <div className="flex items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full bg-accent text-white font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-md shadow-accent/20">
            {item.category}
          </span>
          {item.date && (
            <div className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-white/80 bg-background/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <Calendar size={11} className="text-accent" />
              <span>{item.date}</span>
            </div>
          )}
        </div>

        {/* Bottom: Smaller Title + Description revealed on hover */}
        <div className="space-y-1 sm:space-y-2 max-w-2xl pb-4 sm:pb-3">
          <h3 className="font-display font-black text-lg sm:text-xl md:text-2xl lg:text-3xl text-white tracking-tight uppercase leading-tight group-hover:text-accent transition-colors duration-300">
            {item.title}
          </h3>

          {/* Description: Hidden by default, smoothly reveals on hover */}
          {(item.shortDescription || item.description) && (
            <div className="max-h-0 opacity-0 group-hover:max-h-36 group-hover:opacity-100 transition-all duration-500 ease-out overflow-hidden">
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed line-clamp-3 font-light pt-1.5">
                {item.shortDescription || item.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
