import { useState, useEffect, useRef, useCallback } from 'react'
import { newsItems } from '../../data/news'
import { NewsSlide } from './NewsSlide'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'

export function NewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)

  const activeNews = newsItems.filter((item) => item.active !== false)
  const totalSlides = activeNews.length

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isPaused || prefersReducedMotion || totalSlides <= 1) return
    const interval = setInterval(handleNext, 6000)
    return () => clearInterval(interval)
  }, [isPaused, handleNext, totalSlides])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    setIsPaused(true)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 50) handleNext()
    else if (diff < -50) handlePrev()
    touchStartX.current = null
    setIsPaused(false)
  }

  return (
    <div
      className="relative w-full aspect-[16/11] sm:aspect-[16/9] md:aspect-[21/10] rounded-2xl bg-surface border border-white/10 overflow-hidden shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {activeNews.map((item, idx) => (
        <NewsSlide
          key={item.id}
          item={item}
          isActive={idx === currentIndex}
        />
      ))}

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20">
        <div
          className="h-full bg-accent transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
        />
      </div>

      {/* Navigation Control Bar */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
        <span className="font-mono text-[11px] font-bold text-white/90 tabular-nums">
          {String(currentIndex + 1).padStart(2, '0')}{' '}
          <span className="text-white/40">/ {String(totalSlides).padStart(2, '0')}</span>
        </span>

        <div className="h-3 w-px bg-white/20" />

        <button
          type="button"
          onClick={() => setIsPaused((p) => !p)}
          className="p-1 text-white/60 hover:text-white transition-colors"
          aria-label={isPaused ? 'Resume' : 'Pause'}
        >
          {isPaused ? <Play size={11} /> : <Pause size={11} />}
        </button>

        <div className="h-3 w-px bg-white/20" />

        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={handlePrev}
            className="p-1.5 rounded-md hover:bg-white/10 text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="p-1.5 rounded-md hover:bg-white/10 text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5">
        {activeNews.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? 'w-6 h-1.5 bg-accent'
                : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
