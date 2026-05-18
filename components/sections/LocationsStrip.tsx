import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { locations } from '@/data/locations'

export default function LocationsStrip() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            We Come to You — Across Delhi NCR
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Our technicians travel to your home or office. No need to visit us.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {locations.map((loc) => (
            <Link
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              className="inline-flex items-center gap-2 border border-gray-200 hover:border-primary hover:bg-primary-light text-gray-700 hover:text-primary text-sm font-medium px-4 py-2 rounded-full transition-colors"
            >
              <MapPin size={14} className="shrink-0" />
              {loc.city}
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/locations"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all service areas →
          </Link>
        </div>
      </div>
    </section>
  )
}
