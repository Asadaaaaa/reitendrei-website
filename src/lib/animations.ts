import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }

/**
 * Standard animation timings & eases tailored for Reiten Drei cinematic feel
 */
export const CINEMATIC_EASE = 'power3.out'
export const EXPO_EASE = 'power4.out'
export const SLOW_EASE = 'sine.out'

/**
 * Split text utility into span words / characters
 */
export function splitWords(text: string): string[] {
  return text.split(' ')
}
