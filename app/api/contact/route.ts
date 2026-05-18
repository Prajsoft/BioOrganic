import { NextResponse, NextRequest } from 'next/server'
import { sendCapiEvent, extractUserData, generateEventId } from '@/lib/metaCapi'

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

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

// Web3Forms keys are UUIDs: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
const WEB3FORMS_KEY_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function isConfigured() {
  const key = process.env.WEB3FORMS_ACCESS_KEY
  return typeof key === 'string' && WEB3FORMS_KEY_RE.test(key)
}

// ── IP rate limiting ─────────────────────────────────────────────────────────
// In-memory; resets on cold start. Good enough to block burst spam on Vercel
// where most requests in a short window hit the same instance.
const RATE_WINDOW_MS = 15 * 60 * 1000   // 15 min
const RATE_MAX = 3                        // 3 submissions per IP per window

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    '0.0.0.0'
  )
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }
  if (entry.count >= RATE_MAX) return true
  entry.count++
  return false
}

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

  const ip = getIp(request)
  if (isRateLimited(ip)) {
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
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject: `Pest control enquiry from ${name}`,
        from_name: 'Bio Organic Pest Control Website',
        name, phone, city, service, message,
      }),
    })

    if (!response.ok) {
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
