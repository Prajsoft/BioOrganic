'use client'

import { useEffect } from 'react'
import { trackServiceView, pixelViewContent } from '@/components/analytics/AnalyticsEvents'

type Props = {
  serviceName: string
  serviceSlug: string
}

export default function ServicePageTracker({ serviceName, serviceSlug }: Props) {
  useEffect(() => {
    trackServiceView(serviceName)
    pixelViewContent(serviceName)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceSlug])

  return null
}
