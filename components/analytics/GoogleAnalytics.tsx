'use client'

import Script from 'next/script'
import { useCookieConsent } from '@/lib/analyticsConsent'

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const AW_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID

const isReal = (id: string | undefined, prefix: string) =>
  !!id && id.startsWith(prefix) && !id.includes('X')

const hasGA = isReal(GA_ID, 'G-')
const hasAW = isReal(AW_ID, 'AW-')

export default function GoogleAnalytics() {
  const consent = useCookieConsent()

  // Set consent mode defaults before any tags load (even without consent)
  // This satisfies Google Consent Mode v2 requirements for EU/global compliance
  const consentModeInit = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      wait_for_update: 500,
    });
  `

  const consentGranted = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    });
  `

  const tagInit = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    ${hasGA ? `gtag('config', '${GA_ID}', { page_path: window.location.pathname });` : ''}
    ${hasAW ? `gtag('config', '${AW_ID}');` : ''}
  `

  const primaryId = hasGA ? GA_ID : hasAW ? AW_ID : null

  return (
    <>
      {/* Consent Mode v2 — must fire before any gtag config, even without user consent */}
      <Script id="gtag-consent-default" strategy="beforeInteractive">
        {consentModeInit}
      </Script>

      {consent === 'accepted' && primaryId && (
        <>
          <Script id="gtag-consent-update" strategy="afterInteractive">
            {consentGranted}
          </Script>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {tagInit}
          </Script>
        </>
      )}
    </>
  )
}
