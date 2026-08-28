import { Navbar } from '@/components/navigation/Navbar'
import { NewsHeroSection } from '@/components/hero/NewsHeroSection'
import { BandStory } from '@/components/band/BandStory'
import { LiveGallery } from '@/components/gallery/LiveGallery'
import { MembersGallery } from '@/components/members/MembersGallery'
import { FinalCTA } from '@/components/cta/FinalCTA'
import { ContactSection } from '@/components/contact/ContactSection'

export default function Home() {
  return (
    <>
      {/* Header Navigation */}
      <Navbar />

      {/* Main Content Sections — 6-Section Visual Archive */}
      <main>
        {/* 01. News / Program Banner Slider + Right Side Socials & Now Announcement */}
        <NewsHeroSection />

        {/* 02. Band Story + Releases Artwork Gallery */}
        <BandStory />

        {/* 03. Live Performance Gallery */}
        <LiveGallery />

        {/* 04. Band Members Editorial Gallery */}
        <MembersGallery />

        {/* 05. Final High-Impact CTA */}
        <FinalCTA />

        {/* 06. Contact Person & Minimal Footer */}
        <ContactSection />
      </main>
    </>
  )
}
