import { NextResponse, NextRequest } from 'next/server'
import { Resend } from 'resend'
import { sendCapiEvent, extractUserData, generateEventId } from '@/lib/metaCapi'
import { locations } from '@/data/locations'
import { services } from '@/data/services'
import { getRequestIp, isRateLimited } from '@/lib/rateLimit'

type ContactBody = {
  name?: unknown
  phone?: unknown
  city?: unknown
  service?: unknown
  message?: unknown
  _hp?: unknown       // honeypot — must be empty
  _eventId?: unknown
  _fbp?: unknown
  _fbc?: unknown
}

const RECIPIENT_EMAIL = 'bioorganicpestcontrol@gmail.com'

function isConfigured() {
  return typeof process.env.RESEND_API_KEY === 'string' && process.env.RESEND_API_KEY.startsWith('re_')
}

const allowedCities = new Set(locations.map((location) => location.city))
const allowedServices = new Set([
  ...services.map((service) => service.shortTitle),
  'Annual Maintenance Contract (AMC)',
  'Not sure / General Enquiry',
])

const RATE_WINDOW_MS = 15 * 60 * 1000   // 15 min
const RATE_MAX = 3                        // 3 submissions per IP per window

function str(v: unknown) {
  return typeof v === 'string' ? v.trim() : ''
}

export async function POST(request: NextRequest) {
  let body: ContactBody

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot — bots fill it; return 200 silently so they think it worked
  if (str(body._hp)) {
    return NextResponse.json({ ok: true })
  }

  const ip = getRequestIp(request)
  if (isRateLimited(`contact:${ip}`, RATE_MAX, RATE_WINDOW_MS)) {
    return NextResponse.json(
      { message: 'Too many requests. Please wait a few minutes and try again.' },
      { status: 429 },
    )
  }

  const name    = str(body.name)
  const phone   = str(body.phone)
  const city    = str(body.city)
  const service = str(body.service)
  const message = str(body.message)

  if (!name || !phone || !city || !service) {
    return NextResponse.json(
      { message: 'Please complete all required fields.' },
      { status: 400 },
    )
  }

  if (!/^[+()\-.\s0-9]{8,20}$/.test(phone)) {
    return NextResponse.json(
      { message: 'Please enter a valid phone number.' },
      { status: 400 },
    )
  }

  if (name.length > 100 || message.length > 1500 || !allowedCities.has(city) || !allowedServices.has(service)) {
    return NextResponse.json(
      { message: 'Please check the form details and try again.' },
      { status: 400 },
    )
  }

  if (!isConfigured()) {
    return NextResponse.json(
      { message: 'Lead form is not configured. Please call or WhatsApp us directly.' },
      { status: 503 },
    )
  }

  const eventId = str(body._eventId) || generateEventId('lead')
  const fbp     = str(body._fbp)
  const fbc     = str(body._fbc)

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: 'BioOrganic Website <onboarding@resend.dev>',
      to: RECIPIENT_EMAIL,
      subject: `Pest control enquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `City: ${city}`,
        `Service: ${service}`,
        `Message: ${message || '(none)'}`,
      ].join('\n'),
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      return NextResponse.json(
        { message: 'Unable to submit right now. Please call or WhatsApp us directly.' },
        { status: 502 },
      )
    }

    const userData = extractUserData(request)
    if (fbp) userData.fbp = fbp
    if (fbc) userData.fbc = fbc

    sendCapiEvent({
      event_name: 'Lead',
      event_id: eventId,
      event_source_url: request.headers.get('referer') || 'https://bioorganicpestcontrol.in/contact',
      user_data: userData,
      custom_data: { content_name: service, city },
    }).catch(() => {})

    return NextResponse.json({ ok: true, eventId })
  } catch {
    return NextResponse.json(
      { message: 'Unable to submit right now. Please call or WhatsApp us directly.' },
      { status: 502 },
    )
  }
}
