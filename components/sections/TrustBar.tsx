import { siteConfig } from '@/data/siteConfig'

export default function TrustBar() {
  return (
    <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-dark py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {siteConfig.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center space-y-1 shadow-sm"
            >
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
