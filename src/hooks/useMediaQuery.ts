'use client'
import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQueryList = window.matchMedia(query)
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    setMatches(mediaQueryList.matches)

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', listener)
      return () => mediaQueryList.removeEventListener('change', listener)
    } else {
      // Fallback for older browsers
      mediaQueryList.addListener(listener)
      return () => mediaQueryList.removeListener(listener)
    }
  }, [query])

  return matches
}

export function useIsMobile() {
  return useMediaQuery('(max-width: 768px)')
}

export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
