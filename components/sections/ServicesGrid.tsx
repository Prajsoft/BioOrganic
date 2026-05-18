import { services } from '@/data/services'
import ServiceCard from '@/components/ui/ServiceCard'

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
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </div>
    </section>
  )
}
