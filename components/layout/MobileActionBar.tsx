'use client'

import { Phone, MessageCircle } from 'lucide-react'
import { siteConfig } from '@/data/siteConfig'
import { TrackedCallLink, TrackedWhatsAppLink } from '@/components/analytics/TrackedLinks'

export default function MobileActionBar() {
  return (
    <div
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 flex border-t border-gray-200 bg-white shadow-[0_-2px_12px_rgba(0,0,0,0.08)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <TrackedCallLink
        href={siteConfig.phoneHref}
        source="mobile_action_bar_call"
        aria-label="Call Bio Organic Pest Control"
        className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-primary hover:bg-primary-light transition-colors"
      >
        <Phone size={18} aria-hidden="true" />
        Call Now
      </TrackedCallLink>

      <div className="w-px bg-gray-200 shrink-0" aria-hidden="true" />

      <TrackedWhatsAppLink
        href={siteConfig.whatsappHref}
        source="mobile_action_bar_whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white bg-green-500 hover:bg-green-600 transition-colors"
      >
        <MessageCircle size={18} aria-hidden="true" />
        WhatsApp Us
      </TrackedWhatsAppLink>
    </div>
  )
}
