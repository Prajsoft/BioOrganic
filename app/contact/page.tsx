import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MessageCircle, Mail, Clock, MapPin, ChevronRight } from 'lucide-react'
import { siteConfig } from '@/data/siteConfig'
import { locations } from '@/data/locations'
import ContactForm from '@/components/ui/ContactForm'
import CTABanner from '@/components/ui/CTABanner'
import { TrackedWhatsAppLink, TrackedCallLink } from '@/components/analytics/TrackedLinks'

export const metadata: Metadata = {
  title: 'Contact Us | Book Pest Control in Delhi NCR | Bio Organic',
  description:
    'Get a free pest control quote for your home or business in Delhi NCR. Call +91-9999266042 or fill in the form and we will respond within 2 hours.',
  alternates: { canonical: 'https://bioorganicpestcontrol.in/contact' },
}

const contactCards = [
  {
    icon: Phone,
    title: 'Call Us',
    value: siteConfig.phoneFormatted,
    href: siteConfig.phoneHref,
    sub: 'Mon–Sun, 9am to 7pm',
    tracking: 'call' as const,
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: 'Chat Instantly',
    href: siteConfig.whatsappHref,
    sub: 'Fastest response',
    external: true,
    tracking: 'whatsapp' as const,
  },
  {
    icon: Mail,
    title: 'Email',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    sub: 'Reply within 24 hours',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    value: 'Mon – Sun',
    href: null,
    sub: '9:00 am – 7:00 pm',
  },
]

export default function ContactPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section className="bg-primary py-12">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/90">Contact Us</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-semibold text-white">
            Get in Touch
          </h1>
          <p className="text-white/70 mt-2">
            Book a pest control service or request a free quote. We respond within 2 hours.
          </p>
        </div>
      </section>

      {/* ── 2. Form + Info ── */}
      <section className="bg-gray-bg py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">

            {/* Left — form (client component) */}
            <ContactForm />

            {/* Right — contact info */}
            <div className="space-y-4 lg:sticky lg:top-24">
              {contactCards.map((card) => {
                const Icon = card.icon
                const inner = (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{card.title}</p>
                      <p className="font-semibold text-gray-900 text-sm mt-0.5">{card.value}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{card.sub}</p>
                    </div>
                  </div>
                )
                if ('tracking' in card && card.tracking === 'call') {
                  return (
                    <TrackedCallLink
                      key={card.title}
                      href={card.href!}
                      source="contact_page"
                      className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                    >
                      {inner}
                    </TrackedCallLink>
                  )
                }
                if ('tracking' in card && card.tracking === 'whatsapp') {
                  return (
                    <TrackedWhatsAppLink
                      key={card.title}
                      href={card.href!}
                      source="contact_page"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                    >
                      {inner}
                    </TrackedWhatsAppLink>
                  )
                }
                return card.href ? (
                  <a
                    key={card.title}
                    href={card.href}
                    className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={card.title} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    {inner}
                  </div>
                )
              })}

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Registered Office</p>
                    <p className="font-semibold text-gray-900 text-sm mt-0.5">Ghaziabad</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{siteConfig.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. We Come to You ── */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">We Come to You</h2>
          <p className="text-gray-500 mb-6 max-w-2xl">
            No need to visit us. Our certified technicians travel to your home or office across Delhi NCR — just book a slot and we&apos;ll be at your door.
          </p>
          <div className="flex flex-wrap gap-2">
            {locations.map((loc) => (
              <span
                key={loc.slug}
                className="inline-flex items-center gap-1.5 bg-primary-light text-primary text-sm font-medium px-4 py-2 rounded-full"
              >
                <MapPin size={13} className="shrink-0" />
                {loc.city}
              </span>
            ))}
            <span className="inline-flex items-center text-sm text-gray-400 px-3 py-2">
              & surrounding areas
            </span>
          </div>
        </div>
      </section>

      {/* ── 4. CTA Banner ── */}
      <CTABanner />
    </>
  )
}
