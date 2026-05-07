'use client'

import { setCookieConsent } from '@/lib/analyticsConsent'

export default function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => setCookieConsent('unknown')}
      className="hover:text-gray-300 transition-colors"
    >
      Cookie Preferences
    </button>
  )
}
