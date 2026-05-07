'use client'

import { siteConfig } from '@/data/siteConfig'
import { TrackedWhatsAppLink } from '@/components/analytics/TrackedLinks'

const href = `${siteConfig.whatsappHref}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`

export default function WhatsAppButton() {
  return (
    <>
      <style>{`
        @keyframes wa-pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50%       { transform: scale(1.35); opacity: 0; }
        }
        .wa-pulse-ring {
          animation: wa-pulse 2s ease-out infinite;
        }
      `}</style>

      <TrackedWhatsAppLink
        href={href}
        source="floating_button"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="
          fixed bottom-6 right-5 z-50
          group
          flex items-center gap-2.5
          bg-green-500 hover:bg-green-600
          text-white font-medium text-sm
          h-14 rounded-full
          shadow-lg shadow-green-500/30
          px-4
          transition-all duration-300 ease-in-out
          sm:w-14 sm:justify-center sm:hover:w-auto sm:hover:px-4
          overflow-hidden whitespace-nowrap
        "
      >
        <span
          className="wa-pulse-ring pointer-events-none absolute inset-0 rounded-full bg-green-400"
          aria-hidden="true"
        />

        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 shrink-0 relative"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.856L.054 23.478a.5.5 0 0 0 .614.614l5.622-1.478A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.572 9.572 0 0 1-4.949-1.378l-.355-.21-3.678.967.983-3.595-.23-.368A9.545 9.545 0 0 1 2.4 12C2.4 6.698 6.698 2.4 12 2.4S21.6 6.698 21.6 12 17.302 21.6 12 21.6z" />
        </svg>

        <span className="relative sm:w-0 sm:opacity-0 sm:group-hover:w-auto sm:group-hover:opacity-100 transition-all duration-300 overflow-hidden">
          Chat with us
        </span>
      </TrackedWhatsAppLink>
    </>
  )
}
