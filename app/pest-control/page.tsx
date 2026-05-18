import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { pests } from '@/data/pests'
import PestCard from '@/components/ui/PestCard'

export const metadata: Metadata = {
  title: 'Pest Control Library | Know Your Pest',
  description:
    'Identify common household pests in Delhi NCR. Learn the warning signs and find the right treatment for termites, cockroaches, bed bugs, mosquitoes and more.',
  alternates: { canonical: 'https://bioorganicpestcontrol.in/pest-control' },
}

export default function PestControlPage() {
  return (
    <>
      <section className="bg-primary py-10">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/90">Pest Control Library</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">
            Pest Control Library
          </h1>
          <p className="text-white/70">
            Identify your pest, understand the warning signs, and find the right treatment.
          </p>
        </div>
      </section>

      <section className="bg-gray-bg py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {pests.map((p) => (
              <PestCard key={p.slug} pest={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
