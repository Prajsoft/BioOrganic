import { NextResponse } from 'next/server'

type ContactRequest = {
  name?: unknown
  phone?: unknown
  city?: unknown
  service?: unknown
  message?: unknown
}

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

function asTrimmedString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function invalidConfig() {
  const key = process.env.WEB3FORMS_ACCESS_KEY
  return !key || key.startsWith('REPLACE_') || key.includes('XXXXXXXX')
}

export async function POST(request: Request) {
  let payload: ContactRequest

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ message: 'Invalid form data.' }, { status: 400 })
  }

  const name = asTrimmedString(payload.name)
  const phone = asTrimmedString(payload.phone)
  const city = asTrimmedString(payload.city)
  const service = asTrimmedString(payload.service)
  const message = asTrimmedString(payload.message)

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

  if (invalidConfig()) {
    return NextResponse.json(
      { message: 'Lead form is not configured yet. Please call or WhatsApp us directly.' },
      { status: 503 },
    )
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject: `Pest control enquiry from ${name}`,
        from_name: 'Bio Organic Pest Control Website',
        name,
        phone,
        city,
        service,
        message,
      }),
    })

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Unable to submit right now. Please call or WhatsApp us directly.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { message: 'Unable to submit right now. Please call or WhatsApp us directly.' },
      { status: 502 },
    )
  }
}
