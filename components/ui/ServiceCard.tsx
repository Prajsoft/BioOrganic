import Link from 'next/link'
import {
  Bug, BedDouble, TreePine, MousePointer2, Zap, Shield,
  Leaf, Wind, Droplets, Building2, Warehouse, LucideProps,
} from 'lucide-react'
import WarrantyBadge from '@/components/ui/WarrantyBadge'

type Service = {
  slug: string
  shortTitle: string
  tagline: string
  warranty: string
  icon: string
}

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Bug, BedDouble, TreePine, MousePointer2, Zap, Shield,
  Leaf, Wind, Droplets, Building2, Warehouse,
}

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon] ?? Shield
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-3.5 sm:p-5 flex flex-col gap-3"
    >
      <Icon size={28} className="text-primary" />
      <div className="flex-1 space-y-1">
        <h3 className="font-semibold text-gray-900 text-sm leading-snug">{service.shortTitle}</h3>
        <p className="text-xs text-gray-500 leading-relaxed">{service.tagline}</p>
      </div>
      <div className="flex flex-col gap-2 pt-1">
        <WarrantyBadge label={service.warranty} />
        <span className="text-xs font-medium text-primary group-hover:underline">
          Learn More →
        </span>
      </div>
    </Link>
  )
}
