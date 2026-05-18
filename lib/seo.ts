export const SITE_URL = 'https://bioorganicpestcontrol.in'
export const BRAND_NAME = 'Bio Organic Pest Control'

const BRAND_PATTERNS = [
  /\s*\|\s*Bio Organic Pest Control\s*$/i,
  /\s*\|\s*Bio Organic\s*$/i,
]

export function canonical(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return normalized === '/' ? SITE_URL : `${SITE_URL}${normalized}`
}

export function pageTitle(title: string) {
  return BRAND_PATTERNS.reduce((cleaned, pattern) => cleaned.replace(pattern, ''), title).trim()
}
