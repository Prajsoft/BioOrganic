'use client'

import Script from 'next/script'
import { GA_MEASUREMENT_ID, GOOGLE_ADS_ID } from '@/lib/analyticsIds'

const primaryId = GA_MEASUREMENT_ID ?? GOOGLE_ADS_ID

const tagInit = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  ${GA_MEASUREMENT_ID ? `gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });` : ''}
  ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ''}
`

export default function GoogleAnalytics() {
  if (!primaryId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {tagInit}
      </Script>
    </>
  )
}
