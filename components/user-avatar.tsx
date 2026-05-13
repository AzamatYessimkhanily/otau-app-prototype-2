'use client'

import Image from 'next/image'
import { useState } from 'react'

interface UserAvatarProps {
  name: string
  src?: string
  size?: number
  className?: string
  /** Tailwind classes for the rounded wrapper (ring, shadow, etc.) */
  wrapperClassName?: string
}

// Deterministic gradient picked from the first character of the name so the
// same user always gets the same colour pair.
const GRADIENTS = [
  'from-otau-primary-500 to-otau-primary-700',
  'from-otau-accent-500 to-red-700',
  'from-emerald-500 to-teal-600',
  'from-violet-500 to-purple-700',
  'from-amber-500 to-orange-600',
  'from-sky-500 to-blue-700',
  'from-pink-500 to-rose-600',
]

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function pickGradient(name: string): string {
  const code = name.charCodeAt(0) || 0
  return GRADIENTS[code % GRADIENTS.length]
}

export function UserAvatar({
  name,
  src,
  size = 48,
  className = '',
  wrapperClassName = '',
}: UserAvatarProps) {
  const [failed, setFailed] = useState(false)
  const initials = getInitials(name)
  const gradient = pickGradient(name)
  const showImage = src && !failed
  
  // Tailwind doesn't read inline width/height; use style for arbitrary size.
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden bg-gradient-to-br ${gradient} ${wrapperClassName} ${className}`}
      style={{ width: size, height: size }}
    >
      {showImage ? (
        <Image
          src={src!}
          alt={name}
          width={size}
          height={size}
          className="w-full h-full object-cover"
          onError={() => setFailed(true)}
          unoptimized
        />
      ) : (
        <span
          className="text-white font-bold select-none"
          style={{ fontSize: Math.max(12, Math.round(size * 0.4)) }}
        >
          {initials}
        </span>
      )}
    </div>
  )
}
