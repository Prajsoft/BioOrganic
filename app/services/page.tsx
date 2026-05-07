import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { services } from '@/data/services'
import ServiceCard from '@/components/ui/ServiceCard'
import CTABanner from '@/components/ui/CTABanner'

export const metadata: Metadata = {
  title: 'All Pest Control Services in Delhi NCR | Bio Organic Pest Control',
  description:
    'Browse all 13 pest control services — termite, cockroach, bed bug, mosquito, rodent, and more. Govt-licensed, non-toxic, warranted. Serving Delhi NCR since 2016.',
  alternates: { canonical: 'https://bioorganicpestcontrol.in/services' },
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-12">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/90">Services</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">
            Our Pest Control Services
          </h1>
          <p className="text-white/70">
            13 specialist treatments. Govt-licensed, non-toxic, and backed by written warranties.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-gray-bg py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
