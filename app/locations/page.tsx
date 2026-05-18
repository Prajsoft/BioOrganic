import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, ChevronRight } from 'lucide-react'
import { locations } from '@/data/locations'
import { siteConfig } from '@/data/siteConfig'
import { TrackedCallLink } from '@/components/analytics/TrackedLinks'

export const metadata: Metadata = {
  title: 'Pest Control Service Areas in Delhi NCR',
  description:
    'Pest control in Ghaziabad, Noida, Greater Noida, Indirapuram, Noida Extension, East Delhi, Vaishali, Vasundhara.',
  alternates: { canonical: 'https://bioorganicpestcontrol.in/locations' },
}

export default function LocationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-12">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/90">Service Areas</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold text-white">
                Service Areas in Delhi NCR
              </h1>
              <p className="text-white/70 mt-2">
                Govt-licensed pest control across Delhi NCR — same-day service available.
              </p>
            </div>
            <TrackedCallLink
              href={siteConfig.phoneHref}
              source="locations_page"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors shrink-0"
            >
              <Phone size={16} />
              {siteConfig.phoneFormatted}
            </TrackedCallLink>
          </div>
        </div>
      </section>

      {/* Location cards grid */}
      <section className="bg-gray-bg py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3"
              >
                <div className="flex items-start gap-2">
                  <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {loc.city}
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">{loc.state}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {loc.sectors.slice(0, 3).map((s) => (
                    <span key={s} className="text-xs bg-primary-light text-primary px-2 py-0.5 rounded-full">
                      {s}
                    </span>
                  ))}
                  {loc.sectors.length > 3 && (
                    <span className="text-xs text-gray-400">+{loc.sectors.length - 3} more</span>
                  )}
                </div>
                <span className="text-xs font-medium text-primary mt-auto">
                  View services →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
