const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN
const TEST_CODE = process.env.META_TEST_EVENT_CODE

const CAPI_URL = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events`

export type CapiUserData = {
  client_ip_address?: string
  client_user_agent?: string
  fbp?: string
  fbc?: string
  em?: string   // hashed email (optional)
  ph?: string   // hashed phone (optional)
}

export type CapiEventData = {
  event_name: string
  event_id: string
  event_source_url: string
  custom_data?: Record<string, string>
  user_data: CapiUserData
}

export async function sendCapiEvent(event: CapiEventData): Promise<void> {
  if (!PIXEL_ID || !ACCESS_TOKEN || ACCESS_TOKEN === 'your_capi_token_here') return

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: event.event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id: event.event_id,
        event_source_url: event.event_source_url,
        action_source: 'website',
        user_data: event.user_data,
        ...(event.custom_data ? { custom_data: event.custom_data } : {}),
      },
    ],
    access_token: ACCESS_TOKEN,
  }

  // Include test event code when present (remove TEST_CODE env var in production)
  if (TEST_CODE) payload.test_event_code = TEST_CODE

  try {
    await fetch(CAPI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    // CAPI failures are non-fatal — client-side pixel still fires
  }
}

export function extractUserData(request: Request): CapiUserData {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    undefined

  const ua = request.headers.get('user-agent') || undefined

  return {
    client_ip_address: ip,
    client_user_agent: ua,
  }
}

// Generate a short unique event ID for deduplication
export function generateEventId(prefix = 'evt'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}
