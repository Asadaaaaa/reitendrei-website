'use client'
import { Modal } from '../ui/Modal'
import type { Member } from '../../data/members'
import { Sparkles, Music } from 'lucide-react'

interface MemberDetailModalProps {
  member: Member | null
  isOpen: boolean
  onClose: () => void
}

export function MemberDetailModal({ member, isOpen, onClose }: MemberDetailModalProps) {
  if (!member) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="4xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 p-5 sm:p-8 items-start">
        {/* Left: Portrait */}
        <div className="md:col-span-4 space-y-3">
          <div className="aspect-[4/5] rounded-xl overflow-hidden border border-white/10 bg-surface shadow-2xl">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between font-mono text-[11px] text-white/40">
            <span className="text-accent font-bold">MEMBER // {member.number}</span>
            <span className="uppercase">{member.instrument}</span>
          </div>
        </div>

        {/* Right: Bio & Dynamics */}
        <div className="md:col-span-8 space-y-4">
          <div className="space-y-0.5">
            <span className="font-mono text-[11px] text-accent uppercase tracking-widest font-semibold">
              {member.role}
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase leading-none">
              {member.name}
            </h3>
          </div>

          {/* Quote */}
          <blockquote className="p-4 rounded-xl bg-white/3 border-l-4 border-accent text-sm text-white/80 italic font-light leading-relaxed">
            "{member.quote}"
          </blockquote>

          {/* Sonic Role */}
          <div className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-1.5">
            <div className="flex items-center gap-2 font-mono text-[10px] text-sky-400">
              <Music size={13} />
              <span className="uppercase tracking-widest font-bold">SONIC DYNAMICS</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              {member.focus}
            </p>
          </div>

          {/* Extended Bio */}
          {member.bio && (
            <div className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 font-mono text-[10px] text-amber-400">
                <Sparkles size={13} />
                <span className="uppercase tracking-widest font-bold">PERSONNEL PROFILE</span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed font-light">
                {member.bio}
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}
