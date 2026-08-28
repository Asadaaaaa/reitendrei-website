import { SmoothScroll } from './components/motion/SmoothScroll'
import { CustomCursor } from './components/ui/CustomCursor'
import { Navbar } from './components/navigation/Navbar'
import { NewsHeroSection } from './components/hero/NewsHeroSection'
import { BandStory } from './components/band/BandStory'
import { LiveGallery } from './components/gallery/LiveGallery'
import { MembersGallery } from './components/members/MembersGallery'
import { FinalCTA } from './components/cta/FinalCTA'
import { ContactSection } from './components/contact/ContactSection'

export function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-background text-foreground relative selection:bg-accent selection:text-white">
        {/* Analog Film Grain Texture Overlay */}
        <div className="film-grain" aria-hidden="true" />

        {/* Desktop Cinematic Custom Cursor */}
        <CustomCursor />

        {/* Fixed Header Navigation */}
        <Navbar />

        {/* Main Content Sections - Revised Gallery First Hierarchy */}
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
      </div>
    </SmoothScroll>
  )
}

export default App
