import { NextRequest, NextResponse } from 'next/server'
import { sendCapiEvent, extractUserData } from '@/lib/metaCapi'

type CapiRelayBody = {
  event_name: string
  event_id: string
  event_source_url: string
  fbp?: string
  fbc?: string
  custom_data?: Record<string, string>
}

export async function POST(request: NextRequest) {
  let body: CapiRelayBody

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const { event_name, event_id, event_source_url, fbp, fbc, custom_data } = body

  if (!event_name || !event_id || !event_source_url) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const userData = extractUserData(request)
  if (fbp) userData.fbp = fbp
  if (fbc) userData.fbc = fbc

  await sendCapiEvent({
    event_name,
    event_id,
    event_source_url,
    user_data: userData,
    custom_data,
  })

  return NextResponse.json({ ok: true })
}
