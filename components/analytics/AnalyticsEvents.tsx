'use client'

/*
  HOW TO VERIFY:

  GA4:
  - Open Chrome DevTools → Network tab
  - Filter by 'collect'
  - Perform each tracked action (click WhatsApp, submit form etc)
  - Each should show a request to google-analytics.com/g/collect
  - OR install 'GA Debugger' Chrome extension
  - Check GA4 Realtime report in Google Analytics dashboard

  Meta Pixel:
  - Install 'Meta Pixel Helper' Chrome extension
  - Green checkmark = pixel firing correctly
  - Each WhatsApp/form action should show Lead or Contact event
  - Verify in Meta Events Manager → Test Events tab

  EVENTS TO CONFIRM BEFORE RUNNING ADS:
  ✓ PageView (fires on every page load)
  ✓ whatsapp_click (fires on every WhatsApp button)
  ✓ call_click (fires on every Call button)
  ✓ form_submit (fires on contact form success)
  ✓ Lead (Meta — fires on form submit)
  ✓ Contact (Meta — fires on WhatsApp click)
  ✓ ViewContent (Meta — fires on service page view)
*/

// GA4 Events
export function trackWhatsAppClick(source: string) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', 'whatsapp_click', {
    event_category: 'engagement',
    event_label: source,
  })
}

export function trackCallClick(source: string) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', 'call_click', {
    event_category: 'engagement',
    event_label: source,
  })
}

export function trackFormSubmit(service: string, city: string) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', 'form_submit', {
    event_category: 'lead',
    event_label: service,
    city: city,
  })
}

export function trackServiceView(serviceName: string) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', 'service_view', {
    event_category: 'content',
    event_label: serviceName,
  })
}

// Meta Pixel Events
export function pixelLead(service: string, city: string) {
  if (typeof window === 'undefined' || !window.fbq) return
  window.fbq('track', 'Lead', {
    content_name: service,
    content_category: 'pest_control',
    city: city,
  })
}

export function pixelContact() {
  if (typeof window === 'undefined' || !window.fbq) return
  window.fbq('track', 'Contact')
}

export function pixelViewContent(service: string) {
  if (typeof window === 'undefined' || !window.fbq) return
  window.fbq('track', 'ViewContent', {
    content_name: service,
    content_category: 'pest_control',
  })
}

export function pixelInitiateCheckout(service: string) {
  if (typeof window === 'undefined' || !window.fbq) return
  window.fbq('track', 'InitiateCheckout', {
    content_name: service,
    content_category: 'pest_control',
  })
}
