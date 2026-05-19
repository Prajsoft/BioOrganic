'use client'

import Script from 'next/script'

const GA_ID = 'G-G9J0DHVJSX'
const AW_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID

const isReal = (id: string | undefined, prefix: string) =>
  !!id && id.startsWith(prefix) && !id.includes('X')

const hasGA = isReal(GA_ID, 'G-')
const hasAW = isReal(AW_ID, 'AW-')
const primaryId = hasGA ? GA_ID : hasAW ? AW_ID : null

const tagInit = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  ${hasGA ? `gtag('config', '${GA_ID}', { page_path: window.location.pathname });` : ''}
  ${hasAW ? `gtag('config', '${AW_ID}');` : ''}
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
