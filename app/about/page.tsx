import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ShieldCheck, Leaf, FlaskConical, ChevronRight } from 'lucide-react'
import { siteConfig } from '@/data/siteConfig'
import CTABanner from '@/components/ui/CTABanner'
import TrustedBy from '@/components/sections/TrustedBy'

export const metadata: Metadata = {
  title: 'About Us | Est. 2016 | Delhi NCR Pest Control',
  description:
    'Bio Organic Pest Control — est. 2016. Govt-licensed, non-toxic pest control serving 5,000+ homes and businesses in Delhi NCR since 2016.',
  alternates: {
    canonical: 'https://bioorganicpestcontrol.in/about',
  },
}

const aboutStats = [
  { value: '5,000+', label: 'Clients Served' },
  { value: siteConfig.experienceYears, label: 'Years in Business' },
  { value: '13', label: 'Services Offered' },
  { value: '8', label: 'Cities Covered' },
]

const credentials = [
  {
    icon: ShieldCheck,
    title: 'Govt. Licensed',
    body: 'All operations are carried out under a valid government pest control licence. Our documentation is available on request.',
  },
  {
    icon: Leaf,
    title: 'Non-Toxic Products',
    body: 'Every treatment uses non-toxic, eco-friendly formulations that are safe for children, pets, and the elderly.',
  },
  {
    icon: FlaskConical,
    title: 'BIS Approved Chemicals',
    body: 'We use only Bureau of Indian Standards (BIS) approved pesticides — the highest domestic product safety certification.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section className="bg-primary py-12">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/90">About Us</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-semibold text-white">
            About Bio Organic Pest Control
          </h1>
          <p className="text-white/70 mt-2">
            Est. {siteConfig.established} &nbsp;·&nbsp; {siteConfig.address}
          </p>
        </div>
      </section>

      {/* ── 2. Story ── */}
      <section className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

            {/* Left — story */}
            <div className="lg:col-span-3 space-y-5">
              <h2 className="text-2xl font-semibold text-gray-900">Who We Are</h2>
              <p className="text-gray-600 leading-relaxed">
                Founded in {siteConfig.established}, Bio Organic Pest Control was built on a simple
                mission: to deliver safe, effective, and environmentally responsible pest management
                to homes and businesses across Delhi NCR. We hold a valid government pest control
                licence and use only BIS-approved, non-toxic products in every treatment — protecting
                your family and the environment without compromise. Over the years we have expanded
                from a single base in Ghaziabad to cover eight cities across the NCR, serving
                residential societies, corporate offices, restaurants, warehouses, and pharmaceutical
                units.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our team of trained and certified professionals has completed over 5,000 pest control
                treatments across the region and maintains a {siteConfig.googleRating}★ rating on
                Google with {siteConfig.reviewCount} verified reviews. We serve both residential
                and commercial clients with the same high standard of service — every job is backed
                by a written warranty, every technician is government-verified, and every product
                we apply carries official safety approval. From a single flat in Noida to a 50,000
                sq ft warehouse in Ghaziabad, we bring the same commitment to every job.
              </p>
            </div>

            {/* Right — stat boxes */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              {aboutStats.map((s) => (
                <div
                  key={s.label}
                  className="bg-primary-light rounded-xl p-5 text-center space-y-1"
                >
                  <p className="text-3xl font-bold text-primary">{s.value}</p>
                  <p className="text-sm text-gray-600">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Credentials ── */}
      <section className="bg-gray-bg py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">
            Our Credentials
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {credentials.map((c) => {
              const Icon = c.icon
              return (
                <div key={c.title} className="bg-white rounded-xl shadow-sm p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mx-auto">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{c.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{c.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 4. Trusted By ── */}
      <TrustedBy />

      {/* ── 5. Technician photo ── */}
      <section className="bg-gray-bg py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/7] shadow-md">
            <Image
              src="/images/TechPest.png"
              alt="Bio Organic Pest Control certified technician at work"
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <p className="absolute bottom-4 left-5 text-white text-sm font-medium">
              Government-licensed technicians — certified, verified, insured
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. CTA Banner ── */}
      <CTABanner />
    </>
  )
}
