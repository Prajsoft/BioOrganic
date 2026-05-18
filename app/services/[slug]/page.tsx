import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MessageCircle, CheckCircle2, ChevronRight, ChevronDown } from 'lucide-react'
import { services } from '@/data/services'
import { siteConfig } from '@/data/siteConfig'
import JsonLd from '@/components/ui/JsonLd'
import CTABanner from '@/components/ui/CTABanner'
import ServiceCard from '@/components/ui/ServiceCard'
import { getServiceSchema, getFAQSchema, getBreadcrumbSchema } from '@/lib/schema'
import ServicePageTracker from '@/components/analytics/ServicePageTracker'
import { TrackedCallLink, TrackedWhatsAppLink } from '@/components/analytics/TrackedLinks'

type Params = { slug: string }

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `https://bioorganicpestcontrol.in/services/${slug}` },
  }
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  const related = services.filter((s) => s.slug !== slug).slice(0, 3)

  const schema = [
    getServiceSchema(service),
    getFAQSchema(service.faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: service.title, url: `/services/${slug}` },
    ]),
  ]

  return (
    <>
      <JsonLd schema={schema} />
      <ServicePageTracker serviceName={service.title} serviceSlug={slug} />

      {/* ── 1. Hero ── */}
      <section className="bg-primary py-14">
        <div className="max-w-5xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight size={12} />
            <span className="text-white/90">{service.title}</span>
          </nav>

          <div className="max-w-3xl space-y-5">
            <h1 className="text-3xl md:text-4xl font-semibold text-white leading-tight">
              {service.heroHeading}
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">{service.heroSubtext}</p>

            {/* Warranty badge */}
            <p className="text-accent font-semibold text-base">
              ✓ {service.warranty} Included
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <TrackedWhatsAppLink
                href={siteConfig.whatsappHref}
                source={`service_hero_${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors shadow min-h-[44px]"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Chat on WhatsApp
              </TrackedWhatsAppLink>
              <TrackedCallLink
                href={siteConfig.phoneHref}
                source={`service_hero_${slug}`}
                aria-label="Call Bio Organic Pest Control"
                className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors min-h-[44px]"
              >
                <Phone size={18} aria-hidden="true" />
                Call Now
              </TrackedCallLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── Urgency strip ── */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-400 font-medium shrink-0 mr-1">Quick enquiry:</span>
          {[
            { label: '⚡ Same-day visit', text: `Hi! I need same-day ${service.shortTitle}. Please advise on availability.` },
            { label: '🔍 Book inspection', text: `Hi! I'd like to book a free inspection for ${service.shortTitle}. Can you schedule a visit?` },
            { label: '💬 Get a quote', text: `Hi! I'd like a quote for ${service.shortTitle} at my property. Please share pricing.` },
            { label: '📋 AMC enquiry', text: `Hi! I'm interested in an Annual Maintenance Contract that includes ${service.shortTitle}. Please share details.` },
          ].map(({ label, text }) => (
            <a
              key={label}
              href={`https://wa.me/919999266042?text=${encodeURIComponent(text)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary-light border border-primary/20 text-primary text-xs font-medium px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* ── 2. Overview ── */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

            {/* Left — 60% */}
            <div className="lg:col-span-3 space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                About {service.title} in Delhi NCR
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {service.heroSubtext} Our treatments use BIS-approved, non-toxic
                formulations that are safe for your family, pets, and the environment.
                Every job is carried out by our government-licensed technicians and
                backed by the industry&rsquo;s strongest warranty — giving you complete
                peace of mind long after the treatment is done. Whether you are in
                Ghaziabad, Noida, Greater Noida, Indirapuram, or East Delhi, our team
                reaches you the same day or the next.
              </p>

              <ul className="space-y-3">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — 40%, sticky */}
            <div className="lg:col-span-2 lg:sticky lg:top-24">
              <div className="bg-primary rounded-2xl p-6 text-white space-y-5">
                <h3 className="text-lg font-semibold">Get Free Quote on WhatsApp</h3>

                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-center gap-2">
                    <span className="text-primary-light font-bold">✓</span>
                    {service.warranty}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary-light font-bold">✓</span>
                    Non-toxic, BIS approved treatment
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary-light font-bold">✓</span>
                    Serving all of Delhi NCR
                  </li>
                </ul>

                <TrackedWhatsAppLink
                  href={siteConfig.whatsappHref}
                  source={`service_page_${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-white text-green-700 font-semibold py-3 rounded-xl hover:bg-green-50 transition-colors"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  Chat on WhatsApp
                </TrackedWhatsAppLink>

                <TrackedCallLink
                  href={siteConfig.phoneHref}
                  source={`service_sidebar_${slug}`}
                  className="block text-center text-white/70 text-sm hover:text-white transition-colors"
                >
                  Or call: {siteConfig.phoneFormatted}
                </TrackedCallLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Process ── */}
      <section className="bg-gray-bg py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-10">
            Our {service.shortTitle} Process
          </h2>

          <div className="relative">
            {/* Desktop connector */}
            <div
              className="hidden md:block absolute top-7 left-[calc(12.5%+1px)] right-[calc(12.5%+1px)] h-0.5 bg-primary-light"
              aria-hidden="true"
            />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {service.processSteps.map((ps) => (
                <div key={ps.step} className="relative flex flex-col items-center text-center gap-3">
                  <div className="relative z-10 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-md shrink-0">
                    <span className="text-white font-bold text-lg">{ps.step}</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{ps.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-[180px] mx-auto">
                      {ps.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Why Choose Us strip ── */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: 'Non-Toxic & Safe', body: 'BIS-approved formulations safe for children, pets, and the elderly.' },
              { title: service.warranty, body: 'Free retreatment within the warranty period — no questions asked.' },
              { title: 'Govt. Licensed Team', body: 'Every technician is certified and operates under a government licence.' },
            ].map((pt) => (
              <div key={pt.title} className="flex items-start gap-3 p-4 rounded-xl bg-primary-light">
                <CheckCircle2 size={20} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{pt.title}</p>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{pt.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FAQ ── */}
      <section className="bg-white py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-0 divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
            {service.faqs.map((faq, i) => (
              <details key={i} className="group bg-white">
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none select-none hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-gray-900 text-sm">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className="shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                <div className="px-5 pb-5 pt-1 text-sm text-gray-600 leading-relaxed bg-gray-50">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Related Services ── */}
      <section className="bg-gray-bg py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Other Services You May Need
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA Banner ── */}
      <CTABanner />
    </>
  )
}
