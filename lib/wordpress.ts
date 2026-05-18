import fs from 'node:fs'
import path from 'node:path'

// ── TLS workaround ───────────────────────────────────────────────────────────
// WordPress's cert chain may be missing an intermediate certificate, causing
// Node.js to reject it with UNABLE_TO_VERIFY_LEAF_SIGNATURE.
//
// The correct fix is to add the missing intermediate cert to WordPress/the host.
// As a temporary workaround, set WORDPRESS_API_INSECURE=true in .env.local.
// This disables TLS verification only for this process — never use in production
// once the cert chain is repaired.
if (process.env.WORDPRESS_API_INSECURE === 'true') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  console.warn(
    '[WordPress] TLS verification disabled via WORDPRESS_API_INSECURE=true. ' +
    'Fix the intermediate certificate on the WordPress host and remove this flag.',
  )
}

const DEFAULT_BASE = 'https://bioorganicpestcontrol.in/wp-json/wp/v2'
const BASE = (process.env.WORDPRESS_API_BASE || DEFAULT_BASE).replace(/\/$/, '')
const SLUG_CACHE = path.join(process.cwd(), 'data', 'blog-slugs-cache.json')

export type WPPost = {
  id: number
  slug: string
  date: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>
    'wp:term'?: Array<Array<{ name: string; slug: string }>>
  }
}

const POST_LIST_FIELDS = 'id,slug,date,title,excerpt,_embedded'

async function wpFetch<T>(path: string): Promise<T> {
  const url = `${BASE}${path}`
  const res = await fetch(url, { next: { revalidate: 3600 } })
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`)
  return res.json() as Promise<T>
}

function readSlugCache(): string[] {
  try {
    return JSON.parse(fs.readFileSync(SLUG_CACHE, 'utf-8'))
  } catch {
    return []
  }
}

function writeSlugCache(slugs: string[]) {
  try {
    fs.writeFileSync(SLUG_CACHE, JSON.stringify(slugs, null, 2))
  } catch {
    // filesystem may not be writable in all environments — skip silently
  }
}

export async function getAllPosts(page = 1, perPage = 9): Promise<WPPost[]> {
  try {
    return await wpFetch<WPPost[]>(
      `/posts?_embed=wp:featuredmedia&per_page=${perPage}&page=${page}&status=publish&_fields=${POST_LIST_FIELDS}`,
    )
  } catch (err) {
    console.error('[WordPress] getAllPosts failed:', err)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const posts = await wpFetch<WPPost[]>(
      `/posts?slug=${encodeURIComponent(slug)}&_embed`,
    )
    return posts[0] ?? null
  } catch (err) {
    console.error(`[WordPress] getPostBySlug("${slug}") failed:`, err)
    return null
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const posts = await wpFetch<{ slug: string }[]>(
      '/posts?per_page=100&status=publish&_fields=slug',
    )
    const slugs = posts.map((p) => p.slug)
    writeSlugCache(slugs)
    return slugs
  } catch (err) {
    console.error('[WordPress] getAllPostSlugs failed:', err)
    const cached = readSlugCache()
    if (cached.length > 0) {
      console.warn(
        `[WordPress] Falling back to ${cached.length} cached slugs from data/blog-slugs-cache.json. ` +
        'Blog page count may be stale.',
      )
      return cached
    }
    console.error(
      '[WordPress] No slug cache found. Blog pages will not be generated. ' +
      'Run a build with API access to populate data/blog-slugs-cache.json.',
    )
    return []
  }
}
