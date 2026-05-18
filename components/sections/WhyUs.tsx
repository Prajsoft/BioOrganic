const points = [
  {
    title: 'We Come to You',
    body: 'Our certified technicians travel to your home or office across Delhi NCR. No need to visit us — just book a slot.',
  },
  {
    title: 'Non-Toxic, BIS Approved Products',
    body: 'Safe for children, pets, and the elderly. All chemicals carry BIS certification.',
  },
  {
    title: 'Govt. Licensed Team',
    body: 'Every technician is trained, verified, and operates under a government-issued pest control licence.',
  },
  {
    title: 'Termite 3-Year Warranty',
    body: 'The longest anti-termite warranty offered in the NCR region — fully backed in writing.',
  },
  {
    title: 'All Services 1-Year Warranty',
    body: 'Complete peace of mind after every treatment. Free retreatment within the warranty period.',
  },
  {
    title: 'Est. 2016 — 8+ Years Experience',
    body: 'Over eight years serving thousands of homes and businesses across Delhi NCR.',
  },
  {
    title: 'Free Inspection',
    body: 'We assess your property and provide a fixed quote before any treatment begins — no obligation.',
  },
]

export default function WhyUs() {
  return (
    <section className="bg-gray-bg py-16">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-gray-900">
            Why Choose Bio Organic Pest Control?
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            We built our reputation on results, transparency, and the safety of your family.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {points.map((p) => (
            <div
              key={p.title}
              className="flex items-start gap-4 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="mt-0.5 w-7 h-7 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                <span className="text-primary font-bold text-sm">✓</span>
              </div>
              <div className="space-y-0.5">
                <h3 className="font-semibold text-gray-900 text-sm">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
