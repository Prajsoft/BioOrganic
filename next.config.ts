import type { NextConfig } from "next";

const WORDPRESS_BASE = (process.env.WORDPRESS_API_BASE || 'https://bioorganicpestcontrol.in/wp-json/wp/v2').replace(/\/$/, '')

async function fetchBlogSlugs(): Promise<string[]> {
  if (process.env.WORDPRESS_API_INSECURE === 'true') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  }
  try {
    const res = await fetch(`${WORDPRESS_BASE}/posts?per_page=100&status=publish&_fields=slug`)
    if (!res.ok) return []
    const posts = await res.json() as { slug: string }[]
    return posts.map((p) => p.slug)
  } catch {
    return []
  }
}

const legacyServiceRedirects = [
  { source: '/termite-control', destination: '/services/termite-control' },
  { source: '/cockroach-control', destination: '/services/cockroach-control' },
  { source: '/crawling-insects-control', destination: '/services/cockroach-control' },
  { source: '/bed-bug-control', destination: '/services/bed-bug-control' },
  { source: '/wood-borer-control', destination: '/services/wood-borer-control' },
  { source: '/rodent-control', destination: '/services/rodent-control' },
  { source: '/mosquito-control', destination: '/services/mosquito-control' },
  { source: '/general-pest-control', destination: '/services/general-pest-control' },
  { source: '/ant-control', destination: '/services/ant-control' },
  { source: '/lizard-control', destination: '/services/lizard-control' },
  { source: '/fumigation', destination: '/services/fumigation' },
  { source: '/sanitization', destination: '/services/sanitization' },
  { source: '/commercial-pest-control', destination: '/services/commercial-pest-control' },
  { source: '/warehouse-pest-control', destination: '/services/warehouse-pest-control' },
]

const legacyPageRedirects = [
  { source: '/about-us', destination: '/about' },
  { source: '/contact-us', destination: '/contact' },
  { source: '/services/crawling-insects-control', destination: '/services/cockroach-control' },
  { source: '/blogs', destination: '/blog' },
  { source: '/blogs/:slug', destination: '/blog/:slug' },
  { source: '/service-area', destination: '/locations' },
  { source: '/service-areas', destination: '/locations' },
  { source: '/annual-maintenance-contract', destination: '/amc' },
  { source: '/annual-maintenance-contract-amc', destination: '/amc' },
]

const toPermanentRedirect = (redirect: { source: string; destination: string }) => ({
  ...redirect,
  permanent: true,
})

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bioorganicpestcontrol.in',
        pathname: '/wp-content/**',
      },
    ],
  },
  async redirects() {
    const blogSlugs = await fetchBlogSlugs()
    const legacyBlogRedirects = blogSlugs.map((slug) => ({
      source: `/${slug}`,
      destination: `/blog/${slug}`,
    }))
    return [
      ...legacyPageRedirects,
      ...legacyServiceRedirects,
      ...legacyBlogRedirects,
    ].map(toPermanentRedirect)
  },
}

export default nextConfig;
