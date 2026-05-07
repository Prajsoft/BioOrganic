import { clients } from '@/data/clients'

export default function TrustedBy() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Trusted By Leading Businesses
        </h2>
        <p className="mt-2 text-gray-500 text-sm">
          From pharma to IT, packaging to manufacturing — we protect them all.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {clients.map((c) => (
            <div
              key={c.name}
              className="border border-gray-200 rounded-xl px-5 py-3 flex flex-col items-center gap-0.5 bg-gray-50 hover:border-primary transition-colors"
            >
              <span className="font-semibold text-gray-900 text-sm">{c.name}</span>
              <span className="text-xs text-gray-400">{c.type}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
