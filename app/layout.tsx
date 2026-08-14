import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import MobileActionBar from '@/components/layout/MobileActionBar'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import MetaPixel from '@/components/analytics/MetaPixel'
import { GTMScript, GTMNoScript } from '@/components/analytics/GoogleTagManager'
import { BRAND_NAME, SITE_URL } from '@/lib/seo'

/*
 * PRE-GO-LIVE CHECKLIST
 * ─────────────────────
 * 1. GA4, GTM and Meta Pixel IDs resolve in lib/analyticsIds.ts — an ID only
 *    loads if it matches its vendor format and is not an X-placeholder
 * 2. Confirm the GTM container has NO GA4 config tag for the same measurement
 *    ID that <GoogleAnalytics /> loads, or pageviews double-count
 * 3. Verify GA4 Realtime report fires on page load (Chrome DevTools → Network → 'collect')
 * 4. Verify Meta Pixel fires using Meta Pixel Helper browser extension
 * 5. Test whatsapp_click, call_click, form_submit events in GA4 Realtime → Events
 * 6. Test Lead, Contact, ViewContent events in Meta Events Manager → Test Events
 * 7. Confirm privacy-policy page accessible at /privacy-policy
 * 8. Submit sitemap to Google Search Console: https://bioorganicpestcontrol.in/sitemap.xml
 */

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: BRAND_NAME,
  title: {
    default: `Pest Control Services in Delhi NCR | ${BRAND_NAME}`,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    'Govt-licensed, non-toxic pest control in Delhi NCR. Serving 5,000+ homes and businesses since 2016. Call +91-9999266042.',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: BRAND_NAME,
    images: [
      {
        url: '/images/Socialpest.png',
        width: 1200,
        height: 630,
        alt: `${BRAND_NAME} in Delhi NCR`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/Socialpest.png'],
  },
  icons: {
    icon: '/images/BioLogo.png',
    shortcut: '/images/BioLogo.png',
    apple: '/images/BioLogo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <GTMNoScript />
        <Header />
        <main className="flex-1 pb-16 lg:pb-0">{children}</main>
        <Footer />
        <div className="hidden lg:block"><WhatsAppButton /></div>
        <MobileActionBar />
        <GTMScript />
        <GoogleAnalytics />
        <MetaPixel />
      </body>
    </html>
  )
}
