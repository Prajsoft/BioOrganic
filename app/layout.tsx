import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import MetaPixel from '@/components/analytics/MetaPixel'
import CookieBanner from '@/components/ui/CookieBanner'

/*
 * PRE-GO-LIVE CHECKLIST
 * ─────────────────────
 * 1. Replace NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.local with real G-XXXXXXXX ID
 * 2. Replace NEXT_PUBLIC_META_PIXEL_ID in .env.local with real Pixel ID
 * 3. Verify GA4 Realtime report fires on page load (Chrome DevTools → Network → 'collect')
 * 4. Verify Meta Pixel fires using Meta Pixel Helper browser extension
 * 5. Test whatsapp_click, call_click, form_submit events in GA4 Realtime → Events
 * 6. Test Lead, Contact, ViewContent events in Meta Events Manager → Test Events
 * 7. Confirm privacy-policy page accessible at /privacy-policy
 * 8. Confirm CookieBanner appears on first visit and dismisses on Accept
 * 9. Confirm localStorage key 'cookie_consent' = 'accepted' after dismissal
 * 10. Submit sitemap to Google Search Console: https://bioorganicpestcontrol.in/sitemap.xml
 */

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://bioorganicpestcontrol.in'),
  applicationName: 'Bio Organic Pest Control',
  title: {
    default: 'Pest Control Services in Delhi NCR | Bio Organic Pest Control',
    template: '%s | Bio Organic Pest Control',
  },
  description:
    'Govt-licensed, non-toxic pest control in Delhi NCR. Serving 5,000+ homes and businesses since 2016. Call +91-9999266042.',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://bioorganicpestcontrol.in',
    siteName: 'Bio Organic Pest Control',
    images: [
      {
        url: '/images/social-card.svg',
        width: 1200,
        height: 630,
        alt: 'Bio Organic Pest Control in Delhi NCR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/social-card.svg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
        <GoogleAnalytics />
        <MetaPixel />
      </body>
    </html>
  )
}
