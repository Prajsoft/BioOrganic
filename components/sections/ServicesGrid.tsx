import Link from 'next/link'
import {
  Bug, BedDouble, TreePine, MousePointer2, Zap, Shield,
  Leaf, Wind, Droplets, Building2, Warehouse, LucideProps,
} from 'lucide-react'
import { services } from '@/data/services'
import WarrantyBadge from '@/components/ui/WarrantyBadge'

type IconName = string
type IconComponent = React.ComponentType<LucideProps>

const iconMap: Record<IconName, IconComponent> = {
  Bug,
  BedDouble,
  TreePine,
  MousePointer2,
  Zap,
  Shield,
  Leaf,
  Wind,
  Droplets,
  Building2,
  Warehouse,
}

function ServiceIcon({ name }: { name: string }) {
  const Icon = iconMap[name] ?? Shield
  return <Icon size={28} className="text-primary" />
}

export default function ServicesGrid() {
  return (
    <section className="bg-gray-bg py-16">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-gray-900">
            Our Pest Control Services
          </h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            Govt-licensed treatments for every pest — safe, non-toxic, and backed by
            the longest warranties in Delhi NCR.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {services.map((s) => (
            <div
              key={s.slug}
              className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 p-5 flex flex-col gap-3"
            >
              <ServiceIcon name={s.icon} />

              <div className="flex-1 space-y-1">
                <h3 className="font-semibold text-gray-900 text-sm leading-snug">
                  {s.shortTitle}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{s.tagline}</p>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <WarrantyBadge label={s.warranty} />
                <Link
                  href={`/services/${s.slug}`}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
