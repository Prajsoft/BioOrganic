/**
 * Resolved third-party analytics IDs.
 *
 * Every ID here is interpolated into an inline <Script> body, so each one is
 * validated against its vendor's format before it is exported. An ID that fails
 * validation resolves to `undefined` and its tag simply does not render.
 *
 * `.env.example` ships placeholders made of X's (G-XXXXXXXXXX, AW-XXXXXXXXXX,
 * XXXXXXXXXXXXXXXXXXX). Those are detected by shape — the whole value, minus any
 * vendor prefix, being nothing but X's — never by "contains an X", because real
 * IDs can legitimately contain one. The GA4 property below is G-G9J0DHVJSX.
 *
 * GA4 and GTM keep a hardcoded fallback so the tags survive a host that has no
 * env vars configured; setting the env var overrides the fallback.
 */

const GA_FALLBACK = 'G-G9J0DHVJSX'
const GTM_FALLBACK = 'GTM-WZ79D9MQ'

function isPlaceholder(value: string): boolean {
  return /^X+$/.test(value.replace(/^(G-|AW-|GTM-)/, ''))
}

function resolve(value: string | undefined, format: RegExp): string | undefined {
  const trimmed = value?.trim()
  if (!trimmed || isPlaceholder(trimmed) || !format.test(trimmed)) return undefined
  return trimmed
}

export const GA_MEASUREMENT_ID = resolve(
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? GA_FALLBACK,
  /^G-[A-Z0-9]+$/,
)

export const GTM_ID = resolve(
  process.env.NEXT_PUBLIC_GTM_ID ?? GTM_FALLBACK,
  /^GTM-[A-Z0-9]+$/,
)

export const GOOGLE_ADS_ID = resolve(
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
  /^AW-[A-Z0-9]+$/,
)

export const GOOGLE_ADS_LEAD_LABEL = resolve(
  process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL,
  /^[A-Za-z0-9_-]+$/,
)

export const GOOGLE_ADS_CONTACT_LABEL = resolve(
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONTACT_LABEL,
  /^[A-Za-z0-9_-]+$/,
)

export const META_PIXEL_ID = resolve(process.env.NEXT_PUBLIC_META_PIXEL_ID, /^\d+$/)
