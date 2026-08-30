'use client'
import { useState, useRef } from 'react'
import { UploadCloud, CheckCircle2, AlertCircle, X, Image as ImageIcon, Video, Loader2 } from 'lucide-react'

interface FileUploaderProps {
  value: string
  onChange: (url: string) => void
  label?: string
  accept?: string
  helperText?: string
}

export function FileUploader({
  value,
  onChange,
  label = 'Upload Media File',
  accept = 'image/*,video/*',
  helperText = 'Files are saved to /storage with unique UUIDs (Images & Videos supported)',
}: FileUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleUpload = async (file: File) => {
    setError(null)
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || data.details || 'Upload failed')
      }

      onChange(data.url)
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      setError(errorMsg)
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0])
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0])
    }
  }

  const isVideo = value.match(/\.(mp4|webm|mov)$/i)

  return (
    <div className="space-y-2">
      {label && (
        <label className="block font-mono text-xs text-white/70 uppercase tracking-wider font-semibold">
          {label}
        </label>
      )}

      {/* Upload Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-4 sm:p-6 text-center cursor-pointer transition-all duration-300 ${
          isDragging
            ? 'border-accent bg-accent/10'
            : value
            ? 'border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/60'
            : 'border-white/10 bg-black/30 hover:border-white/25 hover:bg-black/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />

        {isUploading ? (
          <div className="py-4 flex flex-col items-center justify-center space-y-2">
            <Loader2 size={28} className="text-accent animate-spin" />
            <span className="font-mono text-xs text-white/80">UPLOADING &amp; ASSIGNING UUID...</span>
          </div>
        ) : value ? (
          <div className="flex flex-col sm:flex-row items-center gap-4 text-left">
            {/* Preview Box */}
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-black/60 border border-white/10 flex-shrink-0 flex items-center justify-center relative group">
              {isVideo ? (
                <video src={value} className="w-full h-full object-cover" />
              ) : (
                <img src={value} alt="Preview" className="w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-[10px] font-mono text-accent">CHANGE</span>
              </div>
            </div>

            {/* File Info */}
            <div className="flex-1 space-y-1 min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-bold">
                <CheckCircle2 size={14} />
                <span>SAVED TO STORAGE</span>
              </div>
              <p className="text-xs font-mono text-white/80 truncate">{value}</p>
              <p className="text-[11px] text-white/40 font-mono">Click or drag new file to replace</p>
            </div>

            {/* Remove Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onChange('')
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 border border-white/5 hover:border-red-500/30 transition-colors"
              title="Remove file"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="py-4 space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-accent">
              <UploadCloud size={24} />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-mono text-white/90 font-semibold">
                Click to browse or drag &amp; drop image/video
              </p>
              <p className="text-[11px] font-mono text-white/40">{helperText}</p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-400 font-mono">
          <AlertCircle size={13} />
          <span>{error}</span>
        </div>
      )}

      {/* Manual Path Input (Alternative) */}
      <div className="pt-1">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste /storage/... or image path directly"
          className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white/80 placeholder-white/20 focus:outline-none focus:border-accent"
        />
      </div>
    </div>
  )
}
