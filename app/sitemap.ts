import type { MetadataRoute } from 'next'
import { services } from '@/data/services'
import { locations } from '@/data/locations'
import { pests } from '@/data/pests'
import { getAllPostSlugs } from '@/lib/wordpress'

const BASE = 'https://bioorganicpestcontrol.in'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogSlugs = await getAllPostSlugs()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                  lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/about`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/amc`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/blog`,        lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/locations`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const locationRoutes: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${BASE}/locations/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const pestRoutes: MetadataRoute.Sitemap = pests.map((p) => ({
    url: `${BASE}/pest-control/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...serviceRoutes, ...locationRoutes, ...pestRoutes, ...blogRoutes]
}
