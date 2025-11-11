'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Avatar({
  src = '/profilepic.jpeg',
  alt = 'Profile photo',
  size = 320, // px
}: { src?: string; alt?: string; size?: number }) {
  const [exists, setExists] = useState<boolean | null>(null)

  useEffect(() => {
    let mounted = true
    fetch(src, { method: 'HEAD' })
      .then((res) => { if (mounted) setExists(res.ok) })
      .catch(() => { if (mounted) setExists(false) })
    return () => { mounted = false }
  }, [src])

  if (exists === null) {
    return <div style={{ width: size, height: size }} className="hero-profile-card glass" />
  }

  if (exists) {
    return (
      <div style={{ width: size, height: size, position: 'relative' }} className="hero-profile-card glass">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${size}px`}
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
    )
  }

  const initials = 'AJ'
  return (
    <div
      className="hero-profile-card glass"
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg,#0b1220,#071029)'
      }}
      role="img"
      aria-label={alt}
    >
      <svg width="50%" height="50%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <text x="50" y="57" textAnchor="middle" fontSize="40" fontWeight="700" fill="#fff" fontFamily="Inter, sans-serif">
          {initials}
        </text>
      </svg>
    </div>
  )
}
