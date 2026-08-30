'use client'
import { useState, useEffect } from 'react'
import { ReleaseGallery } from '../releases/ReleaseGallery'
import { Reveal } from '../motion/Reveal'
import { Disc3 } from 'lucide-react'

export function BandStory() {
  const [story, setStory] = useState({
    hero_image: '/images/band/full-members.webp',
    tagline: 'INDONESIAN SURF ROCK',
    story_p1:
      'Formed in Bekasi on August 25, 2024. Channeling coastal folklore, sharp social satire, youth freedom, and karma through high-octane reverb twangs and crashing wave rhythms.',
  })

  useEffect(() => {
    fetch('/api/story')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setStory({
            hero_image: data.data.hero_image || '/images/band/full-members.webp',
            tagline: data.data.tagline || 'INDONESIAN SURF ROCK',
            story_p1: data.data.story_p1 || story.story_p1,
          })
        }
      })
      .catch((err) => console.error('Failed to load story:', err))
  }, [])

  return (
    <section
      id="story"
      className="relative py-20 sm:py-28 px-4 sm:px-8 md:px-12 bg-[#090d14] border-b border-white/5 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <Reveal direction="up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/8">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-accent uppercase tracking-widest mb-2">
                <Disc3 size={13} />
                <span>02 // CHRONICLE &amp; MUSIC</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tighter uppercase text-white leading-none">
                THE BAND &amp; RELEASES
              </h2>
            </div>
          </div>
        </Reveal>

        {/* 2-col: Band intro left, releases right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Band Hero + Text */}
          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.1}>
              <div className="rounded-2xl overflow-hidden border border-white/8 bg-surface shadow-xl group">
                <div className="aspect-[4/3] w-full overflow-hidden bg-background">
                  <img
                    src={story.hero_image}
                    alt="Reiten Drei Full Members"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 sm:p-6 space-y-2">
                  <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-widest block">
                    INDONESIAN SURF ROCK
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight uppercase">
                    REITEN DREI
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed font-light">
                    {story.story_p1}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: Release Gallery */}
          <div className="lg:col-span-7">
            <ReleaseGallery />
          </div>
        </div>
      </div>
    </section>
  )
}
