import Link from 'next/link'
import Image from 'next/image'
import { Phone, MessageCircle, MapPin, Clock, Star } from 'lucide-react'
import { siteConfig } from '@/data/siteConfig'
import { services } from '@/data/services'
import { locations } from '@/data/locations'
import { clients } from '@/data/clients'
import { TrackedCallLink, TrackedWhatsAppLink } from '@/components/analytics/TrackedLinks'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Pest Control Library', href: '/pest-control' },
  { label: 'AMC Plans', href: '/amc' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Service Areas', href: '/locations' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
]

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-8 h-8 rounded-full bg-gray-700 hover:bg-primary flex items-center justify-center transition-colors"
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">

      {/* ── Trusted by strip ── */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 text-center">
            Trusted By
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {clients.map((c) => {
              const inner = (
                <>
                  <span className="font-medium text-white">{c.name}</span>
                  <span className="text-gray-500">{c.type}</span>
                </>
              )
              return c.href ? (
                <a
                  key={c.name}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs px-3 py-1.5 rounded-full transition-colors"
                >
                  {inner}
                </a>
              ) : (
                <span
                  key={c.name}
                  className="inline-flex items-center gap-1.5 bg-gray-700 text-gray-300 text-xs px-3 py-1.5 rounded-full"
                >
                  {inner}
                </span>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Main 4-column grid ── */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1 — Brand */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Image
                  src="/images/BioLogo.png"
                  alt="Bio Organic Pest Control"
                  width={38}
                  height={46}
                  className="object-contain w-auto"
                />
                <div className="text-lg font-bold leading-tight">
                  <span className="text-primary-light">Bio Organic</span>
                  <span className="text-white"> Pest Control</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Est. {siteConfig.established} · Govt. Licensed</p>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{siteConfig.tagline}</p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              <SocialIcon href={siteConfig.social.facebook} label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </SocialIcon>
              <SocialIcon href={siteConfig.social.instagram} label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </SocialIcon>
              <SocialIcon href={siteConfig.social.linkedin} label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </SocialIcon>
              <SocialIcon href={siteConfig.social.youtube} label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#111827" />
                </svg>
              </SocialIcon>
              <SocialIcon href={siteConfig.social.whatsapp} label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.856L.054 23.478a.5.5 0 0 0 .614.614l5.622-1.478A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.572 9.572 0 0 1-4.949-1.378l-.355-.21-3.678.967.983-3.595-.23-.368A9.545 9.545 0 0 1 2.4 12C2.4 6.698 6.698 2.4 12 2.4S21.6 6.698 21.6 12 17.302 21.6 12 21.6z" />
                </svg>
              </SocialIcon>
            </div>

            {/* Google rating badge */}
            <div className="inline-flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
              <Star size={14} className="text-yellow-400 fill-yellow-400 shrink-0" />
              <span className="text-sm text-gray-200">
                <strong className="text-white">{siteConfig.googleRating}</strong> Google Rating
                &nbsp;·&nbsp; {siteConfig.reviewCount} Reviews
              </span>
            </div>
          </div>

          {/* Column 2 — Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Our Services
            </h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-gray-400 hover:text-primary-light transition-colors"
                  >
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-400 hover:text-primary-light transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact & Hours */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Get In Touch
            </h3>
            <TrackedCallLink
              href={siteConfig.phoneHref}
              source="footer_contact"
              className="flex items-center gap-2.5 text-sm text-gray-300 hover:text-primary-light transition-colors group"
            >
              <Phone size={15} className="text-primary-light shrink-0" />
              {siteConfig.phoneFormatted}
            </TrackedCallLink>
            <TrackedWhatsAppLink
              href={siteConfig.whatsappHref}
              source="footer_contact"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm text-gray-300 hover:text-primary-light transition-colors"
            >
              <MessageCircle size={15} className="text-green-400 shrink-0" />
              WhatsApp Us
            </TrackedWhatsAppLink>
            <div className="flex items-start gap-2.5 text-sm text-gray-400">
              <Clock size={15} className="text-primary-light shrink-0 mt-0.5" />
              <div>
                <p>{siteConfig.hours}</p>
                <p className="text-xs text-gray-500 mt-0.5">Emergency? Call us anytime</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-gray-400">
              <MapPin size={15} className="text-primary-light shrink-0 mt-0.5" />
              <p className="leading-relaxed">{siteConfig.address}</p>
            </div>
          </div>
        </div>

        {/* ── Service areas strip ── */}
        <div className="mt-12 pt-10 border-t border-gray-800">
          <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold text-center mb-4">
            We Come to You — Service Areas
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="inline-flex items-center gap-1.5 bg-gray-800 hover:bg-primary/30 border border-gray-700 hover:border-primary/50 text-gray-300 hover:text-primary-light text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
              >
                <MapPin size={11} className="shrink-0" />
                {loc.city}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
