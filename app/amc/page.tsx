import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone, MessageCircle, ChevronRight, CheckCircle2,
  Home, Building2, Utensils, Warehouse, ChevronDown,
} from 'lucide-react'
import { siteConfig } from '@/data/siteConfig'
import { clients } from '@/data/clients'
import CTABanner from '@/components/ui/CTABanner'
import JsonLd from '@/components/ui/JsonLd'
import { getLocalBusinessSchema, getServiceSchema, getFAQSchema } from '@/lib/schema'
import { TrackedCallLink, TrackedWhatsAppLink } from '@/components/analytics/TrackedLinks'

export const metadata: Metadata = {
  title: 'Annual Maintenance Contract (AMC) for Pest Control | Delhi NCR | Bio Organic',
  description:
    'Protect your home or business year-round with our AMC pest control plans in Delhi NCR. Scheduled visits, priority service, non-toxic treatment. Call +91-9999266042.',
  alternates: { canonical: 'https://bioorganicpestcontrol.in/amc' },
}

const amcService = {
  slug: 'amc',
  title: 'Annual Maintenance Contract (AMC) for Pest Control',
  heroSubtext:
    'Year-round scheduled pest control for homes and businesses in Delhi NCR. Prevents infestations before they start.',
}

const covers = [
  'Scheduled quarterly or monthly visits as per your plan',
  'All 13 pest types covered under one contract',
  'Priority emergency response within 24 hours',
  'Non-toxic, BIS approved products on every visit',
  'Detailed service report issued after each visit',
  'Free re-treatment if a pest problem reoccurs between visits',
]

const audiences = [
  {
    icon: Home,
    title: 'Residential Apartments',
    body: 'Protect your family year-round without having to remember to book. Ideal for housing societies and independent homes.',
  },
  {
    icon: Building2,
    title: 'Commercial Offices',
    body: 'Maintain a pest-free workplace with discreet scheduled treatments that fit around your operating hours.',
  },
  {
    icon: Utensils,
    title: 'Restaurants & Hotels',
    body: 'Meet FSSAI compliance requirements with documented quarterly visits and detailed service records for inspections.',
  },
  {
    icon: Warehouse,
    title: 'Warehouses & Factories',
    body: 'Protect inventory and production lines from rodents, stored-product pests, and cockroaches with a planned programme.',
  },
]

const steps = [
  { n: '1', title: 'Enquiry', description: 'Contact us via WhatsApp or phone to discuss your property type, size, and pest history.' },
  { n: '2', title: 'Site Survey', description: 'Our technician visits your premises to assess pest risk and recommend the right frequency and coverage.' },
  { n: '3', title: 'Custom Plan', description: 'We prepare a tailored AMC proposal with fixed pricing, visit schedule, and scope of services.' },
  { n: '4', title: 'Year-Round Service', description: 'Scheduled visits carried out on agreed dates with full service documentation provided after each one.' },
]

const faqs = [
  {
    q: 'What is included in the AMC?',
    a: "An AMC covers all standard pest types — cockroaches, ants, rodents, mosquitoes, bed bugs, wood borers, lizards, and more — under a single contract. Visits are scheduled at a frequency agreed in your plan (monthly or quarterly). Each visit includes full treatment of the agreed areas and a written service report. Termite treatment is included in commercial AMCs and can be added to residential plans on request.",
  },
  {
    q: 'How often will you visit under an AMC?',
    a: 'Residential AMC plans typically include quarterly visits (4 per year). Commercial properties — particularly restaurants, food processing units, and warehouses — usually require monthly visits (12 per year) to meet compliance requirements. The exact frequency is determined during the site survey and fixed in your contract.',
  },
  {
    q: 'Is an AMC available for homes too, or only businesses?',
    a: 'AMC plans are available for both residential and commercial properties. Many families in Ghaziabad, Noida, and Greater Noida opt for our residential AMC to maintain year-round pest-free living without needing to book individual treatments. A quarterly residential AMC is our most popular home plan.',
  },
  {
    q: 'What happens if pests come back between scheduled visits?',
    a: "Any pest recurrence between scheduled visits is treated free of charge as part of your AMC. Simply contact us via WhatsApp or phone and we will arrange a re-treatment visit at no extra cost. This is guaranteed in your contract — there are no hidden call-out charges.",
  },
  {
    q: 'How do I get an AMC quote?',
    a: "AMC pricing depends on your property size, type, location, and the frequency of visits required. We don't publish fixed prices because every property is different. The quickest way to get a quote is to message us on WhatsApp with your property details — we typically respond within a few hours and can arrange a free site survey at your convenience.",
  },
]

