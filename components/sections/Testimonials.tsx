import { Star } from 'lucide-react'
import { testimonials } from '@/data/testimonials'

export default function Testimonials() {
  const visible = testimonials.slice(0, 3)

  return (
    <section className="bg-primary-light py-16">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-gray-900">
            What Our Customers Say
          </h2>
          <p className="mt-2 text-gray-500 text-sm">
            4.7★ on Google &nbsp;·&nbsp; 37 Verified Reviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visible.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>

              {/* Attribution */}
              <div className="border-t border-gray-100 pt-3 flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.location}</p>
                </div>
                <span className="shrink-0 inline-block bg-primary-light text-primary text-xs font-medium px-2.5 py-1 rounded-full">
                  {t.service}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
