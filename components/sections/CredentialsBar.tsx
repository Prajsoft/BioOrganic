import { ShieldCheck } from 'lucide-react'
import { siteConfig } from '@/data/siteConfig'

export default function CredentialsBar() {
  return (
    <div className="bg-gradient-to-r from-primary-light via-white to-primary-light border-b border-primary/10 py-3.5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-start md:justify-center gap-5 overflow-x-auto scrollbar-none">
          {siteConfig.credentials.map((c) => (
            <div
              key={c}
              className="flex items-center gap-1.5 shrink-0 bg-white/70 backdrop-blur-sm border border-primary/10 text-sm text-gray-700 font-medium px-3 py-1 rounded-full shadow-sm"
            >
              <ShieldCheck size={14} className="text-primary shrink-0" />
              <span>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
