'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { NewsManager } from '@/components/dashboard/NewsManager'
import { ReleasesManager } from '@/components/dashboard/ReleasesManager'
import { MembersManager } from '@/components/dashboard/MembersManager'
import { GalleryManager } from '@/components/dashboard/GalleryManager'
import { StoryManager } from '@/components/dashboard/StoryManager'
import { SettingsManager } from '@/components/dashboard/SettingsManager'
import {
  Sparkles,
  Radio,
  Disc3,
  Users,
  Camera,
  BookOpen,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
} from 'lucide-react'

type TabType = 'news' | 'releases' | 'gallery' | 'members' | 'story' | 'settings'

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>('news')
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [user, setUser] = useState<{ id: number; username: string } | null>(null)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me')
        const data = await res.json()
        if (!res.ok || !data.authenticated) {
          router.push('/login')
        } else {
          setUser(data.user)
        }
      } catch {
        router.push('/login')
      } finally {
        setIsCheckingAuth(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
    } catch {
      router.push('/login')
    }
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center font-mono text-xs text-white/50">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span>VERIFYING ADMINISTRATOR SESSION...</span>
        </div>
      </div>
    )
  }

  const tabs: { id: TabType; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { id: 'news', label: 'Updates & News', icon: Radio },
    { id: 'releases', label: 'Music Singles', icon: Disc3 },
    { id: 'gallery', label: 'Visual Gallery', icon: Camera },
    { id: 'members', label: 'Band Members', icon: Users },
    { id: 'story', label: 'Band Story', icon: BookOpen },
    { id: 'settings', label: 'Contact & Socials', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col">
      {/* Top Bar Header */}
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-3 group">
              <img
                src="/images/brand/logo.webp"
                alt="Reiten Drei"
                className="h-8 w-auto object-contain"
              />
              <span className="font-display font-black text-sm tracking-tight uppercase text-white group-hover:text-accent transition-colors hidden sm:inline-block">
                CMS DASHBOARD
              </span>
            </a>

            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-[10px] font-bold uppercase">
              <ShieldCheck size={12} />
              <span>LOGGED IN AS: {user?.username || 'ADMIN'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-mono text-xs uppercase transition-colors border border-white/5"
            >
              <span>View Website</span>
              <ExternalLink size={12} />
            </a>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 font-mono text-xs font-bold uppercase transition-colors border border-red-500/20"
            >
              <LogOut size={13} />
              <span>Sign Out</span>
            </button>

            <button
              type="button"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="p-2 rounded-xl bg-white/5 md:hidden text-white/70 hover:text-white"
            >
              {isMobileNavOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar Nav */}
        <aside
          className={`w-full md:w-64 flex-shrink-0 space-y-1 bg-surface/60 md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none border md:border-none border-white/10 ${
            isMobileNavOpen ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest px-3 mb-2 font-bold">
            SECTIONS &amp; CONTENT
          </div>
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id)
                  setIsMobileNavOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all text-left ${
                  isActive
                    ? 'bg-accent text-slate-950 shadow-lg shadow-accent/20 font-black'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </aside>

        {/* Content Area */}
        <main className="flex-1 w-full min-w-0">
          {activeTab === 'news' && <NewsManager />}
          {activeTab === 'releases' && <ReleasesManager />}
          {activeTab === 'gallery' && <GalleryManager />}
          {activeTab === 'members' && <MembersManager />}
          {activeTab === 'story' && <StoryManager />}
          {activeTab === 'settings' && <SettingsManager />}
        </main>
      </div>
    </div>
  )
}
