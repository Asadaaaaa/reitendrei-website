import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | 'full'
  className?: string
}

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  maxWidth = '4xl' as const,
  className = '',
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const maxWidthClass =
    maxWidth === 'sm' ? 'max-w-sm'
    : maxWidth === 'md' ? 'max-w-md'
    : maxWidth === 'lg' ? 'max-w-lg'
    : maxWidth === 'xl' ? 'max-w-xl'
    : maxWidth === '2xl' ? 'max-w-2xl'
    : maxWidth === '4xl' ? 'max-w-4xl'
    : maxWidth === '6xl' ? 'max-w-6xl'
    : maxWidth === 'full' ? 'max-w-[95vw]'
    : 'max-w-4xl'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
      style={{ animation: 'fadeIn 0.2s ease' }}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Dialog'}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/90 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div
        ref={modalRef}
        className={`relative z-10 w-full ${maxWidthClass} max-h-[88vh] bg-[#0d1420] border border-white/10 rounded-2xl shadow-2xl overflow-y-auto scrollbar-thin ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-background/70 hover:bg-accent text-white/60 hover:text-white border border-white/10 transition-all duration-200"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {children}
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </div>
  )
}
