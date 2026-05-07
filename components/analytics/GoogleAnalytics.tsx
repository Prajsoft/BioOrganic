'use client'

import Script from 'next/script'
import { useCookieConsent } from '@/lib/analyticsConsent'

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const isRealGaId = GA_ID && GA_ID.startsWith('G-') && !GA_ID.includes('X')

export default function GoogleAnalytics() {
  const consent = useCookieConsent()

  if (!isRealGaId || consent !== 'accepted') return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}
