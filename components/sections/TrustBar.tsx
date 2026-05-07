import { siteConfig } from '@/data/siteConfig'

export default function TrustBar() {
  return (
    <section className="bg-primary-light py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.stats.map((stat) => (
            <div key={stat.label} className="text-center space-y-1">
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
