'use client'

import { useEffect, useState } from 'react'

/**
 * Реальная высота видимой области (iOS Safari / PWA): до свайпа 100dvh часто неверен.
 * Подписываемся на visualViewport — таббар и карта сразу встают как после свайпа.
 */
export function useAppViewportHeight(): string {
  const [px, setPx] = useState('')

  useEffect(() => {
    const read = () => {
      const h = window.visualViewport?.height ?? window.innerHeight
      if (h > 0) setPx(`${h}px`)
    }

    read()
    const t1 = window.setTimeout(read, 0)
    const t2 = window.setTimeout(read, 100)
    const t3 = window.setTimeout(read, 350)

    const vv = window.visualViewport
    vv?.addEventListener('resize', read)
    vv?.addEventListener('scroll', read)
    window.addEventListener('orientationchange', read)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t3)
      vv?.removeEventListener('resize', read)
      vv?.removeEventListener('scroll', read)
      window.removeEventListener('orientationchange', read)
    }
  }, [])

  return px || '100svh'
}
