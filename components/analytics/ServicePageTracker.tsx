'use client'

import { useEffect } from 'react'
import { trackServiceView } from '@/components/analytics/AnalyticsEvents'

type Props = {
  serviceName: string
  serviceSlug: string
}

export default function ServicePageTracker({ serviceName, serviceSlug }: Props) {
  useEffect(() => {
    trackServiceView(serviceName)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceSlug])

  return null
}
