'use client'

import Link from 'next/link'
import { setCookieConsent, useCookieConsent } from '@/lib/analyticsConsent'

export default function CookieBanner() {
  const consent = useCookieConsent()

  if (consent !== 'unknown') return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[60] bg-gray-900 text-white py-3 px-4"
      role="region"
      aria-label="Cookie consent"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-gray-300 text-center sm:text-left">
          We use cookies for analytics and advertising. You can accept or decline optional tracking in our{' '}
          <Link href="/privacy-policy" className="underline hover:text-white transition-colors">
            privacy policy
          </Link>
          .
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setCookieConsent('declined')}
            className="text-white text-sm font-semibold px-5 py-2 rounded-lg border border-white/30 hover:bg-white/10 transition-colors min-h-[44px]"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => setCookieConsent('accepted')}
            className="bg-primary text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-primary-dark transition-colors min-h-[44px]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
