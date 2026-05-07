const DEFAULT_BASE = 'https://bioorganicpestcontrol.in/wp-json/wp/v2'
const BASE = (process.env.WORDPRESS_API_BASE || DEFAULT_BASE).replace(/\/$/, '')

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

const POST_LIST_FIELDS = [
  'id',
  'slug',
  'date',
  'title',
  'excerpt',
  '_embedded.wp:featuredmedia.source_url',
  '_embedded.wp:featuredmedia.alt_text',
].join(',')

async function fetchWordPress<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${BASE}${path}`, { next: { revalidate: 3600 } })
    if (!res.ok) return fallback
    return res.json()
  } catch {
    return fallback
  }
}

export async function getAllPosts(page = 1, perPage = 9): Promise<WPPost[]> {
  return fetchWordPress<WPPost[]>(
    `/posts?_embed=wp:featuredmedia&per_page=${perPage}&page=${page}&status=publish&_fields=${POST_LIST_FIELDS}`,
    [],
  )
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await fetchWordPress<WPPost[]>(
    `/posts?slug=${encodeURIComponent(slug)}&_embed`,
    [],
  )
  return posts[0] ?? null
}

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await fetchWordPress<{ slug: string }[]>(
    '/posts?per_page=100&status=publish&_fields=slug',
    [],
  )
  return posts.map((p) => p.slug)
}
