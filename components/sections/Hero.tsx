'use client'

import Image from 'next/image'
import { MessageCircle, Phone } from 'lucide-react'
import { siteConfig } from '@/data/siteConfig'
import { TrackedCallLink, TrackedWhatsAppLink } from '@/components/analytics/TrackedLinks'

const trustBadges = [
  '✓ Govt. Licensed',
  '✓ Non-Toxic Treatment',
  '✓ BIS Approved Products',
]

const stats = [
  { value: '5,000+', label: 'Clients' },
  { value: '8+', label: 'Years' },
  { value: '4.7★', label: 'Google' },
  { value: '9am–7pm', label: 'All Days' },
]

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] md:min-h-[88vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient — always visible */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-primary-dark" />

      {/* Hero image */}
      <Image
        src="/images/pest1.png"
        alt="Pest control technician treating a home in Delhi NCR"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-60"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-16 text-center">

        {/* Trust badges row */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {trustBadges.map((b) => (
            <span
              key={b}
              className="inline-block bg-white/10 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/25 shadow-sm"
            >
              {b}
            </span>
          ))}
          <span className="inline-block bg-primary/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-primary-light/40 shadow-sm">
            📍 We Come to You
          </span>
        </div>

        {/* H1 — text-3xl max on mobile */}
        <h1 className="text-3xl md:text-5xl font-semibold text-white leading-tight mb-5">
          Professional Pest Control Services in Delhi NCR
        </h1>

        {/* Subtext */}
        <p className="text-white/80 text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
          Serving Ghaziabad, Noida, Greater Noida, Indirapuram &amp; East Delhi with
          safe, organic, government-approved pest control. Est.&nbsp;{siteConfig.established}.
        </p>

        {/* Warranty highlight */}
        <p className="text-accent font-medium text-sm mb-8">
          ★ Termite: 3 Year Warranty &nbsp;·&nbsp; All Other Services: 1 Year Warranty
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <TrackedWhatsAppLink
            href={siteConfig.whatsappHref}
            source="hero"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="inline-flex items-center gap-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors shadow-lg min-h-[44px]"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Chat on WhatsApp
          </TrackedWhatsAppLink>
          <TrackedCallLink
            href={siteConfig.phoneHref}
            source="hero"
            aria-label="Call Bio Organic Pest Control"
            className="inline-flex items-center gap-2.5 border-2 border-white text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/10 transition-colors min-h-[44px]"
          >
            <Phone size={20} aria-hidden="true" />
            Call Now
          </TrackedCallLink>
        </div>

        {/* Urgency quick-select */}
        <div className="mb-8">
          <p className="text-white/50 text-xs mb-3 uppercase tracking-widest">What do you need?</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { label: '⚡ Same-day visit', text: "Hi! I need same-day pest control. Please advise on availability." },
              { label: '🔍 Free inspection', text: "Hi! I'd like to book a free pest inspection. Can you schedule a visit?" },
              { label: '📋 AMC plan', text: "Hi! I'm interested in your Annual Maintenance Contract (AMC) plans. Please share details." },
              { label: '🤔 Not sure — advise me', text: "Hi! I have a pest problem but I'm not sure which service I need. Can you help?" },
            ].map(({ label, text }) => (
              <a
                key={label}
                href={`https://wa.me/919999266042?text=${encodeURIComponent(text)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-4 py-2 rounded-full transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom stats row */}
        <div className="border-t border-white/10 pt-6 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {stats.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2 text-white">
              {i > 0 && (
                <span className="hidden md:block text-white/20 select-none" aria-hidden="true">|</span>
              )}
              <span className="font-bold">{s.value}</span>
              <span className="text-white/60 text-sm">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
