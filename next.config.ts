import type { NextConfig } from "next";
import blogSlugsCache from './data/blog-slugs-cache.json'

const blogSlugs = blogSlugsCache as string[]

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

const legacyBlogRedirects = blogSlugs.map((slug) => ({
  source: `/${slug}`,
  destination: `/blog/${slug}`,
}))

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
    return [
      ...legacyPageRedirects,
      ...legacyServiceRedirects,
      ...legacyBlogRedirects,
    ].map(toPermanentRedirect)
  },
}

export default nextConfig;
