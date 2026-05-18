'use client'

import { MessageCircle, Phone } from 'lucide-react'
import { siteConfig } from '@/data/siteConfig'
import { TrackedCallLink, TrackedWhatsAppLink } from '@/components/analytics/TrackedLinks'

export default function CTABanner() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-white">
          Ready to Get Rid of Pests?
        </h2>
        <p className="text-primary-light text-lg">
          We come to you — free inspection, 1–3 year warranty, across Delhi NCR.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <TrackedWhatsAppLink
            href={siteConfig.whatsappHref}
            source="cta_banner"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-7 py-3.5 rounded-xl hover:bg-green-50 transition-colors shadow-md min-h-[44px]"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Chat on WhatsApp
          </TrackedWhatsAppLink>
          <TrackedCallLink
            href={siteConfig.phoneHref}
            source="cta_banner"
            aria-label="Call Bio Organic Pest Control"
            className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/10 transition-colors min-h-[44px]"
          >
            <Phone size={20} aria-hidden="true" />
            Call Now
          </TrackedCallLink>
        </div>
      </div>
    </section>
  )
}
