import Link from 'next/link'
import { TriangleAlert } from 'lucide-react'

type Pest = {
  slug: string
  name: string
  description: string
  signs: string[]
}

export default function PestCard({ pest }: { pest: Pest }) {
  return (
    <Link
      href={`/pest-control/${pest.slug}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3"
    >
      <div className="flex items-center gap-2">
        <TriangleAlert size={18} className="text-accent shrink-0" />
        <h2 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
          {pest.name}
        </h2>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{pest.description}</p>
      <span className="text-xs font-medium text-primary mt-auto">Learn more →</span>
    </Link>
  )
}
