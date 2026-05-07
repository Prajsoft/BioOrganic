'use client'

import { useSyncExternalStore } from 'react'

export type CookieConsent = 'accepted' | 'declined' | 'unknown'

const CONSENT_KEY = 'cookie_consent'
const CONSENT_EVENT = 'cookie-consent-change'

function readConsent(): CookieConsent {
  if (typeof window === 'undefined') return 'unknown'

  const value = window.localStorage.getItem(CONSENT_KEY)
  return value === 'accepted' || value === 'declined' ? value : 'unknown'
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onStoreChange)
  window.addEventListener('storage', onStoreChange)

  return () => {
    window.removeEventListener(CONSENT_EVENT, onStoreChange)
    window.removeEventListener('storage', onStoreChange)
  }
}

export function useCookieConsent() {
  return useSyncExternalStore(subscribe, readConsent, () => 'unknown')
}

export function setCookieConsent(value: CookieConsent) {
  if (value === 'unknown') {
    window.localStorage.removeItem(CONSENT_KEY)
  } else {
    window.localStorage.setItem(CONSENT_KEY, value)
  }

  window.dispatchEvent(new Event(CONSENT_EVENT))
}
