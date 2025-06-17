'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

type HitOptions = {
  callback?: () => void
  ctx?: object
  params?: {
    order_price?: number
    currency?: string
  }
  referer?: string
  title?: string
}

interface UsePageViewsOptions {
  ignoreHashChange?: boolean
  disabled?: boolean
}

declare global {
  interface Window {
    ym?: (yid: number, method: string, url: string, options?: HitOptions) => void
  }
}

const trackPageView = (url: string, options?: HitOptions) => {
  if (typeof window !== 'undefined' && window.ym) {
    const yid = Number(process.env.NEXT_PUBLIC_YANDEX_ID)

    if (!window.ym || !yid) {
      return
    }

    // https://yandex.ru/support/metrica/code/counter-spa-setup.html
    window.ym(yid, 'hit', url, {
      ...options,
      title: options?.title || document.title
    })
  }
}

export function usePageViews({
  ignoreHashChange = false,
  disabled = false
}: UsePageViewsOptions = {}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (disabled) {
      return
    }

    // Для App Router используем pathname и searchParams
    const url = searchParams.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname

    trackPageView(url)
  }, [pathname, searchParams, disabled])

  useEffect(() => {
    if (disabled || ignoreHashChange) {
      return
    }

    const handleHashChange = () => {
      if (typeof window !== 'undefined') {
        trackPageView(window.location.pathname + window.location.search + window.location.hash)
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', handleHashChange)
      return () => window.removeEventListener('hashchange', handleHashChange)
    }
  }, [disabled, ignoreHashChange])
}
