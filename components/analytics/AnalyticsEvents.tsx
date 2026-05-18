'use client'

const AW_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
const AW_LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL
const AW_CONTACT_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONTACT_LABEL

// ── Helpers ──────────────────────────────────────────────────────────────────

function generateEventId(prefix = 'evt') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1]
}

function gtagFire(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', event, params as never)
}

function fbqFire(event: string, params?: Record<string, string>, eventId?: string) {
  if (typeof window === 'undefined' || !window.fbq) return
  window.fbq('track', event, params, eventId ? { eventID: eventId } : undefined)
}

function googleAdsConversion(label: string | undefined) {
  if (!AW_ID || !label || label.includes('X')) return
  gtagFire('conversion', { send_to: `${AW_ID}/${label}` })
}

async function capiRelay(
  event_name: string,
  event_id: string,
  custom_data?: Record<string, string>,
) {
  try {
    await fetch('/api/meta-capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name,
        event_id,
        event_source_url: window.location.href,
        fbp: getCookie('_fbp'),
        fbc: getCookie('_fbc'),
        custom_data,
      }),
    })
  } catch {
    // CAPI relay failure is non-fatal
  }
}

// ── GA4 + Google Ads + Meta CAPI events ──────────────────────────────────────

export function trackWhatsAppClick(source: string) {
  const eventId = generateEventId('wa')

  // GA4
  gtagFire('whatsapp_click', { event_category: 'engagement', event_label: source })

  // Google Ads — Contact conversion
  googleAdsConversion(AW_CONTACT_LABEL)

  // Meta Pixel (client)
  fbqFire('Contact', { source }, eventId)

  // Meta CAPI (server relay)
  capiRelay('Contact', eventId, { source })
}

export function trackCallClick(source: string) {
  const eventId = generateEventId('call')

  // GA4
  gtagFire('call_click', { event_category: 'engagement', event_label: source })

  // Google Ads — Contact conversion
  googleAdsConversion(AW_CONTACT_LABEL)

  // Meta Pixel (client)
  fbqFire('Contact', { source }, eventId)

  // Meta CAPI (server relay)
  capiRelay('Contact', eventId, { source })
}

export function trackFormSubmit(service: string, city: string) {
  // GA4
  gtagFire('form_submit', { event_category: 'lead', event_label: service, city })

  // Google Ads — Lead conversion
  googleAdsConversion(AW_LEAD_LABEL)

  // Meta Pixel client-side fires from ContactForm with its own eventId
  // CAPI Lead fires server-side from /api/contact (has real IP + user agent)
}

export function trackServiceView(serviceName: string) {
  const eventId = generateEventId('svc')

  // GA4
  gtagFire('service_view', { event_category: 'content', event_label: serviceName })

  // Meta Pixel (client)
  fbqFire('ViewContent', { content_name: serviceName, content_category: 'pest_control' }, eventId)

  // Meta CAPI (server relay)
  capiRelay('ViewContent', eventId, {
    content_name: serviceName,
    content_category: 'pest_control',
  })
}

// Called from ContactForm after successful submit — fires client-side Lead pixel
// The matching server-side CAPI Lead fires from /api/contact with the same eventId
export function trackLeadPixel(service: string, city: string, eventId: string) {
  fbqFire('Lead', { content_name: service, city }, eventId)
}
