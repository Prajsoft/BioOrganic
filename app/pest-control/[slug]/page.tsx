import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MessageCircle, ChevronRight, TriangleAlert, ShieldCheck } from 'lucide-react'
import { pests } from '@/data/pests'
import { services } from '@/data/services'
import { siteConfig } from '@/data/siteConfig'
import JsonLd from '@/components/ui/JsonLd'
import { getBreadcrumbSchema, getServiceSchema } from '@/lib/schema'
import { TrackedCallLink, TrackedWhatsAppLink } from '@/components/analytics/TrackedLinks'

type Params = { slug: string }

export function generateStaticParams() {
  return pests.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params
  const pest = pests.find((p) => p.slug === slug)
  if (!pest) return {}
  return {
    title: pest.metaTitle,
    description: pest.metaDescription,
    alternates: { canonical: `https://bioorganicpestcontrol.in/pest-control/${slug}` },
  }
}

export default async function PestPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const pest = pests.find((p) => p.slug === slug)
  if (!pest) notFound()

  const relatedService = services.find((s) => s.slug === pest.relatedServiceSlug)
  if (!relatedService) notFound()

  const schema = [
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Pest Control', url: '/pest-control' },
      { name: pest.name, url: `/pest-control/${slug}` },
    ]),
    getServiceSchema(relatedService),
  ]

  return (
    <>
      <JsonLd schema={schema} />

      {/* ── 1. Hero ── */}
      <section className="bg-red-600 py-10">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/pest-control" className="hover:text-white transition-colors">Pest Control</Link>
            <ChevronRight size={12} />
            <span className="text-white/90">{pest.name}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-5 max-w-3xl leading-tight">
            {pest.heroHeading}
          </h1>

          <div className="flex flex-wrap gap-3">
            <TrackedWhatsAppLink
              href={siteConfig.whatsappHref}
              source={`pest_hero_${slug}`}
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
              source={`pest_hero_${slug}`}
              aria-label="Call Bio Organic Pest Control"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors min-h-[44px]"
            >
              <Phone size={16} aria-hidden="true" />
              Call Now
            </TrackedCallLink>
          </div>
        </div>
      </section>

      {/* ── 2. About this pest ── */}
      <section className="bg-white py-8">
        <div className="max-w-4xl mx-auto px-4 space-y-7">
          <p className="text-gray-700 leading-relaxed">{pest.description}</p>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Warning Signs of {pest.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pest.signs.map((sign) => (
                <div
                  key={sign}
                  className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4"
                >
                  <TriangleAlert size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 leading-relaxed">{sign}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Solution CTA ── */}
      <section className="bg-primary-light py-8">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Professional {pest.name} Control in Delhi NCR
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Our{' '}
            <Link
              href={`/services/${relatedService.slug}`}
              className="text-primary font-medium hover:underline"
            >
              {relatedService.title}
            </Link>{' '}
            service eliminates {pest.name.toLowerCase()} using non-toxic,
            govt-approved treatments with{' '}
            <strong>{relatedService.warranty}</strong>.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href={`/services/${relatedService.slug}`}
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-dark transition-colors"
            >
              View {relatedService.shortTitle} →
            </Link>
            <TrackedWhatsAppLink
              href={siteConfig.whatsappHref}
              source={`pest_solution_${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get a free quote on WhatsApp"
              className="inline-flex items-center gap-2 bg-white border border-primary text-primary font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-light transition-colors min-h-[44px]"
            >
              Get Free Quote on WhatsApp
            </TrackedWhatsAppLink>
          </div>
        </div>
      </section>

      {/* ── 4. Warranty strip ── */}
      <div className="bg-primary">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <ShieldCheck size={18} className="text-primary-light shrink-0" />
          <p className="text-white text-sm">
            <strong>✓ {relatedService.warranty}</strong> on all{' '}
            {pest.name.toLowerCase()} treatments in Delhi NCR.
          </p>
        </div>
      </div>
    </>
  )
}