export default function AmcPage() {
  const schema = [
    getServiceSchema(amcService),
    getLocalBusinessSchema(),
    getFAQSchema(faqs),
  ]

  return (
    <>
      <JsonLd schema={schema} />

      {/* ── 1. Hero ── */}
      <section className="bg-primary py-14">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/90">AMC Plans</span>
          </nav>

          <div className="max-w-3xl space-y-5">
            <h1 className="text-3xl md:text-4xl font-semibold text-white leading-tight">
              Annual Maintenance Contract for Pest Control
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Year-round protection for your home or business. Scheduled visits,
              priority response, and guaranteed results.
            </p>
            <p className="font-medium text-primary-light">
              ✓ Govt. Licensed &nbsp;·&nbsp; Non-Toxic Treatment
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <TrackedWhatsAppLink
                href={siteConfig.whatsappHref}
                source="amc_page"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors shadow min-h-[44px]"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Chat on WhatsApp
              </TrackedWhatsAppLink>
              <TrackedCallLink
                href={siteConfig.phoneHref}
                source="amc_page"
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

      {/* ── 2. What is an AMC ── */}
      <section className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

            {/* Left */}
            <div className="lg:col-span-3 space-y-5">
              <h2 className="text-2xl font-semibold text-gray-900">
                What Is a Pest Control AMC?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                An Annual Maintenance Contract ensures your property receives regular,
                scheduled pest control treatments throughout the year. Instead of
                calling us when a problem appears, we prevent infestations before
                they start.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With an AMC, you get a fixed number of visits per year at agreed
                dates — with full documentation, priority emergency response, and
                free re-treatment if any pest activity is detected between visits.
                It is the most cost-effective way to maintain a pest-free home or
                workplace in Delhi NCR.
              </p>
              <p className="text-gray-600 leading-relaxed">
                For commercial clients — restaurants, offices, warehouses, and
                pharmaceutical units — our AMC service also provides the service
                reports and chemical usage records required for FSSAI, BRC, and
                health department audits.
              </p>
            </div>

            {/* Right — sticky quote card */}
            <div className="lg:col-span-2 lg:sticky lg:top-24">
              <div className="bg-primary rounded-2xl p-6 text-white space-y-5">
                <h3 className="text-lg font-semibold">Discuss Your AMC Plan</h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-center gap-2">
                    <span className="text-primary-light font-bold">✓</span>
                    Free site survey included
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary-light font-bold">✓</span>
                    Residential &amp; commercial plans available
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary-light font-bold">✓</span>
                    Fixed annual pricing, no surprises
                  </li>
                </ul>
                <TrackedWhatsAppLink
                  href={siteConfig.whatsappHref}
                  source="amc_sidebar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-white text-green-700 font-semibold py-3 rounded-xl hover:bg-green-50 transition-colors"
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </TrackedWhatsAppLink>
                <TrackedCallLink
                  href={siteConfig.phoneHref}
                  source="amc_sidebar"
                  className="block text-center text-white/70 text-sm hover:text-white transition-colors"
                >
                  Or call: {siteConfig.phoneFormatted}
                </TrackedCallLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. What AMC covers ── */}
      <section className="bg-gray-bg py-14">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            What Your AMC Plan Includes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {covers.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Who is it for ── */}
      <section className="bg-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Who Benefits From an AMC?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {audiences.map((a) => {
              const Icon = a.icon
              return (
                <div key={a.title} className="flex items-start gap-4 border border-gray-200 rounded-xl p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-900">{a.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{a.body}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 5. How it works ── */}
      <section className="bg-gray-bg py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-10">
            How It Works
          </h2>
          <div className="relative">
            <div
              className="hidden md:block absolute top-7 left-[calc(12.5%+1px)] right-[calc(12.5%+1px)] h-0.5 bg-primary-light"
              aria-hidden="true"
            />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {steps.map((step) => (
                <div key={step.n} className="relative flex flex-col items-center text-center gap-3">
                  <div className="relative z-10 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-md shrink-0">
                    <span className="text-white font-bold text-lg">{step.n}</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{step.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-[180px] mx-auto">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Trusted by ── */}
      <section className="bg-white py-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Trusted By</h2>
          <p className="text-sm text-gray-500 mb-7">
            These businesses trust us with their annual pest control.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {clients.map((c) => (
              <div
                key={c.name}
                className="border border-gray-200 rounded-xl px-5 py-3 flex flex-col items-center gap-0.5 bg-gray-50"
              >
                <span className="font-semibold text-gray-900 text-sm">{c.name}</span>
                <span className="text-xs text-gray-400">{c.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="bg-primary-light py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            FAQs About AMC
          </h2>
          <div className="space-y-0 divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden">
            {faqs.map((faq, i) => (
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

      {/* ── 8. CTA Banner ── */}
      <CTABanner />
    </>
  )
}
