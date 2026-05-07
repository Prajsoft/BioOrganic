const steps = [
  {
    n: '1',
    title: 'Free Inspection',
    description: 'We visit your premises and assess the infestation at no charge.',
  },
  {
    n: '2',
    title: 'Customised Plan',
    description: 'Treatment plan tailored to your pest type and property layout.',
  },
  {
    n: '3',
    title: 'Expert Treatment',
    description: 'Govt-approved, non-toxic products applied by trained technicians.',
  },
  {
    n: '4',
    title: 'Warranty & Support',
    description: '1–3 year warranty with free follow-up visits included.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900">How It Works</h2>
          <p className="mt-3 text-gray-500">Simple, transparent, and effective — every time.</p>
        </div>

        <div className="relative">
          {/* Desktop connector line */}
          <div
            className="hidden md:block absolute top-7 left-[calc(12.5%+1px)] right-[calc(12.5%+1px)] h-0.5 bg-primary-light"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.n} className="relative flex flex-col items-center text-center gap-4">
                {/* Number circle */}
                <div className="relative z-10 w-14 h-14 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-md">
                  <span className="text-white font-bold text-lg">{step.n}</span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-[200px] mx-auto">
                    {step.description}
                  </p>
                </div>

                {/* Mobile vertical connector (not last) */}
                {step.n !== '4' && (
                  <div className="md:hidden w-0.5 h-6 bg-primary-light" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
