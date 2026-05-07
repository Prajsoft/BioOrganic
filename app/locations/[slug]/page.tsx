import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MessageCircle, MapPin, Clock, ChevronRight, ShieldCheck } from 'lucide-react'
import { locations } from '@/data/locations'
import { services } from '@/data/services'
import { siteConfig } from '@/data/siteConfig'
import JsonLd from '@/components/ui/JsonLd'
import CTABanner from '@/components/ui/CTABanner'
import ServiceCard from '@/components/ui/ServiceCard'
import { getLocalBusinessSchema, getBreadcrumbSchema } from '@/lib/schema'
import { TrackedCallLink, TrackedWhatsAppLink } from '@/components/analytics/TrackedLinks'

type Params = { slug: string }

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params
  const location = locations.find((l) => l.slug === slug)
  if (!location) return {}
  return {
    title: location.metaTitle,
    description: location.metaDescription,
    robots: { index: true, follow: true },
    alternates: { canonical: `https://bioorganicpestcontrol.in/locations/${slug}` },
  }
}

export default async function LocationPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const location = locations.find((l) => l.slug === slug)
  if (!location) notFound()

  const schema = [
    getLocalBusinessSchema(location),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Service Areas', url: '/locations' },
      { name: location.city, url: `/locations/${slug}` },
    ]),
  ]

  const mapsHref = `https://maps.google.com?q=${encodeURIComponent(location.address)}`

  return (
    <>
      <JsonLd schema={schema} />

      {/* ── 1. Hero ── */}
      <section className="bg-primary py-10">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/locations" className="hover:text-white transition-colors">Service Areas</Link>
            <ChevronRight size={12} />
            <span className="text-white/90">{location.city}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Pest Control Services in {location.city}
          </h1>

          <div className="flex flex-wrap gap-3">
            <TrackedWhatsAppLink
              href={siteConfig.whatsappHref}
              source={`location_hero_${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-green-50 transition-colors shadow min-h-[44px]"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Chat on WhatsApp
            </TrackedWhatsAppLink>
            <TrackedCallLink
              href={siteConfig.phoneHref}
              source={`location_hero_${slug}`}
              aria-label="Call Bio Organic Pest Control"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors min-h-[44px]"
            >
              <Phone size={16} aria-hidden="true" />
              Call Now
            </TrackedCallLink>
          </div>
        </div>
      </section>

      {/* ── 2. Intro ── */}
      <section className="bg-white py-8">
        <div className="max-w-4xl mx-auto px-4 space-y-5">
          <p className="text-gray-700 leading-relaxed">{location.uniqueText}</p>

          <div>
            <p className="text-sm font-semibold text-gray-900 mb-3">
              Areas we cover in {location.city}:
            </p>
            <div className="flex flex-wrap gap-2">
              {location.sectors.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 bg-primary-light text-primary text-sm px-3 py-1.5 rounded-full"
                >
                  <MapPin size={12} className="shrink-0" />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Services grid ── */}
      <section className="bg-gray-bg py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-7">
            Pest Control Services in {location.city}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Office address card + warranty note ── */}
      <section className="bg-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">

            {/* Office card */}
            <div className="border border-gray-200 rounded-2xl p-6 space-y-4">
              <h2 className="font-semibold text-gray-900">
                Our {location.city} Office
              </h2>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2.5">
                  <MapPin size={15} className="text-primary shrink-0 mt-0.5" />
                  <span>{location.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={15} className="text-primary shrink-0" />
                  <TrackedCallLink href={siteConfig.phoneHref} source={`location_office_${slug}`} className="hover:text-primary transition-colors">
                    {siteConfig.phoneFormatted}
                  </TrackedCallLink>
                </div>
                <div className="flex items-center gap-2.5">
                  <MessageCircle size={15} className="text-green-500 shrink-0" />
                  <TrackedWhatsAppLink
                    href={siteConfig.whatsappHref}
                    source={`location_office_${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    WhatsApp Us
                  </TrackedWhatsAppLink>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock size={15} className="text-primary shrink-0" />
                  <span>{siteConfig.hours}</span>
                </div>
              </div>
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-medium text-primary hover:underline"
              >
                Get Directions on Google Maps →
              </a>
            </div>

            {/* Warranty callout */}
            <div className="bg-primary-light border border-primary/20 rounded-2xl p-6 flex items-start gap-4">
              <ShieldCheck size={28} className="text-primary shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="font-semibold text-gray-900 text-sm">
                  Warranty on All Services in {location.city}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  All pest control services in {location.city} come with a{' '}
                  <strong className="text-gray-900">1-year warranty</strong>. Termite
                  treatment is backed by our{' '}
                  <strong className="text-gray-900">3-year warranty</strong> — the
                  longest in Delhi NCR, provided in writing at no extra charge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CTA Banner ── */}
      <CTABanner />
    </>
  )
}
