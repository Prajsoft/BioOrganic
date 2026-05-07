import { ShieldCheck } from 'lucide-react'
import { siteConfig } from '@/data/siteConfig'

export default function CredentialsBar() {
  return (
    <div className="bg-white border-b border-gray-100 py-3">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-start md:justify-center gap-6 overflow-x-auto scrollbar-none">
          {siteConfig.credentials.map((c) => (
            <div
              key={c}
              className="flex items-center gap-1.5 shrink-0 text-sm text-gray-600"
            >
              <ShieldCheck size={15} className="text-primary shrink-0" />
              <span>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
