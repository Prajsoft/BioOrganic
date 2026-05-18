import { NextRequest, NextResponse } from 'next/server'
import { sendCapiEvent, extractUserData } from '@/lib/metaCapi'

// Only the events this site actually fires — prevents the endpoint being
// abused to inject arbitrary event names into the Meta pixel dataset.
const ALLOWED_EVENTS = new Set([
  'ViewContent',
  'Lead',
  'Contact',
  'InitiateCheckout',
  'CompleteRegistration',
  'Purchase',
  'CustomizeProduct',
])

const ALLOWED_ORIGIN = 'bioorganicpestcontrol.in'

function isTrustedUrl(raw: unknown): boolean {
  if (typeof raw !== 'string') return false
  try {
    const { hostname, protocol } = new URL(raw)
    return (
      (protocol === 'https:' || protocol === 'http:') &&
      (hostname === ALLOWED_ORIGIN || hostname.endsWith(`.${ALLOWED_ORIGIN}`))
    )
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const { event_name, event_id, event_source_url, fbp, fbc, custom_data } = body

  if (
    typeof event_name !== 'string' ||
    !ALLOWED_EVENTS.has(event_name)
  ) {
    return NextResponse.json(
      { ok: false, error: 'Unknown event name.' },
      { status: 400 },
    )
  }

  if (typeof event_id !== 'string' || event_id.length === 0 || event_id.length > 128) {
    return NextResponse.json(
      { ok: false, error: 'Invalid event_id.' },
      { status: 400 },
    )
  }

  if (!isTrustedUrl(event_source_url)) {
    return NextResponse.json(
      { ok: false, error: 'Untrusted event_source_url.' },
      { status: 400 },
    )
  }

  const userData = extractUserData(request)
  if (typeof fbp === 'string' && fbp) userData.fbp = fbp
  if (typeof fbc === 'string' && fbc) userData.fbc = fbc

  await sendCapiEvent({
    event_name,
    event_id,
    event_source_url: event_source_url as string,
    user_data: userData,
    custom_data: custom_data as Record<string, string> | undefined,
  })

  return NextResponse.json({ ok: true })
}
